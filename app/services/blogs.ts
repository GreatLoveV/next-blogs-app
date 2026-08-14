interface NewBlogEntry {
  title: string;
  author: string;
  url: string;
  likes: number;
}
interface BlogEntry extends NewBlogEntry {
  id: number;
}

const blogs: BlogEntry[] = [
  {
    id: 1,
    title: "React patterns you should know",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    id: 2,
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    id: 3,
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    id: 4,
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
    likes: 10,
  },
  {
    id: 5,
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    id: 6,
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  },
];

let nextId = 7;

export const getBlogs = () => {
  return blogs;
};

export const addBlog = (newBlog: NewBlogEntry) => {
  const blogObject = {
    id: nextId++,
    title: newBlog.title,
    author: newBlog.author,
    url: newBlog.url,
    likes: newBlog.likes,
  };

  blogs.push(blogObject);
};

export const findBlogById = (id: number) => {
  const blog = blogs.find((blog) => blog.id === id);

  return blog;
};

export const incrementLike = (id: number) => {
  const blog = blogs.find((b) => b.id === id);
  if (!blog) return null;

  blog.likes++;
  return blog;
};

export const filterBlogs = (search: string) => {
  return blogs.filter((blog) => blog.title.toLowerCase().includes(search));
};
