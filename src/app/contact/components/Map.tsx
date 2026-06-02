"use client";

import { useState } from "react";
import Image from "next/image";

const Map = () => {
    const [showMap, setShowMap] = useState(false);

    return (
        <section className="relative z-10">
            {!showMap ? (
                <div className="relative">
                    <Image
                        src="/izhtechmap.webp"
                        alt="IZH Tech Location"
                        width={1600}
                        height={600}
                        className="w-full h-125 object-cover object-top"
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
                    />


                    <div className="absolute inset-0 bg-black opacity-50" />

                    <div className="absolute inset-0 flex items-center justify-center">
                        <button
                            onClick={() => setShowMap(true)}
                            className="
                                px-6
                                py-3
                                rounded
                                shadow-lg
                                font-semibold
                                transition
                                cursor-pointer
                                text-white bg-black
                            "
                        >
                            View Our Office Location

                        </button>
                    </div>
                </div>
            ) : (
                <iframe
                    title="Izh-Tech Creative Solution"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.262948973779!2d77.41776087449153!3d8.176243601755163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b04f32d9d7fdbd7%3A0x62324ef2b8b776e!2sIzh-Tech%20Creative%20Solution!5e0!3m2!1sen!2sin!4v1750741708837!5m2!1sen!2sin"
                    width="100%"
                    height="500"
                    className="border-0 w-full"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            )}
        </section>
    );
};

export default Map;