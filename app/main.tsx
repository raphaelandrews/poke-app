'use client'

import Topbar from "@/components/topbar/topbar";
import useSidebar from "@/hooks/use-sidebar";

const Main = ({ children }: { children: React.ReactNode }) => {
    const sidebar = useSidebar();

    return (
        <>
            <main className={`${sidebar.isOpen ? "md:pl-[180px]" : "md:pl-[4.75rem]"} min-h-screen bg-background dark:bg-backgroundDark transition-all duration-500 ease-in-out`}>
                <Topbar />
                {children}
            </main>
        </>
    );
}

export default Main;