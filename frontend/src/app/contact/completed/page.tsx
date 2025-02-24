"use client";

import Link from "next/link";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ThanksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/20 to-background flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card text-card-foreground rounded-lg shadow-lg p-8 space-y-6 animate-in fade-in duration-700">
        <div className="text-center space-y-2">
          <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-bold">ありがとうございます！</h1>
          <p className="text-muted-foreground">
            お問い合わせを受け付けました。
          </p>
        </div>
        <div className="space-y-4 text-center">
          <p>内容を確認の上、担当者より3営業日以内にご連絡いたします。</p>
          <p className="text-sm text-muted-foreground">
            ※ お急ぎの場合は、お電話にてお問い合わせください。
          </p>
        </div>
        <div className="pt-4">
          <Link href="/" passHref>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => useRouter().push("/")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              ホームページに戻る
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
