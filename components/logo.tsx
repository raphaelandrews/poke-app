'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import useSidebar from "@/hooks/use-sidebar";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  const router = useRouter();
  const sidebar = useSidebar();

  return (
    <div
      className={cn("flex items-center gap-4 overflow-hidden", className)}
    >
      <Image
        onClick={() => router.push('/')}
        className="w-8 cursor-pointer"
        src="/images/logo.svg"
        height="100"
        width="100"
        alt="Logo"
      />
      <div
        className={`
          text-lg 
          font-bold 
          text-primary 
          dark:text-primaryDark 
          ${sidebar.isOpen ? "hidden  md:block" : "hidden"}`
        }>
        PokéApp
      </div>
    </div>

  );
}

export default Logo;