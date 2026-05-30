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
      setIsScrolled(window.scrollY > 20);
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
  return (
    <header className={cn(
      "sticky top-0 z-40 w-full border-b transition-all duration-300",
      isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm h-16" : "bg-background h-20"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex h-full items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="hover:bg-purple-berry/5 text-purple-berry" />
            <Link to="/" className="flex items-center gap-2 group">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-purple-berry to-orange-peach flex items-center justify-center text-white font-black text-lg shadow-lg group-hover:rotate-12 transition-transform">
                A
              </div>
              <span className="text-2xl font-display font-black tracking-tighter text-foreground">
                Açai<span className="text-purple-berry">Bloom</span>
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className={cn(
                  "text-sm font-bold uppercase tracking-widest transition-all hover:text-purple-berry relative group",
                  location.pathname === link.href || (location.pathname === '/' && location.hash === link.href.replace('/', '')) 
                    ? "text-purple-berry" 
                    : "text-muted-foreground"
                )}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-berry transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center mr-2">
              <ThemeToggle className="static" />
            </div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="relative">
              <Button variant="ghost" size="icon" className="text-purple-berry hover:bg-purple-berry/5">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-orange-peach text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-background">
                  2
                </span>
              </Button>
            </motion.div>
            <Button className="hidden sm:flex btn-gradient px-8 h-11 rounded-full font-bold shadow-lg hover:shadow-purple-berry/20 hover:scale-105 active:scale-95 transition-all">
              Peça Agora
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}