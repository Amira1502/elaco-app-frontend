
import ContactForm from './form'; // adjust path if needed
import { Mail, MapPin, Phone } from 'lucide-react';
import Image from "next/image";
import Navbar from '../components/navbar';

export default function ContactPage() {
  return (
    <div className="w-full">
      <Navbar/>
      <section className="relative w-full bg-white">
        <div className="relative h-[70vh] flex items-center overflow-hidden ">
          <Image
            src="/coo.jpg"
            alt="Coworking background"
            width={1600}
            height={900}
            className="absolute inset-0 w-full h-full bla object-cover object-center"
            priority
          />
          <div className="absolute inset-0  bg-opacity-60"></div>

          <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-20">
            <h1 className="text-black  text-5xl font-extrabold mb-4">Contact Us</h1>
            <p className="text-white text-lg">
              <span className="text-[#07ebbd]">HOME</span> / CONTACT US
            </p>
          </div>
        </div>
      </section>
      <section className="bg-black py-16 px-6 sm:px-20 text-white " style={{ backgroundColor: "#000000" }}>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
    {/* Phone */}
    <div className="flex flex-col items-center gap-4">
      <Phone className="w-12 h-12 text-white" strokeWidth={2} />
      <p className="font-bold text-lg">+216 98 444 080</p>
    </div>

    {/* Address */}
    <div className="flex flex-col items-center gap-4">
      <MapPin className="w-12 h-12 text-white" strokeWidth={2} />
      <p className="font-bold text-lg">
        1er Etage, Immeuble El Bassatine <br />
        Avenue Egypte, Borj Cédria 2084
      </p>
    </div>

    {/* Email */}
    <div className="flex flex-col items-center gap-4">
      <Mail className="w-12 h-12 text-white" strokeWidth={2} />
      <p className="font-bold text-lg">elacocoworking@gmail.com</p>
    </div>
  </div>
</section>



      {/* Contact Form */}
      <section className="py-16 bg-white px-6 sm:px-20">
        <div className="max-w-3xl mx-auto">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
