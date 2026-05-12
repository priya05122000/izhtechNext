import { getProjectBySlug } from '@/src/services/projectService';
import React from 'react';
import ProjectView from './component/ProjectView';

interface ProjectSlugPageProps {
    params: Promise<{
        slug: string;
    }>;
}

const ProjectSlugPage = async ({ params }: ProjectSlugPageProps) => {

    const { slug } = await params;

    const projectSlug = await getProjectBySlug(slug);


    return (
        <ProjectView projectSlug={projectSlug} />
    );
};

export default ProjectSlugPage;