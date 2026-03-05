'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar, Star, ChevronLeft, ChevronRight, MessageSquare, Users,
    ShoppingCart, Clock, Flame, Plus, Search, Tag, Info, CheckCircle2, CreditCard
} from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { messMenuItems, cafeItems } from '@/lib/mock-data';

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};
const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0 }
};

const weekDays = [
    { day: 'MON', date: 12 },
    { day: 'TUE', date: 13 },
    { day: 'WED', date: 14 },
    { day: 'THU', date: 15 },
    { day: 'FRI', date: 16 },
    { day: 'SAT', date: 17 },
    { day: 'SUN', date: 18 },
];

const mealTabs = ['Breakfast', 'Lunch', 'Dinner'];
const cafeCategories = ['All Items', 'Quick Bites', 'Beverages', 'Main Course', 'Desserts', 'Healthy'];

export default function MessPage() {
    const [activeTab, setActiveTab] = useState<'mess' | 'cafe'>('mess');
    const [selectedDay, setSelectedDay] = useState(14);
    const [activeMeal, setActiveMeal] = useState('Lunch');
    const [activeCategory, setActiveCategory] = useState('All Items');
    const [cart, setCart] = useState<{ id: string; qty: number; name: string; price: number }[]>([]);
    const [notEating, setNotEating] = useState(false);

    // Modal states
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [feedbackType, setFeedbackType] = useState('General');
    const [feedbackText, setFeedbackText] = useState('');
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const cartTotal = cart.reduce((sum, c) => {
        const cafItem = cafeItems.find(ci => ci.id === c.id);
        return sum + (cafItem ? cafItem.price * c.qty : 0);
    }, 0);

    const addToCart = (id: string, name: string, price: number) => {
        setCart(prev => {
            const existing = prev.find(c => c.id === id);
            if (existing) return prev.map(c => c.id === id ? { ...c, qty: c.qty + 1 } : c);
            return [...prev, { id, qty: 1, name, price }];
        });
    };

    const changeWeek = (direction: 'prev' | 'next') => {
        // Just mock week change
        setSelectedDay(prev => direction === 'next' ? prev + 7 : prev - 7);
    };

    return (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-text-primary">
                        {activeTab === 'mess' ? 'Mess Menu' : 'Cafe & Quick Bites'}
                    </h1>
                    {activeTab === 'mess' && (
                        <div className="flex items-center gap-1.5 mt-1 text-text-secondary text-sm">
                            <Calendar className="w-4 h-4" />
                            Wednesday, October 14th, 2024
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-3">
                    {activeTab === 'mess' ? (
                        <>
                            <button onClick={() => setActiveModal('feedback')} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-border rounded-xl text-sm font-medium hover:bg-surface-hover transition-colors">
                                <MessageSquare className="w-4 h-4" />
                                Feedback
                            </button>
                            <button onClick={() => setActiveModal('contact_committee')} className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors">
                                <Users className="w-4 h-4" />
                                Mess Committee
                            </button>
                        </>
                    ) : null}
                </div>
            </motion.div>

            {/* Tab Switcher */}
            <motion.div variants={item} className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
                <button
                    onClick={() => setActiveTab('mess')}
                    className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'mess' ? 'bg-white shadow-sm text-text-primary' : 'text-text-secondary hover:text-text-primary'
                        }`}
                >
                    Mess Menu
                </button>
                <button
                    onClick={() => setActiveTab('cafe')}
                    className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'cafe' ? 'bg-white shadow-sm text-text-primary' : 'text-text-secondary hover:text-text-primary'
                        }`}
                >
                    Cafe Ordering
                </button>
            </motion.div>

            <AnimatePresence mode="wait">
                {activeTab === 'mess' ? (
                    <motion.div
                        key="mess"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-6"
                    >
                        {/* Date Selector */}
                        <div className="flex items-center justify-center gap-2 md:gap-4">
                            <button onClick={() => changeWeek('prev')} className="p-2 rounded-lg border border-border hover:bg-surface-hover transition-colors">
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <div className="flex gap-1 md:gap-3">
                                {weekDays.map(d => (
                                    <button
                                        key={d.date}
                                        onClick={() => setSelectedDay(d.date)}
                                        className={`flex flex-col items-center px-3 md:px-5 py-2 rounded-xl transition-all ${selectedDay === d.date
                                            ? 'bg-primary text-white'
                                            : 'hover:bg-surface-hover text-text-secondary'
                                            }`}
                                    >
                                        <span className="text-xs font-medium">{d.day}</span>
                                        <span className="text-lg font-bold">{d.date}</span>
                                    </button>
                                ))}
                            </div>
                            <button onClick={() => changeWeek('next')} className="p-2 rounded-lg border border-border hover:bg-surface-hover transition-colors">
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Meal Tabs */}
                        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
                            {mealTabs.map(meal => (
                                <button
                                    key={meal}
                                    onClick={() => setActiveMeal(meal)}
                                    className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${activeMeal === meal ? 'bg-white shadow-sm text-text-primary' : 'text-text-secondary'
                                        }`}
                                >
                                    {meal}
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Menu Items */}
                            <div className="lg:col-span-2 space-y-4">
                                {/* Planning Toggle */}
                                <div className="flex items-center justify-between p-4 bg-primary-50 rounded-2xl border border-primary/20">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                            <Info className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-text-primary">Planning to eat Lunch?</p>
                                            <p className="text-xs text-text-muted">Help us reduce food waste. Toggle if you&apos;re eating elsewhere.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-text-muted">I&apos;m not eating</span>
                                        <button
                                            onClick={() => setNotEating(!notEating)}
                                            className={`w-11 h-6 rounded-full transition-colors ${notEating ? 'bg-primary' : 'bg-gray-200'}`}
                                        >
                                            <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${notEating ? 'translate-x-5.5' : 'translate-x-0.5'}`} />
                                        </button>
                                    </div>
                                </div>

                                {/* Food Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {messMenuItems.map((menuItem, i) => (
                                        <div key={i} className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden card-hover">
                                            <div className="relative h-40 bg-gradient-to-br from-orange-100 to-yellow-50 flex items-center justify-center">
                                                <span className="text-6xl">🍛</span>
                                                <div className="absolute top-3 left-3 bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                                                    {menuItem.calories} kcal
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <div className="flex items-start justify-between">
                                                    <h3 className="text-base font-bold text-text-primary">{menuItem.name}</h3>
                                                    <div className="flex items-center gap-1">
                                                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                                                        <span className="text-sm font-semibold">{menuItem.rating}</span>
                                                    </div>
                                                </div>
                                                <p className="text-xs text-text-muted mt-1">{menuItem.description}</p>
                                                {menuItem.reviews && (
                                                    <p className="text-xs text-text-muted mt-1">({menuItem.reviews} reviews)</p>
                                                )}
                                                <div className="flex flex-wrap gap-1.5 mt-3">
                                                    {menuItem.tags.map((tag, j) => (
                                                        <span key={j} className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-text-secondary font-medium">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button onClick={() => setActiveModal('monthly_menu')} className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
                                    View Full Menu <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Nutrition Panel */}
                            <div className="space-y-4">
                                <div className="bg-white rounded-2xl p-5 border border-border shadow-sm">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Flame className="w-4 h-4 text-danger" />
                                        <h3 className="text-base font-bold text-text-primary">Meal Nutrition</h3>
                                    </div>
                                    <p className="text-xs text-text-muted mb-4">Estimated for current selection</p>

                                    <div className="flex justify-center mb-6">
                                        <div className="relative w-28 h-28">
                                            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                                                <circle cx="60" cy="60" r="52" stroke="#f3f4f6" strokeWidth="10" fill="none" />
                                                <circle cx="60" cy="60" r="52" stroke="#4361ee" strokeWidth="10" fill="none"
                                                    strokeDasharray={`${2 * Math.PI * 52}`}
                                                    strokeDashoffset={`${2 * Math.PI * 52 * 0.2}`}
                                                    strokeLinecap="round" />
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <span className="text-2xl font-bold text-text-primary">680</span>
                                                <span className="text-xs text-text-muted uppercase">KCAL</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        {[
                                            { name: 'Protein', value: '28g', color: 'bg-red-400', width: '60%' },
                                            { name: 'Carbs', value: '85g', color: 'bg-primary', width: '80%' },
                                            { name: 'Healthy Fats', value: '22g', color: 'bg-teal-400', width: '45%' },
                                        ].map((nutrient, i) => (
                                            <div key={i}>
                                                <div className="flex justify-between text-xs mb-1">
                                                    <span className="text-text-secondary">{nutrient.name}</span>
                                                    <span className="text-text-primary font-semibold">{nutrient.value}</span>
                                                </div>
                                                <div className="w-full bg-gray-100 rounded-full h-1.5">
                                                    <div className={`${nutrient.color} h-1.5 rounded-full`} style={{ width: nutrient.width }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Special Alert */}
                                <div className="bg-orange-50 rounded-2xl p-4 border border-orange-200">
                                    <div className="flex items-start gap-3">
                                        <span className="text-xl">🎉</span>
                                        <div>
                                            <h4 className="text-sm font-bold text-text-primary">Sunday Special Alert</h4>
                                            <p className="text-xs text-text-secondary mt-1">
                                                The mess committee is organizing a &quot;Taste of Punjab&quot; special dinner this Sunday at 8:00 PM. Don&apos;t forget to opt in!
                                            </p>
                                            <button onClick={() => setActiveModal('opt_in_success')} className="text-xs text-primary font-semibold mt-2 inline-block hover:underline">
                                                View Menu Details & Opt In →
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Tip */}
                                <div className="flex items-start gap-2 p-3">
                                    <span className="text-sm">💡</span>
                                    <p className="text-xs text-text-muted italic">
                                        &quot;Choosing Paneer Butter Masala today gives you 25% more protein than the average lunch.&quot;
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="cafe"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        {/* Promo Banner */}
                        <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-6 md:p-8 relative overflow-hidden border border-primary/10">
                            <div className="relative z-10">
                                <span className="bg-primary text-white text-xs px-3 py-1 rounded-full font-semibold">Daily Special</span>
                                <h2 className="text-2xl md:text-3xl font-bold text-text-primary mt-3">
                                    Beat the afternoon slump with{' '}
                                    <span className="text-primary">Fresh Brews</span>
                                </h2>
                                <p className="text-sm text-text-secondary mt-2">
                                    orders above ₹150. Use code<br />
                                    Get 20% off on all Coffee & Tea<br />
                                    <span className="font-bold text-text-primary">CAFFEINE20</span>
                                </p>
                                <button onClick={() => { setActiveTab('cafe'); setActiveCategory('Beverages'); }} className="mt-4 px-6 py-2.5 bg-primary text-white rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors flex items-center gap-1">
                                    Browse Beverages <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-20 text-8xl">☕</div>
                        </div>

                        {/* Category Filter */}
                        <div className="flex flex-wrap gap-2">
                            {cafeCategories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat
                                        ? 'bg-primary text-white'
                                        : 'bg-white border border-border text-text-secondary hover:bg-surface-hover'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Items Header */}
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-text-primary">
                                {activeCategory} <span className="text-sm font-normal text-text-muted">({cafeItems.length} found)</span>
                            </h2>
                            <p className="text-xs text-text-muted flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" /> Prep times are estimates
                            </p>
                        </div>

                        {/* Cafe Items Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {cafeItems.map((cafItem, i) => (
                                <motion.div
                                    key={cafItem.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden card-hover"
                                >
                                    <div className="relative h-40 bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
                                        <span className="text-5xl">{cafItem.isNonVeg ? '🍗' : cafItem.name.includes('Espresso') || cafItem.name.includes('Caramel') ? '☕' : cafItem.name.includes('Cake') ? '🎂' : cafItem.name.includes('Noodle') ? '🍜' : cafItem.name.includes('Fries') ? '🍟' : cafItem.name.includes('Salad') ? '🥗' : '🍽️'}</span>
                                        <div className="absolute top-3 left-3 flex gap-1.5">
                                            {cafItem.isPopular && (
                                                <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full font-medium">Popular</span>
                                            )}
                                            {cafItem.isNonVeg ? (
                                                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">Non-Veg</span>
                                            ) : (
                                                <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-0.5">
                                                    <span className="w-1.5 h-1.5 bg-white rounded-full" /> Veg
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-start justify-between mb-1">
                                            <h3 className="text-sm font-bold text-text-primary">{cafItem.name}</h3>
                                            <span className="text-sm font-bold text-primary">₹{cafItem.price}</span>
                                        </div>
                                        <p className="text-xs text-text-muted line-clamp-2">{cafItem.description}</p>
                                        <div className="flex items-center gap-3 mt-2 text-xs text-text-muted">
                                            <span className="flex items-center gap-0.5">
                                                <Clock className="w-3 h-3" /> {cafItem.prepTime} MINS
                                            </span>
                                            <span className="flex items-center gap-0.5">
                                                <Flame className="w-3 h-3" /> {cafItem.calories} KCAL
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => addToCart(cafItem.id, cafItem.name, cafItem.price)}
                                            className="w-full mt-3 py-2 border border-border rounded-xl text-sm font-medium text-text-primary hover:bg-primary hover:text-white hover:border-primary transition-all flex items-center justify-center gap-1.5"
                                        >
                                            <Plus className="w-4 h-4" /> Add to Cart
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Floating Cart */}
                        {cart.length > 0 && (
                            <motion.div
                                initial={{ y: 100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="fixed bottom-6 right-6 z-30"
                            >
                                <button onClick={() => setActiveModal('checkout')} className="flex items-center gap-3 px-6 py-3 bg-primary text-white rounded-2xl shadow-lg hover:bg-primary-dark transition-colors">
                                    <ShoppingCart className="w-5 h-5" />
                                    <span className="font-semibold">View Cart</span>
                                    <span className="bg-white text-primary text-sm font-bold px-2.5 py-0.5 rounded-lg">
                                        ₹{cartTotal.toFixed(2)}
                                    </span>
                                </button>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modals */}
            <Modal isOpen={activeModal === 'feedback'} onClose={() => setActiveModal(null)} title="Mess Feedback">
                <div className="space-y-4">
                    <p className="text-sm text-text-secondary">Your feedback helps us improve the quality of food and service.</p>
                    <div className="flex gap-2">
                        {['Food Quality', 'Hygiene', 'Staff', 'Other'].map(type => (
                            <button
                                key={type}
                                onClick={() => setFeedbackType(type)}
                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors border ${feedbackType === type ? 'bg-primary text-white border-primary' : 'bg-white text-text-secondary border-border hover:bg-surface-hover'}`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                    <textarea value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)} rows={4} placeholder="Tell us more about your experience..." className="w-full border border-border rounded-xl p-4 text-sm focus:outline-none focus:border-primary resize-none bg-gray-50"></textarea>
                    <button onClick={() => { setActiveModal(null); setFeedbackText(''); window.alert("Feedback submitted to committee!"); }} className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors">Submit Feedback</button>
                </div>
            </Modal>

            <Modal isOpen={activeModal === 'contact_committee'} onClose={() => setActiveModal(null)} title="Mess Committee">
                <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-xl border border-border">
                        <h4 className="font-bold text-text-primary mb-1">Current Committee Members</h4>
                        <ul className="text-sm text-text-secondary space-y-2 mt-3">
                            <li className="flex justify-between items-center"><span className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">A</span> Aryan Sharma (Head)</span><span>+91 98765 43210</span></li>
                            <li className="flex justify-between items-center"><span className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">K</span> Kavya Singh (QA)</span><span>+91 98765 43211</span></li>
                            <li className="flex justify-between items-center"><span className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">R</span> Rahul Verma (Logistics)</span><span>+91 98765 43212</span></li>
                        </ul>
                    </div>
                    <button onClick={() => { setActiveModal(null); window.alert("Opening preferred mail client..."); }} className="w-full py-3 bg-blue-50 text-blue-700 font-bold rounded-xl hover:bg-blue-100 transition-colors border border-blue-200">Email Full Committee</button>
                </div>
            </Modal>

            <Modal isOpen={activeModal === 'monthly_menu'} onClose={() => setActiveModal(null)} title="Monthly Menu Document">
                <div className="text-center py-6">
                    <div className="w-16 h-16 bg-gray-100 text-gray-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Calendar className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-text-primary mb-2">October 2024 Menu</h3>
                    <p className="text-sm text-text-secondary mb-6">The complete schedule for this month is available as a PDF document.</p>
                    <button onClick={() => { setActiveModal(null); window.alert("Downloading Menu_Oct_24.pdf"); }} className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors">Download PDF</button>
                </div>
            </Modal>

            <Modal isOpen={activeModal === 'opt_in_success'} onClose={() => setActiveModal(null)} title="Taste of Punjab Special">
                <div className="text-center py-8">
                    <div className="text-5xl mb-4">🍛</div>
                    <h3 className="text-xl font-bold text-text-primary mb-2">You Have Opted In!</h3>
                    <p className="text-sm text-text-secondary px-4 mb-6">Your preference has been recorded. The menu includes Butter Chicken, Dal Makhani, Garlic Naan, and Lassi. Enjoy!</p>
                    <button onClick={() => setActiveModal(null)} className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors">Awesome!</button>
                </div>
            </Modal>

            <Modal isOpen={activeModal === 'checkout'} onClose={() => setActiveModal(null)} title="Review Your Order">
                {isCheckingOut ? (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 border-4 border-gray-200 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                        <h3 className="text-lg font-bold text-text-primary">Processing Payment...</h3>
                        <p className="text-sm text-text-muted mt-1">Please do not close this window.</p>
                        {(() => {
                            setTimeout(() => {
                                setIsCheckingOut(false);
                                setCart([]);
                                setActiveModal(null);
                                window.alert("Payment successful! Order placed.");
                            }, 1500);
                            return null;
                        })()}
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="max-h-64 overflow-y-auto pr-2 space-y-3">
                            {cart.map(item => (
                                <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 border border-border rounded-xl">
                                    <div>
                                        <p className="font-bold text-text-primary text-sm">{item.name}</p>
                                        <p className="text-xs text-text-muted">₹{item.price} x {item.qty}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="font-bold whitespace-nowrap">₹{(item.price * item.qty).toFixed(2)}</span>
                                        <button onClick={() => setCart(cart.filter(c => c.id !== item.id))} className="text-red-500 hover:text-red-700 font-bold px-2 py-1 rounded bg-red-50">X</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-border pt-4 mt-2">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-text-secondary">Subtotal</span>
                                <span className="text-sm font-semibold">₹{cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-sm text-text-secondary">Taxes (5%)</span>
                                <span className="text-sm font-semibold">₹{(cartTotal * 0.05).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center bg-primary-50 p-3 rounded-lg border border-primary/20 font-bold text-lg text-primary">
                                <span>Total</span>
                                <span>₹{(cartTotal * 1.05).toFixed(2)}</span>
                            </div>
                        </div>
                        <button onClick={() => setIsCheckingOut(true)} className="w-full py-4 mt-2 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors flex justify-center items-center gap-2">
                            <CreditCard className="w-5 h-5" /> Pay ₹{(cartTotal * 1.05).toFixed(2)}
                        </button>
                    </div>
                )}
            </Modal>

        </motion.div>
    );
}
