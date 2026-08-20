"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addBlog, incrementLike } from "@/app/services/blogs";
import { auth } from "@/auth";

export const CreateBlog = async (formData: FormData) => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  const newBlog = {
    title: formData.get("title") as string,
    author: formData.get("author") as string,
    url: formData.get("url") as string,
    likes: formData.get("likes") as unknown as number,
  };

  await addBlog(newBlog);
  revalidatePath("/blogs");
  redirect("/blogs");
};

export const addLike = async (formData: FormData) => {
  const id = Number(formData.get("id"));

  await incrementLike(id);

  revalidatePath(`/blogs/${id}`);
  revalidatePath("/blogs");
};
