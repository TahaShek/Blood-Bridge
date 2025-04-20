import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { CheckCircle } from "lucide-react";

export function HowItWorks() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6 mx-auto">
        {/* First section - Donors */}
        <div className="grid items-stretch gap-8 py-12 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {" "}
          {/* Changed to items-stretch */}
          <div className="order-1 h-full flex flex-col">
            {" "}
            {/* Added flex container */}
            <img
              src="/placeholder.svg"
              width={600}
              height={400}
              alt="How it works"
              className="w-full h-auto max-w-[600px] mx-auto aspect-video rounded-xl object-cover shadow-md flex-shrink-0"
            />
          </div>
          <div className="order-2 space-y-4 lg:space-y-6 h-full flex flex-col">
            {" "}
            {/* Added flex container */}
            <h2 className="text-2xl font-bold text-red-700 sm:text-3xl md:text-4xl">
              For Blood Donors
            </h2>
            <ul className="space-y-3 md:space-y-4 flex-grow">
              {" "}
              {/* Added flex-grow */}
              {[
                "Create an account and provide your blood type and location",
                "Toggle your availability to donate when you're ready",
                "Receive notifications for compatible blood requests in your area",
                "Accept requests and connect with those in need",
                "Track your donation history and impact",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="flex-shrink-0 h-5 w-5 text-red-700 mt-0.5" />
                  <span className="text-base md:text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Second section - Recipients */}
        <div className="grid items-stretch gap-8 py-12 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {" "}
          {/* Changed to items-stretch */}
          <div className="order-2 lg:order-1 space-y-4 lg:space-y-6 h-full flex flex-col">
            {" "}
            {/* Added flex container */}
            <h2 className="text-2xl font-bold text-red-700 sm:text-3xl md:text-4xl">
              For Those in Need
            </h2>
            <ul className="space-y-3 md:space-y-4 flex-grow">
              {" "}
              {/* Added flex-grow */}
              {[
                "Create an account and submit a blood request",
                "Specify blood type, number of donors needed, and urgency level",
                "Our system matches your request with compatible donors in your area",
                "Donors accept your request and contact you directly",
                "Track the status of your request in real-time",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="flex-shrink-0 h-5 w-5 text-red-700 mt-0.5" />
                  <span className="text-base md:text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="order-1 lg:order-2 h-full flex flex-col">
            {" "}
            {/* Added flex container */}
            <img
              src="/placeholder.svg"
              width={600}
              height={400}
              alt="How it works"
              className="w-full h-auto max-w-[600px] mx-auto aspect-video rounded-xl object-cover shadow-md flex-shrink-0"
            />
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-3xl mx-auto py-12 text-center">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="text-gray-600 text-lg md:text-xl">
              Join Blood Bridge today and be part of our life-saving community.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register">
                <Button className="bg-red-700 hover:bg-red-800 px-8 py-6 text-lg">
                  Register Now
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="px-8 py-6 text-lg">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
