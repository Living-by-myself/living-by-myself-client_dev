import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MobileContainer } from 'src/styles/styleBox';
import { COLORS } from 'src/styles/styleConstants';
import { styleFont } from 'src/styles/styleFont';
import styled from 'styled-components';
import * as StompJs from '@stomp/stompjs';
import { useParams } from 'react-router-dom';
import axiosInstance from 'src/api/AxiosInstance';
import { useInputErrorStore, useRoomTitleStore } from 'src/store/chatStore';
import { async } from 'q';
import ChatMessageInput from './ChatMessageInput';

interface ChatMessage {
  chatId: number;
  localTime: string;
  msg: string;
  responseDto: {
    id: number;
    nickname: string;
  };
}

const ChatDetailPage = () => {
  const [message, setMessage] = useState(''); // 입력한 메시지

  const token = localStorage.getItem('atk');
  const userId = Number(localStorage.getItem('id'));
  const roomId = useParams();
  const { currentRoomTitle } = useRoomTitleStore();
  const { setCurrentInputError } = useInputErrorStore();
  const [roomTitle, setRoomTitle] = useState('Title');
  const [chatList, setChatList] = useState<ChatMessage[]>([]); // 채팅방 메시지 배열
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true); //스크롤이 제일 아래에 있는지 확인

  // WebSocket 클라이언트를 상태로 관리 → 최초 연결 후 메시지 전송 시 다시 연결하면 코드 중복
  const [webSocketClient, setWebSocketClient] = useState<StompJs.Client | null>(null);

  // 해당 채팅방 메시지 조회
  const getChatMessage = async () => {
    try {
      const response = await axiosInstance.get('/home/chats/room/' + roomId.id);
      setChatList(response.data);

      return response.data;
    } catch (error) {}
  };

  // 메세지 보내기 버튼 클릭 시
  const sendMessageButtonClick = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      if (message.length > 0) {
        setCurrentInputError(false);

        // 메시지 보내기
        // 이미 연결된 WebSocket이 있다면 메시지 전송
        if (webSocketClient) {
          // 특정 채팅방으로 메시지 전송
          webSocketClient.publish({
            destination: '/app/' + roomId.id, // 채팅방 주소,
            body: JSON.stringify({
              // userId랑 메시지 내용만 보내기
              userId: userId,
              message: message
            }) //채팅방으로 내가 줘야 할 것? 백엔드에 물어보기
          });
          webSocketClient.publish({
            destination: '/topic/room/' + roomId.id, // 채팅방 주소,
            body: JSON.stringify({
              chatId: Math.random(),
              localTime: new Date(),
              msg: message,
              responseDto: {
                id: userId,
                nickname: userId
              }
            }) //채팅방으로 내가 줘야 할 것? 백엔드에 물어보기
          });
          setMessage('');

          // await getChatMessage();
        }
      } else {
        setCurrentInputError(true);
      }
    },
    [webSocketClient]
  );

  // 연결 끊기
  const disConnect = () => {
    if (webSocketClient === null) {
      return;
    }

    webSocketClient.deactivate();
  };

  // WebSocket 연결
  const connectWebSocket = () => {
    const client = new StompJs.Client({
      brokerURL: 'wss://tracelover.shop/home/chat', // 웹 소켓 서버로 접속
      connectHeaders: {
        Authorization: token! // token 값을 사용하여 사용자 인증
      },
      debug: (str) => {},
      reconnectDelay: 5000, //자동 재연결을 위한 시간 설정
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000 // 연결이 유지되고 있는지 확인
    });

    // WebSocket 연결 성공 시 실행되는 콜백
    client.onConnect = () => {
      // send,,subscribe,,publish ,,
      // 특정 채팅방에 topic으로 subscribe
      // 받아온 데이터를 subcribe하고, publish하여 데이터를 받아오도록 한다?
      client.subscribe('/topic/room/' + roomId.id, (message) => {
        if (message) {
          // 새로 받은 메시지를 기존 채팅 배열에 추가

          let msg = JSON.parse(message.body);
          setChatList((prevChats) => [...prevChats, msg]);
        }
      });
    };
    // WebSocket 연결이 실패한 경우
    client.onStompError = (frame) => {};

    setWebSocketClient(client);
    client.activate();
  };

  useEffect(() => {
    // messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatList]);

  // 컴포넌트 마운트 시 WebSocket 연결 및 메시지 내용 불러오기
  useEffect(() => {
    connectWebSocket();
    getChatMessage();

    setRoomTitle(currentRoomTitle);
    // setChatRoomTitle();

    return () => disConnect();
  }, []);

  // 채팅방 제목이 날라가면 대체할..
  // const setChatRoomTitle = async () => {
  //   if (currentRoomTitle.length === 0) {
  //     try {
  //       const response = await axiosInstance.get(`/home/chats/rooms`, {
  //         // headers: {
  //         //   Accept: 'application/json, text/plain, */*',
  //         //   'Content-Type': 'application/json'
  //         // }
  //       });
  //
  //     } catch (error) {
  //
  //     }
  //   } else {
  //     return currentRoomTitle;
  //   }
  // };

  // 스크롤 관련
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = messageEndRef.current || {};
      if (scrollTop! + clientHeight! >= scrollHeight! - 5) {
        setIsScrolledToBottom(true);
      } else {
        setIsScrolledToBottom(false);
      }
    };

    if (messageEndRef.current) {
      messageEndRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (messageEndRef.current) {
        messageEndRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [chatList]);

  return (
    <MobileContainer>
      <S.Container>
        <S.ChatHeader>
          {currentRoomTitle.length !== 0 ? <S.Title>{currentRoomTitle}</S.Title> : <S.Title>{roomTitle}</S.Title>}
          <S.Title>{roomTitle}</S.Title>
          <button>더보기</button>
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
          {/* <div ref={messageEndRef}></div> */}
          {!isScrolledToBottom && (
            <S.ScrollToBottomIcon onClick={() => messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })}>
              ⬇
            </S.ScrollToBottomIcon>
          )}
        </S.Inner>
        <S.MessageInputBox>
          <ChatMessageInput />
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
    background-color: ${({ $isMine }) => ($isMine ? COLORS.GRAY[400] : COLORS.GRAY[200])};
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
  Title: styled.h3`
    display: inline;
    font-size: ${styleFont.h3};
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
  `
};
