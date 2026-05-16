"use client"
import { toast } from "react-hot-toast";
import Image from "next/image"
import React, { useState } from "react"
import dynamic from "next/dynamic"
import "react-quill-new/dist/quill.bubble.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ReactQuill = dynamic(() => import("react-quill-new"), {
    ssr: false,
});



const WritePage = () => {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [category, setCategory] = useState("general"); // ✅ default

const uploadFile = async () => {
  if (!file) return null;

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  return data.url; // ✅ RETURN URL
};

const handlePublish = async () => {
  try {
    if (!title) {
      alert("Title is required");
      return;
    }

    if (!value) {
      alert("Content is required");
      return;
    }

    setLoading(true); // ✅ start loading

    const imageUrl = await uploadFile();

    if (!imageUrl) {
      alert("Image upload failed");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content: value,
        image: imageUrl,
        catSlug: category,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error(data);
      toast.error("Post failed ❌");
      setLoading(false);
      return;
    }

    // ✅ SUCCESS
    toast.success("Post created!");

    setTitle("");
    setValue("");
    setFile(null);
    setOpen(false);

  } catch (err) {
    console.error(err);
    toast.error("Something went wrong ❌");
  } finally {
    setLoading(false); // ✅ stop loading ALWAYS
  }
};


    const {status} = useSession()
    const router = useRouter()

    if (status === "loading") {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a1222]">
          <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )
    }

    React.useEffect(() => {
      if (status === "unauthenticated") {
        router.push("/login")
      }
    }, [status, router]);

    if (status === "unauthenticated") {
      return null
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    setFile(file);
  }
};

    return (
  <div className="min-h-screen bg-[#0a1222] px-4 md:px-8 lg:px-16 py-6">

    {/* HEADER */}
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full md:w-3/4 p-4 md:p-5 font-bold text-white text-2xl md:text-3xl lg:text-4xl bg-transparent outline-none"
      />

      <button
        onClick={handlePublish}
        disabled={loading}
        className={`w-full md:w-auto px-6 py-3 rounded-lg text-white font-semibold 
        ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-[#1a8917] hover:bg-green-700"}
        transition`}
      >
        {loading ? "Publishing..." : "Publish"}
      </button>
    </div>

    {/* TOOLBAR */}
    <div className="mt-6 flex flex-col gap-4">

      <button
        className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center"
        onClick={() => setOpen(!open)}
      >
        <Image src="/plus.png" alt="plus" width={28} height={28} />
      </button>

      {open && (
        <div className="flex flex-col gap-4">

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap gap-3 items-center">

            <input type="file" id="image" onChange={handleChange} className="hidden" />

            <label htmlFor="image" className="cursor-pointer">
              <div className="w-10 h-10 rounded-full border border-green-600 flex items-center justify-center">
                <Image src="/image.png" alt="img" width={24} height={24} />
              </div>
            </label>

            <div className="w-10 h-10 rounded-full border border-green-600 flex items-center justify-center">
              <Image src="/external.jpg" alt="ext" width={24} height={24} />
            </div>

            <div className="w-10 h-10 rounded-full border border-green-600 flex items-center justify-center">
              <Image src="/video.png" alt="video" width={24} height={24} />
            </div>

          </div>

          {/* CATEGORY */}
          <div className="flex flex-wrap gap-2">
            {["general","style","fashion","food","travel","culture","coding"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1 text-sm rounded-full border 
                ${category === cat 
                  ? "bg-green-700 text-white" 
                  : "bg-[#1f2937] text-gray-300"}
                `}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* IMAGE PREVIEW */}
          {file && (
            <Image
              src={URL.createObjectURL(file)}
              alt="preview"
              width={200}
              height={200}
              className="rounded-lg border border-gray-600"
            />
          )}
        </div>
      )}
    </div>

    {/* EDITOR */}
    <div className="mt-6 bg-[#111827] rounded-lg p-3 md:p-5">
      <div className="min-h-[250px] md:min-h-[350px] lg:min-h-[450px] overflow-y-auto text-gray-300">
        <ReactQuill
          theme="bubble"
          value={value}
          onChange={setValue}
          placeholder="Tell your story..."
        />
      </div>
    </div>

  </div>
);
}

export default WritePage;