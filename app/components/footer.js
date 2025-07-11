"use client";
import Link from "next/link";
import React from "react";
import Container from "./Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
     <footer className="text-white pt-12 pb-6" style={{ backgroundColor: "#000000" }}  >
      <Container>
        <div className="grid gap-10 md:grid-cols-3 border-t border-gray-700 pt-8">
          {/* Logo & Description */}
          <div>
            <Link href="/" className="text-2xl font-bold text-[#07ebbd] hover:text-[#07ebbd] transition-colors">
              Elaco Coworking Space
            </Link>
            <p className="text-gray-400 mt-4 text-sm leading-relaxed max-w-xs">
              A modern coworking space designed to fuel productivity and innovation in a professional environment.
            </p>
          </div>

          {/* Location */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Location</h4>
            <a
              href="https://www.google.com/maps/place/Elaco+Coworking+Space/@36.7079735,10.4186861,17z"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 text-gray-300 hover:text-white text-sm transition-colors"
            >
              <FontAwesomeIcon icon={faLocationDot} className="text-[#07ebbd] mt-1" />
              <span>
                1er Etage, Immeuble El Bassatine, Avenue Egypte, Borj Cédria 2084
              </span>
            </a>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Contact</h4>
            <p className="flex items-center gap-3 text-sm text-gray-300 mb-2">
              <FontAwesomeIcon icon={faPhone} className="text-[#07ebbd]" />
              +216 98 444 080
            </p>
            <p className="flex items-center gap-3 text-sm text-gray-300">
              <FontAwesomeIcon icon={faEnvelope} className="text-[#07ebbd]" />
              elacocoworking@gmail.com
            </p>
          </div>
        </div>

        {/* Embedded Map */}
        <div className="mt-10 rounded-xl overflow-hidden border border-gray-700 shadow-lg">
          <iframe
            title="Elaco Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3123.753217883383!2d10.417637115019402!3d36.7079208799647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd4f0bd383f93b%3A0xcd2fdd53f35bf116!2sElaco%20Coworking%20Space!5e0!3m2!1sfr!2stn!4v1712076973150!5m2!1sfr!2stn"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Footer Bottom */}
        <div className="text-center text-sm text-gray-500 mt-8 border-t border-gray-800 pt-6">
          &copy; {new Date().getFullYear()} Elaco Coworking Space. All rights reserved.
        </div>
      </Container>
    </footer>

  );
}
