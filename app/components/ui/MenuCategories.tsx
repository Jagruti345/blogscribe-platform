import Link from 'next/link'
import { getCategories } from '@/lib/data';

const colors: string[] = [
  "bg-blue-100 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300",
  "bg-green-100 dark:bg-green-900/40 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300",
  "bg-pink-100 dark:bg-pink-900/40 border border-pink-200 dark:border-pink-800 text-pink-800 dark:text-pink-300",
  "bg-purple-100 dark:bg-purple-900/40 border border-purple-200 dark:border-purple-800 text-purple-800 dark:text-purple-300",
  "bg-orange-100 dark:bg-orange-900/40 border border-orange-200 dark:border-orange-800 text-orange-800 dark:text-orange-300",
  "bg-gray-100 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-300",
];

const MenuCategories = async () => {
  const data = await getCategories();
  
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
      {data.map((item, index) => (
        <Link 
          href={`/blog?cat=${item.slug}`} 
          key={item.id}
          className={`flex h-12 rounded-xl justify-center items-center font-bold text-sm tracking-wide transition-all hover:scale-105 hover:shadow-md ${colors[index % colors.length]}`}
        >
          {item.title}
        </Link>
      ))}
    </div>
  )
}

export default MenuCategories