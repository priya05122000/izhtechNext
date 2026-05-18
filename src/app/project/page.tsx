import React from 'react';

import Script from "next/script";

import { getAllProjects } from '@/src/services/projectService';

import ProjectList from './component.tsx/ProjectList';

import SectionHeader from '@/src/shared/components/SectionHeader';

export const metadata = {
    title: "Our Projects - IZH Tech",

    description:
        "A showcase of professional digital projects by IZH Tech including web development, mobile applications, branding and digital solutions.",

    alternates: {
        canonical: "https://izhtech.com/project",
    },
};

const ProjectPage = async () => {

    const projects =
        await getAllProjects();

    // ItemList Schema
    const itemListSchema =
        projects &&
            projects.length > 0
            ? {
                "@context":
                    "https://schema.org",

                "@type":
                    "ItemList",

                "@id":
                    "https://izhtech.com/project#portfolio",

                name:
                    "IZH Tech Portfolio Projects",

                description:
                    "A showcase of professional digital projects by IZH Tech including web development, mobile applications, branding and digital solutions.",

                itemListElement:
                    projects.map(
                        (
                            project: any,
                            idx: number
                        ) => {

                            const imagePath =
                                project.featuredImagePath ||
                                project.descriptions?.[0]
                                    ?.imagePath ||
                                "";

                            return {
                                "@type":
                                    "ListItem",

                                position:
                                    idx + 1,

                                url:
                                    `https://izhtech.com/project/${project.slug}`,

                                name:
                                    project.projectName,

                                description:
                                    project.shortNote ||
                                    "",

                                image:
                                    imagePath
                                        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${imagePath.replace(
                                            /\\/g,
                                            "/"
                                        )}`
                                        : undefined,
                            };
                        }
                    ),
            }
            : null;

    return (
        <>

            {/* Project Schema */}
            {itemListSchema && (
                <Script
                    id="project-schema"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html:
                            JSON.stringify(
                                itemListSchema
                            ),
                    }}
                />
            )}

            <SectionHeader
                title="Our Projects"
                description="Leave us a little info, and we’ll be in touch."
                customObjectVariant="green-disk"
            />

            <h2 className='sr-only'>Real Projects Built for Real Business Growth h2</h2>

            <ProjectList
                projects={projects}
            />

        </>
    )
}

export default ProjectPage;