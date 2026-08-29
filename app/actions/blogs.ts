"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addBlog, incrementLike } from "@/app/services/blogs";
import { auth } from "@/auth";
export type FormState = {
  errors: Record<string, string>;
  values: {
    title: string;
    author: string;
    url: string;
  };
  success: boolean;
};

export const CreateBlog = async (
  prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const url = formData.get("url") as string;
  const likes = Number(formData.get("likes")) || 0;

  const values = { title, author, url };
  const errors: Record<string, string> = {};

  if (!title || title.length < 5) {
    errors.title = "title must be at least 5 characters";
  }
  if (!author || author.length < 5) {
    errors.author = "author must be at least 5 characters";
  }
  if (!url || url.length < 5) {
    errors.url = "url must be at least 5 characters";
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values, success: false };
  }

  await addBlog({ title, author, url, likes });
  revalidatePath("/blogs");
  return {
    errors: {},
    values: { title: "", author: "", url: "" },
    success: true,
  };
};

export const addLike = async (formData: FormData) => {
  const id = Number(formData.get("id"));

  await incrementLike(id);

  revalidatePath(`/blogs/${id}`);
  revalidatePath("/blogs");
};
