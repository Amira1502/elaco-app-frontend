"use client";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import SubscriptionCard from "./SubscriptionCard";

export function MyCarrousel({subs , descriptions}) {

  return (
    <Carousel opts={{ align: "start" }} className="w-full overflow-visible">
    
      <CarouselContent className="flex px-4">
        {subs?.map((sub, index) => (
          <CarouselItem
            key={index}
            className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
          >
            <SubscriptionCard sub={sub} descriptions={descriptions}/>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}