'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, User, Bell, Shield, Palette, Globe, Moon, Sun } from 'lucide-react';

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};
const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0 }
};

export default function SettingsPage() {
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [emailNotifs, setEmailNotifs] = useState(true);

    const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
        <button
            onClick={onChange}
            className={`w-11 h-6 rounded-full transition-colors ${value ? 'bg-primary' : 'bg-gray-200'}`}
        >
            <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${value ? 'translate-x-5.5' : 'translate-x-0.5'}`} />
        </button>
    );

    return (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-3xl mx-auto">
            <motion.div variants={item}>
                <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
                    <Settings className="w-7 h-7 text-primary" />
                    Settings
                </h1>
                <p className="text-sm text-text-secondary mt-1">Manage your account and preferences.</p>
            </motion.div>

            {/* Profile */}
            <motion.div variants={item} className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                <h2 className="text-base font-bold text-text-primary mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" /> Profile
                </h2>
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <span className="text-white text-xl font-bold">A</span>
                    </div>
                    <div>
                        <p className="text-base font-semibold text-text-primary">Aarav Sharma</p>
                        <p className="text-sm text-text-muted">CS-2024-042 • B.Tech Computer Science</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium text-text-primary block mb-1.5">Email</label>
                        <input type="email" defaultValue="aarav.sharma@university.edu"
                            className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-text-primary block mb-1.5">Phone</label>
                        <input type="tel" defaultValue="+91 98765 43210"
                            className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                    </div>
                </div>
            </motion.div>

            {/* Notifications */}
            <motion.div variants={item} className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                <h2 className="text-base font-bold text-text-primary mb-4 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-primary" /> Notifications
                </h2>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-text-primary">Push Notifications</p>
                            <p className="text-xs text-text-muted">Receive alerts for classes, laundry, and updates</p>
                        </div>
                        <Toggle value={notifications} onChange={() => setNotifications(!notifications)} />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-text-primary">Email Notifications</p>
                            <p className="text-xs text-text-muted">Weekly digest and important announcements</p>
                        </div>
                        <Toggle value={emailNotifs} onChange={() => setEmailNotifs(!emailNotifs)} />
                    </div>
                </div>
            </motion.div>

            {/* Appearance */}
            <motion.div variants={item} className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                <h2 className="text-base font-bold text-text-primary mb-4 flex items-center gap-2">
                    <Palette className="w-5 h-5 text-primary" /> Appearance
                </h2>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {darkMode ? <Moon className="w-5 h-5 text-text-secondary" /> : <Sun className="w-5 h-5 text-warning" />}
                        <div>
                            <p className="text-sm font-medium text-text-primary">Dark Mode</p>
                            <p className="text-xs text-text-muted">Switch to dark theme</p>
                        </div>
                    </div>
                    <Toggle value={darkMode} onChange={() => setDarkMode(!darkMode)} />
                </div>
            </motion.div>

            {/* Save */}
            <motion.div variants={item} className="flex justify-end">
                <button className="px-6 py-3 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors">
                    Save Changes
                </button>
            </motion.div>
        </motion.div>
    );
}
