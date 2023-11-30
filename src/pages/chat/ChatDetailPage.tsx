import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MobileContainer } from 'src/styles/styleBox';
import { COLORS } from 'src/styles/styleConstants';
import { styleFont } from 'src/styles/styleFont';
import styled from 'styled-components';
import * as StompJs from '@stomp/stompjs';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from 'src/api/AxiosInstance';
import { useRoomTitleStore } from 'src/store/chatStore';
import { ChatMessage, ChatRoom, ChatUser } from 'src/types/chat/types';
import { getUserProfile } from 'src/api/user/user';

const ChatDetailPage = () => {
  const [message, setMessage] = useState(''); // 입력한 메시지
  const token = localStorage.getItem('atk');
  const userId = Number(localStorage.getItem('id'));
  const param = useParams();
  const paramId = param.id;
  const { currentRoomTitle, setCurrentRoomTitle } = useRoomTitleStore();
  const [chatList, setChatList] = useState<ChatMessage[]>([]); // 채팅방 메시지 배열
  const [_, setRoomList] = useState<ChatRoom[]>([]); // 채팅방 전체 목록 배열
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  // const [isScrolledToBottom, setIsScrolledToBottom] = useState(true); //스크롤이 제일 아래에 있는지 확인
  const [hasInputError, setHasInputError] = useState(false);
  const navigate = useNavigate();
  const [userNickname, setUserNickname] = useState({} as ChatUser);
  const [lastMessageDate, setLastMessageDate] = useState<string | null>(null);

  // WebSocket 클라이언트를 상태로 관리 → 최초 연결 후 메시지 전송 시 다시 연결하면 코드 중복
  const [webSocketClient, setWebSocketClient] = useState<StompJs.Client | null>(null);

  // 내 닉네임도 publish에 보내서 상대방이 내 닉네임 실시간으로 볼 수 있는지 test..
  const getUserNickname = async () => {
    const profile = await getUserProfile();
    console.log('현재 로그인한 유저의 닉네임은? ', profile.nickname);
    setUserNickname(profile.nickname);
  };

  // 해당 채팅방 메시지 조회
  const getChatMessage = async () => {
    console.log('나 채팅방 메시지 조회한다!');
    console.log('메시지 조회되면서 나오는 roomId..', paramId);
    try {
      const response = await axiosInstance.get('/home/chats/room/' + paramId);
      setChatList(response.data);
      console.log('채팅방 메시지 목록 조회 성공!', response.data);
      return response.data;
    } catch (error) {
      console.log('채팅방 메시지 목록 조회 실패!', error);
    }
  };

  // 채팅 메시지 웹소켓 실시간 전송 시 서버에서 오는 시간 값과 같은 값으로 보내주기 위해 설정
  const getMessageTransferTime = () => {
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    let day = currentDate.getDate().toString().padStart(2, '0');
    let hours = currentDate.getHours().toString().padStart(2, '0');
    let minutes = currentDate.getMinutes().toString().padStart(2, '0');
    let seconds = currentDate.getSeconds().toString().padStart(2, '0');
    let formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  };

  // 메세지 보내기 버튼 클릭 시
  const sendMessageButtonClick = async (e: any) => {
    e.preventDefault();

    const currentDate = getMessageTransferTime();
    if (lastMessageDate !== currentDate) {
      setLastMessageDate(currentDate);
    }

    if (message.length > 0) {
      setHasInputError(false);
      // 메시지 보내기
      // 이미 연결된 WebSocket이 있다면 메시지 전송
      if (webSocketClient) {
        // 특정 채팅방으로 메시지 전송
        webSocketClient.publish({
          destination: '/app/' + paramId, // 채팅방 주소,
          body: JSON.stringify({
            // userId랑 메시지 내용만 보내기 - 서버에서 정해줌
            userId: userId,
            message: message
          })
        });

        webSocketClient.publish({
          destination: '/topic/room/' + paramId, // 채팅방 주소,
          body: JSON.stringify({
            chatId: Math.random(),
            localTime: getMessageTransferTime(),
            msg: message,
            responseDto: {
              id: userId,
              nickname: userNickname
            }
          })
        });
        setMessage(''); // 메시지 초기화
      }
    } else {
      setHasInputError(true);
    }
  };

  // 연결 끊기
  const disConnect = () => {
    if (webSocketClient === null) {
      return;
    }
    console.log('연결 해제!');
    webSocketClient.deactivate();
  };

  // WebSocket 연결
  const connectWebSocket = () => {
    const client = new StompJs.Client({
      brokerURL: 'wss://tracelover.shop/home/chat', // 웹 소켓 서버로 접속
      connectHeaders: {
        Authorization: token! // token 값을 사용하여 사용자 인증
      },
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000, //자동 재연결을 위한 시간 설정
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000 // 연결이 유지되고 있는지 확인
    });

    // WebSocket 연결 성공 시 실행되는 콜백
    client.onConnect = () => {
      client.subscribe('/topic/room/' + paramId, (message) => {
        if (message) {
          // 새로 받은 메시지를 기존 채팅 배열에 추가
          let msg = JSON.parse(message.body);
          setChatList((prevChats) => [...prevChats, msg]);
        }
      });
    };
    // WebSocket 연결이 실패한 경우
    client.onStompError = (frame) => {
      console.log('Broker reported error: ' + frame.headers['message']);
      console.log('Additional details: ' + frame.body);
    };

    setWebSocketClient(client);
    client.activate();
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatList]);

  // 컴포넌트 마운트 시 WebSocket 연결 및 메시지 내용 불러오기
  useEffect(() => {
    connectWebSocket();
    getChatMessage();
    getUserNickname();

    return () => disConnect();
  }, []);

  // 채팅방 제목이 날라가면 대체할..
  const setChatRoomTitle = useCallback(async () => {
    if (currentRoomTitle.length === 0) {
      try {
        const response = await axiosInstance.get(`/home/chats/rooms`);
        console.log('채팅방 title 설정을 위해 전체 채팅 목록 조회! ', response.data);
        setRoomList(response.data);
        const foundRoom: ChatRoom | undefined = response.data.find((room: ChatRoom) => room.id === Number(paramId));
        if (foundRoom) {
          setCurrentRoomTitle(foundRoom.title);
        }
      } catch (error) {
        console.log('채팅방 title 설정을 위해 전체 채팅 목록 실패! ', error);
      }
    } else {
      return currentRoomTitle;
    }
  }, [currentRoomTitle, paramId, setCurrentRoomTitle]);

  useEffect(() => {
    if (currentRoomTitle.length === 0) {
      setChatRoomTitle();
    }
  }, [currentRoomTitle, setChatRoomTitle]);

  return (
    <MobileContainer>
      <S.Container>
        <S.ChatHeader>
          {currentRoomTitle.length !== 0 ? (
            <S.TitleBox>
              <S.Title>{currentRoomTitle}</S.Title> 의 채팅방
            </S.TitleBox>
          ) : (
            <S.Title>{null}</S.Title>
          )}
          <S.MoreButton onClick={() => navigate(`/chat/${paramId}/edit`)}>더보기</S.MoreButton>
        </S.ChatHeader>
        {/*채팅 관련 하나의 컴포넌트로 내부에서 또다시 map을 돌려야함 한 줄에 유저가 나냐 아니냐로 구분해서 */}
        <S.Inner>
          {chatList.map((chat) => {
            return (
              <S.MessageWrapper key={chat.chatId}>
                {chat.responseDto.id !== userId && <S.Nickname>{chat.responseDto.nickname}</S.Nickname>}
                <S.MessageBox $isMine={chat.responseDto.id === userId}>
                  <S.MessageContent $isMine={chat.responseDto.id === userId}>
                    <S.Message>{chat.msg}</S.Message>
                  </S.MessageContent>
                  <S.Time>{chat.localTime.slice(11, 16)}</S.Time>
                </S.MessageBox>
              </S.MessageWrapper>
            );
          })}
          <div ref={messageEndRef}></div>
        </S.Inner>
        <S.MessageInputBox>
          <S.MessageInput
            placeholder="메세지를 작성하시오."
            id="chatMessage"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setHasInputError(false);
            }}
            hasError={hasInputError}
          />
          <S.MessageInputButton type="submit" onClick={sendMessageButtonClick}>
            전송
          </S.MessageInputButton>
        </S.MessageInputBox>
      </S.Container>
    </MobileContainer>
  );
};

