import { GroupBuyPreviewType } from 'src/types/groupBuy/types';
import Icon from '../icon/Icon';
import styled from 'styled-components';
import { COLORS } from 'src/styles/styleConstants';
import { addResizeToUrl, getImageUrls } from 'src/utilities/image';
import { styleFont } from 'src/styles/styleFont';
import StatusBadge from './StatusBadge';
import { getRelativeTimeString } from 'src/utilities/getDate';

interface GroupBuyPreviewProps {
  data: GroupBuyPreviewType;
}

const GroupBuyPostCard = ({ data }: GroupBuyPreviewProps) => {
  const { title, maxUser, currentUserCount, createdAt, fileUrls, perUserPrice, enumShare, address } = data;

  const firstImage = getImageUrls(fileUrls)[0];

  return (
    <S.Container>
      <S.PreviewImage src={addResizeToUrl(firstImage)} width={100} height={100} />
      <S.PreviewInfo>
        <S.Title>{title}</S.Title>
        <S.AddressTimeBox>
          {address} · {getRelativeTimeString(createdAt)}
        </S.AddressTimeBox>
        <S.PreviewSellInfo>
          <StatusBadge variant="secondary">{enumShare === 'BUY' ? '모집중' : '나눔중'}</StatusBadge>
          <S.Price>{perUserPrice.toLocaleString()}원</S.Price>
          <S.PreviewParticipants>
            <Icon name="users" color={COLORS.GRAY[500]} size={16} />
            {/* <Typography variants="caption1"> */}
            {currentUserCount}/{maxUser}명{/* </Typography> */}
          </S.PreviewParticipants>
        </S.PreviewSellInfo>
      </S.PreviewInfo>
    </S.Container>
  );
};

export default GroupBuyPostCard;

const S = {
  Container: styled.div`
    padding: 14px 0 16px;
    width: 100%;
    border-bottom: 1px solid ${COLORS.GRAY[200]};
    display: flex;
    gap: 10px;
  `,
  AddressTimeBox: styled.div`
    ${styleFont.body4}
    color: ${COLORS.GRAY[400]};
  `,
  PreviewImage: styled.img`
    width: 100px;
    height: 100px;
    border-radius: 10px;
  `,
  Price: styled.div`
    ${styleFont.h4}
  `,
  PreviewInfo: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
  `,
  Title: styled.h1`
    ${styleFont.h4}
    color: ${COLORS.GRAY[900]};
    word-break: break-all;
  `,
  PreviewSellInfo: styled.div`
    display: flex;
    align-items: center;
    gap: 0.4rem;
  `,
  PreviewParticipants: styled.div`
    margin-left: auto;
    display: flex;
    align-items: center;
    ${styleFont.body3}

    /* margin-top: 0.4rem; */
    gap: 6px;
  `,
  TimeViewBox: styled.div`
    display: flex;
    align-items: center;
    margin-right: auto;
  `,
  Time: styled.p``,
  View: styled.p``
};
