"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router";
import { motion } from "framer-motion";

export function HowItWorks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white to-red-50">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-red-600 sm:text-4xl md:text-5xl mb-4">
            How Blood Bridge Works
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 text-lg md:text-xl">
            Our platform creates a seamless connection between blood donors and
            those in need
          </p>
        </motion.div>

        {/* First section - Donors */}
        <div className="grid items-stretch gap-8 py-12 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <motion.div
            className="order-1 h-full flex flex-col"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent z-10"></div>
              <img
                src="/placeholder.svg?height=400&width=600"
                width={600}
                height={400}
                alt="Blood donor"
                className="w-full h-auto aspect-video object-cover"
              />
            </div>
          </motion.div>
          <motion.div
            className="order-2 space-y-6 lg:space-y-8 h-full flex flex-col"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2
              className="text-2xl font-bold text-red-600 sm:text-3xl md:text-4xl"
              variants={itemVariants}
            >
              For Blood Donors
            </motion.h2>
            <ul className="space-y-4 md:space-y-6 flex-grow">
              {[
                "Create a donor profile with your blood type and location",
                "Set your availability status to indicate when you're ready to donate",
                "Receive instant notifications when someone needs your blood type",
                "Accept requests that match your schedule and location",
                "Connect directly with the requester through our secure platform",
                "Track your donation history and see the lives you've impacted",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3"
                  variants={itemVariants}
                >
                  <CheckCircle className="flex-shrink-0 h-5 w-5 text-red-600 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </motion.li>
              ))}
            </ul>

            <motion.div variants={itemVariants}>
              <Link to="/donor-form">
                <Button className="bg-red-600 hover:bg-red-700 mt-4">
                  Become a Donor
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Second section - Recipients */}
        <div className="grid items-stretch gap-8 py-12 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <motion.div
            className="order-2 lg:order-1 space-y-6 lg:space-y-8 h-full flex flex-col"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2
              className="text-2xl font-bold text-red-600 sm:text-3xl md:text-4xl"
              variants={itemVariants}
            >
              For Those in Need
            </motion.h2>
            <ul className="space-y-4 md:space-y-6 flex-grow">
              {[
                "Create a request specifying blood type, quantity needed, and urgency level",
                "Our system immediately notifies compatible donors in your area",
                "Track the status of your request in real-time through our dashboard",
                "Communicate directly with donors who accept your request",
                "Schedule donation appointments through our platform",
                "Express gratitude and share your story with donors",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3"
                  variants={itemVariants}
                >
                  <CheckCircle className="flex-shrink-0 h-5 w-5 text-red-600 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </motion.li>
              ))}
            </ul>

            <motion.div variants={itemVariants}>
              <Link to="/request-blood">
                <Button className="bg-red-600 hover:bg-red-700 mt-4">
                  Request Blood
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="order-1 lg:order-2 h-full flex flex-col"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-l from-red-600/20 to-transparent z-10"></div>
              <img
                src="/placeholder.svg?height=400&width=600"
                width={600}
                height={400}
                alt="Blood recipient"
                className="w-full h-auto aspect-video object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* The Connection Process */}
        <motion.div
          className="mt-16 py-12 px-6 md:px-10 bg-white rounded-2xl shadow-lg border border-red-100"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-red-600 text-center mb-8">
            The Connection Process
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Request Creation",
                description:
                  "A person in need creates a blood request specifying blood type, location, and urgency.",
              },
              {
                step: "2",
                title: "Donor Matching",
                description:
                  "Our system instantly notifies compatible donors in the same area about the request.",
              },
              {
                step: "3",
                title: "Life-Saving Connection",
                description:
                  "Donors respond to the request, and our platform facilitates the life-saving connection.",
              },
            ].map((process, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center text-xl font-bold mb-4">
                  {process.step}
                </div>
                <h4 className="text-xl font-semibold mb-2">{process.title}</h4>
                <p className="text-gray-600">{process.description}</p>
                {index < 2 && (
                  <div className="hidden md:block h-0.5 w-16 bg-red-200 absolute right-[-8px] top-[24px] transform translate-x-full">
                    <div className="h-2 w-2 rounded-full bg-red-600 absolute right-0 top-[-3px]"></div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="max-w-3xl mx-auto py-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-6">
            <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">
              Ready to Save Lives?
            </h2>
            <p className="text-gray-600 text-lg md:text-xl">
              Every donation can save up to three lives. By becoming a blood
              donor, you join a community of heroes who make a real difference
              in emergency situations.
            </p>
            <p className="text-gray-600 text-lg md:text-xl">
              Our platform makes it easy to connect with those in need, receive
              notifications when your blood type is needed, and track the impact
              of your donations.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link to="/donor-form">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="bg-red-600 hover:bg-red-700 px-8 py-6 text-lg">
                    Become a Donor Today
                  </Button>
                </motion.div>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
