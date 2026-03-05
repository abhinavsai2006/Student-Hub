'use client';

import React, { useState } from 'react';
import { HeartPulse, Phone, ShieldAlert, Brain, ChevronRight, Stethoscope, FileText, X, CheckCircle2, Play, Calendar, User, MoreHorizontal, Moon, PhoneCall, Info } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';

export default function HealthPage() {
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [modalData, setModalData] = useState<any>(null);

    return (
        <div className="max-w-7xl mx-auto space-y-8 relative">
            {/* Modals are moved to the bottom */}

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-text-primary">Health & Wellness Center</h1>
                <p className="text-sm text-text-secondary mt-1">Comprehensive care for your physical and mental well-being on campus.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Left Column: Form & History */}
                <div className="space-y-8">

                    <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-xl shadow-md">
                                <Stethoscope className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-text-primary">Book a Medical Consultation</h2>
                                <p className="text-xs text-text-secondary mt-0.5">Schedule an appointment with our campus doctors.</p>
                            </div>
                        </div>

                        <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setActiveModal('booking'); }}>
                            <div>
                                <label className="block text-xs font-bold text-text-muted uppercase tracking-widest mb-2">Medical Department</label>
                                <div className="relative">
                                    <select className="appearance-none w-full border border-border rounded-xl px-4 py-3 text-sm font-medium bg-gray-50 focus:outline-none focus:border-primary focus:bg-white transition-colors cursor-pointer text-text-secondary">
                                        <option>General Physician</option>
                                        <option>Mental Health Counselor</option>
                                        <option>Physiotherapist</option>
                                    </select>
                                    <ChevronRight className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-text-muted pointer-events-none" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-text-muted uppercase tracking-widest mb-2">Preferred Date</label>
                                    <div className="relative">
                                        <input type="text" defaultValue="Oct 25, 2024" className="w-full pl-10 pr-4 py-3 bg-white border border-border rounded-xl text-sm font-medium focus:outline-none focus:border-primary cursor-pointer text-text-primary" />
                                        <Calendar className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-text-muted uppercase tracking-widest mb-2">Time Slot</label>
                                    <div className="relative">
                                        <select className="appearance-none w-full border border-border rounded-xl px-4 py-3 text-sm font-medium bg-white focus:outline-none focus:border-primary transition-colors cursor-pointer text-text-primary">
                                            <option>10:30 AM</option>
                                            <option>11:00 AM</option>
                                            <option>02:00 PM</option>
                                        </select>
                                        <ChevronRight className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-text-muted pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-2">
                                <button type="submit" className="w-full py-3 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors shadow-sm">
                                    Review & Book Appointment
                                </button>
                            </div>
                            <p className="text-xs text-text-muted italic flex items-center gap-1.5 mt-4">
                                <Info className="w-3.5 h-3.5" /> Consultations are free for all enrolled students.
                            </p>
                        </form>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <FileText className="w-5 h-5 text-text-secondary -ml-1" />
                            <h2 className="text-lg font-bold text-text-primary">Appointment History</h2>
                        </div>

                        <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-border text-[10px] font-bold text-text-muted uppercase tracking-widest bg-gray-50">
                                        <th className="py-4 px-5">Doctor</th>
                                        <th className="py-4 px-5">Specialty</th>
                                        <th className="py-4 px-5">Date & Time</th>
                                        <th className="py-4 px-5">Status</th>
                                        <th className="py-4 px-5 text-right w-10"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {[
                                        { doc: 'Dr. Ananya Sharma', spec: 'General Physician', date: 'Oct 24, 2024\n10:30 AM', status: 'Confirmed', icon: '👩🏻‍⚕️', color: 'bg-green-100 text-green-700' },
                                        { doc: 'Dr. Vikram Sethi', spec: 'Counsellor', date: 'Oct 20, 2024\n03:45 PM', status: 'Completed', icon: '👨🏻‍⚕️', color: 'bg-gray-100 text-text-secondary' },
                                    ].map((appt, i) => (
                                        <tr key={i} className="hover:bg-surface-hover transition-colors">
                                            <td className="py-4 px-5">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-sm border border-white ${appt.status === 'Confirmed' ? 'bg-green-50' : 'bg-gray-100'}`}>{appt.icon}</div>
                                                    <span className="text-sm font-bold text-text-primary">{appt.doc}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-5 text-sm text-text-secondary">{appt.spec}</td>
                                            <td className="py-4 px-5 text-sm whitespace-pre-line text-text-secondary leading-snug">{appt.date}</td>
                                            <td className="py-4 px-5">
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${appt.color}`}>{appt.status}</span>
                                            </td>
                                            <td className="py-4 px-5 text-right">
                                                <button onClick={() => { setModalData(appt); setActiveModal('appt_details'); }} className="text-text-muted hover:text-text-primary p-1"><MoreHorizontal className="w-4 h-4" /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Column: Emergency & Toolkit */}
                <div className="space-y-8">

                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <ShieldAlert className="w-5 h-5 text-danger -ml-1" />
                            <h2 className="text-lg font-bold text-text-primary text-danger">Campus Emergency</h2>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div onClick={() => { setModalData({ title: "Ambulance", subtitle: "EXT. 102" }); setActiveModal('dialing'); }} className="bg-[#5c1616] rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-lg cursor-pointer transform hover:scale-105 transition-transform border border-red-900 overflow-hidden relative group">
                                <div className="absolute inset-0 bg-red-600/20 group-hover:bg-red-500/30 transition-colors"></div>
                                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mb-3 relative z-10 border border-red-500/30">
                                    <PhoneCall className="w-6 h-6 text-red-400 animate-pulse" />
                                </div>
                                <h3 className="text-white text-base font-bold relative z-10">Ambulance</h3>
                                <p className="text-red-300 text-[10px] font-bold uppercase tracking-widest mt-1 relative z-10">EXT. 102</p>
                            </div>

                            <div onClick={() => { setModalData({ title: "Counselor", subtitle: "Connecting to 24/7 Helpline..." }); setActiveModal('dialing'); }} className="bg-[#111827] rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-lg border border-gray-800 cursor-pointer hover:bg-gray-900 transition-colors">
                                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center mb-3">
                                    <Brain className="w-6 h-6 text-gray-400" />
                                </div>
                                <h3 className="text-white text-base font-bold mb-1">Counselor</h3>
                                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">AVAILABLE 24/7</p>
                            </div>

                            <div onClick={() => { setModalData({ title: "Security Gate No. 1", subtitle: "Dialing..." }); setActiveModal('dialing'); }} className="bg-[#111827] rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-lg border border-gray-800 cursor-pointer hover:bg-gray-900 transition-colors">
                                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center mb-3">
                                    <ShieldAlert className="w-6 h-6 text-gray-400" />
                                </div>
                                <h3 className="text-white text-base font-bold mb-1">Security</h3>
                                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">GATE NO. 1</p>
                            </div>

                            <div onClick={() => setActiveModal('add_contact')} className="border-2 border-dashed border-border rounded-2xl p-6 flex flex-col justify-center items-center text-center bg-gray-50/50 cursor-pointer hover:bg-gray-50 transition-colors">
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                                    <span className="text-text-muted text-xl">+</span>
                                </div>
                                <p className="text-xs font-bold text-text-muted">Add Contact</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <HeartPulse className="w-5 h-5 text-primary -ml-1" />
                            <h2 className="text-lg font-bold text-primary">Self-Care Toolkit</h2>
                        </div>

                        <div className="space-y-4">
                            {/* Audio Card */}
                            <div className="bg-[#0b1320] rounded-2xl overflow-hidden relative shadow-lg group cursor-pointer border border-gray-800">
                                <img src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=800" alt="Lake at night" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1320] via-[#0b1320]/80 to-transparent"></div>

                                <div className="relative z-10 p-6 flex flex-col h-full justify-between">
                                    <div className="mb-14">
                                        <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase shadow-sm">
                                            Study Aid
                                        </span>
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-end mb-4">
                                            <div>
                                                <h3 className="text-lg font-bold text-white mb-1">Deep Focus Meditation</h3>
                                                <p className="text-xs text-gray-300 font-medium">By Mindfulness Hub</p>
                                            </div>
                                            <span className="text-xs text-gray-400 font-medium">15 min</span>
                                        </div>

                                        <button onClick={(e) => { e.stopPropagation(); setModalData({ title: 'Deep Focus Meditation', img: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=800' }); setActiveModal('audio_player'); }} className="w-full py-3 bg-white/10 backdrop-blur border border-white/20 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-white/20 transition-all shadow-sm">
                                            <Play className="w-4 h-4 fill-white" /> Listen Now
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Second Card Preview */}
                            <div onClick={() => setActiveModal('toolkit_details')} className="bg-[#121c16] rounded-2xl h-24 overflow-hidden relative shadow-lg group cursor-pointer border border-gray-800">
                                <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800" alt="Forest path" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#121c16] via-[#121c16]/80 to-transparent"></div>

                                <div className="relative z-10 p-5 flex flex-col h-full justify-start">
                                    <div>
                                        <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase shadow-sm">
                                            Mental Health
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
            {/* Modals */}
            <Modal isOpen={activeModal === 'booking'} onClose={() => setActiveModal(null)} title="Confirm Appointment">
                <div className="space-y-5">
                    <p className="text-sm text-text-secondary">Please verify your appointment details below before final submission.</p>

                    <div className="bg-gray-50 rounded-xl p-5 border border-border">
                        <div className="flex justify-between items-center mb-5">
                            <span className="text-xs font-bold text-text-muted uppercase tracking-widest">Department</span>
                            <span className="text-sm font-semibold text-text-primary bg-white px-3 py-1 rounded-full border border-border shadow-sm">General Physician</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-5 border-t border-border pt-5">
                            <div>
                                <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1 block">Date</span>
                                <span className="text-sm font-bold text-text-primary">Oct 25, 2024</span>
                            </div>
                            <div>
                                <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1 block">Time</span>
                                <span className="text-sm font-bold text-text-primary">10:30 AM</span>
                            </div>
                        </div>

                        <div className="border-t border-border pt-5">
                            <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2 block">Assigned Doctor</span>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-sm">👩🏻‍⚕️</div>
                                <span className="text-sm font-bold text-text-primary">Dr. Ananya Sharma</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button onClick={() => setActiveModal(null)} className="flex-1 py-3 bg-white border border-border text-text-primary font-semibold text-sm rounded-xl hover:bg-surface-hover transition-colors shadow-sm">
                            Cancel
                        </button>
                        <button onClick={() => {
                            setActiveModal('appt_success');
                        }} className="flex-1 py-3 bg-primary text-white font-semibold text-sm rounded-xl hover:bg-primary-dark transition-colors shadow-sm">
                            Confirm Booking
                        </button>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={activeModal === 'appt_success'} onClose={() => setActiveModal(null)} title="Booking Successful">
                <div className="text-center py-6">
                    <div className="w-16 h-16 bg-success/20 text-success rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-text-primary mb-2">Appointment Confirmed</h3>
                    <p className="text-sm text-text-secondary px-6">Your consultation with Dr. Ananya Sharma has been scheduled for Oct 25, 2024 at 10:30 AM.</p>
                    <button onClick={() => setActiveModal(null)} className="w-full mt-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors">Return to Dashboard</button>
                </div>
            </Modal>

            <Modal isOpen={activeModal === 'appt_details'} onClose={() => { setActiveModal(null); setModalData(null); }} title="Appointment Details">
                {modalData && (
                    <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-xl border border-border text-center">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-sm border border-white mx-auto mb-2 ${modalData.status === 'Confirmed' ? 'bg-green-50' : 'bg-gray-100'}`}>{modalData.icon}</div>
                            <h3 className="text-lg font-bold text-text-primary">{modalData.doc}</h3>
                            <p className="text-sm text-text-secondary">{modalData.spec}</p>
                            <div className="mt-3 inline-block">
                                <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${modalData.color}`}>{modalData.status}</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center px-2 py-3 border-b border-border">
                            <span className="text-sm font-medium text-text-secondary">Date & Time</span>
                            <span className="text-sm font-bold text-text-primary whitespace-pre-line text-right">{modalData.date}</span>
                        </div>
                        <div className="flex justify-between items-center px-2 py-3 border-b border-border">
                            <span className="text-sm font-medium text-text-secondary">Location</span>
                            <span className="text-sm font-bold text-text-primary">Medical Center, Room 104</span>
                        </div>
                        {modalData.status === 'Confirmed' && (
                            <button onClick={() => { window.alert('Cancellation request submitted.'); setActiveModal(null); }} className="w-full mt-4 py-3 bg-red-50 text-danger font-bold rounded-xl border border-red-200 hover:bg-red-100 transition-colors">Cancel Appointment</button>
                        )}
                        <button onClick={() => setActiveModal(null)} className="w-full mt-2 py-3 bg-gray-100 text-text-primary font-bold rounded-xl border border-transparent hover:bg-gray-200 transition-colors">Close</button>
                    </div>
                )}
            </Modal>

            <Modal isOpen={activeModal === 'dialing'} onClose={() => { setActiveModal(null); setModalData(null); }} title="Emergency Call">
                {modalData && (
                    <div className="text-center py-10">
                        <div className="w-20 h-20 bg-danger/10 text-danger rounded-full flex items-center justify-center mx-auto mb-6 relative">
                            <div className="absolute inset-0 bg-danger/20 rounded-full animate-ping"></div>
                            <PhoneCall className="w-10 h-10 animate-pulse" />
                        </div>
                        <h3 className="text-2xl font-bold text-text-primary mb-1">{modalData.title}</h3>
                        <p className="text-sm text-text-secondary">{modalData.subtitle}</p>
                        <button onClick={() => { setActiveModal(null); setModalData(null); }} className="mt-8 px-8 py-3 bg-danger text-white rounded-full font-bold hover:bg-red-600 shadow-lg transition-transform hover:scale-105 active:scale-95">End Call</button>
                    </div>
                )}
            </Modal>

            <Modal isOpen={activeModal === 'add_contact'} onClose={() => setActiveModal(null)} title="Add Emergency Contact">
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-bold text-text-primary block mb-1">Name</label>
                        <input type="text" placeholder="e.g. John Doe" className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary bg-gray-50" />
                    </div>
                    <div>
                        <label className="text-sm font-bold text-text-primary block mb-1">Phone Number</label>
                        <input type="tel" placeholder="+1 (555) 000-0000" className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary bg-gray-50" />
                    </div>
                    <div>
                        <label className="text-sm font-bold text-text-primary block mb-1">Relationship</label>
                        <select className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary bg-gray-50">
                            <option>Parent</option>
                            <option>Guardian</option>
                            <option>Sibling</option>
                            <option>Friend</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <button onClick={() => setActiveModal(null)} className="w-full mt-2 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-colors">Save Contact</button>
                </div>
            </Modal>

            <Modal isOpen={activeModal === 'audio_player'} onClose={() => { setActiveModal(null); setModalData(null); }} title="Now Playing">
                {modalData && (
                    <div className="text-center">
                        <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-6 shadow-md">
                            <img src={modalData.img} alt="Cover" className="absolute inset-0 w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 cursor-pointer hover:bg-white/30 transition-colors">
                                    <div className="w-5 h-5 bg-white shadow-sm" style={{ clipPath: 'polygon(0 0, 0 100%, 100% 50%)' }}></div>
                                </div>
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-text-primary mb-1">{modalData.title}</h3>
                        <p className="text-sm text-text-secondary mb-6">Mindfulness Hub</p>
                        <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden mb-2">
                            <div className="bg-primary h-full w-1/3"></div>
                        </div>
                        <div className="flex justify-between text-[10px] font-semibold text-text-muted mb-6">
                            <span>05:12</span>
                            <span>15:00</span>
                        </div>
                        <button onClick={() => setActiveModal(null)} className="py-2.5 px-6 bg-gray-100 text-text-secondary font-bold rounded-xl hover:bg-gray-200 transition-colors text-sm">Minimize Player</button>
                    </div>
                )}
            </Modal>

            <Modal isOpen={activeModal === 'toolkit_details'} onClose={() => setActiveModal(null)} title="Mental Health Toolkit">
                <div className="space-y-4">
                    <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800" alt="Toolkit" className="w-full h-32 object-cover rounded-xl" />
                    <div>
                        <h3 className="text-lg font-bold text-text-primary">Mental Health Resources</h3>
                        <p className="text-sm text-text-secondary mt-1">Access completely anonymous, guided resources to manage stress, anxiety, and academic pressure.</p>
                    </div>
                    <ul className="space-y-3 mt-4 text-sm">
                        <li className="flex gap-3 items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-pointer">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">🧠</div>
                            <span className="font-semibold flex-1">Understanding Anxiety</span>
                            <ChevronRight className="w-4 h-4 text-text-muted" />
                        </li>
                        <li className="flex gap-3 items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-pointer">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">🌙</div>
                            <span className="font-semibold flex-1">Sleep Hygiene Guide</span>
                            <ChevronRight className="w-4 h-4 text-text-muted" />
                        </li>
                    </ul>
                </div>
            </Modal>
        </div>
    );
}
