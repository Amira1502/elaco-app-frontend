
import {
    Monitor,
    Wifi,
    Users,
    Printer,
    ParkingCircle,
    Coffee,
    ClipboardList,
    Gamepad2
  } from 'lucide-react';
  
  const amenities = [
    { id: '01', title: 'MODERN DESIGN', icon: <Monitor size={48} strokeWidth={1.5} /> },
    { id: '02', title: 'FREE FAST INTERNET', icon: <Wifi size={48} strokeWidth={1.5} /> },
    { id: '03', title: 'GROUP EVENTS', icon: <Users size={48} strokeWidth={1.5} /> },
    { id: '04', title: 'OFFICE SUPPLIES', icon: <Printer size={48} strokeWidth={1.5} /> },
    { id: '05', title: 'FREE PARKING', icon: <ParkingCircle size={48} strokeWidth={1.5} /> },
    { id: '06', title: 'COFFEE SHOP', icon: <Coffee size={48} strokeWidth={1.5} /> },
    { id: '07', title: 'CONFERENCE ROOMS', icon: <ClipboardList size={48} strokeWidth={1.5} /> },
    { id: '08', title: 'RELAX ROOM', icon: <Gamepad2 size={48} strokeWidth={1.5} /> },
  ];
  
  export default function Amenities() {
    return (
      <section className="mt-0 py-0 mb-3 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs uppercase text-indigo-700 font-semibold tracking-wider mb-2">Learn and Grow</p>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Our Amenities</h2>
          <div className="flex justify-center mb-6">
            <span className="w-1.5 h-1.5 bg-indigo-700 rounded-full mx-0.5" />
            <span className="w-1.5 h-1.5 bg-indigo-700 rounded-full mx-0.5" />
            <span className="w-1.5 h-1.5 bg-indigo-700 rounded-full mx-0.5" />
          </div>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto mb-14">
            A 2007 survey showed that many employees worry about feeling isolated and losing human interaction if they were to telecommute.
          </p>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {amenities.map((item) => (
              <div key={item.id} className="bg-white shadow-md rounded-md p-6 text-center space-y-3">
                <div className="text-3xl font-bold text-[#07ebbd]" style={{ fontFamily: 'cursive' }}>{item.id}</div>
                <div className="text-gray-800 flex justify-center">{item.icon}</div>
                <div className="text-sm font-bold text-gray-900 tracking-wide">{item.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  