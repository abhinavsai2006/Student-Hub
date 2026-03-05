'use client';

import React, { useState, useRef } from 'react';
import { Search, Filter, Plus, ArrowUp, ArrowDown, MessageSquare, Share2, MoreHorizontal, User, BookOpen, Clock, Calendar, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';

const initialVents = [
    { id: 1, tag: 'Academic', text: 'The Internal exam for Data Structures was brutal. Why did they include so much O-notation theory??', likes: 12, time: '2m ago' },
    { id: 2, tag: 'Social', text: 'Is it just me or is the food at Mess 2 getting worse every day? The paneer was like rubber today.', likes: 45, time: '15m ago' },
    { id: 3, tag: 'Help', text: 'Anyone have notes for the Economics minor? Missed last two lectures because of the flu.', likes: 8, time: '1h ago' },
];

const initialPosts = [
    {
        id: 1, upvotes: 245, author: 'Ananya Iyer', role: 'Final Year Student', time: '2 hours ago', tag: 'Events',
        title: "The Annual Cultural Fest 'Manthan' is back! Dates announced inside.",
        body: "Hey everyone! The student council has finally locked in the dates for Manthan 2024. We're looking for volunteers across all departments. Check the link for the registration form and list of...",
        hasImage: true, comments: 89
    },
    {
        id: 2, upvotes: 182, author: 'Prof. Satish', role: 'Faculty Mentor', time: '5 hours ago', tag: 'Placement',
        title: "Summer Internship Opportunities: Microsoft & Adobe open for 3rd years.",
        body: "Important update for the pre-final year students. The portal for Microsoft's STEP program and Adobe's internship drive is now live. Ensure your CGPA is above 8.5 before applying. I'll be holding a...",
        hasImage: false, comments: 34
    },
    {
        id: 3, upvotes: 67, author: 'Vikram Mehta', role: 'Robotics Club Lead', time: '1 day ago', tag: 'Clubs',
        title: "Request for feedback: New Robotics lab timings?",
        body: "Since many students have classes until 5 PM, we're considering keeping the robotics lab open until midnight on weekdays. Would this be helpful? Also, if anyone is interested in joining the national...",
        hasImage: false, comments: 15
    }
];

export default function CommunityPage() {
    const [activeTab, setActiveTab] = useState('All Posts');
    const [ventList, setVentList] = useState(initialVents);
    const [newVent, setNewVent] = useState('');
    const [postList, setPostList] = useState(initialPosts);
    const [searchQuery, setSearchQuery] = useState('');

    const [likedVents, setLikedVents] = useState<Set<number>>(new Set());
    const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());

    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [draftPost, setDraftPost] = useState({ title: '', body: '', category: 'Events' });
    const [selectedPostComments, setSelectedPostComments] = useState<any>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const toggleVentLike = (id: number) => {
        const newSet = new Set(likedVents);
        if (newSet.has(id)) newSet.delete(id); else newSet.add(id);
        setLikedVents(newSet);
    };

    const handlePostVote = (id: number, delta: number) => {
        const newSet = new Set(likedPosts);
        if (newSet.has(id)) newSet.delete(id); else newSet.add(id);
        setLikedPosts(newSet);
        setPostList(postList.map(p => p.id === id ? { ...p, upvotes: p.upvotes + (likedPosts.has(id) ? -delta : delta) } : p));
    }

    const handlePostVent = () => {
        if (!newVent.trim()) return;
        setVentList([{ id: Date.now(), tag: 'Random', text: newVent, likes: 0, time: 'Just now' }, ...ventList]);
        setNewVent('');
    };

    const handleDeletePost = (id: number) => {
        setPostList(postList.filter(p => p.id !== id));
    };

    const handleAddPostSubmit = () => {
        setPostList([{
            id: Date.now(), upvotes: 1, author: 'You', role: 'Student', time: 'Just now', tag: draftPost.category,
            title: draftPost.title, body: draftPost.body, hasImage: false, comments: 0
        }, ...postList]);
        setActiveModal(null);
        setDraftPost({ title: '', body: '', category: 'Events' });
    };

    const handleShare = async (title: string, text: string) => {
        if (navigator.share) {
            try { await navigator.share({ title, text, url: window.location.href }); } catch (e) { /* ignored */ }
        } else {
            navigator.clipboard.writeText(`${title} - ${text}`);
            alert('Copied link to clipboard!');
        }
    };

    const displayedPosts = postList.filter(p =>
        (activeTab === 'All Posts' || p.tag === activeTab) &&
        (p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.body.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">

            {/* Left Column: Vents */}
            <div className="w-full lg:w-72 flex-shrink-0 space-y-6 hidden md:block">
                <div className="flex items-center justify-between pb-2">
                    <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-primary" />
                        Anonymous Vents
                    </h2>
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-red-100 text-red-600 px-2 py-0.5 rounded-full border border-red-200">Live</span>
                </div>

                <div className="bg-white rounded-2xl border border-border shadow-sm p-4">
                    <textarea
                        value={newVent}
                        onChange={(e) => setNewVent(e.target.value)}
                        placeholder="What's on your mind? (100% anonymous)"
                        className="w-full h-24 text-sm bg-transparent border-none focus:ring-0 resize-none placeholder:text-text-muted"
                    ></textarea>
                    <div className="flex justify-between items-center mt-3 border-t border-border-light pt-3">
                        <input type="file" className="hidden" ref={fileInputRef} accept="image/*" />
                        <button onClick={() => fileInputRef.current?.click()} className="p-1.5 text-text-muted hover:text-text-primary"><ImageIcon className="w-4 h-4" /></button>
                        <button onClick={handlePostVent} className="px-4 py-1.5 bg-primary-100 text-primary font-semibold text-sm rounded-lg hover:bg-primary-50 transition-colors">Post Vent</button>
                    </div>
                </div>

                <div className="space-y-4">
                    {ventList.map((v) => (
                        <div key={v.id} className="bg-white rounded-2xl border border-border p-4 hover:shadow-sm transition-shadow">
                            <div className="flex justify-between items-center mb-2">
                                <span className="bg-gray-100 text-text-secondary text-[10px] font-bold px-2.5 py-1 rounded-full">{v.tag}</span>
                                <span className="text-[10px] text-text-muted font-medium">{v.time}</span>
                            </div>
                            <p className="text-sm text-text-primary leading-relaxed">{v.text}</p>
                            <div onClick={() => toggleVentLike(v.id)} className={`flex items-center gap-1.5 mt-3 text-xs font-semibold cursor-pointer w-fit transition-colors ${likedVents.has(v.id) ? 'text-primary' : 'text-text-muted hover:text-primary'}`}>
                                <ArrowUp className="w-3.5 h-3.5" />
                                {likedVents.has(v.id) ? v.likes + 1 : v.likes}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Middle Column: Main Feed */}
            <div className="flex-1 min-w-0 space-y-6">
                <div className="flex gap-3">
                    <div className="flex-1 relative">
                        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search forum discussions..." className="w-full pl-10 pr-4 py-3 bg-white border border-border rounded-xl text-sm focus:outline-none focus:border-primary shadow-sm" />
                    </div>
                    <button onClick={() => setActiveModal('filters')} className="px-4 py-3 bg-white border border-border rounded-xl flex items-center gap-2 text-sm font-semibold hover:bg-surface-hover shadow-sm transition-colors">
                        <Filter className="w-4 h-4" /> Filters
                    </button>
                    <button onClick={() => setActiveModal('add_post')} className="px-5 py-3 bg-primary text-white rounded-xl flex items-center gap-2 text-sm font-semibold shadow-sm hover:bg-primary-dark transition-colors">
                        <Plus className="w-4 h-4" /> New Post
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-border text-sm font-semibold">
                    {['All Posts', 'Campus News', 'Events', 'Q&A', 'Placement'].map(t => (
                        <button key={t} onClick={() => setActiveTab(t)} className={`px-5 py-3 border-b-2 transition-colors ${activeTab === t ? 'border-primary text-primary' : 'border-transparent text-text-muted hover:text-text-primary'}`}>{t}</button>
                    ))}
                </div>

                {/* Feed List */}
                <div className="space-y-4">
                    {displayedPosts.length === 0 && (
                        <div className="text-center py-10 text-text-muted text-sm border border-border border-dashed rounded-xl bg-gray-50/50">
                            No posts found.
                        </div>
                    )}
                    {displayedPosts.map(p => (
                        <div key={p.id} className="bg-white rounded-2xl border border-border shadow-sm p-5 flex gap-5">
                            <div className="flex flex-col items-center gap-2 text-text-secondary w-8 flex-shrink-0 pt-1">
                                <button onClick={() => handlePostVote(p.id, 1)} className={`p-1 hover:bg-primary-50 rounded transition-colors ${likedPosts.has(p.id) ? 'text-primary bg-primary-50' : 'hover:text-primary'}`}><ArrowUp className="w-5 h-5" /></button>
                                <span className={`text-sm font-bold ${likedPosts.has(p.id) ? 'text-primary' : 'text-text-primary'}`}>{p.upvotes}</span>
                                <button className="p-1 hover:text-danger hover:bg-red-50 rounded"><ArrowDown className="w-5 h-5" /></button>
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex gap-3 items-center">
                                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg">{p.author.charAt(0)}</div>
                                        <div>
                                            <p className="text-sm font-bold text-text-primary flex items-center gap-2">
                                                {p.author} <span className="text-[10px] text-text-muted font-medium">• {p.role} • {p.time}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${p.tag === 'Events' ? 'bg-blue-50 text-blue-600' : p.tag === 'Placement' ? 'bg-green-50 text-green-600' : 'bg-purple-50 text-purple-600'}`}>{p.tag}</span>
                                        <button onClick={() => handleDeletePost(p.id)} className="p-1 hover:bg-red-50 hover:text-danger rounded-lg transition-colors text-text-muted"><MoreHorizontal className="w-4 h-4" /></button>
                                    </div>
                                </div>

                                <h3 className="text-base font-bold text-text-primary mb-2 line-clamp-2">{p.title}</h3>
                                <p className="text-sm text-text-secondary leading-relaxed mb-4">{p.body}</p>

                                {p.hasImage && (
                                    <div className="w-full h-48 bg-gray-100 rounded-xl mb-4 border border-border-light flex items-center justify-center relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200" />
                                        <div className="w-32 h-32 bg-white shadow-sm border border-gray-100 relative z-10 rounded-sm"></div>
                                    </div>
                                )}

                                <div className="flex items-center gap-6 text-text-secondary text-xs font-semibold mt-4">
                                    <button onClick={() => { setSelectedPostComments(p); setActiveModal('comments'); }} className="flex items-center gap-2 hover:text-primary transition-colors">
                                        <MessageSquare className="w-4 h-4" /> {p.comments} Comments
                                    </button>
                                    <button onClick={() => handleShare(p.title, p.body)} className="flex items-center gap-2 hover:text-primary transition-colors">
                                        <Share2 className="w-4 h-4" /> Share
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {displayedPosts.length > 0 && (
                    <button className="w-full py-4 text-sm font-semibold text-primary border border-border bg-white rounded-xl shadow-sm hover:bg-surface-hover mt-4">
                        You've reached the end of the feed
                    </button>
                )}
            </div>

            {/* Right Column: Spotlight & Study Groups */}
            <div className="w-full lg:w-80 flex-shrink-0 space-y-6 hidden lg:block">

                {/* Alumni Spotlight */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xs font-bold text-text-secondary tracking-widest uppercase flex items-center gap-2">
                            <User className="w-4 h-4" /> Alumni Spotlight
                        </h2>
                        <button onClick={() => setActiveModal('alumni')} className="text-[10px] font-bold text-primary hover:underline">View All</button>
                    </div>

                    <div className="bg-white rounded-2xl border border-border shadow-sm p-6 relative overflow-hidden">
                        <span className="absolute top-4 right-4 bg-primary-50 text-primary text-[10px] font-bold px-2 py-0.5 rounded">Featured</span>
                        <div className="flex gap-3 items-center mb-5">
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-xl">👨🏽‍💼</div>
                            <div>
                                <p className="text-sm font-bold text-text-primary">Rohit Sharma</p>
                                <p className="text-xs text-text-secondary">Software Engineer @ Google</p>
                                <p className="text-[10px] text-text-muted mt-0.5">Class of 2021 • Computer Science</p>
                            </div>
                        </div>
                        <p className="text-xs text-text-secondary italic mb-5 leading-relaxed">
                            "Navigating placements can be tough. I'm hosting a session on cracking technical rounds this Saturday!"
                        </p>
                        <div className="flex gap-2">
                            <button onClick={() => setActiveModal('book_alumni')} className="flex-1 bg-primary text-white text-xs font-bold py-2.5 rounded-lg hover:bg-primary-dark transition-colors">Book 1:1 Chat</button>
                            <button onClick={() => setActiveModal('profile')} className="flex-1 bg-white border border-border text-text-primary text-xs font-bold py-2.5 rounded-lg hover:bg-surface-hover transition-colors">View Profile</button>
                        </div>
                    </div>
                </div>

                {/* Study Groups */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xs font-bold text-text-secondary tracking-widest uppercase flex items-center gap-2">
                            <BookOpen className="w-4 h-4" /> Study Groups
                        </h2>
                        <button onClick={() => setActiveModal('find_groups')} className="text-[10px] font-bold text-primary hover:underline">Find More</button>
                    </div>

                    <div className="space-y-3">
                        <div className="bg-white rounded-2xl border border-border shadow-sm p-5 relative">
                            <span className="absolute top-4 right-4 text-[9px] font-bold tracking-widest text-text-primary flex items-center gap-1.5 uppercase">
                                <span className="w-2 h-2 rounded-full bg-success"></span> Active Now
                            </span>
                            <div className="w-10 h-10 bg-blue-50 text-primary rounded-xl flex items-center justify-center mb-3">
                                <BookOpen className="w-5 h-5" />
                            </div>
                            <h3 className="text-sm font-bold text-text-primary">Calculus III Mastery</h3>
                            <p className="text-[10px] text-text-muted mt-0.5 mb-4">Mathematics</p>

                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-1 text-xs text-text-secondary font-semibold">
                                    <User className="w-3.5 h-3.5" /> 8/10
                                </div>
                                <button onClick={() => setActiveModal('join_group')} className="text-xs font-bold px-4 py-1.5 bg-gray-50 border border-border rounded-lg hover:bg-gray-100 transition-colors">Join</button>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-border shadow-sm p-5 opacity-50 blur-[1px]">
                            <div className="w-10 h-10 bg-blue-50 text-primary rounded-xl flex items-center justify-center mb-3">
                                <BookOpen className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Modals */}
            <Modal isOpen={activeModal === 'add_post'} onClose={() => setActiveModal(null)} title="Create New Post">
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-bold text-text-primary block mb-1">Post Title</label>
                        <input type="text" value={draftPost.title} onChange={e => setDraftPost({ ...draftPost, title: e.target.value })} placeholder="Give it a catchy title..." className="w-full border border-border rounded-xl px-4 py-3 bg-gray-50 text-sm focus:outline-none focus:border-primary" />
                    </div>
                    <div>
                        <label className="text-sm font-bold text-text-primary block mb-1">Category</label>
                        <select value={draftPost.category} onChange={e => setDraftPost({ ...draftPost, category: e.target.value })} className="w-full border border-border rounded-xl px-4 py-3 bg-gray-50 text-sm focus:outline-none focus:border-primary appearance-none">
                            <option value="Events">Events</option>
                            <option value="Campus News">Campus News</option>
                            <option value="Placement">Placement</option>
                            <option value="Q&A">Q&A</option>
                            <option value="Clubs">Clubs</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-bold text-text-primary block mb-1">Body Text</label>
                        <textarea value={draftPost.body} onChange={e => setDraftPost({ ...draftPost, body: e.target.value })} placeholder="What do you want to share with the community?" rows={5} className="w-full border border-border rounded-xl px-4 py-3 bg-gray-50 text-sm focus:outline-none focus:border-primary resize-none"></textarea>
                    </div>
                    <button onClick={handleAddPostSubmit} disabled={!draftPost.title || !draftPost.body} className="w-full mt-2 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-colors disabled:opacity-50">Publish Post</button>
                </div>
            </Modal>

            <Modal isOpen={activeModal === 'comments'} onClose={() => { setActiveModal(null); setSelectedPostComments(null) }} title="Discussion">
                {selectedPostComments && (
                    <div className="space-y-4">
                        <div className="pb-4 border-b border-border">
                            <h3 className="text-lg font-bold text-text-primary mb-2 line-clamp-2">{selectedPostComments.title}</h3>
                            <p className="text-sm text-text-secondary leading-relaxed">{selectedPostComments.body}</p>
                        </div>
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">A</div>
                                <div className="bg-gray-50 p-3 rounded-xl border border-border-light text-sm flex-1">
                                    <p className="font-bold text-text-primary mb-1">Aisha Khan <span className="font-normal text-text-muted text-xs ms-1">2h ago</span></p>
                                    <p className="text-text-secondary">This is amazing! I'll be there for sure. Do we need to carry our student IDs?</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">M</div>
                                <div className="bg-gray-50 p-3 rounded-xl border border-border-light text-sm flex-1">
                                    <p className="font-bold text-text-primary mb-1">Mehul Verma <span className="font-normal text-text-muted text-xs ms-1">1h ago</span></p>
                                    <p className="text-text-secondary">Thanks for the update. Can you share the exact timing?</p>
                                </div>
                            </div>
                        </div>
                        <div className="pt-2">
                            <div className="relative">
                                <input type="text" placeholder="Write a comment..." className="w-full border border-border rounded-xl pl-4 pr-12 py-3 bg-white text-sm focus:outline-none focus:border-primary shadow-sm" />
                                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-primary p-1 hover:bg-primary-50 rounded-lg"><ArrowUp className="w-5 h-5 rotate-90" /></button>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>

            <Modal isOpen={activeModal === 'book_alumni'} onClose={() => setActiveModal(null)} title="Schedule Session">
                <div className="space-y-4 text-center py-4">
                    <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center text-primary mx-auto mb-2"><Calendar className="w-8 h-8" /></div>
                    <h3 className="text-lg font-bold">1:1 with Rohit Sharma</h3>
                    <p className="text-sm text-text-secondary">Pick a slot to discuss placements, resume reviews, or general career advice.</p>

                    <div className="grid grid-cols-2 gap-3 mt-4 text-sm font-semibold text-text-primary">
                        <button onClick={() => { setActiveModal(null); window.alert("Slot confirmed! Google Meet link has been sent to your email."); }} className="border border-border p-3 rounded-xl hover:border-primary hover:bg-primary-50 transition-colors">Sat, 10:00 AM</button>
                        <button onClick={() => { setActiveModal(null); window.alert("Slot confirmed! Google Meet link has been sent to your email."); }} className="border border-border p-3 rounded-xl hover:border-primary hover:bg-primary-50 transition-colors">Sat, 11:30 AM</button>
                        <button onClick={() => { setActiveModal(null); window.alert("Slot confirmed! Google Meet link has been sent to your email."); }} className="border border-border p-3 rounded-xl hover:border-primary hover:bg-primary-50 transition-colors">Sun, 2:00 PM</button>
                        <button onClick={() => { setActiveModal(null); window.alert("Slot confirmed! Google Meet link has been sent to your email."); }} className="border border-border p-3 rounded-xl hover:border-primary hover:bg-primary-50 transition-colors">Sun, 4:15 PM</button>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={activeModal === 'join_group'} onClose={() => setActiveModal(null)} title="Join Study Group">
                <div className="text-center py-4">
                    <div className="w-16 h-16 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-4 border border-success/20"><CheckCircle2 className="w-8 h-8" /></div>
                    <h3 className="text-lg font-bold">Request Sent!</h3>
                    <p className="text-sm text-text-secondary mt-2">The admin of <strong>Calculus III Mastery</strong> will review your join request.</p>
                    <button onClick={() => setActiveModal(null)} className="mt-6 w-full py-3 bg-gray-100 font-bold rounded-xl hover:bg-gray-200 text-sm">Close</button>
                </div>
            </Modal>

            <Modal isOpen={activeModal === 'filters'} onClose={() => setActiveModal(null)} title="Filter Posts">
                <div className="space-y-4">
                    <div>
                        <p className="font-bold text-sm mb-2">Sort By</p>
                        <div className="flex gap-2">
                            <button className="bg-primary text-white text-sm px-4 py-2 rounded-lg font-bold shadow-sm">Hot</button>
                            <button className="border border-border text-text-primary bg-white text-sm px-4 py-2 rounded-lg font-bold hover:bg-gray-50">Newest</button>
                            <button className="border border-border text-text-primary bg-white text-sm px-4 py-2 rounded-lg font-bold hover:bg-gray-50">Top</button>
                        </div>
                    </div>
                    <div>
                        <p className="font-bold text-sm mb-2">My Involvement</p>
                        <label className="flex items-center gap-2 text-sm text-text-secondary mb-2">
                            <input type="checkbox" className="rounded text-primary" /> Posts I engaged with
                        </label>
                        <label className="flex items-center gap-2 text-sm text-text-secondary">
                            <input type="checkbox" className="rounded text-primary" /> Posts from my degree
                        </label>
                    </div>
                    <button onClick={() => setActiveModal(null)} className="w-full mt-4 py-3 bg-primary text-white rounded-xl font-bold shadow-md hover:bg-primary-dark transition-colors">Apply Filters</button>
                </div>
            </Modal>

            <Modal isOpen={activeModal === 'profile' || activeModal === 'alumni' || activeModal === 'find_groups'} onClose={() => setActiveModal(null)} title="Directory Search">
                <div className="py-10 text-center text-text-muted flex flex-col items-center">
                    <Search className="w-12 h-12 opacity-20 mb-3" />
                    <p className="font-bold">Opening Secure Directory</p>
                    <p className="text-sm mt-1">Connecting to university single-sign-on...</p>
                </div>
            </Modal>
        </div>
    );
}
