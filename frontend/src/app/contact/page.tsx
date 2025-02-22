"use client";

import React, { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/toaster";

import Header from "@/components/Header";
import { createLead } from "../services/salesforceService";
import { SalesforceLeadPayload } from "@/types/salesforce";
import { useToast } from "@/hooks/use-toast";

// Zod でフォームのスキーマを定義
const contactSchema = z.object({
  companyName: z.string().min(1, { message: "企業名は必須です" }),
  companyUrl: z.string().url({ message: "正しいURLを入力してください" }),
  firstName: z.string().min(1, { message: "名前は必須です" }),
  lastName: z.string().min(1, { message: "名字は必須です" }),
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
  const { toast } = useToast();

  const [formData, setFormData] = useState<ContactFormData>({
    companyName: "",
    companyUrl: "",
    firstName: "",
    lastName: "",
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

  const handleSubmit = async (e: React.FormEvent) => {
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
      toast({
        title: "エラー",
        description: "入力内容に誤りがあります。",
        variant: "destructive",
      });
    } else {
      // バリデーション成功時はエラー state をクリア
      setErrors({});
      // 送信処理を書く
      const payload: SalesforceLeadPayload = {
        companyName: formData.companyName,
        companyUrl: formData.companyUrl,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.contactEmail,
        phone: formData.contactPhone,
        recruitmentReason: formData.recruitmentReason,
      };
      try {
        await createLead(payload);
        toast({
          title: "登録成功",
          description: "ユーザー情報が正常に登録されました。",
        });
      } catch (error) {
        console.error("Failed to create lead", error);
        toast({
          title: "エラー",
          description: "登録中にエラーが発生しました。もう一度お試しください。",
          variant: "destructive",
        });
      }
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
            <Label htmlFor="contactName">担当者性</Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="山田 太郎"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}
            <Label htmlFor="contactName">担当者名</Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="山田 太郎"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
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
      <Toaster />
    </>
  );
}
