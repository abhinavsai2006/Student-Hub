'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard, UtensilsCrossed, WashingMachine, BookOpen,
    Bus, Wallet, Users, Heart, Wrench, Settings, ChevronLeft,
    GraduationCap
} from 'lucide-react';

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

interface SidebarProps {
    collapsed: boolean;
    onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
    const pathname = usePathname();

    return (
        <motion.aside
            className="fixed left-0 top-0 h-full bg-white border-r border-border z-40 flex flex-col sidebar-transition"
            animate={{ width: collapsed ? 72 : 240 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
            {/* Logo */}
            <div className="flex items-center gap-2.5 px-5 py-5 border-b border-border-light">
                <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <AnimatePresence>
                    {!collapsed && (
                        <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: 'auto' }}
                            exit={{ opacity: 0, width: 0 }}
                            className="text-lg font-bold text-text-primary whitespace-nowrap overflow-hidden"
                        >
                            Student Hub
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-3 px-3 overflow-y-auto">
                <ul className="space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href ||
                            (item.href !== '/' && pathname.startsWith(item.href));
                        const Icon = item.icon;

                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${isActive
                                            ? 'bg-primary-50 text-primary font-semibold'
                                            : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
                                        }`}
                                    title={collapsed ? item.label : undefined}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeNav"
                                            className="absolute inset-0 bg-primary-50 rounded-xl"
                                            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <Icon className={`w-5 h-5 flex-shrink-0 relative z-10 ${isActive ? 'text-primary' : ''}`} />
                                    <AnimatePresence>
                                        {!collapsed && (
                                            <motion.span
                                                initial={{ opacity: 0, width: 0 }}
                                                animate={{ opacity: 1, width: 'auto' }}
                                                exit={{ opacity: 0, width: 0 }}
                                                className="text-sm whitespace-nowrap overflow-hidden relative z-10"
                                            >
                                                {item.label}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Bottom section */}
            <div className="border-t border-border-light px-3 py-3 space-y-1">
                <Link
                    href="/settings"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-all"
                    title={collapsed ? 'Settings' : undefined}
                >
                    <Settings className="w-5 h-5 flex-shrink-0" />
                    <AnimatePresence>
                        {!collapsed && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-sm whitespace-nowrap"
                            >
                                Settings
                            </motion.span>
                        )}
                    </AnimatePresence>
                </Link>

                <button
                    onClick={onToggle}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-all w-full"
                >
                    <motion.div animate={{ rotate: collapsed ? 180 : 0 }} transition={{ duration: 0.3 }}>
                        <ChevronLeft className="w-5 h-5 flex-shrink-0" />
                    </motion.div>
                    <AnimatePresence>
                        {!collapsed && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-sm whitespace-nowrap"
                            >
                                Collapse
                            </motion.span>
                        )}
                    </AnimatePresence>
                </button>
            </div>
        </motion.aside>
    );
}
