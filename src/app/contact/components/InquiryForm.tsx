"use client"
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createContact } from "@/src/services/contactService";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { toast } from "sonner";

interface InquiryFormProps {
    num1: number;
    num2: number;
    resetMath: () => void;
}

const InquiryForm = ({ num1, num2, resetMath }: InquiryFormProps) => {

    const { executeRecaptcha } =
        useGoogleReCaptcha();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [mathAnswer, setMathAnswer] = useState("");
    const [mathError, setMathError] = useState("");

    async function saveContact(payload: any) {
        try {

            // generate recaptcha token
            if (!executeRecaptcha) {
                console.log(
                    "Recaptcha not ready"
                );
                return;
            }

            await new Promise((resolve) =>
                setTimeout(resolve, 1000)
            );

            const token =
                await executeRecaptcha(
                    "contact_form"
                );

            // console.log(
            //     "RECAPTCHA TOKEN:",
            //     token
            // );

            // add token into payload
            payload.token = token;

            // console.log(
            //     "FINAL PAYLOAD:",
            //     payload
            // );

            const response = await createContact(payload);
            if (response.success) {

                toast.success(
                    "Form submitted successfully"
                );

            } else {

                toast.error(
                    "Something went wrong"
                );

            }
        } catch (error) {
            console.error(error);
        } finally {
            reset();
            setMathAnswer("");
            setMathError("");
            resetMath();
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
        <form onSubmit={validateMathAnswer}>
            <div className="flex-none py-4 lg:px-8  lg:flex gap-6">
                <div className="lg:w-4/12">
                    <h2 className="font-bold">Work Enquiries</h2>
                    <p>
                        Fill in this form or <span className="font-bold">send us an e-mail</span> with your
                        enquiry.
                    </p>
                </div>
                <div className="lg:w-[60%]">
                    <div className="flex flex-wrap w-full gap-2 pt-4  lg:pl-0">

                        {/* Mobile Number Optional */}
                        <div className="w-full mb-5 md:w-[48%] lg:w-[48%]">
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Phone (optional)
                            </label>

                            <input
                                {...register("mobileNumber", {
                                    pattern: {
                                        value: /^[6-9]\d{9}$/,
                                        message:
                                            "Enter valid 10 digit mobile number",
                                    },
                                    onChange: (e) => {

                                        let value = e.target.value
                                            .replace(/\D/g, "")
                                            .slice(0, 10);

                                        // prevent starting from 0-5
                                        if (
                                            value.length > 0 &&
                                            !/^[6-9]/.test(value)
                                        ) {
                                            value = "";
                                        }

                                        e.target.value = value;
                                    },
                                })}
                                type="text"
                                inputMode="numeric"
                                maxLength={10}
                                placeholder="Your actual number"
                                className="
        bg-gray-50
        border
        border-gray-300
        text-gray-900
        text-sm
        rounded-lg
        w-full
        p-2.5
    "
                            />

                            {errors["mobileNumber"] && (
                                <p className="text-sm text-red-600">
                                    {errors["mobileNumber"]
                                        .message as string}
                                </p>
                            )}
                        </div>

                        {/* Email Required */}
                        <div className="w-full mb-5 md:w-[48%] lg:w-[48%]">
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Email (required)
                            </label>

                            <input
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value:
                                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message:
                                            "Invalid email address",
                                    },
                                    onChange: (e) => {
                                        e.target.value = e.target.value.replace(
                                            /[^a-zA-Z0-9@._-]/g,
                                            ""
                                        );
                                    },
                                })}
                                type="text"
                                placeholder="Your e-mail"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                            />

                            {errors["email"] && (
                                <p className="text-sm text-red-600">
                                    {errors["email"]
                                        .message as string}
                                </p>
                            )}
                        </div>

                        {/* Message Required */}
                        <div className="w-full mb-5 md:w-[98%]">
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Message (required)
                            </label>

                            <textarea
                                {...register("message", {
                                    required: "Message is required",
                                    maxLength: {
                                        value: 300,
                                        message:
                                            "Maximum 300 characters allowed",
                                    },
                                    onChange: (e) => {
                                        e.target.value = e.target.value
                                            .replace(
                                                /[^A-Za-z0-9\s.,!?'"()\-]/g,
                                                ""
                                            )
                                            .slice(0, 300);
                                    },
                                })}
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                                placeholder="Brief project details"
                            ></textarea>

                            {errors["message"] && (
                                <p className="text-sm text-red-600">
                                    {errors["message"]
                                        .message as string}
                                </p>
                            )}
                        </div>

                        {/* Math Question Required */}
                        <div className="w-full mb-5 md:w-[48%] lg:w-[48%]">
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Solve this: {num1} + {num2} =
                            </label>

                            <input
                                type="number"
                                value={mathAnswer}
                                onChange={(e) =>
                                    setMathAnswer(
                                        e.target.value.replace(
                                            /\D/g,
                                            ""
                                        )
                                    )
                                }
                                placeholder="Enter answer"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                            />

                            {mathError && (
                                <p className="text-sm text-red-600">
                                    {mathError}
                                </p>
                            )}
                        </div>

                    </div>
                    <button className="h-8 text-xs font-bold cursor-pointer text-white rounded bg-[#000000] w-28 border">
                        Submit
                    </button>
                </div>
            </div>
        </form>
    );
};

export default InquiryForm;