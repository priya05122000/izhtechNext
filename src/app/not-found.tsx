// app/not-found.tsx

import LinkButton from "../shared/components/LinkButton";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-5xl font-bold">
                404 - Page Not Found
            </h1>

            <p className="mt-4 text-lg">
                This page does not exist.
            </p>

            <LinkButton
                href="/"
                className="mt-6 px-6 py-5 w-40 bg-black text-white rounded-lg"
            >
                Back to Home
            </LinkButton>
        </div>
    );
}