import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export const metadata = {
  title: "About Us | Meem Artisan",
  description: "Discover the story behind Haus of Meem and our commitment to craftsmanship.",
};

export default function AboutPage() {
  const aboutImage = PlaceHolderImages.find(p => p.id === 'about-us');

  return (
    <div className="bg-card">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-headline text-center text-primary mb-12">Our Story</h1>
          <div className="grid md:grid-cols-1 gap-12 items-center">
            {aboutImage && (
              <div >
                <Image
                  src={aboutImage.imageUrl}
                  alt={aboutImage.description}
                  width={500}
                  height={500}
                  className="rounded-lg shadow-lg mx-auto"
                  data-ai-hint={aboutImage.imageHint}
                />
              </div>
            )}
            <div className="prose prose-invert prose-lg max-w-none text-foreground/80">
  <p>
    Haus of Meem was created by a duo with a shared passion — one, a software engineer with a love for design and creativity, and the other, a marketing mind with an eye for trends and craftsmanship. Together, we set out to elevate Pakistan’s exceptional leather tradition into a premium, globally recognized brand.
  </p>
  <p>
    Every product we craft reflects our belief that luxury is simple — it’s in the feel of real, full-grain leather, in the finesse of clean stitching, and in designs that stay timeless no matter the trend. Our pieces are made to be used, lived with, and cherished as they develop a unique character over time.
  </p>
  <p>
    Based in Pakistan, the home of some of the world’s finest leather, we work closely with skilled local artisans and trusted tanneries to ensure quality, ethical sourcing, and a product experience that feels truly special from the very first touch.
  </p>
  <p>
    Welcome to the Haus of Meem — where heritage meets modern elegance. We create for those who value craftsmanship that lasts a lifetime.
  </p>
</div>

          </div>
        </div>
      </div>
    </div>
  );
}
