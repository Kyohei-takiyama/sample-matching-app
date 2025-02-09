import { Zap, Users, BarChart, Lock } from "lucide-react";

const features = [
  {
    icon: <Zap className="h-6 w-6 text-primary" />,
    title: "Lightning Fast",
    description:
      "Our platform is optimized for speed, ensuring quick load times and responsive interactions.",
  },
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    title: "Team Collaboration",
    description:
      "Seamlessly work together with your team members in real-time, boosting productivity.",
  },
  {
    icon: <BarChart className="h-6 w-6 text-primary" />,
    title: "Advanced Analytics",
    description:
      "Gain valuable insights with our comprehensive analytics and reporting tools.",
  },
  {
    icon: <Lock className="h-6 w-6 text-primary" />,
    title: "Enterprise-Grade Security",
    description:
      "Rest easy knowing your data is protected with state-of-the-art security measures.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
