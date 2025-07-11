// // 'use client';

// // import React, { useEffect, useState } from "react";
// // import {
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableHeader,
// //   TableRow,
// // } from "../ui/table";
// // import Badge from "../ui/badge/Badge";
// // import { useUser } from "@/app/context/UserContext";

// // export default function ReservationTable() {
// //   const [reservations, setReservations] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const { idUser, loading: userLoading } = useUser();

// //   useEffect(() => {
// //     async function fetchReservations() {
// //       try {
// //         const response = await fetch(
// //           `http://localhost:8000/ELACO/booking/getReservationById/${idUser}`
// //         );

// //         if (!response.ok) {
// //           throw new Error(`Failed to fetch reservations: ${response.statusText}`);
// //         }

// //         const data = await response.json();
// //         console.log(data)

// //         setReservations(data?.data || []);
// //         console.log("Fetched reservations:", data?.data?.reservations);
// //       } catch (error) {
// //         console.error("Error fetching reservations:", error);
// //         setError(error.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     }

// //     if (idUser) {
// //       fetchReservations();
// //     }
// //   }, [idUser]);

// //   if (loading || userLoading) {
// //     return <div className="p-4">Loading reservations...</div>;
// //   }

// //   if (error) {
// //     return <div className="p-4 text-red-500">Error: {error}</div>;
// //   }

// //   if (reservations.length === 0) {
// //     return <div className="p-4">No reservations available</div>;
// //   }

// //   return (
// //     <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
// //       <div className="max-w-full overflow-x-auto">
// //         <div className="min-w-[1000px]">
// //           <Table>
// //             <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
// //               <TableRow>
// //                 <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">ID</TableCell>
// //                 <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">Date</TableCell>
// //                 <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">Check-in</TableCell>
// //                 <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">Check-out</TableCell>
// //                 <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">Table</TableCell>
// //                 <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">Price</TableCell>
// //                 <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">Payment</TableCell>
// //                 <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500 dark:text-gray-400">Status</TableCell>
// //               </TableRow>
// //             </TableHeader>

// //             <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
// //               {reservations.map((reservation) => (
// //                 <TableRow key={reservation._id}>
// //                   <TableCell className="px-5 py-4 text-theme-sm text-gray-800 dark:text-white/90">
// //                     {reservation._id}
// //                   </TableCell>
// //                   <TableCell className="px-5 py-4 text-theme-sm text-gray-500 dark:text-gray-400">
// //                     {reservation.date?.substring(0, 10)}
// //                   </TableCell>
// //                   <TableCell className="px-5 py-4 text-theme-sm text-gray-500 dark:text-gray-400">
// //                     {reservation.check_in}
// //                   </TableCell>
// //                   <TableCell className="px-5 py-4 text-theme-sm text-gray-500 dark:text-gray-400">
// //                     {reservation.check_out}
// //                   </TableCell>
// //                   <TableCell className="px-5 py-4 text-theme-sm text-gray-500 dark:text-gray-400">
// //                     {reservation.numTable}
// //                   </TableCell>
// //                   <TableCell className="px-5 py-4 text-theme-sm text-gray-500 dark:text-gray-400">
// //                     {reservation.price} TND
// //                   </TableCell>
// //                   <TableCell className="px-5 py-4 text-theme-sm text-gray-500 dark:text-gray-400">
// //                     {reservation.paymentMethod}
// //                   </TableCell>
// //                   <TableCell className="px-5 py-4 text-theme-sm">
// //                     <Badge
// //                       size="md"
// //                       color={
// //                         reservation.status === "completed"
// //                           ? "success"
// //                           : reservation.status === "cancelled"
// //                           ? "error"
// //                           : "warning"
// //                       }
// //                     >
// //                       {reservation.status}
// //                     </Badge>
// //                   </TableCell>
// //                 </TableRow>
// //               ))}
// //             </TableBody>
// //           </Table>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// 'use client';

// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import Badge from "../ui/badge/Badge";
// import { useUser } from "@/app/context/UserContext";
// import { Button } from "../ui/button";

// export default function ReservationTable() {
//   const [reservations, setReservations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { idUser, loading: userLoading } = useUser();

//   useEffect(() => {
//     async function fetchReservations() {
//       try {
//         const response = await fetch(
//           `http://localhost:8000/ELACO/booking/getReservationById/${idUser}`
//         );
//         if (!response.ok) {
//           throw new Error(`Failed to fetch reservations: ${response.statusText}`);
//         }

//         const data = await response.json();
//         setReservations(data?.data || []);
//       } catch (error) {
//         console.error("Error fetching reservations:", error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     }

//     if (idUser) {
//       fetchReservations();
//     }
//   }, [idUser]);

//   // Cancel reservation
//   async function cancelReservation(reservationId) {
//     try {
//       const response = await fetch(
//         `http://localhost:8000/ELACO/reservation/cancel/${reservationId}`,
//         {
//           method: "PUT", // Or POST/DELETE depending on your API
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to cancel reservation");
//       }

//       // Refresh data after cancel
//       setReservations((prev) =>
//         prev.map((res) =>
//           res._id === reservationId ? { ...res, status: "cancelled" } : res
//         )
//       );
//     } catch (error) {
//       console.error("Error cancelling reservation:", error);
//     }
//   }

//   if (loading || userLoading) return <div className="p-4">Loading reservations...</div>;
//   if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
//   if (reservations.length === 0) return <div className="p-4">No reservations available</div>;

//   return (
//     <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
//       <div className="max-w-full overflow-x-auto">
//         <div className="min-w-[1000px]">
//           <Table>
//             <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
//               <TableRow>
//                 <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500">ID</TableCell>
//                 <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500">Date</TableCell>
//                 <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500">Check-in</TableCell>
//                 <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500">Check-out</TableCell>
//                 <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500">Table</TableCell>
//                 <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500">Price</TableCell>
//                 <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500">Payment</TableCell>
//                 <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500">Status</TableCell>
//                 <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500">Action</TableCell>
//               </TableRow>
//             </TableHeader>

//             <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
//               {reservations.map((reservation) => (
//                 <TableRow key={reservation._id}>
//                   <TableCell className="px-5 py-4 text-theme-sm text-gray-800">
//                     {reservation._id}
//                   </TableCell>
//                   <TableCell className="px-5 py-4 text-theme-sm text-gray-500">
//                     {reservation.date?.substring(0, 10)}
//                   </TableCell>
//                   <TableCell className="px-5 py-4 text-theme-sm text-gray-500">
//                     {reservation.check_in}
//                   </TableCell>
//                   <TableCell className="px-5 py-4 text-theme-sm text-gray-500">
//                     {reservation.check_out}
//                   </TableCell>
//                   <TableCell className="px-5 py-4 text-theme-sm text-gray-500">
//                     {reservation.numTable}
//                   </TableCell>
//                   <TableCell className="px-5 py-4 text-theme-sm text-gray-500">
//                     {reservation.price} TND
//                   </TableCell>
//                   <TableCell className="px-5 py-4 text-theme-sm text-gray-500">
//                     {reservation.paymentMethod}
//                   </TableCell>
//                   <TableCell className="px-5 py-4 text-theme-sm">
//                     <Badge
//                       size="md"
//                       color={
//                         reservation.status === "completed"
//                           ? "success"
//                           : reservation.status === "pending"
//                           ? "warning"
//                           : "error"
//                       }
//                     >
//                       {reservation.status}
//                     </Badge>
//                   </TableCell>
//                   <TableCell className="px-5 py-4 ">
//                     {reservation.status === "pending" && (
//                       <Button
//                         variant="destructive"
//                         className="bg-gray-800"
//                         size="sm"
//                         onClick={() => cancelReservation(reservation._id)}
//                       >
//                         Cancel
//                       </Button>
//                     )}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       </div>
//     </div>
//   );
// }
// 'use client';

// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import Badge from "../ui/badge/Badge";
// import { useUser } from "@/app/context/UserContext";
// import { Button } from "../ui/button";

// export default function ReservationTable() {
//   const [reservations, setReservations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { idUser, loading: userLoading } = useUser();

//   useEffect(() => {
//     async function fetchReservations() {
//       try {
//         const response = await fetch(
//           `http://localhost:8000/ELACO/booking/getReservationById/${idUser}`
//         );
//         if (!response.ok) {
//           throw new Error(`Failed to fetch reservations: ${response.statusText}`);
//         }

//         const data = await response.json();
//         const reservationsData = data?.data || [];
        
//         // Sort reservations by date (newest first)
//         const sortedReservations = reservationsData.sort((a, b) => {
//           const dateA = new Date(a.date);
//           const dateB = new Date(b.date);
//           return dateB - dateA; // Descending order (newest first)
//         });
        
//         setReservations(sortedReservations);
//       } catch (error) {
//         console.error("Error fetching reservations:", error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     }

//     if (idUser) {
//       fetchReservations();
//     }
//   }, [idUser]);

//   // Cancel reservation
//   async function cancelReservation(reservationId) {
//     try {
//       const response = await fetch(
//         `http://localhost:8000/ELACO/reservation/cancel/${reservationId}`,
//         {
//           method: "PUT", // Or POST/DELETE depending on your API
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to cancel reservation");
//       }

//       // Refresh data after cancel and maintain sorting
//       setReservations((prev) => {
//         const updatedReservations = prev.map((res) =>
//           res._id === reservationId ? { ...res, status: "cancelled" } : res
//         );
        
//         // Re-sort to maintain newest first order
//         return updatedReservations.sort((a, b) => {
//           const dateA = new Date(a.date);
//           const dateB = new Date(b.date);
//           return dateB - dateA;
//         });
//       });
//     } catch (error) {
//       console.error("Error cancelling reservation:", error);
//     }
//   }

//   if (loading || userLoading) return <div className="p-4">Loading reservations...</div>;
//   if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
//   if (reservations.length === 0) return <div className="p-4">No reservations available</div>;

//   return (
//     <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
//       <div className="max-w-full overflow-x-auto">
//         <div className="min-w-[1000px]">
//           <Table>
//             <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
//               <TableRow>
//                 <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500">ID</TableCell>
//                 <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500">Date</TableCell>
//                 <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500">Check-in</TableCell>
//                 <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500">Check-out</TableCell>
//                 <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500">Table</TableCell>
//                 <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500">Price</TableCell>
//                 <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500">Payment</TableCell>
//                 <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500">Status</TableCell>
//                 <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500">Action</TableCell>
//               </TableRow>
//             </TableHeader>

//             <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
//               {reservations.map((reservation) => (
//                 <TableRow key={reservation._id}>
//                   <TableCell className="px-5 py-4 text-theme-sm text-gray-800">
//                     {reservation._id}
//                   </TableCell>
//                   <TableCell className="px-5 py-4 text-theme-sm text-gray-500">
//                     {reservation.date?.substring(0, 10)}
//                   </TableCell>
//                   <TableCell className="px-5 py-4 text-theme-sm text-gray-500">
//                     {reservation.check_in}
//                   </TableCell>
//                   <TableCell className="px-5 py-4 text-theme-sm text-gray-500">
//                     {reservation.check_out}
//                   </TableCell>
//                   <TableCell className="px-5 py-4 text-theme-sm text-gray-500">
//                     {reservation.numTable}
//                   </TableCell>
//                   <TableCell className="px-5 py-4 text-theme-sm text-gray-500">
//                     {reservation.price} TND
//                   </TableCell>
//                   <TableCell className="px-5 py-4 text-theme-sm text-gray-500">
//                     {reservation.paymentMethod}
//                   </TableCell>
//                   <TableCell className="px-5 py-4 text-theme-sm">
//                     <Badge
//                       size="md"
//                       color={
//                         reservation.status === "completed"
//                           ? "success"
//                           : reservation.status === "pending"
//                           ? "warning"
//                           : "error"
//                       }
//                     >
//                       {reservation.status}
//                     </Badge>
//                   </TableCell>
//                   <TableCell className="px-5 py-4 ">
//                     {reservation.status === "pending" && (
//                       <Button
//                         variant="destructive"
//                         className="bg-gray-800"
//                         size="sm"
//                         onClick={() => cancelReservation(reservation._id)}
//                       >
//                         Cancel
//                       </Button>
//                     )}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       </div>
//     </div>
//   );
// }
'use client';

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { useUser } from "@/app/context/UserContext";
import { Button } from "../ui/button";

