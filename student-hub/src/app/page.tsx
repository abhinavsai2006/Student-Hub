'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Clock, MapPin, TrendingUp, BookOpen, UtensilsCrossed,
  WashingMachine, Bus, Calendar, Wallet, Zap, AlertTriangle,
  ArrowUpRight, ExternalLink, Bell
} from 'lucide-react';
import { agendaItems, transactions, campusEvents, attendanceData } from '@/lib/mock-data';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 }
  }
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 }
};

function AttendanceCircle({ percentage, label }: { percentage: number; label: string }) {
  const circumference = 2 * Math.PI * 36;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const color = percentage >= 75 ? '#4361ee' : percentage >= 65 ? '#f59e0b' : '#ef4444';

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-[84px] h-[84px]">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="36" stroke="#f3f4f6" strokeWidth="6" fill="none" />
          <circle
            cx="40" cy="40" r="36"
            stroke={color}
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="attendance-circle"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold" style={{ color }}>{percentage}%</span>
        </div>
      </div>
      <span className="text-xs text-text-muted font-medium uppercase tracking-wider">{label}</span>
    </div>
  );
}

function getBadgeClass(type: string) {
  switch (type) {
    case 'Academic': return 'badge-academic';
    case 'Activity': return 'badge-activity';
    case 'Leisure': return 'badge-leisure';
    case 'Event': return 'badge-event';
    case 'Competition': return 'badge-competition';
    case 'Cultural': return 'badge-cultural';
    default: return 'badge-academic';
  }
}

