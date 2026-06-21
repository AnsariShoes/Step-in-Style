import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="relative pt-32 pb-20 overflow-hidden min-h-screen flex items-center">
      <div className="max-w-[1180px] mx-auto px-6 w-full z-10 relative">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl md:bg-transparent bg-white/40 md:backdrop-blur-none backdrop-blur-md md:p-0 p-6 rounded-3xl"
        >
          <motion.span 
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-sticker-yellow text-ink font-mono text-[11.5px] font-bold tracking-wider px-4 py-2 rounded-full border-2 border-dashed border-ink uppercase mb-6"
          >
            Korba's Own · Walk-in & WhatsApp Orders
          </motion.span>
          
          <motion.h1 
            variants={itemVariants}
            className="text-[clamp(48px,8vw,86px)] leading-[0.9] font-anton text-ink uppercase mb-6"
          >
            STEP INTO <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-box-green via-box-green-dark to-sticker-yellow">AFFORDABLE.</span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg text-ink font-bold max-w-md mb-10 leading-relaxed"
          >
            Formals, casuals, sneakers, slides and everyday wear — every shelf in the shop, now in your pocket. Honest prices, real stock, sizes UK 5 to 11.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <a href="#shop" className="inline-flex items-center gap-2 px-7 py-4 bg-ink text-paper font-bold text-[14.5px] rounded-xl border border-ink hover:bg-box-green hover:border-box-green transition-all duration-300 transform hover:-translate-y-1 hover:shadow-soft">
              Browse The Shop ↓
            </a>
            <a href="#" className="inline-flex items-center gap-2 px-7 py-4 bg-white/50 text-ink font-bold text-[14.5px] rounded-xl border border-ink hover:bg-ink hover:text-paper transition-all duration-300 transform hover:-translate-y-1 hover:shadow-soft">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.6-.8-2.6-1.4-3.7-3.1-.3-.4 0-.4.2-.6.2-.2.5-.6.7-.8.2-.2.1-.4 0-.6-.1-.2-.7-1.6-.9-2.2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.4-.2.2-.9 1-.9 2.3 0 1.3 1 2.6 1.1 2.8.1.2 1.8 2.8 4.4 3.8 2.2.8 2.6.7 3.1.6.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.1-1.4-.1-.1-.3-.2-.5-.3z"/><path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.6 1.4 5.1L2 22l5.1-1.3C8.5 21.5 10.2 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.6 0-3.1-.4-4.5-1.2l-.3-.2-3.3.9.9-3.2-.2-.3C3.8 14.7 3.3 13.4 3.3 12 3.3 7.2 7.2 3.3 12 3.3S20.7 7.2 20.7 12 16.8 20.2 12 20.2z"/></svg>
              Order on WhatsApp
            </a>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full hidden lg:block z-0 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, y: [-10, 10, -10] }}
          transition={{ 
            opacity: { delay: 0.8, duration: 0.5 },
            scale: { delay: 0.8, type: "spring" },
            y: { repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 } 
          }}
          className="absolute top-[30%] right-[10%] md:top-[25%] bg-white/90 backdrop-blur-sm border-2 border-dashed border-ink rounded-xl p-4 shadow-soft rotate-6 z-10"
        >
          <div className="font-mono text-[10px] tracking-widest text-ink-soft uppercase mb-1">Korba's Own</div>
          <div className="font-bold text-box-green text-sm leading-tight">PREMIUM <br/> FOOTWEAR</div>
        </motion.div>
      </div>
    </section>
  );
}
