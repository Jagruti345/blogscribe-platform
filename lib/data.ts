import prisma from "@/lib/prisma";
import { cache } from "react";

export type CategoryData = {
  id: string;
  slug: string;
  title: string;
  img?: string | null;
};

export type PostData = {
  id: string;
  title: string;
  desc: string;
  img?: string | null;
  createdAt: Date | string;
  slug: string;
  views: number;
  catSlug: string;
  user?: {
    name?: string | null;
    image?: string | null;
  } | null;
};

// Fetch categories with React cache to prevent redundant DB calls
export const getCategories = cache(async (): Promise<CategoryData[]> => {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        slug: true,
        title: true,
        img: true,
      },
    });
    return categories;
  } catch (error) {
    console.error("Error fetching categories directly:", error);
    return [];
  }
});

// Fetch posts with pagination / cat / popular filter
export const getPosts = cache(
  async (
    page: number = 1,
    cat?: string,
    popular: boolean = false
  ): Promise<{ posts: PostData[]; count: number }> => {
    const POST_PER_PAGE = popular ? 4 : 2;

    const whereClause = cat && cat.trim() !== "" ? { catSlug: cat } : {};

    try {
      const [posts, count] = await Promise.all([
        prisma.post.findMany({
          take: POST_PER_PAGE,
          skip: popular ? 0 : POST_PER_PAGE * (page - 1),
          where: whereClause,
          orderBy: popular ? { views: "desc" } : { createdAt: "desc" },
          select: {
            id: true,
            title: true,
            desc: true,
            img: true,
            createdAt: true,
            slug: true,
            views: true,
            catSlug: true,
            user: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        }),
        prisma.post.count({
          where: whereClause,
        }),
      ]);

      return { posts, count };
    } catch (error) {
      console.error("Error fetching posts directly:", error);
      return { posts: [], count: 0 };
    }
  }
);

// Fetch single post by slug
export const getPostBySlug = cache(async (slug: string): Promise<PostData | null> => {
  try {
    if (!slug) return null;

    // Increment view count & return post
    const post = await prisma.post.update({
      where: { slug },
      data: { views: { increment: 1 } },
      select: {
        id: true,
        title: true,
        desc: true,
        img: true,
        createdAt: true,
        slug: true,
        views: true,
        catSlug: true,
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    return post;
  } catch (error) {
    console.error(`Error fetching post ${slug}:`, error);
    return null;
  }
});
