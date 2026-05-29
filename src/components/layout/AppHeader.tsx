import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Filter, Menu } from 'lucide-react';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { SidebarTrigger } from '@/components/ui/sidebar';
export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="md:hidden">
              <SidebarTrigger />
            </div>
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-berry to-orange-peach flex items-center justify-center text-white font-bold">
                A
              </div>
              <span className="text-xl font-display font-bold tracking-tight">AçaiBloom</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium hover:text-purple-berry transition-colors">Cardápio</Link>
            <Link to="/" className="text-sm font-medium hover:text-purple-berry transition-colors">Benefícios</Link>
            <Link to="/" className="text-sm font-medium hover:text-purple-berry transition-colors">Localização</Link>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle className="static" />
            <div className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
            <Button className="hidden sm:flex btn-gradient px-6 rounded-full font-semibold">
              Peça Agora
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}