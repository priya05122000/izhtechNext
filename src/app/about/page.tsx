import React from 'react'
import Banner from './components/Banner'
import Capabilities from './components/Capabilities'
import AboutUs from './components/AboutUs'
import { getAllClients } from '@/src/services/clientService'
import OurClients from './components/OurClients'
import ProjectsSection from './components/ProjectsSection'
import Counts from './components/Counts'

import { getAllProjects } from '@/src/services/projectService'
import { getAllSiteInfo } from '@/src/services/siteInfoService'
import { getAllTestimonials } from '@/src/services/testimonialService'
import Testimonials from './components/Testimonials'

const AboutPage = async () => {

    const clients = await getAllClients();
    const projects = await getAllProjects();
    const siteInfo = await getAllSiteInfo();
    const testimonials = await getAllTestimonials();

    return (
        <>
            <AboutUs />
            <Banner />
            <Capabilities />
            <OurClients clients={clients} />
            <Testimonials testimonials={testimonials} />

            <ProjectsSection projects={projects} />
            <Counts
                awards={siteInfo?.[0]?.projectHandled}
                designers={siteInfo?.[0]?.teamCount}
            />
        </>
    )
}

export default AboutPage
