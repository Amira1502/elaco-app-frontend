"use client";
import { useSearchParams } from "next/navigation";
import React, { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, ImageOff } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { useUser } from "@/app/context/UserContext"     
import { motion } from "framer-motion";
import { X, Clock, ChevronDown } from 'lucide-react';
import {   CreditCard, DollarSign, Sparkles } from "lucide-react";

export default function ReserveRoom({

  isOpen1,
  onClose,
  room,
  initialTimeRange,
  reservation1,
  Datecalender,
}) {
  

  console.log('res')
  console.log(reservation1)
  console.log(room)
  console.log("hhh")
  console.log(initialTimeRange)

  const des = [
    "7/7 Access",
    "Wi-Fi",
    "Coffee (extra)",
    "printer"
  ]

  const [selectedDate, setSelectedDate] = useState(
    Datecalender ? new Date(Datecalender) : null
  );
  const { idUser, loading: userLoading } = useUser();

  const [price, setPrice] = useState(0);
  const [points, setPoints] = useState(0);
  const [checkInTime, setCheckInTime] = useState(initialTimeRange.startTime);
  const [checkOutTime, setCheckOutTime] = useState(initialTimeRange.endTime);
  const [departureTimes, setDepartureTimes] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [showSubmit, setShowSubmit] = useState(false);
  const [responseStatus, setResponseStatus] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [imageError, setImageError] = useState(false);

  const searchParams = useSearchParams();


  useEffect(() => {
    if (Datecalender) {
      setSelectedDate(new Date(Datecalender));
    }
  }, [Datecalender]);
  useEffect(() => {
    if (initialTimeRange) {
      if (initialTimeRange.date) {
        setSelectedDate(new Date(initialTimeRange.date));
      }
      if (initialTimeRange.startTime) {
        setCheckInTime(initialTimeRange.startTime);
      }
      if (initialTimeRange.endTime) {
        setCheckOutTime(initialTimeRange.endTime);
      }
    }
  }, [initialTimeRange]);
  const toMinutes = (timeStr) => {
    const [h, m] = timeStr.split(":").map(Number);
    return h * 60 + m;
  };


  const isSameUtcDate = (d1, d2) => {
    return (
      d1.getUTCFullYear() === d2.getUTCFullYear() &&
      d1.getUTCMonth() === d2.getUTCMonth() &&
      d1.getUTCDate() === d2.getUTCDate()
    );
  };
  
  const getReservationsForSelectedDate = () => {
    if (!selectedDate || !reservation1) return [];
    return reservation1.filter((res) => {
      const resDate = new Date(res.date);
      return isSameUtcDate(resDate, selectedDate);
    });
  };
  
  const isTimeSlotReserved = (timeStr, reservationsForDay) => {
    const timeMin = toMinutes(timeStr);
    return reservationsForDay.some(({ check_in, check_out }) => {
      const start = toMinutes(check_in);
      const end = toMinutes(check_out);
      return timeMin >= start && timeMin < end;
    });
  };

  const generateTimeSlots = () => {
    const slots = [];
    const startHour = 8;
    const endHour = 24; 
    for (let hour = startHour; hour < endHour; hour++) {
      for (const min of [0, 30]) {
        if (hour === 24) break;
        const hourStr = hour < 10 ? `0${hour}` : `${hour}`;
        const minStr = min === 0 ? "00" : "30";
        slots.push(`${hourStr}:${minStr}`);
      }
    }
    return slots;
  };

const getAvailableTimeSlots = () => {
    const allSlots = generateTimeSlots();
    const reservationsForDay = getReservationsForSelectedDate();
    
    const now = new Date();
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
  
    return allSlots.filter((slot) => {
      const [h, m] = slot.split(":").map(Number);
      const slotMinutes = h * 60 + m;
      return slotMinutes >= nowMinutes && !isTimeSlotReserved(slot, reservationsForDay);
    });
  };

 
const getValidDepartureTimes = (checkInStr) => {
    if (!checkInStr) return [];
    
    const checkInMin = toMinutes(checkInStr);
    const allSlots = generateTimeSlots();
    const reservationsForDay = getReservationsForSelectedDate();
  
    const nextReservationMin = reservationsForDay
      .map((res) => toMinutes(res.check_in))
      .filter((startMin) => startMin > checkInMin)
      .sort((a, b) => a - b)[0]; 
    
    let validSlots = allSlots.filter((slot) => {
      const slotMin = toMinutes(slot);
      if (slotMin <= checkInMin) return false; 
      if (nextReservationMin !== undefined && slotMin >= nextReservationMin) return false; 
      return true;
    });
  
  
    if (!nextReservationMin && 1440 - checkInMin >= 60) {
      if (!validSlots.includes("24:00")) {
        validSlots.push("24:00");
      }
    }
  
    validSlots.sort((a, b) => {
      const aMin = a === "24:00" ? 1440 : toMinutes(a);
      const bMin = b === "24:00" ? 1440 : toMinutes(b);
      return aMin - bMin;
    });
  
    return validSlots;
  };
  useEffect(() => {
    if (selectedDate && !checkInTime) {
      const available = getAvailableTimeSlots();
      if (available.length > 0) {
        setCheckInTime(available[0]);
      }
    }
  }, [selectedDate]);

  
  useEffect(() => {
    if (checkInTime && !checkOutTime) {
      const validDeps = getValidDepartureTimes(checkInTime);
      if (validDeps.length > 0) {
        setCheckOutTime(validDeps[0]);
      }
    }
  }, [checkInTime]);

 
  useEffect(() => {
    if (selectedDate && checkInTime) {
      const validTimes = getValidDepartureTimes(checkInTime);
      setDepartureTimes(validTimes);
    } else {
      setDepartureTimes([]);
    }
  }, [checkInTime, selectedDate]);

  
  let currentBarIndex = 0;
  const todayDate = new Date();
  if (selectedDate && selectedDate.toDateString() === todayDate.toDateString()) {

    if (todayDate.getHours() < 8) {
      currentBarIndex = 0;
    } else {
      currentBarIndex =
        (todayDate.getHours() - 8) * 2 + (todayDate.getMinutes() >= 30 ? 1 : 0);
    }
  }
  const isReservedBarIndex = (barIndex) =>
    useMemo(
      () =>
        getReservationsForSelectedDate().some(([rStart, rEnd]) => {
          return false;
        }),
      [reservation1, selectedDate]
    ); 
  const slotToBarIndex = (timeStr) => {
    const [h, m] = timeStr.split(":").map(Number);
    return (h - 8) * 2 + (m >= 30 ? 1 : 0);
  };
  const calculatePrice = (startStr, endStr) => {
    if (!startStr || !endStr) return 0;
    const start = new Date(`1970-01-01T${startStr}:00`);
    const end =
      endStr === "24:00"
        ? new Date("1970-01-02T00:00:00")
        : new Date(`1970-01-01T${endStr}:00`);
    const diffInHours = (end - start) / 1000 / 60 / 60;
    if(room.numTable === 34 || room.numTable === 33){
        if (diffInHours === 2) {
            return room.prices.find((p) => p.duration === "2h")?.price;
          } else if (diffInHours === 5) {
            return room.prices.find((p) => p.duration === "1/2 Day (5h)")?.price ;
          } else {
            const hourlyPrice = room.prices.find((p) => p.duration === "1h")?.price;
            return diffInHours * hourlyPrice;
          }
    }if(room.numTable === 31 || room.numTable === 32){
        return diffInHours * 5
    }else{
        return diffInHours * 1.5
    }
   
  };

  useEffect(() => {
    if (selectedDate && checkInTime && checkOutTime) {
      setPrice(calculatePrice(checkInTime, checkOutTime));
    } else {
      setPrice(0);
    }
  }, [checkInTime, checkOutTime, selectedDate]);


  useEffect(() => {
    if (!idUser) return;
    async function fetchStatus() {
      try {
        const response = await fetch(`http://localhost:8000/ELACO/Points/${idUser}`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch user subscription status: ${response.statusText}`);
        }
        const data = await response.json();
        setPoints(data.points);
      } catch (err) {
        console.error("Error fetching points:", err);
        setError(err.message);
      }
    }
    fetchStatus();
  }, [idUser]);

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
    setPaymentError("");
    setShowSubmit(false);
    if (method === "points" && points*1.5 < price) {
      setPaymentError("Vous n'avez pas assez de points.");
      return;
    }
    setShowSubmit(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!idUser) {
      setError("User not logged in.");
      return;
    }
    if (!selectedDate || !checkInTime || !checkOutTime) {
      setError("Veuillez sélectionner une date ainsi qu'une heure de Check-in et Check-out.");
      return;
    }
    if (selectedPaymentMethod === "points" && points * 1.5 < price) {
      setPaymentError("Vous n'avez pas assez de points.");
      return;
    }
    if (selectedPaymentMethod === "online") {
      handleOnlinePayment();
      return;
    }

    try {
      const result = await addBooking();
      setResponseStatus(result.status);
      if (result.status === 201) {
        setSuccessMessage("Réservation réussie !");
      }
    } catch (err) {
      console.error(err);
      setError("La réservation a échoué. Veuillez réessayer.");
    }
  };
  const addBooking = async () => {
    const obj = {
      check_in: checkInTime,
      check_out: checkOutTime,
      id_user: idUser,
      date: format(selectedDate, "yyyy-MM-dd"),
      numTable: room.numTable,
      price: selectedPaymentMethod === "points" ? 0 : price,
      paymentMethod: selectedPaymentMethod,
      points: selectedPaymentMethod === "points" ? points-(price/1.5) : points,
    };
    
    try {
      const response = await fetch("http://localhost:8000/ELACO/booking/", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
        toast.error('Booking failed. Please try again.');
      }
      const data = await response.json();
      toast.success('Réservation effectuée avec succès!');

      return { status: response.status, data };
    } catch (error) {
      console.error(error);
      toast.error('Booking failed. Please try again.');
      throw new Error("Booking failed. Please try again.");
    }
  };

  const handleOnlinePayment = async () => {
    const obj = { amount: price*1000 };
    const formattedDate = selectedDate.toISOString().split("T")[0];

    try {
      const response = await fetch(
        `http://localhost:8000/ELACO/booking/payment?start_time=${checkInTime}&end_time=${checkOutTime}&numTable=${room.numTable}&date=${formattedDate}`,
        {
          method: "POST",
          body: JSON.stringify(obj),
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("Error in processing payment");
      }

      const resData = await response.json();
      window.location.href = resData.result.payUrl;
    } catch (error) {
      console.error(error);
      setError("Payment processing failed. Please try again.");
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  if (!isOpen1) return null;
return createPortal(
    <div className="fixed inset-0 bg-black/60 z-[9999] flex justify-center items-center px-4 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="bg-white text-gray-900 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden relative"
      >
        <Toaster position="top-right" />
        
        <div className="h-3 bg-gradient-to-r from-[#07ebbd] to-[#067a63]"></div>
        
        <div className="p-8">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 bg-gray-100 hover:bg-gray-200 p-2 rounded-full text-gray-600 hover:text-gray-900 transition duration-300"
          >
            <X size={20} />
          </button>
          
          <h2 className="text-2xl font-bold mb-6 text-[#07ebbd]">Reservation</h2>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Room Details */}
            <div className="flex flex-col">
              <div className="relative rounded-xl overflow-hidden group">
                  <>
                    <img
                      src={room.imageUrl || "/openspace1.jpg"}
                      alt={`${room.Name} Image`}
                      className="w-full h-64 object-cover rounded-xl transition duration-500 transform group-hover:scale-105"
                      onError={handleImageError}
                      style={{ display: imageError ? "none" : "block" }}
                    />
                    {imageError && (
                      <div className="w-full h-64 bg-gray-200 rounded-xl flex flex-col items-center justify-center">
                        <ImageOff size={48} className="text-gray-400 mb-2" />
                        <p className="text-gray-500 text-sm">Image unavailable</p>
                      </div>
                    )}
                  </>
              
                
                {!imageError && room.imageUrl && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h2 className="text-xl font-semibold text-white mb-1">
                        {room.roomType} {room.roomscriptionType}
                      </h2>
                      <p className="text-[#07ebbd] text-sm">{room.Name}</p>
                    </div>
                  </>
                )}
              </div>
              
              {/* Room info outside image when no image or image error */}
              {(imageError || !room.imageUrl) && (
                <div className="mt-4 text-center">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {room.roomType} {room.roomscriptionType}
                  </h2>
                  <p className="text-[#07ebbd] text-md mt-1">{room.Name}</p>
                </div>
              )}
              
              <div className="mt-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
                <h3 className="text-md font-medium mb-2 text-gray-700">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {room?.description && room?.description.length != 0 
                    ? room.description.map((feature, idx) => (
                        <span 
                          key={idx} 
                          className="bg-white border border-[#07ebbd]/30 text-xs px-3 py-1 rounded-full text-gray-700 shadow-sm"
                        >
                          {feature}
                        </span>
                      ))
                    : des.map((feature, idx) => (
                        <span 
                          key={idx} 
                          className="bg-white border border-[#07ebbd]/30 text-xs px-3 py-1 rounded-full text-gray-700 shadow-sm"
                        >
                          {feature}
                        </span>
                      ))
                  }
                </div>
              </div>
            </div>

            {/* Reservation Form */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Book {room.Name}</h3>

              {/* Booking Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Booking Date
                </label>
                <Popover modal={false}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left bg-white border-gray-300 hover:bg-gray-50 transition duration-300",
                        !selectedDate && "text-gray-500"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-[#07ebbd]" />
                      {selectedDate ? format(selectedDate, "PPP") : <span>Select a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 z-[9999] bg-white border-gray-200" align="start">
                    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-md">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                        classNames={{
                          day_selected: "bg-[#07ebbd] text-white hover:bg-[#07ebbd]/80",
                          day_today: "border border-[#07ebbd] text-[#07ebbd]",
                          head_cell: "text-gray-600 hidden",
                          head_row: "hidden",
                          cell: "text-gray-700",
                          nav_button: "hover:bg-gray-100",
                          nav_button_previous: "text-gray-600",
                          nav_button_next: "text-gray-600",
                        }}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Clock size={16} className="mr-2 text-[#07ebbd]" />
                    Check in
                  </label>
                  <div className="relative">
                    <select
                      className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:border-[#07ebbd] focus:ring-1 focus:ring-[#07ebbd] focus:outline-none transition duration-300 appearance-none pr-10"
                      value={checkInTime}
                      onChange={(e) => {
                        setCheckInTime(e.target.value);
                        setCheckOutTime("");
                      }}
                    >
                      <option value="">-- Choisir --</option>
                      {getAvailableTimeSlots().map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Clock size={16} className="mr-2 text-[#07ebbd]" />
                    Check out
                  </label>
                  <div className="relative">
                    <select
                      className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:border-[#07ebbd] focus:ring-1 focus:ring-[#07ebbd] focus:outline-none transition duration-300 appearance-none pr-10"
                      value={checkOutTime}
                      onChange={(e) => setCheckOutTime(e.target.value)}
                    >
                      <option value="">-- Choisir --</option>
                      {departureTimes.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handlePaymentMethodChange("online")}
                    className={`p-3 rounded-lg flex flex-col items-center justify-center border transition duration-300 
                      ${selectedPaymentMethod === "online" 
                        ? "border-[#07ebbd] bg-[#07ebbd]/10" 
                        : "border-gray-300 bg-white hover:bg-gray-50"}`}
                  >
                    <CreditCard size={20} className={`mb-1 ${selectedPaymentMethod === "online" ? "text-[#07ebbd]" : "text-gray-600"}`} />
                    <span className="text-xs">En ligne</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePaymentMethodChange("cash")}
                    className={`p-3 rounded-lg flex flex-col items-center justify-center border transition duration-300 
                      ${selectedPaymentMethod === "cash" 
                        ? "border-[#07ebbd] bg-[#07ebbd]/10" 
                        : "border-gray-300 bg-white hover:bg-gray-50"}`}
                  >
                    <DollarSign size={20} className={`mb-1 ${selectedPaymentMethod === "cash" ? "text-[#07ebbd]" : "text-gray-600"}`} />
                    <span className="text-xs">Cash</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePaymentMethodChange("points")}
                    className={`p-3 rounded-lg flex flex-col items-center justify-center border transition duration-300 
                      ${selectedPaymentMethod === "points" 
                        ? "border-[#07ebbd] bg-[#07ebbd]/10" 
                        : "border-gray-300 bg-white hover:bg-gray-50"}`}
                  >
                    <Sparkles size={20} className={`mb-1 ${selectedPaymentMethod === "points" ? "text-[#07ebbd]" : "text-gray-600"}`} />
                    <span className="text-xs">Points</span>
                  </button>
                </div>
              </div>

              <div>
                {(selectedPaymentMethod === "online" ||
                  selectedPaymentMethod === "cash") && (
                  <div className="flex justify-between bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <span className="text-gray-700">Total Price:</span>
                    <span className="text-xl font-semibold text-[#07ebbd]">{price} TND</span>
                  </div>
                )}
                {selectedPaymentMethod === "points" && points * 1.5 >= price && (
                  <div className="flex justify-between bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <span className="text-gray-700">Points Required:</span>
                    <span className="text-xl font-semibold text-[#07ebbd]">{Math.ceil(price/1.5)} pts</span>
                  </div>
                )}
                {paymentError && (
                  <div className="mt-2 bg-red-50 border border-red-300 p-3 rounded-lg text-red-700 text-sm">
                    {paymentError}
                  </div>
                )}
                {error && (
                  <div className="mt-2 bg-red-50 border border-red-300 p-3 rounded-lg text-red-700 text-sm">
                    {error}
                  </div>
                )}
                {successMessage && (
                  <div className="mt-2 bg-green-50 border border-green-300 p-3 rounded-lg text-green-700 text-sm">
                    {successMessage}
                  </div>
                )}
              </div>

              {showSubmit && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-4 rounded-lg font-medium text-white bg-gradient-to-r from-[#07ebbd] to-[#06c7a0] hover:from-[#07ebbd] hover:to-[#07ebbd] transition-all duration-300 flex items-center justify-center"
                  type="submit"
                >
                  Confirmer la réservation
                </motion.button>
              )}
            </div>
          </form>
         </div>
       </motion.div>
    </div>,
    document.body
  );
}