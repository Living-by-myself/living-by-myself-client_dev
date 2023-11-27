import { useInputErrorStore, useMesssageStore } from 'src/store/chatStore';
import { COLORS } from 'src/styles/styleConstants';
import { styleFont } from 'src/styles/styleFont';
import styled from 'styled-components';

const ChatMessageInput = () => {
  const { currentMessage, setCurrentMessage } = useMesssageStore();
  const { currentInputError, setCurrentInputError } = useInputErrorStore();

  return <></>;
};

export default ChatMessageInput;

const S = {};
