"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function Contact() {
  const [formData, setFormData] = useState({
    companyName: "",
    companyUrl: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    recruitmentReason: "",
    recognizedFrom: "",
    recognizedFromOther: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRadioChange = (value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      recognizedFrom: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your server
  };

  return (
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
        </div>

        <div>
          <Label htmlFor="recruitmentReason">募集したい職種</Label>
          <Textarea
            id="recruitmentReason"
            name="recruitmentReason"
            value={formData.recruitmentReason}
            onChange={handleInputChange}
            placeholder="マーケター、事業開発、広報…など副業募集したい職種と、副業募集をご希望された背景や目的もご記入ください。"
          />
        </div>

        <Button type="submit" className="w-full">
          確認する
        </Button>
      </form>
    </div>
  );
}
