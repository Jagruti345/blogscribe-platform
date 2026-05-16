
import Comments from "@/app/components/ui/Comments";
import Menu from "@/app/components/ui/Menu";
import { User } from "next-auth";
import Image from "next/image";

type Post = {
  id: string;
  title: string;
  desc: string;
  img?: string;
  createdAt: string;
  slug: string;
  views: number;
  userId: string;
  catId: string;
  catSlug: string;
  user?: User;  
};

const getData = async (slug : string): Promise<Post> => {
  const res = await fetch(
    `http://localhost:3000/api/posts/${slug}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
     const text = await res.text();   
    console.error("API ERROR:", text);
    throw new Error(`Failed: ${res.status}`);
  }

  return res.json();
};

const SingleBlog = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params; // ✅ FIX

  console.log("SLUG:", slug); // debug

  const data = await getData(slug);

  return (
    <div className="max-w-6xl mx-auto px-4">

  {/* TOP SECTION */}
  <div className="flex flex-col lg:flex-row items-start gap-12 mt-8">

    {/* LEFT */}
    <div className="flex flex-col flex-1 min-w-0">
      
      <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold leading-tight break-words">
        {data.title}
      </h1>

      {/* AUTHOR */}
      <div className="flex gap-3 pb-3 pt-4 items-center">
        <div className="relative w-12 h-12 shrink-0">
          <Image
            src={data.user?.image || "/userImage.jpg"}
            alt="user"
            fill
            className="rounded-full object-cover"
          />
        </div>

        <div className="flex flex-col text-gray-500 text-sm">
          <span className="font-semibold text-gray-700">
            {data.user?.name || "Unknown"}
          </span>
          <span>
            {new Date(data.createdAt).toDateString()}
          </span>
        </div>
      </div>
      <div className="w-20 px-3 py-3 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
  {data.views} Views
</div>
    </div>

    {/* RIGHT IMAGE */}
    <div className="relative w-full lg:w-[500px] h-64 md:h-80 lg:h-[350px] flex-shrink-0 overflow-hidden rounded-2xl">
      <Image
        src={data.img || "/p1.jpeg"}
        alt="blog"
        fill
        priority
        className="object-cover"
      />
    </div>

  </div>

  {/* CONTENT SECTION */}
  <div className="flex flex-col lg:flex-row gap-12 mt-12">

    {/* BLOG CONTENT */}
    <div className="flex-1 min-w-0">
      <div
        className="
          prose 
          max-w-none 
          text-gray-700 
          break-words 
          overflow-hidden
        "
        dangerouslySetInnerHTML={{ __html: data.desc }}
      />

      {/* COMMENTS */}
      <div className="mt-12">
        <Comments postSlug={slug} />
      </div>
    </div>

    {/* SIDEBAR */}
    <div className="w-full lg:w-[300px] flex-shrink-0">
      <Menu />
    </div>

  </div>

</div>
  )
}

export default SingleBlog