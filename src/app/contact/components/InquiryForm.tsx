"use client";

import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  CountryCode,
  isValidPhoneNumber,
  parsePhoneNumber,
} from "libphonenumber-js/mobile";
import { createContact, ContactModel } from "@/src/services/contactService";
import CountryCodeSelect, { useCountryOptions } from "./CountryCodeSelect";
import { toast } from "sonner";

const DEFAULT_COUNTRY: CountryCode = "IN";

interface InquiryFormValues {
  name: string;
  email: string;
  phoneCountry: CountryCode;
  mobileNumber: string;
  service: string;
  message: string;
  website: string;
}

function generateCaptcha() {
  const random = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const type = random(1, 4);

  let question = "";
  let answer = 0;

  switch (type) {
    case 1: {
      const a = random(11, 25);
      const b = random(3, 12);
      const c = random(10, 50);

      question = `(${a} × ${b}) + ${c}`;
      answer = a * b + c;
      break;
    }

    case 2: {
      const divisor = random(3, 12);
      const quotient = random(5, 15);
      const multiplier = random(2, 9);

      question = `(${divisor * quotient} ÷ ${divisor}) × ${multiplier}`;
      answer = quotient * multiplier;
      break;
    }

    case 3: {
      const a = random(11, 25);
      const b = random(3, 9);
      const c = random(10, 50);

      question = `(${a} × ${b}) - ${c}`;
      answer = a * b - c;
      break;
    }

    default: {
      const divisor = random(3, 12);
      const quotient = random(5, 15);
      const a = random(3, 9);
      const b = random(4, 15);

      question = `(${divisor * quotient} ÷ ${divisor}) + (${a} × ${b})`;
      answer = quotient + a * b;
      break;
    }
  }

  return { question, answer, options: buildOptions(answer) };
}

