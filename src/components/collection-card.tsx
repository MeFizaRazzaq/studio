"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface CollectionCardProps {
  title: string;
  slug: string;
  image: {
    url: string;
    alt: string;
  };
}

export function CollectionCard({ title, slug, image }: CollectionCardProps) {
  return (
    <motion.div
      className="group relative rounded-xl overflow-hidden bg-transparent cursor-pointer h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <Link href={`/shop?category=${slug}`}> {/* ✅ Will filter directly */}
        <div className="overflow-hidden rounded-xl relative h-full">

          {/* Hover Zoom Image */}
          <motion.div
            className="w-full h-full"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src={image.url}
              alt={image.alt}
              width={600}
              height={600}
              className="object-cover w-full h-full
                group-hover:blur-[3px] group-hover:brightness-75
                transition-all duration-500"
            />
          </motion.div>

          {/* Overlay */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center
            opacity-0 group-hover:opacity-100
            translate-y-6 group-hover:translate-y-0
            transition-all duration-500 gap-3"
          >
            <h3 className="text-3xl font-semibold text-white drop-shadow-xl">
              {title}
            </h3>

            {/* ✅ Explore Button */}
            <motion.span
              className="text-white/90 text-lg border border-white/50 
              px-5 py-2 rounded-full backdrop-blur-sm
              hover:bg-white hover:text-black transition-all duration-300"
              whileHover={{ scale: 1.08 }}
            >
              Explore Now →
            </motion.span>
          </motion.div>

        </div>
      </Link>
    </motion.div>
  );
}
