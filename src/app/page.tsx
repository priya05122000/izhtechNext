import React from 'react';

import Script from "next/script";

import HomePage from './home/page';

export const metadata = {
  title: "Izh Tech | Software & Marketing Company in Nagercoil",

  description:
    "Software that works, marketing that gets it seen — Izh Tech is a software development and digital marketing agency in Nagercoil. Let's talk.",

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
      "Izh Tech",

    legalName:
      "Izh Tech Creative Solutions",

    url:
      "https://izhtech.com",

    logo:
      "https://izhtech.com/logo-primary.png",

    description:
      "Software that works, marketing that gets it seen — Izh Tech is a software development and digital marketing agency in Nagercoil. Let's talk.",

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