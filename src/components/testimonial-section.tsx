"use client";
import { useState, useEffect, useRef, useMemo} from "react";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const reviewsData = [
  // Existing (1–10)
  {
    id: 1,
    name: "Ahmed Khan",
    comment:
      "Exceptional quality! The leather feels premium and the stitching is flawless. Highly recommended!",
    image: "",
    rating: 5,
  },
  {
    id: 2,
    name: "Zain Ali",
    comment:
      "Stylish, durable and worth the price. Delivery was also very fast!",
    image: "",
    rating: 5,
  },
  {
    id: 3,
    name: "Bilal Saeed",
    comment:
      "Bought a wallet for daily use — absolutely love the craftsmanship!",
    image: "",
    rating: 4,
  },
  {
    id: 4,
    name: "Naila Saeed",
    comment:
      "Bought a wallet for daily use — absolutely love the craftsmanship!",
    image: "",
    rating: 4,
  },
  {
    id: 5,
    name: "Zain Ali",
    comment:
      "Stylish, durable and worth the price. Delivery was also very fast!",
    image: "",
    rating: 5,
  },
  {
    id: 6,
    name: "Zain Ali",
    comment:
      "Stylish, durable and worth the price. Delivery was also very fast!",
    image: "",
    rating: 5,
  },
  {
    id: 7,
    name: "Zain Ali",
    comment:
      "Stylish, durable and worth the price. Delivery was also very fast!",
    image: "",
    rating: 5,
  },
  {
    id: 8,
    name: "Zain Ali",
    comment:
      "Stylish, durable and worth the price. Delivery was also very fast!",
    image: "",
    rating: 5,
  },
  {
    id: 9,
    name: "Zain Ali",
    comment:
      "Stylish, durable and worth the price. Delivery was also very fast!",
    image: "",
    rating: 5,
  },
  {
    id: 10,
    name: "Zain Ali",
    comment:
      "Stylish, durable and worth the price. Delivery was also very fast!",
    image: "",
    rating: 5,
  },

  // New ones start here ↓
  {
    id: 11,
    name: "Aisha Noor",
    comment: "Perfect gift! Packaging was elegant and clean.",
    image: "",
    rating: 5,
  },
  {
    id: 12,
    name: "Hamza",
    comment: "High-quality and feels premium in hand. Will buy again!",
    image: "",
    rating: 5,
  },
  {
    id: 13,
    name: "Fatima",
    comment: "Leather smell is amazing. Very durable!",
    image: "",
    rating: 5,
  },
  {
    id: 14,
    name: "Daniel Kim",
    comment: "Solid wallet, strong build, totally worth the money.",
    image: "",
    rating: 4,
  },
  {
    id: 15,
    name: "Elena",
    comment: "Love the minimalist design!",
    image: "",
    rating: 5,
  },
  {
    id: 16,
    name: "Hassan Raza",
    comment: "Stitching could be slightly better, still great!",
    image: "",
    rating: 4,
  },
  {
    id: 17,
    name: "Sana",
    comment: "Aesthetic and classy — exactly what I wanted.",
    image: "",
    rating: 5,
  },
  {
    id: 18,
    name: "George",
    comment: "Delivery was slower than expected but product is great.",
    image: "",
    rating: 4,
  },
  {
    id: 19,
    name: "Nimra",
    comment: "Bought for my father — he loved it!",
    image: "",
    rating: 5,
  },
  {
    id: 20,
    name: "Adnan",
    comment: "Simple, clean, premium feel.",
    image: "",
    rating: 5,
  },
  {
    id: 21,
    name: "Megan",
    comment: "Super durable — doesn’t stretch or tear.",
    image: "",
    rating: 5,
  },
  {
    id: 22,
    name: "Ali Khan",
    comment: "Wallet is superb but packaging can be better.",
    image: "",
    rating: 4,
  },
  {
    id: 23,
    name: "Zoha",
    comment: "Such an elegant design! 10/10",
    image: "",
    rating: 5,
  },
  {
    id: 24,
    name: "Omar",
    comment: "Premium experience overall.",
    image: "",
    rating: 5,
  },
  {
    id: 25,
    name: "Abdul Rehman",
    comment: "Good leather, fair price.",
    image: "",
    rating: 4,
  },
  {
    id: 26,
    name: "Sophia",
    comment: "My daily carry — love it!",
    image: "",
    rating: 5,
  },
  {
    id: 27,
    name: "Imran",
    comment: "Quality is next level!",
    image: "",
    rating: 5,
  },
  {
    id: 28,
    name: "Lina",
    comment: "Gifted to my husband, absolutely loved it!",
    image: "",
    rating: 5,
  },
  {
    id: 29,
    name: "Arslan",
    comment: "I like the craftsmanship but color selection is limited.",
    image: "",
    rating: 4,
  },
  {
    id: 30,
    name: "Yusra",
    comment: "Premium yet affordable — love it!",
    image: "",
    rating: 5,
  },

  
];



