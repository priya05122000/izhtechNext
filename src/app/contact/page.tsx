import React from 'react'

import Script from "next/script";

import Map from './components/Map';

import Inquiry from './components/Inquiry';

import { getAllSiteInfo } from '@/src/services/siteInfoService';

import SectionHeader from '@/src/shared/components/SectionHeader';

export const metadata = {
    title: "Contact Us - IZH Tech",

    description:
        "Get in touch with IZH Tech for branding, web development, app development, and digital marketing services.",

    alternates: {
        canonical: "https://www.izhtech.com/contact",
    },
};

const ContactPage = async () => {

    const siteInfo =
        await getAllSiteInfo();

    const contactSchema = {
        "@context":
            "https://schema.org",

        "@type":
            "ContactPage",

        name:
            "Contact IZH Tech",

        url:
            "https://www.izhtech.com/contact",

        description:
            "Get in touch with IZH Tech for branding, web development, app development, and digital marketing services.",

        mainEntity: {
            "@type":
                "Organization",

            name:
                "IZH Tech",

            url:
                "https://www.izhtech.com",

            logo:
                "https://www.izhtech.com/logo-primary.png",

            contactPoint: {
                "@type":
                    "ContactPoint",

                contactType:
                    "customer support",

                availableLanguage: [
                    "English",
                ],
            },
        },
    };

    return (
        <>

            {/* Contact Schema */}
            <Script
                id="contact-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html:
                        JSON.stringify(
                            contactSchema
                        ),
                }}
            />

            <SectionHeader
                title="Contact Us"
                description="Leave us a little info, and we’ll be in touch."
                customObjectVariant="orange-disk"
            />

            <Map />

            <Inquiry
                siteInfo={siteInfo}
            />

        </>
    )
}

export default ContactPage;