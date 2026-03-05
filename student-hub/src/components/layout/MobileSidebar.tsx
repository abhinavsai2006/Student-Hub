'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GraduationCap, LayoutDashboard, UtensilsCrossed, WashingMachine, BookOpen, Bus, Wallet, Users, Heart, Wrench, Settings } from 'lucide-react';

const navItems = [
    { label: 'Dashboard', href: '/', icon: LayoutDashboard },
    { label: 'Mess & Food', href: '/mess', icon: UtensilsCrossed },
    { label: 'Laundry', href: '/laundry', icon: WashingMachine },
    { label: 'Study', href: '/study', icon: BookOpen },
    { label: 'Transport', href: '/transport', icon: Bus },
    { label: 'Finance', href: '/finance', icon: Wallet },
    { label: 'Community', href: '/community', icon: Users },
    { label: 'Health', href: '/health', icon: Heart },
    { label: 'Tools', href: '/tools', icon: Wrench },
];

interface MobileSidebarProps {
    open: boolean;
    onClose: () => void;
}

export default function MobileSidebar({ open, onClose }: MobileSidebarProps) {
    const pathname = usePathname();

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 z-50 lg:hidden"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ x: -280 }}
                        animate={{ x: 0 }}
                        exit={{ x: -280 }}
                        transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                        className="fixed left-0 top-0 h-full w-[280px] bg-white z-50 flex flex-col shadow-xl lg:hidden"
                    >
                        <div className="flex items-center justify-between px-5 py-5 border-b border-border-light">
                            <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                                    <GraduationCap className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-lg font-bold text-text-primary">Student Hub</span>
                            </div>
                            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-surface-hover">
                                <X className="w-5 h-5 text-text-secondary" />
                            </button>
                        </div>

                        <nav className="flex-1 py-3 px-3 overflow-y-auto">
                            <ul className="space-y-1">
                                {navItems.map((item) => {
                                    const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                                    const Icon = item.icon;
                                    return (
                                        <li key={item.href}>
                                            <Link
                                                href={item.href}
                                                onClick={onClose}
                                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${isActive
                                                        ? 'bg-primary-50 text-primary font-semibold'
                                                        : 'text-text-secondary hover:bg-surface-hover'
                                                    }`}
                                            >
                                                <Icon className="w-5 h-5" />
                                                <span className="text-sm">{item.label}</span>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>

                        <div className="border-t border-border-light px-3 py-3">
                            <Link href="/settings" onClick={onClose} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-text-secondary hover:bg-surface-hover">
                                <Settings className="w-5 h-5" />
                                <span className="text-sm">Settings</span>
                            </Link>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
