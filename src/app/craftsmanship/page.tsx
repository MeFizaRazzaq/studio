import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { CheckCircle } from "lucide-react";

export const metadata = {
  title: "Our Craftsmanship | Meem Artisan",
  description: "Learn about the art and process behind our handcrafted leather goods.",
};

const processSteps = [
    {
        name: "Material Selection",
        description: "We begin by sourcing only the finest full-grain hides from ethical, local Pakistani tanneries. Each hide is inspected for its unique character, strength, and texture.",
    },
    {
        name: "Cutting & Preparation",
        description: "Our artisans skillfully cut each pattern by hand, a method that respects the leather's natural grain and ensures minimal waste. Edges are then carefully skived for a clean assembly.",
    },
    {
        name: "Stitching & Assembly",
        description: "Using traditional saddle-stitching techniques and high-strength waxed thread, each piece is assembled by hand. This method is renowned for its durability and beauty.",
    },
    {
        name: "Finishing & Burnishing",
        description: "The edges of every product are meticulously sanded, beveled, and burnished with beeswax to create a smooth, sealed, and durable finish that speaks to the quality of the craft.",
    },
    {
        name: "Final Inspection",
        description: "Before a piece can carry the Haus of Meem name, it undergoes a final, rigorous inspection to ensure it meets our uncompromising standards of quality.",
    }
];

export default function CraftsmanshipPage() {
  const craftImage = PlaceHolderImages.find(p => p.id === 'craft-1');

  return (
    <div>
        <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-headline text-primary mb-6">The Art of Leather</h1>
                <p className="text-lg text-muted-foreground">
                    At Haus of Meem, we don't just make products; we practice an art form. Our process is a deliberate and patient blend of time-honored techniques and a passion for perfection.
                </p>
            </div>

            {craftImage && (
                <div className="my-12">
                    <Image
                    src={craftImage.imageUrl}
                    alt={craftImage.description}
                    width={1200}
                    height={600}
                    className="rounded-lg shadow-lg mx-auto object-cover max-h-[500px]"
                    data-ai-hint={craftImage.imageHint}
                    />
                </div>
            )}

            <div className="max-w-4xl mx-auto mt-16">
                <h2 className="text-3xl font-headline text-center text-primary mb-12">Our Process</h2>
                <div className="grid md:grid-cols-1 gap-8">
                    {processSteps.map((step, index) => (
                        <div key={index} className="flex items-start gap-6">
                            <div className="text-accent">
                                <CheckCircle className="h-8 w-8 mt-1"/>
                            </div>
                            <div>
                                <h3 className="text-xl font-headline text-primary mb-2">{step.name}</h3>
                                <p className="text-muted-foreground">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
}
