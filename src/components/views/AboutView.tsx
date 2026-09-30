import React, { useEffect } from 'react';
import { Camera, Award, Eye, BookOpen, ArrowRight } from 'lucide-react';
import { siteSettings } from '../../data/portfolioData';

interface AboutViewProps {
  initialSubSection?: string;
  onBookSession: () => void;
  onViewPricing: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  initialSubSection,
  onBookSession,
  onViewPricing,
}) => {
  useEffect(() => {
    if (initialSubSection) {
      const el = document.getElementById(`about-${initialSubSection}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [initialSubSection]);

  const timeline = [
    {
      year: '2025',
      event: 'Solo Retrospective "Velvet & Shadow" — Grand Palais Éphémère, Paris',
      desc: 'Featuring 48 monumental silver gelatin mural prints spanning 10 years of haute couture.',
    },
    {
      year: '2024',
      event: 'International Photographer of the Year — Monochrome Awards, London',
      desc: 'Awarded for groundbreaking editorial series in collaboration with Saint Laurent.',
    },
    {
      year: '2022',
      event: 'Publication of Monograph "SILVER GRAIN" — Steidl Publishing, Göttingen',
      desc: 'A comprehensive 240-page cloth-bound exploration of portraiture in analog black and white.',
    },
    {
      year: '2019',
      event: 'Permanent Collection Acquisition — Maison Européenne de la Photographie, Paris',
      desc: 'Three seminal portraits acquired for the national French cultural archive.',
    },
  ];

  return (
    <div id="about-view-container" className="w-full bg-white text-black pt-28 pb-20">
      {/* Top Hero Banner */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
        <div className="text-center max-w-3xl mx-auto">
          <p className="font-display text-xs tracking-[0.3em] uppercase text-neutral-500 mb-3">
            THE ARTIST BEHIND THE LENS
          </p>
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-[0.2em] uppercase mb-6 text-black">
            WINSHOT PHOTOGRAPHY
          </h1>
          <p className="font-serif-editorial text-xl sm:text-2xl text-neutral-700 italic leading-relaxed">
            "Every frame tells a story. When you open the picture, experience the full living spectrum of light and feeling."
          </p>
        </div>
      </div>

      {/* Biography Section */}
      <section
        id="about-biography"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
                alt="Winston Mbajekwe Studio Portrait"
                className="w-full h-full object-cover grayscale contrast-115"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-xs p-4 text-xs font-mono">
                <span className="font-bold">WINSTON MBAJEKWE</span> // LEAD DIRECTOR & PRINCIPAL PHOTOGRAPHER
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-display text-xl sm:text-2xl font-bold tracking-[0.2em] uppercase text-black">
              BIOGRAPHY & CREATIVE ARCHIVE
            </h2>
            <div className="w-10 h-[2px] bg-black" />
            <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-sans">
              Winston Mbajekwe is the founder and creative visionary behind Winshot Photography, renowned for
              striking studio portraiture, cinematic editorial spreads, luxury weddings, and high-impact streetwear aesthetics.
            </p>
            <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-sans">
              Operating out of Greater Accra with international commissions across Toronto, London, and Paris,
              Winshot captures moments with meticulous lighting balance, deep contrast, and bespoke color grading
              that resonates across digital lookbooks and archival exhibitions.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={onBookSession}
                className="cursor-pointer bg-black text-white font-display text-xs tracking-[0.2em] uppercase px-8 py-3.5 hover:bg-neutral-800 transition-colors"
              >
                Inquire For Commissions
              </button>
              <button
                type="button"
                onClick={onViewPricing}
                className="cursor-pointer border border-black text-black font-display text-xs tracking-[0.2em] uppercase px-8 py-3.5 hover:bg-black hover:text-white transition-colors"
              >
                View Pricing & Booking
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy & Vision Section */}
      <section
        id="about-vision"
        className="w-full bg-[#1e1e1e] text-white py-20 sm:py-24 mb-20 sm:mb-28"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-display text-xs tracking-[0.3em] uppercase text-white/50">
              PHILOSOPHY
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[0.2em] uppercase mt-2">
              OUR CREATIVE VISION
            </h2>
            <div className="w-10 h-[1.5px] bg-white/40 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#282828] p-8 border border-white/10">
              <div className="w-10 h-10 rounded-none bg-white/10 flex items-center justify-center text-white mb-6">
                <Camera className="w-5 h-5" />
              </div>
              <h3 className="font-display text-sm font-semibold tracking-[0.15em] uppercase mb-3 text-white">
                OPTICAL PURITY
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
                We favor medium format digital sensors and Leica rangefinders without color filter
                arrays, ensuring maximum spatial resolution and razor-sharp tonal transitions.
              </p>
            </div>

            <div className="bg-[#282828] p-8 border border-white/10">
              <div className="w-10 h-10 rounded-none bg-white/10 flex items-center justify-center text-white mb-6">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="font-display text-sm font-semibold tracking-[0.15em] uppercase mb-3 text-white">
                SCULPTING SHADOWS
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
                Light is only as powerful as the shadow that cradles it. Our directional lighting
                uncovers the anatomical contours and emotional vulnerability of every muse.
              </p>
            </div>

            <div className="bg-[#282828] p-8 border border-white/10">
              <div className="w-10 h-10 rounded-none bg-white/10 flex items-center justify-center text-white mb-6">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-display text-sm font-semibold tracking-[0.15em] uppercase mb-3 text-white">
                ARCHIVAL ENDURANCE
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
                Trends dissolve within months. A museum-grade silver gelatin exposure stands resilient
                against time, retaining elegance decades after the fashion season closes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Exhibitions & Timeline Section */}
      <section id="about-exhibitions" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="font-display text-xs tracking-[0.3em] uppercase text-neutral-500">
            AWARDS & EXHIBITIONS
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[0.2em] uppercase text-black mt-2">
            CHRONOLOGY OF EXHIBITS
          </h2>
          <div className="w-10 h-[2px] bg-black mx-auto mt-4" />
        </div>

        <div className="space-y-8 border-l border-neutral-300 ml-4 sm:ml-8 pl-6 sm:pl-10">
          {timeline.map((item, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-3.5 h-3.5 bg-black rounded-none group-hover:scale-125 transition-transform" />
              <span className="font-mono text-xs text-neutral-400 font-semibold">{item.year}</span>
              <h3 className="font-display text-base sm:text-lg font-bold tracking-wide uppercase text-neutral-900 mt-1">
                {item.event}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 font-sans mt-1 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
