import React, { useState } from 'react';
import { api } from '@/lib/api';
import { EntityKey, ENTITIES } from '@/data/constants';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface ContactFormProps {
  entity?: EntityKey;
  compact?: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ entity, compact = false }) => {
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.full_name.trim()) errs.full_name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email';
    if (!form.message.trim()) errs.message = 'Message is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    try {
      await api.createContact({
        entity: entity || 'general',
        ...form,
      });
      setStatus('success');
      setForm({ full_name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const entityConfig = entity ? ENTITIES[entity] : null;
  const accentColor = entityConfig?.color || '#1e40af';

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
        <p className="text-gray-600">Thank you for reaching out. We'll get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className={compact ? 'space-y-4' : 'grid md:grid-cols-2 gap-4'}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
          <input
            type="text"
            value={form.full_name}
            onChange={e => setForm({ ...form, full_name: e.target.value })}
            className={`w-full px-4 py-3 rounded-xl border ${errors.full_name ? 'border-red-400' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:border-transparent transition-all bg-gray-50 focus:bg-white`}
            style={{ '--tw-ring-color': accentColor } as any}
            placeholder="Your full name"
          />
          {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
          <input
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-400' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:border-transparent transition-all bg-gray-50 focus:bg-white`}
            placeholder="your@email.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="tel"
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
            placeholder="+237 6XX XXX XXX"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
          <input
            type="text"
            value={form.subject}
            onChange={e => setForm({ ...form, subject: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
            placeholder="How can we help?"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
        <textarea
          value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
          rows={4}
          className={`w-full px-4 py-3 rounded-xl border ${errors.message ? 'border-red-400' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:border-transparent transition-all bg-gray-50 focus:bg-white resize-none`}
          placeholder="Tell us about your needs..."
        />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 px-4 py-2 rounded-lg">
          <AlertCircle className="w-4 h-4" />
          Something went wrong. Please try again.
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white font-semibold transition-all hover:opacity-90 hover:shadow-lg disabled:opacity-50"
        style={{ backgroundColor: accentColor }}
      >
        {status === 'loading' ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            <Send className="w-4 h-4" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;
