import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Menu, ShoppingBag } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
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
  return (
    <header className={cn(
      "sticky top-0 z-40 w-full border-b transition-all duration-300",
      isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm h-16" : "bg-background h-20"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex h-full items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="md:hidden">
              <SidebarTrigger className="hover:bg-purple-berry/5 text-purple-berry" />
            </div>
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
                className={cn(
                  "text-sm font-bold uppercase tracking-widest transition-all hover:text-purple-berry relative group",
                  location.pathname === link.href ? "text-purple-berry" : "text-muted-foreground"
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
            <Button variant="ghost" size="icon" className="relative text-purple-berry hover:bg-purple-berry/5 sm:hidden">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-orange-peach rounded-full" />
            </Button>
            <Button className="hidden sm:flex btn-gradient px-8 h-11 rounded-full font-bold shadow-lg hover:shadow-purple-berry/20 hover:scale-105 active:scale-95 transition-all">
              Peça Agora
            </Button>
            <div className="md:hidden flex items-center">
              <Button variant="ghost" size="icon" className="text-foreground">
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}