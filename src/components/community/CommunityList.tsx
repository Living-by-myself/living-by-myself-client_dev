import CommunityPostCard from 'src/components/community/CommunityPostCard';
import { InfiniteQueryObserverResult, useInfiniteQuery } from '@tanstack/react-query';
import { getCommunityPostList } from 'src/api/community/community';
import InfiniteScroll from 'react-infinite-scroller';
import { Link } from 'react-router-dom';
import { CommunityQueryData, FetchNextPageOptions } from 'src/pages/community/CommunityPage';
import { communityAPIOptionStore } from 'src/store/communityStore';

const CommunityList = () => {
  const { category, sort, keyword } = communityAPIOptionStore();

  const { data, isLoading, isError, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['posts', { category, sort, keyword }],
    ({ pageParam = 0 }) => getCommunityPostList({ page: pageParam, option: { category, keyword, sort } }),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage!.page + 1 < lastPage!.totalPages) {
          return lastPage!.page + 1;
        }
        return false;
      }
    }
  ) as InfiniteQueryObserverResult<CommunityQueryData, Error> & {
    fetchNextPage: (options: FetchNextPageOptions) => Promise<InfiniteQueryObserverResult<CommunityQueryData, Error>>;
  };

  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>error...</div>;

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
              {item.data.map((post) => {
                return (
                  <div key={post.id}>
                    <Link to={`/community/${post.id}`}>
                      <CommunityPostCard post={post} />
                    </Link>
                  </div>
                );
              })}
            </div>
          );
        })}
      </InfiniteScroll>
    </div>
  );
};

export default CommunityList;

// );
//         }}
//         hasMore={hasNextPage}
//         loader={
//           <div className="loader" key={0}>
//             Loading ...
//           </div>
//         }
//       >
//       {data.pages?.map((item) => {
//         return item.data.map((post) => {
//           return (
//             <li key={post.id}>
//               <Link to={`/community/${post.id}`}>
//                 <CommunityPostCard post={post} />
//               </Link>
//             </li>
//           );
//         });
//       })}
//     </InfiniteScroll>
//   </div>
// );
