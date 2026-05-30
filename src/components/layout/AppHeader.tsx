import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
export function AppHeader() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navLinks = [
    { name: 'Cardápio', href: '/#menu' },
    { name: 'Benefícios', href: '/#benefits' },
    { name: 'Privacidade', href: '/privacy' },
  ];
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      const id = href.replace('/#', '');
      const element = document.getElementById(id);
      if (element) {
        e.preventDefault();
        window.history.pushState(null, '', href);
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  const isActive = (href: string) => {
    if (href.startsWith('/#')) {
      return location.hash === href.replace('/', '');
    }
    return location.pathname === href;
  };
  return (
    <header className={cn(
      "sticky top-0 z-40 w-full transition-all duration-300",
      isScrolled 
        ? "bg-background/95 backdrop-blur-md shadow-md h-16 border-b" 
        : "bg-background h-24"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex h-full items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            <SidebarTrigger className="h-10 w-10 hover:bg-purple-berry/10 text-purple-berry transition-colors" />
            <Link to="/" className="flex items-center gap-2 group">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-berry to-orange-peach flex items-center justify-center text-white font-black text-xl shadow-lg group-hover:scale-110 transition-transform">
                A
              </div>
              <span className="hidden sm:inline-block text-2xl font-display font-black tracking-tighter text-foreground">
                Açai<span className="text-purple-berry">Bloom</span>
              </span>
            </Link>
          </div>
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className={cn(
                  "text-sm font-bold uppercase tracking-widest transition-all hover:text-purple-berry relative group py-2",
                  isActive(link.href) ? "text-purple-berry" : "text-muted-foreground"
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute bottom-0 left-0 h-0.5 bg-purple-berry transition-all duration-300 group-hover:w-full",
                  isActive(link.href) ? "w-full" : "w-0"
                )} />
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden sm:flex items-center">
              <ThemeToggle className="static" />
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
              <Button variant="ghost" size="icon" className="h-11 w-11 text-purple-berry hover:bg-purple-berry/5 rounded-full">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-5 w-5 bg-orange-peach text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-background animate-in fade-in zoom-in duration-300">
                  2
                </span>
              </Button>
            </motion.div>
            <Button className="hidden md:flex btn-gradient px-8 h-11 rounded-full font-bold shadow-lg hover:shadow-purple-berry/20 hover:scale-105 active:scale-95 transition-all">
              Peça Agora
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}