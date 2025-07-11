// "use client";
// import { useRef, useState, useEffect } from "react";
// // import { Input } from "@/components/ui/input";
// import axios from "axios";
// import { updateUser } from "./action";
// import { useUser } from "@/app/context/UserContext"     // Adjust path based on your structure

// export default function PublicProfileSettings() {
//   const fileInputRef = useRef(null);
//   const [file, setFile] = useState(null);
//   const [previewImage, setPreviewImage] = useState("avatar.png");
//   const [user, setUser] = useState(null);
//   const { idUser, loading: userLoading } = useUser();


//   useEffect(() => {
//     if (!idUser) return;

//     async function getUserData() {
//       try {
//         const response = await fetch(
//           `http://localhost:8000/ELACO/${idUser}`
//         );

//         if (!response.ok) {
//           throw Error(`The error ${response.statusText}`);
//         }

//         const data = await response.json();
//         setUser(data.user);
//         setPreviewImage(
//           data?.user?.photo
//             ?` http://localhost:8000/images/${data.user.photo}`
//             : "/image.png"
//         );
//       } catch (err) {
//         console.log(err);
//       }
//     }

//     getUserData();
//   }, [idUser]);

//   const handleImageChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//       setPreviewImage(URL.createObjectURL(selectedFile));
//     }
//   };

//   async function handleFormSubmit(formData) {
//     // Upload user details
//     await updateUser(formData, idUser, setUser);

//     // If a new image was selected, upload it
//     if (file) {
//       const formDataImage = new FormData();
//       formDataImage.append("file", file);

//       try {
//         const res = await axios.patch(
//           `http://localhost:8000/uplaod/${idUser}`,
//           formDataImage
//         );
//         setPreviewImage(`http://localhost:8000/images/${res.data.userImage}`);
//       } catch (err) {
//         console.error(err);
//       }
//     }
//   }

//   if (user === null) {
//     return <p>loading</p>;
//   }

//   return (
//     <div className="bg-white w-full flex flex-col px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
//       <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block bg-[#ffffff]"></aside>

//       <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4 bg-[#ffffff]">
//         <div className="p-2 md:p-4">
//           <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
//             <h2 className="pl-6 text-2xl font-bold sm:text-xl">
//               Public Profile
//             </h2>

//             <div className="grid max-w-2xl mx-auto mt-8">
//               <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
//                 <div className="flex flex-col items-center space-y-5">
//                   <img
//                     className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
//                     src={previewImage}
//                     alt="Bordered avatar"
//                   />
//                 </div>

//                 <div className="flex flex-col space-y-5 sm:ml-8">
//                   <button
//                     type="button"
//                     onClick={() => fileInputRef.current.click()}
//                     className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200"
//                   >
//                     Change Picture
//                   </button>

//                   <input
//                     type="file"
//                     ref={fileInputRef}
//                     className="hidden"
//                     onChange={handleImageChange}
//                   />
//                 </div>
//               </div>

//               <form
//                 className="items-center mt-8 sm:mt-14 text-[#161931]"
//                 action={handleFormSubmit}
//               >
//                 <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
//                   <div className="w-full">
//                     <label
//                       htmlFor="first_name"
//                       className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
//                     >
//                       Your first name
//                     </label>
//                     <input
//                       type="text"
//                       id="first_name"
//                       className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
//                       placeholder="Your first name"
//                       defaultValue={user.firstName}
//                       name="firstName"
//                       required
//                     />
//                   </div>

//                   <div className="w-full">
//                     <label
//                       htmlFor="last_name"
//                       className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
//                     >
//                       Your last name
//                     </label>
//                     <input
//                       type="text"
//                       id="last_name"
//                       className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
//                       placeholder="Your last name"
//                       defaultValue={user.lastName}
//                       name="lastName"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="mb-2 sm:mb-6">
//                   <label
//                     htmlFor="phone"
//                     className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
//                   >
//                     Your phone number
//                   </label>
//                   <input
//                     type="number"
//                     id="phone"
//                     className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
//                     defaultValue={user.phone}
//                     name="phone"
//                     required
//                   />
//                 </div>

