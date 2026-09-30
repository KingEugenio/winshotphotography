import React from 'react';
import { Instagram, Facebook, Mail, Phone, ArrowUp } from 'lucide-react';
import { WhatsAppIcon } from '../common/WhatsAppIcon';
import { siteSettings } from '../../data/portfolioData';
import { ActiveNavTab } from './Header';

interface FooterProps {
  onNavigate: (tab: ActiveNavTab) => void;
}

// Clean official TikTok SVG icon
const TikTokIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.41a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.83 4.47c1.7-1.7 1.7-4.43 1.7-6.26V8.14a8.16 8.16 0 0 0 4.06 1.48V6.69z" />
  </svg>
);

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-site-footer" className="w-full bg-[#141414] text-white pt-16 pb-12 border-t border-[#2a2a2a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center pb-12 border-b border-[#2a2a2a] gap-8">
          {/* Signature Logo */}
          <div
            onClick={() => onNavigate('HOME')}
            className="cursor-pointer group flex items-center justify-center select-none"
          >
            <span className="font-display font-light text-white text-base tracking-[0.3em]">
              WINSHOT PHOTOGRAPHY
            </span>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 font-display text-xs tracking-[0.2em] text-neutral-400 uppercase">
            <button
              type="button"
              onClick={() => onNavigate('HOME')}
              className="hover:text-white transition-colors"
            >
              HOME
            </button>
            <button
              type="button"
              onClick={() => onNavigate('PORTFOLIO')}
              className="hover:text-white transition-colors"
            >
              PORTFOLIO
            </button>
            <button
              type="button"
              onClick={() => onNavigate('ABOUT')}
              className="hover:text-white transition-colors"
            >
              ABOUT
            </button>
            <button
              type="button"
              onClick={() => onNavigate('PRICING')}
              className="hover:text-white transition-colors"
            >
              PRICING
            </button>
            <button
              type="button"
              onClick={() => onNavigate('TEAM')}
              className="hover:text-white transition-colors"
            >
              TEAM
            </button>
            <button
              type="button"
              onClick={() => onNavigate('CLIENTS')}
              className="hover:text-white transition-colors"
            >
              CLIENTS
            </button>
            <button
              type="button"
              onClick={() => onNavigate('BLOG')}
              className="hover:text-white transition-colors"
            >
              BLOG
            </button>
            <button
              type="button"
              onClick={() => onNavigate('CONTACTS')}
              className="hover:text-white transition-colors"
            >
              CONTACTS
            </button>
          </div>

          {/* Scroll to top button */}
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="p-3 bg-white/5 hover:bg-white/20 text-neutral-300 hover:text-white rounded-none border border-white/10 transition-colors"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Social Media & Contact Quickbar */}
        <div className="py-8 border-b border-[#222222] flex flex-wrap justify-between items-center gap-6 text-xs font-mono text-neutral-300">
          <div className="flex flex-wrap items-center gap-6">
            {/* Instagram */}
            <a
              href={siteSettings.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Winshot Photography on Instagram"
              className="hover:text-white transition-colors flex items-center space-x-1.5"
            >
              <Instagram className="w-4 h-4 text-neutral-400 hover:text-white" />
              <span>{siteSettings.instagramHandle}</span>
            </a>

            {/* TikTok */}
            <a
              href={siteSettings.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Winshot on TikTok"
              className="hover:text-white transition-colors flex items-center space-x-1.5"
            >
              <TikTokIcon className="w-4 h-4 text-neutral-400 hover:text-white" />
              <span>{siteSettings.tiktokHandle}</span>
            </a>

            {/* Facebook */}
            <a
              href={siteSettings.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Winshot on Facebook"
              className="hover:text-white transition-colors flex items-center space-x-1.5"
            >
              <Facebook className="w-4 h-4 text-neutral-400 hover:text-white" />
              <span>{siteSettings.facebookHandle}</span>
            </a>

            {/* WhatsApp */}
            <a
              href={siteSettings.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact Winshot on WhatsApp"
              className="hover:text-emerald-400 text-emerald-500 transition-colors flex items-center space-x-1.5"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>

          <div className="flex items-center space-x-6 text-neutral-400">
            <a
              href={`mailto:${siteSettings.contactEmail}`}
              className="hover:text-white transition-colors flex items-center space-x-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{siteSettings.contactEmail}</span>
            </a>
            <a
              href={`tel:${siteSettings.phoneNumber}`}
              className="hover:text-white transition-colors flex items-center space-x-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{siteSettings.phoneNumber}</span>
            </a>
          </div>
        </div>

        {/* Bottom copyright & credits line */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500 font-mono gap-4 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p>© {new Date().getFullYear()} WINSHOT PHOTOGRAPHY. ALL RIGHTS RESERVED.</p>
            <span className="hidden sm:inline text-neutral-700">•</span>
            <p className="text-neutral-400 flex items-center">
              <span>BUILT BY</span>
              <a
                href="https://www.instagram.com/ekopixels?stkn=OGRwdmdleWd4Y282&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                title="Visit EKO PIXELS on Instagram"
                className="text-white hover:text-emerald-400 font-semibold tracking-wider transition-colors inline-flex items-center space-x-1 ml-1.5 underline underline-offset-4 decoration-neutral-600 hover:decoration-emerald-400"
              >
                <span>EKO PIXELS</span>
                <Instagram className="w-3 h-3 text-neutral-400 inline" />
              </a>
            </p>
          </div>
          <p className="text-[11px] text-neutral-600 tracking-wider">
            WORLD CLASS PHOTOGRAPHY // ACCRA • TORONTO • LONDON • PARIS
          </p>
        </div>
      </div>
    </footer>
  );
};
