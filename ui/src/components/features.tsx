import { Card, CardContent } from "@/components/ui/card";
import { Heart, Droplet, Users } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Donate Blood",
      description:
        "Toggle your availability to donate and help save lives in your community.",
    },
    {
      icon: <Droplet className="h-6 w-6" />,
      title: "Request Blood",
      description:
        "Create a blood request and get matched with compatible donors in your area.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Get Matched",
      description:
        "Our algorithm matches blood requests with compatible donors in the same city.",
    },
  ];

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-gray-50">
      <div className="container px-4 sm:px-6 mx-auto">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center mb-12 md:mb-16">
          <h2 className="text-3xl font-bold text-red-700 sm:text-4xl md:text-5xl">
            How Blood Bridge Works
          </h2>
          <p className="mt-4 text-gray-600 text-lg md:text-xl">
            Our platform connects blood donors with those in need, making the
            process simple and efficient.
          </p>
        </div>

        {/* Cards - Equal height and fully responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="h-full flex flex-col hover:shadow-lg transition-all"
            >
              <CardContent className="p-6 md:p-8 flex-1 flex flex-col">
                <div className="flex flex-col items-center text-center space-y-4 h-full">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-700">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold md:text-2xl">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 md:text-lg flex-grow">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
