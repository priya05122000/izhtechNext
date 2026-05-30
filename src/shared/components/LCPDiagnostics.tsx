"use client";

import { useEffect } from "react";

export default function LCPDiagnostics() {
    useEffect(() => {
        new PerformanceObserver((list) => {
            const lcpEntry = list.getEntries().at(-1);

            console.log("LCP Element:", lcpEntry);
        }).observe({
            type: "largest-contentful-paint",
            buffered: true,
        });
    }, []);

    return null;
}