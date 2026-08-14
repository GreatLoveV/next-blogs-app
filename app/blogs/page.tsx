import { getBlogs } from "../services/blogs";
import Link from "next/link";

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) => {
  const { filter } = await searchParams;

  const initialBlogs = getBlogs();
  const filteredBlogs = filter
    ? initialBlogs.filter((blog) => blog.title.toLowerCase().includes(filter))
    : initialBlogs;
  const blogs = filteredBlogs.toSorted((a, b) => b.likes - a.likes);
  return (
    <div>
      <form action="/blogs" method="get">
        <input type="text" name="filter" defaultValue={filter} />
        <button type="submit"> filter</button>
      </form>
      {blogs.map((blog) => {
        return (
          <div key={blog.id}>
            <h3>
              <Link href={`blogs/${blog.id}`}>{blog.title}</Link>
            </h3>
            <p>author: {blog.author}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Blogs;
