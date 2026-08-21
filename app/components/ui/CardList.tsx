import Pagination from './Pagination'
import Card from './Card'
import { getPosts } from '@/lib/data'

type CardListProps = {
  page: number;
  cat?: string;
};

const CardList = async ({ page, cat }: CardListProps) => {
  const { posts, count } = await getPosts(page, cat);

  const POST_PER_PAGE = 2;

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * page < count;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 overflow-x-hidden mb-20">
      <h1 className="my-10 font-extrabold text-2xl md:text-3xl lg:text-4xl tracking-tight">
        Recent Posts
      </h1>

      <div className="flex flex-col gap-10">
        {posts?.map((item: any, index: number) => (
          <Card item={item} key={item.id} index={index} />
        ))}
      </div>

      <div className="mt-14">
        <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
      </div>
    </div>
  );
};

export default CardList;