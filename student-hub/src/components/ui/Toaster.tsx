"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';

interface Toast {
    id: string;
    message: string;
}

const ToastContext = createContext<{ toast: (msg: string) => void }>({ toast: () => { } });

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const toast = (message: string) => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts(prev => [...prev, { id, message }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3000);
    };

    useEffect(() => {
        // Override global window.alert to use our beautiful toast instead of native browser popup
        window.alert = (msg) => {
            toast(msg);
        };
    }, []);

    return (
        <ToastContext.Provider value={{ toast }}>
            {children}
            <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
                <AnimatePresence>
                    {toasts.map(t => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, y: 30, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9, y: 10, filter: 'blur(5px)' }}
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                            className="bg-[#111827] text-white shadow-2xl rounded-2xl p-4 flex items-start gap-3 w-[350px] pointer-events-auto border border-gray-800"
                        >
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                            <p className="text-sm font-semibold leading-relaxed flex-1 whitespace-pre-line">{t.message}</p>
                            <button onClick={() => setToasts(prev => prev.filter(x => x.id !== t.id))} className="text-gray-400 hover:text-white transition-colors mt-0.5">
                                <X className="w-4 h-4" />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
}
