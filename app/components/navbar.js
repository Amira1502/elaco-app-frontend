"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from "react";
import {
  Navbar as MTNavbar,
  Collapse,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import {
  RectangleStackIcon,
  UserCircleIcon,
  CommandLineIcon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext"

const NAV_MENU = [
  { name: "Home", icon: RectangleStackIcon, href: "/" },
  { name: "Services", icon: UserCircleIcon, href: "#" },
  { name: "Contact", icon: CommandLineIcon, href: "/contact" },
];

function NavItem({ children, href }) {
  return (
    <li>
      <Typography
        as="a"
        href={href || "#"}
        variant="paragraph"
        color="gray"
        className="flex items-center gap-2 font-medium text-gray-900"
      >
        {children}
      </Typography>
    </li>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { idUser, loading: userLoading, logout } = useUser();
  console.log("idddd" + idUser)


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpen = () => setOpen((cur) => !cur);
  // const isUserConnected = () => Boolean(localStorage.getItem("userId"));
  // const handleMemberAccess = () =>
  //   router.push(isUserConnected() ? "/dashboard1/profile" : "/login");
  const handleMemberAccess = () => {
    const isConnected = Boolean(idUser);
    const target = "/dashboard1/profile";

    if (isConnected) {
      router.push(target);
    } else {
      router.push(`/login?redirect=${encodeURIComponent(target)}`);
    }
  };


  return (
    <div className="fixed top-0 left-0 w-full z-999">
      <div className="container mx-auto px-3 max-w-[1500px]">
        <MTNavbar
          blurred
          color="white"
          className={`relative z-50 border-0 py-3 px-6 transition-all duration-300 ${scrolled
              ? "bg-white/90 backdrop-blur-xs backdrop-saturate-200 shadow-md"
              : "bg-white/90"
            }`}
        >
          <div className="flex items-center justify-between">
            <Link href="/">
              <Image
                src="/logo.png" // Updated to the new logo file
                alt="ELACO digitech Logo"
                width={180}      // Adjusted size for better visibility
                height={40}
                className="cursor-pointer"
              />
            </Link>

            <ul className="ml-10 hidden items-center gap-8 lg:flex">
              {NAV_MENU.map(({ name, icon: Icon, href }) => {
                if (name === "Services") {
                  return (
                    <li key={name} className="relative group">
                      <div className="flex items-center gap-2 font-medium text-gray-900 cursor-pointer">
                        <Icon className="h-5 w-5" />
                        {name}
                      </div>
                      <ul className="absolute top-full left-0 mt-2 w-56 rounded-xl bg-white shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-200 invisible group-hover:visible z-50">
                        {[
                          { label: "Private Zone", route: "/PrivateZone" },
                          { label: "Meeting Zone", route: "/MeetingZone" },
                          { label: "Domiciliation", route: "/Domiciliation" },
                          { label: "working zone", route: "/WorkZone" }
                        ].map((item) => (
                          <li key={item.label}>
                            <a
                              href={item.route}
                              className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition"
                            >
                              {item.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                }

                return (
                  <NavItem key={name} href={href}>
                    <Icon className="h-5 w-5" />
                    {name}
                  </NavItem>
                );
              })}
            </ul>

            <div className="hidden items-center gap-4 lg:flex">
              {idUser ? (
                <>
                  <Button color="gray" onClick={() => router.push('/dashboard1/profile')}>
                    Dashboard
                  </Button>
                  <Button color="red" onClick={async () => {
                    await logout();
                    router.push('/');
                  }}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <a href="/login">
                    <Button variant="text">Log in</Button>
                  </a>
                  <Button color="gray" onClick={handleMemberAccess}>
                    espace membre
                  </Button>
                </>
              )}
            </div>

            <IconButton
              variant="text"
              color="gray"
              onClick={handleOpen}
              className="ml-auto inline-block lg:hidden"
            >
              {open ? (
                <XMarkIcon strokeWidth={2} className="h-6 w-6" />
              ) : (
                <Bars3Icon strokeWidth={2} className="h-6 w-6" />
              )}
            </IconButton>
          </div>

          <Collapse open={open}>
            <div className="mt-3 border-t border-gray-200 px-2 pt-4">
              <ul className="flex flex-col gap-4">
                {NAV_MENU.map(({ name, icon: Icon, href }) => (
                  <NavItem key={name} href={href}>
                    <Icon className="h-5 w-5" />
                    {name}
                  </NavItem>
                ))}
              </ul>
              <div className="mt-6 mb-4 flex items-center gap-4">
                {idUser ? (
                  <>
                    <Button color="gray" onClick={() => router.push('/dashboard1/profile')}>
                      Dashboard
                    </Button>
                    <Button color="red" onClick={async () => {
                      await logout();
                      router.push('/');
                    }}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <a href="/login">
                      <Button variant="text">Log in</Button>
                    </a>
                    <Button color="gray" onClick={handleMemberAccess}>
                      espace membre
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Collapse>
        </MTNavbar>
      </div>
    </div>
  );
}

export default Navbar;
