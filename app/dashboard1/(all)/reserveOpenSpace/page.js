// 'use client'

// import { DateTime } from 'luxon';
// import { useEffect, useState } from 'react'
// import FloorPlanSVG from '../../../components/FloorPlanSvg'
// import ReserveRoom from '../../../components/roomRes'

// export default function ReserveOpenSpace() {
//   const tunisNow = DateTime.now().setZone('Africa/Tunis').toJSDate();

//   const { defaultStart, defaultEnd } = (() => {
//     const now = DateTime.now().setZone('Africa/Tunis');
//     const minutes = now.minute;
//     const delta = (30 - (minutes % 30)) % 30;
//     const startDT = now.plus({ minutes: delta });
//     const endDT   = startDT.plus({ hours: 1 });
//     return {
//       defaultStart: startDT.toFormat('HH:mm'),
//       defaultEnd:   endDT.toFormat('HH:mm'),
//     };
//   })();

//   const [isModalOpen,    setIsModalOpen]    = useState(false);
//   const [selectedTable,  setSelectedTable]  = useState(null);

//   const [reservations,   setReservation]    = useState([])
//   const [reservation1,   setReservation1]   = useState([])
//   const [showDatePicker, setShowDatePicker] = useState(false)
//   const [tables,         setTables]         = useState([])

//   const [selectedDate,   setSelectedDate]   = useState(tunisNow);
//   // ← use our computed defaults instead of hard-coded 15:30 / 16:30
//   const [startTime,      setStartTime]      = useState(defaultStart);
//   const [endTime,        setEndTime]        = useState(defaultEnd);

//   const [currentMonth,   setCurrentMonth]   = useState(new Date().getMonth())
//   const [currentYear,    setCurrentYear]    = useState(new Date().getFullYear())

//   const timeSlots = [
//     "08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30",
//     "12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30",
//     "16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30",
//     "20:00","20:30","21:00","21:30","22:00","22:30","23:00","23:30","24:00"
//   ];

//   useEffect(() => {
//     async function getCurrentReservations() {
//       try {
//         const response = await fetch(`http://localhost:8000/ELACO/table/getCurrentResevations`)
//         if (!response.ok) throw new Error("Error in fetchingReservations")
//         const resData = await response.json()
//         setReservation(resData.data)
//       } catch (err) {
//         console.log(err)
//       }
//     }
//     async function getAllTables() {
//       try {
//         const response = await fetch(`http://localhost:8000/ELACO/table/getAllTables`)
//         if (!response.ok) throw new Error("Error in fetching Tables")
//         const resData = await response.json()
//       console.log(resData.data)
//         setTables(resData.data.tables)
//       } catch (err) {
//         console.log(err)
//       }
//     }
//     getCurrentReservations()
//     getAllTables()
//   }, [])

//   // ───── paint availability on any change ───────────────────────────────
//   useEffect(() => {
//     if (!reservations || reservations.length === 0) return;

//     const fmtDate = dateStr => {
//       const d = new Date(dateStr);
//       return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
//     };
//     const selFmt = `${selectedDate.getFullYear()}-${selectedDate.getMonth()+1}-${selectedDate.getDate()}`;

//     // conflict if same day AND times overlap
//     const filteredRes = reservations.filter(res => {
//       const sameDay = fmtDate(res.date) === selFmt;
//       const overlap = res.check_in < endTime && startTime < res.check_out;
//       return sameDay && overlap;
//     });

//     // green all
//     document.querySelectorAll('[data-table]')
//       .forEach(n => n.setAttribute('fill', '#d4edda'));

//     // red the conflicts
//     filteredRes.forEach(({ numTable }) => {
//       const node = document.getElementById(numTable)
//       if (node) node.setAttribute('fill', '#f8d7da')
//     })
//   }, [reservations, selectedDate, startTime, endTime]);

//   const months = ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre']
//   const days   = ['lu','ma','me','je','ve','sa','di']

//   const getDaysInMonth   = (y,m) => new Date(y,m+1,0).getDate()
//   const getFirstDayOfMonth = (y,m) => new Date(y,m,1).getDay() || 7

