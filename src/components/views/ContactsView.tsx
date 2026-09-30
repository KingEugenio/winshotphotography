import React, { useState } from 'react';
import { Mail, Phone, MapPin, HelpCircle, ChevronDown, Instagram, Facebook } from 'lucide-react';
import { WhatsAppIcon } from '../common/WhatsAppIcon';
import { FormspreeBookingForm } from '../booking/FormspreeBookingForm';
import { siteSettings, faqItems } from '../../data/portfolioData';

// Official TikTok SVG
const TikTokIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.41a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.83 4.47c1.7-1.7 1.7-4.43 1.7-6.26V8.14a8.16 8.16 0 0 0 4.06 1.48V6.69z" />
  </svg>
);

interface ContactsViewProps {
  initialService?: string;
}

export const ContactsView: React.FC<ContactsViewProps> = ({ initialService }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: initialService || 'Studio Portraiture',
    date: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div id="contacts-view-container" className="w-full bg-white text-black pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="font-display text-xs tracking-[0.3em] uppercase text-neutral-500">
            CONNECT WITH THE ATELIER
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.2em] uppercase text-black mt-2 mb-4">
            STUDIO CONTACTS
          </h1>
          <div className="w-12 h-[2px] bg-black mx-auto mb-6" />
          <p className="text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed">
            Direct your commission briefs, portrait reservations, weddings, and commercial inquiries directly to
            Winshot Photography.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          {/* Studio Details & Coordinates */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-neutral-50 p-8 border border-neutral-200">
              <h3 className="font-display text-sm font-bold tracking-[0.2em] uppercase text-black mb-6">
                STUDIO LOCATIONS & AVAILABILITY
              </h3>

              <div className="space-y-6 text-xs text-neutral-700 font-sans">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-black mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-black uppercase block tracking-wider font-display">
                      MAIN ATELIER & STUDIO
                    </span>
                    <p>Greater Accra, Ghana</p>
                    <p className="text-neutral-500 font-mono mt-0.5">Sessions by appointment</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-black mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-black uppercase block tracking-wider font-display">
                      WORLDWIDE DESTINATIONS
                    </span>
                    <p>Toronto • London • New York • Paris</p>
                    <p className="text-neutral-500 font-mono mt-0.5">Destination weddings & campaigns</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Communication Channels */}
            <div className="bg-neutral-50 p-8 border border-neutral-200 space-y-5">
              <h3 className="font-display text-sm font-bold tracking-[0.2em] uppercase text-black mb-4">
                DIRECT INQUIRIES & SOCIAL DESK
              </h3>

              <div className="space-y-3.5 text-xs font-mono">
                {/* WhatsApp */}
                <div className="flex items-center space-x-3 bg-emerald-50 border border-emerald-200 p-3">
                  <WhatsAppIcon className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div className="flex-1">
                    <span className="block text-[10px] text-emerald-700 font-bold uppercase">OFFICIAL WHATSAPP DESK</span>
                    <a
                      href={siteSettings.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-emerald-900 font-bold text-sm"
                    >
                      {siteSettings.whatsappNumber}
                    </a>
                  </div>
                  <a
                    href={siteSettings.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-display uppercase tracking-wider px-2.5 py-1 flex items-center space-x-1"
                  >
                    <WhatsAppIcon className="w-3 h-3" />
                    <span>Chat Now</span>
                  </a>
                </div>

                {/* Phone */}
                <div className="flex items-center space-x-3 pt-1">
                  <Phone className="w-4 h-4 text-neutral-600 shrink-0" />
                  <div className="flex-1">
                    <span className="text-[10px] text-neutral-500 uppercase block">PHONE LINE</span>
                    <a
                      href={`tel:${siteSettings.phoneNumber}`}
                      className="hover:underline text-neutral-900 font-semibold"
                    >
                      {siteSettings.phoneNumber}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-neutral-600 shrink-0" />
                  <div className="flex-1">
                    <span className="text-[10px] text-neutral-500 uppercase block">EMAIL INQUIRIES</span>
                    <a
                      href={`mailto:${siteSettings.contactEmail}`}
                      className="hover:underline text-neutral-900"
                    >
                      {siteSettings.contactEmail}
                    </a>
                  </div>
                </div>

                {/* Social Channels Divider */}
                <div className="pt-3 border-t border-neutral-200 space-y-2">
                  <span className="text-[10px] text-neutral-500 uppercase block tracking-wider font-display">
                    OFFICIAL SOCIAL PROFILES
                  </span>

                  {/* Instagram */}
                  <a
                    href={siteSettings.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2.5 text-neutral-700 hover:text-black transition-colors"
                  >
                    <Instagram className="w-4 h-4 text-neutral-800" />
                    <span>Instagram: {siteSettings.instagramHandle}</span>
                  </a>

                  {/* TikTok */}
                  <a
                    href={siteSettings.tiktokUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2.5 text-neutral-700 hover:text-black transition-colors"
                  >
                    <TikTokIcon className="w-4 h-4 text-neutral-800" />
                    <span>TikTok: {siteSettings.tiktokHandle}</span>
                  </a>

                  {/* Facebook */}
                  <a
                    href={siteSettings.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2.5 text-neutral-700 hover:text-black transition-colors"
                  >
                    <Facebook className="w-4 h-4 text-neutral-800" />
                    <span>Facebook: {siteSettings.facebookHandle}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Booking / Inquiry Form powered by Formspree */}
          <div className="lg:col-span-7 bg-neutral-50 p-8 sm:p-10 border border-neutral-200">
            <h3 className="font-display text-sm font-bold tracking-[0.2em] uppercase text-black mb-1">
              SESSION / CAMPAIGN BRIEF
            </h3>
            <p className="text-xs text-neutral-600 font-sans mb-6">
              Inquire or reserve via Formspree direct dispatch, or click for direct WhatsApp contact.
            </p>
            <FormspreeBookingForm initialService={initialService} />
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="max-w-4xl mx-auto border-t border-neutral-200 pt-16">
          <div className="text-center mb-10">
            <span className="font-display text-xs tracking-[0.3em] uppercase text-neutral-500">
              FREQUENTLY ASKED
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold tracking-wider uppercase text-black mt-1">
              COMMISSION GUIDELINES
            </h3>
          </div>

          <div className="space-y-4">
            {faqItems.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div key={faq.id} className="border border-neutral-200 bg-neutral-50">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    className="w-full text-left p-5 flex justify-between items-center cursor-pointer"
                  >
                    <span className="font-display text-xs sm:text-sm font-bold tracking-wide uppercase text-black">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-neutral-600 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed border-t border-neutral-200/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