export default function DashboardPage() {
  const router = useRouter();

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary">
            Good Morning, Aarav! 👋
          </h1>
          <p className="text-text-secondary mt-1">
            You have 3 classes today. Your first lecture starts in 45 minutes.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => router.push('/study')} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-border rounded-xl text-sm font-medium text-text-primary hover:bg-surface-hover transition-colors">
            <Calendar className="w-4 h-4" />
            View Schedule
          </button>
          <button onClick={() => router.push('/health')} className="flex items-center gap-2 px-4 py-2.5 bg-danger text-white rounded-xl text-sm font-semibold hover:bg-red-600 transition-colors">
            Quick SOS
          </button>
        </div>
      </motion.div>

      {/* Quick Stats Cards */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Overall Attendance */}
        <div onClick={() => router.push('/study')} className="bg-white rounded-2xl p-5 border border-primary/30 shadow-sm relative overflow-hidden card-hover cursor-pointer">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary rounded-l-2xl" />
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary font-medium">Overall Attendance</span>
            <Clock className="w-4 h-4 text-text-muted" />
          </div>
          <p className="text-3xl font-bold text-text-primary">84.2%</p>
          <p className="text-xs text-text-muted mt-1">Keep it above 75% for exams</p>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="w-3.5 h-3.5 text-success" />
            <span className="text-xs text-success font-medium">+2.4% from last week</span>
          </div>
        </div>

        {/* Next Class */}
        <div onClick={() => router.push('/study')} className="bg-white rounded-2xl p-5 border border-border shadow-sm card-hover cursor-pointer">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary font-medium">Next Class</span>
            <Clock className="w-4 h-4 text-text-muted" />
          </div>
          <p className="text-2xl font-bold text-text-primary">CS-302</p>
          <p className="text-xs text-text-muted mt-1">Room 402 • 10:30 AM</p>
        </div>

        {/* Mess (Lunch) */}
        <div onClick={() => router.push('/mess')} className="bg-white rounded-2xl p-5 border border-border shadow-sm card-hover cursor-pointer">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary font-medium">Mess (Lunch)</span>
            <UtensilsCrossed className="w-4 h-4 text-text-muted" />
          </div>
          <p className="text-xl font-bold text-text-primary">Paneer Butter</p>
          <p className="text-xs text-text-muted mt-1">Served until 2:30 PM</p>
        </div>

        {/* Laundry Status */}
        <div onClick={() => router.push('/laundry')} className="bg-white rounded-2xl p-5 border border-border shadow-sm card-hover cursor-pointer">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary font-medium">Laundry Status</span>
            <WashingMachine className="w-4 h-4 text-primary" />
          </div>
          <p className="text-xl font-bold text-primary">In Progress</p>
          <p className="text-xs text-text-muted mt-1">Machine #04 • 12m left</p>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Daily Agenda */}
        <motion.div variants={item} className="lg:col-span-2 space-y-6">
          {/* Up Next Card */}
          <div onClick={() => router.push('/study')} className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 text-white relative overflow-hidden cursor-pointer shadow-md hover:shadow-lg transition-all">
            <div className="absolute top-4 left-4">
              <span className="bg-danger text-white text-xs px-2.5 py-1 rounded-full font-semibold">Up Next</span>
            </div>
            <div className="absolute top-4 right-6 text-right">
              <span className="text-4xl font-bold opacity-90">12</span>
              <p className="text-xs opacity-70 uppercase tracking-wider">Minutes Left</p>
            </div>
            <div className="mt-8">
              <h2 className="text-2xl font-bold">Advanced Algorithms</h2>
              <p className="text-white/70 text-sm mt-1">👤 Dr. Arpita Sharma</p>
              <div className="flex flex-wrap items-center gap-4 mt-4 text-sm">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 opacity-70" />
                  <span>10:30 AM - 12:00 PM</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 opacity-70" />
                  <span>CS Block - Room 302</span>
                </div>
              </div>
            </div>
          </div>

          {/* Daily Agenda */}
          <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
            <div className="mb-5">
              <h2 className="text-lg font-bold text-text-primary">Daily Agenda</h2>
              <p className="text-sm text-text-muted">Your academic and campus commitments for today.</p>
            </div>
            <div className="space-y-0">
              {agendaItems.map((agenda, i) => (
                <div key={i} className="flex items-start gap-4 py-4 border-b border-border-light last:border-0">
                  <div className="w-20 flex-shrink-0">
                    <span className="text-sm font-semibold text-text-primary">{agenda.time}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-text-primary">{agenda.title}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-text-muted" />
                      <span className="text-xs text-text-muted">{agenda.location}</span>
                    </div>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${getBadgeClass(agenda.type)}`}>
                    {agenda.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Attendance Tracking */}
          <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-bold text-text-primary">Attendance Tracking</h2>
                <p className="text-sm text-text-muted">Maintain your 75% criteria easily</p>
              </div>
              <button onClick={() => router.push('/study')} className="text-sm text-primary font-medium hover:underline">Detailed Stats</button>
            </div>
            <div className="flex flex-wrap justify-around gap-4 mb-4">
              {attendanceData.map((att, i) => (
                <AttendanceCircle key={i} percentage={att.percentage} label={att.subject} />
              ))}
            </div>
            <div className="flex items-center gap-2 mt-2 p-3 bg-warning/10 rounded-xl">
              <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0" />
              <p className="text-xs text-text-secondary">
                <span className="font-semibold">Warning:</span> You can only miss <span className="font-bold">1 more</span> class in Microprocessors this month.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Column */}
        <motion.div variants={item} className="space-y-6">
          {/* Campus Wallet */}
          <div className="bg-white rounded-2xl p-5 border border-border shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Wallet className="w-4 h-4 text-primary" />
              <span className="text-xs text-text-muted uppercase tracking-wider font-medium">Campus Wallet</span>
            </div>
            <p className="text-3xl font-bold text-text-primary">₹2,450.75</p>
            <p className="text-xs text-text-muted mt-1">
              <span className="text-success">↗ +₹1,200</span> from Dad yesterday
            </p>
            <div className="flex gap-2 mt-4">
              <button onClick={() => router.push('/finance')} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors">
                <Wallet className="w-4 h-4" /> Add Money
              </button>
              <button onClick={() => router.push('/finance')} className="flex-1 px-3 py-2.5 bg-white border border-border rounded-xl text-sm font-medium text-text-primary hover:bg-surface-hover transition-colors">
                Transactions
              </button>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs text-text-muted">Daily Limit Usage</span>
              <span className="text-xs text-primary font-semibold">64%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 mt-1.5">
              <div className="bg-primary h-2 rounded-full" style={{ width: '64%' }} />
            </div>
          </div>

          {/* Bus Tracker */}
          <div className="bg-white rounded-2xl p-5 border border-border shadow-sm">
            <h3 className="text-lg font-bold text-text-primary mb-4">Bus Tracker</h3>
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                    <Bus className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">Route A - Gate 1</p>
                    <p className="text-xs text-primary font-medium">Arriving in 4 mins</p>
                  </div>
                </div>
                <span className="text-xs bg-green-50 text-success px-2 py-1 rounded-full font-medium">Low Crowd</span>
              </div>
            </div>
            <button onClick={() => router.push('/transport')} className="w-full mt-3 py-2.5 text-sm text-text-secondary font-medium border border-border rounded-xl hover:bg-surface-hover transition-colors">
              View All Routes
            </button>
          </div>

          {/* Quick Tools */}
          <div className="bg-white rounded-2xl p-5 border border-border shadow-sm">
            <h3 className="text-base font-bold text-text-primary mb-4">Quick Tools</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: WashingMachine, label: 'Laundry', color: 'bg-blue-50 text-blue-600', link: '/laundry' },
                { icon: AlertTriangle, label: 'SOS', color: 'bg-red-50 text-red-600', link: '/health' },
                { icon: Wallet, label: 'Split Bill', color: 'bg-purple-50 text-purple-600', link: '/finance' },
              ].map((tool, i) => (
                <button key={i} onClick={() => router.push(tool.link)} className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-surface-hover transition-colors">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${tool.color}`}>
                    <tool.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-text-secondary font-medium">{tool.label}</span>
                </button>
              ))}
              <button onClick={() => router.push('/tools')} className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-surface-hover transition-colors">
                <div className="w-12 h-12 rounded-xl border-2 border-dashed border-border flex items-center justify-center">
                  <span className="text-xl text-text-muted">+</span>
                </div>
                <span className="text-xs text-text-secondary font-medium">More</span>
              </button>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-2xl p-5 border border-border shadow-sm">
            <h3 className="text-lg font-bold text-text-primary mb-4">Recent Transactions</h3>
            <div className="space-y-3">
              {transactions.slice(0, 3).map((tx, i) => (
                <div key={i} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium text-text-primary">{tx.title}</p>
                    <p className="text-xs text-text-muted">{tx.date}</p>
                  </div>
                  <span className={`text-sm font-semibold ${tx.type === 'credit' ? 'text-success' : 'text-text-primary'}`}>
                    {tx.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Campus Calendar */}
          <div className="bg-white rounded-2xl p-5 border border-border shadow-sm">
            <h3 className="text-lg font-bold text-text-primary mb-4">Campus Calendar</h3>
            <div className="space-y-3">
              {campusEvents.map((event, i) => (
                <div key={i} className="flex items-start gap-3 py-2">
                  <div className="text-center flex-shrink-0 w-12">
                    <p className="text-xs text-text-muted font-medium uppercase">{event.month}</p>
                    <p className="text-lg font-bold text-text-primary">{event.day}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{event.title}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getBadgeClass(event.type)}`}>
                      {event.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => window.alert('Successfully synced to Google Calendar!')} className="w-full mt-3 py-2 text-sm text-text-muted font-medium hover:text-primary transition-colors">
              Sync to Google Calendar
            </button>
          </div>
        </motion.div>
      </div>

      {/* Banner */}
      <motion.div variants={item} className="bg-primary-50 rounded-2xl p-5 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-primary/20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <Bell className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-base font-bold text-text-primary">Upcoming Cultural Fest &apos;Aura&apos; 2024</h3>
            <p className="text-sm text-text-secondary mt-0.5">
              Registrations for group dance and drama competitions are now open. Early bird discounts available on tickets until end of the week.
            </p>
          </div>
        </div>
        <button onClick={() => window.alert('Registered for Aura 2024!')} className="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors whitespace-nowrap">
          Register Now
        </button>
      </motion.div>
    </motion.div>
  );
}
