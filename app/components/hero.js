
"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useUser } from "@/app/context/UserContext"     // Adjust path based on your structure
import { useRouter } from "next/navigation";

import Image from "next/image";
import { Button, Typography } from "@material-tailwind/react";
import {
  BriefcaseIcon,
  UsersIcon,
  LockClosedIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";

export default function Hero() {
  const { idUser, loading: userLoading } = useUser();
    const router = useRouter();
  
  const handleMemberAccess = () => {
    const isConnected = Boolean(idUser);
    const target = "/dashboard1/reserveMeetingroom";
  
    if (isConnected) {
      router.push(target);
    } else {
      router.push(`/login?redirect=${encodeURIComponent(target)}`);
    }
  };
  return (
    <section className="relative w-full bg-white">
      {/* Hero Image and Overlay */}
      <div className="relative h-[80vh] flex items-center overflow-hidden">
        <Image
          src="/coo.jpg"
          alt="Coworking background"
          width={1600}
          height={900}
          className="absolute inset-0 w-full h-full object-cover object-center rounded-bl-[80px]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent z-10" />
        <div className="container relative z-20 px-4 md:px-8 mx-auto mb-20">
          <div className="max-w-2xl">
            <Typography
              variant="h1"
              className="text-5xl lg:text-6xl font-bold text-blue-gray-900 mb-6 leading-tight"
            >
              Your Perfect Workspace Awaits <span className="text-[#07ebbd]">.</span>
            </Typography>
            <Typography className="text-lg text-blue-gray-700 mb-8">
              Premium coworking environments crafted for professionals, entrepreneurs, and teams. Adapt your workspace to fit your needs  <span className="text-[#07ebbd]">.</span>
            </Typography>
            <div className="flex gap-4 flex-wrap">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          size="lg"
          className="bg-gray-900 text-white px-6 py-3 shadow-md rounded-xl hover:shadow-lg transition" 
        onClick={handleMemberAccess}

        >

          Book Now
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >

      </motion.div>
    </div>
          </div>
        </div>
      </div>

      {/* Services Cards */}
      <div className="relative z-30 -mt-20">
        <div className="container mx-auto px-4 md:px-8">
          {/* <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-center">
            {[
              { title: "Coworking Zone", icon: <BriefcaseIcon className="h-10 w-10 mx-auto text-gray-700" /> },
              { title: "Meetings Zone", icon: <UsersIcon className="h-10 w-10 mx-auto text-gray-700" /> },
              { title: "Private Offices", icon: <LockClosedIcon className="h-10 w-10 mx-auto text-gray-700" /> },
              { title: "Domiciliation", icon: <HomeIcon className="h-10 w-10 mx-auto text-gray-700" /> },
            ].map(({ title, icon }) => (
              <div
                key={title}
                className="bg-gray-50 rounded-2xl shadow-md p-6 hover:-translate-y-1 transition-transform"
              >
                {icon}
                <h5 className="mt-4 text-lg font-semibold text-gray-800">{title}</h5>
              </div>
            ))}
          </div> */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-center">
  {[
    { title: "Coworking Zone", icon: <BriefcaseIcon className="h-10 w-10 mx-auto text-gray-700" />, href: "/Openspace" },
    { title: "Meetings Zone", icon: <UsersIcon className="h-10 w-10 mx-auto text-gray-700" />, href: "/meetingroom" },
    { title: "Private Offices", icon: <LockClosedIcon className="h-10 w-10 mx-auto text-gray-700" />, href: "/officeroom" },
    { title: "Domiciliation", icon: <HomeIcon className="h-10 w-10 mx-auto text-gray-700" />, href: "/domiciliation" },
  ].map(({ title, icon, href }) => (
    <Link href={href} key={title} className="block">
      <div className="bg-gray-50 rounded-2xl shadow-md p-6 hover:-translate-y-1 transition-transform cursor-pointer">
        {icon}
        <h5 className=" text-lg font-semibold text-gray-800">{title}</h5>
      </div>
    </Link>
  ))}
</div>

          {/* Scroll Indicator */}
          
        </div>
      </div>
    </section>
  );
}
