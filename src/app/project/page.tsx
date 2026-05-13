import React from 'react'
import { getAllProjects } from '@/src/services/projectService';
import ProjectList from './component.tsx/ProjectList';
import SectionHeader from '@/src/shared/components/SectionHeader';

const ProjectPage = async () => {

    const projects = await getAllProjects();

    return (
        <>
            <SectionHeader
                title="Our Projects"
                description="Leave us a little info, and we’ll be in touch."
                customObjectVariant="green-disk"
            />
            <ProjectList projects={projects} />
        </>
    )
}

export default ProjectPage
