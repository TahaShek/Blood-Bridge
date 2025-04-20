import { Link } from "react-router"
import { Droplet } from "lucide-react"

export function MainNav() {
  return (
    <div className="flex items-center space-x-4 lg:space-x-6">
      <Link to="/" className="flex items-center space-x-2">
        <Droplet className="h-6 w-6 text-red-700" />
        <span className="font-bold text-xl">Blood Bridge</span>
      </Link>
      <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
        <Link to="/about" className="text-sm font-medium transition-colors hover:text-red-700">
          About
        </Link>
        <Link
          to="/how-it-works"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-red-700"
        >
          How It Works
        </Link>
      </nav>
    </div>
  )
}
