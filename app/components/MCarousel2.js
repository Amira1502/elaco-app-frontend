
"use client";
import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";



export function MyCarousel2({images}) {
  return (
    <Carousel opts={{ align: "start", loop: true }} className="w-full">
      <CarouselContent className="flex">
        {images?.map((src, index) => (
          <CarouselItem key={index} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/3 xl:basis-1/3">
            <div className="w-full h-full">
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-[300px] object-cover rounded-md"
            />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="text-red-500" />
      <CarouselNext className="text-red-500" />
    </Carousel>
  );
}