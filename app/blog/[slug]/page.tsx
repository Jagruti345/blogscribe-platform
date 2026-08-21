import Comments from "@/app/components/ui/Comments";
import Menu from "@/app/components/ui/Menu";
import { getPostBySlug } from "@/lib/data";
import Image from "next/image";
import { notFound } from "next/navigation";

const SingleBlog = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const data = await getPostBySlug(slug);

  if (!data) {
    notFound();
  }

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
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                {data.user?.name || "Unknown"}
              </span>
              <span>
                {new Date(data.createdAt).toDateString()}
              </span>
            </div>
          </div>
          <div className="w-max px-4 py-1.5 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full text-xs font-semibold">
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
              dark:prose-invert
              max-w-none 
              text-gray-700 
              dark:text-gray-300
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