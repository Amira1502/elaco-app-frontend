
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useUser } from "@/app/context/UserContext";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

function PaymentContent() {
  const [isWorked, setIsWorked] = useState(null);
  const [error, setError] = useState(null);
  const { width, height } = useWindowSize();

  const searchParams = useSearchParams();
  const payment_ref = searchParams.get("payment_ref");
  const start_time = searchParams.get("start_time");
  const end_time = searchParams.get("end_time");
  const numTable = searchParams.get("numTable");
  const date = searchParams.get("date");

  const { idUser } = useUser();

  useEffect(() => {
    if (!idUser || !end_time || !payment_ref || !start_time || !numTable || !date) {
      return;
    }

    async function getStatus() {
      try {
        const response = await fetch(
          `http://localhost:8000/ELACO/booking/verify/${payment_ref}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) throw new Error("You cannot pay for now");

        const resData = await response.json();

        if (resData.resData.payment.transactions[0].status !== "success") {
          throw new Error("Payment was not successful");
        }

        const obj = {
          check_in: start_time,
          check_out: end_time,
          numTable: numTable,
          id_user: idUser,
          price: resData.resData.payment.transactions[0].amount,
          paymentMethod: "online",
          date: date,
        };

        const bookingResponse = await fetch("http://localhost:8000/ELACO/booking/", {
          method: "POST",
          body: JSON.stringify(obj),
          headers: { "Content-Type": "application/json" },
        });

        if (!bookingResponse.ok) {
          throw new Error(`Server error: ${bookingResponse.statusText}`);
        }

        setIsWorked(true);
      } catch (error) {
        console.error("Error:", error);
        setError(error.message);
        setIsWorked(false);
      }
    }

    getStatus();
  }, [idUser, end_time, start_time, numTable, payment_ref, date]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
      {isWorked === true && <Confetti width={width} height={height} numberOfPieces={200} />}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center relative overflow-hidden">
        {/* Loading */}
        {isWorked === null && (
          <div className="space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 text-lg font-medium">Processing your payment...</p>
          </div>
        )}

        {/* Success */}
        {isWorked === true && (
          <div className="space-y-4 animate-fadeIn">
            <FaCheckCircle className="text-6xl text-green-500 mx-auto animate-bounce" />
            <h2 className="text-2xl font-extrabold text-green-600">Booking Confirmed!</h2>
            <p className="text-gray-700 font-medium">
              🎉 Your payment was successful and your booking is confirmed!
            </p>
            <button
              onClick={() => window.location.href = "/dashboard1/reservations"}
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-all duration-300 shadow-md"
            >
              Go to Bookings
            </button>
          </div>
        )}

        {/* Failure */}
        {isWorked === false && (
          <div className="space-y-4 animate-fadeIn">
            <FaTimesCircle className="text-6xl text-red-500 mx-auto animate-shake" />
            <h2 className="text-2xl font-bold text-red-600">Payment Failed</h2>
            <p className="text-gray-700">{error || "Something went wrong. Please try again."}</p>
            <button
              // onClick={() =>  window.location.href = "/dashboard1/reserveMeetingroom"}
              onClick={() => {
                if (numTable === "33" || numTable === "34") {
                  window.location.href = "/dashboard1/reserveMeetingroom";
                }

                else if (numTable === "32" || numTable === "31") {
                  window.location.href = "/dashboard1/reservePrivatedesk";
                }
                else {
                  window.location.href = "/dashboard1/reserveOpenSpace";
                }
              }}

              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-all duration-300 shadow-md"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PaymentSub() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentContent />
    </Suspense>
  );
}
