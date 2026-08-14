import { CreateBlog } from "../actions/blogs";

const NewBlog = () => {
  return (
    <div>
      <form action={CreateBlog}>
        <div>
          <label>
            Title:
            <input type="text" name="title" />
          </label>
        </div>
        <div>
          <label>
            Author:
            <input type="text" name="author" />
          </label>
        </div>
        <div>
          <label>
            Url:
            <input type="url" name="url" />
          </label>
        </div>
        <div>
          <label>
            Likes:
            <input type="number" name="likes" />
          </label>
        </div>
        <button type="submit"> Create</button>
      </form>
    </div>
  );
};

export default NewBlog;
