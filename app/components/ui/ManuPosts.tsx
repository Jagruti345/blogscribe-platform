import Image from "next/image";
import Link from "next/link";

type Post = {
  id: string;
  title: string;
  desc: string;
  img?: string;
  createdAt: string;
  slug: string;
  catSlug: string;
  user?: {
    name: string;
  }
};

const categoryColors: Record<string, string> = {
  style: "bg-blue-500",
  fashion: "bg-pink-500",
  food: "bg-green-500",
  culture: "bg-orange-500",
  travel: "bg-red-500",
  coding: "bg-purple-500",
};

const getData = async (popular: boolean): Promise<Post[]> => {
  try {
    const res = await fetch(`http://localhost:3000/api/posts?popular=${popular}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }
    const data = await res.json();
    return data.posts;
  } catch (error) {
    return [];
  }
};

const ManuPosts = async ({ withImage }: { withImage: boolean }) => {
  const posts = await getData(!withImage);

  if (!posts || posts.length === 0) {
    return <div className="text-sm text-gray-500">No posts found.</div>;
  }

  return (
    <div className='flex flex-col gap-6'>
        {posts.map((post) => {
          const date = new Date(post.createdAt).toLocaleDateString();
          const badgeColor = categoryColors[post.catSlug] || "bg-gray-500";
          return (
            <Link href={`/blog/${post.slug}`} key={post.id} className='flex items-center gap-4 group'>
              {withImage && (
                <div className='relative w-16 h-16 sm:w-20 sm:h-20 overflow-hidden rounded-full border-2 border-gray-200 dark:border-gray-800 shrink-0'>
                  <Image
                    src={post.img && post.img.trim() !== "" ? post.img : "/p1.jpeg"}
                    fill
                    alt={post.title}
                    className='object-cover transition-transform duration-500 group-hover:scale-110'
                  />
                </div>
              )}
              <div className='flex flex-col gap-1.5 flex-1 min-w-0'>
                <span className={`${badgeColor} text-white text-xs font-bold py-0.5 px-3 w-max rounded-full tracking-wider shadow-sm`}>
                  {post.catSlug.toUpperCase()}
                </span>
                <h3 className='text-gray-800 dark:text-gray-200 text-sm sm:text-base font-bold leading-tight group-hover:text-blue-500 transition-colors line-clamp-2'>
                  {post.title}
                </h3>
                <div className='text-xs font-medium text-gray-500 dark:text-gray-400'>
                  <span>{post.user?.name || "Anonymous"}</span>
                  <span> • {date}</span>
                </div>
              </div>
            </Link>
          )
        })}
    </div>
  )
}

export default ManuPosts