// The right answer plus two wrong ones close to it, shuffled
function buildOptions(answer: number) {
  const options = new Set([answer]);

  while (options.size < 3) {
    const offset = Math.floor(Math.random() * 10) + 1;
    options.add(Math.random() < 0.5 ? answer - offset : answer + offset);
  }

  const shuffled = [...options];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

const RequiredMark = () => (
  <span className="text-red-600" aria-hidden="true">
    {" "}*
  </span>
);

interface InquiryFormProps {
  services: string[];
}

const InquiryForm = ({ services }: InquiryFormProps) => {
  const [captcha, setCaptcha] = useState<{
    question: string;
    answer: number;
    options: number[];
  }>({
    question: "",
    answer: 0,
    options: [],
  });

  const [captchaReady, setCaptchaReady] = useState(false);

  useEffect(() => {
    setCaptcha(generateCaptcha());
    setCaptchaReady(true);
  }, []);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [captchaError, setCaptchaError] = useState("");

  const { question: captchaQuestion, answer: captchaAnswer } = captcha;

  const resetCaptcha = () => {
    setCaptcha(generateCaptcha());
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    getValues,
    trigger,
    formState: { errors, isSubmitted },
  } = useForm<InquiryFormValues>({ defaultValues: { phoneCountry: DEFAULT_COUNTRY } });

  const countryOptions = useCountryOptions();

  const countryName = (code: CountryCode) =>
    countryOptions.find((country) => country.code === code)?.name ?? code;

  async function saveContact(payload: ContactModel) {
    try {
      const response = await createContact(payload);

      if (response.success) {
        toast.success("Form submitted successfully");
      } else {
        toast.error(response.errorMessage);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      reset();

      setSelectedAnswer(null);

      setCaptchaError("");

      resetCaptcha();
    }
  }

  function validateCaptcha(event: React.FormEvent) {
    event.preventDefault();

    handleSubmit((payload) => {
      if (selectedAnswer === null) {
        setCaptchaError("Please choose an answer.");

        return;
      }

      if (selectedAnswer !== captchaAnswer) {
        setCaptchaError("Incorrect answer. Try again.");

        setSelectedAnswer(null);

        setCaptcha(generateCaptcha());

        return;
      }

      setCaptchaError("");

      // Save the number in international format, e.g. +919876543210
      const { phoneCountry, ...contact } = payload;

      saveContact({
        ...contact,
        mobileNumber: parsePhoneNumber(contact.mobileNumber, phoneCountry).number,
      });
    })();
  }

  return (
    <form onSubmit={validateCaptcha}>
      <div className="flex-none py-4 lg:px-8  lg:flex gap-6 mt-3">
        <div className="lg:w-4/12  mb-6 lg:mb-0">
          <h4 className="mb-3 text-xl font-black">Work Enquiries</h4>
          <h5>
            Fill in this form or{" "}
            <span className="font-bold">send us an e-mail</span> with your
            enquiry.
          </h5>
        </div>
        <div className="lg:w-[60%]">
          <div className="flex flex-wrap w-full gap-2   lg:pl-0">
            {/* Name Required */}
            <div className="w-full mb-5 md:w-[48%] lg:w-[48%]">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Name
                <RequiredMark />
              </label>

              <input
                {...register("name", {
                  required: "Name is required",
                  maxLength: {
                    value: 50,
                    message: "Maximum 50 characters allowed",
                  },
                  onChange: (e) => {
                    e.target.value = e.target.value
                      .replace(/[^A-Za-z\s.'-]/g, "")
                      .slice(0, 50);
                  },
                })}
                type="text"
                autoComplete="name"
                aria-required="true"
                placeholder="Your name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
              />

              {errors["name"] && (
                <p className="text-sm text-red-600">
                  {errors["name"].message as string}
                </p>
              )}
            </div>

            {/* Email Required */}
            <div className="w-full mb-5 md:w-[48%] lg:w-[48%]">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Email
                <RequiredMark />
              </label>

              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value:
                      /^(?!.*\.\.)(?!.*@.*@)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+$/,
                    message: "Invalid email address",
                  },
                  onChange: (e) => {
                    e.target.value = e.target.value
                      .toLowerCase()
                      .replace(/[^a-z0-9@._-]/g, "");
                  },
                })}
                type="email"
                aria-required="true"
                placeholder="Your e-mail"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
              />

              {errors["email"] && (
                <p className="text-sm text-red-600">
                  {errors["email"].message as string}
                </p>
              )}
            </div>

            {/* Mobile Number Required */}
            <div className="w-full mb-5 md:w-[48%] lg:w-[48%]">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Phone Number
                <RequiredMark />
              </label>

              <div className="flex w-full">
                <Controller
                  name="phoneCountry"
                  control={control}
                  render={({ field }) => (
                    <CountryCodeSelect
                      value={field.value}
                      options={countryOptions}
                      onChange={(code) => {
                        field.onChange(code);
                        // Re-check the number against the newly chosen country
                        if (isSubmitted) {
                          trigger("mobileNumber");
                        }
                      }}
                    />
                  )}
                />

                <input
                  {...register("mobileNumber", {
                    required: "Phone number is required",
                    validate: (value) => {
                      // Read the country at validation time: it may have just changed
                      const country = getValues("phoneCountry");
                      return (
                        isValidPhoneNumber(value, country) ||
                        `Enter a valid mobile number for ${countryName(country)}`
                      );
                    },
                    onChange: (e) => {
                      e.target.value = e.target.value.replace(/\D/g, "").slice(0, 15);
                    },
                  })}
                  type="text"
                  inputMode="numeric"
                  maxLength={15}
                  autoComplete="tel-national"
                  aria-required="true"
                  placeholder="Your actual number"
                  className="
        bg-gray-50
        border
        border-gray-300
        text-gray-900
        text-sm
        rounded-r-lg
        w-full
        min-w-0
        p-2.5
    "
                />
              </div>

              {errors["mobileNumber"] && (
                <p className="text-sm text-red-600">
                  {errors["mobileNumber"].message as string}
                </p>
              )}
            </div>

            {/* Service Optional */}
            <div className="w-full mb-5 md:w-[48%] lg:w-[48%]">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Service
              </label>

              <select
                {...register("service")}
                defaultValue=""
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
              >
                <option value="">Select a service</option>
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            {/* Message Required */}
            <div className="w-full mb-5 md:w-[98%]">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Message
                <RequiredMark />
              </label>

              <textarea
                aria-required="true"
                {...register("message", {
                  required: "Message is required",
                  maxLength: {
                    value: 300,
                    message: "Maximum 300 characters allowed",
                  },
                  onChange: (e) => {
                    e.target.value = e.target.value
                      .replace(/[^A-Za-z0-9\s.,!?'"()\-]/g, "")
                      .slice(0, 300);
                  },
                })}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                placeholder="Brief project details"
              ></textarea>

              {errors["message"] && (
                <p className="text-sm text-red-600">
                  {errors["message"].message as string}
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
            <div className="w-full mb-5 md:w-[98%]">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <label
                  id="captcha-question"
                  className="text-sm font-medium text-gray-900"
                >
                  {captchaReady
                    ? `Solve this: ${captcha.question} =`
                    : "Loading CAPTCHA..."}
                  <RequiredMark />
                </label>

                <div
                  role="radiogroup"
                  aria-labelledby="captcha-question"
                  className="flex gap-1.5 min-h-7.5"
                >
                  {captcha.options.map((option) => {
                    const selected = selectedAnswer === option;

                    return (
                      <label
                        key={option}
                        className={`flex items-center justify-center min-w-11 rounded-md border px-2.5 py-1 text-sm cursor-pointer transition-colors has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-black has-[input:focus-visible]:ring-offset-1 ${
                          selected
                            ? "bg-black border-black text-white"
                            : "bg-gray-50 border-gray-300 text-gray-900 hover:border-gray-500"
                        }`}
                      >
                        <input
                          type="radio"
                          name="captcha-answer"
                          value={option}
                          checked={selected}
                          onChange={() => {
                            setSelectedAnswer(option);
                            setCaptchaError("");
                          }}
                          className="sr-only"
                        />
                        {option}
                      </label>
                    );
                  })}
                </div>
              </div>

              {captchaError && (
                <p className="mt-1 text-sm text-red-600">{captchaError}</p>
              )}
            </div>
          </div>
          <button
            type="submit"
            disabled={!captchaReady}
            className="h-8 text-xs font-bold cursor-pointer text-white rounded bg-[#000000] w-28 border disabled:opacity-50"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default InquiryForm;
