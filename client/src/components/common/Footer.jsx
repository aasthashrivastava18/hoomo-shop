import React from "react";
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-blue-50 border-t border-blue-100 mt-12 py-8 px-4 md:px-16 text-gray-700">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
        {/* Logo and tagline */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-2xl font-extrabold text-blue-600 tracking-wide">Hoomo</span>
          <span className="text-sm text-gray-500">India's Smartest Shopping Platform</span>
        </div>
        {/* Quick Links */}
        <div className="flex flex-col gap-2 items-center">
          <span className="font-semibold mb-1">Quick Links</span>
          <a href="#" className="hover:text-blue-600 transition">About</a>
          <a href="#" className="hover:text-blue-600 transition">Contact</a>
          <a href="#" className="hover:text-blue-600 transition">Privacy Policy</a>
          <a href="#" className="hover:text-blue-600 transition">Terms of Service</a>
        </div>
        {/* Social & Contact */}
        <div className="flex flex-col gap-2 items-center md:items-end">
          <span className="font-semibold mb-1">Connect</span>
          <div className="flex gap-4 mb-2">
            <a href="#" className="text-blue-600 hover:text-blue-800 transition"><FaInstagram size={22} /></a>
            <a href="#" className="text-blue-600 hover:text-blue-800 transition"><FaFacebookF size={22} /></a>
            <a href="#" className="text-blue-600 hover:text-blue-800 transition"><FaTwitter size={22} /></a>
            <a href="#" className="text-blue-600 hover:text-blue-800 transition"><FaLinkedinIn size={22} /></a>
          </div>
          <span className="text-sm">Email: support@hoomo.in</span>
          <span className="text-sm">Phone: +91-9876543210</span>
        </div>
      </div>
      <div className="text-center text-xs text-gray-400 mt-8">© {new Date().getFullYear()} Hoomo. All rights reserved.</div>
    </footer>
  );
} 