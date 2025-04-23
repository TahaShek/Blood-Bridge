"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Quote } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      quote:
        "Blood Bridge helped me find donors quickly when my father needed an emergency transfusion. Forever grateful!",
      author: "Sarah Johnson",
      role: "Blood Recipient Family",
    },
    {
      quote:
        "As a regular donor, this platform makes it easy to know when and where my blood type is needed. It's rewarding to help.",
      author: "Michael Chen",
      role: "Blood Donor",
    },
    {
      quote:
        "The notification system is excellent. I was able to donate within hours of receiving an alert for my rare blood type.",
      author: "Priya Sharma",
      role: "Blood Donor",
    },
  ]

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-red-600 sm:text-4xl md:text-5xl mb-4">Lives We've Touched</h2>
          <p className="max-w-3xl mx-auto text-gray-600 text-lg md:text-xl">
            Hear from donors and recipients who have experienced the Blood Bridge difference
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-red-100 hover:shadow-lg transition-all">
                <CardContent className="p-6 md:p-8">
                  <motion.div
                    className="flex flex-col h-full space-y-4"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Quote className="h-8 w-8 text-red-600/40" />
                    <p className="text-lg flex-grow">"{testimonial.quote}"</p>
                    <div className="pt-4 border-t border-gray-100">
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
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
