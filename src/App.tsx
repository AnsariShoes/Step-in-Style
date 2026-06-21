import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ShoeCanvas from './components/ShoeCanvas';
import { Categories, ShopGrid, Footer, SizeChart, VisitUs } from './components/Sections';
import AdminPanel, { Product } from './components/AdminPanel';
import ProductModal from './components/ProductModal';
import CartDrawer, { CartItem } from './components/CartDrawer';
import { motion } from 'framer-motion';
import { collection, onSnapshot, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';

function Marquee() {
  return (
    <div className="bg-ink text-paper overflow-hidden whitespace-nowrap border-y border-ink/10 py-4 relative z-10">
      <motion.div 
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 25, repeat: Infinity }}
        className="inline-flex items-center"
      >
        {[...Array(2)].map((_, i) => (
          <span key={i} className="flex items-center">
            <span className="px-8 font-mono text-[13px] tracking-widest uppercase">Formal Wear</span>
            <span className="text-sticker-yellow">✦</span>
            <span className="px-8 font-mono text-[13px] tracking-widest uppercase">Casual Wear</span>
            <span className="text-sticker-yellow">✦</span>
            <span className="px-8 font-mono text-[13px] tracking-widest uppercase">Sneakers</span>
            <span className="text-sticker-yellow">✦</span>
            <span className="px-8 font-mono text-[13px] tracking-widest uppercase">Slides & Sandals</span>
            <span className="text-sticker-yellow">✦</span>
            <span className="px-8 font-mono text-[13px] tracking-widest uppercase">Daily Use</span>
            <span className="text-sticker-yellow">✦</span>
            <span className="px-8 font-mono text-[13px] tracking-widest uppercase">Sizes UK 5–11</span>
            <span className="text-sticker-yellow">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

const INITIAL_PRODUCTS: Product[] = [
  { id: '1', name: 'Classic Oxford', price: '₹1,299', mrp: '₹1,599', category: 'Formal', isNew: true },
  { id: '2', name: 'Derby Lace-up', price: '₹1,199', category: 'Formal', isNew: false },
  { id: '3', name: 'Formal Loafer', price: '₹999', mrp: '₹1,299', category: 'Formal', isNew: false },
  { id: '4', name: 'Monk Strap', price: '₹1,499', category: 'Formal', isNew: true },
  
  { id: '5', name: 'Urban Casual', price: '₹899', mrp: '₹1,199', category: 'Casual', isNew: false },
  { id: '6', name: 'Weekend Slip-on', price: '₹799', category: 'Casual', isNew: false },
  { id: '7', name: 'Boat Shoe', price: '₹999', category: 'Casual', isNew: true },
  { id: '8', name: 'Suede Derby', price: '₹1,099', category: 'Casual', isNew: false },
  
  { id: '9', name: 'Street Sneaker', price: '₹1,299', mrp: '₹1,999', category: 'Sneakers', isNew: true },
  { id: '10', name: 'Classic White', price: '₹999', category: 'Sneakers', isNew: false },
  { id: '11', name: 'Running Trainer', price: '₹1,499', category: 'Sneakers', isNew: false },
  { id: '12', name: 'High Top', price: '₹1,599', mrp: '₹2,199', category: 'Sneakers', isNew: true },
  
  { id: '13', name: 'Comfort Slide', price: '₹399', mrp: '₹599', category: 'Slides & Sandals', isNew: true },
  { id: '14', name: 'Leather Sandal', price: '₹699', category: 'Slides & Sandals', isNew: false },
  { id: '15', name: 'Daily Chappal', price: '₹299', category: 'Slides & Sandals', isNew: false },
  { id: '16', name: 'Sport Slide', price: '₹450', mrp: '₹650', category: 'Slides & Sandals', isNew: false },
];

function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);

  React.useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      if (snapshot.empty) {
        // Seed the initial products if the database is completely empty
        INITIAL_PRODUCTS.forEach(async (p) => {
          try {
            await setDoc(doc(db, 'products', p.id), p);
          } catch (e: any) {
            console.error("Seed error: ", e);
            if (e.message.includes('permission')) {
              alert("Firebase Error: Your database is in Production Mode. Please go to Firebase Console -> Firestore -> Rules and set 'allow read, write: if true;'");
            }
          }
        });
      } else {
        const fetchedProducts: Product[] = [];
        snapshot.forEach((document) => {
          fetchedProducts.push(document.data() as Product);
        });
        setProducts(fetchedProducts);
      }
    });

    return () => unsubscribe();
  }, []);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const addProduct = async (p: Product) => {
    try {
      await setDoc(doc(db, 'products', p.id), p);
    } catch (e: any) {
      console.error("Error adding product: ", e);
      alert("Error saving: " + e.message);
    }
  };
  
  const deleteProduct = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'products', id));
    } catch (e: any) {
      console.error("Error deleting product: ", e);
      alert("Error deleting: " + e.message);
    }
  };
  
  const editProduct = async (p: Product) => {
    try {
      await setDoc(doc(db, 'products', p.id), p);
    } catch (e: any) {
      console.error("Error editing product: ", e);
      alert("Error editing: " + e.message);
    }
  };

  const addToCart = (product: Product, size: string) => {
    setCartItems([...cartItems, { ...product, cartId: Date.now().toString(), selectedSize: size }]);
    setIsCartOpen(true);
  };
  const removeFromCart = (cartId: string) => {
    setCartItems(cartItems.filter(x => x.cartId !== cartId));
  };

  return (
    <div className="relative min-h-screen selection:bg-sticker-yellow selection:text-ink overflow-x-hidden">
      <div className="grain pointer-events-none" />
      <ShoeCanvas />
      
      <Navbar cartCount={cartItems.length} onOpenCart={() => setIsCartOpen(true)} />
      
      <main className="relative z-10 pointer-events-none [&>*]:pointer-events-auto">
        <Hero />
        <Marquee />
        <div className="h-[100vh] w-full flex items-center justify-center pointer-events-none">
          {/* This is the little space where the shoe enlarges */}
        </div>

        <Categories onSelectCategory={(cat) => {
          setActiveCategory(cat);
          document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
        }} />
        <ShopGrid 
          products={products} 
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          onSelectProduct={setSelectedProduct} 
        />
        <SizeChart />
        <VisitUs />
        <Footer onOpenAdmin={() => setIsAdminOpen(true)} />
      </main>

      <AdminPanel 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
        products={products}
        onAddProduct={addProduct}
        onDeleteProduct={deleteProduct}
        onEditProduct={editProduct}
      />
      
      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onAddToCart={addToCart} 
      />
      
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={removeFromCart}
      />
    </div>
  );
}

export default App;
