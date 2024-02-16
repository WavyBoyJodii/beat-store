'use client';

import { Home, Search, PackageCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import Box from './Box';
import { Beat } from '@/types';
import usePlayer from '@/hooks/usePlayer';
import SidebarItem from './SidebarItem';
import Library from './Library';

interface SidebarProps {
  children: React.ReactNode;
  //   beats: Beat[];
}

// TODO: add beats back to props to send via Layout to use for recently played???? probably not

const Sidebar = ({ children }: SidebarProps) => {
  const pathname = usePathname();
  const player = usePlayer();

  const routes = useMemo(
    () => [
      {
        icon: Home,
        label: 'Home',
        active: pathname === '/',
        href: '/',
      },
      {
        icon: Search,
        label: 'Search',
        href: '/search',
        active: pathname === '/search',
      },
      {
        icon: PackageCheck,
        label: 'Purchases',
        href: '/purchases',
        active: pathname === '/purchases',
      },
    ],
    [pathname]
  );

  return (
    <div
      className={cn('flex h-full py-2 px-2', {
        'h-[calc(100%-80px)]': player.activeId,
      })}
    >
      <div className=" hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p2">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        {/* TODO: Create useRecentBeats hook to send recentlyPlayed to Library component */}
        <Box className="overflow-y-auto h-full">
          <Library recentlyPlayed="nada" />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto px-2">{children}</main>
    </div>
  );
};

export default Sidebar;
