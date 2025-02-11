import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Hero() {
  const { data: session } = useSession();

  return (
    <section className="py-20 bg-gradient-to-r from-primary to-primary-foreground text-white">
      <div className="container mx-auto text-center flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          さぁ、副業を始めよう
        </h1>
        <p className="text-xl mb-8 max-w-2xl">
          あなたのスキルを活かして、副業で収入を増やしましょう。
        </p>
        {!session?.user && (
          <div className="flex flex-col items-center space-y-4 w-full max-w-xs">
            <Button
              size="lg"
              className="w-full"
              onClick={() => signIn("cognito")}
            >
              新規会員登録（無料）
            </Button>
            <Button
              size="lg"
              className="w-full"
              onClick={() => signIn("cognito")}
            >
              ログイン
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
