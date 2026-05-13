"use client"
import React, { useState } from 'react'
import { motion } from "framer-motion"
import CustomObject from '@/src/shared/components/CustomObjects'
import { fadeIn } from '@/src/shared/animation/variants'
import { useForm } from 'react-hook-form'
import { createContact } from "@/src/services/contactService";

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

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // Math question state
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [mathAnswer, setMathAnswer] = useState("");
    const [mathError, setMathError] = useState("");

    React.useEffect(() => {
        setNum1(Math.floor(Math.random() * 10) + 1);
        setNum2(Math.floor(Math.random() * 10) + 1);
    }, []);

    async function saveContact(payload: any) {
        try {
            const response = await createContact(payload);
            if (response.success) {
                console.log("Contact created successfully");
            }
        } catch (error) {
            console.error(error);
        } finally {
            reset();
            setNum1(Math.floor(Math.random() * 10) + 1);
            setNum2(Math.floor(Math.random() * 10) + 1);
            setMathAnswer("");
            setMathError("");
        }
    }

    function validateMathAnswer(event: React.FormEvent) {
        event.preventDefault();
        if (parseInt(mathAnswer) !== num1 + num2) {
            setMathError("Incorrect answer. Try again.");
        } else {
            setMathError("");
            handleSubmit(saveContact)();
        }
    }

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
                        <div className="flex flex-col lg:flex-row md:flex-row lg:px-8 md:gap-1 xl:gap-6">
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
                        <form onSubmit={validateMathAnswer}>
                            <div className="flex-none py-4 lg:px-8 md:px-4 lg:flex xl:gap-6">
                                <motion.div
                                    variants={fadeIn("right", 0.1)}
                                    initial="hidden"
                                    whileInView={"show"}
                                    exit={"hidden"}
                                    viewport={{ once: false, amount: 0.1 }}
                                    className="lg:w-4/12"
                                >
                                    <h2 className="font-bold">Work Enquiries</h2>
                                    <p>
                                        Fill in this form or <span className="font-bold">send us an e-mail</span> with your
                                        enquiry.
                                    </p>
                                </motion.div>

                                <motion.div
                                    variants={fadeIn("left", 0.1)}
                                    initial="hidden"
                                    whileInView={"show"}
                                    exit={"hidden"}
                                    viewport={{ once: false, amount: 0.1 }}
                                    className="lg:w-[60%]"
                                >
                                    <div className="flex flex-wrap w-full gap-2 pt-4 md:p-3 lg:pl-0">
                                        <div className="w-full mb-5 md:w-[48%] lg:w-[48%]">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 ">
                                                Phone (optional)
                                            </label>
                                            <input
                                                {...register("mobileNumber")}
                                                type="text"
                                                placeholder="Your actual number"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                            />
                                        </div>

                                        <div className="w-full mb-5 md:w-[48%] lg:w-[48%]">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 ">
                                                Email (required)
                                            </label>
                                            <input
                                                {...register("email", {
                                                    required: "Email is required",
                                                    pattern: {
                                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                        message: "Invalid email address",
                                                    },
                                                })}
                                                type="text"
                                                placeholder="Your e-mail"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                            />
                                            {errors["email"] && <p className="text-sm text-red-600">{errors["email"].message as string}</p>}
                                        </div>

                                        <div className="w-full mb-5 md:w-[98%]">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 ">
                                                Message (required)
                                            </label>
                                            <textarea
                                                {...register("message", {
                                                    required: "Message is required",
                                                })}
                                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                                                placeholder="Brief project details"
                                            ></textarea>
                                            {errors["message"] && <p className="text-sm text-red-600">{errors["message"].message as string}</p>}
                                        </div>

                                        {/* Math Question */}
                                        <div className="w-full mb-5 md:w-[48%] lg:w-[48%]">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 ">
                                                Solve this: {num1} + {num2} =
                                            </label>
                                            <input
                                                type="number"
                                                value={mathAnswer}
                                                onChange={(e) => setMathAnswer(e.target.value)}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                            />
                                            {mathError && <p className="text-sm text-red-600">{mathError}</p>}
                                        </div>
                                    </div>

                                    <button className="h-8 text-xs font-bold text-white rounded bg-[#000000] w-28 border">
                                        Submit
                                    </button>
                                </motion.div>
                            </div>
                        </form>
                    </section>
                </div>
            </section>
        </>
    )
}

export default Inquiry
