// page.tsx

import React from "react";

import Script from "next/script";

import BlogView from "./components/BlogView";

import { getBlogBySlug } from "@/src/services/blogPostService";

interface BlogSlugPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({
    params,
}: BlogSlugPageProps) {

    const { slug } = await params;

    const blogSlug =
        await getBlogBySlug(slug);

    const imageUrl =
        blogSlug?.imagePath
            ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${blogSlug.imagePath.replace(
                /\\/g,
                "/"
            )}`
            : "";

    const currentUrl =
        `https://izhtech.com/blog/${slug}`;

    const seoTitle =
        blogSlug?.title
            ? `${blogSlug.title} | IZH Tech`
            : "IZH Tech Blog";

    return {
        title:
            seoTitle,

        description:
            blogSlug?.shortNote ||
            "Read this blog post",

        alternates: {
            canonical:
                currentUrl,
        },

        openGraph: {
            title:
                seoTitle,

            description:
                blogSlug?.shortNote,

            url:
                currentUrl,

            images: [
                {
                    url:
                        imageUrl,
                },
            ],

            type:
                "article",
        },

        twitter: {
            card:
                "summary_large_image",

            title:
                seoTitle,

            description:
                blogSlug?.shortNote,

            images:
                [imageUrl],
        },
    };
}

const BlogSlugPage = async ({
    params,
}: BlogSlugPageProps) => {

    const { slug } =
        await params;

    const blogSlug =
        await getBlogBySlug(slug);

    const currentUrl =
        `https://izhtech.com/blog/${slug}`;

    const imageUrl =
        blogSlug?.imagePath
            ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${blogSlug.imagePath.replace(
                /\\/g,
                "/"
            )}`
            : "";

    // BlogPosting Schema
    const articleSchema =
        blogSlug
            ? {
                "@context":
                    "https://schema.org",

                "@type":
                    "BlogPosting",

                mainEntityOfPage: {
                    "@type":
                        "WebPage",

                    "@id":
                        currentUrl,
                },

                headline:
                    blogSlug.title,

                description:
                    blogSlug.shortNote,

                image:
                    imageUrl,

                author: {
                    "@type":
                        "Organization",

                    name:
                        "IZH Tech",
                },

                publisher: {
                    "@type":
                        "Organization",

                    name:
                        "IZH Tech",

                    logo: {
                        "@type":
                            "ImageObject",

                        url:
                            "https://izhtech.com/logo-primary.png",
                    },
                },

                datePublished:
                    blogSlug?.publishedDate
                        ? new Date(
                            blogSlug.publishedDate
                        ).toISOString()
                        : undefined,

                dateModified:
                    blogSlug?.updatedAt
                        ? new Date(
                            blogSlug.updatedAt
                        ).toISOString()
                        : blogSlug?.publishedDate
                            ? new Date(
                                blogSlug.publishedDate
                            ).toISOString()
                            : undefined,

                url:
                    currentUrl,
            }
            : null;

    return (
        <>

            {/* BlogPosting Schema */}
            {articleSchema && (
                <Script
                    id="blog-post-schema"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html:
                            JSON.stringify(
                                articleSchema
                            ),
                    }}
                />
            )}

            <BlogView
                blogSlug={blogSlug}
            />

        </>
    );
};

export default BlogSlugPage;