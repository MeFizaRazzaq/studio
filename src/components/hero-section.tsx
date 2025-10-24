'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

interface HeroProps {
  heroImage: { imageUrl: string; description: string; imageHint?: string };
}

export default function HeroSection({ heroImage }: HeroProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 50]); // parallax effect

  return (
    <section className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      </motion.div>

      <div className="absolute inset-0 bg-black/50" />
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 text-white"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold text-primary"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Haus of Meem
        </motion.h1>
        <motion.p
          className="mt-4 text-lg md:text-xl max-w-2xl text-primary/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Crafted for the Modern Gentleman. Uncompromising quality, timeless design.
        </motion.p>
      </motion.div>
    </section>
  );
}
