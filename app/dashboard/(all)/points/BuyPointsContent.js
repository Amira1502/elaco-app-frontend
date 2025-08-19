// components/BuyPointsContent.js
'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { useUser } from "@/app/context/UserContext";

export default function BuyPointsContent({ compact = false, onClose }) {
  const { idUser } = useUser();
  const [points, setPoints] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    if (!idUser || points <= 0) {
      toast.warn('Please enter a valid number of points');
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
      toast.error('Payment failed. Try again.');
      setIsLoading(false);
    }
  };

  const sendNotification = async () => {
    if (!idUser || points <= 0) {
      toast.warn('Please enter a valid number of points');
      return;
    }
    try {
      const response = await fetch(`http://localhost:8000/ELACO/notification/${idUser}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Adding Points",
          content: `requests to buy ${points} points`,
          points,
        }),
      });
      if (!response.ok) throw new Error('Notification failed');
      const resData = await response.json();
      toast.success(resData.message);
    } catch {
      toast.error('Something went wrong. Try again.');
    }
  };

  return (
    <div className={compact ? 'p-4' : 'max-w-md mx-auto p-8'}>
      {!compact && (
        <>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Buy Points</h2>
          <p className="text-sm text-gray-500 mb-6">Pay as you go by purchasing points</p>
        </>
      )}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Number of Points</label>
        <input
          type="number"
          min="1"
          value={points}
          onChange={(e) => setPoints(Number(e.target.value))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-sm text-gray-600 mt-1">Total: {points * 1500} TND</p>
      </div>
      <div className="flex flex-col gap-3">
        <button
          onClick={handlePayment}
          disabled={isLoading}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {isLoading ? 'Processing...' : 'Pay Online'}
        </button>
        <button
          onClick={sendNotification}
          disabled={isLoading}
          className="w-full border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-100 transition disabled:bg-gray-200"
        >
          Pay in Cash
        </button>
      </div>
      {onClose && (
        <button onClick={onClose} className="mt-4 text-sm text-gray-500 hover:underline mx-auto block">
          Close
        </button>
      )}
    </div>
  );
}
