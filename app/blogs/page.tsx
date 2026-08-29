import { getBlogs } from "../services/blogs";
import Link from "next/link";

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) => {
  const { filter } = await searchParams;

  const blogs = await getBlogs(filter);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Notes</h2>

      <form
        action="/blogs"
        method="get"
        className="flex gap-2 items-center mb-6"
      >
        <input
          type="text"
          name="filter"
          defaultValue={filter}
          placeholder="Search notes..."
          className="rounded-md bg-gray-800 focus:bg-gray-900 px-3 py-1.5 text-sm outline-none border border-gray-700 focus:border-teal-500 transition-colors"
        />
        <button
          type="submit"
          className="text-sm rounded-md px-3 py-1.5 bg-gray-600 hover:bg-gray-500 transition-colors"
        >
          Filter
        </button>
      </form>

      <div className="space-y-4">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="flex gap-2 flex-col bg-gray-700 hover:bg-gray-600 rounded-lg p-3 transition-all duration-300 hover:-translate-y-1"
          >
            <h3 className="text-md hover:underline cursor-pointer text-teal-300">
              <Link href={`blogs/${blog.id}`}>{blog.title}</Link>
            </h3>
            <p className="text-sm text-amber-400/80">author: {blog.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
