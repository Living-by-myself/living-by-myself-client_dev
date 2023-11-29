import { FetchNextPageOptions, InfiniteQueryObserverResult, useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroller';
import { Link } from 'react-router-dom';
import { getGroupBuyList } from 'src/api/groupBuy/groupBuy';
import GroupBuyPostCard from 'src/components/groupBuy/GroupBuyPostCard';
import { groupBuyAPIOptionStore } from 'src/store/groupStore';
import { COLORS } from 'src/styles/styleConstants';
import { styleFont } from 'src/styles/styleFont';
import { GroupBuyPreviewType } from 'src/types/groupBuy/types';
import styled from 'styled-components';

export interface GroupBuyPageQueryDataProp {
  data: GroupBuyPreviewType[];
  page: number;
  totalPages: number;
}

const GroupBuyList = () => {
  const { category, category_share, category_status, sort, keyword } = groupBuyAPIOptionStore();

  const { data, isLoading, isError, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['posts', { category, category_share, category_status, sort, keyword }],
    ({ pageParam = 0 }) =>
      getGroupBuyList({ page: pageParam, option: { category, category_share, category_status, sort, keyword } }),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage!.page + 1 < lastPage!.totalPages) {
          return lastPage!.page + 1;
        }
        return false;
      }
    }
  ) as InfiniteQueryObserverResult<GroupBuyPageQueryDataProp, Error> & {
    fetchNextPage: (
      options: FetchNextPageOptions
    ) => Promise<InfiniteQueryObserverResult<GroupBuyPageQueryDataProp, Error>>;
  };

  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>error...</div>;

  console.log(data);

  return (
    <div>
      <InfiniteScroll
        pageStart={0}
        loadMore={() => fetchNextPage()} // Add this line
        hasMore={hasNextPage} // Add this line
        loader={<div>Loading...</div>} // Add this line
      >
        {data.pages?.map((item, index) => {
          return (
            <div key={index}>
              {item.data.map((data) => {
                return (
                  <div key={data.id}>
                    <Link to={`/group-buy/${data.id}`}>
                      <GroupBuyPostCard data={data} />
                    </Link>
                  </div>
                );
              })}
            </div>
          );
        })}
      </InfiniteScroll>
      {!hasNextPage && <S.NoScroll>더 이상 게시글이 없습니다.</S.NoScroll>}
    </div>
  );
};

export default GroupBuyList;

const S = {
  NoScroll: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    ${styleFont.h3}
    color: ${COLORS.GREEN[400]};
    width: 100%;
    height: 30px;
    padding: 50px;
  `
};
