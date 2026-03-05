'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Building, Phone, Clock, ExternalLink } from 'lucide-react';

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};
const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0 }
};

const campusLocations = [
    { name: 'Main Library', category: 'Academic', hours: '8 AM - 10 PM', phone: 'Ext. 1001', description: 'Central library with 50,000+ volumes and digital resources.' },
    { name: 'Student Activity Center', category: 'Recreation', hours: '9 AM - 9 PM', phone: 'Ext. 1002', description: 'Hub for clubs, events, and recreational activities.' },
    { name: 'Health Center', category: 'Health', hours: '8 AM - 8 PM', phone: 'Ext. 1003', description: 'On-campus medical facility with general and specialist services.' },
    { name: 'Administrative Block', category: 'Admin', hours: '9 AM - 5 PM', phone: 'Ext. 1004', description: 'Admissions, fees, and administrative services.' },
    { name: 'Sports Complex', category: 'Sports', hours: '6 AM - 9 PM', phone: 'Ext. 1005', description: 'Indoor and outdoor sports facilities.' },
    { name: 'Central Mess', category: 'Food', hours: '7 AM - 10 PM', phone: 'Ext. 1006', description: 'Main dining hall serving breakfast, lunch, and dinner.' },
];

export default function CampusPage() {
    return (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-7xl mx-auto">
            <motion.div variants={item}>
                <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
                    <Building className="w-7 h-7 text-primary" />
                    Campus Directory
                </h1>
                <p className="text-sm text-text-secondary mt-1">Find important locations, contacts, and services on campus.</p>
            </motion.div>

            {/* Map Placeholder */}
            <motion.div variants={item} onClick={() => alert('Opening interactive campus map...')} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl h-64 border border-border flex items-center justify-center cursor-pointer hover:shadow-md transition-shadow">
                <div className="text-center">
                    <MapPin className="w-12 h-12 text-emerald-500 mx-auto mb-3 animate-float" />
                    <p className="text-sm font-medium text-text-secondary">Interactive Campus Map</p>
                    <p className="text-xs text-text-muted mt-1">Click locations for details</p>
                </div>
            </motion.div>

            {/* Locations Grid */}
            <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {campusLocations.map((loc, i) => (
                    <div key={i} className="bg-white rounded-2xl p-5 border border-border shadow-sm card-hover">
                        <div className="flex items-start justify-between mb-3">
                            <h3 className="text-base font-bold text-text-primary">{loc.name}</h3>
                            <span className="text-xs px-2 py-0.5 bg-primary-50 text-primary rounded-full font-medium">{loc.category}</span>
                        </div>
                        <p className="text-xs text-text-secondary mb-3">{loc.description}</p>
                        <div className="space-y-1.5 text-xs text-text-muted">
                            <div className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5" /> {loc.hours}
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Phone className="w-3.5 h-3.5" /> {loc.phone}
                            </div>
                        </div>
                        <button onClick={() => alert(`Locating ${loc.name} on map...`)} className="mt-3 text-sm text-primary font-medium hover:underline flex items-center gap-1">
                            View on Map <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                    </div>
                ))}
            </motion.div>
        </motion.div>
    );
}
