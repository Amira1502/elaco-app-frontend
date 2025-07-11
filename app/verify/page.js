'use client';

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useUser } from "@/app/context/UserContext"     // Adjust path based on your structure
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

export default function PaymentVerify() {
  const [isWorked, setIsWorked] = useState(null);
  const [error, setError] = useState(null);
  const [pointsAdded, setPointsAdded] = useState(0);
  const { width, height } = useWindowSize();

  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const paymentId = searchParams.get("payment_ref");
  // const userId = searchParams.get("userId");
  const points = searchParams.get("points");
  const { idUser} = useUser();

  // Debug: Log all incoming parameters
  useEffect(() => {
    console.log('Received parameters:', {
      status,
      paymentId,
      idUser,
      points
    });
  }, []);

  // Process Payment and Add Points
  useEffect(() => {
    console.log('Verification useEffect triggered');
    
    // Immediate failure case
    if (status === "failed") {
      console.log('Immediate failure detected');
      setIsWorked(false);
      setError("Payment failed. Please try again.");
      return;
    }

    // Check if all required parameters are available
    if (status !== "success" || !paymentId || !idUser || !points) {
      console.log('Missing required parameters:', {
        hasStatus: !!status,
        hasPaymentId: !!paymentId,
        hasUserId: !!idUser,
        hasPoints: !!points
      });
      return;
    }

    async function verifyAndAddPoints() {
      console.log('Starting verification...');
      try {
        const url = `http://localhost:8000/ELACO/verify/${paymentId}?userId=${idUser}&points=${points}`;
        console.log('Making request to:', url);

        const response = await fetch(url, {
          method: "GET",
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
          }
        });

        console.log('Response status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Verification failed:', errorText);
          throw new Error(errorText || "Payment verification failed");
        }

        const resData = await response.json();
        console.log('Verification response:', resData);

        if (resData.status !== "success") {
          throw new Error(resData.message || "Payment was not successful");
        }

        console.log('Verification successful!');
        setPointsAdded(points);
        setIsWorked(true);
      } catch (error) {
        console.error("Full error details:", error);
        setError(error.message);
        setIsWorked(false);
      }
    }

    verifyAndAddPoints();
  }, [status, paymentId, idUser, points]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
      {isWorked === true && <Confetti width={width} height={height} numberOfPieces={200} />}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center relative overflow-hidden">
        {/* Loading */}
        {isWorked === null && status === "success" && (
          <div className="space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 text-lg font-medium">Verifying your payment...</p>
            <p className="text-sm text-gray-500 font-medium">Purchasing {points} points</p>
            <p className="text-xs text-gray-400">Payment ID: {paymentId}</p>
          </div>
        )}

        {/* Success */}
        {isWorked === true && (
          <div className="space-y-4 animate-fadeIn">
            <FaCheckCircle className="text-6xl text-green-500 mx-auto animate-bounce" />
            <h2 className="text-2xl font-extrabold text-green-600">Payment Successful!</h2>
            <p className="text-gray-700 font-medium">
              🎉 {pointsAdded} points have been added to your account!
            </p>
            <button
              onClick={() => window.location.href = "/dashboard1/profile"}
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-all duration-300 shadow-md"
            >
              Go to Profile page
            </button>
          </div>
        )}

        {/* Failure */}
        {isWorked === false && (
          <div className="space-y-4 animate-fadeIn">
            <FaTimesCircle className="text-6xl text-red-500 mx-auto animate-shake" />
            <h2 className="text-2xl font-bold text-red-600">Payment Failed</h2>
            <p className="text-gray-700">
              {error || "Something went wrong. Please try again."}
            </p>
            <button
              onClick={() => window.location.href = "/buypoints"}
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