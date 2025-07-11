
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from "@/app/context/UserContext";
import { motion } from 'framer-motion';

export default function Points() {
  const searchParams = useSearchParams();
  const { idUser } = useUser();

  const [points, setPoints] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const status = searchParams.get('status');
    if (status === 'success') {
      const pointsAdded = searchParams.get('points');
      toast.success(`🎉 ${pointsAdded} points added successfully!`);
    } else if (status === 'failed') {
      toast.error('❌ Payment failed. Please try again.');
    }
  }, [searchParams]);

  const handlePayment = async () => {
    if (!idUser || points <= 0) {
      toast.warn('⚠️ Please enter a valid number of points');
      return;
    }

    setIsLoading(true);
    try {
      const totalPrice = points * 1500;
      const response = await fetch(
        `http://localhost:8000/ELACO/payment?userId=${idUser}&points=${points}`,
        {
          method: "POST",
          body: JSON.stringify({
            amount: totalPrice,
            description: `${points} ELACO Points Purchase`,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error('Payment initiation failed');
      const { result } = await response.json();
      window.location.href = result.payUrl;
    } catch (err) {
      toast.error('❌ Payment processing failed. Please try again.');
      setIsLoading(false);
    }
  };

  const sendNotification = async () => {
    if (!idUser || points <= 0) {
      toast.warn('⚠️ Please enter a valid number of points');
      return;
    }

    try {
      const obj = {
        title: "Adding Points",
        content: `requests to buy ${points} points`,
        points: points
      };

      const response = await fetch(`http://localhost:8000/ELACO/notification/${idUser}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj)
      });

      if (!response.ok) throw new Error('Cash payment failed');
      const resData = await response.json();
      toast.success(resData.message);
    } catch {
      toast.error('❌ Something went wrong. Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-white flex items-center justify-center  py-0 pt-0">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8"
      >
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-3">
          Buy Points
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Purchase coworking time with points — pay online or in cash.
        </p>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Number of Points
          </label>
          <input
            type="number"
            min="1"
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
            placeholder="Enter points"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#07ebbd] transition"
          />
          <p className="text-sm text-gray-600 mt-2">
            Total Price: <span className="font-semibold">{points * 1500} TND</span>
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            onClick={handlePayment}
            disabled={isLoading}
            className="w-full bg-black hover:bg-[#07ebbd] text-white font-semibold py-3 rounded-lg shadow-md transition disabled:opacity-60"
          >
            {isLoading ? 'Processing...' : 'Pay Online'}
          </motion.button>

          {/* <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            onClick={sendNotification}
            disabled={isLoading}
            className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 rounded-lg shadow-sm transition disabled:opacity-60"
          >
            Pay in Cash
          </motion.button> */}
        </div>

        <ToastContainer position="bottom-right" autoClose={4000} hideProgressBar />
      </motion.div>
    </div>
  );
}
