'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronRight, ShoppingBag, MapPin, CreditCard, Smartphone,
  Truck, ArrowLeft, Check, Lock, AlertCircle, Package,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import api from '@/services/api';

const FD = { fontFamily: "'Cormorant Garamond', Georgia, serif" } as const;
const F  = { fontFamily: "'DM Sans', system-ui, sans-serif" } as const;

const DELIVERY_FEE   = 79;
const FREE_THRESHOLD = 499;

const INDIAN_STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa',
  'Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala',
  'Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland',
  'Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura',
  'Uttar Pradesh','Uttarakhand','West Bengal',
  'Andaman & Nicobar Islands','Chandigarh','Dadra & Nagar Haveli','Daman & Diu',
  'Delhi','Jammu & Kashmir','Ladakh','Lakshadweep','Puducherry',
];

/* ── Form field ─────────────────────────────────────────────────────────── */
function Field({
  label, error, required, children,
}: { label: string; error?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[10px] tracking-[0.18em] uppercase font-medium mb-1.5" style={{ ...F, color: error ? '#9E1D2F' : '#5F5148' }}>
        {label}{required && <span className="text-[#9E1D2F] ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-[11px] text-[#9E1D2F] flex items-center gap-1" style={F}>
          <AlertCircle size={10} /> {error}
        </p>
      )}
    </div>
  );
}

const inputCls = "w-full px-4 py-3 rounded-xl text-[13px] text-[#3A2B27] outline-none transition-all";
const inputStyle = { ...F, background: '#FAF7F2', border: '1px solid #E7DDD2' } as React.CSSProperties;

function StyledInput(props: React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }) {
  const { error, ...rest } = props;
  return (
    <input
      {...rest}
      className={inputCls}
      style={{ ...inputStyle, borderColor: error ? '#9E1D2F' : '#E7DDD2' }}
      onFocus={(e) => { e.currentTarget.style.borderColor = error ? '#9E1D2F' : '#C9A66B'; props.onFocus?.(e); }}
      onBlur={(e)  => { e.currentTarget.style.borderColor = error ? '#9E1D2F' : '#E7DDD2'; props.onBlur?.(e); }}
    />
  );
}

