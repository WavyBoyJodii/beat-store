'use client';

import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUser } from '@/hooks/useUser';

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  href: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  active,
  href,
}) => {
  const { user } = useUser();

  if (!user && label === 'Purchases') return null;
  return (
    <Link
      href={href}
      className={cn(
        `
          flex 
          flex-row 
          h-auto 
          items-center 
          w-full 
          gap-x-4 
          text-md 
          font-medium
          cursor-pointer
          hover:text-white
          transition
          text-neutral-400
          py-1`,
        { 'text-white': active }
      )}
    >
      <Icon size={26} />
      <p className="truncate w-100">{label}</p>
    </Link>
  );
};

export default SidebarItem;
