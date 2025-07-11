'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const sendContactForm = async (formData) => {
    const data = {
      email: formData.get('email'),
      Sujet: formData.get('subject'),
      Message: formData.get('message'),
      name: formData.get('name'),
      phoneNumber: formData.get('phoneNumber'),
    };

    try {
      const response = await fetch('http://localhost:8000/ELACO/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Submission failed');
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);

    try {
      await sendContactForm(formData);
      toast.success('Message sent successfully!', { autoClose: 2000 });
      e.target.reset();
    } catch (err) {
      toast.error(err.message || 'Error sending message', { autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="text-center my-12">
        <p className="text-sm text-[#07ebbd] font-semibold">BE IN TOUCH</p>
        <h2 className="text-4xl font-extrabold text-gray-900 mt-2">Ask a Question</h2>
        <div className="flex justify-center my-2 space-x-1">
          <span className="w-1.5 h-1.5 bg-[#07ebbd] rounded-full"></span>
          <span className="w-1.5 h-1.5 bg-[#07ebbd]  rounded-full"></span>
          <span className="w-1.5 h-1.5 bg-[#07ebbd] rounded-full"></span>
        </div>
        <div className="text-gray-500 max-w-2xl mx-auto">
        <strong>Questions, bug reports, feedback, feature requests — we're here for it all.</strong>
  
      </div>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-6 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="bg-gray-100 p-4 w-full"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            className="bg-gray-100 p-4 w-full"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="subject"
            placeholder="subject"
            className="bg-gray-100 p-4 w-full"
            required
          />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="phone Number"
            className="bg-gray-100 p-4 w-full"
            required
          />
        </div>
        <textarea
          name="message"
          placeholder="Message"
          rows={6}
          className="bg-gray-100 p-4 w-full"
          required
        />
        <div className="flex items-start space-x-2 text-sm text-gray-600">
          <input type="checkbox" className="mt-1" required />
          <label>I agree that my submitted data is being collected and stored.</label>
        </div>
        <div className="text-center text-[#07ebbd]">
          <button
            type="submit"
            disabled={loading}
            className="bg-gray-400 hover:bg-gray-500 text-white tracking-widest font-semibold py-3 px-8"
          >
            {loading ? 'SENDING...' : 'SEND YOUR MESSAGE'}
          </button>
        </div>
      </motion.form>

      <ToastContainer position="top-right" />
    </>
  );
}