export default function ReservationTable() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { idUser, loading: userLoading } = useUser();

  useEffect(() => {
    async function fetchReservations() {
      try {
        const response = await fetch(
          `http://localhost:8000/ELACO/booking/getReservationById/${idUser}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch reservations: ${response.statusText}`);
        }

        const data = await response.json();
        const reservationsData = data?.data || [];
        
        // Sort reservations by creation order (newest added first)
        // Assuming the API returns them in creation order, we reverse to get newest first
        // Or if there's a createdAt field, use that instead
        const sortedReservations = reservationsData.reverse();
        
        setReservations(sortedReservations);
      } catch (error) {
        console.error("Error fetching reservations:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    if (idUser) {
      fetchReservations();
    }
  }, [idUser]);

  // Cancel reservation
  async function cancelReservation(reservationId) {
    try {
      const response = await fetch(
        `http://localhost:8000/ELACO/reservation/cancel/${reservationId}`,
        {
          method: "PUT", // Or POST/DELETE depending on your API
        }
      );

      if (!response.ok) {
        throw new Error("Failed to cancel reservation");
      }

      // Refresh data after cancel and maintain creation order
      setReservations((prev) => {
        const updatedReservations = prev.map((res) =>
          res._id === reservationId ? { ...res, status: "cancelled" } : res
        );
        
        // Keep the same order (newest added first)
        return updatedReservations;
      });
    } catch (error) {
      console.error("Error cancelling reservation:", error);
    }
  }

  if (loading || userLoading) return <div className="p-4">Loading reservations...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (reservations.length === 0) return <div className="p-4">No reservations available</div>;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1000px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500">ID</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500">Date</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500">Check-in</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500">Check-out</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500">Table</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500">Price</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500">Payment</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500">Status</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-start text-theme-xs text-gray-500">Action</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {reservations.map((reservation) => (
                <TableRow key={reservation._id}>
                  <TableCell className="px-5 py-4 text-theme-sm text-gray-800">
                    {reservation._id}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-theme-sm text-gray-500">
                    {reservation.date?.substring(0, 10)}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-theme-sm text-gray-500">
                    {reservation.check_in}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-theme-sm text-gray-500">
                    {reservation.check_out}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-theme-sm text-gray-500">
                    {reservation.numTable}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-theme-sm text-gray-500">
                    {reservation.price} TND
                  </TableCell>
                  <TableCell className="px-5 py-4 text-theme-sm text-gray-500">
                    {reservation.paymentMethod}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-theme-sm">
                    <Badge
                      size="md"
                      color={
                        reservation.status === "completed"
                          ? "success"
                          : reservation.status === "pending"
                          ? "warning"
                          : "error"
                      }
                    >
                      {reservation.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-5 py-4 ">
                    {reservation.status === "pending" && (
                      <Button
                        variant="destructive"
                        className="bg-gray-800"
                        size="sm"
                        onClick={() => cancelReservation(reservation._id)}
                      >
                        Cancel
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}