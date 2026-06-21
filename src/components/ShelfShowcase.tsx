import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const SHELVES = [
  { id: 1, title: 'Formal Wear', subtitle: 'Step into the boardroom with confidence.' },
  { id: 2, title: 'Casual Styles', subtitle: 'Perfect for the weekend getaway.' },
  { id: 3, title: 'Premium Sneakers', subtitle: 'Streetwear essentials, elevated.' },
  { id: 4, title: 'Slides & Sandals', subtitle: 'Everyday comfort, redefined.' },
];

export default function ShelfShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full bg-transparent pointer-events-none">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden pointer-events-none">
        
        {SHELVES.map((shelf, index) => {
          // Calculate the active window for each shelf (0-0.25, 0.25-0.5, etc.)
          const start = index * 0.25;
          const peak = start + 0.125;
          const end = start + 0.25;
          
          // x translates from 100vw (right) to 0 (center) to -100vw (left)
          const x = useTransform(
            scrollYProgress,
            [start, peak, end],
            ["100vw", "0vw", "-100vw"]
          );
          
          const opacity = useTransform(
            scrollYProgress,
            [start, start + 0.05, end - 0.05, end],
            [0, 1, 1, 0]
          );

          return (
            <motion.div 
              key={shelf.id}
              style={{ x, opacity }}
              className="absolute inset-0 w-full h-full flex flex-col justify-end pb-32 items-center text-center z-10 drop-shadow-2xl pointer-events-none"
            >
              <div className="px-6 py-4 max-w-2xl w-full mx-auto pointer-events-auto">
                <span className="font-mono text-sticker-yellow bg-ink px-3 py-1 text-sm font-bold tracking-widest uppercase rounded-full mb-4 inline-block shadow-lg">
                  Shelf {shelf.id}
                </span>
                <h2 className="text-[clamp(40px,8vw,72px)] leading-[1] font-anton text-ink uppercase mb-2 drop-shadow-md">
                  {shelf.title}
                </h2>
                <p className="text-xl md:text-2xl text-ink font-bold drop-shadow-md bg-white/50 backdrop-blur-sm px-4 py-2 rounded-xl inline-block">
                  {shelf.subtitle}
                </p>
              </div>
            </motion.div>
          );
        })}

      </div>
    </div>
  );
}
