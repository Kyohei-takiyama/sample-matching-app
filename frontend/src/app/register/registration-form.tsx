"use client";

import { useSession } from "next-auth/react";
import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { createUser } from "../services/userService";

export function RegistrationForm() {
  const { data: session } = useSession();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const email = session?.user?.email as string;
      // ユーザー情報を登録する処理
      const res = await createUser({
        firstName,
        lastName,
        email,
        phone,
        experience,
      });

      if (res.data === null) {
        throw new Error("ユーザー情報の登録に失敗しました");
      }

      toast({
        title: "登録成功",
        description: "ユーザー情報が正常に登録されました。",
      });
      router.push("/"); // 登録後のリダイレクト先
    } catch (error) {
      toast({
        title: "エラー",
        description: "登録中にエラーが発生しました。もう一度お試しください。",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">
            名前 <span className="text-red-500">*</span>
          </Label>
          <Input
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">
            姓 <span className="text-red-500">*</span>
          </Label>
          <Input
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">電話番号</Label>
        <Input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="skills">スキル</Label>
        <Input
          id="skills"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="experience">経験</Label>
        <Textarea
          id="experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          rows={4}
        />
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "登録中..." : "登録"}
      </Button>
      <Toaster />
    </form>
  );
}
