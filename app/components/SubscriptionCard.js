"use client";
import { useState } from "react";
import SubscriptionModal from './SubscriptionModal';
import { useRouter } from 'next/navigation';
import { useUser } from "@/app/context/UserContext"     

export default function SubscriptionCard({ sub , descriptions}) {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const { idUser, loading: userLoading } = useUser();

  return (
    <div className="flex flex-col bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
      <SubscriptionModal sub={sub} isOpen1={showModal} onClose={() => setShowModal(false)} />

      <div className="pb-6 mb-6 border-b border-gray-200 text-center">
        <p className="text-lg font-semibold uppercase text-gray-600">
          {sub.subscriptionType}
        </p>
        {/* Added Room Info Under Subscription Type */}
        <p className="text-sm text-gray-400 mt-1">
  {sub?.table_id?.Name ? sub.table_id.Name : null}
</p>

        <h1 className="flex justify-center gap-1 mt-4 font-bold text-blue-950 text-4xl sm:text-5xl">
          {sub.price}
          <span className="self-end text-xl sm:text-2xl">TND</span>
        </h1>
      </div>

<ul className="space-y-3">
  {Array.isArray(sub?.table_id?.description) && sub.table_id.description.length > 0
    ? sub.table_id.description.map((des, index) => (
        <li key={index} className="flex items-center gap-3 text-sm sm:text-base text-gray-600">
          <span className="p-1.5 border rounded-full border-gray-300 bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              strokeWidth="2" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </span>
          <p>{des}</p>
        </li>
      ))
    : (Array.isArray(descriptions) && descriptions.length > 0
      ? descriptions.map((des, index) => (
          <li key={index} className="flex items-center gap-3 text-sm sm:text-base text-gray-600">
            <span className="p-1.5 border rounded-full border-gray-300 bg-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </span>
            <p>{des}</p>
          </li>
        ))
      : null)}
</ul>
      <div className="mt-8">
        <button
          className="w-full py-2 px-4 bg-black hover:bg-[#07ebbd] text-white text-lg rounded-md shadow-md transition-colors duration-300"
          type="button"
          onClick={() => {
            // const id = localStorage.getItem('userId');
            if (idUser) {
              setShowModal(true);
            } else {
              router.push('/login');
            }
          }}
        >
          Subscribe
        </button>
      </div>
    </div>
  );
}
