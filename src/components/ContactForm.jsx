import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckCircle2 } from 'lucide-react';

const INVESTMENT_RANGES = [
  'Under ₹5 Lakh',
  '₹5-10 Lakh',
  '₹10-20 Lakh',
  'Above ₹20 Lakh',
];

const INTERESTED_MODELS = [
  'Micro Cart',
  'Cart Café',
  'Full Concept',
  'Not Sure Yet',
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    preferredLocation: '',
    investmentRange: '',
    interestedModel: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!formData.name.trim()) nextErrors.name = 'Name is required';
    if (!formData.phone.trim()) nextErrors.phone = 'Phone is required';
    if (!formData.email.trim()) {
      nextErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = 'Enter a valid email';
    }
    if (!formData.city.trim()) nextErrors.city = 'City is required';
    if (!formData.preferredLocation.trim()) nextErrors.preferredLocation = 'Preferred location is required';
    if (!formData.investmentRange) nextErrors.investmentRange = 'Select an investment range';
    if (!formData.interestedModel) nextErrors.interestedModel = 'Select a model';
    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);

    try {
      await fetch(
        'https://script.google.com/macros/s/AKfycbwSB_Xb7MpJ5Vm73QXU9mZcZK557OeMbcnW4s1EnN-bMPMTNZOlWEzCBEX7Zs30pfZhDg/exec',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            phone: `+91 ${formData.phone}`,
            submittedAt: new Date().toISOString(),
          }),
          mode: 'no-cors',
        }
      );

      setSubmitted(true);
    } catch {
      setErrors({ submit: 'Unable to submit. Please try again later.' });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section id="contact" className="relative py-24 md:py-32 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,122,61,0.18),transparent_18%),radial-gradient(circle_at_bottom_right,_rgba(127,231,255,0.08),transparent_22%)] pointer-events-none" />
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-accent/20 mb-8"
          >
            <CheckCircle2 className="w-12 h-12 text-accent" />
          </motion.div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl font-bebas tracking-tight mb-4"
          >
            WE'LL BE IN TOUCH
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-subtle/60 font-inter text-lg"
          >
            Thank you for your interest. Our team will reach out to you soon.
          </motion.p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-primary overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,122,61,0.18),transparent_18%),radial-gradient(circle_at_bottom_right,_rgba(127,231,255,0.08),transparent_22%)] pointer-events-none" />
      <div className="absolute inset-x-0 top-12 hidden md:block text-[12rem] font-jp text-white/5 leading-none select-none pointer-events-none">
        お問い合わせ
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent font-jp tracking-[0.4em] block mb-4">
              お問い合わせ
            </span>
            <h2 className="text-5xl md:text-8xl font-bebas tracking-tight mb-6">
              LET'S TALK
            </h2>
            <p className="text-subtle/60 font-inter text-lg">
              Tell us about your vision. We'll help you figure out the next step.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto glass border border-white/10 p-8 md:p-12 space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="block">
                <span className="font-bebas text-sm tracking-widest text-accent mb-2 block">
                  Full Name
                </span>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:border-accent focus:outline-none transition-colors"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-rose-400">{errors.name}</p>
                )}
              </label>

              <label className="block">
                <span className="font-bebas text-sm tracking-widest text-accent mb-2 block">
                  Phone
                </span>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:border-accent focus:outline-none transition-colors"
                />
                {errors.phone && (
                  <p className="mt-2 text-sm text-rose-400">{errors.phone}</p>
                )}
              </label>

              <label className="block">
                <span className="font-bebas text-sm tracking-widest text-accent mb-2 block">
                  Email
                </span>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:border-accent focus:outline-none transition-colors"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-rose-400">{errors.email}</p>
                )}
              </label>

              <label className="block">
                <span className="font-bebas text-sm tracking-widest text-accent mb-2 block">
                  City
                </span>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  placeholder="Enter your city"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:border-accent focus:outline-none transition-colors"
                />
                {errors.city && (
                  <p className="mt-2 text-sm text-rose-400">{errors.city}</p>
                )}
              </label>
            </div>

            <label className="block">
              <span className="font-bebas text-sm tracking-widest text-accent mb-2 block">
                Preferred Location
              </span>
              <input
                type="text"
                value={formData.preferredLocation}
                onChange={(e) => handleChange('preferredLocation', e.target.value)}
                placeholder="Where would you like to set up?"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:border-accent focus:outline-none transition-colors"
              />
              {errors.preferredLocation && (
                <p className="mt-2 text-sm text-rose-400">{errors.preferredLocation}</p>
              )}
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="block">
                <span className="font-bebas text-sm tracking-widest text-accent mb-2 block">
                  Investment Range
                </span>
                <select
                  value={formData.investmentRange}
                  onChange={(e) => handleChange('investmentRange', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-accent focus:outline-none transition-colors appearance-none"
                >
                  <option value="" className="bg-primary">
                    Select range
                  </option>
                  {INVESTMENT_RANGES.map((range) => (
                    <option key={range} value={range} className="bg-primary">
                      {range}
                    </option>
                  ))}
                </select>
                {errors.investmentRange && (
                  <p className="mt-2 text-sm text-rose-400">{errors.investmentRange}</p>
                )}
              </label>

              <label className="block">
                <span className="font-bebas text-sm tracking-widest text-accent mb-2 block">
                  Interested Model
                </span>
                <select
                  value={formData.interestedModel}
                  onChange={(e) => handleChange('interestedModel', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-accent focus:outline-none transition-colors appearance-none"
                >
                  <option value="" className="bg-primary">
                    Select model
                  </option>
                  {INTERESTED_MODELS.map((model) => (
                    <option key={model} value={model} className="bg-primary">
                      {model}
                    </option>
                  ))}
                </select>
                {errors.interestedModel && (
                  <p className="mt-2 text-sm text-rose-400">{errors.interestedModel}</p>
                )}
              </label>
            </div>

            <label className="block">
              <span className="font-bebas text-sm tracking-widest text-accent mb-2 block">
                Message (Optional)
              </span>
              <textarea
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                placeholder="Tell us about your vision or any questions you have..."
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:border-accent focus:outline-none transition-colors resize-none"
              />
            </label>

            {errors.submit && (
              <p className="text-center text-sm text-rose-400">{errors.submit}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-accent text-primary font-bebas text-xl tracking-widest py-5 rounded-xl hover:bg-white transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? 'SUBMITTING...' : 'SUBMIT ENQUIRY'}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
