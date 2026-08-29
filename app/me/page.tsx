import { auth } from "@/auth";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { generateToken } from "../actions/users";
import { markReadingListItemAsRead } from "../actions/readingList";
import { users } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { getReadingList } from "@/app/services/readingList";

export default async function MePage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const user = await db.query.users.findFirst({
    where: eq(users.username, session.user?.email as string),
  });

  if (!user) {
    notFound();
  }

  const readingListItems = await getReadingList(user.id);
  const unread = readingListItems.filter((item) => !item.read);
  const read = readingListItems.filter((item) => item.read);

  return (
    <div className="flex flex-col items-center gap-6 px-4 py-10">
      <div className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-800 p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-slate-100">My Profile</h2>

        <div className="mt-4 space-y-2 text-sm">
          <p>
            <span className="font-semibold text-slate-300">Name:</span>{" "}
            <span className="text-slate-400">{session.user?.name}</span>
          </p>
          <p>
            <span className="font-semibold text-slate-300">Username:</span>{" "}
            <span className="text-slate-400">{session.user?.email}</span>
          </p>
        </div>

        <hr className="my-6 border-slate-700" />

        <h3 className="text-lg font-bold text-slate-100">API Token</h3>

        <div className="mt-3 rounded-lg border border-slate-700 bg-slate-900 p-4">
          <p className="text-xs font-medium text-slate-500">Current token:</p>
          <p className="mt-1 break-all rounded-md bg-slate-800 px-3 py-2 font-mono text-sm text-slate-300">
            {user.token ?? "No token generated yet"}
          </p>
        </div>

        <form action={generateToken} className="mt-4">
          <button
            type="submit"
            className="w-full rounded-md bg-slate-600 px-4 py-2.5 text-sm font-semibold text-slate-100 transition-colors hover:bg-slate-500 active:bg-slate-700"
          >
            Generate New Token
          </button>
        </form>
      </div>

      <div className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-800 p-8 shadow-lg">
        <h3 className="text-lg font-bold text-slate-100">Reading List</h3>

        <div className="mt-4">
          <h4 className="text-sm font-semibold text-slate-300">
            Unread ({unread.length})
          </h4>
          {unread.length === 0 ? (
            <p className="mt-2 text-sm text-slate-500">Nothing unread.</p>
          ) : (
            <ul className="mt-2 space-y-2">
              {unread.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between rounded-md border border-slate-700 bg-slate-900 px-3 py-2"
                >
                  <Link
                    href={`/blogs/${item.blog.id}`}
                    className="text-sm text-teal-300/90 hover:text-teal-300 hover:underline"
                  >
                    {item.blog.title}
                  </Link>
                  <form action={markReadingListItemAsRead}>
                    <input type="hidden" name="id" value={item.id} />
                    <button
                      type="submit"
                      className="text-xs rounded-md px-2 py-1 bg-slate-600 hover:bg-slate-500 text-slate-100 font-medium transition-colors"
                    >
                      Mark as read
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-6">
          <h4 className="text-sm font-semibold text-slate-300">
            Read ({read.length})
          </h4>
          {read.length === 0 ? (
            <p className="mt-2 text-sm text-slate-500">Nothing read yet.</p>
          ) : (
            <ul className="mt-2 space-y-2">
              {read.map((item) => (
                <li
                  key={item.id}
                  className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2"
                >
                  <Link
                    href={`/blogs/${item.blog.id}`}
                    className="text-sm text-slate-400 hover:text-slate-300 hover:underline"
                  >
                    {item.blog.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
