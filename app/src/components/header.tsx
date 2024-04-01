import Link from "next/link";
import { CircleUser, Menu, Package2, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import DebouncedInput from "./debounced-input";
import CartSheet from "./cart-sheet";
import { useFetch } from "@/lib/hooks";
import { useRouter } from "next/router";

export interface IHeader {}

const Header: React.FC<IHeader> = ({}) => {
  const router = useRouter();
  const categoryId = router.query?.categoryId as string | undefined;
  const { data } = useFetch(`${process.env.NEXT_PUBLIC_API_HOST}/ecom/categories/`);
  const categories = (data as any)?.results || [];

  if (!data) return null;

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-10">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base whitespace-nowrap"
        >
          <Package2 className="h-6 w-6" />
          <span className="">Simple Ecom</span>
        </Link>
        {categories.map((category: any) => (
          <Link
            key={category.id}
            href={`/category/${category.id}`}
            className={`${
              parseInt(categoryId ?? "0") !== category.id
                ? "text-muted-foreground"
                : ""
            } transition-colors hover:text-foreground capitalize whitespace-nowrap`}
          >
            {category.name}
          </Link>
        ))}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Simple Ecom</span>
            </Link>
            {categories.map((category: any) => (
              <Link
                key={category.id}
                href={`/category/${category.id}`}
                className="hover:text-foreground capitalize"
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <DebouncedInput
              placeholder="Search products..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              cb={(value) => router.push(`/search?q=${value}`)}
            />
          </div>
        </form>
        <CartSheet />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("refresh");
              router.push("/login");
            }}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

Header.defaultProps = {};

export default Header;
