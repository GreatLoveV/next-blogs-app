import { db } from "@/db";
import { readingList } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export const addToReadingList = async (userId: number, blogId: number) => {
  await db.insert(readingList).values({ userId, blogId });
};

export const isInReadingList = async (userId: number, blogId: number) => {
  const entry = await db.query.readingList.findFirst({
    where: and(eq(readingList.userId, userId), eq(readingList.blogId, blogId)),
  });
  return !!entry;
};

export const getReadingList = async (userId: number) => {
  return db.query.readingList.findMany({
    where: eq(readingList.userId, userId),
    with: { blog: true },
  });
};

export const markAsRead = async (id: number, userId: number) => {
  await db
    .update(readingList)
    .set({ read: true })
    .where(and(eq(readingList.id, id), eq(readingList.userId, userId)));
};
