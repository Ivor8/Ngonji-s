import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { EntityKey, ENTITIES } from '@/data/constants';
import { Calendar, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface BookingFormProps {
  entity: EntityKey;
  services: any[];
}

const BookingForm: React.FC<BookingFormProps> = ({ entity, services }) => {
  const [form, setForm] = useState({
    full_name: '', email: '', phone: '', service_id: '', preferred_date: '', preferred_time: '', details: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const entityConfig = ENTITIES[entity];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.full_name.trim()) errs.full_name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email';
    if (!form.phone.trim()) errs.phone = 'Phone is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    try {
      const { error } = await supabase.from('bookings').insert({
        entity,
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        service_id: form.service_id || null,
        preferred_date: form.preferred_date || null,
        preferred_time: form.preferred_time || null,
        details: form.details,
      });
      if (error) throw error;
      setStatus('success');
      setForm({ full_name: '', email: '', phone: '', service_id: '', preferred_date: '', preferred_time: '', details: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Booking Submitted!</h3>
        <p className="text-gray-600">We'll confirm your appointment shortly via email and phone.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
          <input type="text" value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })}
            className={`w-full px-4 py-3 rounded-xl border ${errors.full_name ? 'border-red-400' : 'border-gray-200'} focus:outline-none focus:ring-2 transition-all bg-gray-50 focus:bg-white`}
            placeholder="Your full name" />
          {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
            className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-400' : 'border-gray-200'} focus:outline-none focus:ring-2 transition-all bg-gray-50 focus:bg-white`}
            placeholder="your@email.com" />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
          <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
            className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-400' : 'border-gray-200'} focus:outline-none focus:ring-2 transition-all bg-gray-50 focus:bg-white`}
            placeholder="+237 6XX XXX XXX" />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
          <select value={form.service_id} onChange={e => setForm({ ...form, service_id: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 transition-all bg-gray-50 focus:bg-white">
            <option value="">Select a service</option>
            {services.map((s: any) => (
              <option key={s.id} value={s.id}>{s.title}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
          <input type="date" value={form.preferred_date} onChange={e => setForm({ ...form, preferred_date: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 transition-all bg-gray-50 focus:bg-white" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
          <select value={form.preferred_time} onChange={e => setForm({ ...form, preferred_time: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 transition-all bg-gray-50 focus:bg-white">
            <option value="">Select time</option>
            {['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'].map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Additional Details</label>
        <textarea value={form.details} onChange={e => setForm({ ...form, details: e.target.value })}
          rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 transition-all bg-gray-50 focus:bg-white resize-none"
          placeholder="Describe your needs..." />
      </div>
      {status === 'error' && (
        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 px-4 py-2 rounded-lg">
          <AlertCircle className="w-4 h-4" /> Something went wrong. Please try again.
        </div>
      )}
      <button type="submit" disabled={status === 'loading'}
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white font-semibold transition-all hover:opacity-90 hover:shadow-lg disabled:opacity-50"
        style={{ backgroundColor: entityConfig.color }}>
        {status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Calendar className="w-4 h-4" /> Book Consultation</>}
      </button>
    </form>
  );
};

export default BookingForm;
