import React from 'react';

import Script from "next/script";

import striptags from "striptags";

import { getProjectBySlug } from '@/src/services/projectService';

import ProjectView from './component/ProjectView';

interface ProjectSlugPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({
    params,
}: ProjectSlugPageProps) {

    const { slug } = await params;

    const projectSlug =
        await getProjectBySlug(slug);

    const imageUrl =
        projectSlug?.featuredImagePath
            ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${projectSlug.featuredImagePath.replace(
                /\\/g,
                "/"
            )}`
            : "";

    const currentUrl =
        `https://izhtech.com/project/${slug}`;

    const plainDescription =
        striptags(
            projectSlug?.shortNote || ""
        );

    return {
        title:
            `${projectSlug?.projectName} Project Case Study - IZH Tech` ||
            "Project Case Study - IZH Tech",

        description:
            plainDescription ||
            "Project details",

        alternates: {
            canonical:
                currentUrl,
        },

        openGraph: {
            title:
                `${projectSlug?.projectName} Project Case Study - IZH Tech`,

            description:
                plainDescription,

            url:
                currentUrl,

            images: [
                {
                    url:
                        imageUrl,
                },
            ],

            type:
                "website",
        },

        twitter: {
            card:
                "summary_large_image",

            title:
                `${projectSlug?.projectName} Project Case Study - IZH Tech`,

            description:
                plainDescription,

            images:
                [imageUrl],
        },
    };
}

const ProjectSlugPage = async ({
    params,
}: ProjectSlugPageProps) => {

    const { slug } = await params;

    const projectSlug =
        await getProjectBySlug(slug);

    const currentUrl =
        `https://izhtech.com/project/${slug}`;

    const imageUrl =
        projectSlug?.featuredImagePath
            ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${projectSlug.featuredImagePath.replace(
                /\\/g,
                "/"
            )}`
            : "";

    const plainDescription =
        striptags(
            projectSlug?.shortNote || ""
        );

    // CreativeWork Schema
    const structuredData =
        projectSlug
            ? {
                "@context":
                    "https://schema.org",

                "@type":
                    "CreativeWork",

                "@id":
                    currentUrl,

                url:
                    currentUrl,

                name:
                    projectSlug.projectName,

                description:
                    plainDescription,

                image:
                    imageUrl,

                author: {
                    "@type":
                        "Organization",

                    name:
                        "IZH Tech",

                    url:
                        "https://izhtech.com",
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
            }
            : null;

    return (
        <>

            {/* Project Schema */}
            {structuredData && (
                <Script
                    id="project-slug-schema"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html:
                            JSON.stringify(
                                structuredData
                            ),
                    }}
                />
            )}

            <ProjectView
                projectSlug={projectSlug}
            />

        </>
    );
};

export default ProjectSlugPage;