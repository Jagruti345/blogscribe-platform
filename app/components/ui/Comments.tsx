"use client";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useState } from "react";

type Comment = {
  id: string;
  desc: string;
  createdAt: string;
  user?: {
    name?: string;
    image?: string;
  };
};

const fetcher = async (url: string) =>{
   const res = await fetch(url);
   const data = await res.json();
   if(!res.ok){
    throw new Error(data.message || "Failed to fetch");
   }

   return data;

}
const Comments = ({ postSlug }: { postSlug: string }) => {
  const  {status} = useSession();

  const {data,mutate, isLoading} = useSWR<Comment[]>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/comments?postSlug=${postSlug}`,fetcher);

  const [desc, setDesc] = useState("");

  const handleSubmit = async () => {
    try{
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/comments`,{
        method: "POST", 
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ desc, postSlug })
      });
      setDesc(""); 
      mutate();
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  return (
    <div className="mt-12">
  <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-500 mb-7">
    Comments
  </h1>

  {/* INPUT */}
  {status === "authenticated" ? (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <textarea
        placeholder="Write a comment..."
        className="p-4 w-full border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-700"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <button
        className="px-5 py-3 bg-green-800 text-white font-semibold rounded-lg hover:bg-green-700 transition"
        onClick={handleSubmit}
      >
        Send
      </button>
    </div>
  ) : (
    <Link href="/login" className="text-blue-500 underline">
      Login to write a comment
    </Link>
  )}

  {/* SCROLLABLE COMMENTS */}
  <div className="max-h-100 md:max-h-200 overflow-y-auto pr-2 space-y-6  pt-6">

    {isLoading
      ? "loading..."
      : data?.map((item) => (
          <div key={item.id} className="flex flex-col">
            
            {/* USER */}
            <div className="flex items-center gap-4 mb-2">
              <div className="relative w-10 h-10">
                <Image
                  src={item.user?.image || "/p1.jpeg"}
                  alt=""
                  fill
                  className="rounded-full object-cover"
                />
              </div>

              <div className="text-sm">
                <p className="font-semibold text-gray-800">
                  {item.user?.name || "Anonymous"}
                </p>
                <p className="text-gray-400 text-xs">
                  {new Date(item.createdAt).toDateString()}
                </p>
              </div>
            </div>

            {/* COMMENT */}
            <p className="text-gray-600 text-sm break-words">
              {item.desc}
            </p>
          </div>
        ))}
  </div>
</div>
  )
}

export default Comments