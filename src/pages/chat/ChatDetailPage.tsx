import React, { useEffect, useState } from 'react';
import { MobileContainer } from 'src/styles/styleBox';
import { COLORS } from 'src/styles/styleConstants';
import { styleFont } from 'src/styles/styleFont';
import styled from 'styled-components';
import * as StompJs from '@stomp/stompjs';
import { useParams } from 'react-router-dom';
import axiosInstance from 'src/api/AxiosInstance';

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
  const [hasInputError, setHasInputError] = useState<boolean>(false);
  const token = localStorage.getItem('atk');
  const userId = Number(localStorage.getItem('id'));
  const roomId = useParams();
  const [chatList, setChatList] = useState<ChatMessage[]>([]); // 채팅방 메시지 배열

  // WebSocket 클라이언트를 상태로 관리 → 최초 연결 후 메시지 전송 시 다시 연결하면 코드 중복
  const [webSocketClient, setWebSocketClient] = useState<StompJs.Client | null>(null);

  // 해당 채팅방 메시지 조회
  const getChatMessage = async () => {
    console.log('나 채팅방 메시지 조회한다!');
    console.log(roomId);
    try {
      const response = await axiosInstance.get('/home/chats/room/' + roomId.id);
      setChatList(response.data);
      console.log('채팅방 메시지 목록 조회 성공!', response.data);
      return response.data;
    } catch (error) {
      console.log('채팅방 메시지 목록 조회 실패!', error);
    }
  };

  // 메세지 보내기 버튼 클릭 시
  const sendMessageButtonClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (message.length > 0) {
      console.log('message', message);
      setHasInputError(false);

      // 메시지 보내기
      // 이미 연결된 WebSocket이 있다면 메시지 전송
      if (webSocketClient) {
        // 특정 채팅방으로 메시지 전송
        webSocketClient.publish({
          // destination: '/topic/room/' + roomId.id, // 채팅방 주소,
          destination: '/app/' + roomId.id, // 채팅방 주소,
          body: JSON.stringify({
            // 토큰이랑 메시지 내용만 보내기
            userId: userId,
            message: message
          }) //채팅방으로 내가 줘야 할 것? 백엔드에 물어보기
        });
        setMessage('');

        await getChatMessage();
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
      reconnectDelay: 50000, //자동 재연결을 위한 시간 설정
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000 // 연결이 유지되고 있는지 확인
    });

    // WebSocket 연결 성공 시 실행되는 콜백
    client.onConnect = () => {
      console.log('연결 성공!');
      console.log('roomId', roomId.id);

      // send,,subscribe,,publish ,,
      // 특정 채팅방에 topic으로 subscribe
      // 받아온 데이터를 subcribe하고, publish하여 데이터를 받아오도록 한다?
      client.subscribe('/topic/room/' + roomId.id, (message) => {
        console.log('구독 성공!');
        console.log('Received message:', message.body);
        if (message) {
          // 새로 받은 메시지를 기존 채팅 배열에 추가
          console.log('채팅리스트에 추가한다!');
          let msg = JSON.parse(message.body);
          setChatList((prevChats) => {
            // [...chats, msg]}
            const isMessageExists = prevChats.some((chat) => chat.chatId === msg.id);
            return isMessageExists ? prevChats : [...prevChats, msg];
          });
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
    console.log('추가한 채팅 리스트다! → ', chatList);
  }, [chatList]);

  // 컴포넌트 마운트 시 WebSocket 연결 및 메시지 내용 불러오기
  useEffect(() => {
    connectWebSocket();
    getChatMessage();
    console.log('userId : ', userId);

    return () => disConnect();
  }, []);

  return (
    <MobileContainer>
      <S.Container>
        <S.ChatHeader>
          <S.Title>title</S.Title>
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
                  <S.Time>{chat.localTime.slice(-8, -3)}</S.Time>
                </S.MessageBox>
              </S.MessageWrapper>
            );
          })}
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
  `
};
