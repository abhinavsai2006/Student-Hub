'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    WashingMachine, Clock, Zap, ChevronLeft, ChevronRight, Calendar,
    CheckCircle, X, Award, Droplets, Info, Bell, CheckCircle2
} from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { machines } from '@/lib/mock-data';

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};
const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0 }
};

const weekDays = [
    { day: 'MON', date: 20 }, { day: 'TUE', date: 15 },
    { day: 'WED', date: 24 }, { day: 'THU', date: 4 },
    { day: 'FRI', date: 1 }, { day: 'SAT', date: 10 },
    { day: 'SUN', date: 19 },
];

export default function LaundryPage() {
    const [selectedDay, setSelectedDay] = useState(24);
    const [selectedMachine, setSelectedMachine] = useState<any>(null);
    const [activeModal, setActiveModal] = useState<string | null>(null);

    const availableCount = machines.filter(m => m.status === 'Available').length;

    return (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <motion.div variants={item} className="flex items-center gap-2 text-sm text-text-muted">
                <span>Campus Services</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-text-primary font-medium">Laundry Management</span>
            </motion.div>

            {/* Header */}
            <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-text-primary">Laundry Center</h1>
                    <p className="text-sm text-text-secondary mt-1">Manage your bookings, track cycles, and earn rewards.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={() => setActiveModal('room_rules')} className="px-4 py-2.5 bg-white border border-border rounded-xl text-sm font-medium hover:bg-surface-hover transition-colors">
                        Room Rules
                    </button>
                    <button onClick={() => setActiveModal('instant_slots')} className="px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors flex items-center gap-2">
                        + Instant Booking
                    </button>
                </div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl p-5 border border-border shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-text-muted uppercase tracking-wider font-medium">Available Units</span>
                        <WashingMachine className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-3xl font-bold text-text-primary">{availableCount}</p>
                </div>
                <div className="bg-white rounded-2xl p-5 border border-border shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-text-muted uppercase tracking-wider font-medium">Average Wait</span>
                        <Clock className="w-5 h-5 text-warning" />
                    </div>
                    <p className="text-3xl font-bold text-text-primary">15m</p>
                </div>
                <div className="bg-white rounded-2xl p-5 border border-border shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-text-muted uppercase tracking-wider font-medium">Energy Saved</span>
                        <Zap className="w-5 h-5 text-success" />
                    </div>
                    <p className="text-3xl font-bold text-text-primary">84%</p>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left - Machine Status */}
                <motion.div variants={item} className="lg:col-span-2 space-y-6">
                    {/* Live Machine Status */}
                    <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-2">
                                <Droplets className="w-5 h-5 text-primary" />
                                <h2 className="text-lg font-bold text-text-primary">Live Machine Status</h2>
                            </div>
                            <span className="text-xs text-text-muted">Dryers Only</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {machines.map((machine) => (
                                <div
                                    key={machine.id}
                                    className={`p-4 rounded-xl border ${machine.status === 'Available'
                                        ? 'border-success/30 bg-green-50/30'
                                        : machine.status === 'Offline'
                                            ? 'border-border bg-gray-50'
                                            : machine.status === 'Finishing'
                                                ? 'border-warning/30 bg-amber-50/30'
                                                : 'border-primary/20 bg-primary-50/30'
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <WashingMachine className="w-4 h-4 text-text-secondary" />
                                            <span className="text-sm font-semibold text-text-primary">{machine.name}</span>
                                        </div>
                                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${machine.status === 'Available' ? 'bg-green-100 text-success' :
                                            machine.status === 'Offline' ? 'bg-gray-100 text-text-muted' :
                                                machine.status === 'Finishing' ? 'bg-amber-100 text-amber-600' :
                                                    'bg-blue-100 text-primary'
                                            }`}>
                                            {machine.status}
                                        </span>
                                    </div>
                                    <p className="text-xs text-text-muted mb-3">{machine.type}</p>

                                    {machine.status === 'Available' ? (
                                        <button
                                            onClick={() => { setSelectedMachine(machine); setActiveModal('booking'); }}
                                            className="w-full py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
                                        >
                                            Book Now
                                        </button>
                                    ) : machine.status === 'Offline' ? (
                                        <p className="text-xs text-text-muted italic">Maintenance scheduled</p>
                                    ) : (
                                        <div>
                                            <div className="flex justify-between text-xs text-text-muted mb-1">
                                                <span>Cycle Progress</span>
                                                <span>{machine.timeLeft}</span>
                                            </div>
                                            <div className="w-full bg-gray-100 rounded-full h-2">
                                                <div
                                                    className={`h-2 rounded-full ${machine.status === 'Finishing' ? 'bg-warning' : 'bg-primary'}`}
                                                    style={{ width: `${machine.progress}%` }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Schedule Slot */}
                    <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <h2 className="text-lg font-bold text-text-primary">Schedule a Slot</h2>
                                <p className="text-xs text-text-muted">Reserve a machine in Block A Laundry Room</p>
                            </div>
                            <button onClick={() => setActiveModal('full_calendar')} className="text-sm text-text-muted flex items-center gap-1 hover:text-primary transition-colors">
                                <Calendar className="w-4 h-4" /> Full Calendar
                            </button>
                        </div>

                        {/* Mini Calendar */}
                        <div className="flex items-center gap-2 mb-4">
                            {weekDays.map(d => (
                                <button
                                    key={d.date}
                                    onClick={() => setSelectedDay(d.date)}
                                    className={`flex flex-col items-center px-3 py-2 rounded-xl transition-all flex-1 ${selectedDay === d.date
                                        ? 'bg-primary text-white'
                                        : 'hover:bg-surface-hover text-text-secondary'
                                        }`}
                                >
                                    <span className="text-xs font-medium">{d.day}</span>
                                    <span className="text-base font-bold">{d.date}</span>
                                </button>
                            ))}
                        </div>

                        {/* Time Slots */}
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                            {['9:00 AM', '9:45 AM', '10:30 AM', '11:15 AM', '12:00 PM', '12:45 PM', '2:00 PM', '2:45 PM'].map((time, i) => (
                                <button
                                    key={time}
                                    className={`py-2.5 rounded-xl text-sm font-medium border transition-all ${i === 2 ? 'bg-primary text-white border-primary' :
                                        i === 1 || i === 5 ? 'bg-gray-100 text-text-muted border-gray-100 cursor-not-allowed' :
                                            'border-border hover:border-primary hover:bg-primary-50 text-text-secondary'
                                        }`}
                                    disabled={i === 1 || i === 5}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>

                        <button onClick={() => { window.alert('Notification bell active!'); }} className="w-full mt-4 py-3 bg-primary-50 text-primary rounded-xl text-sm font-semibold hover:bg-primary/10 transition-colors flex items-center justify-center gap-2">
                            <Bell className="w-4 h-4" />
                            Notify when Finished
                        </button>
                    </div>
                </motion.div>

                {/* Right Column */}
                <motion.div variants={item} className="space-y-6">
                    {/* Active Cycle */}
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-5 text-white">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs uppercase tracking-wider opacity-70">Active Cycle</span>
                            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">Machine #R-04</span>
                        </div>
                        <h3 className="text-xl font-bold mb-1">Heavy Rinse</h3>
                        <p className="text-xs opacity-60 mb-4">Completing in approx. 14 minutes</p>

                        <div className="flex justify-center my-4">
                            <div className="relative w-32 h-32">
                                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                                    <circle cx="60" cy="60" r="52" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
                                    <circle cx="60" cy="60" r="52" stroke="#4361ee" strokeWidth="8" fill="none"
                                        strokeDasharray={`${2 * Math.PI * 52}`}
                                        strokeDashoffset={`${2 * Math.PI * 52 * 0.28}`}
                                        strokeLinecap="round" />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-3xl font-bold">72%</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center gap-6 text-center text-xs opacity-70 mt-2">
                            <div>
                                <p className="font-semibold text-white/90">40°C Warm</p>
                            </div>
                            <div>
                                <p className="font-semibold text-white/90">1200 RPM</p>
                            </div>
                        </div>
                    </div>

                    {/* Clean Streak */}
                    <div className="bg-white rounded-2xl p-5 border border-border shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <Award className="w-5 h-5 text-warning" />
                            <h3 className="text-base font-bold text-text-primary">Clean Streak</h3>
                        </div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <div key={i} className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold ${i <= 4 ? 'bg-primary text-white' : 'bg-gray-100 text-text-muted'
                                        }`}>
                                        {i <= 4 ? '✓' : i}
                                    </div>
                                ))}
                            </div>
                            <span className="text-sm text-text-secondary font-medium">4 weeks!</span>
                        </div>
                        <p className="text-xs text-text-muted">Complete 5 consecutive weeks to earn a free wash cycle!</p>
                        <div className="w-full bg-gray-100 rounded-full h-2 mt-3">
                            <div className="bg-primary h-2 rounded-full" style={{ width: '80%' }} />
                        </div>
                    </div>

                    {/* Tips */}
                    <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
                        <div className="flex items-start gap-3">
                            <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                                <h4 className="text-sm font-bold text-text-primary mb-1">Laundry Tip</h4>
                                <p className="text-xs text-text-secondary">
                                    Separate whites and colors for best results. Use cold water for dark clothes to prevent fading.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Modals */}
            <Modal isOpen={activeModal === 'room_rules'} onClose={() => setActiveModal(null)} title="Laundry Room Rules">
                <div className="space-y-4">
                    <ul className="space-y-3 text-sm text-text-secondary">
                        <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" /> Please empty pockets before washing.</li>
                        <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" /> Do not leave clothes in the machine after cycle completion. Max 15 mins grace period.</li>
                        <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" /> Use liquid detergent only. Powder clogs the drains.</li>
                        <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" /> Overloading damages the machines—fill only up to 3/4th capacity.</li>
                    </ul>
                    <button onClick={() => setActiveModal(null)} className="w-full mt-4 py-3 bg-gray-100 text-text-primary font-bold rounded-xl hover:bg-gray-200 transition-colors">Understood</button>
                </div>
            </Modal>

            <Modal isOpen={activeModal === 'instant_slots'} onClose={() => setActiveModal(null)} title="Instant Availability">
                <div className="text-center py-6">
                    <div className="w-16 h-16 bg-success/10 text-success flex items-center justify-center rounded-full mx-auto mb-4">
                        <WashingMachine className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-text-primary mb-2">{availableCount} Machines Available Now</h3>
                    <p className="text-sm text-text-secondary px-4 mb-6">There are currently multiple washing machines and dryers available in Block A Laundry. You can start a load immediately.</p>
                    <button onClick={() => setActiveModal(null)} className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors">Great, let&apos;s go!</button>
                </div>
            </Modal>

            <Modal isOpen={activeModal === 'full_calendar'} onClose={() => setActiveModal(null)} title="Full Schedule">
                <div className="text-center py-6 space-y-4">
                    <Calendar className="w-12 h-12 text-primary opacity-20 mx-auto mb-2" />
                    <h3 className="text-lg font-bold">Month View</h3>
                    <p className="text-sm text-text-secondary">View past and future bookings across the semester to identify the best time blocks.</p>
                    <button onClick={() => setActiveModal(null)} className="w-full mt-4 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors">Close View</button>
                </div>
            </Modal>

            <Modal isOpen={activeModal === 'booking'} onClose={() => { setActiveModal(null); setSelectedMachine(null); }} title="Confirm Booking">
                {selectedMachine && (
                    <div className="space-y-4">
                        <p className="text-sm text-text-secondary mb-2">
                            You&apos;re about to book a slot for Block A Laundry Room.
                        </p>

                        <div className="space-y-3 mb-5">
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                <Calendar className="w-5 h-5 text-primary" />
                                <div>
                                    <p className="text-sm font-semibold text-text-primary">Wednesday, 24th May</p>
                                    <p className="text-xs text-text-muted">11:00 AM - 11:45 AM (45 mins)</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                <WashingMachine className="w-5 h-5 text-primary" />
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-text-primary">{selectedMachine.name} Booking Info</p>
                                    <p className="text-xs text-text-muted">Includes Detergent & Softener</p>
                                </div>
                                <span className="text-lg font-bold text-text-primary">₹40.00</span>
                            </div>
                        </div>

                        <div className="flex items-start gap-2 mb-5 p-3 bg-amber-50 rounded-xl">
                            <Info className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
                            <p className="text-xs text-text-secondary">
                                Non-refundable if cancelled within 2 hours of the slot start time.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => { setActiveModal(null); setSelectedMachine(null); }}
                                className="flex-1 py-3 border border-border rounded-xl text-sm font-medium text-text-primary hover:bg-surface-hover transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    alert('Payment successful. Booking confirmed!');
                                    setActiveModal(null);
                                    setSelectedMachine(null);
                                }}
                                className="flex-1 py-3 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors"
                            >
                                Confirm & Pay
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </motion.div>
    );
}
