import { motion } from 'framer-motion';

export default function Navbar({ cartCount, onOpenCart }: { cartCount?: number, onOpenCart?: () => void }) {
  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-[1180px] bg-white/70 backdrop-blur-xl border border-ink/10 rounded-2xl px-6 py-4 flex items-center justify-between shadow-soft z-50"
    >
      <a href="#top" className="flex items-center gap-3 font-extrabold group">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-box-green to-box-green-dark flex items-center justify-center text-paper shadow-soft overflow-hidden relative transition-transform group-hover:scale-105 border border-ink/5">
          <span className="font-anton text-xl z-10 text-paper">A</span>
          <div className="absolute bottom-1 w-[55%] h-1 bg-sticker-yellow rounded-full z-10" />
        </div>
        <div className="flex flex-col">
          <span className="font-anton text-xl tracking-wide uppercase text-ink">Ansari Shoes</span>
        </div>
      </a>

      <nav className="hidden md:flex gap-8 items-center text-sm font-bold text-ink-soft">
        <a href="#shop" className="hover:text-ink transition-colors">Shop</a>
        <a href="#sizes" className="hover:text-ink transition-colors">Size Chart</a>
        <a href="#about" className="hover:text-ink transition-colors">Visit Us</a>
      </nav>

      <button onClick={onOpenCart} className="bg-ink text-paper px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-box-green transition-colors shadow-sm flex items-center gap-2">
        <span>🛒</span> Box ({cartCount || 0})
      </button>
    </motion.header>
  );
}
