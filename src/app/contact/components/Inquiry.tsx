"use client"
import React, { useState } from 'react'
import { motion } from "framer-motion"
import CustomObject from '@/src/shared/components/CustomObjects'
import { fadeIn } from '@/src/shared/animation/variants'
import { useForm } from 'react-hook-form'
import { createContact } from "@/src/services/contactService";
import InquiryForm from './InquiryForm'
import LazyCaptcha from '@/src/shared/components/LazyCaptcha'

interface SiteInformation {

    id: string,
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

interface InquiryProps {
    siteInfo: SiteInformation[];
}

const Inquiry = ({ siteInfo }: InquiryProps) => {



    // Math question state
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);


    React.useEffect(() => {
        setNum1(Math.floor(Math.random() * 10) + 1);
        setNum2(Math.floor(Math.random() * 10) + 1);
    }, []);

    const resetMath = () => {
        setNum1(Math.floor(Math.random() * 10) + 1);
        setNum2(Math.floor(Math.random() * 10) + 1);
    };


    return (
        <>

            <section className="md:container relative px-5 pt-1 pb-6 mx-auto ">
                <motion.div
                    variants={fadeIn("down", 0.1)}
                    initial="hidden"
                    whileInView="show"
                    exit="hidden"
                >
                    {" "}
                    <CustomObject
                        className="absolute w-[45%] lg:w-[17%] right-4 -z-10 hidden md:block"
                        variants="line-teal-up"
                    />
                </motion.div>
                <div className="py-8">
                    <section>
                        <div className="flex flex-col lg:flex-row md:flex-row lg:lg:px-8 gap-6">
                            <motion.div
                                variants={fadeIn("right", 0.1)}
                                initial="hidden"
                                whileInView={"show"}
                                exit={"hidden"}
                                viewport={{ once: false, amount: 0.1 }}
                                className="lg:w-4/12 md:w-6/12"
                            >
                                <h4 className="mb-3 text-xl font-black">Our Offices</h4>
                                <p>Schedule your visit with us</p>
                            </motion.div>
                            <motion.div
                                variants={fadeIn("left", 0.1)}
                                initial="hidden"
                                whileInView={"show"}
                                exit={"hidden"}
                                viewport={{ once: false, amount: 0.1 }}
                            >
                                <h2 className="mb-3 font-black">Head Office</h2>
                                {siteInfo[0]?.address}
                                <p className="mb-5 font-black">Call us: {siteInfo[0]?.mobilePrimary}</p>
                                <p>Monday-Friday</p>
                            </motion.div>
                        </div>
                    </section>

                    <section>
                        <LazyCaptcha
                         form={"contact-us"}>
                            <InquiryForm num1={num1} num2={num2} resetMath={resetMath} />
                        </LazyCaptcha>

                    </section>
                </div>
            </section>
        </>
    )
}

export default Inquiry
