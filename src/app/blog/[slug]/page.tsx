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

    const currentUrl = `https://izhtech.com/blog/${slug}`;

    const rawTitle =
        blogSlug?.title || "IZH Tech Blog";

    const seoTitle =
        rawTitle.length > 55
            ? rawTitle
            : `${rawTitle} | IZH Tech`;


    return {
        title: seoTitle,

        description:
            blogSlug?.shortNote ||
            "Read this blog post",

        alternates: {
            canonical: currentUrl,
        },

        openGraph: {
            title: seoTitle,

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

            title: seoTitle,

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