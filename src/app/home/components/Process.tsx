"use client";
import { motion } from "framer-motion";
import { fadeIn } from "../../../shared/animation/variants";
import CustomObject from "../../../shared/components/CustomObjects";
import Accordion from "@/src/shared/components/Accordion";


const processContentSetOne = [
  {
    title: "STRATEGY BEFORE EXECUTION",
    description:
      "We begin by understanding your business from the inside out. Your targets become our blueprint, whether for software, campaigns, or assets. No guesswork, only focused strategy.",
  },
  {
    title: "VISUALIZE TO REALIZE",
    description:
      "Prototypes, wireframes, and mockups. We bring ideas to life early. From app interfaces to ad flows and brand identities, you’ll see it before we build it.",
  },
  {
    title: "DESIGN WITH PURPOSE",
    description:
      "Every element from logos to UI screens is crafted to perform. We blend aesthetics with strategy to drive engagement, trust, and conversions.",
  },

];
const processContentSetTwo = [
  {
    title: "TECH THAT POWERS GROWTH",
    description:
      "Whether you need strong software, data-driven marketing, or scalable automation, our solutions are crafted to evolve with you and adjust to change.",
  },
  {
    title: "VALIDATE RELENTLESSLY",
    description:
      "We test everything, including A/B testing for ads, QA for platforms, and stress tests for brand messaging, to ensure reliability, resonance, and performance.",
  },
  {
    title: "LAUNCH FOR IMPACT",
    description:
      "When it's time to go live, we ensure a seamless rollout. Every launch, be it an app, campaign, or brand, is designed to create lasting impact and measurable results.",
  },
];

export default function Process() {

  return (
    <section className="mx-auto xl:px-20 container-fluid xl:container lg:py-10">

      <div className="relative flex-col gap-4 pt-10 sm:pb-10 h-4/5 lg:flex lg:flex-row">
        <div className="w-full sm:w-[75%] lg:w-3/4">
          <div className="relative flex flex-col h-full py-5 px-5 ">
            <motion.div
              variants={fadeIn("right", 0.2)}
              initial="hidden"
              whileInView={"show"}
              // exit={"hidden"}
              viewport={{
                once: true,
                amount: 0.15,
              }}
            >
              <p className="z-10 text-base">OUR PROCESS</p>
              <CustomObject className="absolute -z-10 " variants="green-disk" />
              <h4 className="py-2 text-3xl sm:text-4xl font-bold">
                Digital Triumph Assurance
              </h4>
              <p className="pt-4 pb-4 text-base">
                How we get things done
                <br />
              </p>
            </motion.div>

          </div>

        </div>
        <div
          className="
        absolute
        right-0
        left-1/3
        top-6
        bottom-5
        hidden
        bg-[url('/images/Group11.webp')]
        bg-right
        bg-cover
        bg-no-repeat
        lg:block
    "
        />
      </div>

      <div className="flex flex-col w-full gap-2 px-5 py-4 md:gap-8 md:flex-row lg:flex-row lg:flex-wrap lg:justify-center ">
        <div className=" flex-col hidden md:flex-1 lg:w-1/4 md:block">
          <Accordion items={processContentSetOne} />
        </div>
        <div className=" flex-col hidden md:flex-1 lg:w-1/4 md:block">
          <Accordion items={processContentSetTwo} />
        </div>
        <div className="flex flex-col md:flex-1 lg:w-1/4 md:hidden">
          <Accordion items={[...processContentSetOne, ...processContentSetTwo]} />
        </div>
      </div>
    </section>
  );
}
