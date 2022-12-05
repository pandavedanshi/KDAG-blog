import React from "react";
import Header from "./Header/Header";
import BlogList from "./Blogs/BlogList";
import Navbar from "../Common/Navbar/Navbar";
import Particless from "../Common/Particles/Particless";

const BlogPage = () => {
  return (
    <>
      <Navbar />
      <Header />
      <BlogList />
      <Particless />
    </>
  );
};

export default BlogPage;