/* ── Step indicator ─────────────────────────────────────────────────────── */
function Steps({ current }: { current: 1 | 2 }) {
  const steps = [
    { n: 1, label: 'Delivery' },
    { n: 2, label: 'Payment'  },
  ];
  return (
    <div className="flex items-center gap-2">
      {steps.map(({ n, label }, i) => {
        const done    = n < current;
        const active  = n === current;
        return (
          <div key={n} className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold transition-all"
                style={{
                  ...F,
                  background: done ? '#3A2B27' : active ? '#9E1D2F' : '#E7DDD2',
                  color: done || active ? '#fff' : '#5F5148',
                }}
              >
                {done ? <Check size={12} strokeWidth={2.5} /> : n}
              </div>
              <span className="text-[11px] font-medium" style={{ ...F, color: active ? '#3A2B27' : '#5F5148' }}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <ChevronRight size={12} className="text-[#5F5148]/30 mx-1" />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── Order summary sidebar ──────────────────────────────────────────────── */
function OrderSummary({ subtotal, count }: { subtotal: number; count: number }) {
  const { items } = useCart();
  const isFree    = subtotal >= FREE_THRESHOLD;
  const delivery  = isFree ? 0 : DELIVERY_FEE;
  const total     = subtotal + delivery;

  return (
    <div className="rounded-2xl overflow-hidden sticky top-24" style={{ background: '#FAF7F2', border: '1px solid #E7DDD2' }}>
      <div className="px-5 py-4" style={{ borderBottom: '1px solid #E7DDD2' }}>
        <p className="text-[10px] tracking-[0.2em] uppercase text-[#C9A66B] mb-0.5" style={F}>Your Order</p>
        <p className="text-[13px] font-semibold text-[#3A2B27]" style={F}>{count} item{count !== 1 ? 's' : ''}</p>
      </div>

      <div className="px-5 py-4 space-y-3 max-h-64 overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3 items-start">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0" style={{ border: '1px solid #E7DDD2' }}>
              {item.image_url
                ? <Image src={item.image_url} alt={item.name} fill className="object-cover" sizes="48px" />
                : <div className="w-full h-full bg-[#EFE7DE] flex items-center justify-center"><Package size={14} className="text-[#5F5148]/30" /></div>
              }
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold text-white flex items-center justify-center" style={{ background: '#9E1D2F' }}>
                {item.quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-medium text-[#3A2B27] truncate" style={F}>{item.name}</p>
              {item.weight && <p className="text-[10px] text-[#5F5148]/50" style={F}>{item.weight}</p>}
            </div>
            <p className="text-[12px] font-semibold text-[#3A2B27] flex-shrink-0" style={FD}>
              ₹{(item.price * item.quantity).toLocaleString('en-IN')}
            </p>
          </div>
        ))}
      </div>

      <div className="px-5 py-4 space-y-2.5" style={{ borderTop: '1px solid #E7DDD2' }}>
        <div className="flex justify-between text-[12px]" style={F}>
          <span className="text-[#5F5148]">Subtotal</span>
          <span className="font-medium text-[#3A2B27]">₹{subtotal.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between text-[12px]" style={F}>
          <span className="text-[#5F5148]">Delivery</span>
          <span className={isFree ? 'text-green-600 font-semibold' : 'font-medium text-[#3A2B27]'}>
            {isFree ? 'FREE' : `₹${delivery}`}
          </span>
        </div>
        {!isFree && (
          <p className="text-[10px] text-[#C9A66B] px-2.5 py-1.5 rounded-lg" style={{ ...F, background: 'rgba(201,166,107,0.08)', border: '1px solid rgba(201,166,107,0.15)' }}>
            Add ₹{(FREE_THRESHOLD - subtotal).toLocaleString('en-IN')} more for free delivery
          </p>
        )}
        <div className="h-px" style={{ background: '#E7DDD2' }} />
        <div className="flex justify-between">
          <span className="text-[13px] font-semibold text-[#3A2B27]" style={F}>Total</span>
          <span className="font-bold text-[#3A2B27]" style={{ ...FD, fontSize: '1.25rem' }}>
            ₹{total.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      <div className="px-5 pb-4 flex items-center justify-center gap-1.5 text-[10px] text-[#5F5148]/50" style={F}>
        <Lock size={9} strokeWidth={1.8} />
        Secured by 256-bit SSL
      </div>
    </div>
  );
}

/* ── Shipping form ──────────────────────────────────────────────────────── */
interface ShippingData {
  name: string; phone: string; email: string;
  address: string; apt: string;
  city: string; state: string; pincode: string; notes: string;
}

function ShippingForm({
  data, onChange, onNext,
}: {
  data: ShippingData;
  onChange: (d: ShippingData) => void;
  onNext: () => void;
}) {
  const [errors, setErrors] = useState<Partial<Record<keyof ShippingData, string>>>({});

  function set(k: keyof ShippingData, v: string) {
    onChange({ ...data, [k]: v });
    if (errors[k]) setErrors((e) => ({ ...e, [k]: '' }));
  }

  function validate(): boolean {
    const e: Partial<Record<keyof ShippingData, string>> = {};
    if (!data.name.trim())    e.name    = 'Full name is required';
    if (!/^\d{10}$/.test(data.phone.replace(/\s/g, ''))) e.phone = 'Enter valid 10-digit mobile';
    if (!data.email.trim() || !/\S+@\S+\.\S+/.test(data.email)) e.email = 'Enter valid email';
    if (!data.address.trim()) e.address = 'Address is required';
    if (!data.city.trim())    e.city    = 'City is required';
    if (!data.state)          e.state   = 'Select a state';
    if (!/^\d{6}$/.test(data.pincode)) e.pincode = 'Enter 6-digit pincode';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleNext() {
    if (validate()) onNext();
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A66B] mb-1" style={F}>Step 1</p>
        <h2 className="text-[#3A2B27]" style={{ ...FD, fontSize: '1.6rem', fontWeight: 600 }}>Delivery Details</h2>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full Name" required error={errors.name}>
          <StyledInput value={data.name} onChange={(e) => set('name', e.target.value)} placeholder="Rahul Sharma" error={!!errors.name} />
        </Field>
        <Field label="Mobile Number" required error={errors.phone}>
          <StyledInput value={data.phone} onChange={(e) => set('phone', e.target.value)} placeholder="9876543210" maxLength={10} error={!!errors.phone} />
        </Field>
        <Field label="Email Address" required error={errors.email} >
          <StyledInput type="email" value={data.email} onChange={(e) => set('email', e.target.value)} placeholder="you@example.com" error={!!errors.email} />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Address Line 1" required error={errors.address}>
            <StyledInput value={data.address} onChange={(e) => set('address', e.target.value)} placeholder="House / Flat No., Building, Street" error={!!errors.address} />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Address Line 2">
            <StyledInput value={data.apt} onChange={(e) => set('apt', e.target.value)} placeholder="Apartment, Floor, Landmark (optional)" />
          </Field>
        </div>
        <Field label="City" required error={errors.city}>
          <StyledInput value={data.city} onChange={(e) => set('city', e.target.value)} placeholder="Mumbai" error={!!errors.city} />
        </Field>
        <Field label="State" required error={errors.state}>
          <select
            value={data.state}
            onChange={(e) => set('state', e.target.value)}
            className={inputCls}
            style={{ ...inputStyle, borderColor: errors.state ? '#9E1D2F' : '#E7DDD2' }}
          >
            <option value="">Select state</option>
            {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
        <Field label="Pincode" required error={errors.pincode}>
          <StyledInput value={data.pincode} onChange={(e) => set('pincode', e.target.value)} placeholder="400001" maxLength={6} error={!!errors.pincode} />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Delivery Notes">
            <textarea
              value={data.notes}
              onChange={(e) => set('notes', e.target.value)}
              rows={2}
              placeholder="Special instructions (optional)"
              className="w-full px-4 py-3 rounded-xl text-[13px] text-[#3A2B27] outline-none resize-none transition-all"
              style={{ ...F, background: '#FAF7F2', border: '1px solid #E7DDD2' }}
              onFocus={(e) => { e.currentTarget.style.borderColor = '#C9A66B'; }}
              onBlur={(e)  => { e.currentTarget.style.borderColor = '#E7DDD2'; }}
            />
          </Field>
        </div>
      </div>

      <button
        onClick={handleNext}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-full text-[11px] tracking-[0.2em] uppercase font-medium text-white transition-colors hover:opacity-90"
        style={{ ...F, background: '#9E1D2F' }}
      >
        Continue to Payment
        <ChevronRight size={14} strokeWidth={2.5} />
      </button>
    </div>
  );
}

/* ── Payment section ────────────────────────────────────────────────────── */
type PayMethod = 'cod' | 'upi' | 'card';

function UPIInterface({ amount, onPay, processing }: { amount: number; onPay: () => void; processing: boolean }) {
  const [upiId, setUpiId] = useState('');

  return (
    <div className="rounded-2xl p-5 space-y-4" style={{ background: '#FAF7F2', border: '1px solid #E7DDD2' }}>
      <div className="text-center pb-3" style={{ borderBottom: '1px solid #E7DDD2' }}>
        <div className="inline-flex items-center gap-2 mb-1">
          <Smartphone size={15} className="text-[#5F5148]" />
          <span className="text-[13px] font-semibold text-[#3A2B27]" style={F}>UPI Payment</span>
        </div>
        <p className="text-[11px] text-[#5F5148]/60" style={F}>Pay using any UPI app</p>
      </div>

      {/* Fake QR code */}
      <div className="flex flex-col items-center gap-3">
        <div className="rounded-xl p-3" style={{ border: '2px solid #E7DDD2' }}>
          <div className="grid gap-0.5" style={{ display: 'grid', gridTemplateColumns: 'repeat(11,12px)' }}>
            {Array.from({ length: 121 }, (_, i) => {
              const row = Math.floor(i / 11), col = i % 11;
              const corner = (row < 3 && col < 3) || (row < 3 && col > 7) || (row > 7 && col < 3);
              const border = (row === 0 || row === 2 || col === 0 || col === 2) && corner;
              const fill = corner && !border && !(row === 1 && col === 1 && !((row < 3 && col < 3) || (row < 3 && col > 7) || (row > 7 && col < 3)));
              const dark = fill || border || (Math.abs(Math.sin(i * 7.3)) > 0.5 && !corner);
              return <div key={i} style={{ width: 12, height: 12, background: dark ? '#3A2B27' : 'transparent' }} />;
            })}
          </div>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-[#5F5148]/60" style={F}>UPI ID</p>
          <p className="text-[13px] font-semibold text-[#3A2B27]" style={F}>NEEKZ@paytm</p>
          <p className="text-[11px] font-bold text-[#9E1D2F] mt-0.5" style={FD}>₹{amount.toLocaleString('en-IN')}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1" style={{ background: '#E7DDD2' }} />
        <span className="text-[10px] text-[#5F5148]/50 uppercase tracking-wider" style={F}>or enter UPI ID</span>
        <div className="h-px flex-1" style={{ background: '#E7DDD2' }} />
      </div>

      <div className="flex gap-2">
        <input
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          placeholder="yourname@upi"
          className="flex-1 px-3.5 py-2.5 rounded-xl text-[13px] text-[#3A2B27] outline-none"
          style={{ ...F, background: '#F4EFE8', border: '1px solid #E7DDD2' }}
          onFocus={(e) => { e.currentTarget.style.borderColor = '#C9A66B'; }}
          onBlur={(e)  => { e.currentTarget.style.borderColor = '#E7DDD2'; }}
        />
      </div>

      <p className="text-[10px] text-[#5F5148]/50 text-center" style={F}>
        ✓ This is a test environment — no real charges
      </p>
    </div>
  );
}

function CardInterface({ amount }: { amount: number }) {
  const [cardNum, setCardNum]  = useState('');
  const [name,    setName]     = useState('');
  const [expiry,  setExpiry]   = useState('');
  const [cvv,     setCvv]      = useState('');
  const [flipped, setFlipped]  = useState(false);

  function formatCard(v: string) {
    return v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  }
  function formatExpiry(v: string) {
    const d = v.replace(/\D/g, '').slice(0, 4);
    return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  }

  const displayNum = cardNum || '•••• •••• •••• ••••';
  const displayExp = expiry || 'MM/YY';
  const cardType   = cardNum.startsWith('4') ? 'VISA' : cardNum.startsWith('5') ? 'MC' : '';

  return (
    <div className="space-y-4">
      {/* Card preview */}
      <div
        className="relative h-44 rounded-2xl overflow-hidden p-5 flex flex-col justify-between cursor-pointer select-none"
        style={{ background: 'linear-gradient(135deg,#3A2B27 0%,#5F5148 60%,#9E1D2F 100%)' }}
        onClick={() => setFlipped(!flipped)}
      >
        {!flipped ? (
          <>
            <div className="flex justify-between items-start">
              <span className="text-white/50 text-[10px] tracking-widest uppercase" style={F}>NEEKZ Pay</span>
              {cardType && <span className="text-white font-bold text-[13px]" style={F}>{cardType}</span>}
            </div>
            <div>
              <p className="text-white text-[18px] font-mono tracking-[0.15em] mb-3">{displayNum}</p>
              <div className="flex justify-between">
                <div>
                  <p className="text-white/40 text-[8px] uppercase tracking-widest mb-0.5" style={F}>Cardholder</p>
                  <p className="text-white text-[11px] font-medium uppercase tracking-wider" style={F}>{name || 'YOUR NAME'}</p>
                </div>
                <div>
                  <p className="text-white/40 text-[8px] uppercase tracking-widest mb-0.5" style={F}>Expires</p>
                  <p className="text-white text-[11px] font-medium" style={F}>{displayExp}</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="h-8 bg-black/30 w-full -mx-5 px-5 flex items-center mt-2" />
            <div className="flex justify-end mt-4">
              <div className="bg-white/10 rounded h-8 flex items-center px-3">
                <span className="text-white/70 text-[12px] font-mono">{cvv || '•••'}</span>
              </div>
            </div>
            <p className="text-white/30 text-[9px] text-center" style={F}>Click to flip back</p>
          </>
        )}
        {/* Chip */}
        <div className="absolute left-5 top-12 w-8 h-6 rounded" style={{ background: 'linear-gradient(135deg,#C9A66B,#E8C578)' }} />
      </div>

      {/* Form fields */}
      <div className="space-y-3">
        <div>
          <label className="block text-[10px] tracking-[0.18em] uppercase text-[#5F5148] font-medium mb-1.5" style={F}>Card Number</label>
          <input
            value={cardNum}
            onChange={(e) => setCardNum(formatCard(e.target.value))}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            className={inputCls}
            style={inputStyle}
            onFocus={(e) => { e.currentTarget.style.borderColor = '#C9A66B'; }}
            onBlur={(e)  => { e.currentTarget.style.borderColor = '#E7DDD2'; }}
          />
        </div>
        <div>
          <label className="block text-[10px] tracking-[0.18em] uppercase text-[#5F5148] font-medium mb-1.5" style={F}>Cardholder Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value.toUpperCase())}
            placeholder="YOUR NAME"
            className={inputCls}
            style={inputStyle}
            onFocus={(e) => { e.currentTarget.style.borderColor = '#C9A66B'; }}
            onBlur={(e)  => { e.currentTarget.style.borderColor = '#E7DDD2'; }}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] tracking-[0.18em] uppercase text-[#5F5148] font-medium mb-1.5" style={F}>Expiry</label>
            <input
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
              placeholder="MM/YY"
              maxLength={5}
              className={inputCls}
              style={inputStyle}
              onFocus={(e) => { e.currentTarget.style.borderColor = '#C9A66B'; }}
              onBlur={(e)  => { e.currentTarget.style.borderColor = '#E7DDD2'; }}
            />
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.18em] uppercase text-[#5F5148] font-medium mb-1.5" style={F}>CVV</label>
            <input
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
              placeholder="•••"
              maxLength={4}
              type="password"
              className={inputCls}
              style={inputStyle}
              onFocus={(e) => { e.currentTarget.style.borderColor = '#C9A66B'; setFlipped(true); }}
              onBlur={(e)  => { e.currentTarget.style.borderColor = '#E7DDD2'; setFlipped(false); }}
            />
          </div>
        </div>
        <div className="text-[10px] text-[#5F5148]/50 text-center px-4 py-2 rounded-lg" style={{ ...F, background: 'rgba(201,166,107,0.06)', border: '1px dashed rgba(201,166,107,0.2)' }}>
          Test card: <strong>4111 1111 1111 1111</strong> · Any expiry · Any CVV
        </div>
      </div>
    </div>
  );
}

function PaymentForm({
  method, onMethodChange, grandTotal, onBack, onPlace, processing,
}: {
  method: PayMethod;
  onMethodChange: (m: PayMethod) => void;
  grandTotal: number;
  onBack: () => void;
  onPlace: () => void;
  processing: boolean;
}) {
  const options: { value: PayMethod; label: string; desc: string; icon: React.ElementType }[] = [
    { value: 'cod',  label: 'Cash on Delivery', desc: 'Pay when your order arrives',        icon: Truck },
    { value: 'upi',  label: 'UPI Payment',       desc: 'PhonePe, GPay, Paytm and more',     icon: Smartphone },
    { value: 'card', label: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay, Amex',   icon: CreditCard },
  ];

  return (
    <div className="space-y-5">
      <div>
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A66B] mb-1" style={F}>Step 2</p>
        <h2 className="text-[#3A2B27]" style={{ ...FD, fontSize: '1.6rem', fontWeight: 600 }}>Payment Method</h2>
      </div>

      {/* Method selection */}
      <div className="space-y-2.5">
        {options.map(({ value, label, desc, icon: Icon }) => {
          const active = method === value;
          return (
            <button
              key={value}
              onClick={() => onMethodChange(value)}
              className="w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all"
              style={{
                background: active ? 'rgba(158,29,47,0.04)' : '#FAF7F2',
                border: `1.5px solid ${active ? '#9E1D2F' : '#E7DDD2'}`,
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: active ? 'rgba(158,29,47,0.1)' : '#EFE7DE' }}
              >
                <Icon size={17} style={{ color: active ? '#9E1D2F' : '#5F5148' }} strokeWidth={1.8} />
              </div>
              <div className="flex-1">
                <p className="text-[13px] font-semibold" style={{ ...F, color: active ? '#3A2B27' : '#3A2B27' }}>{label}</p>
                <p className="text-[11px] text-[#5F5148]/60" style={F}>{desc}</p>
              </div>
              <div
                className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                style={{ borderColor: active ? '#9E1D2F' : '#E7DDD2' }}
              >
                {active && <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#9E1D2F' }} />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Method-specific UI */}
      {method === 'upi'  && <UPIInterface amount={grandTotal} onPay={onPlace} processing={processing} />}
      {method === 'card' && <CardInterface amount={grandTotal} />}

      {/* Action buttons */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={onBack}
          disabled={processing}
          className="flex items-center gap-2 px-5 py-3 rounded-full text-[11px] font-medium transition-all disabled:opacity-50"
          style={{ ...F, border: '1.5px solid #E7DDD2', color: '#5F5148' }}
        >
          <ArrowLeft size={13} /> Back
        </button>
        <button
          onClick={onPlace}
          disabled={processing}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full text-[11px] tracking-[0.2em] uppercase font-medium text-white transition-all disabled:opacity-70"
          style={{ ...F, background: '#9E1D2F' }}
        >
          {processing ? (
            <>
              <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              Processing…
            </>
          ) : (
            <>
              <Lock size={12} strokeWidth={2} />
              {method === 'cod' ? 'Place Order' : `Pay ₹${grandTotal.toLocaleString('en-IN')}`}
            </>
          )}
        </button>
      </div>
    </div>
  );
}

/* ── Main page ──────────────────────────────────────────────────────────── */
export default function CheckoutPage() {
  const { user, loading: authLoading } = useAuth();
  const { items, total, count, clearCart } = useCart();
  const router = useRouter();

  const [step,        setStep]       = useState<1 | 2>(1);
  const [method,      setMethod]     = useState<PayMethod>('cod');
  const [processing,  setProcessing] = useState(false);
  const [error,       setError]      = useState('');

  const [shipping, setShipping] = useState<ShippingData>({
    name: user?.name || '', phone: '', email: '', address: '',
    apt: '', city: '', state: '', pincode: '', notes: '',
  });

  // Pre-fill name/email from auth
  useEffect(() => {
    if (user) setShipping((s) => ({ ...s, name: s.name || user.name }));
  }, [user]);

  // Auth redirect
  useEffect(() => {
    if (!authLoading && !user) router.replace('/login?redirect=/checkout');
  }, [user, authLoading, router]);

  // Empty cart redirect
  useEffect(() => {
    if (!authLoading && items.length === 0) router.replace('/cart');
  }, [items.length, authLoading, router]);

  const isFree     = total >= FREE_THRESHOLD;
  const delivery   = isFree ? 0 : DELIVERY_FEE;
  const grandTotal = total + delivery;

  async function placeOrder() {
    setProcessing(true);
    setError('');
    try {
      // Simulate payment processing delay for UPI/Card
      if (method !== 'cod') {
        await new Promise((r) => setTimeout(r, 1500));
      }

      const fullAddress = [shipping.address, shipping.apt].filter(Boolean).join(', ');

      const { data } = await api.post('/api/orders', {
        shipping_name:    shipping.name,
        shipping_phone:   shipping.phone,
        shipping_email:   shipping.email,
        shipping_address: fullAddress,
        shipping_city:    shipping.city,
        shipping_state:   shipping.state,
        shipping_pincode: shipping.pincode,
        payment_method:   method,
        notes:            shipping.notes || null,
        items: items.map((i) => ({
          product_id: i.product_id,
          name:       i.name,
          image_url:  i.image_url,
          quantity:   i.quantity,
          price:      i.price,
        })),
      });

      clearCart();
      router.push(`/order/${data.data.orderId}?new=1`);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to place order. Please try again.';
      setError(msg);
      setProcessing(false);
    }
  }

  if (authLoading || (!user && typeof window !== 'undefined')) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#F4EFE8' }}>
        <div className="w-8 h-8 rounded-full border-2 border-t-[#9E1D2F] border-[#E7DDD2] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#F4EFE8' }}>
      {/* Topbar */}
      <header className="sticky top-0 z-20 px-5 lg:px-10 py-4 flex items-center justify-between" style={{ background: '#FAF7F2', borderBottom: '1px solid #E7DDD2' }}>
        <Link href="/cart" className="flex items-center gap-2 text-[#5F5148] hover:text-[#9E1D2F] transition-colors">
          <ArrowLeft size={16} strokeWidth={1.8} />
          <span className="text-[12px] font-medium hidden sm:block" style={F}>Back to Cart</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-[#3A2B27] font-semibold text-[18px]" style={FD}>NEEKZ</span>
          <span className="text-[9px] tracking-[0.3em] uppercase text-[#C9A66B]" style={F}>Checkout</span>
        </div>
        <Steps current={step} />
      </header>

      <div className="max-w-5xl mx-auto px-5 lg:px-8 py-8">
        {error && (
          <div className="mb-5 flex items-center gap-2 px-4 py-3 rounded-xl text-[12px] text-[#9E1D2F]" style={{ background: 'rgba(158,29,47,0.06)', border: '1px solid rgba(158,29,47,0.2)', ...F }}>
            <AlertCircle size={14} /> {error}
          </div>
        )}

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left: steps */}
          <div className="lg:col-span-3">
            {step === 1 ? (
              <ShippingForm
                data={shipping}
                onChange={setShipping}
                onNext={() => setStep(2)}
              />
            ) : (
              <PaymentForm
                method={method}
                onMethodChange={setMethod}
                grandTotal={grandTotal}
                onBack={() => setStep(1)}
                onPlace={placeOrder}
                processing={processing}
              />
            )}
          </div>

          {/* Right: summary */}
          <div className="lg:col-span-2">
            <OrderSummary subtotal={total} count={count} />
          </div>
        </div>
      </div>
    </div>
  );
}
