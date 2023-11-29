export interface ChatRoom {
  id: number;
  lastChatMsg: string;
  lastChatTime: string;
  userCount: number;
  title: string;
}

export interface ChatMessage {
  chatId: number;
  localTime: string;
  msg: string;
  responseDto: {
    id: number;
    nickname: string;
  };
}

export interface ChatUser {
  id: number;
  groupBuyingRoomId: number;
  profileImage: string;
  nickname: string;
  address: string;
}