//   const generateCalendar = () => {
//     const total = []
//     const first = getFirstDayOfMonth(currentYear, currentMonth)
//     for (let i=1; i<first; i++) total.push(null)
//     for (let d=1; d<=getDaysInMonth(currentYear, currentMonth); d++) {
//       total.push(d)
//     }
//     return total
//   }

//   const nextMonth = () => {
//     if (currentMonth === 11) {
//       setCurrentMonth(0)
//       setCurrentYear(currentYear+1)
//     } else {
//       setCurrentMonth(currentMonth+1)
//     }
//   }
//   const prevMonth = () => {
//     if (currentMonth === 0) {
//       setCurrentMonth(11)
//       setCurrentYear(currentYear-1)
//     } else {
//       setCurrentMonth(currentMonth-1)
//     }
//   }

//   const handleDateSelect = day => {
//     if (!day) return
//     const newDate = new Date(currentYear, currentMonth, day)
//     setSelectedDate(newDate)

//     const today = new Date().toDateString()
//     if (newDate.toDateString() === today) {
//       // if today, snap to next half-hour +1h
//       const now = DateTime.now().setZone('Africa/Tunis');
//       const delta = (30 - (now.minute % 30)) % 30;
//       const nextHalf = now.plus({ minutes: delta });
//       const start = nextHalf.toFormat('HH:mm');
//       const endDT = nextHalf.plus({ hours: 1 });
//       const end   = endDT.toFormat('HH:mm');
//       setStartTime(start)
//       setEndTime(end)
//     } else {
//       setStartTime('08:00')
//       setEndTime('09:00')
//     }
//   }

//   const formatDate = date =>
//     `${date.getDate()} ${months[date.getMonth()].substring(0,3)} ${date.getFullYear()}`

//   const applyDateSelection = () => setShowDatePicker(false)
//   const toggleDatePicker  = () => setShowDatePicker(v => !v)

//   function selectTable(id) {
//     const found = tables.find(t => String(t.numTable) === String(id))
//     if (!found) return console.error('no table', id)
//     const todayRes = reservations.filter(r => r.numTable === found.numTable)
//     setReservation1(todayRes)
//     setSelectedTable(found)
//     setIsModalOpen(true)
//   }

//   return (
//     <div className=" w-full max-w-6xl mx-auto">
      
//       <div className=" relative">
//         <div
//           className="border border-gray-300 rounded-lg p-3 flex items-center cursor-pointer bg-white shadow-sm"
//           onClick={toggleDatePicker}
//         >
//           <svg className="w-5 h-5 mr-2 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
//             <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
//           </svg>
//           <span className="text-blue-500 font-medium">
//             Date: {selectedDate.getDate()}/{selectedDate.getMonth()+1}/{selectedDate.getFullYear()} {startTime} → {endTime}
//           </span>
//         </div>

