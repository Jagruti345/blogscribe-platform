"use client"
import { useRouter } from "next/navigation";

type PaginationProps = {
  page: number;
  hasPrev: boolean;
  hasNext: boolean;
};
const Pagination = ({page,hasPrev,hasNext}:PaginationProps) => {
  const router = useRouter();

  const handleNext = () => {
    router.push(`/?page=${page + 1}`);
  };

  const handlePrev = () => {
    if (page > 1) {
      router.push(`/?page=${page - 1}`);
    }
  };

  return (
    <div className='flex justify-between'>
      <button
  onClick={handlePrev}
  disabled={!hasPrev}
  className="px-4 py-2 rounded-lg transition duration-300 
  bg-red-600 hover:bg-red-400 
  disabled:bg-gray-400 disabled:hover:bg-gray-400 
  disabled:cursor-not-allowed disabled:opacity-60"
>
  Previous
</button>

<button
  onClick={handleNext}
  disabled={!hasNext}
  className="px-4 py-2 rounded-lg transition duration-300 
  bg-red-600 hover:bg-red-400 
  disabled:bg-gray-400 disabled:hover:bg-gray-400 
  disabled:cursor-not-allowed disabled:opacity-60"
>
  Next
</button>
      
    </div>
  )
}

export default Pagination