export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeReview = reviewsData[activeIndex];

  const nextReview = () => setActiveIndex((prev) => (prev + 1) % reviewsData.length);
  const prevReview = () => setActiveIndex((prev) => (prev - 1 + reviewsData.length) % reviewsData.length);

  // ✅ Counter Animation States
  const [customerCount, setCustomerCount] = useState(0);
  const totalCustomers = 500;
  const sectionRef = useRef(null);

  const randomPositions = useMemo(() =>
  reviewsData.map(() => ({
    dist: 28 + Math.random() * 22,
    size: 45 + Math.random() * 35,
    angle: Math.random() * 2 * Math.PI,
  }))
, []);


  useEffect(() => {
    let timer: any;

    const animateCount = () => {
      let start = 0;
      const duration = 2000;
      const stepTime = 16;
      const increment = totalCustomers / (duration / stepTime);

      timer = setInterval(() => {
        start += increment;
        if (start >= totalCustomers) {
          setCustomerCount(totalCustomers);
          clearInterval(timer);
        } else {
          setCustomerCount(Math.ceil(start));
        }
      }, stepTime);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount();
          } else {
            setCustomerCount(0); // ✅ reset when not visible
            clearInterval(timer);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      observer.disconnect();
      clearInterval(timer);
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-headline text-primary mb-2">
          What Our Clients Say
        </h2>

        <p className="text-foreground/70 mb-12">
          Trusted by{" "}
          <span className="text-primary font-semibold text-4xl">
            {customerCount}+
          </span>{" "}
          happy customers
        </p>

        {/* ✅ Floating Icons */}
<div className="relative h-[350px] md:h-[420px] flex items-center justify-center mb-16 overflow-visible">
  {reviewsData.map((rev, index) => {
    const { dist, size, angle } = randomPositions[index];

    const x = 50 + dist * Math.cos(angle);
    const y = 50 + dist * Math.sin(angle);

    return (
      <button
        key={rev.id}
        onClick={() => setActiveIndex(index)}
        className={`absolute rounded-full flex items-center justify-center border-2
  select-none transition-all duration-300 ease-out
  glow-hover
  ${activeIndex === index ? "border-primary pulse scale-125 z-10" : "border-secondary/40"}
`}



        style={{
          top: `${y}%`,
          left: `${x}%`,
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        {rev.image ? (
          <Image
            src={rev.image}
            alt={rev.name}
            width={size}
            height={size}
            className="rounded-full object-cover"
          />
        ) : (
          <FaUserCircle className="text-muted-foreground w-3/4 h-3/4 opacity-80" />
        )}
      </button>
    );
  })}
</div>

  {/* Center Review Card with Quote Marks */}
<div className="relative max-w-xl mx-auto bg-card p-10 shadow-xl rounded-2xl border border-primary/10">

  {/* Opening Quote - bigger, hanging outside top-left */}
  <div className="absolute -top-12 -left-0 text-9xl md:text-[250px] text-primary">
    &ldquo;
  </div>

  {/* Review Text */}
  <p className="text-foreground/90 italic mb-6">
    {activeReview.comment}
  </p>

  {/* Closing Quote - right side */}
  <div className="absolute top-1/3 right-8 text-9xl md:text-9xl text-primary">
    &rdquo;
  </div>

  {/* Reviewer Name */}
  <h4 className="font-semibold text-primary mt-4">{activeReview.name}</h4>

  {/* Rating Stars */}
  <div className="flex justify-center mt-2 text-yellow-500">
    {"★".repeat(activeReview.rating)}
    {"☆".repeat(5 - activeReview.rating)}
  </div>

  {/* Navigation */}
  <Button
    size="icon"
    variant="outline"
    className="absolute -left-6 top-1/2 -translate-y-1/2"
    onClick={prevReview}
  >
    <ArrowLeft className="h-4 w-4" />
  </Button>
  <Button
    size="icon"
    variant="outline"
    className="absolute -right-6 top-1/2 -translate-y-1/2"
    onClick={nextReview}
  >
    <ArrowRight className="h-4 w-4" />
  </Button>
</div>


      </div>
    </section>
  );
}