import React from "react";
import "./BlogList.css";
import BlogCard from "./BlogCard";
import blogs from "./BlogsStatic";

const dummy = [0, 1, 2, 3, 4, 5, 6, 7];

// const blogs = null;

const BlogList = () => {
  // To be used later
  // const [blogs, setBlogs] = useState();

  return (
    <div class="blog-list-cards">
      {blogs?.map((blog) => {
        return <BlogCard key={blog.id} blog={blog} />;
      }) ||
        dummy.map((id) => {
          return <BlogCard key={id} />;
        })}
    </div>
  );
};

export default BlogList;
