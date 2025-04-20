"use client";

import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/ui/animations/stagger-children";

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-red-700">
                Bridging Lives Through Blood Donation
              </h1>
              <p className="max-w-[600px] text-gray-600 md:text-xl">
                Connect with blood donors or request blood when you need it
                most. Our platform makes it easy to save lives.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link to="/register">
                <Button className="bg-red-700 hover:bg-red-800">
                  Join Blood Bridge
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  variant="outline"
                  className="border-red-700 text-red-700 hover:bg-red-50"
                >
                  Login
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[350px] w-[350px] rounded-full bg-red-100 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-[200px] w-[200px] rounded-full bg-red-700 flex items-center justify-center text-white text-5xl font-bold">
                  B+
                </div>
              </div>
              <div className="absolute top-[50%] left-[50%] h-[300px] w-[300px] -translate-x-[50%] -translate-y-[50%] rounded-full border-8 border-dashed border-red-300 animate-spin-slow" />
            </div>
          </div>
        </div>
        <StaggerChildren
          className="mt-12 grid gap-6 md:grid-cols-3"
          delayIncrement={0.15}
          initialDelay={0.3}
        >
          <StaggerItem>
            <div className="h-full rounded-lg border bg-card p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="flex flex-col items-center space-y-4 text-center flex-grow">
                <motion.div
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-700"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </motion.div>
                <h3 className="text-xl font-bold">Donate Blood</h3>
                <p className="text-muted-foreground">
                  Toggle your availability to donate and help save lives in your
                  community.
                </p>
              </div>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="h-full rounded-lg border bg-card p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="flex flex-col items-center space-y-4 text-center flex-grow">
                <motion.div
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-700"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </motion.div>
                <h3 className="text-xl font-bold">Request Blood</h3>
                <p className="text-muted-foreground">
                  Create a blood request and get matched with compatible donors
                  in your area.
                </p>
              </div>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="h-full rounded-lg border bg-card p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="flex flex-col items-center space-y-4 text-center flex-grow">
                <motion.div
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-700"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </motion.div>
                <h3 className="text-xl font-bold">Get Matched</h3>
                <p className="text-muted-foreground">
                  Our algorithm matches blood requests with compatible donors in
                  the same city.
                </p>
              </div>
            </div>
          </StaggerItem>
        </StaggerChildren>
      </div>
    </section>
  );
}
