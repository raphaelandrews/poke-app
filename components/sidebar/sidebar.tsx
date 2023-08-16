'use client'

import { ChevronsRight, ChevronsLeft, Power } from "lucide-react";

import  useSidebar  from "@/hooks/use-sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Menu from "@/components/sidebar/menu";
import Logo from "@/components/logo";

interface SidebarProps {
    userId: string;
}

const Sidebar: React.FC<SidebarProps> = ({ userId }) => {
    const sidebar = useSidebar();

    return (
        <aside
            className={`
                hidden
                fixed
                sm:flex
                flex-col
                justify-between
                h-screen
                top-0
                left-0
                p-4
                border-r
                border-border
                dark:border-borderDark
                bg-background
                dark:bg-backgroundDark
                ${sidebar.isOpen ? "w-[180px] items-left" : "w-[4.75rem] items-center"}
                transition-all
                duration-500
                ease-in-out
            `}
        >
            <div>
                <div className={`flex items-center ${sidebar.isOpen ? "undefined" : "justify-center"}`}>
                    <Logo className={`${sidebar.isOpen ? "px-2" : undefined}`} />
                    <Button variant="ghost" className="absolute right-0 translate-x-2/4 p-1 w-6 h-6 border rounded-full border-border dark:border-borderDark bg-background dark:bg-backgroundDark" onClick={sidebar.onToggle}>
                        {sidebar.isOpen
                            ?
                            <ChevronsLeft className="text-primary dark:text-primaryDark" />
                            :
                            <ChevronsRight className="text-primary dark:text-primaryDark" />
                        }
                    </Button>
                </div>
                <ScrollArea className="h-[80vh] w-[100%] mt-8">
                    <Menu />
                </ScrollArea>
            </div>
        </aside>
    );
}

export default Sidebar;