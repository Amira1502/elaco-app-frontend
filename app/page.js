"use client";

import { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Subscriptions from "./components/benefits";
// import Services from "../components/services";
import Footer from "./components/footer";
import Courses from "./components/courses-categories";
import Options from "./components/options"
import Amenities from"./components/amenities"

export default function Home() {
  const [fetchedData, setFetchedData] = useState(null);
  const [descriptions, setDescriptions] = useState([]);


  useEffect(() => {
    const handleScroll = () => {
      // setShowScrollTop(window.scrollY > 300); // This line is removed
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  useEffect(() => {
    async function fetchingSubscriptions() {
      try {
        const response = await fetch("http://localhost:8000/ELACO/subcription/gg/openspace");
        if (!response.ok) throw new Error("Error in fetching subscriptions");

        const data = await response.json();
        console.log(data?.subscriptions?.table_id?.descriptpion);

        setDescriptions(["7/7 Access", "Wi-Fi", "Kitchen Access", "Coffee (extra)"]);
        setFetchedData(data.subscriptions);
      } catch (err) {
        console.error(err);
      }
    }

    fetchingSubscriptions();
  }, []);

  return (
    <>
      <div className="bg-white">
        <Navbar />
        <Hero />
        <Subscriptions subs={fetchedData} descriptions={descriptions} />
        <Options />
        <Courses />
        <Amenities/>
        <Footer/>
      </div>
    </>
  );
}
