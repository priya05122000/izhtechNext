import React from 'react'
import Project from './component.tsx/Project'
import { getAllProjects } from '@/src/services/projectService';
import ProjectList from './component.tsx/ProjectList';

const ProjectPage = async () => {

    const projects = await getAllProjects();

    return (
        <>
            <Project  />
            <ProjectList projects={projects} />
        </>
    )
}

export default ProjectPage
