import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHeader } from '../components/layout/PageHeader';
import { Send, CheckCircle2, MessageSquare, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Feedback() {
    const [name, setName] = useState('');
    const [suggestion, setSuggestion] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!suggestion.trim()) return;

        setIsSubmitting(true);

        // Prepare persistent log
        const feedbackLog = {
            id: crypto.randomUUID(),
            name: name.trim() || 'Anonymous Explorer',
            suggestion: suggestion.trim(),
            timestamp: new Date().toISOString(),
            status: 'transmitted'
        };

        // Save to localStorage
        const existingLogs = JSON.parse(localStorage.getItem('suno_feedback_logs') || '[]');
        localStorage.setItem('suno_feedback_logs', JSON.stringify([feedbackLog, ...existingLogs]));

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);
        setName('');
        setSuggestion('');
    };

    return (
        <div className="w-full min-h-screen pb-24 px-6 md:px-12">
            <div className="max-w-4xl mx-auto">
                <PageHeader
                    title={
                        <>
                            Echo Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">Frequency</span>
                        </>
                    }
                    subtitle="Share your thoughts or suggestions to help us refine the cinematic multiverse."
                    breadcrumbs={[{ label: 'Feedback' }]}
                />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-12"
                >
                    <AnimatePresence mode="wait">
                        {!isSubmitted ? (
                            <motion.form
                                key="feedback-form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                onSubmit={handleSubmit}
                                className="glass-panel rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden group shadow-cinematic"
                            >
                                {/* Background Decorative Elements */}
                                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-focus-within:bg-primary/20 transition-colors duration-500" />
                                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl group-focus-within:bg-accent/20 transition-colors duration-500" />

                                <div className="relative space-y-8">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                                            Identifier (Optional)
                                        </label>
                                        <input
                                            id="name"
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Enter your name or alias..."
                                            className={cn(
                                                "w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6",
                                                "text-white placeholder:text-slate-600 outline-none transition-all",
                                                "focus:border-primary/50 focus:bg-primary/5 focus:ring-1 focus:ring-primary/20"
                                            )}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="feedback" className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                                            Your Signal <span className="text-primary">*</span>
                                        </label>
                                        <textarea
                                            id="feedback"
                                            required
                                            rows={5}
                                            value={suggestion}
                                            onChange={(e) => setSuggestion(e.target.value)}
                                            placeholder="What's on your mind? Found a bug? Have an idea?..."
                                            className={cn(
                                                "w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 resize-none",
                                                "text-white placeholder:text-slate-600 outline-none transition-all",
                                                "focus:border-primary/50 focus:bg-primary/5 focus:ring-1 focus:ring-primary/20"
                                            )}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting || !suggestion.trim()}
                                        className={cn(
                                            "w-full group relative overflow-hidden rounded-2xl py-4 transition-all duration-500",
                                            "bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30",
                                            "hover:border-primary hover:shadow-[0_0_30px_rgba(0,240,255,0.3)]",
                                            "disabled:opacity-50 disabled:cursor-not-allowed"
                                        )}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-10 transition-opacity" />
                                        <span className="relative flex items-center justify-center gap-3 text-sm font-black uppercase tracking-[0.3em] text-white">
                                            {isSubmitting ? (
                                                <>
                                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    Transmitting...
                                                </>
                                            ) : (
                                                <>
                                                    <Send size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                                    Broadcast Signal
                                                </>
                                            )}
                                        </span>
                                    </button>
                                </div>
                            </motion.form>
                        ) : (
                            <motion.div
                                key="success-state"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="glass-panel rounded-3xl p-12 md:p-24 text-center border border-primary/20 flex flex-col items-center justify-center min-h-[400px] shadow-[0_0_50px_rgba(0,240,255,0.1)]"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
                                    className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-8 relative"
                                >
                                    <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                                    <CheckCircle2 className="w-12 h-12 text-primary" />
                                </motion.div>

                                <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-widest">Signal Received</h3>
                                <p className="text-white/60 text-lg max-w-md mb-12">
                                    Your frequency has been synchronized with the multiverse. Thank you for helping us refine the experience.
                                </p>

                                <button
                                    onClick={() => setIsSubmitted(false)}
                                    className="px-8 py-3 rounded-xl border border-white/10 hover:border-primary/50 text-slate-400 hover:text-white transition-all uppercase text-xs font-black tracking-widest leading-none"
                                >
                                    Send Another Broadcast
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                        {
                            icon: MessageSquare,
                            title: "Human Touch",
                            desc: "We review every signal broadcasted to our database."
                        },
                        {
                            icon: Zap,
                            title: "Rapid Evolution",
                            desc: "Top frequencies are prioritized for daily system refinements."
                        }
                    ].map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + (i * 0.1) }}
                            className="p-8 rounded-2xl glass-panel border border-white/5"
                        >
                            <item.icon className="w-8 h-8 text-primary mb-4" />
                            <h4 className="text-white font-black uppercase tracking-wider mb-2">{item.title}</h4>
                            <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Secret Link to Dashboard */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-20 flex justify-center"
                >
                    <Link
                        to="/feedback/dashboard"
                        className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-700 hover:text-primary transition-all duration-500 flex items-center gap-3 group"
                    >
                        <span className="w-8 h-px bg-slate-800 group-hover:bg-primary/30 transition-colors" />
                        Intelligence Archives
                        <span className="w-8 h-px bg-slate-800 group-hover:bg-primary/30 transition-colors" />
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}

import { Link } from 'react-router-dom';
