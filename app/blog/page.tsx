
import CardList from '../components/ui/CardList'
import Menu from '../components/ui/Menu'

type BlogProps = {
   searchParams: Promise<{
    page?: string;
    cat?: string;
  }>;
};

const Blog = async ({searchParams}:BlogProps) => {
  const params = await searchParams;  
  const page = Math.max(1, Number(params?.page) || 1);
   const cat = params?.cat || "";

  return (
    <div className='p-2 '>
      <h1 className='bg-orange-600 text-white py-1 px-2 text-center text-xl font-bold '>{cat ? `${cat.toUpperCase()} BLOG` : "ALL BLOGS"}</h1>
      <div className='flex gap-12 '>
        <CardList page={page} cat={cat}/>
        <Menu />
      </div>
    </div>
  )
}

export default Blog