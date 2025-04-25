import { Droplet } from "lucide-react";
import { FadeIn } from "./animations/fade-in";
import { StaggerChildren, StaggerItem } from "./animations/stagger-children";
import { Link } from "react-router";
import { RegisterForm } from "@/features/auth/AuthForms/RegisterForm";
export default function AuthImagePanel() {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Dark background with info */}
      <div className="hidden md:flex md:w-1/2 bg-red-900 text-white p-8 flex-col">
        <FadeIn>
          <Link to="/" className="flex items-center space-x-2 mb-12">
            <Droplet className="h-6 w-6 text-white" />
            <span className="font-bold text-xl">Blood Bridge</span>
          </Link>
        </FadeIn>

        <div className="flex-1 flex flex-col justify-center">
          <StaggerChildren>
            <StaggerItem>
              <h2 className="text-3xl font-bold mb-6">Join Blood Bridge</h2>
            </StaggerItem>
            <StaggerItem>
              <p className="text-lg mb-4">By creating an account, you can:</p>
            </StaggerItem>
            <StaggerItem>
              <div className="mb-3 flex items-start">
                <div className="bg-red-700 rounded-full p-1 mr-3 mt-1">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p>Request blood when you or someone you know needs it</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="mb-3 flex items-start">
                <div className="bg-red-700 rounded-full p-1 mr-3 mt-1">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p>Toggle your availability to donate blood when you're able</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="mb-3 flex items-start">
                <div className="bg-red-700 rounded-full p-1 mr-3 mt-1">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p>Get matched with compatible donors in your city</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="mb-3 flex items-start">
                <div className="bg-red-700 rounded-full p-1 mr-3 mt-1">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p>Track your donation history and help save lives</p>
              </div>
            </StaggerItem>
          </StaggerChildren>
        </div>

        <FadeIn delay={0.6}>
          <div className="mt-auto">
            <p className="text-sm opacity-80">
              "The blood you donate gives someone another chance at life. One
              day that someone may be a close relative, a friend, a loved one—or
              even you."
            </p>
          </div>
        </FadeIn>
      </div>

      {/* Right side - Form */}
      <div className="w-full md:w-1/2 flex flex-col">
        <div className="p-4 md:hidden">
          <Link to="/" className="flex items-center space-x-2">
            <Droplet className="h-6 w-6 text-red-700" />
            <span className="font-bold text-xl">Blood Bridge</span>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center p-4 md:p-8">
          <div className="w-full max-w-md">
            <FadeIn direction="none">
              <RegisterForm />
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}
