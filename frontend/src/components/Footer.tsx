'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Globe, AtSign, Hash } from 'lucide-react';
import Link from 'next/link';

const quickLinks = ['Shop All', 'Artisan Rice', 'Dry Fruits', 'Whole Spices', 'Gift Hampers', 'New Arrivals'];
const supportLinks = ['FAQs', 'Shipping Policy', 'Returns & Refunds', 'Track Order', 'Privacy Policy', 'Terms of Service'];

const socialLinks = [
  { icon: AtSign, href: '#', label: 'Instagram' },
  { icon: Globe, href: '#', label: 'Facebook' },
  { icon: Hash, href: '#', label: 'Twitter' },
];

export default function Footer() {
  return (
    <footer className="bg-[#3A2B27] text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <div className="flex flex-col leading-none mb-1">
                <span
                  className="font-display text-2xl font-800 text-white"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800 }}
                >
                  NEEKZ
                </span>
                <span
                  className="text-[10px] tracking-[0.35em] uppercase text-[#C9A66B] mt-0.5"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                >
                  Special
                </span>
              </div>
            </div>

            <p
              className="text-white/50 text-[13px] leading-[1.85] mb-7"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              Artisanal gourmet essentials handcrafted from the heart of Jammu &
              Kashmir — where every product tells the story of its land.
            </p>

            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center border border-white/15 text-white/50 hover:border-[#C9A66B]/60 hover:text-[#C9A66B] transition-all duration-300 hover:scale-110"
                >
                  <Icon size={14} strokeWidth={1.5} />
                </a>
              ))}
            </div>

            {/* Certifications */}
            <div className="mt-7 flex flex-wrap gap-2">
              {['100% Natural', 'GI-Tagged', 'Farmer-Direct'].map((cert) => (
                <span
                  key={cert}
                  className="text-[9px] tracking-wider uppercase px-2.5 py-1 rounded-full"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    background: 'rgba(201,166,107,0.12)',
                    border: '1px solid rgba(201,166,107,0.2)',
                    color: 'rgba(201,166,107,0.8)',
                  }}
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-[10px] tracking-[0.3em] uppercase font-medium text-[#C9A66B] mb-6"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3.5">
              {quickLinks.map((link) => (
                <li key={link}>
                  <Link
                    href="/shop"
                    className="text-[13px] text-white/50 hover:text-white transition-colors duration-300 group flex items-center gap-2"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-[#C9A66B] transition-all duration-300" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4
              className="text-[10px] tracking-[0.3em] uppercase font-medium text-[#C9A66B] mb-6"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              Support
            </h4>
            <ul className="flex flex-col gap-3.5">
              {supportLinks.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-[13px] text-white/50 hover:text-white transition-colors duration-300 group flex items-center gap-2"
                    style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-[#C9A66B] transition-all duration-300" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-[10px] tracking-[0.3em] uppercase font-medium text-[#C9A66B] mb-6"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              Get in Touch
            </h4>

            <div className="flex flex-col gap-4">
              <a
                href="mailto:hello@neekzspecial.com"
                className="flex items-start gap-3 group"
              >
                <Mail size={14} strokeWidth={1.5} className="text-[#C9A66B] mt-0.5 flex-shrink-0" />
                <span
                  className="text-[13px] text-white/50 group-hover:text-white/80 transition-colors duration-300"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                >
                  hello@neekzspecial.com
                </span>
              </a>

              <a href="tel:+919876543210" className="flex items-start gap-3 group">
                <Phone size={14} strokeWidth={1.5} className="text-[#C9A66B] mt-0.5 flex-shrink-0" />
                <span
                  className="text-[13px] text-white/50 group-hover:text-white/80 transition-colors duration-300"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                >
                  +91 98765 43210
                </span>
              </a>

              <div className="flex items-start gap-3">
                <MapPin size={14} strokeWidth={1.5} className="text-[#C9A66B] mt-0.5 flex-shrink-0" />
                <span
                  className="text-[13px] text-white/50 leading-relaxed"
                  style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
                >
                  Jammu, Jammu & Kashmir<br />India — 180001
                </span>
              </div>
            </div>

            {/* Order hours */}
            <div
              className="mt-7 p-4 rounded-xl"
              style={{
                background: 'rgba(201,166,107,0.08)',
                border: '1px solid rgba(201,166,107,0.15)',
              }}
            >
              <p
                className="text-[9px] tracking-[0.2em] uppercase text-[#C9A66B] font-medium mb-1"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                Support Hours
              </p>
              <p
                className="text-[12px] text-white/50"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                Mon – Sat, 9AM – 7PM IST
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Gold divider */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div
          className="h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(201,166,107,0.3), transparent)' }}
        />
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-7">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-white/30 text-[11px]"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            © {new Date().getFullYear()} NEEKZ Special. All rights reserved.
          </p>

          <div className="flex items-center gap-1">
            <span
              className="text-white/20 text-[10px]"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              Crafted with
            </span>
            <span className="text-[#C9A66B]/60 text-[10px] mx-1">♥</span>
            <span
              className="text-white/20 text-[10px]"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              from Jammu & Kashmir
            </span>
          </div>

          <div className="flex gap-4">
            {['Privacy', 'Terms', 'Cookies'].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-white/30 hover:text-white/60 text-[10px] transition-colors duration-300"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
