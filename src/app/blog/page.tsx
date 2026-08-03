// page.tsx


import Script from "next/script";

import BlogsList from "./components/BlogsList";

import { getAllBlogPosts } from "@/src/services/blogPostService";

import SectionHeader from "@/src/shared/components/SectionHeader";

interface BlogListItem {
    slug: string;
    title: string;
}

export const metadata = {
    title: "Technology and Digital Marketing Blogs - Izh Tech",

    description:
        "Latest articles and insights on technology, digital marketing, web development, branding, and business solutions from Izh Tech.",

    alternates: {
        canonical: "https://izhtech.com/blog",
    },

    openGraph: {
        title: "Technology and Digital Marketing Blogs - Izh Tech",

        description:
            "Latest articles and insights on technology, digital marketing, web development, branding, and business solutions from Izh Tech.",

        url: "https://izhtech.com/blog",

        type: "website",
    },

    twitter: {
        card: "summary_large_image",

        title: "Technology and Digital Marketing Blogs - Izh Tech",

        description:
            "Latest articles and insights on technology, digital marketing, web development, branding, and business solutions from Izh Tech.",
    },
};

const BlogPage = async () => {

    const blogs = await getAllBlogPosts();

    return (
        <>
            {/* Blog Schema */}
            <Script
                id="blog-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",

                        "@type": "ItemList",

                        name:
                            "Technology and Digital Marketing Blogs - Izh Tech",

                        url:
                            "https://izhtech.com/blog",

                        description:
                            "Stay updated with expert insights on technology, digital marketing, web development, branding and business solutions. Read our latest articles.",

                        itemListElement:
                            blogs?.map(
                                (
                                    blog: BlogListItem,
                                    index: number
                                ) => ({
                                    "@type":
                                        "ListItem",

                                    position:
                                        index + 1,

                                    url:
                                        `https://izhtech.com/blog/${blog.slug}`,

                                    name:
                                        blog.title,
                                })
                            ),
                    }),
                }}
            />

            <SectionHeader
                title="Our Blogs"
                description="Leave us a little info, and we’ll be in touch."
                srOnlyText="Izh Tech blog shares articles on web development, mobile app development, branding, and digital marketing."
                customObjectVariant="green-disk"
            />

            <h2 className="sr-only">
                Insights on Technology, Branding and Business Growth
            </h2>

            <BlogsList blogs={blogs || []} />

        </>
    );
};

export default BlogPage;