"use client";

import { CreateBlog } from "../../actions/blogs";
import { useActionState, useEffect } from "react";
import { type FormState } from "../../actions/blogs";
import { useNotification } from "@/app/components/NotificationContext";
import { useRouter } from "next/navigation";

const initialState: FormState = {
  errors: {},
  values: { title: "", author: "", url: "" },
  success: false,
};

const inputClass =
  "w-full rounded-md bg-gray-800 focus:bg-gray-900 px-3 py-1.5 text-sm outline-none border border-gray-700 focus:border-teal-500 transition-colors";
const labelClass = "block text-sm text-gray-300 mb-1";
const errorClass = "text-xs text-red-400 mt-1";

const NewBlog = () => {
  const [state, formAction] = useActionState(CreateBlog, initialState);
  const { showNotification } = useNotification();
  const router = useRouter();
  useEffect(() => {
    if (state.success) {
      showNotification("blog created");
      router.push("/blogs");
    }
  }, [state, showNotification, router]);

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="bg-gray-700 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-teal-300 mb-4">New Note</h2>
        <form action={formAction} noValidate className="space-y-4">
          <div>
            <label className={labelClass}>
              Title
              <input
                type="text"
                name="title"
                defaultValue={state.values?.title}
                className={`${inputClass} mt-1`}
              />
            </label>
            {state.errors?.title && (
              <p className={errorClass}>{state.errors.title}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>
              Author
              <input
                type="text"
                name="author"
                defaultValue={state.values?.author}
                className={`${inputClass} mt-1`}
              />
            </label>
            {state.errors?.author && (
              <p className={errorClass}>{state.errors.author}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>
              Url
              <input
                type="url"
                name="url"
                defaultValue={state.values?.url}
                className={`${inputClass} mt-1`}
              />
            </label>
            {state.errors?.url && (
              <p className={errorClass}>{state.errors.url}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>
              Likes
              <input
                type="number"
                name="likes"
                className={`${inputClass} mt-1`}
              />
            </label>
          </div>

          <button
            type="submit"
            className="w-full text-sm rounded-md px-3 py-2 bg-teal-600 hover:bg-teal-500 text-gray-900 font-medium transition-colors"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewBlog;
