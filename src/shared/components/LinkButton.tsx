import React from "react";
import Link from "next/link";

interface LinkButtonProps {
    href: string;
    className?: string;
    variant?: "filled" | "outline";
    children: React.ReactNode;
    target?: string; // Add this line
    rel?: string

}

const LinkButton: React.FC<LinkButtonProps> = ({
    href,
    className = "",
    variant = "filled",
    children,
    target,
    rel,
}) => {
    const base =
        "flex items-center justify-center text-sm font-medium h-7 rounded-sm w-32 px-2 relative group transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background ";
    const filled =
        "text-white bg-black border-1";
    const outline =
        "text-black bg-transparent border-2 border-black py-1 px-3";
    const variantClass = variant === "filled" ? filled : outline;

    return (
        <Link href={href} target={target}
            rel={rel}
            className={`${base} ${variantClass} ${className}`}>
            <span className="transition-transform duration-300 group-hover:-translate-x-3">
                {children}
            </span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-right absolute w-4 h-4 transition-opacity duration-300 opacity-0 right-3 group-hover:opacity-100"
                aria-hidden="true"
            >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
            </svg>
        </Link>
    );
};

export default LinkButton;