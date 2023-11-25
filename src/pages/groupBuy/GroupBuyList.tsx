import { useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getGroupBuyList } from 'src/api/groupBuy/groupBuy';
import GroupBuyPostCard from 'src/components/groupBuy/GroupBuyPostCard';
import { useGroupBuyQuery } from 'src/store/groupStore';
import { GroupBuyPreviewType } from 'src/types/groupBuy/types';

interface GroupBuyPageDataProps {
  groupBuyingResponseDtoList: GroupBuyPreviewType[];
  len: number;
}

const GroupBuyList = () => {
  const { option: queryOption, setOption } = useGroupBuyQuery();
  const [postList, setPostList] = React.useState<GroupBuyPreviewType[]>([]);

  const { data, isError, isLoading } = useQuery<GroupBuyPageDataProps>(['groupBuyList', queryOption], () => {
    return getGroupBuyList(queryOption);
  });

  const list = useMemo(() => {
    if (!data && postList.length === 0) {
      return [];
    } else if (data && postList.length === 0) {
      setPostList(data.groupBuyingResponseDtoList);
      return data.groupBuyingResponseDtoList;
    } else if (data && postList.length !== 0) {
      if (data.groupBuyingResponseDtoList.length === 0) {
        return postList;
      } else {
        setPostList([...postList, ...data.groupBuyingResponseDtoList]);
        return [...postList, ...data.groupBuyingResponseDtoList];
      }
    }
  }, [data]);

  if (isLoading) return <div>로딩중</div>;
  if (isError) return <div>에러</div>;
  if (data.len === 0) return <div>데이터가 없습니다.</div>;

  return (
    <>
      <div>
        <ul
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            maxWidth: '500px'
          }}
        >
          {postList.map((data) => {
            return (
              <li key={data.id} style={{ borderBottom: '1px solid #eee' }}>
                <Link to={`/group-buy/${data.id}`} state={{ id: data.id }}>
                  <GroupBuyPostCard data={data} />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <button type="button" onClick={() => setOption({ ...queryOption, page: queryOption.page + 1 })}>
        더보기
      </button>
    </>
  );
};

export default GroupBuyList;
