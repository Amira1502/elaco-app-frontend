"use client";

import React from "react";
import { Pacifico } from "next/font/google";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
});
import {
  Button,
  Typography,
  Card,
  CardBody,
} from "@material-tailwind/react";

import {
  GlobeEuropeAfricaIcon,
  MicrophoneIcon,
  PuzzlePieceIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";

import CategoryCard from "./category-card";

const CATEGORIES = [
  {
    img: "/blogs/front.jpg",
    icon: HeartIcon,
    title: "Frontend Web Development",
    desc: "",
  },
  {
    img: "/blogs/back.jpg",
    icon: PuzzlePieceIcon,
    title: "Backend Web Development",
    desc: "",
  },
  {
    img: "/blogs/securite.jpg",
    icon: GlobeEuropeAfricaIcon,
    title: "Web Security & Performance",
    desc: "",
  },
  {
    img: "/blogs/full.jpg",
    icon: MicrophoneIcon,
    title: "Full-Stack Web Development",
    desc: "",
  },
];

function CoursesCategories() {
  return (
    <section className="container mx-auto px-8 py-10 bg-white">
      <div className="mb-10 grid place-items-center text-center">
        <Typography variant="h2" className="my-3 text-[#07ebbd]">
<div  className={`${pacifico.className} text-4xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-teal-400 to-lime-400 bg-clip-text text-transparent`}>        What We Do at Elaco
</div>       </Typography>
        <Typography variant="lead" className="max-w-3xl text-gray-500 text-base sm:text-lg">
        At Elaco Coworking Space, we specialize in professional web development services from frontend and backend to full-stack solutions and web security. We help businesses and entrepreneurs build and scale their digital presence, all within a collaborative coworking environment.
        </Typography>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card
          color="gray"
          className="relative grid h-full w-full place-items-center overflow-hidden text-center"
        >
          <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
          <CardBody className="relative w-full">
            {/* <Typography color="white" className="text-xs font-bold opacity-50">
              HTML, CSS & Javascript
            </Typography> */}
            <Typography variant="h4" className="mt-9" color="white">
              Web Development 
            </Typography>
            <Typography
              color="white"
              className="mt-4 mb-14 font-normal opacity-50"
            >
              Ready to start your web development journey?
            </Typography>
            {/* <Button size="sm" color="white">
              Enroll Now
            </Button> */}
          </CardBody>
        </Card>
        <div className="col-span-1 flex flex-col gap-6">
          {CATEGORIES.slice(0, 2).map((props, key) => (
            <CategoryCard key={key} {...props} />
          ))}
        </div>
        <div className="col-span-1 flex flex-col gap-6">
          {CATEGORIES.slice(2, 4).map((props, key) => (
            <CategoryCard key={key} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CoursesCategories;
