"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import Benefits from "@/app/components/benefits";

import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";

const Rooms = [
  {
    title: "Meeting Room 1",
    description:
      "A cozy and professional meeting space ideal for small team discussions...",
    image: "/meetingRoom1.jpg",
  },
  {
    title: "Meeting Room 2",
    description:
      "A spacious training room designed for workshops, seminars...",
    image: "/meetingRoom2.jpg",
  },
];

export default function MeetingRoomPage() {
  const [subs, setSubs] = useState([]);
  const { idUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    const fetchSubs = async () => {
      try {
        const res = await fetch(
          "http://localhost:8000/ELACO/subcription/gg/meeting room",
          { cache: "no-store" }
        );
        const data = await res.json();
        setSubs(data.subscriptions || []);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchSubs();
  }, []);

  const handleMemberAccessMeetingroom = () => {
    const isConnected = Boolean(idUser);
    const target = "/dashboard1/reserveMeetingroom";

    if (isConnected) {
      router.push(target);
    } else {
      router.push(`/login?redirect=${encodeURIComponent(target)}`);
    }
  };

  return (
    <div className="bg-white text-gray-800">
      <Head>
        <title>Meeting Rooms | Coworking Space</title>
        <meta
          name="description"
          content="Choose from a variety of private office meeting rooms..."
        />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[70vh]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/mee.jpg"
            alt="Meeting Room Hero"
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="absolute z-10 top-1/2 left-10 transform -translate-y-1/2">
          <h1 className="text-white text-5xl md:text-6xl font-extrabold mb-2">Meeting Rooms</h1>
          <p className="uppercase text-sm tracking-wider text-[#07ebbd]">
            Home / <span className="text-white">Meeting Rooms</span>
          </p>
        </div>
      </section>

      <section>
        <Benefits subs={subs} />
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {Rooms.map((room, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transition hover:shadow-2xl"
              >
                <div className="h-64 w-full relative">
                  <Image
                    src={room.image}
                    alt={room.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-semibold text-gray-800">{room.title}</h3>
                  <p className="text-gray-600 text-base">{room.description}</p>
                  <button
                    className="bg-[#07ebbd] hover:bg-black text-white font-semibold py-2 px-4 rounded-xl w-fit"
                    onClick={handleMemberAccessMeetingroom}
                  >
                    Reserve Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
