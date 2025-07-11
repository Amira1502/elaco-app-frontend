
"use client"
import React from "react";
import Container from "./Container";
import { MyCarrousel } from "./MyCarausel";

export default function Benefits({subs , descriptions}) {

  console.log(descriptions)
  return (
    <Container className="mb-10 mt-10 w-10/12">
      <div className="w-full flex flex-col items-center text-center space-y-6">
        <p className="text-sm text-black font-semibold uppercase ">
          Explore our subscriptions
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#07ebbd]">
          Discover our exclusive offers
        </h2>
        <p className="max-w-3xl text-gray-500 text-base sm:text-lg">
          Choose the plan that fits your needs and unlock premium benefits.
          Enjoy a seamless experience with flexible subscriptions tailored just for you.
        </p>
      </div>

      <div className="flex justify-center w-full mt-12">
        <MyCarrousel subs={subs} descriptions={descriptions}/>
      </div>
    </Container>
  );
}
