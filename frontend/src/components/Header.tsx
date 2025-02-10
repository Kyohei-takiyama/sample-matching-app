import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="py-4 px-6 bg-white shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          Sample Matching
        </Link>
        <div className="flex space-x-4 flex-row">
          <Button variant="outline">掲載をご検討中の企業様はこちら</Button>
          <Button>ログイン</Button>
        </div>
      </div>
    </header>
  );
}
