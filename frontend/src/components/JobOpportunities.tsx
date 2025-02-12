"use client";

import { Zap, Users, BarChart, Lock, HeartCrack, Heart } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const jobOpportunities = [
  {
    id: 1,
    image: "/globe.svg",
    title:
      "【販路開拓】新進気鋭の人材紹介会社の関西圏における法人顧客新規開拓プロジェクトにサンカク！",
    company: "株式会社サンカク",
    tag: ["販路開拓", "人材採用"],
  },
  {
    id: 2,
    image: "/globe.svg",
    title:
      "【販路開拓】新進気鋭の人材紹介会社の関西圏における法人顧客新規開拓プロジェクトにサンカク！",
    company: "株式会社サンカク",
    tag: ["販路開拓", "人材採用"],
  },
  {
    id: 3,
    image: "/globe.svg",
    title:
      "【販路開拓】新進気鋭の人材紹介会社の関西圏における法人顧客新規開拓プロジェクトにサンカク！",
    company: "株式会社サンカク",
    tag: ["販路開拓", "人材採用"],
  },
  {
    id: 4,
    image: "/globe.svg",
    title:
      "【販路開拓】新進気鋭の人材紹介会社の関西圏における法人顧客新規開拓プロジェクトにサンカク！",
    company: "株式会社サンカク",
    tag: ["販路開拓", "人材採用"],
  },
];

export default function JobOpportunities() {
  const [likedJobs, setLikedJobs] = useState<number[]>([]);
  const router = useRouter();

  const toggleLike = (index: number) => {
    setLikedJobs((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section
      id="jobOpportunities"
      className="py-20 bg-gradient-to-r from-primary to-primary-foreground text-white"
    >
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-secondary">
          案件情報
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {jobOpportunities.map((opp, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md"
              onClick={() => router.push(`/job-opportunities/${opp.id}`)}
            >
              <img
                src={opp.image || "/placeholder.svg"}
                alt={opp.title}
                className="w-20 h-40 mx-auto mb-6"
              />
              <h3 className="text-xl font-semibold mb-12 text-gray-400">
                {opp.title}
              </h3>
              <div className="flex justify-between items-center">
                <div className="flex flex-wrap">
                  {opp.tag.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs bg-primary text-white px-2 py-1 rounded-full mr-2 mb-2"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleLike(index)}
                  className={`transition-colors duration-200 ${
                    likedJobs.includes(index) ? "text-red-500" : "text-gray-400"
                  }`}
                >
                  <Heart
                    className={`h-6 w-6 ${
                      likedJobs.includes(index) ? "fill-current" : ""
                    }`}
                  />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