//         {showDatePicker && (
//           <div className="absolute z-10 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-full md:w-auto">
//             <h3 className="font-medium mb-4">Date</h3>
//             <div className="flex gap-6">
//               <div className="calendar-section">
//                 <div className="flex justify-between items-center mb-4">
//                   <button onClick={prevMonth} className="p-1">
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
//                     </svg>
//                   </button>
//                   <div>
//                     <select value={months[currentMonth]} onChange={e => setCurrentMonth(months.indexOf(e.target.value))} className="mr-2 p-1 border-none bg-transparent">
//                       {months.map((m,i)=><option key={m} value={m}>{m}</option>)}
//                     </select>
//                     <select value={currentYear} onChange={e=>setCurrentYear(+e.target.value)} className="p-1 border-none bg-transparent">
//                       {[currentYear-1,currentYear,currentYear+1,currentYear+2].map(y=>(
//                         <option key={y} value={y}>{y}</option>
//                       ))}
//                     </select>
//                   </div>
//                   <button onClick={nextMonth} className="p-1">
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
//                     </svg>
//                   </button>
//                 </div>
//                 <div className="grid grid-cols-7 gap-1">
//                   {days.map(d=><div key={d} className="text-center text-sm text-gray-500 py-1">{d}</div>)}
//                   {generateCalendar().map((day,i)=>(
//                     <div
//                       key={i}
//                       className={`text-center py-2 cursor-pointer rounded ${
//                         day &&
//                         selectedDate.getDate() === day &&
//                         selectedDate.getMonth() === currentMonth &&
//                         selectedDate.getFullYear() === currentYear
//                           ? 'bg-blue-500 text-white'
//                           : day
//                           ? 'hover:bg-gray-100'
//                           : ''
//                       }`}
//                       onClick={()=>handleDateSelect(day)}
//                     >
//                       {day}
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="time-section">
//                 <div className="mb-4">
//                   <h4 className="text-gray-500 mb-2">Check in</h4>
//                   <div className="relative">
//                     <select
//                       value={startTime}
//                       onChange={e => setStartTime(e.target.value)}
//                       className="block w-full p-2 bg-gray-100 rounded border-none"
//                     >
//                       {timeSlots.map(t=>(
//                         <option key={t} value={t}>{t}</option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 <div className="mb-4">
//                   <h4 className="text-gray-500 mb-2">Check out</h4>
//                   <div className="relative">
//                     <select
//                       value={endTime}
//                       onChange={e => setEndTime(e.target.value)}
//                       className="block w-full p-2 bg-gray-100 rounded border-none"
//                     >
//                       {timeSlots.filter(t=>t>startTime).map(t=>(
//                         <option key={t} value={t}>{t}</option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <button
//               onClick={applyDateSelection}
//               className="w-full mt-4 bg-blue-500 text-white py-3 px-4 rounded font-medium hover:bg-blue-600 transition-colors"
//             >
//               Appliquer
//             </button>
//           </div>
//         )}
//       </div>

//       <div className="bg-white rounded-lg shadow-md p-4">
//         <div className="flex justify-center items-center border border-gray-200 rounded-lg p-4">
//           <FloorPlanSVG onTableClick={selectTable}/>
//         </div>
//       </div>

//       <div className="mt-6">
//         <div className="flex items-center gap-4 mb-4">
//           <div className="flex items-center">
//             <div className="w-4 h-4 bg-green-500 rounded-sm mr-2"></div>
//             <span>Available</span>
//           </div>
//           <div className="flex items-center">
//             <div className="w-4 h-4 bg-red-500 rounded-sm mr-2"></div>
//             <span>Reserved</span>
//           </div>
//         </div>


//       </div>

//       {isModalOpen && (
//         <ReserveRoom
//           isOpen1={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           room={selectedTable}
//           initialTimeRange={{
//             date: selectedDate,
//             startTime,
//             endTime,
//           }}
//           reservation1={reservation1}
//           Datecalender={selectedDate}
//         />
//       )}
//     </div>
//   )
// }
'use client'

import { DateTime } from 'luxon';
import { useEffect, useState } from 'react'
import FloorPlanSVG from '../../../components/FloorPlanSvg'
import ReserveRoom from '../../../components/roomRes'

