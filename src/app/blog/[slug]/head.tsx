// head.tsx

import { getBlogBySlug } from "@/src/services/blogPostService";

interface HeadProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function Head({
    params,
}: HeadProps) {

    const { slug } = await params;

    const blogSlug = await getBlogBySlug(slug);

    if (!blogSlug) {
        return null;
    }

    const imageUrl = blogSlug?.imagePath
        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${blogSlug.imagePath.replace(/\\/g, "/")}`
        : "";

    const currentUrl = `https://izhtech.com/blog/${slug}`;

    const articleSchema = {
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

                url: "https://izhtech.com/logo-primary.png",
            },
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        articleSchema
                    ),
                }}
            />
        </>
    );
}