import { getAuthSession } from "@/app/utils/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const postSlug = searchParams.get("postSlug");

  if (!postSlug) {
    return new NextResponse(
      JSON.stringify({ message: "Post slug missing" }),
      { status: 400 }
    );
  }

  try {
    const comments = await prisma.comment.findMany({
      where: { postSlug }, // ✅ simple + correct
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(comments);

  } catch (err) {
    console.error("GET COMMENTS ERROR:", err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};


export const POST = async (req: Request) => {
  const session = await getAuthSession();

  if (!session?.user?.id) {
    return new NextResponse(
      JSON.stringify({ message: "Unauthorized" }),
      { status: 401 }
    );
  }

  try {
    const body = await req.json();

    if (!body?.desc || !body?.postSlug) {
      return new NextResponse(
        JSON.stringify({ message: "Missing fields" }),
        { status: 400 }
      );
    }

    const comment = await prisma.comment.create({
      data: {
        desc: body.desc,
        postSlug: body.postSlug,
        userId: session.user.id, // ✅ FIX
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json(comment);

  } catch (err) {
    console.error("POST COMMENT ERROR:", err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};