export default function ReserveOpenSpace() {
  const tunisNow = DateTime.now().setZone('Africa/Tunis').toJSDate();

  const { defaultStart, defaultEnd } = (() => {
    const now = DateTime.now().setZone('Africa/Tunis');
    const minutes = now.minute;
    const delta = (30 - (minutes % 30)) % 30;
    const startDT = now.plus({ minutes: delta });
    const endDT   = startDT.plus({ hours: 1 });
    return {
      defaultStart: startDT.toFormat('HH:mm'),
      defaultEnd:   endDT.toFormat('HH:mm'),
    };
  })();

  const [isModalOpen,    setIsModalOpen]    = useState(false);
  const [selectedTable,  setSelectedTable]  = useState(null);

  const [reservations,   setReservation]    = useState([])
  const [reservation1,   setReservation1]   = useState([])
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [tables,         setTables]         = useState([])

  const [selectedDate,   setSelectedDate]   = useState(tunisNow);
  // ← use our computed defaults instead of hard-coded 15:30 / 16:30
  const [startTime,      setStartTime]      = useState(defaultStart);
  const [endTime,        setEndTime]        = useState(defaultEnd);

  const [currentMonth,   setCurrentMonth]   = useState(new Date().getMonth())
  const [currentYear,    setCurrentYear]    = useState(new Date().getFullYear())
  const [active,setActive]=useState(true)

  const timeSlots = [
    "08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30",
    "12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30",
    "16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30",
    "20:00","20:30","21:00","21:30","22:00","22:30","23:00","23:30","24:00"
  ];

  useEffect(() => {
    async function getCurrentReservations() {
      try {
        const response = await fetch(`http://localhost:8000/ELACO/table/getCurrentResevations`)
        if (!response.ok) throw new Error("Error in fetchingReservations")
        const resData = await response.json()
        setReservation(resData.data)
      } catch (err) {
        console.log(err)
      }
    }
    async function getAllTables() {
      try {
        const response = await fetch(`http://localhost:8000/ELACO/table/getAllTables`)
        if (!response.ok) throw new Error("Error in fetching Tables")
        const resData = await response.json()
      console.log(resData.data)
        setTables(resData.data.tables)
      } catch (err) {
        console.log(err)
      }
    }
    getCurrentReservations()
    getAllTables()
  }, [active])

  // ───── paint availability on any change ───────────────────────────────
  useEffect(() => {
    if (!reservations || reservations.length === 0) return;

    const fmtDate = dateStr => {
      const d = new Date(dateStr);
      return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
    };
    const selFmt = `${selectedDate.getFullYear()}-${selectedDate.getMonth()+1}-${selectedDate.getDate()}`;



    // conflict if same day AND times overlap
    const filteredRes = reservations.filter(res => {
      const sameDay = fmtDate(res.date) === selFmt;
      const overlap = res.check_in < endTime && startTime < res.check_out;
      return sameDay && overlap;
    });

    // green all
    document.querySelectorAll('[data-table]')
      .forEach(n => n.setAttribute('fill', '#d4edda'));

    // red the conflicts
    filteredRes.forEach(({ numTable }) => {
      const node = document.getElementById(numTable)
      if (node) node.setAttribute('fill', '#f8d7da')
    })
  }, [reservations, selectedDate, startTime, endTime]);

  function nn(){
    // setActive(false)
    console.log(active)
    setActive(prevActive => !prevActive)
  }

  const months = ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre']
  const days   = ['lu','ma','me','je','ve','sa','di']

  const getDaysInMonth   = (y,m) => new Date(y,m+1,0).getDate()
  const getFirstDayOfMonth = (y,m) => new Date(y,m,1).getDay() || 7

  const generateCalendar = () => {
    const total = []
    const first = getFirstDayOfMonth(currentYear, currentMonth)
    for (let i=1; i<first; i++) total.push(null)
    for (let d=1; d<=getDaysInMonth(currentYear, currentMonth); d++) {
      total.push(d)
    }
    return total
  }

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear+1)
    } else {
      setCurrentMonth(currentMonth+1)
    }
  }
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear-1)
    } else {
      setCurrentMonth(currentMonth-1)
    }
  }

  const handleDateSelect = day => {
    if (!day) return
    const newDate = new Date(currentYear, currentMonth, day)
    setSelectedDate(newDate)

    const today = new Date().toDateString()
    if (newDate.toDateString() === today) {
      // if today, snap to next half-hour +1h
      const now = DateTime.now().setZone('Africa/Tunis');
      const delta = (30 - (now.minute % 30)) % 30;
      const nextHalf = now.plus({ minutes: delta });
      const start = nextHalf.toFormat('HH:mm');
      const endDT = nextHalf.plus({ hours: 1 });
      const end   = endDT.toFormat('HH:mm');
      setStartTime(start)
      setEndTime(end)
    } else {
      setStartTime('08:00')
      setEndTime('09:00')
    }
  }

  const formatDate = date =>
    `${date.getDate()} ${months[date.getMonth()].substring(0,3)} ${date.getFullYear()}`

  const applyDateSelection = () => setShowDatePicker(false)
  const toggleDatePicker  = () => setShowDatePicker(v => !v)

  function selectTable(id) {
    const found = tables.find(t => String(t.numTable) === String(id))
    if (!found) return console.error('no table', id)
    const todayRes = reservations.filter(r => r.numTable === found.numTable)
    setReservation1(todayRes)
    setSelectedTable(found)
    setIsModalOpen(true)
  }

  return (
    <div className=" w-full max-w-6xl mx-auto">
      
      <div className=" relative">
        <div
          className="border border-gray-300 rounded-lg p-3 flex items-center cursor-pointer bg-white shadow-sm"
          onClick={toggleDatePicker}
        >
          <svg className="w-5 h-5 mr-2 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
          </svg>
          <span className="text-blue-500 font-medium">
            Date: {selectedDate.getDate()}/{selectedDate.getMonth()+1}/{selectedDate.getFullYear()} {startTime} → {endTime}
          </span>
        </div>

        {showDatePicker && (
          <div className="absolute z-10 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-full md:w-auto">
            <h3 className="font-medium mb-4">Date</h3>
            <div className="flex gap-6">
              <div className="calendar-section">
                <div className="flex justify-between items-center mb-4">
                  <button onClick={prevMonth} className="p-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                    </svg>
                  </button>
                  <div>
                    <select value={months[currentMonth]} onChange={e => setCurrentMonth(months.indexOf(e.target.value))} className="mr-2 p-1 border-none bg-transparent">
                      {months.map((m,i)=><option key={m} value={m}>{m}</option>)}
                    </select>
                    <select value={currentYear} onChange={e=>setCurrentYear(+e.target.value)} className="p-1 border-none bg-transparent">
                      {[currentYear-1,currentYear,currentYear+1,currentYear+2].map(y=>(
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                  <button onClick={nextMonth} className="p-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {days.map(d=><div key={d} className="text-center text-sm text-gray-500 py-1">{d}</div>)}
                  {generateCalendar().map((day,i)=>(
                    <div
                      key={i}
                      className={`text-center py-2 cursor-pointer rounded ${
                        day &&
                        selectedDate.getDate() === day &&
                        selectedDate.getMonth() === currentMonth &&
                        selectedDate.getFullYear() === currentYear
                          ? 'bg-blue-500 text-white'
                          : day
                          ? 'hover:bg-gray-100'
                          : ''
                      }`}
                      onClick={()=>handleDateSelect(day)}
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </div>

              <div className="time-section">
                <div className="mb-4">
                  <h4 className="text-gray-500 mb-2">Check in</h4>
                  <div className="relative">
                    <select
                      value={startTime}
                      onChange={e => setStartTime(e.target.value)}
                      className="block w-full p-2 bg-gray-100 rounded border-none"
                    >
                      {timeSlots.map(t=>(
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-gray-500 mb-2">Check out</h4>
                  <div className="relative">
                    <select
                      value={endTime}
                      onChange={e => setEndTime(e.target.value)}
                      className="block w-full p-2 bg-gray-100 rounded border-none"
                    >
                      {timeSlots.filter(t=>t>startTime).map(t=>(
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={applyDateSelection}
              className="w-full mt-4 bg-blue-500 text-white py-3 px-4 rounded font-medium hover:bg-blue-600 transition-colors"
            >
              Appliquer
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex justify-center items-center border border-gray-200 rounded-lg p-4">
          <FloorPlanSVG onTableClick={selectTable}/>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded-sm mr-2"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded-sm mr-2"></div>
            <span>Reserved</span>
          </div>
        </div>


      </div>

      {isModalOpen && (
        <ReserveRoom
          isOpen1={isModalOpen}
          refresh={nn}
          onClose={() => setIsModalOpen(false)}
          room={selectedTable}
          initialTimeRange={{
            date: selectedDate,
            startTime,
            endTime,
          }}
          reservation1={reservation1}
          Datecalender={selectedDate}
        />
      )}
    </div>
  )
}