"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import {
  addToReadingList,
  markAsRead as markAsReadService,
} from "@/app/services/readingList";

const getCurrentUserId = async () => {
  const session = await auth();
  if (!session?.user?.email) throw new Error("Not authenticated");

  const user = await db.query.users.findFirst({
    where: eq(users.username, session.user.email),
  });
  if (!user) throw new Error("Not authenticated");

  return user.id;
};

export const addBlogToReadingList = async (formData: FormData) => {
  const userId = await getCurrentUserId();
  const blogId = Number(formData.get("blogId"));

  await addToReadingList(userId, blogId);

  revalidatePath(`/blogs/${blogId}`);
  revalidatePath("/me");
};

export const markReadingListItemAsRead = async (formData: FormData) => {
  const userId = await getCurrentUserId();
  const id = Number(formData.get("id"));

  await markAsReadService(id, userId);

  revalidatePath("/me");
};
