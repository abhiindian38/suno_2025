import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHeader } from '../components/layout/PageHeader';
import { Trash2, ShieldAlert, Cpu, Activity, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeedbackEntry {
    id: string;
    name: string;
    suggestion: string;
    timestamp: string;
    status: string;
}

export default function FeedbackDashboard() {
    const [logs, setLogs] = useState<FeedbackEntry[]>([]);

    useEffect(() => {
        const storedLogs = JSON.parse(localStorage.getItem('suno_feedback_logs') || '[]');
        setLogs(storedLogs);
    }, []);

    const deleteLog = (id: string) => {
        const updatedLogs = logs.filter(log => log.id !== id);
        localStorage.setItem('suno_feedback_logs', JSON.stringify(updatedLogs));
        setLogs(updatedLogs);
    };

    const clearAll = () => {
        if (window.confirm("Are you sure you want to purge all intelligence reports? This action is irreversible.")) {
            localStorage.removeItem('suno_feedback_logs');
            setLogs([]);
        }
    };

    return (
        <div className="w-full min-h-screen pb-24 px-6 md:px-12">
            <div className="max-w-6xl mx-auto">
                <PageHeader
                    title={
                        <>
                            Intelligence <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Archive</span>
                        </>
                    }
                    subtitle="Monitor incoming frequencies and encrypted signal reports from the multiverse."
                    breadcrumbs={[
                        { label: 'Feedback', path: '/feedback' },
                        { label: 'Intelligence Control' }
                    ]}
                />

                <div className="mt-12 flex flex-col gap-8">
                    {/* Control Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="glass-panel p-6 rounded-2xl border border-white/5 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <Activity size={24} />
                            </div>
                            <div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Live Signals</div>
                                <div className="text-2xl font-black text-white">{logs.length}</div>
                            </div>
                        </div>
                        <div className="glass-panel p-6 rounded-2xl border border-white/5 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                                <Cpu size={24} />
                            </div>
                            <div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">System Status</div>
                                <div className="text-2xl font-black text-white uppercase tracking-tighter">Synchronized</div>
                            </div>
                        </div>
                        <button
                            onClick={clearAll}
                            disabled={logs.length === 0}
                            className="glass-panel p-6 rounded-2xl border border-white/5 flex items-center gap-4 group hover:border-red-500/30 transition-all disabled:opacity-50"
                        >
                            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 group-hover:bg-red-500/20 transition-colors">
                                <Trash2 size={24} />
                            </div>
                            <div className="text-left">
                                <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">System Action</div>
                                <div className="text-2xl font-black text-white group-hover:text-red-500 transition-colors">Purge Data</div>
                            </div>
                        </button>
                    </div>

                    {/* Logs Table-like View */}
                    <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-cinematic">
                        <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
                            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white/50 flex items-center gap-2">
                                <Clock size={16} className="text-primary" />
                                Sequence Feed
                            </h3>
                            <Link to="/feedback" className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-white transition-colors">
                                + Add Signal
                            </Link>
                        </div>

                        <div className="divide-y divide-white/5">
                            <AnimatePresence mode="popLayout">
                                {logs.length > 0 ? (
                                    logs.map((log, index) => (
                                        <motion.div
                                            key={log.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:items-center hover:bg-white/[0.02] transition-colors group"
                                        >
                                            <div className="flex-1 space-y-3">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center gap-2 text-slate-400">
                                                        <User size={14} className="text-primary/60" />
                                                        <span className="text-xs font-black uppercase tracking-widest">{log.name}</span>
                                                    </div>
                                                    <div className="text-[10px] font-bold text-slate-600 uppercase tracking-tighter">
                                                        {new Date(log.timestamp).toLocaleString()}
                                                    </div>
                                                    <div className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[8px] font-black text-primary uppercase tracking-widest">
                                                        {log.status}
                                                    </div>
                                                </div>
                                                <p className="text-white/80 text-sm leading-relaxed font-medium italic">
                                                    "{log.suggestion}"
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => deleteLog(log.id)}
                                                className="p-3 rounded-xl bg-white/5 text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-all opacity-0 group-hover:opacity-100"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </motion.div>
                                    ))
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="py-32 flex flex-col items-center justify-center text-center px-6"
                                    >
                                        <ShieldAlert size={48} className="text-slate-700 mb-6" />
                                        <h4 className="text-xl font-black text-white/20 uppercase tracking-[0.2em]">Archive Empty</h4>
                                        <p className="text-slate-600 text-sm mt-2 max-w-xs">
                                            No signals detected in this sector. Awaiting incoming frequencies.
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
