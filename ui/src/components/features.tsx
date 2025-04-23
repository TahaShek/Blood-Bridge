import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Heart, Droplet, Users } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Donate Blood",
      description: "Toggle your availability to donate and help save lives in your community.",
    },
    {
      icon: <Droplet className="h-6 w-6" />,
      title: "Request Blood",
      description: "Create a blood request and get matched with compatible donors in your area.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Get Matched",
      description: "Our algorithm matches blood requests with compatible donors in the same city.",
    },
  ]

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 sm:px-6 mx-auto">
        <motion.div
          className="mx-auto max-w-3xl text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-red-600 sm:text-4xl md:text-5xl">Why Choose Blood Bridge?</h2>
          <p className="mt-4 text-gray-600 text-lg md:text-xl">
            Our platform makes blood donation and requests simple, efficient, and life-saving.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col hover:shadow-lg transition-all border-red-100">
                <CardContent className="p-6 md:p-8 flex-1 flex flex-col">
                  <motion.div
                    className="flex flex-col items-center text-center space-y-4 h-full"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold md:text-2xl">{feature.title}</h3>
                    <p className="text-gray-600 md:text-lg flex-grow">{feature.description}</p>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
