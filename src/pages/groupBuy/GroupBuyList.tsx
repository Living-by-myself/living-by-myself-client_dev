import { useQuery } from '@tanstack/react-query';
import React from 'react';
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
  const { option: queryOption } = useGroupBuyQuery();

  const { data, isError, isLoading } = useQuery<GroupBuyPageDataProps>(['groupBuyList', queryOption], () => {
    return getGroupBuyList(queryOption);
  });

  if (isLoading) return <div>로딩중</div>;
  if (isError) return <div>에러</div>;
  if (data.len === 0) return <div>데이터가 없습니다.</div>;

  return (
    <div>
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
    </div>
  );
};

export default GroupBuyList;
