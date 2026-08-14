import { findBlogById } from "@/app/services/blogs";
import { notFound } from "next/navigation";
import { addLike } from "../actions/blogs";

const Blog = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = findBlogById(Number(id));

  if (!blog) {
    notFound();
  }

  return (
    <div>
      <h3>{blog.title}</h3>
      <p>author: {blog.author}</p>
      <span>link:</span>
      <a href={blog.url}> {blog.url}</a>
      <p>likes: {blog.likes}</p>
      <form action={addLike}>
        <input type="hidden" value={blog.id} name="id" />
        <button type="submit">like</button>
      </form>
    </div>
  );
};

export default Blog;
