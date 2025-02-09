import Image from "next/image";

const testimonials = [
  {
    quote:
      "StreamLine has revolutionized our team's workflow. We're more productive than ever!",
    author: "Jane Doe",
    title: "CEO, TechCorp",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    quote:
      "The analytics feature has given us invaluable insights into our project performance.",
    author: "John Smith",
    title: "Project Manager, InnovateCo",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    quote:
      "Customer support is top-notch. They're always there when we need them.",
    author: "Emily Brown",
    title: "CTO, StartupX",
    avatar: "/placeholder.svg?height=60&width=60",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <Image
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.author}
                  width={60}
                  height={60}
                  className="rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
