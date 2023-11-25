import { communityAPIOptionStore } from 'src/store/communityStore';

const CommunityListFilter = () => {
  const { category, sort, setCategory, setSort } = communityAPIOptionStore();

  return (
    <div>
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
          id="FREE"
          value="FREE"
          name="category"
          type="radio"
          checked={category === 'FREE'}
          onChange={() => setCategory('FREE')}
        />
        자유
        <input
          id="COOK"
          value="COOK"
          name="category"
          type="radio"
          checked={category === 'COOK'}
          onChange={() => setCategory('COOK')}
        />
        요리
        <input
          id="INTERIOR"
          value="INTERIOR"
          name="category"
          type="radio"
          checked={category === 'INTERIOR'}
          onChange={() => setCategory('INTERIOR')}
        />
        인테리어
        <input
          id="CLEAN"
          value="CLEAN"
          name="category"
          type="radio"
          checked={category === 'CLEAN'}
          onChange={() => setCategory('CLEAN')}
        />
        청소
      </div>

      <div>
        <input id="asc" value="asc" name="sort" type="radio" checked={sort === 'asc'} onChange={() => setSort('asc')} />
        최신순
        <input
          id="ALL"
          value="ALL"
          name="sort"
          type="radio"
          checked={sort === 'desc'}
          onChange={() => setSort('desc')}
        />
        오래된순
      </div>
    </div>
  );
};

export default CommunityListFilter;
