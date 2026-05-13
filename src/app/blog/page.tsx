// page.tsx


import Script from "next/script";

import BlogsList from "./components/BlogsList";

import { getAllBlogPosts } from "@/src/services/blogPostService";

import SectionHeader from "@/src/shared/components/SectionHeader";

export const metadata = {
    alternates: {
        canonical: "https://www.izhtech.com/blog",
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
                        "@type": "Blog",
                        "@id": "https://www.izhtech.com/blog#blog",
                        name: "IZH Tech Blog",
                        description:
                            "Latest articles and insights on technology, digital marketing, and business solutions from IZH Tech.",
                        url: "https://www.izhtech.com/blog",
                        publisher: {
                            "@type": "Organization",
                            name: "IZH Tech",
                            url: "https://www.izhtech.com",
                            logo: {
                                "@type": "ImageObject",
                                url: "https://www.izhtech.com/logo-primary.png",
                            },
                        },
                    }),
                }}
            />

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