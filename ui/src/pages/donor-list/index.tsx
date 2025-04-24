import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DonorTable } from "@/features/donor-list";
import { Link } from "react-router";

export default function DonorListPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-16 bg-gradient-to-b from-red-50 to-white">
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-red-600 mb-4">
              Available Blood Donors
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Find compatible blood donors in your area ready to help save lives
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="w-full py-8 bg-white border-b">
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by name or location"
                  className="pl-10"
                />
              </div>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Blood Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="a-positive">A+</SelectItem>
                  <SelectItem value="a-negative">A-</SelectItem>
                  <SelectItem value="b-positive">B+</SelectItem>
                  <SelectItem value="b-negative">B-</SelectItem>
                  <SelectItem value="ab-positive">AB+</SelectItem>
                  <SelectItem value="ab-negative">AB-</SelectItem>
                  <SelectItem value="o-positive">O+</SelectItem>
                  <SelectItem value="o-negative">O-</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  <SelectItem value="new-york">New York</SelectItem>
                  <SelectItem value="los-angeles">Los Angeles</SelectItem>
                  <SelectItem value="chicago">Chicago</SelectItem>
                  <SelectItem value="houston">Houston</SelectItem>
                  <SelectItem value="phoenix">Phoenix</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="available">Available Now</SelectItem>
                  <SelectItem value="unavailable">Not Available</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Donor Table Section */}
      <section className="w-full py-8 md:py-12 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <DonorTable />

            <div className="mt-8 text-center">
              <p className="text-gray-500 mb-4">
                Don't see a compatible donor? Register a blood request and we'll
                notify donors when they become available.
              </p>
              <Link to="register">
                <Button className="bg-red-600 hover:bg-red-700">
                  Request Blood
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Information Section */}
      <section className="w-full py-12 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold mb-4 text-red-600">
                  How to Contact a Donor
                </h3>
                <ol className="space-y-3 list-decimal list-inside text-gray-700">
                  <li>Register or log in to your Blood Bridge account</li>
                  <li>Create a blood request specifying your needs</li>
                  <li>Our system will notify compatible donors</li>
                  <li>
                    Donors will contact you through our secure messaging system
                  </li>
                  <li>Coordinate the donation time and location</li>
                </ol>
                <div className="mt-4">
                  <Link href="/register">
                    <Button
                      variant="outline"
                      className="border-red-600 text-red-600 hover:bg-red-50"
                    >
                      Create Account
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold mb-4 text-red-600">
                  Blood Donation Facts
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li>• One donation can save up to three lives</li>
                  <li>
                    • Blood cannot be manufactured – it can only come from
                    donors
                  </li>
                  <li>• The most common blood type is O+</li>
                  <li>• The rarest blood type is AB-</li>
                  <li>• A healthy donor can donate blood every 56 days</li>
                  <li>• The donation process takes about 10-15 minutes</li>
                </ul>
                <div className="mt-4">
                  <Link href="/how-it-works">
                    <Button
                      variant="outline"
                      className="border-red-600 text-red-600 hover:bg-red-50"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
