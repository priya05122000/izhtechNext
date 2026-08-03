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
import TestimonialsClient from "./components/TestimonialsClient";
import MeetTheTeam from './components/MeetTheTeam'
import SectionHeader from '@/src/shared/components/SectionHeader'
import { getAllEmployees } from '@/src/services/employeeService';

export const metadata = {
    title: "About Izh Tech and Our Digital Solutions Team",

    description:
        "Learn about Izh Tech and our focus on software, branding and digital growth solutions for businesses. Get in touch today.",

    alternates: {
        canonical: "https://izhtech.com/about",
    },

    openGraph: {
        title: "About Izh Tech and Our Digital Solutions Team",

        description:
            "Learn about Izh Tech and our focus on software, branding and digital growth solutions for businesses. Get in touch today.",

        url: "https://izhtech.com/about",

        type: "website",
    },

    twitter: {
        card: "summary_large_image",

        title: "About Izh Tech and Our Digital Solutions Team",

        description:
            "Learn about Izh Tech and our focus on software, branding and digital growth solutions for businesses. Get in touch today.",
    },
};

const AboutPage = async () => {

    const clients = await getAllClients();
    const projects = await getAllProjects();
    const siteInfo = await getAllSiteInfo();
    const testimonials = await getAllTestimonials();
    const employees = await getAllEmployees();

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
                            "@id": "https://izhtech.com/about",
                            url: "https://izhtech.com/about",
                            name: "About Izh Tech and Our Digital Solutions Team",
                            description:
                                "Learn about Izh Tech and our focus on software, branding and digital growth solutions for businesses. Get in touch today.",
                        },

                        {
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            "@id": "https://izhtech.com/#organization",
                            name: "Izh Tech",
                            url: "https://izhtech.com",
                            logo: "https://izhtech.com/logo-primary.png",
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
                                    item: "https://izhtech.com"
                                },
                                {
                                    "@type": "ListItem",
                                    position: 2,
                                    name: "About",
                                    item: "https://izhtech.com/about"
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

            <TestimonialsClient testimonials={testimonials} />

            <ProjectsSection projects={projects} />

            <Counts
                awards={siteInfo?.[0]?.projectHandled}
                designers={siteInfo?.[0]?.teamCount}
            />

            <MeetTheTeam employees={employees} />

        </>
    )
}

export default AboutPage