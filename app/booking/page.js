
"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/app/context/UserContext"     // Adjust path based on your structure

export default function Add() {
  const [error, setError] = useState(null);
  const [start_timeError, setStart_timeError] = useState("");
  const [end_timeError, setEnd_timeError] = useState("");
  // const [idUser, setIdUser] = useState("");
  const [status, setStatus] = useState("");
  const [points, setPoints] = useState(0);
  const [price, setPrice] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [showSubmit, setShowSubmit] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [userName, setUserName] = useState("");
  const { idUser } = useUser();


  const router = useRouter();
  const searchParams = useSearchParams();
  const numtable = searchParams.get("numtable");
  const [end_time, setEnd_time] = useState("");
  const [start_time, setStart_time] = useState("");
  const start_time1 = useRef();
  const end_time1 = useRef();
  const service=useRef();
  // Add state for private office type
  const [privateOfficeType, setPrivateOfficeType] = useState("");

    
      useEffect(() => {
        if (!idUser) return;
    
        async function fetchStatus() {
          try {
            const response = await fetch(
              `http://localhost:8000/ELACO/Points/${idUser}`,
              {
                method: "GET",
                credentials: "include",
              }
            );
            if (!response.ok) {
              throw new Error(`Failed to fetch user subscription status: ${response.statusText}`);
            }
    
            const data = await response.json();
            console.log("points:", data.points);
            setPoints(data.points);
          } catch (error) {
            console.error("Error fetching status:", error);
            setError(error.message);
          }
        }
    
        fetchStatus();
      }, [idUser]);
      
  // Update calculatePrice to handle private office types
  const calculatePrice = (start_time, end_time, service, privateOfficeType) => {
    if (service === "private_office") {
      if (privateOfficeType === "1day") return 20;
      if (privateOfficeType === "1week") return 90;
      if (privateOfficeType === "1month") return 800; // 800 DT HT
      return 0;
    }
    if (!start_time || !end_time) return 0;
    const start = new Date(`1970-01-01T${start_time}:00`);
    const end = new Date(`1970-01-01T${end_time}:00`);
    const diffInHours = (end - start) / 1000 / 60 / 60;
  

    return diffInHours * 1500;
  };

  // Update useEffect to include privateOfficeType and service
  useEffect(() => {
    const calculatedPrice = calculatePrice(start_time, end_time, service.current?.value, privateOfficeType);
    setPrice(calculatedPrice);
  }, [start_time, end_time, privateOfficeType, service.current?.value]);

  
  const handlePaymentMethodChange = (method) => {
    console.log("Selected method:", method);
    setSelectedPaymentMethod(method);
    setPaymentError("");
    setShowSubmit(false);
  
    if (!method) return;
  
    if (method === "subscription") {
      if (status !== "active") {
        setPaymentError("You don't have an active subscription...");
        return;
      }
    } else if (method === "points") {
      if (points * 1500 < price) {
        setPaymentError("You don't have enough points...");
        return;
      }
    }
  
    console.log("Setting showSubmit to true for method:", method);
    setShowSubmit(true);
  };
  useEffect(() => {
    if (selectedPaymentMethod && start_time && end_time) {
      const calculatedPrice = calculatePrice(start_time, end_time);
      setPrice(calculatedPrice);
      
      // Re-validate payment method when times change
      handlePaymentMethodChange(selectedPaymentMethod);
    }
  }, [start_time, end_time, selectedPaymentMethod]);

  
  const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
    
        try {
          setStart_timeError("");
          setEnd_timeError("");
          setError(null);
    
          const result = await addBooking(formData);
          setResponseStatus(result.status);
    
          if (result.status === 201) {
            router.push("/list");
          }
        } catch (error) {
          console.error(error);
          if (error.message.includes("Invalid start time")) {
            setStart_timeError("Invalid start time.");
          } else if (error.message.includes("Invalid end time")) {
            setEnd_timeError("Invalid end time.");
          } else {
            setError("Booking failed. Please try again.");
          }
        }
      };
    
      const addBooking = async (formData) => {
        console.log("methoddd"+selectedPaymentMethod)
      
        // Add TVA calculation
        const TVA_RATE = 0.19;
        const calculateTVA = (basePrice) => Math.round(basePrice * TVA_RATE * 100) / 100;
        const calculateTotalWithTVA = (basePrice) => Math.round((basePrice + calculateTVA(basePrice)) * 100) / 100;

        const totalPriceWithTVA = calculateTotalWithTVA(price);

        const obj = {
          check_in: formData.get("start_time"),
          check_out: formData.get("end_time"),
          id_user: idUser,
          numTable: numtable,
          price: selectedPaymentMethod === "subscription" || selectedPaymentMethod === "points" ? 0 : totalPriceWithTVA,
          paymentMethod: selectedPaymentMethod,
          service: service.current?.value,
          privateOfficeType: service.current?.value === "private_office" ? privateOfficeType : undefined,
        };
        console.log("objj", obj); // Use comma instead of + to log the object properly    
        try {
          const response = await fetch("http://localhost:8000/ELACO/booking/", {
            method: "POST",
            body: JSON.stringify(obj),
            headers: { "Content-Type": "application/json" },
          });
    
          if (!response.ok) {
            throw new Error(`Server error: ${response.statusText}`);
          }
    
          const data = await response.json();
          return { status: response.status, data };
        } catch (error) {
          console.error(error);
          throw new Error("Booking failed. Please try again.");
        }
      };

  const handleOnlinePayment = async () => {
    const obj = {
      amount: totalPriceWithTVA,
    };
    
    try {
      const response = await fetch(
        `http://localhost:8000/ELACO/booking/payment?start_time=${start_time}&end_time=${end_time}&numTable=${numtable}`,
        {
          method: "POST",
          body: JSON.stringify(obj),
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
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

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-50">
      <div className="max-w-4xl w-full bg-white shadow-2xl rounded-lg flex overflow-hidden">
        <div className="hidden md:flex flex-col justify-center items-start w-1/2 bg-gradient-to-r from-blue-500 to-[#62e3cd] p-7 text-white relative">
          <div className="absolute top-5 left-5 right-5">
            <h1 className="text-2xl font-bold mb-2">Welcome Back{userName ? `, ${userName}` : ''}!</h1>
            <p className="text-blue-100">Book your table {numtable} and enjoy your time</p>
          </div>
          <img
            src="/Capture_d_écran_2025-03-06_225634-removebg-preview.png"
            alt="Booking Illustration"
            className="w-102 mt-16"
          />
        </div>
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Make a Booking</h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-900 font-medium">Check in</label>
              <input required
                type="time" max="21:00" min="8:00"
                ref={start_time1}
                className={`w-full border ${start_timeError ? "border-red-500" : "border-gray-300"} rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black`}
                name="start_time"
                value={start_time}
                onChange={(e) => {
                  setStart_time(e.target.value);
                }}
                
              />
              {start_timeError && <p className="text-red-500 text-sm mt-1">{start_timeError}</p>}
            </div>
            <div>
              <label className="block text-gray-900 font-medium">Check out</label>
              <input required
                type="time" max="21:00" min="8:00"
                ref={end_time1}
                className={`w-full border  ${end_timeError ? "border-red-500" : "border-gray-300"} rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black `}
                name="end_time"
                value={end_time}
                onChange={(e) => {
                  setEnd_time(e.target.value);
                }}
              />
              {end_timeError && <p className="text-red-500 text-sm mt-1">{end_timeError}</p>}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Service</label>
              <select
                ref={service}
                value={service.current?.value || ""}
                onChange={e => {
                  service.current.value = e.target.value;
                  setPrivateOfficeType(""); // Reset private office type when service changes
                  handlePaymentMethodChange(""); // Reset payment method
                }}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                name="service"
              >
                <option value="">Select Service</option>
                <option value="meeting_room">Meeting Room 1: 15 DT/h (1h = 15 000 DT, 2h = 25 000 DT)</option>
                <option value="private_office">Private Office</option>
                <option value="open_space">Open Space: 1h = 1 500 DT, minimum 10 DT</option>
              </select>
              {service.current?.value === "private_office" && (
                <div className="mt-3">
                  <label className="block text-gray-700 font-medium mb-2">Private Office Type</label>
                  <select
                    value={privateOfficeType}
                    onChange={e => setPrivateOfficeType(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                    name="private_office_type"
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="1day">1 Day = 20 DT</option>
                    <option value="1week">1 Week = 90 DT</option>
                    <option value="1month">1 Month = 800 DT HT</option>
                  </select>
                </div>
              )}
              {paymentError && <p className="text-red-500 text-sm mt-2">{paymentError}</p>}
            </div>


            <div>
              <label className="block text-gray-700 font-medium mb-2">Payment Method</label>
              <select
                value={selectedPaymentMethod}
                onChange={(e) => handlePaymentMethodChange(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
              >
                <option value="">Select a payment method</option>
                <option value="online">Online Payment</option>
                <option value="cash">Cash Payment</option>
                <option value="points">Points ({points} pts)</option>
                <option value="subscription">Subscription</option>
              </select>
              {paymentError && <p className="text-red-500 text-sm mt-2">{paymentError}</p>}
            </div>

            {(selectedPaymentMethod === "online" || selectedPaymentMethod === "cash") && (
              <div className="text-xl font-semibold text-gray-800 space-y-1">
                <div>Base Price: {price} {privateOfficeType === "1month" && service.current?.value === "private_office" ? 'DT HT' : 'TND'}</div>
                <div>TVA (19%): {calculateTVA(price)} TND</div>
                <div>Total Price (TTC): {calculateTotalWithTVA(price)} TND</div>
              </div>
            )}
                    {showSubmit && (
  <div className="mt-6">
    {selectedPaymentMethod === "online" ? (
      <button
        type="button"
        onClick={handleOnlinePayment}
        className="w-full bg-indigo-600 py-3 rounded-md text-white font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
      >
        Pay Online
      </button>
    ) : (
      <button
        type="submit"
        className="w-full bg-indigo-600 py-3 rounded-md text-white font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
      >
        {selectedPaymentMethod === "cash" ? "Confirm Cash Payment" : "Confirm Booking"}
      </button>
    )}
  </div>
)}            
          </form>
          {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
        </div>
      </div>
    </div>
  );
}