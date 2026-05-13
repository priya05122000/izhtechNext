import React from 'react'
import Banner from './components/Banner'
import Capabilities from './components/Capabilities'
import { getAllClients } from '@/src/services/clientService'
import OurClients from './components/OurClients'
import ProjectsSection from './components/ProjectsSection'
import Counts from './components/Counts'

import { getAllProjects } from '@/src/services/projectService'
import { getAllSiteInfo } from '@/src/services/siteInfoService'
import { getAllTestimonials } from '@/src/services/testimonialService'
import Testimonials from './components/Testimonials'
import MeetTheTeam from './components/MeetTheTeam'
import SectionHeader from '@/src/shared/components/SectionHeader'

const AboutPage = async () => {

    const clients = await getAllClients();
    const projects = await getAllProjects();
    const siteInfo = await getAllSiteInfo();
    const testimonials = await getAllTestimonials();

    return (
        <>
            <SectionHeader
                title="About Us"
                description="Leave us a little info, and we’ll be in touch."
                customObjectVariant="orange-disk"
            />
            <Banner />
            <Capabilities />
            <OurClients clients={clients} />
            <Testimonials testimonials={testimonials} />

            <ProjectsSection projects={projects} />
            <Counts
                awards={siteInfo?.[0]?.projectHandled}
                designers={siteInfo?.[0]?.teamCount}
            />
            <MeetTheTeam />
        </>
    )
}

export default AboutPage
