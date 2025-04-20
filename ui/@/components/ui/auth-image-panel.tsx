export default function AuthImagePanel() {
    return (
      <div className="hidden lg:block lg:flex-[1.5] relative overflow-hidden rounded-r-3xl">
        {/* Base gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 via-blue-400/80 to-cyan-400/70">
          {/* Decorative elements */}
          <div className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-blue-500/30 via-cyan-400/30 to-teal-300/30 blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-indigo-500/20 via-blue-400/20 to-cyan-300/20 blur-3xl top-1/4 left-1/4" />
  
          {/* Abstract shapes */}
          <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-cyan-300/40 to-blue-300/40 blur-2xl" />
          <div className="absolute bottom-1/4 left-1/3 w-48 h-48 rounded-full bg-gradient-to-r from-blue-400/30 to-indigo-400/30 blur-xl" />
  
          {/* Medical-themed illustration */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]">
            <div className="relative w-full h-full">
              {/* Large circle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border-[15px] border-white/20 backdrop-blur-sm" />
  
              {/* Pulse effect */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border-2 border-white/10 animate-pulse" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border-2 border-white/5 animate-pulse animation-delay-1000" />
  
              {/* Heartbeat line */}
              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/30">
                <div className="absolute top-0 left-[10%] w-[80%] h-full">
                  <svg viewBox="0 0 400 20" className="w-full">
                    <path
                      d="M0,10 L80,10 Q85,10 87.5,5 L92.5,15 Q95,20 100,10 L110,10 L190,10 Q195,10 197.5,5 L202.5,15 Q205,20 210,10 L290,10 Q295,10 297.5,5 L302.5,15 Q305,20 310,10 L400,10"
                      fill="none"
                      stroke="rgba(255,255,255,0.8)"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </div>
  
              {/* Medical cross */}
              <div className="absolute top-[30%] left-[30%] w-16 h-16">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-16 bg-white/80 rounded-md" />
                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-16 h-4 bg-white/80 rounded-md" />
              </div>
            </div>
          </div>
        </div>
  
        {/* Clinic branding on the image panel */}
        <div className="absolute top-8 left-8 flex items-center z-10">
          <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center mr-3 shadow-lg">
            <div className="h-6 w-6 text-blue-600">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M19 8C20.6569 8 22 6.65685 22 5C22 3.34315 20.6569 2 19 2C17.3431 2 16 3.34315 16 5C16 6.65685 17.3431 8 19 8Z"
                  fill="currentColor"
                />
                <path
                  d="M12.5 22H4.5C3.12 22 2 20.88 2 19.5V18C2 16.9 2.9 16 4 16H13C14.1 16 15 16.9 15 18V19.5C15 20.88 13.88 22 12.5 22Z"
                  fill="currentColor"
                />
                <path
                  d="M15.5 10.5C17.16 10.5 18.5 9.16 18.5 7.5C18.5 5.84 17.16 4.5 15.5 4.5C13.84 4.5 12.5 5.84 12.5 7.5C12.5 9.16 13.84 10.5 15.5 10.5Z"
                  fill="currentColor"
                  opacity="0.4"
                />
                <path
                  d="M8.5 10.5C10.16 10.5 11.5 9.16 11.5 7.5C11.5 5.84 10.16 4.5 8.5 4.5C6.84 4.5 5.5 5.84 5.5 7.5C5.5 9.16 6.84 10.5 8.5 10.5Z"
                  fill="currentColor"
                />
                <path d="M8.97 16C8.97 14.9 8.07 14 6.97 14H5C3.9 14 3 14.9 3 16" fill="currentColor" opacity="0.4" />
                <path
                  d="M20 18V19.5C20 20.88 18.88 22 17.5 22C16.12 22 15 20.88 15 19.5V18C15 16.9 15.9 16 17 16C18.1 16 19 16.9 19 18"
                  fill="currentColor"
                  opacity="0.4"
                />
              </svg>
            </div>
          </div>
          <div>
            <div className="text-white font-bold text-lg">MediCare Clinic</div>
            <div className="text-blue-100 text-xs">Healthcare Management System</div>
          </div>
        </div>
  
        {/* Bottom tagline */}
        <div className="absolute bottom-8 left-8 right-8 text-white/80 text-sm">
          Providing exceptional healthcare services since 2010
        </div>
      </div>
    )
  }
  
  