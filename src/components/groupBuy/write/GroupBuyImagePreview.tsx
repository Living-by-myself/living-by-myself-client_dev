import Icon from 'src/components/icon/Icon';
import { COLORS } from 'src/styles/styleConstants';
import styled from 'styled-components';

interface ImagePreviewProps {
  file: File;
  onClickRemove?: () => void;
}

const GroupBuyImagePreview = ({ file, onClickRemove }: ImagePreviewProps) => {
  return (
    <S.Container>
      <S.ImagePreview src={URL.createObjectURL(file)} alt="preview" />
      {onClickRemove && (
        <S.RemoveButton type="button" onClick={onClickRemove}>
          <Icon name="x" size={14} color={COLORS.GRAY[600]} />
        </S.RemoveButton>
      )}
    </S.Container>
  );
};

export default GroupBuyImagePreview;

const S = {
  Container: styled.div`
    position: relative;
  `,
  ImagePreview: styled.img`
    border: 1px solid ${COLORS.GRAY[300]};
    background-color: ${COLORS.GRAY[0]};
    width: 48px;
    height: 48px;
    aspect-ratio: 1;
    border-radius: 0.6rem;
    object-fit: cover;

    -webkit-user-select: none;
    user-select: none;

    &:hover {
      background-color: ${COLORS.GRAY[200]};
    }
  `,
  RemoveButton: styled.button`
    width: 2rem;
    height: 2rem;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    transform: translate(+50%, -50%);
    align-items: center;
    background-color: ${COLORS.GRAY[300]};
    position: absolute;
    top: 0;
    right: 0;
    &:hover {
      background-color: ${COLORS.GRAY[400]};
    }
  `
};
