'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import MobileSidebar from './MobileSidebar';
import Footer from './Footer';
import { ToastProvider } from '../ui/Toaster';

export default function AppShell({ children }: { children: React.ReactNode }) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isDesktop, setIsDesktop] = useState(true);

    useEffect(() => {
        setMounted(true);
        const check = () => setIsDesktop(window.innerWidth >= 1024);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // Defaut to non-transitioning desktop margin on SSR, then update on mount
    const marginLeft = !mounted ? 240 : (isDesktop ? (sidebarCollapsed ? 72 : 240) : 0);

    return (
        <ToastProvider>
            <div className="min-h-screen bg-background">
                {/* Desktop Sidebar */}
                <div className="hidden lg:block">
                    <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
                </div>

                {/* Mobile Sidebar */}
                <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />

                {/* Main Content */}
                <div
                    className="flex flex-col min-h-screen transition-[margin-left] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
                    style={{ marginLeft }}
                >
                    <Navbar onMenuToggle={() => setMobileOpen(true)} />

                    <main className="flex-1 p-4 md:p-6">
                        {children}
                    </main>

                    <Footer />
                </div>
            </div>
        </ToastProvider>
    );
}
