"use client"
import { motion } from "framer-motion";
import { fadeIn } from '@/src/shared/animation/variants';
import CustomObject from '@/src/shared/components/CustomObjects';
import MissionStatement from './MissionStatement';
import LinkButton from '@/src/shared/components/LinkButton';
import Image from 'next/image';

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

interface MissionStatementProps {
  siteInfo: SiteInformation[];
}

const Banner = ({ siteInfo }: MissionStatementProps) => {
  return (
    <section className="mx-auto container-fluid xl:container lg:px-8">
      <div className="lg:px-10 pb-12 pt-12  bg-[#F5F7FF] rounded">
        <div className="flex-col justify-center gap-4 px-5 my-auto h-4/5 lg:flex lg:flex-row">
          <motion.div
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView={"show"}
            // exit={"hidden"}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            className=" lg:w-4/6 sm:w-[80%] sm:pe-7 lg:m-0 mx-auto relative "
          >
            <div className="relative flex flex-col justify-end h-full pb-5 ">
              <p className="z-10 text-base">#Grow_Your_Business</p>
              <CustomObject className="absolute top-10 " variants="orange-disk" />
              <h1 className="relative pt-4 text-4xl font-bold 2xl:text-7xl lg:text-4xl md:text-4xl sm:text-4xl">
                Innovate through software development and rise in the digital space.
              </h1>
              <p className="z-10 pt-4 pb-4 text-base text-justify">
                Izh Tech is a trusted website development company and digital
                marketing agency dedicated to accelerating your business growth.
                Whether you&apos;re a startup, a traditional business, or an
                entrepreneur, we craft customized solutions to boost your online
                visibility and strengthen your digital presence.
              </p>


              <LinkButton href="/about" variant="outline" className="text-xs">Explore More</LinkButton>

            </div>
          </motion.div>
          <motion.div
            variants={fadeIn("left", 0.2)}
            initial="hidden"
            whileInView={"show"}
            // exit={"hidden"}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            className="relative flex flex-col justify-end h-full  mx-auto my-auto lg:w-3/6 sm:w-full"
          >
            <CustomObject
              className="
            absolute
            top-0
            left-0
            hidden
            lg:block
            -translate-y-1/2
            -translate-x-1/2
            lg:w-50 lg:h-50
            z-0
        "
              variants="blue-short-line-left"
            />

            {/* <CustomObject
              className="absolute hidden -left-28 w-100 h-80 z-0 -top-18 lg:-top-12.5 -2xl lg:block"
              variants="blue-short-line-left"
            /> */}

            {/* <img className=" sm:w-[80%] lg:w-full z-10 lg:m-0 mx-auto h-auto" src="/images/bannar1/img.webp"  alt="Software development and digital marketing services" /> */}
            <Image
              className="
    relative
    z-10
    sm:w-[80%]
    lg:w-full
    lg:m-0
    mx-auto
    h-auto
"
              src="/images/business-1.webp"
              alt="Software development and digital marketing services"
              width={800}
              height={600}
              preload
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

          </motion.div>
        </div>

        <MissionStatement siteInfo={siteInfo} />
      </div>
    </section>
  )
}

export default Banner
