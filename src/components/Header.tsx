'use client';

import { Home, Search, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import usePlayer from '@/hooks/usePlayer';
import Link from 'next/link';
import Cart from './Cart';
import useAuthModal from '@/hooks/useAuthModal';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useUser } from '@/hooks/useUser';
import { toast } from 'sonner';

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const player = usePlayer();
  const router = useRouter();
  const authModal = useAuthModal();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    router.refresh();

    if (error) {
      toast.error(`${error.message}`);
    } else {
      toast.success('Logged Out');
    }
  };

  return (
    <div
      className={cn(
        'h-fit bg-gradient-to-b from-slate-800 p-6 sticky top-0 z-10 backdrop-filter backdrop-blur-lg bg-opacity-30',
        className
      )}
    >
      <div className="w-full mb-4 flex items-center justify-between gap-x-4">
        <div className="flex md:hidden gap-x-2 items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.push('/')}
            className=" rounded-full"
          >
            <Home />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.push('/search')}
            className=" rounded-full"
          >
            <Search />
          </Button>
        </div>
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className=" ml-auto hover:cursor-pointer">
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem>
                <Link href="/purchases">Purchases</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/favorites">Favorites</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Button
              onClick={authModal.onOpen}
              variant="ghost"
              className="ml-auto"
            >
              Sign Up
            </Button>
            <Button onClick={authModal.onOpen} variant="outline">
              Log In
            </Button>
          </>
        )}

        <Cart />
      </div>
      {children}
    </div>
  );
};

export default Header;
