import Script from "next/script";

import Map from './components/Map';

import Inquiry from './components/Inquiry';

import { getAllSiteInfo } from '@/src/services/siteInfoService';

import { getAllServices } from '@/src/services/mainService';

import SectionHeader from '@/src/shared/components/SectionHeader';

export const metadata = {
    title: "Contact Izh Tech for Web and App Development",

    description:
        "Get in touch with Izh Tech for branding, web development, app development, and digital marketing services.",

    alternates: {
        canonical: "https://izhtech.com/contact",
    },
};

const ContactPage = async () => {

    const siteInfo =
        await getAllSiteInfo();

    const services: { title?: string; isActive?: boolean; order?: number }[] =
        await getAllServices();

    const serviceOptions =
        (Array.isArray(services) ? services : [])
            .filter((service) => service.title && service.isActive !== false)
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
            .map((service) => service.title as string);

    const contactSchema = {
        "@context":
            "https://schema.org",

        "@type":
            "ContactPage",

        name:
            "Contact Izh Tech for Digital Solutions",

        url:
            "https://izhtech.com/contact",

        description:
            "Get in touch with Izh Tech for branding, web development, app development, and digital marketing services.",

        mainEntity: {
            "@type":
                "Organization",

            name:
                "Izh Tech",

            url:
                "https://izhtech.com",

            logo:
                "https://izhtech.com/izhtech-logo.png",

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
                services={serviceOptions}
            />

        </>
    )
}

export default ContactPage;