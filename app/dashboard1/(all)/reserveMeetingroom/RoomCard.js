import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimeSelector from "./TimePicker"; // adjust the path accordingly
import Reserve from "./reserve";

import {
  Calendar as CalendarIcon,
  Layers,
  User,
} from "lucide-react";

const RoomCard = ({ room, image ,reservation ,ff}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState(null);
  const scrollRef = useRef(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };
  console.log("selected code "+selectedDate)

  return (
    <div className="flex border rounded-xl overflow-hidden shadow bg-white max-w-full mx-auto my-1">
      {/* Pass selectedTimeRange as a prop to Reserve */}
    
      <Reserve
  room={room}
  isOpen1={showModal}
  onClose={() => {
    setShowModal(false);
    setSelectedTimeRange(null); // Optional: clear selection
    setRefreshKey(prev => prev + 1); // Trigger TimeSelector refresh
    ff()
  }}
  initialTimeRange={selectedTimeRange}
  reservation={reservation}
  Datecalender={selectedDate}
 
  
/>


      {/* Left: Image and overlays */}
      <div className="relative w-[300px] h-[300px] flex-shrink-0 p-2 rounded-xl overflow-hidden">
        <img
          src={image}
          alt={room.Name}
          className="object-cover w-full h-full rounded-xl"
        />
        <div
          className="absolute top-4 left-4 bg-white p-2 rounded-lg shadow-md cursor-pointer"
          onClick={() => setShowCalendar((prev) => !prev)}
        >
          <CalendarIcon size={22} className="text-black" />
        </div>
        {showCalendar && (
          <div className="absolute top-16 left-4 z-10 bg-white shadow-lg rounded-lg">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
                setShowCalendar(false);
              }}
              inline
            />
          </div>
        )}
        <div className="absolute bottom-4 left-3 flex flex-col gap-1">
          {room.prices?.map((p, idx) => (
            <div
              key={idx}
              className="bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded"
            >
              {p.price}.00DT / {p.duration}
            </div>
          ))}
        </div>
      </div>

      {/* Right: Room details and TimeSelector */}
      <div className="flex-1 p-4 flex flex-col justify-between overflow-hidden">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-lg font-semibold">{room.Name}</h2>
            <span className="w-2 h-2 bg-green-500 rounded-full inline-block" />
          </div>
          <div className="flex items-center text-sm text-gray-600 space-x-4 mb-2">
            <span className="flex items-center gap-1">
              <Layers size={16} /> <span>{room.type}</span>
            </span>
            <span className="flex items-center gap-1">
              <User size={16} /> <span>{room.capacity}</span>
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            {room.description.map((feature, idx) => (
              <span
                key={idx}
                className="bg-gray-100 text-sm px-2 py-1 rounded-md"
              >
                {feature}
              </span>
            ))}
          </div>
          <p className="text-gray-400 text-sm truncate w-[90%]">
            {room.description[0]}
          </p>

          {/* Time slots scroll: use TimeSelector instead of TimePicker */}
          <div className="mt-4 flex items-center">
          
            <TimeSelector
  key={refreshKey}
  onTimeSelect={(range) => {
    setSelectedTimeRange(range);
    setShowModal(true);
  }}
  Datecalender={selectedDate}
  reservation={reservation}
/>

          </div>
        </div>

        {/* Optionally, the normal "Réserver" button can remain */}
        <div className="flex justify-end mt-4">
          <button
            className="bg-black hover:bg-[#07ebbd] text-white px-6 py-2 rounded-lg shadow text-sm whitespace-nowrap"
            onClick={() => setShowModal(true)}
          >
            Reserve {selectedDate.toLocaleDateString("fr-FR")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
