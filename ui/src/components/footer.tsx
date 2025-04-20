import {
  Droplet,
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="w-full border-t bg-white">
      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Droplet className="h-6 w-6 text-red-700" />
              <span className="text-xl font-bold">Blood Bridge</span>
            </Link>
            <p className="text-sm text-gray-500">
              Connecting blood donors with those in need, making the process
              simple and efficient.
            </p>
            <div className="flex space-x-4">
              <Link
                to="#"
                className="text-gray-500 hover:text-red-700 transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                to="#"
                className="text-gray-500 hover:text-red-700 transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                to="#"
                className="text-gray-500 hover:text-red-700 transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-gray-500 hover:text-red-700 transition-colors duration-200 text-sm md:text-base"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/how-it-works"
                  className="text-gray-500 hover:text-red-700 transition-colors duration-200 text-sm md:text-base"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-gray-500 hover:text-red-700 transition-colors duration-200 text-sm md:text-base"
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-gray-500 hover:text-red-700 transition-colors duration-200 text-sm md:text-base"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="#"
                  className="text-gray-500 hover:text-red-700 transition-colors duration-200 text-sm md:text-base"
                >
                  Blood Donation FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-500 hover:text-red-700 transition-colors duration-200 text-sm md:text-base"
                >
                  Blood Types Guide
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-500 hover:text-red-700 transition-colors duration-200 text-sm md:text-base"
                >
                  Donation Process
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-500 hover:text-red-700 transition-colors duration-200 text-sm md:text-base"
                >
                  Safety Information
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="h-5 w-5 text-red-700 mt-0.5 flex-shrink-0" />
                <span className="text-gray-500 text-sm md:text-base">
                  info@bloodbridge.com
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-5 w-5 text-red-700 mt-0.5 flex-shrink-0" />
                <span className="text-gray-500 text-sm md:text-base">
                  +92 300 1234567
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-gray-200 pt-6 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Blood Bridge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
