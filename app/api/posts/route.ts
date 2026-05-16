import { getAuthSession } from "@/app/utils/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);

  const pageParam = Number(searchParams.get("page"));
  const page = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;

  const cat = searchParams.get("cat") || undefined; 
  const popular = searchParams.get("popular") === "true";

  const POST_PER_PAGE = popular ? 4 : 2;

  const query = {
    take: POST_PER_PAGE,
    skip: popular ? 0 : POST_PER_PAGE * (page - 1),
    where: cat ? { catSlug: cat } : {},
    orderBy: popular ? { views: "desc" as const } : { createdAt: "desc" as const },
  };

  try {
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany(query),
      prisma.post.count({
        where: cat ? { catSlug: cat } : {},
      }),
    ]);

    return new NextResponse(
      JSON.stringify({ posts, count }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};


export const POST = async (req: Request) => {
  const session = await getAuthSession();
  
  if (!session?.user) {
    return new NextResponse(
      JSON.stringify({ message: "Unauthorized" }),
      { status: 401 }
    );
  }

  try {
    const body = await req.json();

    // ✅ generate slug
    const baseSlug = body.title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

    const slug = `${baseSlug}-${Date.now()}`;

    const post = await prisma.post.create({
       data: {
        title: body.title,
        desc: body.content,
        img: body.image,
        slug,
        catSlug: body.catSlug || "general",
        userId: session?.user?.id || null, // Allow anonymous posts
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json(post, { status: 200 });
    
  } catch (err) {
    console.log(err);
     return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};