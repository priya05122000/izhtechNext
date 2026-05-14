"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import LinkButton from "@/src/shared/components/LinkButton";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const navItems = [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
        { name: "Service", path: "/service" },
        { name: "Project", path: "/project" },
        { name: "Career", path: "/career" },
        { name: "Blog", path: "/blog" },
        { name: "Contact Us", path: "/contact" },
    ];

    return (
        <nav className="bg-white sticky backdrop-blur-2xl z-50 px-2 py-2.5 dark:border-gray-700 dark:bg-white sm:px-4 rounded container mx-auto top-2">
            <div className="mx-auto flex flex-wrap items-center justify-between">

                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <img
                        src="/logo-primary.png"
                        className="w-16"
                        alt="izhtech | Your Digital Partner"
                    />
                </Link>

                {/* Right side */}
                <div className="flex md:order-2">

                    {/* CTA Button */}
                    <LinkButton
                        href="https://wa.me/918355990274?text=Hi!"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors flex items-center justify-center  text-sm font-bold text-white py-1 bg-black h-10  relative group"
                    >
                        Let's Talk
                    </LinkButton>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 md:hidden"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                </div>

                {/* Menu */}
                <div
                    className={`w-[90%] md:block md:w-auto absolute md:relative bg-white top-20 md:top-0 transition-transform duration-1000 ${isOpen ? "block" : "hidden"
                        }`}
                >
                    <ul className="mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium">

                        {navItems.map((item) => (
                            <div className="relative" key={item.path}>
                                <li>
                                    <Link
                                        href={item.path}
                                        onClick={() => setIsOpen(false)}
                                        className={`block py-2 pl-3 pr-4 md:p-0 text-bold ${pathname === item.path
                                            ? "border-b-2 border-purple-950 border-solid"
                                            : "border-b border-gray-100 hover:bg-gray-50 md:border-0 md:hover:bg-transparent md:hover:text-cyan-700"
                                            }`}
                                    >
                                        {item.name}

                                    </Link>
                                </li>
                            </div>
                        ))}

                    </ul>
                </div>
            </div>
        </nav>
    );
}