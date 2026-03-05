'use client';

import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Plus, Download, Wallet, ArrowUpRight, Users, MoreHorizontal, Filter, ArrowDownLeft, CheckCircle2, Trash2 } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';

const areaData = [
    { day: 'Mon', amount: 400 },
    { day: 'Tue', amount: 1200 },
    { day: 'Wed', amount: 800 },
    { day: 'Thu', amount: 1600 },
    { day: 'Fri', amount: 900 },
    { day: 'Sat', amount: 2400 },
    { day: 'Sun', amount: 1000 },
];

export default function FinancePage() {
    const [mounted, setMounted] = useState(false);

    // States for interaction
    const [transactions, setTransactions] = useState([
        { id: 1, title: 'Mess Bill - Nov', date: 'Nov 20, 2024', tag: 'Food', amount: '-₹4,500', isDebit: true, status: 'completed' },
        { id: 2, title: 'Refund: Library Fine', date: 'Nov 19, 2024', tag: 'Refund', amount: '+₹150', isDebit: false, status: 'completed' },
        { id: 3, title: 'Zomato: Dinner', date: 'Nov 18, 2024', tag: 'Food', amount: '-₹320', isDebit: true, status: 'completed' },
        { id: 4, title: 'Amazon: Notebooks', date: 'Nov 17, 2024', tag: 'Stationary', amount: '-₹890', isDebit: true, status: 'pending' },
        { id: 5, title: 'Campus Bus Pass', date: 'Nov 15, 2024', tag: 'Transport', amount: '-₹1,200', isDebit: true, status: 'completed' },
    ]);
    const [filterCompleted, setFilterCompleted] = useState(false);

    // Modal states
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [paymentTarget, setPaymentTarget] = useState<{ name: string, amt: string, type: 'pay' | 'remind' } | null>(null);

    // Form states
    const [expenseTitle, setExpenseTitle] = useState('');
    const [expenseAmount, setExpenseAmount] = useState('');
    const [reportStatus, setReportStatus] = useState('idle'); // idle, generating, done
    const [splitAmt, setSplitAmt] = useState('');
    const [moreMarketplace, setMoreMarketplace] = useState(false);

    React.useEffect(() => { setMounted(true) }, []);

    const handleAddExpense = () => {
        if (!expenseTitle || !expenseAmount) return;
        setTransactions([{ id: Date.now(), title: expenseTitle, date: 'Just now', tag: 'Manual', amount: '-₹' + expenseAmount, isDebit: true, status: 'completed' }, ...transactions]);
        setActiveModal(null);
        setExpenseTitle('');
        setExpenseAmount('');
    };

    const handleDeleteTransaction = (id: number) => {
        setTransactions(transactions.filter(t => t.id !== id));
        alert('Transaction record permanently deleted.');
    };

    const handleReport = () => {
        setReportStatus('generating');
        setTimeout(() => setReportStatus('done'), 1500);
    }

    const toggleFilter = () => {
        setFilterCompleted(!filterCompleted);
    }

    const displayedTransactions = filterCompleted ? transactions.filter(t => t.status === 'completed') : transactions;

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-text-primary">Finance Tracker</h1>
                    <p className="text-sm text-text-secondary mt-1">Manage your campus expenses, group tabs, and marketplace deals.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={() => setActiveModal('add_expense')} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors">
                        <Plus className="w-4 h-4" />
                        Add Expense
                    </button>
                    <button onClick={() => { setActiveModal('report'); setReportStatus('idle'); }} className="flex items-center gap-2 px-5 py-2.5 bg-white border border-border rounded-xl text-sm font-medium hover:bg-surface-hover transition-colors">
                        <Download className="w-4 h-4" />
                        Report
                    </button>
                </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-primary-50 rounded-2xl p-6 border border-primary/20">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                        <Wallet className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-sm font-medium text-text-secondary">Campus Wallet Balance</p>
                    <p className="text-3xl font-bold text-text-primary mt-1">₹4,240.50</p>
                    <p className="text-xs text-text-muted mt-2">Updated 2 mins ago</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-border">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center border border-border">
                            <ArrowUpRight className="w-5 h-5 text-text-secondary" />
                        </div>
                        <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-gray-100 rounded-full border border-border">
                            <ArrowUpRight className="w-3 h-3" /> 12% from last month
                        </span>
                    </div>
                    <p className="text-sm font-medium text-text-secondary">Monthly Spent</p>
                    <p className="text-3xl font-bold text-text-primary mt-1">₹8,120.00</p>
                    <p className="text-xs text-text-muted mt-2">Budget: ₹10,000.00</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-border">
                    <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center border border-border mb-4">
                        <Users className="w-5 h-5 text-text-secondary" />
                    </div>
                    <p className="text-sm font-medium text-text-secondary">Pending Dues</p>
                    <p className="text-3xl font-bold text-text-primary mt-1">₹1,450.00</p>
                    <p className="text-xs text-text-muted mt-2">4 people owe you</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Spending Analysis */}
                    <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-lg font-bold text-text-primary">Spending Analysis</h2>
                                <p className="text-sm text-text-muted mt-1">Visualizing your daily spending trends for the week.</p>
                            </div>
                            <div className="bg-gray-100 p-1 rounded-xl flex">
                                <button className="px-4 py-1.5 bg-white shadow-sm rounded-lg text-sm font-semibold">Weekly</button>
                                <button className="px-4 py-1.5 text-text-secondary text-sm font-medium">Monthly</button>
                            </div>
                        </div>

                        <div className="h-[280px] min-w-0" style={{ minHeight: 0 }}>
                            {mounted && (
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={areaData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#4361ee" stopOpacity={0.2} />
                                                <stop offset="95%" stopColor="#4361ee" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} tickFormatter={(val) => `₹${val}`} />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                                            formatter={(val) => [`₹${val}`, 'Amount']}
                                        />
                                        <Area type="monotone" dataKey="amount" stroke="#4361ee" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                    </div>

                    {/* Marketplace */}
                    <div>
                        <div className="flex items-end justify-between mb-4">
                            <div>
                                <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
                                    <span className="text-primary text-xl">🛒</span> Campus Marketplace
                                </h2>
                                <p className="text-sm text-text-muted mt-0.5">Second-hand deals from verified students.</p>
                            </div>
                            <button onClick={() => setMoreMarketplace(!moreMarketplace)} className="text-sm font-semibold text-primary hover:underline">{moreMarketplace ? 'Show Less' : 'Browse All >'}</button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {[
                                { title: 'iPad Air 4th', price: '₹28,000', tag: 'Electronics', verified: true, seller: 'Arjun M.', cond: 'Excellent' },
                                { title: 'Concepts of Physics', price: '₹450', tag: 'Books', verified: true, seller: 'Priya S.', cond: 'Like New' },
                                { title: 'Ergonomic Chair', price: '₹3,200', tag: 'Furniture', verified: true, seller: 'Rahul K.', cond: 'Used - Good' },
                                ...(moreMarketplace ? [
                                    { title: 'Mini Fridge', price: '₹4,500', tag: 'Appliances', verified: true, seller: 'Sneha P.', cond: 'Good' },
                                    { title: 'Bicycle (Geared)', price: '₹2,800', tag: 'Vehicle', verified: false, seller: 'Aman J.', cond: 'Fair' },
                                    { title: 'Drawing Board', price: '₹300', tag: 'Stationary', verified: true, seller: 'Tanya B.', cond: 'Like New' }
                                ] : [])
                            ].map((item, i) => (
                                <div key={i} className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col">
                                    <div className="h-32 bg-gray-100 relative items-center justify-center flex">
                                        <span className="absolute top-2 left-2 bg-white text-xs font-bold px-2 py-1 rounded-md shadow-sm opacity-90">{item.tag}</span>
                                        <div className="w-16 h-20 bg-gray-300 rounded shadow-md border-4 border-gray-800"></div>
                                        <div className="absolute bottom-2 right-2 bg-white/80 backdrop-blur px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-sm">
                                            <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Verified
                                        </div>
                                    </div>
                                    <div className="p-4 flex-col flex justify-between flex-1">
                                        <div>
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-sm font-bold text-text-primary leading-tight">{item.title}</h3>
                                                <span className="text-primary font-bold">{item.price}</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center text-xs text-text-muted mt-2">
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center text-[8px]">👤</div>
                                                <span>{item.seller}</span>
                                            </div>
                                            <span>{item.cond}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Group Splits */}
                    <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-lg font-bold text-text-primary">Group Splits</h2>
                                <p className="text-sm text-text-muted mt-1">Track debts and shared expenses.</p>
                            </div>
                        </div>

                        <div className="space-y-5">
                            {[
                                { name: 'Siddharth V.', action: 'Shared Lunch at Cafe', amt: '+₹450', link: 'Remind', color: 'text-text-primary', up: true },
                                { name: 'Megha Roy', action: 'Shared Lunch at Cafe', amt: '-₹120', link: 'Pay Now', color: 'text-danger', up: false },
                                { name: 'Karthik R.', action: 'Shared Lunch at Cafe', amt: '+₹880', link: 'Remind', color: 'text-text-primary', up: true },
                                { name: 'Ananya D.', action: 'Shared Lunch at Cafe', amt: '-₹50', link: 'Pay Now', color: 'text-danger', up: false },
                            ].map((person, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-100 rounded-full border border-border flex items-center justify-center text-xl">
                                            {i % 2 === 0 ? '👨🏽' : '👩🏻'}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-text-primary">{person.name}</h4>
                                            <p className="text-xs text-text-muted">{person.action}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`text-sm font-bold ${person.color}`}>{person.amt}</p>
                                        <button onClick={() => {
                                            setPaymentTarget({ name: person.name, amt: person.amt.replace(/[+-]/g, ''), type: person.up ? 'remind' : 'pay' });
                                            setActiveModal('payment');
                                        }} className="text-xs text-primary font-semibold hover:underline mt-0.5">{person.link}</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button onClick={() => setActiveModal('split_expense')} className="w-full mt-6 py-3 bg-[#111827] text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
                            <Users className="w-4 h-4" />
                            Split New Expense
                        </button>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
                        <div className="flex items-center justify-between p-5 border-b border-border-light">
                            <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
                                <span className="text-primary-light">🧾</span> Recent Activity
                            </h2>
                            <button onClick={toggleFilter} className={`p-1.5 border rounded-lg transition-colors ${filterCompleted ? 'bg-primary text-white border-primary' : 'border-border bg-gray-50 text-text-secondary'}`} title="Filter Completed Only"><Filter className="w-4 h-4" /></button>
                        </div>

                        <div className="flex justify-between px-5 py-3 bg-gray-50 text-xs font-semibold text-text-muted border-b border-border-light">
                            <span>Entity</span>
                            <span>Amount</span>
                        </div>

                        <div className="divide-y divide-border-light">
                            {displayedTransactions.map((tx, i) => (
                                <div key={tx.id || i} className="p-5 flex items-center justify-between hover:bg-surface-hover">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${tx.isDebit ? 'bg-red-50 text-danger' : 'bg-green-50 text-success'}`}>
                                            {tx.isDebit ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownLeft className="w-4 h-4" />}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-text-primary">{tx.title}</p>
                                            <p className="text-xs text-text-muted mt-0.5">{tx.date} • {tx.tag}</p>
                                        </div>
                                    </div>
                                    <div className="text-right flex items-center gap-3">
                                        <div>
                                            <p className={`text-sm font-bold ${tx.isDebit ? 'text-text-primary' : 'text-success'}`}>{tx.amount}</p>
                                            <p className="text-[10px] text-text-muted capitalize mt-1">{tx.status}</p>
                                        </div>
                                        <button onClick={() => handleDeleteTransaction(tx.id)} className="p-1.5 text-text-muted hover:text-danger hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="w-full p-4 text-xs font-semibold text-text-secondary hover:text-primary transition-colors hover:bg-surface-hover border-t border-border-light text-center">
                            Viewing latest transactions
                        </button>
                    </div>
                </div>
            </div>

            {/* Modals for Interactivity */}
            <Modal isOpen={activeModal === 'add_expense'} onClose={() => setActiveModal(null)} title="Add Expense">
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-bold text-text-primary block mb-1">Expense Title</label>
                        <input type="text" value={expenseTitle} onChange={e => setExpenseTitle(e.target.value)} placeholder="e.g. Cafe Coffee Day" className="w-full border border-border rounded-xl px-4 py-3 bg-gray-50 text-sm focus:outline-none focus:border-primary" />
                    </div>
                    <div>
                        <label className="text-sm font-bold text-text-primary block mb-1">Amount (₹)</label>
                        <input type="number" value={expenseAmount} onChange={e => setExpenseAmount(e.target.value)} placeholder="e.g. 250" className="w-full border border-border rounded-xl px-4 py-3 bg-gray-50 text-sm focus:outline-none focus:border-primary" />
                    </div>
                    <button onClick={handleAddExpense} className="w-full mt-4 py-3 bg-primary text-white rounded-xl font-bold shadow-md hover:bg-primary-dark transition-colors">
                        Save Expense
                    </button>
                </div>
            </Modal>

            <Modal isOpen={activeModal === 'report'} onClose={() => setActiveModal(null)} title="Generate PDF Report">
                <div className="space-y-4 flex flex-col items-center justify-center text-center py-4">
                    <Download className="w-12 h-12 text-primary opacity-20 mb-2" />
                    <h3 className="text-lg font-bold text-text-primary">Monthly Expense Report</h3>
                    <p className="text-sm text-text-secondary">Generate a breakdown of all your spending and splits for current month.</p>

                    {reportStatus === 'idle' && <button onClick={handleReport} className="mt-4 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors">Generate Document</button>}

                    {reportStatus === 'generating' && (
                        <div className="w-full mt-4">
                            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                                <div className="bg-primary h-full w-1/2 animate-pulse rounded-full" />
                            </div>
                            <p className="text-xs text-text-muted mt-2">Compiling data fetching records...</p>
                        </div>
                    )}

                    {reportStatus === 'done' && (
                        <div className="w-full mt-4 bg-green-50 border border-success/30 rounded-xl p-4">
                            <p className="font-bold text-success text-sm flex items-center justify-center gap-2"><CheckCircle2 className="w-4 h-4" /> Ready to Download</p>
                            <button onClick={() => { setActiveModal(null); window.alert("File 'Finance_Report_Nov.pdf' has been saved to your downloads."); }} className="mt-3 w-full py-2.5 bg-success text-white font-bold rounded-lg text-sm transition-colors hover:bg-green-600">Download File</button>
                        </div>
                    )}
                </div>
            </Modal>

            <Modal isOpen={activeModal === 'split_expense'} onClose={() => setActiveModal(null)} title="Bill Splitter">
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-bold text-text-primary block mb-1">Total Bill Amount (₹)</label>
                        <input type="number" value={splitAmt} onChange={e => setSplitAmt(e.target.value)} placeholder="e.g. 1200" className="w-full border border-border rounded-xl px-4 py-3 bg-gray-50 text-sm focus:outline-none focus:border-primary" />
                    </div>
                    <div>
                        <label className="text-sm font-bold text-text-primary block mb-2">Select Friends to split with</label>
                        <div className="flex gap-2 text-sm">
                            {['Rohan', 'Akhil', 'Siddharth V.', 'Arjun'].map(f => (
                                <button key={f} className="px-3 py-1.5 border border-border rounded-lg bg-gray-50 hover:border-primary focus:border-primary focus:bg-primary-50 focus:text-primary transition-colors">{f}</button>
                            ))}
                        </div>
                    </div>
                    {splitAmt && parseInt(splitAmt) > 0 && (
                        <div className="p-4 bg-primary-50 border border-primary/20 rounded-xl mt-4">
                            <p className="text-sm font-semibold text-primary">Splitting equally 5 ways...</p>
                            <p className="text-xl font-bold mt-1 text-primary-dark">₹{(parseInt(splitAmt) / 5).toFixed(2)} / person</p>
                        </div>
                    )}
                    <button onClick={() => { setActiveModal(null); setSplitAmt(''); window.alert("Requests sent to selected friends for their share!"); }} className="w-full mt-4 py-3 bg-[#111827] text-white rounded-xl font-bold shadow-md hover:bg-gray-800 transition-colors">
                        Send Split Requests
                    </button>
                </div>
            </Modal>

            <Modal isOpen={activeModal === 'payment'} onClose={() => { setActiveModal(null); setPaymentTarget(null) }} title={paymentTarget?.type === 'pay' ? 'Secure Payment' : 'Send Reminder'}>
                {paymentTarget && (
                    <div className="space-y-4 text-center py-2">
                        <div className="w-16 h-16 bg-gray-100 border border-border mx-auto rounded-full flex items-center justify-center text-2xl mb-2">👤</div>
                        <h3 className="text-lg font-bold text-text-primary">{paymentTarget.name}</h3>

                        {paymentTarget.type === 'pay' ? (
                            <>
                                <p className="text-sm text-text-secondary">You are about to pay</p>
                                <p className="text-3xl font-bold text-danger my-2">{paymentTarget.amt}</p>
                                <button onClick={() => { setActiveModal(null); window.alert(`Payment of ${paymentTarget.amt} sent to ${paymentTarget.name} via Campus Wallet.`); }} className="w-full py-3 bg-primary text-white font-bold rounded-xl mt-4 text-sm hover:bg-primary-dark transition-colors">Pay from Campus Wallet</button>
                                <button onClick={() => { setActiveModal(null); }} className="w-full py-3 border border-border bg-white text-text-primary font-bold rounded-xl mt-2 text-sm hover:bg-gray-50 transition-colors">Pay via UPI App</button>
                            </>
                        ) : (
                            <>
                                <p className="text-sm text-text-secondary">Requesting a payment of</p>
                                <p className="text-3xl font-bold text-success my-2">{paymentTarget.amt}</p>
                                <button onClick={() => { setActiveModal(null); window.alert(`Push notification gently reminding ${paymentTarget.name} has been fired.`); }} className="w-full py-3 bg-[#111827] text-white font-bold rounded-xl mt-4 text-sm hover:bg-gray-800 transition-colors">Send Gentle Reminder</button>
                            </>
                        )}
                    </div>
                )}
            </Modal>
        </div>
    );
}
