"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createContact, ContactModel } from "@/src/services/contactService";
import { toast } from "sonner";

function generateCaptcha() {
    const operations = ["+", "-", "*"];

    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;

    const operation =
        operations[Math.floor(Math.random() * operations.length)];

    let answer = 0;

    switch (operation) {
        case "+":
            answer = num1 + num2;
            break;

        case "-":
            answer = num1 - num2;
            break;

        case "*":
            answer = num1 * num2;
            break;
    }

    return { question: `${num1} ${operation} ${num2}`, answer };
}

const InquiryForm = () => {


    const [captcha, setCaptcha] = useState(generateCaptcha);
    const [userAnswer, setUserAnswer] = useState("");
    const [captchaError, setCaptchaError] = useState("");

    const { question: captchaQuestion, answer: captchaAnswer } = captcha;

    const resetCaptcha = () => {
        setCaptcha(generateCaptcha());
    };



    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    async function saveContact(payload: ContactModel) {
        try {
            const response = await createContact(payload);

            if (response.success) {
                toast.success(
                    "Form submitted successfully"
                );
            } else {
                toast.error(
                    response.errorMessage
                );
            }

        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            reset();

            setUserAnswer("");

            setCaptchaError("");

            resetCaptcha();
        }
    }


    function validateCaptcha(
        event: React.FormEvent
    ) {
        event.preventDefault();

        handleSubmit((payload) => {

            if (
                Number(userAnswer) !== captchaAnswer
            ) {
                setCaptchaError(
                    "Incorrect answer. Try again."
                );

                setUserAnswer("");

                generateCaptcha();

                return;
            }

            setCaptchaError("");

            saveContact(payload);

        })();
    }

    return (
        <form onSubmit={validateCaptcha}>
            <div className="flex-none py-4 lg:px-8  lg:flex gap-6 mt-3">
                <div
                    className="lg:w-4/12  mb-6 lg:mb-0"
                >

                    <h4 className="mb-3 text-xl font-black">Work Enquiries</h4>
                    <h5>
                        Fill in this form or <span className="font-bold">send us an e-mail</span> with your
                        enquiry.
                    </h5>
                </div>
                <div className="lg:w-[60%]">
                    <div className="flex flex-wrap w-full gap-2   lg:pl-0">

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
                                            /^(?!.*\.\.)(?!.*@.*@)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+$/,
                                        message:
                                            "Invalid email address",
                                    },
                                    onChange: (e) => {
                                        e.target.value = e.target.value
                                            .toLowerCase()
                                            .replace(
                                                /[^a-z0-9@._-]/g,
                                                ""
                                            );
                                    },
                                })}
                                type="email"
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

                        <input
                            type="text"
                            {...register("website")}
                            style={{ display: "none" }}
                            tabIndex={-1}
                            autoComplete="off"
                        />

                        {/* Math Question Required */}
                        <div className="w-full mb-5 md:w-[48%] lg:w-[48%]">
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Solve this: {captchaQuestion} =
                            </label>

                            <input
                                type="number"
                                value={userAnswer}
                                onChange={(e) =>
                                    setUserAnswer(
                                        e.target.value
                                    )
                                }
                                placeholder="Enter answer"
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

                            {captchaError && (
                                <p className="text-sm text-red-600">
                                    {captchaError}
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