//                 <div className="mb-2 sm:mb-6">
//                   <label
//                     htmlFor="email"
//                     className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
//                   >
//                     Your email
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
//                     defaultValue={user.email}
//                     disabled
//                     name="email"
//                     required
//                   />
//                 </div>

//                 <div className="flex justify-end">
//                   <button
//                     type="submit"
//                     className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
//                   >
//                     Save
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
// "use client";
// import { useRef, useState, useEffect } from "react";
// import axios from "axios";
// import { updateUser } from "./action";
// import { useUser } from "@/app/context/UserContext";
// import { motion } from "framer-motion";
// import { 
//   Camera, 
//   User, 
//   Phone, 
//   Mail, 
//   Save, 
//   Loader2
// } from "lucide-react";

// export default function PublicProfileSettings() {
//   const fileInputRef = useRef(null);
//   const [file, setFile] = useState(null);
//   const [previewImage, setPreviewImage] = useState("avatar.png");
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [saveSuccess, setSaveSuccess] = useState(false);
//   const { idUser } = useUser();

//   useEffect(() => {
//     if (!idUser) return;

//     async function getUserData() {
//       try {
//         const response = await fetch(
//           `http://localhost:8000/ELACO/${idUser}`
//         );

//         if (!response.ok) {
//           throw Error(`The error ${response.statusText}`);
//         }

//         const data = await response.json();
//         setUser(data.user);
//         setPreviewImage(
//           data?.user?.photo
//             ? `http://localhost:8000/images/${data.user.photo}`
//             : "/image.png"
//         );
//       } catch (err) {
//         console.log(err);
//       }
//     }

//     getUserData();
//   }, [idUser]);

//   const handleImageChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//       setPreviewImage(URL.createObjectURL(selectedFile));
//     }
//   };

//   async function handleFormSubmit(formData) {
//     setLoading(true);
//     try {
//       // Upload user details
//       await updateUser(formData, idUser, setUser);

//       // If a new image was selected, upload it
//       if (file) {
//         const formDataImage = new FormData();
//         formDataImage.append("file", file);

//         const res = await axios.patch(
//           `http://localhost:8000/uplaod/${idUser}`,
//           formDataImage
//         );
//         setPreviewImage(`http://localhost:8000/images/${res.data.userImage}`);
//       }
      
//       // Show success message
//       setSaveSuccess(true);
//       setTimeout(() => setSaveSuccess(false), 3000);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   if (user === null) {
//     return (
//       <div className="flex items-center justify-center min-h-screen ">
//         <div className="flex flex-col items-center">
//           <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
//           <p className="mt-4 text-lg font-medium text-indigo-800">Loading your profile...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen">
//       <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="bg-white rounded-2xl shadow-xl overflow-hidden"
//         >
//           <div className="px-6 py-8 sm:p-10">
//             <div className="flex items-center justify-between mb-8">
//               <h2 className="text-2xl font-bold text-indigo-900">Profile Settings</h2>
//               {saveSuccess && (
//                 <motion.div
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   className="px-4 py-2 bg-green-100 text-green-800 rounded-lg flex items-center"
//                 >
//                   <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                   </svg>
//                   Changes saved successfully
//                 </motion.div>
//               )}
//             </div>

//             <div className="flex flex-col md:flex-row gap-12">
//               {/* Profile Image Section */}
//               <motion.div 
//                 whileHover={{ scale: 1.02 }}
//                 className="flex flex-col items-center space-y-6"
//               >
//                 <div className="relative group">
//                   <div className="absolute inset-0 bg-indigo-600 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
//                   <motion.div 
//                     whileHover={{ rotate: 5 }}
//                     transition={{ type: "spring", stiffness: 300 }}
//                   >
//                     <img
//                       className="object-cover w-48 h-48 rounded-full ring-4 ring-indigo-100 shadow-lg"
//                       src={previewImage}
//                       alt="Profile avatar"
//                     />
//                   </motion.div>
//                   <div 
//                     className="absolute bottom-2 right-2 bg-indigo-600 p-2 rounded-full shadow-lg cursor-pointer hover:bg-indigo-700 transition-colors duration-300"
//                     onClick={() => fileInputRef.current.click()}
//                   >
//                     <Camera className="w-5 h-5 text-white" />
//                   </div>
//                 </div>
//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   className="hidden"
//                   onChange={handleImageChange}
//                   accept="image/*"
//                 />
//                 <p className="text-sm text-gray-500">Click on the camera icon to change your profile picture</p>
//               </motion.div>

