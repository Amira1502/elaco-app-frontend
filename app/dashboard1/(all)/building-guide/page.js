"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  Clock,
  Package,
  User2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function SpaceGuide() {
  const [showTeam, setShowTeam] = useState(false);

  const contacts = [
    {
      name: ".....",
      phone: "+216  98 444 080",
      email: " elacocoworking@gmail.com",
    },
    {
      name: "....",
      phone: "+216 ** *** *** ",
      email: "****@gmail.com",
    },
  ];

  const days = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
      {/* Header */}
      <header>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome to Your Space</h1>
        <p className="text-gray-600 text-lg">
          Here’s everything you need to know to feel at home and get support when you need it.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contacts */}
          <section className="bg-white rounded-xl shadow p-6">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setShowTeam(!showTeam)}
            >
              <h2 className="text-xl font-semibold text-gray-800">Community & Space Managers</h2>
              {showTeam ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
            {showTeam && (
              <div className="mt-4 space-y-4">
                {contacts.map((person) => (
                  <div key={person.name} className="p-4 border rounded-lg bg-gray-50">
                    <p className="text-lg font-medium text-gray-900 flex items-center gap-2">
                      <User2 className="w-5 h-5 text-blue-600" /> {person.name}
                    </p>
                    <p className="text-gray-700 mt-1">
                      <Phone className="inline w-4 h-4 mr-2 text-blue-500" />
                      {person.phone}
                    </p>
                    <p className="text-gray-700">
                      <Mail className="inline w-4 h-4 mr-2 text-blue-500" />
                      <a href={`mailto:${person.email}`} className="text-blue-600 hover:underline">
                        {person.email}
                      </a>
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* CEO Contact */}
          <section className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Need to escalate?</h2>
            <p className="text-gray-700">
              You can also reach out directly to our CEO if needed:
            </p>
            <p className="mt-2 text-gray-700">
              <Mail className="inline w-4 h-4 mr-2 text-blue-500" />
              <a href="mailto:seif@workzone.tn" className="text-blue-600 hover:underline">
                seif@workzone.tn
              </a>
            </p>
            <p className="text-gray-700">
              <Phone className="inline w-4 h-4 mr-2 text-blue-500" />+216 22 252 273
            </p>
          </section>
        </div>

        {/* Right Section */}
        <aside className="space-y-6">
          {/* Opening Hours */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-600" /> Opening Hours
            </h3>
            <ul className="text-gray-700 space-y-2 text-sm">
              {days.map(day => (
                <li key={day} className="flex justify-between">
                  <span>{day}</span>
                  <span>08:00 – 00:00</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Mail & Parcels */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <Package className="w-5 h-5 text-yellow-500" /> Parcels & Mail
            </h3>
            <p className="text-gray-700 text-sm">
              All packages and mail are delivered to the reception desk. Please check in upon arrival.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
