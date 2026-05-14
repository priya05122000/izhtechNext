import React from 'react'

import Script from "next/script";

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

export const metadata = {
    alternates: {
        canonical: "https://www.izhtech.com/about",
    },
};

const AboutPage = async () => {

    const clients = await getAllClients();
    const projects = await getAllProjects();
    const siteInfo = await getAllSiteInfo();
    const testimonials = await getAllTestimonials();

    return (
        <>

            {/* SEO Schema */}
            <Script
                id="about-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([
                        {
                            "@context": "https://schema.org",
                            "@type": "AboutPage",
                            "@id": "https://www.izhtech.com/about",
                            url: "https://www.izhtech.com/about",
                            name: "About IZH Tech",
                            description:
                                "IZH Tech is a digital solutions company providing web development, mobile app development, branding, and digital marketing services.",
                        },

                        {
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            "@id": "https://www.izhtech.com/#organization",
                            name: "IZH Tech",
                            url: "https://www.izhtech.com",
                            logo: "https://www.izhtech.com/logo-primary.png",
                            sameAs: [
                                "https://www.facebook.com/izhtech",
                                "https://www.linkedin.com/company/izhtech",
                                "https://twitter.com/izhtech"
                            ]
                        },

                        {
                            "@context": "https://schema.org",
                            "@type": "BreadcrumbList",
                            itemListElement: [
                                {
                                    "@type": "ListItem",
                                    position: 1,
                                    name: "Home",
                                    item: "https://www.izhtech.com"
                                },
                                {
                                    "@type": "ListItem",
                                    position: 2,
                                    name: "About",
                                    item: "https://www.izhtech.com/about"
                                }
                            ]
                        }
                    ]),
                }}
            />

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

            {/* <MeetTheTeam /> */}

        </>
    )
}

export default AboutPage