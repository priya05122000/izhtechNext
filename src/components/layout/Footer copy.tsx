// Footer.tsx

"use client";

import { useState } from "react";

import { Footer as FlowbiteFooter } from "flowbite-react";
import { Button, TextInput } from "flowbite-react";

import Link from "next/link";

import { useForm } from "react-hook-form";

import { createContact } from "@/src/services/contactService";

interface SiteInformation {
    id: string;
    companyName?: string;
    professionalExperience?: string;
    teamCount?: string;
    vision?: string;
    mission?: string;
    values?: string;
    projectHandled?: string;
    mobilePrimary?: string;
    mobileSecondary?: string;
    mobileSales?: string;
    mobileHR?: string;
    emailPrimary?: string;
    emailSecondary?: string;
    emailSales?: string;
    emailHR?: string;
    address?: string;
}

interface FooterProps {
    siteInfo: SiteInformation[];
}

export default function Footer({
    siteInfo,
}: FooterProps) {

    const [isSuccessContact, setIsSuccessContact] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    async function saveContact(payload: any) {

        try {

            const response = await createContact(payload);

            if (response.success) {
                setIsSuccessContact(true);
            }

        } catch (error) {

            console.error(error);

        } finally {

            reset();

            setTimeout(() => {
                setIsSuccessContact(false);
            }, 3000);
        }
    }

    return (
        <footer className="bg-neutral-900 text-white">

            <div className="mx-auto px-4 py-14 md:px-14 lg:px-16 xl:px-14">

                <div className="grid gap-10 md:gap-5 lg:gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">

                    {/* Logo & Socials */}
                    <div>

                        <img
                            src="/Logo-white.png"
                            alt="Logo"
                            className="h-16 mb-4"
                        />

                        <h6 className="text-sm font-semibold">
                            Follow Us -
                            <a
                                href="https://www.instagram.com/izh_tech"
                                target="_blank"
                                className="ml-1"
                            >
                                /Ig.
                            </a>

                            <a
                                href="https://www.facebook.com/izhtech"
                                target="_blank"
                                className="ml-1"
                            >
                                /Fb.
                            </a>

                            <a
                                href="https://www.linkedin.com/company/izh-tech/"
                                target="_blank"
                                className="ml-1"
                            >
                                /In.
                            </a>
                        </h6>

                    </div>

                    {/* Address */}
                    <div>

                        <h2 className="font-semibold">
                            Address
                        </h2>

                        {siteInfo.length > 0 && (
                            <div className="pt-3 text-gray-300">
                                <p>{siteInfo[0]?.address}</p>
                            </div>
                        )}

                    </div>

                    {/* Work Enquiries */}
                    <div>

                        <h2 className="font-semibold">
                            Work Enquiries
                        </h2>

                        <div className="pt-3 text-gray-300">

                            <p>
                                Interested in working with us?
                            </p>

                            <a
                                href="mailto:celibadhanasekharan@izhtech.com"
                                className="font-bold"
                            >
                                celibadhanasekharan@izhtech.com
                            </a>

                        </div>

                        <Link
                            href="/images/pdf/izhtech_profile.pdf"
                            className="inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background text-sm text-white rounded bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500  h-8 py-1 mt-5 w-fit px-6 relative group"
                        >
                            <span className="transition-transform duration-300 group-hover:-translate-x-3">
                                Overview and Packages
                            </span>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-arrow-right absolute w-4 h-4 transition-opacity duration-300 opacity-0 right-3 group-hover:opacity-100"
                                aria-hidden="true"
                            >
                                <path d="M5 12h14"></path>
                                <path d="m12 5 7 7-7 7"></path>
                            </svg>

                        </Link>

                    </div>

                    {/* Newsletter */}
                    <div>

                        <h2 className="font-semibold">
                            Sign up for the newsletter
                        </h2>

                        <form
                            onSubmit={handleSubmit(saveContact)}
                            className="pt-3"
                        >

                            <div className="flex sm:flex-row items-start sm:items-center gap-2">

                                {/* <TextInput
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value:
                                                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message: "Invalid email address",
                                        },
                                    })}
                                    id="email"
                                    type="email"
                                    placeholder="you@admin.com"
                                    className="w-full sm:w-auto text-white"
                                    style={{
                                        backgroundColor: "#201f23",
                                        border: "none",
                                        color: "white",
                                    }}
                                /> */}

                                <input
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value:
                                                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message: "Invalid email address",
                                        },
                                    })}
                                    type="email"
                                    id="email"
                                    placeholder="you@admin.com"
                                    className="
        w-full
        rounded-lg
        border
        border-transparent
        bg-[#201f23]
        px-4
        py-2.5
        text-sm
        text-white
        placeholder:text-gray-400
        outline-none
        transition-all
        duration-300
        focus:border-cyan-500
        focus:ring-2
        focus:ring-cyan-500/20
    "
                                />

                                <input
                                    type="hidden"
                                    value="News Letter"
                                    {...register("message", {
                                        required: "Message is required",
                                    })}
                                />

                                <Button
                                    type="submit"
                                    size="xs"
                                    className="w-20 px-0 py-2 text-white"
                                    style={{
                                        backgroundColor: "#201f23",
                                        border: "none",
                                    }}
                                >
                                    Sign up
                                </Button>

                            </div>

                            {errors.email && (
                                <p className="mt-2 text-sm text-red-600">
                                    {errors.email.message as string}
                                </p>
                            )}

                            {isSuccessContact && (
                                <p className="mt-2 text-sm text-green-500">
                                    Thank you for showing interest.
                                </p>
                            )}

                        </form>

                    </div>

                </div>

                {/* Footer Bottom */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center pt-5 lg:pt-10 mt-5 lg:mt-10">

                    <p className="text-sm text-white text-start">
                        izhtech 2024. All rights reserved
                    </p>

                    <div className="flex flex-wrap justify-between sm:justify-center gap-2 mt-4 sm:mt-0 text-xs text-white list-none">

                        <Link href="/about">
                            About Us
                        </Link>

                        <Link href="/service">
                            Our Service
                        </Link>

                        <Link href="/contact">
                            Contact Us
                        </Link>

                    </div>

                </div>

            </div>

        </footer>
    );
}