//               {/* Form Section */}
//               <div className="flex-1">
//                 <form
//                   className="space-y-6"
//                   action={handleFormSubmit}
//                 >
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <motion.div 
//                       whileHover={{ y: -2 }}
//                       className="space-y-2"
//                     >
//                       <label
//                         htmlFor="first_name"
//                         className="flex items-center text-sm font-medium text-gray-700"
//                       >
//                         <User className="w-4 h-4 mr-2 text-indigo-600" />
//                         First Name
//                       </label>
//                       <input
//                         type="text"
//                         id="first_name"
//                         className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
//                         placeholder="Your first name"
//                         defaultValue={user.firstName}
//                         name="firstName"
//                         required
//                       />
//                     </motion.div>

//                     <motion.div 
//                       whileHover={{ y: -2 }}
//                       className="space-y-2"
//                     >
//                       <label
//                         htmlFor="last_name"
//                         className="flex items-center text-sm font-medium text-gray-700"
//                       >
//                         <User className="w-4 h-4 mr-2 text-indigo-600" />
//                         Last Name
//                       </label>
//                       <input
//                         type="text"
//                         id="last_name"
//                         className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
//                         placeholder="Your last name"
//                         defaultValue={user.lastName}
//                         name="lastName"
//                         required
//                       />
//                     </motion.div>
//                   </div>

//                   <motion.div 
//                     whileHover={{ y: -2 }}
//                     className="space-y-2"
//                   >
//                     <label
//                       htmlFor="phone"
//                       className="flex items-center text-sm font-medium text-gray-700"
//                     >
//                       <Phone className="w-4 h-4 mr-2 text-indigo-600" />
//                       Phone Number
//                     </label>
//                     <input
//                       type="tel"
//                       id="phone"
//                       className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
//                       placeholder="Your phone number"
//                       defaultValue={user.phone}
//                       name="phone"
//                       required
//                     />
//                   </motion.div>

//                   <motion.div 
//                     whileHover={{ y: -2 }}
//                     className="space-y-2"
//                   >
//                     <label
//                       htmlFor="email"
//                       className="flex items-center text-sm font-medium text-gray-700"
//                     >
//                       <Mail className="w-4 h-4 mr-2 text-indigo-600" />
//                       Email Address
//                     </label>
//                     <input
//                       type="email"
//                       id="email"
//                       className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
//                       defaultValue={user.email}
//                       disabled
//                       name="email"
//                     />
//                     <p className="text-xs text-gray-500">Email cannot be changed</p>
//                   </motion.div>

//                   <div className="pt-4">
//                     <motion.button
//                       type="submit"
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       disabled={loading}
//                       className={`w-full md:w-auto px-8 py-3 flex items-center justify-center rounded-lg ${
//                         loading 
//                           ? "bg-indigo-400 cursor-not-allowed" 
//                           : "bg-indigo-600 hover:bg-indigo-700"
//                       } text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl`}
//                     >
//                       {loading ? (
//                         <>
//                           <Loader2 className="w-5 h-5 mr-2 animate-spin" />
//                           Saving...
//                         </>
//                       ) : (
//                         <>
//                           <Save className="w-5 h-5 mr-2" />
//                           Save Changes
//                         </>
//                       )}
//                     </motion.button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }
"use client";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { updateUser } from "./action";
import { useUser } from "@/app/context/UserContext";
import { motion } from "framer-motion";
import {
  Camera,
  User,
  Phone,
  Mail,
  Save,
  Loader2,
} from "lucide-react";

