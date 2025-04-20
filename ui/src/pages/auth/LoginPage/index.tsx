// import LoginForm from "@/features/auth/AuthForms/LoginForm";
// const LoginPage = () => {
//   return (
//     <>
//       <LoginForm />
//     </>
//   );
// };

// export default LoginPage;

import { FadeIn } from "@/components/ui/animations/fade-in";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/ui/animations/stagger-children";
import { LoginForm } from "@/features/auth/AuthForms/LoginForm";
import { Droplet } from "lucide-react";
import { Link } from "react-router";

export default function LoginPage() {
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
              <h2 className="text-3xl font-bold mb-6">Welcome Back</h2>
            </StaggerItem>
            <StaggerItem>
              <p className="text-lg mb-6">
                Log in to continue your journey of saving lives through blood
                donation.
              </p>
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
                <p>Access your dashboard to manage blood requests</p>
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
                <p>Toggle your availability to donate blood</p>
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
                <p>View your donation history and impact</p>
              </div>
            </StaggerItem>
          </StaggerChildren>
        </div>

        <FadeIn delay={0.6}>
          <div className="mt-auto">
            <p className="text-sm opacity-80">
              "Every blood donor is a life saver. Your single donation can save
              up to three lives."
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
              <LoginForm />
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}
