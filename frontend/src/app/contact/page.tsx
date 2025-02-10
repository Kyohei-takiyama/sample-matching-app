"use client";

import React, { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import Header from "@/components/Header";

// Zod でフォームのスキーマを定義
const contactSchema = z.object({
  companyName: z.string().min(1, { message: "企業名は必須です" }),
  companyUrl: z.string().url({ message: "正しいURLを入力してください" }),
  contactName: z.string().min(1, { message: "担当者氏名は必須です" }),
  contactPhone: z.string().min(1, { message: "電話番号は必須です" }),
  contactEmail: z
    .string()
    .email({ message: "正しいメールアドレスを入力してください" }),
  recruitmentReason: z
    .string()
    .min(1, { message: "募集したい職種を入力してください" }),
  recognizedFrom: z.string().optional(),
  recognizedFromOther: z.string().optional(),
});

// 型を生成
type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    companyName: "",
    companyUrl: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    recruitmentReason: "",
    recognizedFrom: "",
    recognizedFromOther: "",
  });

  // バリデーションエラーを保持する state（キーはフォームフィールド名）
  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormData, string>>
  >({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Zod で検証
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      // エラー内容を state にセットする
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.errors.forEach((err) => {
        if (err.path.length > 0) {
          const field = err.path[0] as keyof ContactFormData;
          fieldErrors[field] = err.message;
        }
      });
      setErrors(fieldErrors);
      console.log("Validation errors:", result.error.errors);
    } else {
      // バリデーション成功時はエラー state をクリア
      setErrors({});
      console.log("Validated form data:", result.data);
      alert("送信しました");
      // ここでサーバーへの送信などの処理を実行する
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">企業アカウント開設申請</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="companyName">企業名</Label>
            <Input
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              placeholder="株式会社サンプル"
            />
            {errors.companyName && (
              <p className="text-red-500 text-sm">{errors.companyName}</p>
            )}
          </div>

          <div>
            <Label htmlFor="companyUrl">URL</Label>
            <Input
              id="companyUrl"
              name="companyUrl"
              value={formData.companyUrl}
              onChange={handleInputChange}
              placeholder="https://example.com"
            />
            {errors.companyUrl && (
              <p className="text-red-500 text-sm">{errors.companyUrl}</p>
            )}
          </div>

          <div>
            <Label htmlFor="contactName">担当者氏名</Label>
            <Input
              id="contactName"
              name="contactName"
              value={formData.contactName}
              onChange={handleInputChange}
              placeholder="山田 太郎"
            />
            {errors.contactName && (
              <p className="text-red-500 text-sm">{errors.contactName}</p>
            )}
          </div>

          <div>
            <Label htmlFor="contactPhone">電話番号</Label>
            <Input
              id="contactPhone"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleInputChange}
              placeholder="09012345678"
            />
            {errors.contactPhone && (
              <p className="text-red-500 text-sm">{errors.contactPhone}</p>
            )}
          </div>

          <div>
            <Label htmlFor="contactEmail">メールアドレス</Label>
            <Input
              id="contactEmail"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleInputChange}
              placeholder="taro@example.com"
            />
            {errors.contactEmail && (
              <p className="text-red-500 text-sm">{errors.contactEmail}</p>
            )}
          </div>

          <div>
            <Label htmlFor="recruitmentReason">募集したい職種</Label>
            <Textarea
              id="recruitmentReason"
              name="recruitmentReason"
              value={formData.recruitmentReason}
              onChange={handleInputChange}
              placeholder="マーケター、事業開発、広報…など募集したい職種とその背景を記入"
            />
            {errors.recruitmentReason && (
              <p className="text-red-500 text-sm">{errors.recruitmentReason}</p>
            )}
          </div>

          <Button type="submit" className="w-full">
            送信する
          </Button>
        </form>
      </div>
    </>
  );
}
