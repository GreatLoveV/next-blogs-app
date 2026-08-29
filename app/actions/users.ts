"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export type FormState = {
  errors: Record<string, string>;
  values: {
    username: string;
    name: string;
    password: string;
    confirmPassword: string;
  };
};
export const registerUser = async (
  prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  const username = (formData.get("username") as string)?.trim();
  const name = (formData.get("name") as string)?.trim();
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmpassword") as string;

  const values = { username, name, password, confirmPassword };
  const errors: Record<string, string> = {};

  if (!username || username.length < 4) {
    errors.username = "username must be at least 4 characters";
  } else {
    const user = await db.query.users.findFirst({
      where: eq(users.username, username),
    });
    if (user) {
      errors.username = "username already exists";
    }
  }

  if (!password || password.length < 4) {
    errors.password = "password must be at least 5 characters";
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = "the passwords don't match";
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await db.insert(users).values({ username, name, passwordHash });

  redirect("/login");
};

export const generateToken = async () => {
  const session = await auth();
  console.log("session in action:", session);

  if (!session?.user?.id) throw new Error("Not authenticated");

  const newToken = randomUUID();

  const id = Number(session.user.id);

  await db.update(users).set({ token: newToken }).where(eq(users.id, id));
  revalidatePath("/me");
};
