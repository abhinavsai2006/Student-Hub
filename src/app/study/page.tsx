'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, MapPin, Clock, FileText, CheckCircle2, Calendar } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';

const timetable = {
    Monday: [
        { code: 'CS301', name: 'Data Structures', type: 'Lecture', time: '09:00 - 10:00', room: 'L-101' },
        { code: 'CS304L', name: 'Web Tech Lab', type: 'Lab', time: '11:00 - 13:00', room: 'Lab-4' },
        { code: 'CS302', name: 'Theory of Comp', type: 'Lecture', time: '14:00 - 15:00', room: 'L-102' },
    ],
    Tuesday: [
        { code: 'CS305', name: 'Computer Networks', type: 'Lecture', time: '10:00 - 11:00', room: 'L-201' },
        { code: 'CS303', name: 'Database Mgmt', type: 'Lecture', time: '11:00 - 12:00', room: 'L-201' },
        { code: 'CS301T', name: 'DSA Tutorial', type: 'Tutorial', time: '15:00 - 16:00', room: 'T-12' },
    ],
    Wednesday: [
        { code: 'CS302', name: 'Theory of Comp', type: 'Lecture', time: '09:00 - 10:00', room: 'L-102' },
        { code: 'CS301', name: 'Data Structures', type: 'Lecture', time: '10:00 - 11:00', room: 'L-101' },
        { code: 'CS305L', name: 'Network Lab', type: 'Lab', time: '14:00 - 16:00', room: 'Lab-2' },
    ],
    Thursday: [],
    Friday: []
};

const attendanceList = [
    { code: 'CS301', name: 'Data Structures & Algorithms', attended: 24, total: 30, percent: 80, status: 'safe' },
    { code: 'CS302', name: 'Theory of Computation', attended: 18, total: 30, percent: 60, status: 'warning' },
];

