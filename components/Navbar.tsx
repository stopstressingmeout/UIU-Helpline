"use client";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { NavigationMenu, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu"
import {HamburgerMenuIcon} from "@radix-ui/react-icons";
import Logo from "@/components/Logo";
import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs";
import {usePathname} from "next/navigation";

const PageLinks=[
    {
        title: "Map",
        href: "/map"
    },
    {
        title: "Events",
        href: "/events"
    },
    {
        title: "Accommodation",
        href: "/accommodation"
    },
    {
      title: "Services",
        href: "/services"
    },
    {
        title: "Faculty",
        href: "/faculty"
    },
    {
        title: "FAQ",
        href: "/faq"
    }

]

export default function Navbar() {
    const pathname = usePathname()
    return (
        <header className="flex h-20 shrink-0 items-center px-4 md:px-6 w-full border-b">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="lg:hidden">
                        <HamburgerMenuIcon className="h-6 w-6"/>
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent className="bg-white" side="left">

                    <div className="grid gap-2 py-6">
                        <Link href="/" className="mx-auto mb-10" prefetch={false}>
                            <Logo/>
                        </Link>
                        {
                            PageLinks.map((link, index) => (
                                <Link key={index} href={link.href} className={`flex w-full items-center py-2 text-lg font-semibold  justify-center ${
                                    pathname.startsWith(link.href) ? "bg-orange-500/50 text-white" : "text-black hover:bg-accent"
                                }`} prefetch={false}>
                                    {link.title}
                                </Link>
                            ))
                        }
                    </div>
                </SheetContent>
            </Sheet>
            <Link href="/" className="hidden lg:flex" prefetch={false}>
                <Logo/>
            </Link>
            <NavigationMenu className="hidden lg:flex flex-1 max-w-full">
                <NavigationMenuList className="w-full">
                    {
                        PageLinks.map((link, index) => (
                            <NavigationMenuLink key={index} asChild>
                                <Link href={link.href}
                                        className={`px-4 py-2 text-lg transition-colors  rounded-md ${
                                            pathname.startsWith(link.href) ? "text-orange-500" : "text-gray-900 hover:bg-gray-100"
                                        }`}
                                        prefetch={false}>
                                        {link.title}
                                </Link>
                            </NavigationMenuLink>
                        ))
                    }

                </NavigationMenuList>
            </NavigationMenu>
            <div className="ml-auto">
                <SignedOut>
                    <Button asChild>
                    <SignInButton />
                    </Button>
                </SignedOut>
                <SignedIn>
                    <Button asChild>
                    <UserButton />
                    </Button>
                </SignedIn>
            </div>
        </header>
    )
}
