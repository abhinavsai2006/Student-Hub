'use client';

import React, { useState, useEffect } from 'react';
import { Search, Bell, Wallet, ChevronDown, Menu } from 'lucide-react';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { useRouter } from 'next/navigation';

interface NavbarProps {
    onMenuToggle: () => void;
}

export default function Navbar({ onMenuToggle }: NavbarProps) {
    const router = useRouter();
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        try {
            const saved = localStorage.getItem('theme');
            const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            const initDark = saved ? saved === 'dark' : prefersDark;
            setIsDark(initDark);
            if (initDark) document.documentElement.classList.add('dark');
        } catch (e) {
            // ignore
        }
    }, []);

    const toggleTheme = () => {
        const next = !isDark;
        setIsDark(next);
        try {
            localStorage.setItem('theme', next ? 'dark' : 'light');
        } catch (e) {}
        document.documentElement.classList.toggle('dark', next);
    };

    return (
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-border">
            <div className="flex items-center justify-between h-16 px-6">
                {/* Mobile menu button */}
                <button
                    onClick={onMenuToggle}
                    className="lg:hidden p-2 rounded-lg hover:bg-surface-hover transition-colors"
                >
                    <Menu className="w-5 h-5 text-text-secondary" />
                </button>

                {/* Search */}
                <div className="hidden md:flex items-center flex-1 max-w-md">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <input
                            type="text"
                            placeholder="Type and press Enter to search..."
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-border-light rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') alert('Searching: ' + e.currentTarget.value);
                            }}
                        />
                    </div>
                </div>

                {/* Right section */}
                <div className="flex items-center gap-3">
                    {/* Theme toggle */}
                    <button onClick={toggleTheme} aria-label="Toggle theme" className="p-2 rounded-lg hover:bg-surface-hover transition-colors">
                        {isDark ? <Sun className="w-5 h-5 text-text-secondary" /> : <Moon className="w-5 h-5 text-text-secondary" />}
                    </button>
                    {/* Wallet */}
                    <div onClick={() => router.push('/finance')} className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                        <Wallet className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-text-primary">₹1,240.50</span>
                    </div>

                    {/* Notifications */}
                    <div className="relative">
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="relative p-2.5 rounded-xl hover:bg-surface-hover transition-colors"
                        >
                            <Bell className="w-5 h-5 text-text-secondary" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full" />
                        </button>

                        <AnimatePresence>
                            {showNotifications && (
                                <motion.div
                                    initial={{ opacity: 0, y: 5, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 5, scale: 0.95 }}
                                    className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-lg border border-border p-4 z-50"
                                >
                                    <h3 className="text-sm font-semibold text-text-primary mb-3">Notifications</h3>
                                    <div className="space-y-3">
                                        {[
                                            { title: 'Laundry Complete', desc: 'Machine W-04 cycle is done', time: '2m ago' },
                                            { title: 'Class Reminder', desc: 'Database Systems Lab in 30 mins', time: '28m ago' },
                                            { title: 'Mess Menu Updated', desc: 'Tonight\'s dinner menu is available', time: '1h ago' },
                                        ].map((n, i) => (
                                            <div key={i} onClick={() => alert(`Opening alert: ${n.title}`)} className="flex gap-3 p-2 rounded-lg hover:bg-surface-hover transition-colors cursor-pointer">
                                                <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0">
                                                    <Bell className="w-3.5 h-3.5 text-primary" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-text-primary">{n.title}</p>
                                                    <p className="text-xs text-text-muted truncate">{n.desc}</p>
                                                </div>
                                                <span className="text-xs text-text-muted flex-shrink-0">{n.time}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Profile */}
                    <div className="relative">
                        <button
                            onClick={() => setShowProfile(!showProfile)}
                            className="flex items-center gap-2 p-1 rounded-xl hover:bg-surface-hover transition-colors"
                        >
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                                <span className="text-white text-sm font-semibold">A</span>
                            </div>
                        </button>

                        <AnimatePresence>
                            {showProfile && (
                                <motion.div
                                    initial={{ opacity: 0, y: 5, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 5, scale: 0.95 }}
                                    className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-lg border border-border p-2 z-50"
                                >
                                    <div className="px-3 py-2 border-b border-border-light mb-1">
                                        <p className="text-sm font-semibold text-text-primary">Aarav Sharma</p>
                                        <p className="text-xs text-text-muted">CS-2024 • B.Tech</p>
                                    </div>
                                    {['My Profile', 'Account Settings', 'Help & Support', 'Sign Out'].map((item, i) => (
                                        <button
                                            key={i}
                                            onClick={() => alert(`${item} action clicked!`)}
                                            className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:bg-surface-hover rounded-lg transition-colors"
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </header>
    );
}
