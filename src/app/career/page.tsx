import React from "react";

import Script from "next/script";

import WhyWorkWithUs from "./components/WhyWorkWithUs";

import { getAllJobs } from "@/src/services/JobService";
import { getAllJobRoles } from "@/src/services/jobRoleService";
import { getAllCareer } from "@/src/services/careerService";

import CareerJobsWrapper from "./components/CareerJobsWrapper";

import SectionHeader from "@/src/shared/components/SectionHeader";

interface JobModel {
  id: string;
  slug: string;
  title: string;
  shortNote?: string;
  employmentMode?: string;
  workMode?: string;
  status?: string;
  jobRolesId: string | string[];
}

interface JobRoleModel {
  id: string;
  roleStatus: boolean;
}

export const metadata = {
  title: "Careers at Izh Tech | Apply Today",

  description:
    "Start your career with Izh Tech and work on exciting web development, mobile app development and digital marketing projects. Apply now.",

  alternates: {
    canonical: "https://izhtech.com/career",
  },

  openGraph: {
    title: "Careers at Izh Tech | Apply Today",

    description:
      "Start your career with Izh Tech and work on exciting web development, mobile app development and digital marketing projects. Apply now.",

    url: "https://izhtech.com/career",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Careers at Izh Tech | Apply Today",

    description:
      "Start your career with Izh Tech and work on exciting web development, mobile app development and digital marketing projects. Apply now.",
  },
};

const CareerPage = async () => {
  const [jobLists, jobRoles, career] = await Promise.all([
    getAllJobs(),
    getAllJobRoles(),
    getAllCareer(),
  ]);

  // filter active jobs with active roles
  const filteredJobs = jobLists
    ?.filter((job: JobModel) => job.status === "active")
    ?.filter((job: JobModel) => {
      const roleIds = Array.isArray(job.jobRolesId)
        ? job.jobRolesId
        : [job.jobRolesId];

      return roleIds.some((id: string) => {
        const matchedRole = jobRoles?.find(
          (role: JobRoleModel) => role.id === id,
        );

        return matchedRole?.roleStatus === true;
      });
    });

  // JobPosting Schema
  const jobSchema =
    filteredJobs && filteredJobs.length > 0
      ? {
          "@context": "https://schema.org",

          "@graph": filteredJobs.map((job: JobModel) => ({
            "@type": "JobPosting",

            title: job.title,

            description: job.shortNote,

            datePosted: new Date().toISOString(),

            validThrough: new Date(
              new Date().setMonth(new Date().getMonth() + 1),
            ).toISOString(),

            employmentType: job.employmentMode,

            workHours: job.workMode,

            hiringOrganization: {
              "@type": "Organization",

              name: "Izh Tech",

              sameAs: "https://izhtech.com",

              logo: "https://izhtech.com/logo-primary.png",
            },

            jobLocation: {
              "@type": "Place",

              address: {
                "@type": "PostalAddress",

                streetAddress:
                  "III Floor, Nixon Pinnacle, North, Sarguna Veethi St, Cruz Enclave, Simon Nagar",

                addressLocality: "Nagercoil",

                addressRegion: "Tamil Nadu",

                postalCode: "629001",

                addressCountry: "IN",
              },
            },

            baseSalary: {
              "@type": "MonetaryAmount",

              currency: "INR",

              value: {
                "@type": "QuantitativeValue",

                minValue: 10000,

                maxValue: 40000,

                unitText: "MONTH",
              },
            },

            identifier: {
              "@type": "PropertyValue",

              name: "Izh Tech",

              value: job.id,
            },

            url: `https://izhtech.com/career/${job.slug}`,
          })),
        }
      : null;

  // AboutPage Schema
  const aboutSchema = {
    "@context": "https://schema.org",

    "@type": "AboutPage",

    name: "Careers at Izh Tech | Apply Today",

    url: "https://izhtech.com/career",

    description:
      "Start your career with Izh Tech and work on exciting web development, mobile app development and digital marketing projects. Apply now.",

    mainEntity: {
      "@type": "Organization",

      name: "Izh Tech",

      url: "https://izhtech.com",

      logo: "https://izhtech.com/logo.png",

      description:
        "Izh Tech is a digital company providing branding, web development, app development, and digital marketing services.",
    },
  };

  return (
    <section className="mx-auto container-fluid">
      {/* Job Schema */}
      {jobSchema && (
        <Script
          id="career-job-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jobSchema),
          }}
        />
      )}

      {/* About Schema */}
      <Script
        id="career-about-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutSchema),
        }}
      />

      <SectionHeader
        title="Career"
        description={
          <>
            Are you Looking for Your Dream{" "}
            <span className="text-[#0E3BF9]">Job?</span>
          </>
        }
        srOnlyText="Izh Tech provides career opportunities in web development, mobile app development, branding and digital marketing."
        buttonText="Apply Now"
        customObjectVariant="orange-disk"
      />

      {/* <h2 className="sr-only">
                Jobs in Web Development, Branding and Digital Marketing
            </h2> */}

      <CareerJobsWrapper
        jobLists={jobLists}
        jobRoles={jobRoles}
        career={career}
      />

      <WhyWorkWithUs />
    </section>
  );
};

export default CareerPage;
