"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createContact } from "@/src/services/contactService";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export default function NewsletterForm() {
    const [isSuccessContact, setIsSuccessContact] = useState(false);
    const { executeRecaptcha } = useGoogleReCaptcha();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    async function saveContact(payload: any) {
        try {
            if (!executeRecaptcha) {
                console.log("Recaptcha not ready");
                return;
            }

            await new Promise((resolve) => setTimeout(resolve, 500));

            const token = await executeRecaptcha("newsletter_form");

            console.log(
                "RECAPTCHA TOKEN:",
                token
            );
            payload.token = token;

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
        <form onSubmit={handleSubmit(saveContact)} className="pt-3">
            <div className="flex sm:flex-row items-start sm:items-center gap-2">
                <div className="flex w-full sm:w-auto text-white">
                    <div className="relative w-full">
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Invalid email address",
                                },
                                onChange: (e) => {
                                    e.target.value = e.target.value.replace(
                                        /[^a-zA-Z0-9@._-]/g,
                                        ""
                                    );
                                },
                            })}
                            type="email"
                            name="email"
                            id="email"
                            placeholder="you@admin.com"
                            className="
                                block
                                w-full
                                rounded-lg
                                border
                                border-transparent
                                bg-[#201f23]
                                p-2.5
                                text-sm
                                text-white
                                placeholder-gray-400

                                outline-none
                            "
                        />
                    </div>
                </div>
                <input
                    type="hidden"
                    value="News Letter"
                    {...register("message", {
                        required: "Message is required",
                    })}
                />
                <button
                    type="submit"
                    className="
                        group
                        relative
                        flex
                        items-stretch
                        justify-center
                        rounded-lg
                        w-20
                        px-0
                        py-2
                        text-white
                        bg-[#201f23]
                        transition-all
                        duration-300
                        hover:bg-[#2a2930]
                        cursor-pointer
                    "
                >
                    <span className="flex items-stretch transition-all duration-200 rounded-md px-2 py-1 text-xs">
                        Sign up
                    </span>
                </button>
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
    );
}