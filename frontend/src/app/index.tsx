"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import JobOpportunites from "@/components/JobOpportunities";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { checkIsExitstedUser } from "./services/userService";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      console.log(session.user.email);
      check(session.user.email as string);
    }

    async function check(email: string) {
      try {
        const response = await checkIsExitstedUser(email);
        if (response.data !== null && response.data.isExisted) {
          console.log("ユーザーが存在します");
        } else {
          console.log("ユーザーが存在しません");
          router.push("/register");
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, [session]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <Hero />
        <CTA />
        <JobOpportunites />
      </main>
      <Footer />
    </div>
  );
}
