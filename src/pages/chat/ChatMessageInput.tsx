import { useInputErrorStore, useMesssageStore } from 'src/store/chatStore';
import { COLORS } from 'src/styles/styleConstants';
import { styleFont } from 'src/styles/styleFont';
import styled from 'styled-components';

const ChatMessageInput = () => {
  const { currentMessage, setCurrentMessage } = useMesssageStore();
  const { currentInputError, setCurrentInputError } = useInputErrorStore();

  return (
    <>
      <S.MessageInput
        placeholder="메세지를 작성하시오."
        id="chatMessage"
        value={currentMessage}
        onChange={(e) => {
          setCurrentMessage(e.target.value);
          setCurrentInputError(false);
        }}
        hasError={currentInputError}
      />
    </>
  );
};

export default ChatMessageInput;

const S = {
  MessageInput: styled.input<{ hasError: boolean }>`
    padding: 13px;
    min-height: 40px;
    min-width: 80%;
    outline: none;
    border: ${({ hasError }) => (hasError ? '1px solid red' : 'none')};
    font-size: ${styleFont.body3};
    background-color: ${COLORS.GRAY[200]};
    border-radius: 50px;
  `
};
