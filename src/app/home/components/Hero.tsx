import Image from "next/image";
import CustomObject from "@/src/shared/components/CustomObjects";

export default function Hero() {
    return (
        <section className="pt-6 pb-6 lg:min-h-[80vh] relative overflow-hidden">

            <div className="md:container relative flex justify-center md:h-full min-h-[60vh] mx-auto   sm:px-8">

                <div className="flex flex-col justify-center gap-4 px-5 my-auto md:flex-row md:pb-20 lg:pb-0">

                    {/* LEFT CONTENT */}
                    <div className="flex flex-col justify-end lg:w-4/6 sm:w-[75%] px-5 sm:px-11 md:px-0 lg:px-11 lg:m-0 mx-auto">

                        <div
                            // variants={fadeIn("right", 0.2)}
                            // initial="hidden"
                            // whileInView={"show"}
                            // // exit={"hidden"}
                            // viewport={{ once: true, amount: 0.15 }}
                            className="flex flex-col xl:pl-36 lg:pl-16 hero-fade-right"
                        >
                            <p className="text-[#0C1C28]  order-2 lg:order-1 text-justify pt-5 text-base md:text-xs lg:text-sm">
                                Izh Tech is your trusted website development company and digital
                                marketing agency, offering tailored solutions to boost your
                                brand’s online presence. Don’t navigate the digital world alone!
                            </p>
                            <p className="
    order-1
    text-4xl
    sm:text-5xl
    xl:text-7xl
    font-black
    lg:order-2
">
                                Give your brand the edge it deserves.
                            </p>
                        </div>
                    </div>


                    <div
                        // variants={fadeIn("left", 0.2)}
                        // initial="hidden"
                        // whileInView="show"
                        // viewport={{ once: true, amount: 0.15 }}
                        className="hero-fade-left relative mx-auto hidden h-full flex-col justify-end  px-5 md:flex lg:w-3/6 sm:w-full"
                    >
                        {/* <Image
                            src="/images/hero.webp"
                            alt="Hero Image"
                            width={500}
                            height={500}
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 50vw"
                            // className="mx-auto h-auto sm:w-[50%] md:w-[80%] lg:mx-0 lg:w-[75%]"
                            className="mx-auto h-auto w-full max-w-sm lg:max-w-md lg:mx-0"
                        /> */}

                        <Image
                            src="/images/hero.webp"
                            alt="Hero Image"
                            width={734}
                            height={441}
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 50vw"
                            className="mx-auto h-auto w-full max-w-sm lg:max-w-md lg:mx-0"
                        />
                    </div>
                </div>
            </div>

            {/* BACKGROUND GIF */}
            {/* <motion.span
                variants={fadeIn("right", 0.5)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: true, amount: 0.15 }}
            > */}

            <CustomObject
                // className="absolute -top-12.5 md:-top-12.5 lg:-top-12.5 xl:-top-13.75 opacity-50 sm:opacity-100 -left-5 sm:left-0 -z-10 h-screen sm:h-[95vh] block"
                className="absolute top-0 left-0 -z-10 hidden md:block h-[90vh] opacity-70 lg:opacity-100 pointer-events-none"
                variants="full"
            />
            {/* </motion.span> */}

        </section>
    );
}