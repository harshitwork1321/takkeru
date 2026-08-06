import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, CheckCircle2, User, Mail, Phone, Instagram, MessageSquare } from 'lucide-react';

const FIELDS = [
  { id: 'name',      label: 'Full Name',         icon: User,          type: 'text',  placeholder: 'Your full name' },
  { id: 'email',     label: 'Email',              icon: Mail,          type: 'email', placeholder: 'you@example.com' },
  { id: 'phone',     label: 'Phone Number',       icon: Phone,         type: 'tel',   placeholder: '+91 9XXXXXXXXX' },
  { id: 'instagram', label: 'Instagram Handle',   icon: Instagram,     type: 'text',  placeholder: '@yourhandle' },
];

export default function FormPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', instagram: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400)); // simulate async
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-primary text-secondary relative overflow-hidden">
      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Background glow blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Decorative JP text */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 font-jp text-white/[0.03] text-[14rem] leading-none pointer-events-none select-none hidden lg:block">
        参加
      </div>

      <div className="container mx-auto px-6 py-16 md:py-24 relative z-10">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate('/')}
          className="flex items-center gap-3 text-subtle/40 hover:text-accent transition-colors duration-300 mb-16 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="font-bebas tracking-[0.2em] text-lg uppercase">Back to Home</span>
        </motion.button>

        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-14 text-center"
          >
            <span className="text-accent font-jp tracking-[0.4em] block mb-4 text-sm">参加フォーム</span>
            <h1 className="text-6xl md:text-8xl mb-4">
              JOIN THE <span className="text-accent">CAMPAIGN</span>
            </h1>
            <p className="text-subtle/40 font-inter max-w-md mx-auto leading-relaxed">
              Fill in your details to participate in the next Takkeru Creative Content Campaign.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {submitted ? (
              /* ── Success State ── */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6 }}
                className="text-center py-20 px-8 glass rounded-3xl border border-white/10"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                >
                  <CheckCircle2 className="w-20 h-20 text-accent mx-auto mb-8" />
                </motion.div>
                <h2 className="text-5xl md:text-6xl mb-4">
                  YOU'RE <span className="text-accent">IN!</span>
                </h2>
                <p className="text-subtle/50 font-inter mb-10 max-w-sm mx-auto">
                  We've received your entry. Our team will reach out soon. Stay tuned on Instagram for announcements!
                </p>
                <button
                  onClick={() => navigate('/')}
                  className="inline-flex items-center gap-3 px-10 py-4 bg-accent text-primary font-bebas tracking-[0.2em] text-lg uppercase rounded-full hover:bg-accent/90 transition-colors duration-300"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Takkeru
                </button>
              </motion.div>
            ) : (
              /* ── Form ── */
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {FIELDS.map(({ id, label, icon: Icon, type, placeholder }, idx) => (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + idx * 0.07 }}
                  >
                    <label htmlFor={id} className="block text-subtle/50 text-xs uppercase tracking-[0.25em] mb-2 font-inter">
                      {label}
                    </label>
                    <div className="relative group">
                      <Icon className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-subtle/30 group-focus-within:text-accent transition-colors duration-300" />
                      <input
                        id={id}
                        type={type}
                        required
                        value={form[id]}
                        onChange={handleChange}
                        placeholder={placeholder}
                        className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-14 pr-5 py-4 text-white placeholder:text-subtle/20 font-inter text-sm focus:outline-none focus:border-accent/50 focus:bg-white/[0.06] transition-all duration-300"
                      />
                      <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-accent group-focus-within:w-full transition-all duration-500 rounded-full" />
                    </div>
                  </motion.div>
                ))}

                {/* Message textarea */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + FIELDS.length * 0.07 }}
                >
                  <label htmlFor="message" className="block text-subtle/50 text-xs uppercase tracking-[0.25em] mb-2 font-inter">
                    Why do you want to participate?
                  </label>
                  <div className="relative group">
                    <MessageSquare className="absolute left-5 top-5 w-4 h-4 text-subtle/30 group-focus-within:text-accent transition-colors duration-300" />
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about yourself and your content..."
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-14 pr-5 py-4 text-white placeholder:text-subtle/20 font-inter text-sm focus:outline-none focus:border-accent/50 focus:bg-white/[0.06] transition-all duration-300 resize-none"
                    />
                    <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-accent group-focus-within:w-full transition-all duration-500 rounded-full" />
                  </div>
                </motion.div>

                {/* Submit */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.55 }}
                  className="pt-2"
                >
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 py-5 bg-accent text-primary font-bebas tracking-[0.25em] text-xl uppercase rounded-xl hover:bg-accent/90 active:scale-[0.98] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center gap-3">
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Submit Entry
                      </>
                    )}
                  </button>
                </motion.div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
