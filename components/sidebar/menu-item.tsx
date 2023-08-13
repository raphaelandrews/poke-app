'use client';

import { useSelectedLayoutSegment } from 'next/navigation';

import  useSidebar  from "@/hooks/use-sidebar";

interface MenuItemProps {
  label?: string;
  icon: React.ReactNode;
  slug: string;
  disabled?: boolean;
  onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  label,
  icon,
  slug,
  disabled,
  onClick,
}) => {
  const segment = useSelectedLayoutSegment();
  const sidebar = useSidebar();

  const isActive = slug === segment;

  let newSlug = false;

  if (slug == "/") {
    newSlug = true
  }

  return (
    <div
      onClick={onClick}
      id={slug}
      className={`
        flex
        items-center
        gap-2
        text-sm
        font-medium
        text-primary
        dark:text-primaryDark
        ${sidebar.isOpen ? "px-2.5 py-2" : "p-2.5"}
        rounded-md
        hover:bg-foreground
        dark:hover:bg-foregroundDark
        transition
        hover:cursor-pointer
        ${disabled ? "opacity-40" : ""}
      `}
    >
      <div>
        {icon}
      </div>
      {sidebar.isOpen ? label : ""}
    </div>
  );
}

export default MenuItem;