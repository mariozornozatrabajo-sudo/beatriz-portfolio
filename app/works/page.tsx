"use client";

import { Works } from "@/components/Works";
import { PreFooter } from "@/components/PreFooter";
import Link from "next/link";
import { Suspense } from "react";


export default function WorksPage() {


    return (
        <>
            <main className="relative min-h-screen w-full bg-[var(--beatriz-gray)] text-[var(--beatriz-blue)] font-mono">
                {/* Header */}


                <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading...</div>}>
                    <Works showTitle={true} showFilters={true} showViewAllButton={false} />
                </Suspense>
            </main>
            <PreFooter hideWorksCta={true} />
        </>
    );
}
