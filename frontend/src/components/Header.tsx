"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

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
            <Button asChild>
              <Link href="/login">ログイン</Link>
            </Button>
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
