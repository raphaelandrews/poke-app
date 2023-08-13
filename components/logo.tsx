'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import  useSidebar  from "@/hooks/use-sidebar";

const Logo = () => {
  const router = useRouter();
  const sidebar = useSidebar();

  return (
    <div className={`flex items-center gap-4 overflow-hidden ${sidebar.isOpen ? "px-2" : undefined}`}>
      <Image
        onClick={() => router.push('/')}
        className="w-8 cursor-pointer"
        src="/images/logo.svg"
        height="100"
        width="100"
        alt="Logo"
      />
      <div className={`text-lg font-bold text-primary dark:text-primaryDark ${sidebar.isOpen ? "block" : "hidden"}`}>PokéApp</div>
    </div>

  );
}

export default Logo;