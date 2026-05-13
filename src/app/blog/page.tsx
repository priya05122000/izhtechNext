// page.tsx

import React from "react";

import BlogsList from "./components/BlogsList";

import { getAllBlogPosts } from "@/src/services/blogPostService";
import SectionHeader from "@/src/shared/components/SectionHeader";

const BlogPage = async () => {

    const blogs = await getAllBlogPosts();

    return (
        <>
            <SectionHeader
                title="Our Blogs"
                description="Leave us a little info, and we’ll be in touch."
                srOnlyText="IZH Tech blog shares articles on web development, mobile app development, branding, and digital marketing."
                customObjectVariant="green-disk"
            />
            <BlogsList blogs={blogs || []} />
        </>
    );
};

export default BlogPage;