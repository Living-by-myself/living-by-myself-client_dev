import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getChatList } from 'src/api/testChat';
import { MobileContainer } from 'src/styles/styleBox';
import { COLORS } from 'src/styles/styleConstants';
import { styleFont } from 'src/styles/styleFont';
import { ChatFormData } from 'src/types/chat/types';
import styled from 'styled-components';
import { z } from 'zod';
import SockJS from 'sockjs-client';
import * as StompJs from '@stomp/stompjs';

const Dummy = [
  {
    userId: 1,
    id: 1,
    nickname: '내매세지',
    content: '안녕하세요 내매세지입니다.',
    getCreatedAtAsString: '2023-11-08 14:56:26'
  },
  {
    userId: 2,
    id: 2,
    nickname: '상대매세지1',
    content: '안녕하세요',
    getCreatedAtAsString: '2023-11-08 14:58:26'
  },
  {
    userId: 2,
    id: 2,
    nickname: '상대매세지1',
    content: '안녕하세요',
    getCreatedAtAsString: '2023-11-08 14:58:26'
  },
  {
    userId: 3,
    id: 3,
    nickname: '상대매세지2',
    content: '안녕하세요',
    getCreatedAtAsString: '2023-11-08 14:59:26'
  }
];

const schema = z.object({
  message: z.string().min(1, { message: '1자 이상 입력하세요.' }).max(1000, { message: '1000자 이내로 입력하세요.' })
});

const ChatDetailPage = () => {
  const userId = 1;
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('atk');

  const { register, handleSubmit } = useForm<ChatFormData>({
    resolver: zodResolver(schema)
  });

  // socket 연결 시도
  useEffect(() => {
    console.log('token : ', token);
    const client = new StompJs.Client({
      brokerURL: 'wss://tracelover.shop/home/chat', // 웹 소켓 서버로 접속
      connectHeaders: {
        Authorization: token!
      },
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000, //자동 재연결을 위한 시간 설정
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000 // 연결이 유지되고 있는지 확인
    });

    client.onConnect = (frame) => {
      console.log('연결 성공!');
    };

    client.activate();
  }, []);

  return (
    <MobileContainer>
      <S.Container>
        헤더변경필요
        {/*채팅 관련 하나의 컴포넌트로 내부에서 또다시 map을 돌려야함 한 줄에 유저가 나냐 아니냐로 구분해서 */}
        <S.Inner>
          {Dummy.map((message) => {
            return (
              <S.MessageWrapper>
                {message.userId !== userId && <S.Nickname>{message.nickname}</S.Nickname>}
                <S.MessageBox $isMine={message.userId === userId}>
                  <S.MessageContent $isMine={message.userId === userId}>
                    <S.Message>{message.content}</S.Message>
                  </S.MessageContent>
                  <S.Time>{message.getCreatedAtAsString.slice(-8, -3)}</S.Time>
                </S.MessageBox>
              </S.MessageWrapper>
            );
          })}
        </S.Inner>
        <S.MessageInputBox>
          <S.MessageInput
            {...register('content')}
            placeholder="메세지를 작성하시오."
            id="chatMessage"
            onChange={(e) => setMessage(e.target.value)}
          />
          <S.MessageInputButton
            type="submit"
            onClick={handleSubmit((data) => {
              console.log(data);
              console.log(message);
            })}
          >
            전송
          </S.MessageInputButton>
        </S.MessageInputBox>
      </S.Container>
      {/* 메세지 보내는 훅 */}
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
  MessageInput: styled.input`
    padding: 13px;
    min-height: 40px;
    min-width: 80%;

    border: 1px solid ${COLORS.GRAY[200]};
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
  Inner: styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
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
  Nickname: styled.p``
};
