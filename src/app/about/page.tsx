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
              <div className="w-full">
                <Image
                  src={aboutImage.imageUrl}
                  alt={aboutImage.description}
                  width={800}
                  height={600}
                  className="rounded-lg shadow-lg mx-auto"
                  data-ai-hint={aboutImage.imageHint}
                />
              </div>
            )}
            <div className="prose prose-invert prose-lg max-w-none text-foreground/80">
              <p>
                Haus of Meem was born from a passion for preserving the rich heritage of Pakistani leatherwork while infusing it with a modern, minimalist aesthetic. Founded by [Founder's Name], a third-generation leather artisan, our brand is a tribute to the meticulous skill passed down through his family.
              </p>
              <p>
                We believe that true luxury lies in the details: the quality of the raw materials, the precision of the stitching, and the timelessness of the design. Each of our products is more than just an accessory; it is a piece of art, a companion for life's journey, crafted to age beautifully and tell its own story.
              </p>
              <p>
                Our workshop, nestled in the heart of [City, Pakistan], is where tradition meets innovation. We work with local tanneries to source the finest full-grain leather, ensuring that every hide meets our exacting standards of quality and ethical sourcing.
              </p>
              <p>
                Welcome to the Haus of Meem. We invite you to experience craftsmanship that endures.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
