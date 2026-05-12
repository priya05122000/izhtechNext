// page.tsx

import React from "react";

import BlogView from "./components/BlogView";

import { getBlogBySlug } from "@/src/services/blogPostService";

interface BlogSlugPageProps {
    params: Promise<{
        slug: string;
    }>;
}

const BlogSlugPage = async ({
    params,
}: BlogSlugPageProps) => {

    const { slug } = await params;

    const blogSlug = await getBlogBySlug(slug);

    return (
        <BlogView blogSlug={blogSlug} />
    );
};

export default BlogSlugPage;