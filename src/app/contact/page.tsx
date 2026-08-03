import Script from "next/script";

import Map from './components/Map';

import Inquiry from './components/Inquiry';

import { getAllSiteInfo } from '@/src/services/siteInfoService';

import SectionHeader from '@/src/shared/components/SectionHeader';

export const metadata = {
    title: "Contact Izh Tech | Get a Free Quote",

    description:
        "Ready to grow your business? Contact Izh Tech for software development, web development and digital marketing. Get your free consultation today.",

    alternates: {
        canonical: "https://izhtech.com/contact",
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
            "Contact Izh Tech | Get a Free Quote",

        url:
            "https://izhtech.com/contact",

        description:
            "Ready to grow your business? Contact Izh Tech for software development, web development and digital marketing. Get your free consultation today.",

        mainEntity: {
            "@type":
                "Organization",

            name:
                "Izh Tech",

            url:
                "https://izhtech.com",

            logo:
                "https://izhtech.com/logo-primary.png",

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