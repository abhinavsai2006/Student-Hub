'use client';

import React, { useState } from 'react';
import { Upload, Trash2, FileText, Calculator, Maximize, Scissors, AlignLeft, Settings, Database, RefreshCw, Type, Link, Monitor, Info, Star, Plus, CheckCircle2 } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';

export default function ToolsPage() {
    const [pdfs, setPdfs] = React.useState([
        { id: 1, name: 'Physics_Notes.pdf', size: '1.2 MB' },
        { id: 2, name: 'Lab_Data_S3.pdf', size: '3.6 MB' }
    ]);

    const [skills, setSkills] = React.useState(['React', 'Python', 'Node.js']);
    const [newSkill, setNewSkill] = React.useState('');

    const [subjects, setSubjects] = React.useState([
        { id: 1, name: 'Data Structures' },
        { id: 2, name: 'Operating Systems' },
        { id: 3, name: 'Mathematics III' },
        { id: 4, name: 'Digital Logic' }
    ]);

    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [activePdfTool, setActivePdfTool] = useState('Merge');

    // Modal specific states
    const [feedback, setFeedback] = useState('');
    const [exportProgress, setExportProgress] = useState(0);
    const [isExporting, setIsExporting] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState('Modern');
    const [profSummary, setProfSummary] = useState('Ambitious software engineering student with a strong foundation in modern web technologies. Searching for a dynamic internship to leverage my skills.');

    const handleAddPdf = () => {
        const titles = ['Assignment_1', 'Lab_Report_Draft', 'Research_Paper_V2', 'Lecture_Notes_Ch4'];
        const title = titles[Math.floor(Math.random() * titles.length)];
        setPdfs([...pdfs, { id: Date.now(), name: title + '.pdf', size: (Math.random() * 5).toFixed(1) + ' MB' }]);
        alert(`${title}.pdf successfully uploaded.`);
    };

    const handleDeletePdf = (id: number) => {
        setPdfs(pdfs.filter(p => p.id !== id));
        alert('File removed successfully.');
    };

    const handleAddSkill = () => {
        if (newSkill.trim()) {
            setSkills([...skills, newSkill.trim()]);
            setNewSkill('');
        }
    };

    const handleDeleteSkill = (skillList: string) => {
        setSkills(skills.filter(s => s !== skillList));
    };

    const handleAddSubject = () => {
        const newSubjects = ['Software Engineering', 'Machine Learning', 'Computer Networks', 'Cloud Computing'];
        const title = newSubjects[Math.floor(Math.random() * newSubjects.length)];
        setSubjects([...subjects, { id: Date.now(), name: title }]);
        alert(`Subject "${title}" added to your planner.`);
    };

    const handleDeleteSubject = (id: number) => {
        setSubjects(subjects.filter(s => s.id !== id));
        alert('Subject deleted.');
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                    <h2 className="text-[10px] font-bold text-primary uppercase tracking-widest flex items-center gap-1.5 mb-1">
                        <Settings className="w-3 h-3" /> UTILITY SUITE
                    </h2>
                    <h1 className="text-2xl font-bold text-text-primary">Academic Tools</h1>
                    <p className="text-sm text-text-secondary mt-1">Boost your productivity with integrated document management, career preparation, and academic tracking utilities.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={() => setActiveModal('feedback')} className="px-5 py-2.5 bg-white border border-border rounded-xl text-sm font-semibold hover:bg-surface-hover shadow-sm transition-colors">
                        Feedback
                    </button>
                    <button onClick={() => setActiveModal('new_project')} className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-dark shadow-sm flex items-center gap-2 transition-colors">
                        <Plus className="w-4 h-4" /> New Project
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">

                {/* Left Column */}
                <div className="lg:col-span-5 space-y-6">

                    {/* PDF Toolkit */}
                    <div className="bg-white rounded-2xl border border-border shadow-sm p-6 relative">
                        <span className="absolute top-6 right-6 text-[10px] font-bold text-primary bg-primary-50 px-2.5 py-1 rounded-md">Pro Feature</span>
                        <div className="flex items-center gap-2 mb-1">
                            <FileText className="w-5 h-5 text-primary" />
                            <h2 className="text-lg font-bold text-text-primary">PDF Toolkit</h2>
                        </div>
                        <p className="text-sm text-text-secondary mb-6">Merge, Split, or Compress your academic documents</p>

                        <div className="flex border-b border-border text-sm font-semibold mb-6">
                            {['Merge', 'Split', 'Compress', 'Convert'].map((t, i) => (
                                <button key={t} onClick={() => setActivePdfTool(t)} className={`flex-1 pb-3 text-center border-b-2 transition-colors ${activePdfTool === t ? 'border-primary text-text-primary' : 'border-transparent text-text-muted hover:text-text-primary'}`}>
                                    {t}
                                </button>
                            ))}
                        </div>

                        <div onClick={handleAddPdf} className="border-2 border-dashed border-border rounded-xl bg-gray-50 flex flex-col items-center justify-center py-10 mb-6 hover:border-primary/50 transition-colors cursor-pointer">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                                <Upload className="w-5 h-5 text-primary" />
                            </div>
                            <p className="text-base font-bold text-text-primary">Drop PDF files here</p>
                            <p className="text-sm text-text-secondary mt-1 mb-3">or click to select files from your drive</p>
                            <p className="text-[10px] font-bold text-text-muted tracking-widest uppercase">MAXIMUM SIZE: 50MB</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {pdfs.map(pdf => (
                                <div key={pdf.id} className="p-4 border border-border rounded-xl flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <FileText className="w-5 h-5 text-red-500" />
                                        <div>
                                            <p className="text-sm font-bold text-text-primary">{pdf.name}</p>
                                            <p className="text-xs text-text-muted">{pdf.size} • Ready</p>
                                        </div>
                                    </div>
                                    <button onClick={() => handleDeletePdf(pdf.id)} className="text-danger hover:bg-red-50 p-1.5 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                                </div>
                            ))}
                            {pdfs.length === 0 && (
                                <div className="col-span-2 p-6 border border-border border-dashed rounded-xl bg-gray-50/50 text-center text-text-muted text-sm">No files uploaded.</div>
                            )}
                        </div>
                    </div>

                    {/* Resume Builder */}
                    <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
                                    <Star className="w-5 h-5 text-primary" /> Resume Builder
                                </h2>
                                <p className="text-sm text-text-muted mt-1">Real-time ATS-friendly resume generator</p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => setActiveModal('template_gallery')} className="px-4 py-2 bg-gray-50 border border-border rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-gray-100">
                                    <AlignLeft className="w-4 h-4" /> {selectedTemplate}
                                </button>
                                <button onClick={() => { setActiveModal('export_resume'); setExportProgress(0); setIsExporting(true); }} className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-primary-dark shadow-sm">
                                    <FileText className="w-4 h-4" /> Export
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Form */}
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-3">Basic Information</h3>
                                    <div className="space-y-3">
                                        <input type="text" defaultValue="Arjun Sharma" className="w-full text-sm font-medium px-4 py-2.5 bg-white border border-border rounded-xl focus:border-primary focus:outline-none" />
                                        <input type="text" defaultValue="Software Engineering Student" className="w-full text-sm font-medium px-4 py-2.5 bg-white border border-border rounded-xl focus:border-primary focus:outline-none" />
                                        <input type="email" defaultValue="arjun.s@university.edu" className="w-full text-sm font-medium px-4 py-2.5 bg-white border border-border rounded-xl focus:border-primary focus:outline-none" />
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-3">Skills</h3>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {skills.map(skill => (
                                            <span key={skill} className="text-xs font-semibold px-3 py-1.5 bg-gray-100 border border-border rounded-lg flex items-center gap-1">
                                                {skill} <Trash2 onClick={() => handleDeleteSkill(skill)} className="w-3 h-3 text-danger ml-1 cursor-pointer hover:scale-110 transition-transform" />
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex border-b border-border m-0 p-0 text-sm">
                                        <input type="text" value={newSkill} onChange={e => setNewSkill(e.target.value)} placeholder="Add skill..." className="w-full py-1.5 focus:outline-none bg-transparent" onKeyDown={(e) => { if (e.key === 'Enter') handleAddSkill() }} />
                                        <button onClick={handleAddSkill} className="text-primary font-bold px-3 py-1 hover:bg-surface-hover rounded transition-colors">+</button>
                                    </div>
                                </div>

                                <button onClick={() => setActiveModal('summary_editor')} className="w-full py-3 bg-gray-50 border border-border hover:bg-gray-100 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
                                    <AlignLeft className="w-4 h-4" /> Edit Professional Summary
                                </button>
                            </div>

                            {/* Preview */}
                            <div className="bg-gray-50 rounded-xl border border-border p-4 flex items-center justify-center">
                                <div className="bg-white border border-border shadow-sm w-full h-[350px] rounded p-6 shadow-md overflow-hidden relative scale-[0.95] origin-top">
                                    <div className="flex justify-between items-baseline border-b border-gray-300 pb-2 mb-4">
                                        <div>
                                            <h1 className="text-lg font-bold text-text-primary tracking-tight">ARJUN SHARMA</h1>
                                            <p className="text-[8px] font-bold text-primary uppercase mt-0.5">Software Engineering Student</p>
                                        </div>
                                        <div className="text-right text-[7px] text-text-secondary leading-tight">
                                            New Delhi, India<br />
                                            arjun.s@university.edu<br />
                                            github.com/arjun<br />
                                        </div>
                                    </div>
                                    <p className="text-[6px] text-text-secondary italic mb-3">"{profSummary}"</p>

                                    <div className="grid grid-cols-3 gap-6">
                                        <div className="col-span-1 border-r border-gray-200 pr-4">
                                            {/* Skills */}
                                            <div className="mb-4">
                                                <h2 className="text-[7px] font-bold tracking-widest uppercase border-b border-gray-200 pb-1 mb-2">Skills</h2>
                                                <ul className="text-[6px] text-text-secondary space-y-1 list-disc pl-2.5 marker:text-gray-400">
                                                    <li><span className="font-semibold text-text-primary">Languages:</span> JS, Python</li>
                                                    <li><span className="font-semibold text-text-primary">Frontend:</span> React, Next.js</li>
                                                    <li><span className="font-semibold text-text-primary">Backend:</span> Node.js, Exp.</li>
                                                    <li><span className="font-semibold text-text-primary">Database:</span> Postgres</li>
                                                </ul>
                                            </div>
                                            {/* Education */}
                                            <div>
                                                <h2 className="text-[7px] font-bold tracking-widest uppercase border-b border-gray-200 pb-1 mb-2">Education</h2>
                                                <p className="text-[7px] font-bold text-text-primary">B.Tech in Comp Science</p>
                                                <p className="text-[6px] text-text-secondary">Expected 2025</p>
                                                <p className="text-[6px] text-text-secondary mt-1 italic">Indian Institute of Tech.</p>
                                            </div>
                                        </div>
                                        <div className="col-span-2">
                                            {/* Experience */}
                                            <div className="mb-4">
                                                <h2 className="text-[7px] font-bold tracking-widest uppercase border-b border-gray-200 pb-1 mb-2">Experience</h2>
                                                <div className="mb-3">
                                                    <div className="flex justify-between items-baseline">
                                                        <p className="text-[7px] font-bold text-text-primary">Software Engineer Intern</p>
                                                        <p className="text-[6px] text-text-muted">Summer 2024</p>
                                                    </div>
                                                    <p className="text-[6px] text-primary font-semibold mb-1">Tech Innovations Ltd.</p>
                                                    <ul className="text-[6px] text-text-secondary space-y-1 list-disc pl-2.5 marker:text-gray-400">
                                                        <li>Developed real-time analytics dashboard improving reporting.</li>
                                                        <li>Optimized SQL queries to reduce load time by 45%.</li>
                                                        <li>Implemented auth flows.</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            {/* Projects */}
                                            <div>
                                                <h2 className="text-[7px] font-bold tracking-widest uppercase border-b border-gray-200 pb-1 mb-2">Projects</h2>
                                                <div>
                                                    <p className="text-[7px] font-bold text-text-primary">Campus OS App</p>
                                                    <ul className="text-[6px] text-text-secondary space-y-1 list-disc pl-2.5 mt-1 marker:text-gray-400">
                                                        <li>Built an integrated campus platform for students using full-stack web tech.</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-2 space-y-6">

                    {/* CGPA Calculator */}
                    <div className="bg-white rounded-2xl border border-border shadow-sm p-6 relative">
                        <button onClick={() => { window.alert('Recalculating live academic standings...'); }} className="absolute top-6 right-6 p-1 text-text-muted hover:text-text-primary"><RefreshCw className="w-4 h-4" /></button>
                        <div className="flex items-center gap-2 mb-1">
                            <Calculator className="w-5 h-5 text-primary" />
                            <h2 className="text-lg font-bold text-text-primary">CGPA Calculator</h2>
                        </div>
                        <p className="text-xs text-text-secondary mb-6 pr-6">Plan your semester grades and track progress</p>

                        <table className="w-full text-left mb-4">
                            <thead>
                                <tr className="text-[10px] font-bold text-text-muted uppercase tracking-wider border-b border-border-light">
                                    <th className="pb-2 font-medium">Subject</th>
                                    <th className="pb-2 font-medium">Credits</th>
                                    <th className="pb-2 font-medium">Grade</th>
                                    <th className="pb-2 text-right"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border-light text-sm">
                                {subjects.map((s, i) => (
                                    <tr key={s.id}>
                                        <td className="py-3 pr-2 text-text-primary font-medium">{s.name}</td>
                                        <td className="py-3 px-2">
                                            <div className="w-8 h-6 bg-gray-50 border border-border-light rounded flex items-center justify-center text-xs">3</div>
                                        </td>
                                        <td className="py-3 px-2">
                                            <div className="w-10 h-6 bg-gray-50 border border-border-light rounded flex items-center justify-center text-xs">A</div>
                                        </td>
                                        <td className="py-3 pl-2 text-right">
                                            <button onClick={() => handleDeleteSubject(s.id)} className="text-danger hover:bg-red-50 p-1.5 rounded transition-colors"><Trash2 className="w-4 h-4" /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <button onClick={handleAddSubject} className="w-full py-2.5 border border-border rounded-xl text-sm font-semibold text-primary flex items-center justify-center gap-2 hover:bg-surface-hover transition-colors mb-6 shadow-sm">
                            <Plus className="w-4 h-4" /> Add Subject
                        </button>

                        <div className="flex bg-primary-50 rounded-xl border border-primary/20 overflow-hidden divide-x divide-primary/20 text-center">
                            <div className="flex-1 py-4">
                                <p className="text-[10px] font-bold text-primary tracking-widest uppercase mb-1">Semester SGPA</p>
                                <div className="flex items-baseline justify-center gap-1">
                                    <span className="text-3xl font-bold text-primary">8.43</span>
                                    <span className="text-xs text-primary font-medium">/ 10.0</span>
                                </div>
                            </div>
                            <div className="flex-1 py-4 bg-white/50">
                                <p className="text-[10px] font-bold text-text-muted tracking-widest uppercase mb-1">Target CGPA</p>
                                <span className="text-2xl font-bold text-text-primary">9.20</span>
                            </div>
                        </div>
                    </div>

                    {/* Mini Utilities */}
                    <div>
                        <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-3">Mini Utilities</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <div onClick={() => setActiveModal('mini_util')} className="bg-white border border-border rounded-xl p-4 text-center hover:border-primary/30 transition-colors shadow-sm cursor-pointer">
                                <Calculator className="w-5 h-5 mx-auto mb-2 text-text-secondary" />
                                <p className="text-xs font-semibold text-text-primary">Scientific Calc</p>
                            </div>
                            <div onClick={() => setActiveModal('mini_util')} className="bg-white border border-border rounded-xl p-4 text-center hover:border-primary/30 transition-colors shadow-sm cursor-pointer">
                                <Database className="w-5 h-5 mx-auto mb-2 text-text-secondary" />
                                <p className="text-xs font-semibold text-text-primary">JSON Formatter</p>
                            </div>
                            <div onClick={() => setActiveModal('mini_util')} className="bg-white border border-border rounded-xl p-4 text-center hover:border-primary/30 transition-colors shadow-sm cursor-pointer">
                                <Type className="w-5 h-5 mx-auto mb-2 text-accent" />
                                <p className="text-xs font-semibold text-text-primary">Case Converter</p>
                            </div>
                            <div onClick={() => setActiveModal('mini_util')} className="bg-white border border-border rounded-xl p-4 text-center hover:border-primary/30 transition-colors shadow-sm cursor-pointer">
                                <Link className="w-5 h-5 mx-auto mb-2 text-success" />
                                <p className="text-xs font-semibold text-text-primary">URL Shortener</p>
                            </div>
                        </div>
                    </div>

                    <div onClick={() => { window.alert("Synchronizing secure cloud payload to end-to-end encrypted backup..."); }} className="bg-[#111827] rounded-xl flex items-center gap-4 p-4 text-white shadow-xl relative overflow-hidden cursor-pointer hover:bg-gray-900 transition-colors">
                        <div className="absolute right-0 top-0 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
                        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 relative z-10 border border-white/10">
                            <Monitor className="w-5 h-5 text-gray-200" />
                        </div>
                        <div className="relative z-10">
                            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-0.5">Sync Devices</p>
                            <p className="text-sm font-bold tracking-wide">Cloud Storage Active</p>
                        </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 shadow-sm">
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-primary flex-shrink-0">
                                <Info className="w-4 h-4" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-primary mb-1">Student Tip!</h4>
                                <p className="text-xs text-blue-800 leading-relaxed">
                                    Use the Resume Builder to match your skills with campus job requirements. ATS-optimized templates increase interview chances by 40%.
                                </p>
                                <button onClick={() => setActiveModal('ats_tips')} className="inline-block mt-2 text-xs font-bold text-primary hover:underline">Learn More ↗</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Modals */}
            <Modal isOpen={activeModal === 'feedback'} onClose={() => setActiveModal(null)} title="Submit Feedback">
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-bold text-text-primary block mb-1">What can we improve?</label>
                        <textarea rows={4} value={feedback} onChange={e => setFeedback(e.target.value)} placeholder="Tell us about a bug or suggest a new feature..." className="w-full border border-border rounded-xl px-4 py-3 bg-gray-50 text-sm focus:outline-none focus:border-primary resize-none"></textarea>
                    </div>
                    <button onClick={() => { setActiveModal(null); setFeedback(''); window.alert("Thank you! Your feedback has been sent to our development team."); }} disabled={!feedback.trim()} className="w-full mt-2 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-colors disabled:opacity-50">Submit Ticket</button>
                </div>
            </Modal>

            <Modal isOpen={activeModal === 'new_project'} onClose={() => setActiveModal(null)} title="Create New Project">
                <div className="space-y-4 text-center py-6">
                    <Database className="w-12 h-12 text-primary opacity-20 mx-auto mb-4" />
                    <h3 className="text-lg font-bold">Workspace Initialization</h3>
                    <p className="text-sm text-text-secondary">Please enter the Git repository URL or connect your GitHub account to bootstrap a new project workspace.</p>
                    <button onClick={() => { setActiveModal(null); window.alert("Authentication popup blocked by browser settings for GitHub OAuth."); }} className="w-full mt-4 py-3 bg-[#111827] text-white font-bold rounded-xl transition-colors hover:bg-gray-800">Authenticate via GitHub</button>
                </div>
            </Modal>

            <Modal isOpen={activeModal === 'template_gallery'} onClose={() => setActiveModal(null)} title="Select Template">
                <div className="grid grid-cols-2 gap-4">
                    {['Modern', 'Minimalist', 'Creative', 'Executive'].map(t => (
                        <div key={t} onClick={() => { setSelectedTemplate(t); setActiveModal(null); }} className={`border-2 rounded-xl p-4 cursor-pointer transition-all hover:border-primary hover:bg-primary-50 text-center ${selectedTemplate === t ? 'border-primary bg-primary-50' : 'border-border bg-white'}`}>
                            <AlignLeft className={`w-8 h-8 mx-auto mb-2 ${selectedTemplate === t ? 'text-primary' : 'text-text-muted'}`} />
                            <p className="font-bold text-sm text-text-primary">{t}</p>
                        </div>
                    ))}
                </div>
            </Modal>

            <Modal isOpen={activeModal === 'export_resume'} onClose={() => setActiveModal(null)} title="Export Resume to PDF">
                <div className="text-center py-6">
                    {isExporting ? (
                        <div className="space-y-4">
                            <FileText className="w-16 h-16 text-primary animate-bounce mx-auto" />
                            <p className="text-sm font-bold text-text-primary">Generating High-Quality PDF...</p>
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
                            <button onClick={() => { setActiveModal(null); window.alert("Arjun_Sharma_Resume.pdf downloading..."); }} className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors">Download PDF</button>
                        </div>
                    )}
                </div>
            </Modal>

            <Modal isOpen={activeModal === 'summary_editor'} onClose={() => setActiveModal(null)} title="Edit Professional Summary">
                <div className="space-y-4">
                    <textarea value={profSummary} onChange={e => setProfSummary(e.target.value)} rows={6} className="w-full border border-border rounded-xl px-4 py-3 bg-gray-50 text-sm focus:outline-none focus:border-primary resize-none"></textarea>
                    <button onClick={() => setActiveModal(null)} className="w-full mt-2 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-colors">Save Summary</button>
                </div>
            </Modal>

            <Modal isOpen={activeModal === 'mini_util'} onClose={() => setActiveModal(null)} title="Utility Launched">
                <div className="text-center py-10">
                    <Settings className="w-12 h-12 mx-auto text-primary opacity-20 mb-4 animate-spin-slow" />
                    <h3 className="text-lg font-bold text-text-primary mb-2">Module Installed</h3>
                    <p className="text-sm text-text-secondary">This mini-utility is launching in a secure sandboxed iframe environment.</p>
                </div>
            </Modal>

            <Modal isOpen={activeModal === 'ats_tips'} onClose={() => setActiveModal(null)} title="ATS Optimization Secrets">
                <div className="space-y-4 text-sm text-text-secondary leading-relaxed">
                    <p><strong>1. Use standard headings:</strong> Stick to "Experience", "Education", "Skills". Avoid "What I've done".</p>
                    <p><strong>2. Keyword matching:</strong> Mirror the exact phrasing used in the job description.</p>
                    <p><strong>3. Keep it simple:</strong> Don't use complex multi-column layouts or graphics. Our 'Minimalist' template passes ATS parsers 99% of the time.</p>
                    <p><strong>4. File Format:</strong> Always export as PDF, never Word or image formats.</p>
                    <button onClick={() => setActiveModal(null)} className="w-full mt-4 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-colors">Got it!</button>
                </div>
            </Modal>

        </div>
    );
}
