"use client";

import { Works } from "@/components/Works";
import Link from "next/link";


export default function WorksPage() {


    return (
        <main className="relative min-h-screen w-full bg-[var(--beatriz-gray)] text-[var(--beatriz-blue)] font-mono">
            {/* Header */}


            <Works showTitle={true} showFilters={true} showViewAllButton={false} />
        </main>
    );
}
