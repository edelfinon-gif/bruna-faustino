import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppHeader } from '@/components/layout/AppHeader';
import { AppFooter } from '@/components/layout/AppFooter';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader } from '@/components/ui/sidebar';
import { ProductFilterSheet } from '@/components/ProductFilterSheet';
import { Toaster } from '@/components/ui/sonner';
export function App() {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex min-h-screen w-full bg-background">
        {/* Desktop Filter Sidebar */}
        <Sidebar className="hidden md:block">
          <SidebarHeader className="h-16 flex items-center px-6 border-b">
            <span className="font-bold">AçaiBloom Menu</span>
          </SidebarHeader>
          <SidebarContent>
            <ProductFilterSheet />
          </SidebarContent>
        </Sidebar>
        <div className="flex-1 flex flex-col min-h-screen">
          <AppHeader />
          <main className="flex-1">
            <Outlet />
          </main>
          <AppFooter />
        </div>
      </div>
      <Toaster richColors position="top-center" />
    </SidebarProvider>
  );
}