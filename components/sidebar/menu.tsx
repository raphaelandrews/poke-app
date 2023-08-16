'use client';

import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import useSidebar from "@/hooks/use-sidebar";
import MenuItem from "./menu-item";
import {
    BarChart2,
    Calendar,
    ClipboardSignature,
    Facebook,
    Home,
    Instagram,
    Mail,
    Medal,
    Megaphone,
    Newspaper,
    Scroll,
    Trophy,
    Users
} from "lucide-react";

const Menu = () => {
    const router = useRouter();
    const sidebar = useSidebar();

    return (
        <>
            <h2 className={`text-primary dark:text-primaryDark font-semibold mb-2 tracking-tight ${sidebar.isOpen ? "text-lg px-2" : "text-sm text-center"}`}>Menu</h2>
            <nav className="flex flex-col gap-2 overflow-x-hidden">
                <MenuItem
                    icon={<Home className={`${sidebar.isOpen ? "w-4 h-4" : "w-[1.125rem] h-[1.125rem]"}`} />}
                    onClick={() => router.push('/')}
                    label="Home"
                    slug="/"
                />
                <MenuItem
                    icon={<Home className={`${sidebar.isOpen ? "w-4 h-4" : "w-[1.125rem] h-[1.125rem]"}`} />}
                    onClick={() => router.push('/dashboard')}
                    label="Home"
                    slug="/"
                />
            </nav>
        </>
    );
}

export default Menu;