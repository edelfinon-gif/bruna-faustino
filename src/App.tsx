import React, { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AppHeader } from '@/components/layout/AppHeader';
import { AppFooter } from '@/components/layout/AppFooter';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarInset } from '@/components/ui/sidebar';
import { ProductFilterSheet } from '@/components/ProductFilterSheet';
import { Toaster } from '@/components/ui/sonner';
/**
 * Main application layout wrapper.
 * Final Phase: Social refinement & Build stabilization.
 */
export function App() {
  const location = useLocation();
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex min-h-screen w-full bg-background font-sans selection:bg-purple-berry/20 selection:text-purple-berry overflow-x-hidden">
        {/* Sidebar handles its own desktop/mobile visibility logic via Sidebar.tsx */}
        <Sidebar className="border-r border-border/40 w-[280px] bg-white">
          <SidebarHeader className="h-20 flex items-center px-8 border-b bg-white">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-purple-berry flex items-center justify-center text-white font-bold text-sm">A</div>
              <span className="font-display font-black text-purple-berry tracking-tighter text-xl uppercase">Filtros</span>
            </div>
          </SidebarHeader>
          <SidebarContent className="bg-white">
            <ProductFilterSheet />
          </SidebarContent>
        </Sidebar>
        <SidebarInset className="flex-1 flex flex-col min-h-screen relative bg-transparent overflow-x-hidden">
          <AppHeader />
          <main className="flex-1 flex flex-col relative w-full overflow-x-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex-1 flex flex-col w-full overflow-x-hidden"
              >
                <Suspense fallback={
                  <div className="flex-1 flex items-center justify-center bg-background/50 backdrop-blur-sm z-50">
                    <div className="flex flex-col items-center gap-6">
                      <div className="relative">
                        <div className="h-16 w-16 rounded-full border-4 border-purple-berry/20 border-t-purple-berry animate-spin" />
                        <div className="absolute inset-0 h-16 w-16 rounded-full border-4 border-transparent border-b-orange-peach animate-[spin_2s_linear_infinite]" />
                      </div>
                      <p className="text-purple-berry font-black animate-pulse uppercase tracking-widest text-xs">Colhendo Açaí Fresco...</p>
                    </div>
                  </div>
                }>
                  <Outlet />
                </Suspense>
              </motion.div>
            </AnimatePresence>
          </main>
          <AppFooter />
        </SidebarInset>
      </div>
      <Toaster richColors position="top-right" closeButton expand />
    </SidebarProvider>
  );
}