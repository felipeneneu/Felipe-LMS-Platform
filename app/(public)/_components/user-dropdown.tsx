import {
  BookOpenIcon,
  ChevronDownIcon,
  HomeIcon,
  LayoutDashboardIcon,
  LogOutIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface iAppProps {
  name: string;
  image: string;
  email: string;
}

export default function UserDropDown({ name, image, email }: iAppProps) {
  const router = useRouter();
  const signOut = async function () {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          toast.success("Logged out successfully");
        },
        onError: () => {
          toast.error("Error logging out. Please try again.");
        },
      },
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="focus:outline-none focus:ring-0">
        <Button
          className="h-auto p-0 hover:bg-transparent focus-visible:border-ring-none focus-visible:ring-none focus-visible:ring-0"
          variant="ghost"
        >
          <Avatar>
            <AvatarImage alt="Profile image" src={image} />
            <AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <ChevronDownIcon
            aria-hidden="true"
            className="opacity-60"
            size={16}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64" align="end">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="truncate font-medium text-foreground text-sm">
            {name}
          </span>
          <span className="truncate font-normal text-muted-foreground text-xs">
            {email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/">
              <HomeIcon aria-hidden="true" className="opacity-60" size={16} />
              <span>Home</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/courses">
              <BookOpenIcon
                aria-hidden="true"
                className="opacity-60"
                size={16}
              />
              <span>Courses</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard">
              <LayoutDashboardIcon
                aria-hidden="true"
                className="opacity-60"
                size={16}
              />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut}>
          <LogOutIcon aria-hidden="true" className="opacity-60" size={16} />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