export default ChatDetailPage;

interface IMessageBox {
  $isMine: boolean;
}

const S = {
  MessageInputButton: styled.button`
    width: 40px;
    height: 40px;
    border-radius: 50px;
    ${styleFont.body3}
    border: none;
    outline: none;
  `,
  MessageInputBox: styled.form`
    width: 100%;
    margin-top: auto;
    border-top: 1px solid ${COLORS.GRAY[200]};
    padding: 15px 0 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
  `,

  Container: styled.div`
    padding-top: 9px;
    width: 100%;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 56px);
    overflow: hidden;
  `,
  ChatHeader: styled.div`
    display: flex;
    justify-content: center;
    padding: 10px;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
  `,
  Inner: styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 10px;
  `,
  MessageWrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
  `,
  MessageBox: styled.div<IMessageBox>`
    width: 100%;
    display: flex;
    justify-content: ${({ $isMine }) => ($isMine ? 'flex-end' : 'flex-start')};
    align-items: flex-end;
    gap: 10px;
  `,
  MessageContent: styled.div<IMessageBox>`
    padding: 10px;
    background-color: ${({ $isMine }) => ($isMine ? COLORS.GREEN[400] : COLORS.GRAY[200])};
    border-radius: 10px;
    max-width: 70%;
    word-wrap: break-word;
    font-size: ${styleFont.body1};
    color: ${({ $isMine }) => ($isMine ? COLORS.GRAY[0] : COLORS.GRAY[800])};
  `,
  Time: styled.p`
    font-size: ${styleFont.body1};
    color: ${COLORS.GRAY[400]};
  `,
  Message: styled.p``,
  Nickname: styled.p``,
  TitleBox: styled.div`
    max-width: 520px;
    display: flex;
    align-items: center;
    font-size: ${styleFont.h3};
  `,
  Title: styled.h3`
    display: inline;
    font-size: ${styleFont.h3};
    max-width: 430px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 3px;
  `,
  ScrollToBottomIcon: styled.div`
    position: fixed;
    bottom: 20px;
    right: 20px;
    cursor: pointer;
    font-size: 24px;
    background-color: #fff;
    padding: 8px;
    border-radius: 50%;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
  `,
  MessageInput: styled.input<{ hasError: boolean }>`
    padding: 13px;
    min-height: 40px;
    min-width: 80%;
    outline: none;
    border: ${({ hasError }) => (hasError ? '1px solid red' : 'none')};
    font-size: ${styleFont.body3};
    background-color: ${COLORS.GRAY[200]};
    border-radius: 50px;
  `,
  MoreButton: styled.button`
    font-size: ${styleFont.body4};
    color: ${COLORS.GRAY[400]};
    margin-left: 10px;
  `
};
