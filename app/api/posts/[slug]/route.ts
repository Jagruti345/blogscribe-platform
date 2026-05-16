import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export const GET = async (
  req: Request,
  { params }: { params: Promise<{ slug: string }> } // ✅ FIX
) => {
  try {
    const { slug } = await params; // ✅ IMPORTANT

    console.log("API SLUG:", slug); // debug

    if (!slug) {
      return new NextResponse(
        JSON.stringify({ message: "Slug missing" }),
        { status: 400 }
      );
    }

    const post = await prisma.post.update({
      where: { slug },
      data: { views: { increment: 1 } },
      include: { user: true },
    });

    if (!post) {
      return new NextResponse(
        JSON.stringify({ message: "Post not found" }),
        { status: 404 }
      );
    }

    return NextResponse.json(post);

  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};