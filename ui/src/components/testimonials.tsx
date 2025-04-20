import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Testimonials() {
  const testimonials = [
    {
      quote:
        "Blood Bridge made it so easy for me to find donors when my father needed blood urgently. I'm forever grateful.",
      author: "Sarah Ahmed",
      role: "Blood Recipient",
      avatar: "SA",
    },
    {
      quote:
        "As a regular blood donor, this platform helps me connect with people in need directly. It's rewarding to see the impact.",
      author: "Ali Khan",
      role: "Blood Donor",
      avatar: "AK",
    },
    {
      quote:
        "The notification system is excellent. I was able to donate blood within hours of receiving an alert for a compatible request.",
      author: "Fatima Zaidi",
      role: "Blood Donor",
      avatar: "FZ",
    },
  ];

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-gray-50">
      <div className="container px-4 sm:px-6 mx-auto">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center mb-12 md:mb-16">
          <h2 className="text-3xl font-bold text-red-700 sm:text-4xl md:text-5xl">
            What People Say
          </h2>
          <p className="mt-4 text-gray-600 text-lg md:text-xl">
            Hear from donors and recipients who have used Blood Bridge.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="h-full flex flex-col border-red-100 hover:shadow-lg transition-all"
            >
              <CardContent className="p-6 md:p-8 flex-1">
                <blockquote className="text-gray-600 italic text-base md:text-lg h-full flex items-start">
                  <span className="text-red-700 text-2xl font-serif mr-2">
                    "
                  </span>
                  <span>{testimonial.quote}</span>
                </blockquote>
              </CardContent>
              <CardFooter className="flex items-center gap-4 border-t border-gray-100 p-6 md:p-8">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={`/avatars/${testimonial.avatar}.jpg`} />
                  <AvatarFallback className="bg-red-100 text-red-700">
                    {testimonial.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
