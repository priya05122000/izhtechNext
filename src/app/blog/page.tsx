// page.tsx

import React from "react";

import Blog from "./components/Blog";
import BlogsList from "./components/BlogsList";

import { getAllBlogPosts } from "@/src/services/blogPostService";

const BlogPage = async () => {

    const blogs = await getAllBlogPosts();

    return (
        <>
            <Blog />
            <BlogsList blogs={blogs || []} />
        </>
    );
};

export default BlogPage;