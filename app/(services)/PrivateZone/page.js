
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Pacifico } from 'next/font/google';
import Benefits from '@/app/components/benefits';
import { useUser } from "@/app/context/UserContext"     

const pacifico = Pacifico({ subsets: ['latin'], weight: '400' });
const services = [
  { img: '/officeroom1.jpg', name: 'Open Space Coworking' },
  { img: '/officeroom2.jpg', name: 'Modern Shared Workspace' }
];
const Rooms = [
  {
    title: "Private Office Premium +",
    description: "A cozy and professional meeting space, ideal for small team discussions, client meetings, and brainstorming sessions. Perfect for groups of 4 to 6 people looking for a quiet and well-equipped environment.",
    image: "/officeroom1.jpg"
  },
  {
    title: "Private Office",
    description: "A spacious training room designed for workshops, seminars, and group learning sessions. It’s the ideal setting for hosting formations, with enough room to accommodate up to 16 participants comfortably.",
    image: "/officeroom2.jpg"
  }
];

export default function MeetingRoom() {
  const [fetchedData, setFetchedData] = useState([]);
  const router = useRouter();
  const [descriptions, setDescriptions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
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
        const response = await fetch("http://localhost:8000/ELACO/subcription/gg/office");
        if (!response.ok) throw new Error("Error in fetching subscriptions");
        const data = await response.json();
        setFetchedData(data.subscriptions);
      } catch (err) {
        console.error(err);
      }
    }
    fetchingSubscriptions();
  }, []);
  const handleMemberAccessofficeroom = () => {
    const isConnected = Boolean(idUser);
    const target = "/dashboard1/reservePrivatedesk";
  
    if (isConnected) {
      router.push(target);
    } else {
      router.push(`/login?redirect=${encodeURIComponent(target)}`);
    }
  };

  const Feature = ({ icon, label }) => (
    <div className="flex flex-col items-center gap-1">
      {icon}
      <span className="text-sm font-medium text-white">{label}</span>
    </div>
  );

  return (
    <div className="bg-white text-gray-800">
      <Head>
        <title>Meeting Rooms | Coworking Space</title>
        <meta name="description" content="Choose from a variety of private office meeting rooms for teams and professionals. Reserve your spot today!" />
      </Head>

   
      <section className="relative h-[70vh]">
  {/* Background Image + Overlay */}
  <div className="absolute inset-0 z-0">
    <Image src="/off.jpg" alt="Meeting Room Hero" layout="fill" objectFit="cover" priority />
    <div className="absolute inset-0 bg-black/60" />
  </div>

  {/* Overlayed Text - Positioned Left */}
  <div className="absolute z-10 top-1/2 left-10 transform -translate-y-1/2">
    <h1 className="text-white text-5xl md:text-6xl font-extrabold mb-2">Office Zone</h1>
    <p className="uppercase text-sm tracking-wider text-[#07ebbd]">
      Home / <span className="text-white">Office Zone</span>
    </p>
  </div>
</section>


      {/* Benefits */}
      <section>
        <Benefits subs={fetchedData} />
      </section>

      {/* Room Types Carousel */}
      <section className="py-12 bg-white">
  <div className="container mx-auto px-4">
    <div className="grid md:grid-cols-2 gap-8">
      {/* Card 1 */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition hover:shadow-2xl">
        <div className="h-64 w-full relative">
          <Image src="/officeroom1.jpg" alt="Private Office Premium" layout="fill" objectFit="cover" />
        </div>
        <div className="p-6 space-y-4">
          <h3 className="text-2xl font-semibold text-gray-800">Private Office Premium +</h3>
          <p className="text-gray-600 text-base">
            A cozy and professional meeting space, ideal for small team discussions, client meetings, and brainstorming sessions. Perfect for groups of 4 to 6 people looking for a quiet and well-equipped environment.
          </p>
          <button className="bg-[#07ebbd] hover:bg-black text-white font-semibold py-2 px-4 rounded-xl w-fit" onClick={handleMemberAccessofficeroom}>
            Reserve Now
          </button>
        </div>
      </div>

      {/* Card 2 */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition hover:shadow-2xl">
        <div className="h-64 w-full relative">
          <Image src="/officeroom2.jpg" alt="Private Office" layout="fill" objectFit="cover" />
        </div>
        <div className="p-6 space-y-4">
          <h3 className="text-2xl font-semibold text-gray-800">Private Office</h3>
          <p className="text-gray-600 text-base">
            A spacious training room designed for workshops, seminars, and group learning sessions. It’s the ideal setting for hosting formations, with enough room to accommodate up to 16 participants comfortably.
          </p>
          <button className="bg-[#07ebbd] hover:bg-black text-white font-semibold py-2 px-4 rounded-xl w-fit" onClick={handleMemberAccessofficeroom}>
            Reserve Now
          </button>
        </div>
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



      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
}
