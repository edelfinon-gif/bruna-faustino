import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { AppHeader } from '@/components/layout/AppHeader';
import { AppFooter } from '@/components/layout/AppFooter';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarInset } from '@/components/ui/sidebar';
import { ProductFilterSheet } from '@/components/ProductFilterSheet';
import { Toaster } from '@/components/ui/sonner';
/**
 * Main application layout wrapper.
 * Centralizes Sidebar, Header, and Footer for all pages.
 */
export function App() {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex min-h-screen w-full bg-background font-sans selection:bg-purple-berry/20 selection:text-purple-berry">
        {/* Desktop Filter Sidebar */}
        <Sidebar className="hidden md:block border-r border-border/50">
          <SidebarHeader className="h-16 flex items-center px-6 border-b bg-background">
            <span className="font-display font-black text-purple-berry tracking-tighter text-xl">AçaiBloom</span>
          </SidebarHeader>
          <SidebarContent className="bg-background/50">
            <ProductFilterSheet />
          </SidebarContent>
        </Sidebar>
        <SidebarInset className="flex-1 flex flex-col min-h-screen relative">
          <AppHeader />
          <main className="flex-1 flex flex-col">
            <Suspense fallback={
              <div className="flex-1 flex items-center justify-center">
                <div className="h-12 w-12 rounded-full border-4 border-purple-berry border-t-transparent animate-spin" />
              </div>
            }>
              <Outlet />
            </Suspense>
          </main>
          <AppFooter />
        </SidebarInset>
      </div>
      <Toaster richColors position="top-right" closeButton />
    </SidebarProvider>
  );
}