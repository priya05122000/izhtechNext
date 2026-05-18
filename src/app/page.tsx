import React from 'react';

import Script from "next/script";

import HomePage from './home/page';

export const metadata = {
  title: "IZH Tech – Software & Digital Solutions",

  description:
    "IZH Tech is a digital solutions company in India offering web and mobile app development, custom software, AI solutions, branding, and digital marketing services to help businesses grow online.",

  alternates: {
    canonical: "https://izhtech.com",
  },
};

const page = () => {

  const organizationSchema = {
    "@context":
      "https://schema.org",

    "@type":
      "Organization",

    "@id":
      "https://izhtech.com/#organization",

    name:
      "IZH Tech",

    legalName:
      "Izh Tech Creative Solutions",

    url:
      "https://izhtech.com",

    logo:
      "https://izhtech.com/logo-primary.png",

    description:
      "IZH Tech is a digital solutions company in India offering web and mobile app development, custom software, AI solutions, branding, and digital marketing services to help businesses grow online.",

    foundingDate:
      "2022",

    founders: [
      {
        "@type":
          "Person",

        name:
          "Celiba Narayanan",
      },
    ],

    contactPoint: [
      {
        "@type":
          "ContactPoint",

        telephone:
          "+918355990274",

        contactType:
          "customer support",

        areaServed:
          "IN",

        availableLanguage:
          "English",
      },
    ],

    address: {
      "@type":
        "PostalAddress",

      streetAddress:
        "III Floor, Cruz Enclave North, Nixon Pinnacle, Sarguna Veethi St",

      addressLocality:
        "Nagercoil",

      addressRegion:
        "Tamil Nadu",

      postalCode:
        "629001",

      addressCountry:
        "IN",
    },

    sameAs: [
      "https://www.linkedin.com/company/izh-tech",
      "https://www.facebook.com/izhtech",
      "https://twitter.com/izhtech",
    ],
  };

  return (
    <>

      {/* Organization Schema */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              organizationSchema
            ),
        }}
      />

      <HomePage />

    </>
  );
};

export default page;