import { Droplet } from "lucide-react"
import { motion } from "framer-motion"
import { Link, useLocation } from "react-router-dom"

export function MainNav() {
  const { pathname } = useLocation()

  const isActive = (path: string) => pathname === path

  return (
    <div className="flex items-center space-x-4 lg:space-x-6">
      <Link to="/" className="flex items-center space-x-2">
        <motion.div whileHover={{ rotate: 15, scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
          <Droplet className="h-6 w-6 text-red-600" />
        </motion.div>
        <motion.span
          className="font-bold text-xl"
          initial={{ opacity: 1 }}
          whileHover={{
            color: "#dc2626",
            transition: { duration: 0.2 },
          }}
        >
          Blood Bridge
        </motion.span>
      </Link>
      <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
        <Link to="/about">
          <motion.span
            className={`text-sm font-medium transition-colors hover:text-red-600 ${
              isActive("/about") ? "text-red-600" : "text-gray-700"
            }`}
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            About
          </motion.span>
        </Link>
        <Link to="/how-it-works">
          <motion.span
            className={`text-sm font-medium transition-colors hover:text-red-600 ${
              isActive("/how-it-works") ? "text-red-600" : "text-gray-700"
            }`}
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            How It Works
          </motion.span>
        </Link>
        <Link to="/donor-list">
          <motion.span
            className={`text-sm font-medium transition-colors hover:text-red-600 ${
              isActive("/donor-list") ? "text-red-600" : "text-gray-700"
            }`}
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Donor List
          </motion.span>
        </Link>
      </nav>
    </div>
  )
}