export default function PublicProfileSettings() {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("avatar.png");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const { idUser } = useUser();

  useEffect(() => {
    if (!idUser) return;

    async function getUserData() {
      try {
        const response = await fetch(`http://localhost:8000/ELACO/${idUser}`);
        if (!response.ok) {
          throw Error(`The error ${response.statusText}`);
        }

        const data = await response.json();
        setUser(data.user);
        setPreviewImage(
          data?.user?.photo
            ? `http://localhost:8000/images/${data.user.photo}`
            : "/image.png"
        );
      } catch (err) {
        console.log(err);
      }
    }

    getUserData();
  }, [idUser]);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewImage(URL.createObjectURL(selectedFile));
    }
  };

  async function handleFormSubmit(formData) {
    setLoading(true);
    try {
      await updateUser(formData, idUser, setUser);
      if (file) {
        const formDataImage = new FormData();
        formDataImage.append("file", file);

        const res = await axios.patch(
          `http://localhost:8000/uplaod/${idUser}`,
          formDataImage
        );
        setPreviewImage(`http://localhost:8000/images/${res.data.userImage}`);
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (user === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <Loader2 className="w-12 h-12 text-black animate-spin" />
          <p className="mt-4 text-lg font-medium text-black">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="px-6 py-8 sm:p-10">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-black">
                Profile Settings
              </h2>
              {saveSuccess && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="px-4 py-2 bg-green-100 text-green-800 rounded-lg flex items-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Changes saved successfully
                </motion.div>
              )}
            </div>

            <div className="flex flex-col md:flex-row gap-12">
              {/* Profile Image */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex flex-col items-center space-y-6"
              >
                <div className="relative group">
                  <div className="absolute inset-0 bg-black rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <motion.div
                    whileHover={{ rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img
                      className="object-cover w-48 h-48 rounded-full ring-4 ring-gray-200 shadow-lg"
                      src={previewImage}
                      alt="Profile avatar"
                    />
                  </motion.div>
                  <div
                    className="absolute bottom-2 right-2 bg-black p-2 rounded-full shadow-lg cursor-pointer hover:bg-[#07ebbd] transition-colors duration-300"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleImageChange}
                  accept="image/*"
                />
                <p className="text-sm text-gray-500">
                  Click the camera icon to change your profile picture
                </p>
              </motion.div>

              {/* Form Section */}
              <div className="flex-1">
                <form className="space-y-6" action={handleFormSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div whileHover={{ y: -2 }} className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-gray-700">
                        <User className="w-4 h-4 mr-2 text-black" />
                        First Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#07ebbd] focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                        placeholder="Your first name"
                        defaultValue={user.firstName}
                        name="firstName"
                        required
                      />
                    </motion.div>

                    <motion.div whileHover={{ y: -2 }} className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-gray-700">
                        <User className="w-4 h-4 mr-2 text-black" />
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#07ebbd] focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                        placeholder="Your last name"
                        defaultValue={user.lastName}
                        name="lastName"
                        required
                      />
                    </motion.div>
                  </div>

                  <motion.div whileHover={{ y: -2 }} className="space-y-2">
                    <label className="flex items-center text-sm font-medium text-gray-700">
                      <Phone className="w-4 h-4 mr-2 text-black" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#07ebbd] focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                      placeholder="Your phone number"
                      defaultValue={user.phone}
                      name="phone"
                      required
                    />
                  </motion.div>

                  <motion.div whileHover={{ y: -2 }} className="space-y-2">
                    <label className="flex items-center text-sm font-medium text-gray-700">
                      <Mail className="w-4 h-4 mr-2 text-black" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                      defaultValue={user.email}
                      disabled
                      name="email"
                    />
                    <p className="text-xs text-gray-500">
                      Email cannot be changed
                    </p>
                  </motion.div>

                  <div className="pt-4">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={loading}
                      className={`w-full md:w-auto px-8 py-3 flex items-center justify-center rounded-lg ${
                        loading
                          ? "bg-gray-500 cursor-not-allowed"
                          : "bg-black hover:bg-[#07ebbd]"
                      } text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl`}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5 mr-2" />
                          Save Changes
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
