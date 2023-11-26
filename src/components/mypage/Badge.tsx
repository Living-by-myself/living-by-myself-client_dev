import { COLORS } from 'src/styles/styleConstants';
import { styleFont } from 'src/styles/styleFont';
import styled from 'styled-components';

// seed, // 커뮤니티 5개 생성
//     sprout, // 커뮤니티 10개 생성
//     branch, // 커뮤니티 20개 생성
//     flower, // 커뮤니티 50개 생성
//     tree, // 커뮤니티 100개 생성
//     good, // 좋아요 50개 이상
//     perfect, // 좋아요 100개 이상
//     popular, // 조회수 100회 이상
//     celebrity // 조회수 500회 이상

// 리턴컴포넌트로 9개를 넣어주면 됨,,,,아이콘을 넣든가...
const BadgeGraphicPicker = (type: string) => {
  switch (type) {
    case 'seed':
      return <div>seed</div>;
    case 'sprout':
      return <div>sprout</div>;
    case 'branch':
      return <div>branch</div>;
    case 'flower':
      return <div>flower</div>;
    case 'tree':
      return <div>tree</div>;
    case 'good':
      return <div>good</div>;
    case 'perfect':
      return <div>perfect</div>;
    case 'popular':
      return <div>popular</div>;
    case 'celebrity':
      return <div>celebrity</div>;

    default:
      return <div>획득못함</div>;
  }
};

interface BadgeGraphicProps {
  type: string;
}

const BadgeGraphic = ({ type }: BadgeGraphicProps) => {
  return (
    <S.Badge>
      <S.BadgeGraphic>{BadgeGraphicPicker(type)}</S.BadgeGraphic>
      <S.BadgeTitle>뱃지명10자이내입니다.</S.BadgeTitle>
    </S.Badge>
  );
};

export default BadgeGraphic;

const S = {
  Badge: styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,
  BadgeGraphic: styled.div`
    width: 100px;
    height: 100px;
    background-color: gray;
    border-radius: 82px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${COLORS.GRAY[0]};
  `,
  BadgeTitle: styled.div`
    font-size: ${styleFont.h3};
    color: ${COLORS.GRAY[800]};
  `
};
