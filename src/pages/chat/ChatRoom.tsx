import React, { useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import * as StompJs from '@stomp/stompjs';
import { token } from 'src/api/testAuth';

const ChatRoom = () => {
  // // (1) StompJs
  // const client = new StompJs.Client({
  //   brokerURL: 'wss://tracelover.shop/home/chat', // 웹 소켓 서버로 접속
  //   // connectHeaders: {
  //   //   login: 'user',
  //   //   passcode: 'password'
  //   // },
  //   debug: (str) => {
  //     console.log(str);
  //   },
  //   reconnectDelay: 5000, //자동 재연결을 위한 시간 설정
  //   heartbeatIncoming: 4000,
  //   heartbeatOutgoing: 4000 // 연결이 유지되고 있는지 확인
  // });

  // client.onConnect = (frame) => {
  //   console.log('연결 성공!');
  // };

  // client.activate();

  //--------------------

  // const client = useRef<StompJs.CompatClient>();

  // const connectHander = () => {
  //   client.current = StompJs.Stomp.over(()=>{
  //     const sock = new SockJS("https://tracelover.shop/home/chat");
  //     return sock;
  //   });
  //   client.current.connect(
  //     {
  //       Authorization: token
  //     },
  //     () => {
  //       client.current?.subscribe(
  //         `https://tracelover.shop/home/chat/1`,
  //         (message) => {
  //           setMessage(JSON.parse(message.body))
  //         }
  //       )
  //     }
  //   )
  // }

  //----------------------------------------------

  // (2) SockJS
  // const sock = new SockJS('https://tracelover.shop/home/chat');
  // const stomp = StompJs.Stomp.over(sock);
  // const headers = {
  //   Authorization: `Bearer ${token}`
  // };

  // 연결
  // const stompConnect = () => {
  //   try {
  //     stomp.debug = () => {};
  //     stomp.connect(headers, () => {
  //       console.log('WebSocket 연결 성공!');
  //       stomp.subscribe(
  //         `https://tracelover.shop/home/chat`,
  //         (data) => {
  //           const newMessage = JSON.parse(data.body);
  //         },
  //         headers
  //       );
  //     });
  //   } catch (error) {
  //     console.error('WebSocket 연결 실패:', error);
  //   }
  // };

  // const stompDisConnect = () => {
  //   try {
  //     stomp.debug = () => {};
  //     stomp.disconnect(() => {
  //       // 웹소켓이 계속 연결되기 때문에 연결을 꼭 끊어줘야함
  //       stomp.unsubscribe('sub-0');
  //     }, headers);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const sendMessage = () => {
  //   stomp.debug = () => {};
  //   const data = {
  //     id: 1,
  //     roomId: 1,
  //     sender: 'sender_nick',
  //     message: 'message',
  //     createAt: '11:04'
  //   };
  //   stomp.send('/pub/chat/message', headers, JSON.stringify(data));
  // };

  //------------------------------------------------------

  // (3) react 기반
  // useEffect(() => {
  //   const sock = new SockJS('https://tracelover.shop/home/chat');
  //   const client = StompJs.Stomp.over(sock);

  //   // 연결 성공 시 실행
  //   client.onConnect = (frame) => {
  //     console.log('연결 성공!');
  //     console.log(frame.headers['message']);
  //     console.log(frame.body);
  //   };
  //   // 연결 실패 시
  //   client.onStompError = (frame) => {
  //     console.log('연결 실패..');
  //     console.log(frame.headers['message']);
  //     console.log(frame.body);
  //   };

  //   client.activate();

  //   return () => {
  //     client.deactivate();
  //   };
  // }, []);

  return <>ChatRoom</>;
};

export default ChatRoom;
