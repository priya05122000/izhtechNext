// page.tsx

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

    const blogSlug = await getBlogBySlug(slug);

    const imageUrl = blogSlug?.imagePath
        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${blogSlug.imagePath.replace(/\\/g, "/")}`
        : "";

    const currentUrl = `https://www.izhtech.com/blog/${slug}`;

    return {
        title: blogSlug?.title || "Blog",

        description:
            blogSlug?.shortNote ||
            "Read this blog post",

        alternates: {
            canonical: currentUrl,
        },

        openGraph: {
            title: blogSlug?.title,

            description:
                blogSlug?.shortNote,

            url: currentUrl,

            images: [
                {
                    url: imageUrl,
                },
            ],

            type: "article",
        },

        twitter: {
            card: "summary_large_image",

            title: blogSlug?.title,

            description:
                blogSlug?.shortNote,

            images: [imageUrl],
        },
    };
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