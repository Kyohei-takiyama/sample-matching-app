"use client";
import { useSession } from "next-auth/react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signIn, signOut } from "next-auth/react";
import { useEffect } from "react";

export default function Header() {
  const { data: session } = useSession();

  const pathname = usePathname();
  const isHome = pathname === "/";

  const fetchUser = async () => {
    const res = await fetch("/api/user");
    const data = await res.json();
    console.log(data);
  };

  useEffect(() => {
    if (session?.user) {
      console.log(session.user);
    }
  }, [session]);

  return (
    <header className="py-4 px-6 bg-white shadow-sm">
      {isHome ? (
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary">
            Sample Matching
          </Link>
          <div className="flex space-x-4 flex-row">
            <Button variant="outline" asChild>
              <Link href="/contact">掲載をご検討中の企業様はこちら</Link>
            </Button>
            {session?.user ? (
              <Button onClick={() => signOut()}>ログアウト</Button>
            ) : (
              <Button onClick={() => signIn("cognito")}>ログイン</Button>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              Sample Matching
            </Link>
          </div>
        </>
      )}
    </header>
  );
}
