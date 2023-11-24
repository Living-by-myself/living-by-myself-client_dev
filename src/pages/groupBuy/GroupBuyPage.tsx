import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { getGroupBuyList } from 'src/api/groupBuy/groupBuy';
import GroupBuyPostCard from 'src/components/groupBuy/GroupBuyPostCard';
import { MobileContainer } from 'src/styles/styleBox';
import { GroupBuyPreviewType } from 'src/types/groupBuy/types';
import styled from 'styled-components';

const DUMMY_DATA: GroupBuyPreviewType[] = [
  {
    id: 1,
    title: '폴라로이드 카메라 필름 4명 공동구매합니다',
    maxUser: 4,
    currentUserCount: 1,
    fileUrls: 'https://placehold.co/100',
    perUserPrice: 900000,
    enumShare: 'BUY',
    address: '서울시 강남구',
    createdAt: '2023-11-16T19:47:16.488675',
    modifiedAt: '2023-11-16T19:47:16.488675',
    viewCnt: 0,
    beobJeongDong: '12345'
  },
  {
    id: 2,
    title: '폴라로이드 카메라 필름 4명 공동구매합니다',
    maxUser: 4,
    currentUserCount: 1,
    fileUrls: 'https://placehold.co/100',
    perUserPrice: 900000,
    enumShare: 'BUY',
    address: '서울시 강남구',
    createdAt: '2023-11-16T19:47:16.488675',
    modifiedAt: '2023-11-16T19:47:16.488675',
    viewCnt: 0,
    beobJeongDong: '12345'
  },
  {
    id: 3,
    title: '폴라로이드 카메라 필름 4명 공동구매합니다',
    maxUser: 4,
    currentUserCount: 1,
    fileUrls: 'https://placehold.co/100',
    perUserPrice: 900000,
    enumShare: 'BUY',
    address: '서울시 강남구',
    createdAt: '2023-11-16T19:47:16.488675',
    modifiedAt: '2023-11-16T19:47:16.488675',
    viewCnt: 0,
    beobJeongDong: '12345'
  },
  {
    id: 4,
    title: '폴라로이드 카메라 필름 4명 공동구매합니다',
    maxUser: 4,
    currentUserCount: 1,
    fileUrls: 'https://placehold.co/100',
    perUserPrice: 900000,
    enumShare: 'BUY',
    address: '서울시 강남구',
    createdAt: '2023-11-16T19:47:16.488675',
    modifiedAt: '2023-11-16T19:47:16.488675',
    viewCnt: 0,
    beobJeongDong: '12345'
  },
  {
    id: 5,
    title: '폴라로이드 카메라 필름 4명 공동구매합니다',
    maxUser: 4,
    currentUserCount: 1,
    fileUrls: 'https://placehold.co/100',
    perUserPrice: 900000,
    enumShare: 'BUY',
    address: '서울시 강남구',
    createdAt: '2023-11-16T19:47:16.488675',
    modifiedAt: '2023-11-16T19:47:16.488675',
    viewCnt: 0,
    beobJeongDong: '12345'
  },
  {
    id: 6,
    title: '폴라로이드 카메라 필름 4명 공동구매합니다',
    maxUser: 4,
    currentUserCount: 1,
    fileUrls: 'https://placehold.co/100',
    perUserPrice: 900000,
    enumShare: 'BUY',
    address: '서울시 강남구',
    createdAt: '2023-11-16T19:47:16.488675',
    modifiedAt: '2023-11-16T19:47:16.488675',
    viewCnt: 0,
    beobJeongDong: '12345'
  },
  {
    id: 7,
    title: '폴라로이드 카메라 필름 4명 공동구매합니다',
    maxUser: 4,
    currentUserCount: 1,
    fileUrls: 'https://placehold.co/100',
    perUserPrice: 900000,
    enumShare: 'BUY',
    address: '서울시 강남구',
    createdAt: '2023-11-16T19:47:16.488675',
    modifiedAt: '2023-11-16T19:47:16.488675',
    viewCnt: 0,
    beobJeongDong: '12345'
  },
  {
    id: 8,
    title: '폴라로이드 카메라 필름 4명 공동구매합니다',
    maxUser: 4,
    currentUserCount: 1,
    fileUrls: 'https://placehold.co/100',
    perUserPrice: 900000,
    enumShare: 'BUY',
    address: '서울시 강남구',
    createdAt: '2023-11-16T19:47:16.488675',
    modifiedAt: '2023-11-16T19:47:16.488675',
    viewCnt: 0,
    beobJeongDong: '12345'
  }
];

interface GroupBuyPageDataProps {
  groupBuyingResponseDtoList: GroupBuyPreviewType[];
  len: number;
}

const GroupBuyPage = () => {
  const [category, setCategory] = useState();
  const [share, setShare] = useState();
  const [status, setStatus] = useState();
  const [address, setAddress] = useState();
  // const [search, setSearch] = useState();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(12);
  const [sort, setSort] = useState('asc');
  const { data, isError, isLoading } = useQuery<GroupBuyPageDataProps>(['groupBuyList'], () => {
    return getGroupBuyList({ page, size, sort });
  });

  if (isLoading) return <div>로딩중</div>;
  if (isError) return <div>에러</div>;

  // const { data, isFetchingNextPage, hasNextPage, fetchNextPage, isLoading, isError } = useInfiniteQuery({
  //   queryKey: ['groupBuyList'],
  //   queryFn: getGroupBuyList,
  //   getNextPageParam: (lastPage) => lastPage.nextPage
  // });

  return (
    <MobileContainer>
      <S.FilterContainer></S.FilterContainer>
      <S.ContentsContainer>
        <ul
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            maxWidth: '500px'
          }}
        >
          {data.groupBuyingResponseDtoList.map((data) => {
            return (
              <li key={data.id} style={{ borderBottom: '1px solid #eee' }}>
                <Link to={`/group-buy/${data.id}`} state={{ id: data.id }}>
                  <GroupBuyPostCard data={data} />
                </Link>
              </li>
            );
          })}
        </ul>
      </S.ContentsContainer>
    </MobileContainer>
  );
};

export default GroupBuyPage;

const S = {
  FilterContainer: styled.div`
    width: 100%;
  `,
  ContentsContainer: styled.div`
    width: 100%;
  `
};
