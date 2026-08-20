import { db } from "../../db";
import { blogs } from "../../db/schema";
import { eq, ilike, desc } from "drizzle-orm";
import { getCurrentUser } from "./sessions";
interface NewBlogEntry {
  title: string;
  author: string;
  url: string;
  likes: number;
}
interface BlogEntry extends NewBlogEntry {
  id: number;
}

export const getBlogs = async (filter?: string | null) => {
  if (filter) {
    return db.query.blogs.findMany({
      where: filter ? ilike(blogs.title, `%${filter}%`) : undefined,
      orderBy: desc(blogs.likes),
    });
  }
  return db.query.blogs.findMany();
};

export const addBlog = async (newBlog: NewBlogEntry) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Not Logged in");
  }
  await db.insert(blogs).values({ ...newBlog, userId: user.id });
};

export const findBlogById = async (id: number) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id),
  });
};

export const incrementLike = async (id: number) => {
  const blog = await findBlogById(id);
  if (!blog) return null;
  return db
    .update(blogs)
    .set({ likes: blog.likes + 1 })
    .where(eq(blogs.id, id));
};