export default function StudyPage() {
    const [targetCgpa, setTargetCgpa] = useState('9.0');
    const [notes, setNotes] = useState<string[]>([]);

    // Modal states
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [exportProgress, setExportProgress] = useState(0);
    const [isExporting, setIsExporting] = useState(false);
    const [selectedAttendance, setSelectedAttendance] = useState<any>(null);
    const [noteDraft, setNoteDraft] = useState({ title: '', content: '' });

    const handlePredict = () => {
        if (!targetCgpa) return;
        setActiveModal('predict_cgpa');
    };

    const handleAddNote = () => {
        setNotes([...notes, noteDraft.title]);
        setActiveModal(null);
        setNoteDraft({ title: '', content: '' });
    };

    const handleReport = () => {
        setActiveModal('report');
        setExportProgress(0);
        setIsExporting(true);
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-text-primary">Academic Study Hub</h1>
                    <p className="text-sm text-text-secondary mt-1">Welcome back, Rahul. You have 3 classes today.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={() => setActiveModal('search')} className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-xl text-sm font-medium hover:bg-surface-hover transition-colors">
                        <Search className="w-4 h-4" />
                        Search Materials
                    </button>
                    <button onClick={() => setActiveModal('add_note')} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors">
                        <Plus className="w-4 h-4" />
                        Add Note
                    </button>
                </div>
            </div>

            {/* Timetable */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
                        <Clock className="w-5 h-5 text-primary" />
                        Weekly Timetable
                    </h2>
                    <button onClick={() => setActiveModal('calendar')} className="text-sm font-medium text-primary hover:underline">View Full Calendar ↗</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {Object.entries(timetable).map(([day, classes]) => (
                        <div key={day}>
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-xs font-bold text-text-muted uppercase tracking-wide">{day}</h3>
                                {classes.length > 0 && <span className="text-xs bg-gray-100 text-text-secondary px-2 py-0.5 rounded-full">{classes.length} Classes</span>}
                            </div>
                            <div className="space-y-3">
                                {classes.length > 0 ? (
                                    classes.map((cls, i) => (
                                        <div key={i} className="bg-white border-l-4 border-primary border-t border-r border-b border-border shadow-sm rounded-xl p-3">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="text-xs font-semibold text-text-secondary">{cls.code}</span>
                                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${cls.type === 'Lecture' ? 'bg-gray-50 text-gray-600 border-gray-200' :
                                                    cls.type === 'Lab' ? 'bg-red-50 text-red-600 border-red-100' :
                                                        'bg-amber-50 text-amber-600 border-amber-100'
                                                    }`}>
                                                    {cls.type}
                                                </span>
                                            </div>
                                            <h4 className="text-sm font-bold text-text-primary leading-tight mb-3">{cls.name}</h4>
                                            <div className="space-y-1.5 line-clamp-1">
                                                <div className="flex items-center gap-1.5 text-xs text-text-muted">
                                                    <Clock className="w-3.5 h-3.5" /> {cls.time}
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs text-text-muted">
                                                    <MapPin className="w-3.5 h-3.5" /> {cls.room}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="h-24 border-2 border-dashed border-border rounded-xl flex items-center justify-center">
                                        <span className="text-sm font-medium text-border">No Classes Scheduled</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Attendance Tracker */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-border shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-lg font-bold text-text-primary">Attendance Tracker</h2>
                            <p className="text-sm text-text-muted mt-1">Keep your attendance above 75% to avoid debarment.</p>
                        </div>
                        <button onClick={handleReport} className="px-4 py-2 border border-border rounded-xl text-sm font-medium hover:bg-surface-hover transition-colors">
                            Export Report
                        </button>
                    </div>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-border-light text-text-muted text-xs font-semibold uppercase">
                                <th className="pb-3 px-2 font-medium">Subject</th>
                                <th className="pb-3 px-2 font-medium">Classes</th>
                                <th className="pb-3 px-2 font-medium">Percentage</th>
                                <th className="pb-3 px-2 text-right font-medium">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-light">
                            {attendanceList.map((att, i) => (
                                <tr key={i}>
                                    <td className="py-4 px-2">
                                        <p className="text-sm font-bold text-text-primary">{att.name}</p>
                                        <p className="text-xs text-text-muted mt-0.5">{att.code}</p>
                                    </td>
                                    <td className="py-4 px-2 text-sm text-text-secondary">{att.attended} / {att.total}</td>
                                    <td className="py-4 px-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <div className={`h-full rounded-full ${att.status === 'safe' ? 'bg-primary' : 'bg-danger'}`} style={{ width: `${att.percent}%` }} />
                                            </div>
                                            <span className={`text-sm font-semibold ${att.status === 'safe' ? 'text-primary' : 'text-danger'}`}>{att.percent}%</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-2 text-right">
                                        {att.status === 'warning' ? (
                                            <button onClick={() => { setSelectedAttendance(att); setActiveModal('attendance_details'); }} className="inline-flex items-center px-2 py-1 bg-danger text-white text-xs font-semibold rounded mx-auto text-center gap-1 hover:bg-red-600 transition-colors">
                                                ! Warning
                                            </button>
                                        ) : (
                                            <button onClick={() => { setSelectedAttendance(att); setActiveModal('attendance_details'); }} className="text-text-secondary text-sm font-medium hover:text-primary transition-colors">Details</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* CGPA Insight */}
                <div className="bg-[#111827] text-white rounded-2xl p-6 shadow-lg relative overflow-hidden">
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>

                    <div className="flex items-center justify-between mb-8 relative z-10">
                        <h2 className="text-lg font-bold flex items-center gap-2">
                            <span className="text-primary-100">🎓</span> CGPA Insight
                        </h2>
                        <span className="text-xs font-medium px-2.5 py-1 bg-white/10 rounded-full">Sem 5</span>
                    </div>

                    <div className="text-center py-4 border border-white/10 bg-white/5 rounded-2xl backdrop-blur-sm relative z-10 mb-8">
                        <p className="text-5xl font-bold tracking-tight">8.42</p>
                        <p className="text-xs font-semibold text-gray-400 mt-2 tracking-widest uppercase">Current Cumulative</p>
                    </div>

                    <div className="relative z-10 pt-4 border-t border-white/10">
                        <p className="text-sm font-medium mb-3">Target CGPA</p>
                        <div className="flex gap-2">
                            <input type="text" value={targetCgpa} onChange={(e) => setTargetCgpa(e.target.value)} className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary text-white" />
                            <button onClick={handlePredict} className="px-5 py-2.5 bg-primary hover:bg-primary-light transition-colors rounded-xl text-sm font-semibold">Predict</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <Modal isOpen={activeModal === 'search'} onClose={() => setActiveModal(null)} title="Search Academic Materials">
                <div className="space-y-4">
                    <div className="relative">
                        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                        <input type="text" autoFocus placeholder="Search for notes, past papers, assignments..." className="w-full pl-12 pr-4 py-3 bg-white border border-border rounded-xl text-sm focus:outline-none focus:border-primary shadow-sm" />
                    </div>
                    <div className="pt-4 border-t border-border mt-4">
                        <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-3">Popular Searches</p>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1.5 bg-gray-50 border border-border-light rounded-lg text-xs font-medium text-text-secondary cursor-pointer hover:bg-gray-100">CS301 Pyqs</span>
                            <span className="px-3 py-1.5 bg-gray-50 border border-border-light rounded-lg text-xs font-medium text-text-secondary cursor-pointer hover:bg-gray-100">Midterm syllabus</span>
                            <span className="px-3 py-1.5 bg-gray-50 border border-border-light rounded-lg text-xs font-medium text-text-secondary cursor-pointer hover:bg-gray-100">Lab manual format</span>
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={activeModal === 'add_note'} onClose={() => setActiveModal(null)} title="Create Fast Note">
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-bold text-text-primary block mb-1">Title</label>
                        <input type="text" value={noteDraft.title} onChange={e => setNoteDraft({ ...noteDraft, title: e.target.value })} placeholder="e.g. OS Inter-process Communication" className="w-full border border-border rounded-xl px-4 py-3 bg-gray-50 text-sm focus:outline-none focus:border-primary" />
                    </div>
                    <div>
                        <label className="text-sm font-bold text-text-primary block mb-1">Content Snippet</label>
                        <textarea value={noteDraft.content} onChange={e => setNoteDraft({ ...noteDraft, content: e.target.value })} rows={5} placeholder="Jot down quick thoughts or link to drive..." className="w-full border border-border rounded-xl px-4 py-3 bg-gray-50 text-sm focus:outline-none focus:border-primary resize-none"></textarea>
                    </div>
                    <button onClick={handleAddNote} disabled={!noteDraft.title} className="w-full mt-2 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-colors disabled:opacity-50">Save Note</button>
                </div>
            </Modal>

            <Modal isOpen={activeModal === 'report'} onClose={() => setActiveModal(null)} title="Export Attendance Report">
                <div className="text-center py-6">
                    {isExporting ? (
                        <div className="space-y-4">
                            <FileText className="w-16 h-16 text-primary animate-bounce mx-auto" />
                            <p className="text-sm font-bold text-text-primary">Generating Official PDF Report...</p>
                            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-primary" style={{ width: `${exportProgress}%`, transition: 'width 0.5s ease-out' }}></div>
                            </div>
                            <p className="text-xs text-text-muted">{exportProgress}% Complete</p>
                            {/* Simulate progress */}
                            {(() => {
                                if (exportProgress < 100) {
                                    setTimeout(() => setExportProgress(p => Math.min(100, p + Math.random() * 20 + 10)), 500);
                                } else {
                                    setTimeout(() => setIsExporting(false), 100);
                                }
                                return null;
                            })()}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-success/20 text-success rounded-full flex items-center justify-center mx-auto mb-2">
                                <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-text-primary">Export Successful!</h3>
                            <button onClick={() => { setActiveModal(null); window.alert("Attendance_Sem5.pdf downloading..."); }} className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors">Download PDF</button>
                        </div>
                    )}
                </div>
            </Modal>

            <Modal isOpen={activeModal === 'calendar'} onClose={() => setActiveModal(null)} title="Full Academic Calendar">
                <div className="space-y-4 text-center py-6">
                    <Calendar className="w-12 h-12 text-primary opacity-20 mx-auto mb-4" />
                    <h3 className="text-lg font-bold">Month View</h3>
                    <p className="text-sm text-text-secondary">Calendar integration allows you to sync your academic timetable with Google Calendar or Apple Calendar.</p>
                    <button onClick={() => { setActiveModal(null); window.alert("Sync initiated. Please check your default calendar app."); }} className="w-full mt-4 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors">Sync Calendar</button>
                </div>
            </Modal>

            <Modal isOpen={activeModal === 'attendance_details'} onClose={() => { setActiveModal(null); setSelectedAttendance(null) }} title="Attendance Details">
                {selectedAttendance && (
                    <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-xl border border-border-light text-center">
                            <h3 className="text-lg font-bold text-text-primary">{selectedAttendance.name}</h3>
                            <p className="text-sm text-text-muted">{selectedAttendance.code}</p>
                        </div>
                        <div className="flex justify-between items-center px-2 py-3 border-b border-border">
                            <span className="text-sm font-medium text-text-secondary">Total Classes</span>
                            <span className="text-sm font-bold text-text-primary">{selectedAttendance.total}</span>
                        </div>
                        <div className="flex justify-between items-center px-2 py-3 border-b border-border">
                            <span className="text-sm font-medium text-text-secondary">Classes Attended</span>
                            <span className="text-sm font-bold text-success">{selectedAttendance.attended}</span>
                        </div>
                        <div className="flex justify-between items-center px-2 py-3 border-b border-border">
                            <span className="text-sm font-medium text-text-secondary">Classes Missed</span>
                            <span className="text-sm font-bold text-danger">{selectedAttendance.total - selectedAttendance.attended}</span>
                        </div>
                        <div className="flex justify-between items-center px-2 py-3 border-b border-border">
                            <span className="text-sm font-medium text-text-secondary">Current Percentage</span>
                            <span className={`text-sm font-bold ${selectedAttendance.percent >= 75 ? 'text-primary' : 'text-danger'}`}>{selectedAttendance.percent}%</span>
                        </div>
                        {selectedAttendance.percent < 75 && (
                            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                                <strong>Warning:</strong> You are below the 75% threshold. You must attend the next <strong>{Math.ceil((0.75 * selectedAttendance.total - selectedAttendance.attended) / 0.25)}</strong> classes consecutively to be in the safe zone.
                            </div>
                        )}
                        <button onClick={() => setActiveModal(null)} className="w-full mt-4 py-3 bg-gray-100 text-text-primary rounded-xl font-bold hover:bg-gray-200 transition-colors">Close</button>
                    </div>
                )}
            </Modal>

            <Modal isOpen={activeModal === 'predict_cgpa'} onClose={() => setActiveModal(null)} title="CGPA Prediction Result">
                <div className="text-center py-6">
                    <div className="text-6xl mb-4">🔮</div>
                    <h3 className="text-2xl font-bold text-text-primary mb-2">Target: {targetCgpa}</h3>
                    <div className="space-y-3 text-sm text-text-secondary leading-relaxed bg-gray-50 p-4 rounded-xl border border-border mt-4">
                        <p>Based on your current cumulative CGPA of <strong>8.42</strong>...</p>
                        <p>You need to maintain an average SGPA of <strong>{Math.min(10.0, parseFloat(targetCgpa) + 0.2).toFixed(2)}</strong> or higher in Semester 5 to hit your target.</p>
                        <p className="font-bold text-primary mt-2">You can do this! Keep studying!</p>
                    </div>
                    <button onClick={() => setActiveModal(null)} className="w-full mt-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-colors">Got it</button>
                </div>
            </Modal>
        </div >
    );
}
