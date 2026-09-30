import React, { useState } from 'react';
import { Check, ArrowRight, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { servicePackages, siteSettings } from '../../data/portfolioData';
import { ServicePackage } from '../../types';
import { FormspreeBookingForm } from '../booking/FormspreeBookingForm';
import { WhatsAppIcon } from '../common/WhatsAppIcon';

interface PricingViewProps {
  onSelectPackage: (pkg: ServicePackage) => void;
  onCustomInquiry: () => void;
}

export const PricingView: React.FC<PricingViewProps> = ({
  onSelectPackage,
  onCustomInquiry,
}) => {
  const [selectedPkgId, setSelectedPkgId] = useState<string>(servicePackages[1]?.id || 'pkg-campaign');

  const activePackage = servicePackages.find((p) => p.id === selectedPkgId) || servicePackages[0];

  const handlePackageClick = (pkg: ServicePackage) => {
    setSelectedPkgId(pkg.id);
    const bookingSection = document.getElementById('session-booking-module');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="pricing-view-container" className="w-full bg-white text-black pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="font-display text-xs tracking-[0.3em] uppercase text-neutral-500">
            TRANSPARENT COMMISSIONS & RESERVATIONS
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.2em] uppercase text-black mt-2 mb-4">
            PRICING
          </h1>
          <div className="w-12 h-[2px] bg-black mx-auto mb-6" />
          <p className="text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed">
            Every commission with Winshot Photography includes bespoke creative direction, professional lighting,
            high-fidelity color grading, and calibrated delivery crafted for discerning individuals and brands.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {servicePackages.map((pkg) => {
            const isFeatured = pkg.tier === 'CAMPAIGN';
            const isSelected = selectedPkgId === pkg.id;

            return (
              <div
                key={pkg.id}
                id={`pricing-card-${pkg.id}`}
                className={`relative flex flex-col justify-between p-8 sm:p-10 border transition-all duration-300 ${
                  isFeatured
                    ? 'border-black bg-neutral-950 text-white shadow-2xl scale-100 lg:-translate-y-2'
                    : 'border-neutral-200 bg-white text-black hover:border-black/50'
                } ${isSelected ? 'ring-2 ring-black ring-offset-2' : ''}`}
              >
                {isFeatured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-display tracking-[0.25em] font-bold uppercase px-4 py-1">
                    MOST REQUESTED
                  </div>
                )}

                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span
                      className={`text-[10px] font-mono tracking-widest uppercase ${
                        isFeatured ? 'text-neutral-400' : 'text-neutral-500'
                      }`}
                    >
                      {pkg.tier}
                    </span>
                    <span
                      className={`text-[11px] font-mono px-2 py-0.5 ${
                        isFeatured ? 'bg-white/10 text-white' : 'bg-neutral-100 text-neutral-700'
                      }`}
                    >
                      {pkg.duration}
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold tracking-wider uppercase mb-2">
                    {pkg.title}
                  </h3>
                  <p
                    className={`text-xs mb-6 font-sans leading-relaxed ${
                      isFeatured ? 'text-neutral-300' : 'text-neutral-600'
                    }`}
                  >
                    {pkg.subtitle}
                  </p>

                  <div className="mb-6 pb-6 border-b border-neutral-200/40">
                    <div className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-1">
                      {pkg.startingPrice}
                    </div>
                    <p
                      className={`text-[11px] font-mono ${
                        isFeatured ? 'text-neutral-400' : 'text-neutral-500'
                      }`}
                    >
                      {pkg.priceNote}
                    </p>
                  </div>

                  {/* Deliverables */}
                  <div className="space-y-3 mb-8">
                    <span
                      className={`block text-[10px] font-display tracking-widest uppercase font-semibold ${
                        isFeatured ? 'text-neutral-400' : 'text-neutral-500'
                      }`}
                    >
                      DELIVERABLES INCLUDED:
                    </span>
                    {pkg.deliverables.map((item, i) => (
                      <div key={i} className="flex items-start space-x-2 text-xs">
                        <Check
                          className={`w-4 h-4 mt-0.5 shrink-0 ${
                            isFeatured ? 'text-white' : 'text-black'
                          }`}
                        />
                        <span className={isFeatured ? 'text-neutral-200' : 'text-neutral-700'}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Button */}
                <button
                  type="button"
                  onClick={() => handlePackageClick(pkg)}
                  className={`w-full py-4 text-xs font-display tracking-[0.25em] uppercase font-semibold transition-colors duration-200 flex items-center justify-center space-x-2 cursor-pointer ${
                    isFeatured
                      ? 'bg-white text-black hover:bg-neutral-200'
                      : 'bg-black text-white hover:bg-neutral-800'
                  }`}
                >
                  <span>BOOK THIS PACKAGE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Interactive Booking Module with Formspree */}
        <div
          id="session-booking-module"
          className="bg-neutral-50 border border-neutral-200 p-8 sm:p-12 mb-16 scroll-mt-28 shadow-xs"
        >
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <span className="font-display text-[10px] tracking-[0.25em] uppercase text-neutral-500">
                OFFICIAL BOOKING RESERVATION
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[0.15em] uppercase text-black mt-1">
                RESERVE YOUR DATE WITH WINSHOT
              </h2>
              <div className="w-10 h-[2px] bg-black mx-auto my-3" />
              <p className="text-xs text-neutral-600 font-sans">
                Selected Package:{' '}
                <strong className="text-black uppercase font-mono">
                  {activePackage.title} ({activePackage.startingPrice})
                </strong>
              </p>
            </div>

            {/* Formspree Booking Form */}
            <FormspreeBookingForm
              initialPackage={`${activePackage.title} (${activePackage.startingPrice})`}
              initialService={
                activePackage.tier === 'ESSENTIAL'
                  ? 'Studio Portraits & Headshots'
                  : activePackage.tier === 'CAMPAIGN'
                  ? 'Fashion & Editorial'
                  : 'Weddings & Bridal'
              }
            />

            {/* Assurance points */}
            <div className="mt-8 pt-6 border-t border-neutral-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-[11px] font-mono text-neutral-500">
              <div className="flex items-center justify-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-neutral-700" />
                <span>24h Availability Response</span>
              </div>
              <div className="flex items-center justify-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-700" />
                <span>Secure Date Hold</span>
              </div>
              <div className="flex items-center justify-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-neutral-700" />
                <span>Color & B&W High-Res Delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Project Note */}
        <div className="bg-neutral-900 text-white p-8 sm:p-10 text-center max-w-4xl mx-auto">
          <h3 className="font-display text-base sm:text-lg font-bold tracking-[0.2em] uppercase text-white mb-2">
            LOOKING FOR A BESPOKE DESTINATION WEDDING OR COMMERCIAL CAMPAIGN?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 font-sans max-w-xl mx-auto mb-6 leading-relaxed">
            Winshot Photography travels internationally for multi-day weddings, luxury brand lookbooks, and high-fashion
            productions worldwide.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`https://wa.me/233275261289?text=Hello%20Winshot%20Photography%2C%20I%20would%20like%20to%20request%20a%20bespoke%20proposal%20for%20a%20project.`}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white font-display text-xs tracking-[0.2em] uppercase px-8 py-3.5 transition-colors flex items-center space-x-2"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>WhatsApp Inquiries</span>
            </a>
            <button
              type="button"
              onClick={onCustomInquiry}
              className="cursor-pointer bg-white hover:bg-neutral-200 text-black font-display text-xs tracking-[0.2em] uppercase px-8 py-3.5 transition-colors"
            >
              Request Custom Proposal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
