import React from "react";
import Header from "./Header/Header";
import BlogList from "./Blogs/BlogList";
import Navbar from "../Common/Navbar/Navbar";

const BlogPage = () => {
  return (
    <>
      <Navbar />
      <Header />
      <BlogList />
    </>
  );
};

export default BlogPage;
