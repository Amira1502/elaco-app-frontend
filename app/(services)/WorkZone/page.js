"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Head from 'next/head';
import Benefits from '@/app/components/benefits';
import { useState, useEffect } from 'react';
import { Wifi, Coffee, DoorOpen, Utensils } from 'lucide-react';
import { Pacifico } from "next/font/google";
import { useRouter } from 'next/navigation';
import { useUser } from "@/app/context/UserContext"     // Adjust path based on your structure

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
});

const services = [
  { img: '/openspace.jpg', name: 'Open Space Coworking' },
  { img: '/zone.jpg', name: 'Modern Shared Workspace' }
];


export default function ServicesPage() {
  const [fetchedData, setFetchedData] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const { idUser, loading: userLoading } = useUser();



  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentService = services[currentIndex];

  useEffect(() => {
       async function fetchingSubscriptions() {
           try {
         const response = await fetch(`http://localhost:8000/ELACO/subcription/gg/openspace`);
            if (!response.ok) {
               throw new Error("Error in fetching subscriptions");
              }
             const data = await response.json();
             console.log(data?.subscriptions?.table_id?.descriptpion)
             
             setDescriptions(
             [
                 "7/7 Access",
                  "Wi-Fi",
                    "Kitchen Access",
                "Coffee (extra)"
                 ]
                )
     
        setFetchedData(data.subscriptions);
          } catch (err) {
          console.error(err);
           }
          }
         fetchingSubscriptions();
      }, []);
  const Feature = ({ icon, label }) => (
    <div className="flex flex-col items-center gap-1">
      {icon}
      <span className="text-sm font-medium text-white">{label}</span>
    </div>
  );
  const handleMemberAccessopenspace = () => {
    const isConnected = Boolean(idUser);
    const target = "/dashboard1/reserveOpenSpace";
  
    if (isConnected) {
      router.push(target);
    } else {
      router.push(`/login?redirect=${encodeURIComponent(target)}`);
    }
  };
  return (
    <div className="bg-white text-gray-800">
      <Head>
        <title>Coworking Space | Services</title>
        <meta name="description" content="Explore our coworking plans including private offices, hot desks, and conference rooms. Book your workspace today." />
      </Head>

      

      {/* Hero Section */}
<section className="relative h-[70vh]">
  {/* Background Image + Overlay */}
  <div className="absolute inset-0 z-0">
    <Image src="/open.jpg" alt="Meeting Room Hero" layout="fill" objectFit="cover" priority />
    <div className="absolute inset-0 bg-black/60" />
  </div>

  {/* Overlayed Text - Positioned Left */}
  <div className="absolute z-10 top-1/2 left-10 transform -translate-y-1/2">
    <h1 className="text-white text-5xl md:text-6xl font-extrabold mb-2">  Work Zone</h1>
    <p className="uppercase text-sm tracking-wider text-[#07ebbd]">
      Home / <span className="text-white">Work Zone</span>
    </p>
  </div>
</section>

      {/* Benefits from API */}
      <section>
        <Benefits subs={fetchedData} descriptions={descriptions} />
      </section>

      {/* What We Offer */}
      <section className="bg-white relative">
        {/* <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">What We Offer</h2> */}

        <div className="relative  h-[75vh] overflow-hidden shadow-2xl">
          <Image
            src={currentService.img}
            alt={currentService.name}
            layout="fill"
            objectFit="cover"
            className="transition-opacity duration-1000 "
          />

          <div className="absolute inset-0 bg-black/60 flex flex-col justify-between px-6 py-10 md:py-20">
            <div className="text-center">
              
              <h3
                className={`${pacifico.className} text-4xl md:text-5xl font-bold text-white bg-clip-text text-transparent mb-8`}
              >
                Open Space <span className="text-lime-400 text-7xl font-black opacity-20 block mb-2">
                {currentService.tag || ""}
              </span>
              </h3>
              <p className="text-lime-400 text-xl font-semibold mt-2 mb-4">
                {/* {currentService.price || "Starting from 10"} */}
                {/* <span className="text-white text-lg font-normal">{currentService.unit || " TND/h"}</span> */}
              </p>
              <Button className="bg-black hover:bg-lime-400 transition-colors duration-200 text-white px-8 py-3 rounded-xl shadow-lg"  type="button" onClick={handleMemberAccessopenspace}>
                Reserve Now
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 text-center text-white">
              <Feature icon={<DoorOpen className="text-lime-400 w-8 h-8" />} label="7/7 Access" />
              <Feature icon={<Wifi className="text-lime-400 w-8 h-8" />} label="Wi-Fi" />
              <Feature icon={<Utensils className="text-lime-400 w-8 h-8" />} label="Kitchen" />
              <Feature icon={<Coffee className="text-lime-400 w-8 h-8" />} label="Coffee" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-4">Need a Custom Plan?</h2>
        <p className="mb-6 text-gray-600">We can tailor a coworking solution just for you. Get in touch and let’s talk.</p>
        <Button className="bg-black text-white hover:bg-gray-800" onClick={() => router.push('/contact') } >Contact Us</Button>
      </section>
    </div>
  );
}
