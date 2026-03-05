'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Bus, MapPin, Clock, AlertTriangle, Navigation, Users,
    ChevronDown, Phone, Shield, Map, CheckCircle2
} from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { busRoutes } from '@/lib/mock-data';

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};
const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0 }
};

export default function TransportPage() {
    const [selectedRoute, setSelectedRoute] = useState(busRoutes[0]);
    const [showDropdown, setShowDropdown] = useState(false);

    // Modal states
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [modalData, setModalData] = useState<any>(null);

    return (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
                        <Bus className="w-7 h-7 text-primary" />
                        Campus Transport
                    </h1>
                    <p className="text-sm text-text-secondary mt-1">Track buses, plan routes, and stay safe on campus.</p>
                </div>
                <button onClick={() => setActiveModal('map')} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-border rounded-xl text-sm font-medium hover:bg-surface-hover transition-colors">
                    <Map className="w-4 h-4" />
                    Open Live Map
                </button>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left - Main content */}
                <motion.div variants={item} className="lg:col-span-2 space-y-6">
                    {/* Map Placeholder */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl h-64 md:h-80 border border-border flex items-center justify-center relative overflow-hidden">
                        <div className="text-center">
                            <MapPin className="w-12 h-12 text-primary mx-auto mb-3 animate-float" />
                            <p className="text-sm font-medium text-text-secondary">Interactive Campus Map</p>
                            <p className="text-xs text-text-muted mt-1">Live bus tracking available</p>
                        </div>
                        {/* Decorative dots */}
                        <div className="absolute top-8 left-12 w-3 h-3 bg-primary rounded-full animate-pulse" />
                        <div className="absolute top-20 right-20 w-3 h-3 bg-success rounded-full animate-pulse" />
                        <div className="absolute bottom-16 left-1/3 w-3 h-3 bg-warning rounded-full animate-pulse" />
                    </div>

                    {/* Route Selector */}
                    <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                        <h2 className="text-lg font-bold text-text-primary mb-4">Select Route</h2>
                        <div className="relative mb-4">
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 border border-border rounded-xl text-sm text-text-primary hover:bg-surface-hover transition-colors"
                            >
                                <span>{selectedRoute.name} - {selectedRoute.from} → {selectedRoute.to}</span>
                                <ChevronDown className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                            </button>
                            {showDropdown && (
                                <div className="absolute top-full left-0 w-full mt-1 bg-white border border-border rounded-xl shadow-lg z-10 overflow-hidden">
                                    {busRoutes.map((route) => (
                                        <button
                                            key={route.id}
                                            onClick={() => { setSelectedRoute(route); setShowDropdown(false); }}
                                            className="w-full text-left px-4 py-3 text-sm hover:bg-surface-hover transition-colors border-b border-border-light last:border-0"
                                        >
                                            <span className="font-medium">{route.name}</span>
                                            <span className="text-text-muted ml-2">{route.from} → {route.to}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* ETA Card */}
                        <div className="p-5 bg-primary-50 rounded-xl border border-primary/20">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                                        <Bus className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-base font-bold text-text-primary">{selectedRoute.name}</p>
                                        <p className="text-xs text-text-muted">{selectedRoute.from} → {selectedRoute.to}</p>
                                    </div>
                                </div>
                                <span className={`text-xs px-3 py-1 rounded-full font-medium ${selectedRoute.status === 'On Time' ? 'bg-green-100 text-success' :
                                    selectedRoute.status === 'Delayed' ? 'bg-amber-100 text-amber-600' :
                                        'bg-red-100 text-danger'
                                    }`}>
                                    {selectedRoute.status}
                                </span>
                            </div>
                            <div className="grid grid-cols-3 gap-4 mt-4">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-primary">{selectedRoute.eta}</p>
                                    <p className="text-xs text-text-muted mt-0.5">ETA</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-semibold text-text-primary">{selectedRoute.nextBus}</p>
                                    <p className="text-xs text-text-muted mt-0.5">Next Bus</p>
                                </div>
                                <div className="text-center">
                                    <p className={`text-sm font-semibold ${selectedRoute.crowd === 'Low Crowd' ? 'text-success' :
                                        selectedRoute.crowd === 'Moderate' ? 'text-warning' : 'text-danger'
                                        }`}>{selectedRoute.crowd}</p>
                                    <p className="text-xs text-text-muted mt-0.5">Crowd</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* All Routes */}
                    <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                        <h2 className="text-lg font-bold text-text-primary mb-4">All Active Routes</h2>
                        <div className="space-y-3">
                            {busRoutes.map((route) => (
                                <div key={route.id} onClick={() => { setModalData(route); setActiveModal('route_details'); }} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-surface-hover transition-colors cursor-pointer">
                                    <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Bus className="w-5 h-5 text-primary" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-semibold text-text-primary">{route.name}</p>
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${route.status === 'On Time' ? 'bg-green-100 text-success' :
                                                route.status === 'Delayed' ? 'bg-amber-100 text-amber-600' :
                                                    'bg-red-100 text-danger'
                                                }`}>
                                                {route.status}
                                            </span>
                                        </div>
                                        <p className="text-xs text-text-muted">{route.from} → {route.to}</p>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <p className="text-sm font-bold text-primary">{route.eta}</p>
                                        <p className="text-xs text-text-muted">{route.crowd}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Right Column */}
                <motion.div variants={item} className="space-y-6">
                    {/* Quick Info */}
                    <div className="bg-white rounded-2xl p-5 border border-border shadow-sm">
                        <h3 className="text-base font-bold text-text-primary mb-4">Route Information</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between py-2 border-b border-border-light">
                                <span className="text-sm text-text-secondary">Operating Hours</span>
                                <span className="text-sm font-medium text-text-primary">6:00 AM - 10:00 PM</span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-border-light">
                                <span className="text-sm text-text-secondary">Frequency</span>
                                <span className="text-sm font-medium text-text-primary">Every 15 mins</span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-border-light">
                                <span className="text-sm text-text-secondary">Total Routes</span>
                                <span className="text-sm font-medium text-text-primary">8 Active</span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <span className="text-sm text-text-secondary">Last Updated</span>
                                <span className="text-sm font-medium text-text-primary">2 mins ago</span>
                            </div>
                        </div>
                    </div>

                    {/* Safety */}
                    <div className="bg-red-50 rounded-2xl p-5 border border-red-200">
                        <h3 className="text-base font-bold text-text-primary mb-2 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-danger" />
                            Safety Services
                        </h3>
                        <p className="text-xs text-text-secondary mb-4">Quick access to emergency services</p>
                        <div className="space-y-2">
                            <button onClick={() => { setModalData({ title: "911", subtitle: "Emergency Services" }); setActiveModal('dialing'); }} className="w-full py-3 bg-danger text-white rounded-xl text-sm font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2">
                                <Phone className="w-4 h-4" />
                                Emergency SOS
                            </button>
                            <button onClick={() => { setModalData({ title: "Ext. 4444", subtitle: "Campus Security" }); setActiveModal('dialing'); }} className="w-full py-3 bg-white border border-border rounded-xl text-sm font-medium text-text-primary hover:bg-surface-hover transition-colors flex items-center justify-center gap-2">
                                <Phone className="w-4 h-4" />
                                Campus Security
                            </button>
                            <button onClick={() => setActiveModal('share_location')} className="w-full py-3 bg-white border border-border rounded-xl text-sm font-medium text-text-primary hover:bg-surface-hover transition-colors flex items-center justify-center gap-2">
                                <Navigation className="w-4 h-4" />
                                Share Location
                            </button>
                        </div>
                    </div>

                    {/* Alerts */}
                    <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                            <div>
                                <h4 className="text-sm font-bold text-text-primary">Traffic Alert</h4>
                                <p className="text-xs text-text-secondary mt-1">
                                    Route 7 is experiencing delays due to construction near the Sports Complex. Expected delay: 10 minutes.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* SOS Floating Button */}
            <motion.button
                onClick={() => { setModalData({ title: "Campus-wide Alert", subtitle: "All networks notified" }); setActiveModal('sos'); }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="fixed bottom-6 right-6 w-16 h-16 bg-danger text-white rounded-full shadow-lg flex items-center justify-center hover:bg-red-600 transition-colors z-30"
                style={{ boxShadow: '0 0 0 0 rgba(239, 68, 68, 0.4)' }}
            >
                <div className="absolute inset-0 bg-danger rounded-full animate-ping opacity-20" />
                <AlertTriangle className="w-6 h-6 relative z-10" />
            </motion.button>

            {/* Modals */}
            <Modal isOpen={activeModal === 'map'} onClose={() => setActiveModal(null)} title="Live Campus Map">
                <div className="text-center py-6">
                    <div className="w-full h-64 bg-gray-100 rounded-2xl border border-border relative overflow-hidden mb-4">
                        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #d1d5db 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
                        <MapPin className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-primary" />
                        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 mt-8 text-sm font-bold text-text-secondary">Simulated GPS Data</span>
                    </div>
                    <p className="text-sm text-text-secondary">In a production environment, this would integrate with Google Maps or Mapbox APIs for live vehicle tracking.</p>
                </div>
            </Modal>

            <Modal isOpen={activeModal === 'route_details'} onClose={() => { setActiveModal(null); setModalData(null); }} title="Route Information">
                {modalData && (
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-border">
                            <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Bus className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-text-primary">{modalData.name}</h3>
                                <p className="text-sm text-text-secondary">{modalData.from} → {modalData.to}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 border border-border rounded-xl">
                                <p className="text-xs text-text-secondary mb-1">Status</p>
                                <p className="font-bold text-sm">{modalData.status}</p>
                            </div>
                            <div className="p-4 border border-border rounded-xl">
                                <p className="text-xs text-text-secondary mb-1">Current Crowd</p>
                                <p className="font-bold text-sm text-text-primary">{modalData.crowd}</p>
                            </div>
                            <div className="p-4 border border-border rounded-xl col-span-2">
                                <p className="text-xs text-text-secondary mb-1">Next Bus ETA</p>
                                <p className="font-bold text-2xl text-primary">{modalData.eta}</p>
                                <p className="text-sm text-text-secondary mt-1">Bus #{Math.floor(Math.random() * 90) + 10} approaching {modalData.from}</p>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>

            <Modal isOpen={activeModal === 'dialing'} onClose={() => { setActiveModal(null); setModalData(null); }} title="Dialing...">
                {modalData && (
                    <div className="text-center py-10">
                        <div className="w-20 h-20 bg-danger/10 text-danger rounded-full flex items-center justify-center mx-auto mb-6 relative">
                            <div className="absolute inset-0 bg-danger/20 rounded-full animate-ping"></div>
                            <Phone className="w-10 h-10 animate-pulse" />
                        </div>
                        <h3 className="text-2xl font-bold text-text-primary mb-1">{modalData.title}</h3>
                        <p className="text-sm text-text-secondary">{modalData.subtitle}</p>
                        <button onClick={() => { setActiveModal(null); setModalData(null); }} className="mt-8 px-6 py-2.5 bg-danger text-white rounded-full font-bold hover:bg-red-600 transition-colors shadow-lg">End Call</button>
                    </div>
                )}
            </Modal>

            <Modal isOpen={activeModal === 'share_location'} onClose={() => setActiveModal(null)} title="Share Live Location">
                <div className="text-center py-8 space-y-4">
                    <div className="w-16 h-16 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-2">
                        <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-text-primary">Location Shared</h3>
                    <p className="text-sm text-text-secondary px-6">Your live campus coordinates have been securely transmitted to the security desk. They will monitor your movement for the next 30 minutes.</p>
                    <button onClick={() => setActiveModal(null)} className="w-full mt-4 py-3 bg-gray-100 text-text-primary rounded-xl font-bold hover:bg-gray-200 transition-colors">Understood</button>
                </div>
            </Modal>

            <Modal isOpen={activeModal === 'sos'} onClose={() => setActiveModal(null)} title="SOS Triggered">
                <div className="text-center py-8">
                    <AlertTriangle className="w-16 h-16 text-danger mx-auto mb-4 animate-bounce" />
                    <h3 className="text-2xl font-bold text-danger mb-2">EMERGENCY PROTOCOL ACTIVE</h3>
                    <p className="text-sm text-text-primary mb-6">Security forces have tracked your GPS coordinates and are en route. All nearby students have received warning alerts.</p>
                    <button onClick={() => setActiveModal(null)} className="px-6 py-2.5 bg-gray-100 text-text-secondary border border-border rounded-xl font-bold hover:bg-gray-200 transition-colors text-xs">Dismiss Alert</button>
                </div>
            </Modal>

        </motion.div>
    );
}
