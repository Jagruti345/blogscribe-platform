import Pagination from './Pagination'
import Card from './Card'

type Post = {
  id: string;
  title: string;
  desc: string;
  img?: string;
  createdAt: string;
  slug: string;
  catSlug: string;
};

type CardListProps = {
  page: number;
  cat?: string;
};

type PostResponse = {
  posts: Post[];
  count: number;
};

const getData = async (page: number, cat?: string): Promise<PostResponse> => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/posts?page=${page}&cat=${cat || ""}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return { posts: [], count: 0 };
    }

    return res.json();
  } catch (error) {
    return { posts: [], count: 0 };
  }
};

const CardList = async ({ page, cat }: CardListProps) => {
  const { posts, count } = await getData(page, cat);

  const POST_PER_PAGE = 2;

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * page < count;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 overflow-x-hidden mb-20">
  
  <h1 className="my-10 font-extrabold text-2xl md:text-3xl lg:text-4xl tracking-tight">
    Recent Posts
  </h1>

  <div className="flex flex-col gap-10">
    {posts?.map((item, index) => (
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