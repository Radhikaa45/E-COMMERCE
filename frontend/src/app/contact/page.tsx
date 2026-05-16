'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import PageLayout from '@/components/ui/PageLayout';

const FD = { fontFamily: "'Cormorant Garamond', Georgia, serif" } as const;
const F  = { fontFamily: "'DM Sans', system-ui, sans-serif" } as const;

const CONTACT_INFO = [
  { icon: Mail, label: 'Email Us', value: 'hello@neekzspecial.com', href: 'mailto:hello@neekzspecial.com' },
  { icon: Phone, label: 'Call Us', value: '+91 98765 43210', href: 'tel:+919876543210' },
  { icon: MapPin, label: 'Find Us', value: 'Jammu, J&K — 180001', href: '#' },
  { icon: Clock, label: 'Support Hours', value: 'Mon – Sat, 9AM – 7PM IST', href: null },
];

const SUBJECTS = ['Order Enquiry', 'Product Question', 'Wholesale / Bulk', 'Partnership', 'Gifting', 'Feedback', 'Other'];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setError('');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Please fill in your name, email, and message.');
      return;
    }
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
  }

  return (
    <PageLayout>
      {/* Header */}
      <div className="py-16 px-5 lg:px-10 text-center" style={{ background: 'linear-gradient(180deg,#EFE7DE 0%,#F4EFE8 100%)' }}>
        <p className="text-[10px] tracking-[0.38em] uppercase text-[#C9A66B] mb-3 font-medium" style={F}>Get in Touch</p>
        <h1 className="text-[#3A2B27] mb-3" style={{ ...FD, fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 600, lineHeight: 1.15 }}>
          We'd Love to <em className="text-[#9E1D2F]">Hear from You</em>
        </h1>
        <p className="text-[13px] text-[#5F5148] max-w-md mx-auto" style={F}>
          Questions about an order, wholesale enquiries, or just want to say hello — we're here.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-5 lg:px-10 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact info */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4 p-5 rounded-2xl" style={{ background: '#FAF7F2', border: '1px solid #E7DDD2' }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(158,29,47,0.08)' }}>
                  <Icon size={16} strokeWidth={1.5} className="text-[#9E1D2F]" />
                </div>
                <div>
                  <p className="text-[9px] tracking-[0.2em] uppercase text-[#C9A66B] font-medium mb-0.5" style={F}>{label}</p>
                  {href ? (
                    <a href={href} className="text-[13px] text-[#3A2B27] hover:text-[#9E1D2F] transition-colors font-medium" style={F}>{value}</a>
                  ) : (
                    <p className="text-[13px] text-[#3A2B27] font-medium" style={F}>{value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="p-5 rounded-2xl" style={{ background: '#3A2B27' }}>
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#C9A66B] font-medium mb-2" style={F}>Wholesale & Bulk Orders</p>
              <p className="text-[12px] text-white/60 leading-relaxed mb-3" style={F}>
                Looking to stock NEEKZ Special in your store or order in bulk for events? We'd love to discuss.
              </p>
              <a href="mailto:wholesale@neekzspecial.com" className="text-[11px] text-[#C9A66B] hover:text-white transition-colors" style={F}>
                wholesale@neekzspecial.com →
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="p-7 rounded-2xl" style={{ background: '#FAF7F2', border: '1px solid #E7DDD2' }}>
              {sent ? (
                <div className="flex flex-col items-center justify-center py-14 text-center gap-4">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'rgba(95,140,90,0.1)' }}>
                    <CheckCircle size={28} strokeWidth={1.5} className="text-green-600" />
                  </div>
                  <h3 className="text-[#3A2B27]" style={{ ...FD, fontSize: '1.5rem', fontWeight: 600 }}>Message Sent!</h3>
                  <p className="text-[13px] text-[#5F5148] max-w-xs" style={F}>
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                    className="text-[11px] tracking-wider uppercase text-[#9E1D2F] underline mt-2" style={F}>
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <h2 className="text-[#3A2B27] mb-1" style={{ ...FD, fontSize: '1.4rem', fontWeight: 600 }}>Send a Message</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] tracking-[0.18em] uppercase text-[#5F5148] mb-1.5" style={F}>Name *</label>
                      <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name"
                        className="w-full px-4 py-2.5 rounded-xl text-[12px] text-[#3A2B27] bg-white outline-none focus:ring-1 focus:ring-[#C9A66B]"
                        style={{ ...F, border: '1px solid #E7DDD2' }} />
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-[0.18em] uppercase text-[#5F5148] mb-1.5" style={F}>Email *</label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com"
                        className="w-full px-4 py-2.5 rounded-xl text-[12px] text-[#3A2B27] bg-white outline-none focus:ring-1 focus:ring-[#C9A66B]"
                        style={{ ...F, border: '1px solid #E7DDD2' }} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-[0.18em] uppercase text-[#5F5148] mb-1.5" style={F}>Subject</label>
                    <select name="subject" value={form.subject} onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl text-[12px] text-[#3A2B27] bg-white outline-none focus:ring-1 focus:ring-[#C9A66B] cursor-pointer"
                      style={{ ...F, border: '1px solid #E7DDD2' }}>
                      <option value="">Select a topic…</option>
                      {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-[0.18em] uppercase text-[#5F5148] mb-1.5" style={F}>Message *</label>
                    <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Tell us how we can help…"
                      className="w-full px-4 py-2.5 rounded-xl text-[12px] text-[#3A2B27] bg-white outline-none focus:ring-1 focus:ring-[#C9A66B] resize-none"
                      style={{ ...F, border: '1px solid #E7DDD2' }} />
                  </div>

                  {error && <p className="text-[11px] text-[#9E1D2F]" style={F}>{error}</p>}

                  <button type="submit" disabled={sending}
                    className="flex items-center justify-center gap-2 py-3 rounded-full text-[11px] tracking-[0.16em] uppercase font-medium text-white transition-colors disabled:opacity-60 hover:bg-[#7D0F1C]"
                    style={{ ...F, background: '#9E1D2F' }}>
                    <Send size={13} strokeWidth={1.5} />
                    {sending ? 'Sending…' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
