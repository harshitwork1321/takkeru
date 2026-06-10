import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  CalendarDays,
  Phone,
  MapPin,
  Sparkles,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

const SOURCES = [
  'Instagram',
  'Google',
  'Walk-in',
  'Pamphlet',
  'Friend Recommended',
  'Other',
];

const FAN_CLUBS = [
  'Naruto Ninja',
  'Goku Team',
  'Jung Woo Hunters',
  'Luffy Pirates',
];

const TASKS = [
  'Review on Google & Instagram Follow',
  'Shared 6 Gift Cards in your team',
  '6 Visits Completed',
];

const API_URL = 'https://script.google.com/macros/s/AKfycbwSB_Xb7MpJ5Vm73QXU9mZcZK557OeMbcnW4s1EnN-bMPMTNZOlWEzCBEX7Zs30pfZhDg/exec';

export default function MembershipForm() {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    phone: '',
    location: '',
    source: '',
    sourceOther: '',
    fanClubs: [],
    tasks: TASKS.reduce((acc, task) => ({ ...acc, [task]: false }), {}),
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleCheckbox = (field, value) => {
    setFormData((prev) => {
      const current = prev[field];
      const next = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...prev, [field]: next };
    });
  };

  const handleTaskToggle = (task) => {
    setFormData((prev) => ({
      ...prev,
      tasks: { ...prev.tasks, [task]: !prev.tasks[task] },
    }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!formData.name.trim()) nextErrors.name = 'Name is required';
    if (!formData.dob) nextErrors.dob = 'Date of birth is required';
    if (!formData.phone.trim()) {
      nextErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      nextErrors.phone = 'Enter a valid 10-digit phone number';
    }
    if (!formData.location.trim()) nextErrors.location = 'Location is required';
    if (!formData.source) nextErrors.source = 'Please choose how you heard about us';
    if (formData.source === 'Other' && !formData.sourceOther.trim()) {
      nextErrors.sourceOther = 'Please specify the source';
    }
    if (formData.fanClubs.length === 0) nextErrors.fanClubs = 'Choose at least one fan club';
    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      setStatus('');
      return;
    }

    setSubmitting(true);
    setStatus('');

    const payload = {
      name: formData.name,
      dob: formData.dob,
      phone: `+91 ${formData.phone.replace(/\D/g, '')}`,
      location: formData.location,
      source: formData.source === 'Other' ? formData.sourceOther : formData.source,
      fanClubs: formData.fanClubs.join(', '),
      tasks: Object.entries(formData.tasks)
        .filter(([_, checked]) => checked)
        .map(([task]) => task)
        .join('; '),
      submittedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        mode: 'no-cors',
      });

      setStatus('Your membership request has been sent! We will follow up soon.');
      setFormData({
        name: '',
        dob: '',
        phone: '',
        location: '',
        source: '',
        sourceOther: '',
        fanClubs: [],
        tasks: TASKS.reduce((acc, task) => ({ ...acc, [task]: false }), {}),
      });
      setErrors({});
    } catch (error) {
      setStatus('Unable to submit at the moment. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="membership-form" className="relative py-24 md:py-32 bg-primary overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,122,61,0.18),transparent_18%),radial-gradient(circle_at_bottom_right,_rgba(127,231,255,0.08),transparent_22%)] pointer-events-none" />
      <div className="absolute inset-x-0 top-12 hidden md:block text-[12rem] font-jp text-white/5 leading-none select-none pointer-events-none">
        参加
      </div>

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.4)] overflow-hidden"
        >
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] p-8 md:p-12">
            <div className="space-y-10">
              <div className="max-w-2xl">
                <span className="text-accent font-jp tracking-[0.4em] block mb-4">メンバーシップ</span>
                <h2 className="text-4xl md:text-6xl font-bebas tracking-tight">TAKKERU CAFÉ MEMBERSHIP FORM</h2>
                <p className="mt-6 text-subtle/70 text-lg font-inter leading-relaxed">
                  Join the fan club and register your membership details. Fill the form below to unlock exclusive campaigns, club perks, and event access.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="space-y-6">
                  <label className="block">
                    <span className="text-sm uppercase tracking-[0.3em] text-subtle/50 flex items-center gap-2">
                      <User className="w-4 h-4" /> Name
                    </span>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(event) => handleChange('name', event.target.value)}
                      placeholder="Enter your full name"
                      className="mt-3 w-full rounded-[2rem] border border-white/10 bg-black/20 px-5 py-4 text-white outline-none transition focus:border-accent"
                    />
                    {errors.name && <p className="mt-2 text-sm text-rose-400">{errors.name}</p>}
                  </label>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <label className="block">
                      <span className="text-sm uppercase tracking-[0.3em] text-subtle/50 flex items-center gap-2">
                        <CalendarDays className="w-4 h-4" /> DOB
                      </span>
                      <input
                        type="date"
                        value={formData.dob}
                        onChange={(event) => handleChange('dob', event.target.value)}
                        className="mt-3 w-full rounded-[2rem] border border-white/10 bg-black/20 px-4 py-4 text-white outline-none transition focus:border-accent"
                      />
                      {errors.dob && <p className="mt-2 text-sm text-rose-400">{errors.dob}</p>}
                    </label>

                    <label className="block md:col-span-2">
                      <span className="text-sm uppercase tracking-[0.3em] text-subtle/50 flex items-center gap-2">
                        <Phone className="w-4 h-4" /> Contact Number
                      </span>
                      <div className="mt-3 flex items-center gap-3 rounded-[2rem] border border-white/10 bg-black/20 px-4 py-4">
                        <span className="text-subtle/50">+91</span>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(event) => handleChange('phone', event.target.value)}
                          placeholder="9876543210"
                          className="w-full bg-transparent text-white outline-none placeholder:text-subtle/50"
                        />
                      </div>
                      {errors.phone && <p className="mt-2 text-sm text-rose-400">{errors.phone}</p>}
                    </label>
                  </div>

                  <label className="block">
                    <span className="text-sm uppercase tracking-[0.3em] text-subtle/50 flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> Location
                    </span>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(event) => handleChange('location', event.target.value)}
                      placeholder="Your city or neighbourhood"
                      className="mt-3 w-full rounded-[2rem] border border-white/10 bg-black/20 px-5 py-4 text-white outline-none transition focus:border-accent"
                    />
                    {errors.location && <p className="mt-2 text-sm text-rose-400">{errors.location}</p>}
                  </label>

                  <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
                    <h3 className="text-lg font-semibold mb-4">How did you hear about us?</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {SOURCES.map((source) => (
                        <label key={source} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 cursor-pointer transition hover:border-accent">
                          <input
                            type="radio"
                            name="source"
                            value={source}
                            checked={formData.source === source}
                            onChange={(event) => handleChange('source', event.target.value)}
                            className="h-4 w-4 accent-accent"
                          />
                          <span>{source}</span>
                        </label>
                      ))}
                    </div>
                    {errors.source && <p className="mt-3 text-sm text-rose-400">{errors.source}</p>}
                    {formData.source === 'Other' && (
                      <input
                        type="text"
                        value={formData.sourceOther}
                        onChange={(event) => handleChange('sourceOther', event.target.value)}
                        placeholder="Tell us how you found us"
                        className="mt-4 w-full rounded-[2rem] border border-white/10 bg-black/20 px-5 py-4 text-white outline-none transition focus:border-accent"
                      />
                    )}
                    {errors.sourceOther && <p className="mt-2 text-sm text-rose-400">{errors.sourceOther}</p>}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="text-lg font-semibold">Join a Fan Club Group</h3>
                      <Sparkles className="w-5 h-5 text-accent" />
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      {FAN_CLUBS.map((club) => (
                        <label key={club} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/20 px-4 py-4 cursor-pointer transition hover:border-accent">
                          <input
                            type="checkbox"
                            checked={formData.fanClubs.includes(club)}
                            onChange={() => handleCheckbox('fanClubs', club)}
                            className="h-4 w-4 accent-accent"
                          />
                          <span>{club}</span>
                        </label>
                      ))}
                    </div>
                    {errors.fanClubs && <p className="mt-3 text-sm text-rose-400">{errors.fanClubs}</p>}
                  </div>

                  <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="text-lg font-semibold">Your Level Up Task</h3>
                      <CheckCircle2 className="w-5 h-5 text-accent" />
                    </div>
                    <div className="space-y-4">
                      {TASKS.map((task) => (
                        <label key={task} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/20 px-4 py-4 cursor-pointer transition hover:border-accent">
                          <input
                            type="checkbox"
                            checked={formData.tasks[task]}
                            onChange={() => handleTaskToggle(task)}
                            className="h-4 w-4 accent-accent"
                          />
                          <span>{task}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center gap-3 rounded-[2rem] bg-accent px-8 py-4 text-lg font-semibold uppercase tracking-[0.2em] transition hover:bg-white hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? 'Submitting...' : 'Submit Membership'}
                    <ExternalLink className="w-5 h-5" />
                  </button>

                  {status && (
                    <p className="text-center text-sm text-white/80">{status}</p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
