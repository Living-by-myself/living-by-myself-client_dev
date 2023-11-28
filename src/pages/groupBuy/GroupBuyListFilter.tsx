import React, { useEffect, useState } from 'react';
import { useGroupBuyQuery } from 'src/store/groupStore';
import userStore from 'src/store/userStore';
import {
  GroupBuyCategoriesValues,
  GroupBuyCategoryShareValues,
  GroupBuySortValues,
  GroupBuyStatusValues
} from 'src/types/groupBuy/types';

const GroupBuyListFilter = () => {
  const [category, setCategory] = useState<GroupBuyCategoriesValues>('ALL');
  const [share, setShare] = useState<GroupBuyCategoryShareValues>('ALL');
  const [status, setStatus] = useState<GroupBuyStatusValues>('DEADLINE');
  const [address, setAddress] = useState<string>('');
  const [searchAddress, setSearchAddress] = useState<number>(0);
  const [sort, setSort] = useState<GroupBuySortValues>('asc');
  const [page, setPage] = useState<number>(0);

  const { option, setOption } = useGroupBuyQuery();

  const { isLogged, profile } = userStore();

  useEffect(() => {
    if (isLogged && profile?.address) {
      const address = profile?.address.split(', ');

      setAddress(address[0]);
      setSearchAddress(Number(address[1])!);
    }
  }, []);

  useEffect(() => {
    setOption({
      page,
      sort,
      address: searchAddress,
      category,
      category_share: share,
      category_status: status
    });
  }, [category, share, status, address, searchAddress, sort, page]);

  return (
    <div>
      {' '}
      <label>
        <input
          type="checkbox"
          onChange={() => {
            if (status === 'DEADLINE') setStatus('ONGOING');
            else setStatus('DEADLINE');
          }}
        />
        진행중인것만 보기
      </label>
      <div>
        <input
          id="ALL"
          value="ALL"
          name="category"
          type="radio"
          checked={category === 'ALL'}
          onChange={() => setCategory('ALL')}
        />
        전체
        <input
          id="FOOD"
          value="FOOD"
          name="category"
          type="radio"
          checked={category === 'FOOD'}
          onChange={() => setCategory('FOOD')}
        />
        요리
        <input
          id="LIFE"
          value="LIFE"
          name="category"
          type="radio"
          checked={category === 'LIFE'}
          onChange={() => setCategory('LIFE')}
        />
        생활
        <input
          id="OTHER"
          value="OTHER"
          name="category"
          type="radio"
          checked={category === 'OTHER'}
          onChange={() => setCategory('OTHER')}
        />
        기타
      </div>
      <div>
        <input
          id="ALL"
          value="ALL"
          name="share"
          type="radio"
          checked={share === 'ALL'}
          onChange={() => setShare('ALL')}
        />
        전체
        <input
          id="SHARE"
          value="SHARE"
          name="share"
          type="radio"
          checked={share === 'SHARE'}
          onChange={() => setShare('SHARE')}
        />
        나눔
        <input
          id="BUY"
          value="BUY"
          name="share"
          type="radio"
          checked={share === 'BUY'}
          onChange={() => setShare('BUY')}
        />
        공구
      </div>
    </div>
  );
};

export default GroupBuyListFilter;
