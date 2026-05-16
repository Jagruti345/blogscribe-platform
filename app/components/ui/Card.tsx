'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

type Post = {
  id: string;
  title: string;
  desc: string;
  img?: string;
  createdAt: string;
  slug: string;
  catSlug: string;
};

type CardProps = {
  item: Post;
  index?: number;
};

const Card = ({ item, index = 0 }: CardProps) => {
  const date = new Date(item.createdAt).toLocaleDateString();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-12 flex flex-col lg:flex-row gap-8 group"
    >
      {/* IMAGE */}
      <div className="relative w-full lg:w-[400px] h-64 sm:h-72 lg:h-80 overflow-hidden rounded-2xl shrink-0 shadow-lg">
        <Image
          src={item.img && item.img.trim() !== "" ? item.img : "/p1.jpeg"}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 gap-4 min-w-0 justify-center">
        <div>
          <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">{date} • </span>
          <span className="text-blue-600 dark:text-blue-400 text-sm font-bold tracking-wider">
            {item.catSlug.toUpperCase()}
          </span>
        </div>

        {item.slug && (
          <Link href={`/blog/${item.slug}`}>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold leading-tight group-hover:text-blue-500 transition-colors duration-300">
              {item.title}
            </h1>
          </Link>
        )}

        <div
          className="text-sm sm:text-base text-gray-600 dark:text-gray-300 line-clamp-3 break-words font-medium"
          dangerouslySetInnerHTML={{
            __html: item.desc?.slice(0, 150) || "",
          }}
        />

        {item.slug && (
          <Link
            href={`/blog/${item.slug}`}
            className="text-blue-600 dark:text-blue-400 font-bold border-b-2 border-transparent hover:border-blue-600 dark:hover:border-blue-400 w-max pb-1 transition-all mt-2"
          >
            Read More →
          </Link>
        )}
      </div>
    </motion.div>
  );
};

export default Card;