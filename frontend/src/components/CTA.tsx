import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="py-20 text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-primary">
          副業を始めることとは？
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-400">
          あなたのキャリアアップの新たな扉を開くことです。 <br />
          これまでの専門知識や独自のアイデアを活かして、副業に挑戦してみませんか？{" "}
          <br />
          普段の業務では体験できない他社の事業課題に取り組むことで、
          収入を得ながら次のキャリアステップへとつなげることが可能になります。
        </p>
      </div>
    </section>
  );
}
