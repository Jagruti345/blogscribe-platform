import Image from 'next/image'
import Link from 'next/link'


const colors: string[] = [
  "bg-blue-100 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-800",
  "bg-green-100 dark:bg-green-900/40 border border-green-200 dark:border-green-800",
  "bg-pink-100 dark:bg-pink-900/40 border border-pink-200 dark:border-pink-800",
  "bg-purple-100 dark:bg-purple-900/40 border border-purple-200 dark:border-purple-800",
  "bg-orange-100 dark:bg-orange-900/40 border border-orange-200 dark:border-orange-800",
  "bg-gray-100 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700",
];

type Category = {
  id: string;
  slug: string;
  title: string;
  img?: string;
};

const getData = async (): Promise<Category[]> =>{
  try {
    const res = await fetch("http://localhost:3000/api/categories",{
      cache: "no-store",
    });

    if(!res.ok){
      return [];
    }

    return res.json();
  } catch (error) {
    return [];
  }
}

const CategoryList = async () => {

  const data = await getData();

  return (
    <div className='mt-10 mb-16'>
      <h1 className='my-10 font-extrabold text-2xl md:text-3xl lg:text-4xl tracking-tight'>Popular Categories</h1>
      <div className='flex flex-wrap justify-center lg:justify-between gap-4'>
        {data?.map((item, index) => (
  <Link
    href={`/blog?cat=${item.slug}`}
    key={item.id}
    className={`flex h-16 w-full lg:w-48 md:w-48 rounded-xl justify-center items-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-lg ${colors[index % colors.length]}`}
  >
    {item.img && (
      <Image
      src={item.img}
      alt={item.title}
      width={32}
      height={32}
      className="w-8 h-8 object-cover rounded-full shadow-sm"
    />)
}
    <span className="font-bold text-sm tracking-wider">{item.title.toUpperCase()}</span>
  </Link>
))}
      </div>
    </div>
  )
}

export default CategoryList