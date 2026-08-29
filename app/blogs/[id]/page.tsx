import { findBlogById } from "@/app/services/blogs";
import { notFound } from "next/navigation";
import { addLike } from "../../actions/blogs";
import { addBlogToReadingList } from "../../actions/readingList";
import { getCurrentUser } from "@/app/services/sessions";
import { isInReadingList } from "@/app/services/readingList";

const Blog = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = await findBlogById(Number(id));

  if (!blog) {
    notFound();
  }

  const currentUser = await getCurrentUser();
  const isOwnBlog = currentUser?.id === blog.userId;
  const alreadyAdded = currentUser
    ? await isInReadingList(currentUser.id, blog.id)
    : true;

  const showAddToReadingList = currentUser && !isOwnBlog && !alreadyAdded;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-gray-700 rounded-lg p-6 space-y-4">
        <h3 className="text-xl font-semibold text-teal-300">{blog.title}</h3>
        <p className="text-sm text-amber-400/80">author: {blog.author}</p>

        <div className="text-sm">
          <span className="text-gray-400 mr-1">link:</span>
          <a
            href={blog.url}
            className="text-teal-300/80 hover:text-teal-300 hover:underline break-all"
          >
            {blog.url}
          </a>
        </div>

        <p className="text-sm text-gray-300">likes: {blog.likes}</p>

        <div className="flex items-center gap-3">
          <form action={addLike}>
            <input type="hidden" value={blog.id} name="id" />
            <button
              type="submit"
              className="text-sm rounded-md px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-gray-900 font-medium transition-colors"
            >
              Like
            </button>
          </form>

          {showAddToReadingList && (
            <form action={addBlogToReadingList}>
              <input type="hidden" value={blog.id} name="blogId" />
              <button
                type="submit"
                className="text-sm rounded-md px-3 py-1.5 bg-slate-600 hover:bg-slate-500 text-slate-100 font-medium transition-colors"
              >
                Add to reading list
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
