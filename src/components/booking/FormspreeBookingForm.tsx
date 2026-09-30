import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Clock, ShieldCheck, Sparkles, Settings2 } from 'lucide-react';
import { Calendar, Download } from 'lucide-react';
import { WhatsAppIcon } from '../common/WhatsAppIcon';
import { siteSettings } from '../../data/portfolioData';
import { submitBooking } from '../../lib/tenantStore';
import { generateGoogleCalendarUrl, downloadICS, type CalendarBooking } from '../../lib/calendarUtils';

interface FormspreeBookingFormProps {
  initialService?: string;
  initialPackage?: string;
  formspreeId?: string;
  onSuccess?: () => void;
  className?: string;
}

export const FormspreeBookingForm: React.FC<FormspreeBookingFormProps> = ({
  initialService = 'Studio Portraits & Headshots',
  initialPackage = 'STUDIO CAMPAIGN ($2,400)',
  formspreeId = 'xbjnbqzy',
  onSuccess,
  className = '',
}) => {
  // Configurable Formspree ID (allows user or photographer to customize their Formspree target)
  const [activeFormspreeId, setActiveFormspreeId] = useState<string>(
    (import.meta as any).env?.VITE_FORMSPREE_ID || formspreeId || 'xbjnbqzy'
  );
  const [showIdConfig, setShowIdConfig] = useState<boolean>(false);

  // Form fields
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    serviceType: initialService,
    packageTier: initialPackage,
    preferredDate: '',
    isDateFlexible: false,
    location: 'Studio (Accra)',
    guestCount: '',
    budgetRange: '$1,000 - $3,000',
    preferredContact: 'WhatsApp',
    creativeNotes: '',
  });

  // State statuses
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const generateWhatsAppUrl = () => {
    const lines = [
      `Hello Winshot Photography! I would like to book a photography session.`,
      ``,
      `• Name: ${formData.fullName || 'Prospective Client'}`,
      `• Contact: ${formData.phone || 'N/A'}`,
      `• Email: ${formData.email || 'N/A'}`,
      `• Service: ${formData.serviceType}`,
      `• Package: ${formData.packageTier}`,
      `• Preferred Date: ${formData.preferredDate || 'Flexible'}`,
      `• Location: ${formData.location}`,
      `• Budget: ${formData.budgetRange}`,
      `• Preferred Channel: ${formData.preferredContact}`,
      formData.creativeNotes ? `• Notes: ${formData.creativeNotes}` : '',
    ].filter(Boolean);

    return `https://wa.me/233275261289?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    // Capture the lead in the studio inbox (admin portal) regardless of Formspree outcome.
    try {
      await submitBooking({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        serviceType: formData.serviceType,
        packageTier: formData.packageTier,
        preferredDate: formData.preferredDate,
        isDateFlexible: formData.isDateFlexible,
        location: formData.location,
        guestCount: formData.guestCount,
        budgetRange: formData.budgetRange,
        preferredContact: formData.preferredContact,
        creativeNotes: formData.creativeNotes,
        source: 'Winshot Photography Booking Portal',
      });
    } catch (err) {
      console.warn('Failed to save inquiry locally', err);
    }

    const endpoint = `https://formspree.io/f/${activeFormspreeId}`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
          source: 'Winshot Photography Booking Portal',
          whatsappDirectLink: generateWhatsAppUrl(),
        }),
      });

      if (response.ok) {
        setStatus('success');
        if (onSuccess) onSuccess();
      } else {
        const errorData = await response.json().catch(() => ({}));
        const msg =
          errorData?.errors?.[0]?.message ||
          errorData?.error ||
          'Form submission returned an error. You can also book directly via WhatsApp.';
        setErrorMessage(msg);
        setStatus('error');
      }
    } catch (err: any) {
      // In preview environments, CORS or mock endpoints might trigger a network check,
      // Provide graceful handling
      console.warn('Formspree dispatch notice:', err);
      // If network fails (e.g. offline or unverified endpoint in preview), show error with WhatsApp fallback
      setErrorMessage(
        'Formspree connection encountered an issue. You can instantly confirm your booking directly on WhatsApp with one click!'
      );
      setStatus('error');
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Formspree endpoint customizer bar */}
      <div className="flex justify-between items-center mb-6 text-xs text-neutral-500 font-mono pb-2 border-b border-neutral-200">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
          <span>POWERED BY FORMSPREE SECURE DISPATCH</span>
        </div>
        <button
          type="button"
          onClick={() => setShowIdConfig(!showIdConfig)}
          className="text-neutral-600 hover:text-black flex items-center space-x-1 cursor-pointer transition-colors"
          title="Configure Formspree Target Endpoint"
        >
          <Settings2 className="w-3.5 h-3.5" />
          <span className="text-[11px] underline">
            Formspree ID: <span className="font-bold">{activeFormspreeId}</span>
          </span>
        </button>
      </div>

      {showIdConfig && (
        <div className="mb-6 p-4 bg-neutral-100 border border-neutral-300 text-xs font-mono space-y-2 animate-in fade-in">
          <label className="block text-neutral-800 font-bold uppercase">
            Formspree Form ID:
          </label>
          <div className="flex items-center space-x-2">
            <span className="text-neutral-500 text-xs">https://formspree.io/f/</span>
            <input
              type="text"
              value={activeFormspreeId}
              onChange={(e) => setActiveFormspreeId(e.target.value.trim())}
              placeholder="e.g. xbjnbqzy"
              className="flex-1 bg-white border border-neutral-400 px-3 py-1.5 text-xs text-black font-mono focus:border-black outline-hidden"
            />
          </div>
          <p className="text-[10px] text-neutral-600 font-sans">
            Replace with your official Formspree form code from formspree.io to receive booking submissions directly in your email.
          </p>
        </div>
      )}

      {status === 'success' ? (
        <div className="bg-white border-2 border-black p-8 sm:p-10 text-center animate-in fade-in duration-300 shadow-xl">
          <div className="w-14 h-14 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>
          <span className="font-display text-xs tracking-[0.25em] uppercase text-emerald-600 font-bold block mb-1">
            SUCCESSFULLY DISPATCHED
          </span>
          <h3 className="font-display text-2xl font-bold tracking-[0.15em] uppercase mb-3 text-black">
            BOOKING REQUEST SUBMITTED
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-lg mx-auto mb-6 leading-relaxed">
            Thank you, <strong className="text-black">{formData.fullName}</strong>! Your booking reservation for{' '}
            <strong className="text-black">{formData.serviceType}</strong> ({formData.packageTier}) has been routed
            through Formspree to Winshot Photography.
          </p>

          <div className="bg-neutral-50 border border-neutral-200 p-4 max-w-md mx-auto mb-8 text-left text-xs font-mono space-y-1.5 text-neutral-700">
            <div><span className="text-neutral-500">CLIENT:</span> {formData.fullName}</div>
            <div><span className="text-neutral-500">EMAIL:</span> {formData.email}</div>
            <div><span className="text-neutral-500">PHONE:</span> {formData.phone}</div>
            <div><span className="text-neutral-500">SERVICE:</span> {formData.serviceType}</div>
            <div><span className="text-neutral-500">DATE:</span> {formData.preferredDate || 'Flexible Schedule'}</div>
            <div><span className="text-neutral-500">LOCATION:</span> {formData.location}</div>
          </div>

          {/* Add tentative session to calendar (Google Calendar / .ics) */}
          {(() => {
            const booking: CalendarBooking = {
              service: formData.serviceType,
              packageTier: formData.packageTier,
              date: formData.preferredDate,
              location: formData.location,
              clientName: formData.fullName,
              clientEmail: formData.email,
              clientPhone: formData.phone,
              notes: formData.creativeNotes,
              studioName: siteSettings.brandTitle,
              studioEmail: siteSettings.contactEmail,
            };
            return (
              <div className="bg-neutral-50 border border-neutral-200 p-4 max-w-md mx-auto mb-8">
                <span className="block text-[10px] font-display tracking-[0.25em] uppercase text-neutral-500 mb-3">
                  Save the session to your calendar
                </span>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={generateGoogleCalendarUrl(booking)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-black hover:bg-neutral-800 text-white text-[11px] font-mono uppercase tracking-wider px-4 py-3 transition-colors"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Google Calendar</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => downloadICS(booking)}
                    className="flex-1 inline-flex items-center justify-center gap-2 border border-neutral-300 hover:bg-neutral-100 text-neutral-800 text-[11px] font-mono uppercase tracking-wider px-4 py-3 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .ics</span>
                  </button>
                </div>
                <p className="text-[10px] text-neutral-500 mt-2 font-sans">
                  Tentative hold — Winshot Photography will confirm the final date with you.
                </p>
              </div>
            );
          })()}

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-display tracking-widest uppercase px-6 py-4 transition-colors shadow-sm font-semibold"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Confirm Instantly on WhatsApp</span>
            </a>
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="border border-neutral-300 hover:bg-neutral-100 text-neutral-800 text-xs font-mono uppercase px-6 py-4 transition-colors cursor-pointer"
            >
              Submit Another Reservation
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {status === 'error' && (
            <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-2 flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold">{errorMessage}</p>
                <p className="mt-1 text-[11px] text-amber-800">
                  Don't worry! You can book immediately with one click through our verified WhatsApp line.
                </p>
                <div className="mt-2">
                  <a
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-[11px] uppercase tracking-wider px-3 py-1.5"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5" />
                    <span>Proceed via WhatsApp (0275261289)</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Row 1: Full Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-display uppercase tracking-wider text-neutral-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Kwesi Mensah"
                className="w-full bg-white border border-neutral-300 focus:border-black p-3.5 text-xs outline-hidden font-sans transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-display uppercase tracking-wider text-neutral-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. client@domain.com"
                className="w-full bg-white border border-neutral-300 focus:border-black p-3.5 text-xs outline-hidden font-sans transition-colors"
              />
            </div>
          </div>

          {/* Row 2: Phone/WhatsApp & Service Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-display uppercase tracking-wider text-neutral-700 mb-2">
                Phone / WhatsApp Number *
              </label>
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. 0275261289 or +233 27 526 1289"
                  className="w-full bg-white border border-neutral-300 focus:border-black p-3.5 text-xs font-mono outline-hidden transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-display uppercase tracking-wider text-neutral-700 mb-2">
                Session Category *
              </label>
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className="w-full bg-white border border-neutral-300 focus:border-black p-3.5 text-xs font-mono outline-hidden transition-colors"
              >
                <option value="Weddings & Bridal">Weddings & Bridal</option>
                <option value="Studio Portraits & Headshots">Studio Portraits & Headshots</option>
                <option value="Fashion & Editorial">Fashion & Editorial</option>
                <option value="Events & Celebrations">Events & Celebrations</option>
                <option value="Commercial & Brand Campaign">Commercial & Brand Campaign</option>
                <option value="Outdoor & Streetwear">Outdoor & Streetwear</option>
                <option value="Fine Art / Personal Project">Fine Art / Personal Project</option>
              </select>
            </div>
          </div>

          {/* Row 3: Package Tier & Budget Range */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-display uppercase tracking-wider text-neutral-700 mb-2">
                Selected Package Tier
              </label>
              <select
                name="packageTier"
                value={formData.packageTier}
                onChange={handleChange}
                className="w-full bg-white border border-neutral-300 focus:border-black p-3.5 text-xs font-mono outline-hidden transition-colors"
              >
                <option value="STANDARD / ESSENTIAL ($850)">STANDARD / ESSENTIAL ($850+)</option>
                <option value="STUDIO CAMPAIGN ($2,400)">STUDIO CAMPAIGN ($2,400+)</option>
                <option value="LUXURY BESPOKE ($5,500)">LUXURY BESPOKE ($5,500+)</option>
                <option value="CUSTOM PRODUCTION ESTIMATE">CUSTOM PRODUCTION ESTIMATE</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-display uppercase tracking-wider text-neutral-700 mb-2">
                Target Budget Range
              </label>
              <select
                name="budgetRange"
                value={formData.budgetRange}
                onChange={handleChange}
                className="w-full bg-white border border-neutral-300 focus:border-black p-3.5 text-xs font-mono outline-hidden transition-colors"
              >
                <option value="Under $1,000">Under $1,000</option>
                <option value="$1,000 - $2,500">$1,000 - $2,500</option>
                <option value="$2,500 - $5,000">$2,500 - $5,000</option>
                <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                <option value="$10,000+ Luxury Production">$10,000+ Luxury Production</option>
              </select>
            </div>
          </div>

          {/* Row 4: Preferred Date & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-display uppercase tracking-wider text-neutral-700">
                  Target Shoot Date
                </label>
                <label className="text-[11px] font-mono text-neutral-500 flex items-center space-x-1 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isDateFlexible"
                    checked={formData.isDateFlexible}
                    onChange={handleChange}
                    className="accent-black mr-1"
                  />
                  <span>Flexible Date</span>
                </label>
              </div>
              <input
                type="date"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                className="w-full bg-white border border-neutral-300 focus:border-black p-3.5 text-xs font-mono outline-hidden transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-display uppercase tracking-wider text-neutral-700 mb-2">
                Location Preference
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Accra Studio, East Legon, Toronto, London"
                className="w-full bg-white border border-neutral-300 focus:border-black p-3.5 text-xs font-sans outline-hidden transition-colors"
              />
            </div>
          </div>

          {/* Row 5: Preferred Contact Channel & Creative Notes */}
          <div>
            <label className="block text-xs font-display uppercase tracking-wider text-neutral-700 mb-2">
              Preferred Response Method
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['WhatsApp', 'Email', 'Phone Call'].map((channel) => (
                <button
                  key={channel}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, preferredContact: channel }))}
                  className={`py-3 px-3 text-xs font-mono uppercase tracking-wider border text-center transition-colors cursor-pointer ${
                    formData.preferredContact === channel
                      ? 'border-black bg-black text-white font-bold'
                      : 'border-neutral-300 bg-white text-neutral-700 hover:border-black'
                  }`}
                >
                  {channel === 'WhatsApp' ? (
                    <span className="inline-flex items-center justify-center space-x-1.5">
                      <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400" />
                      <span>WhatsApp</span>
                    </span>
                  ) : (
                    channel
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-display uppercase tracking-wider text-neutral-700 mb-2">
              Creative Vision, Outfits & Project Details
            </label>
            <textarea
              name="creativeNotes"
              rows={4}
              value={formData.creativeNotes}
              onChange={handleChange}
              placeholder="Describe your vision, wedding venue, mood references, styling ideas, number of guests/looks..."
              className="w-full bg-white border border-neutral-300 focus:border-black p-4 text-xs font-sans outline-hidden resize-none transition-colors"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-4">
            {/* Formspree Submit Button */}
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="flex-1 bg-black hover:bg-neutral-800 disabled:bg-neutral-400 text-white font-display text-xs font-semibold tracking-[0.2em] uppercase py-4 px-6 flex items-center justify-center space-x-2 transition-colors duration-200 cursor-pointer shadow-md"
            >
              {status === 'submitting' ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting to Formspree...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Booking (Formspree)</span>
                </>
              )}
            </button>

            {/* Direct WhatsApp Instant Booking */}
            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-display text-xs font-semibold tracking-[0.2em] uppercase py-4 px-6 flex items-center justify-center space-x-2 transition-colors duration-200"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Instant WhatsApp Booking</span>
            </a>
          </div>

          {/* Studio guarantees */}
          <div className="pt-4 border-t border-neutral-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-[11px] font-mono text-neutral-500">
            <div className="flex items-center justify-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-neutral-700" />
              <span>Prompt 24-Hour Review</span>
            </div>
            <div className="flex items-center justify-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-700" />
              <span>Strict Date Exclusivity</span>
            </div>
            <div className="flex items-center justify-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-neutral-700" />
              <span>High-Resolution Color & B&W</span>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
