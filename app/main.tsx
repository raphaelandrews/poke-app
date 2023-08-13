'use client'

import Link from "next/link";

import  useSidebar  from "@/hooks/use-sidebar";
import { buttonVariants } from "@/components/ui/button";

const Main = ({ children }: { children: React.ReactNode }) => {
    const sidebar = useSidebar();

    return (
            <main className={` min-h-screen bg-background dark:bg-backgroundDark transition-all duration-500 ease-in-out`}>
                {children}
            </main>
    );
}

export default Main;