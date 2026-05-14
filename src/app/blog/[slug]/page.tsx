// page.tsx


import BlogView from "./components/BlogView";

import { getBlogBySlug } from "@/src/services/blogPostService";

interface BlogSlugPageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({
    params,
}: BlogSlugPageProps) {

    const { slug } = params;
    
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

    const imageUrl = blogSlug?.imagePath
        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${blogSlug.imagePath.replace(/\\/g, "/")}`
        : "";

    const currentUrl = `https://www.izhtech.com/blog/${slug}`;

    const articleSchema = blogSlug
        ? {
            "@context": "https://schema.org",
            "@type": "Article",

            mainEntityOfPage: {
                "@type": "WebPage",
                "@id": currentUrl,
            },

            headline: blogSlug.title,

            description:
                blogSlug.shortNote,

            image: imageUrl,

            author: {
                "@type": "Person",
                name:
                    blogSlug.author?.name ||
                    "IZH Tech",
            },

            datePublished:
                blogSlug.publishedDate,

            dateModified:
                blogSlug.publishedDate,

            publisher: {
                "@type": "Organization",
                name: "IZH Tech",

                logo: {
                    "@type": "ImageObject",
                    url: "https://www.izhtech.com/logo-primary.png",
                },
            },
        }
        : null;

    return (
        <>

            {articleSchema && (
                <script
                    id="blog-article-schema"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(
                            articleSchema
                        ),
                    }}
                />
            )}

            <BlogView blogSlug={blogSlug} />

        </>
    );
};

export default BlogSlugPage;