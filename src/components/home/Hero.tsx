import React from 'react';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  onReadMore: () => void;
  onExploreWorks: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onReadMore, onExploreWorks }) => {
  return (
    <section
      id="hero-banner-section"
      className="relative min-h-screen w-full flex items-center justify-center text-center overflow-hidden bg-black"
    >
      {/* Background Image: Model with vintage medium format/35mm camera held to chest/face */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2000&auto=format&fit=crop"
          alt="Winshot Photography World Class Photography Model"
          className="w-full h-full object-cover object-center grayscale contrast-125 filter brightness-[0.78]"
          loading="eager"
          referrerPolicy="no-referrer"
        />
        {/* Soft vignette and vertical gradient for impeccable text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/85" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.6)_100%)]" />
      </div>

      {/* Foreground Content (Overlaid Typography) */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 flex flex-col items-center">
        {/* Small Tracked Header: WORLD CLASS */}
        <p
          id="hero-eyebrow-text"
          className="font-display text-xs sm:text-sm md:text-base text-white/90 tracking-[0.35em] uppercase font-light mb-3 sm:mb-4 select-none"
        >
          WORLD CLASS
        </p>

        {/* Large Prominent Display Heading: PHOTOGRAPHY */}
        <h1
          id="hero-main-title"
          className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[0.2em] sm:tracking-[0.25em] text-white uppercase mb-6 sm:mb-8 select-none leading-none"
        >
          PHOTOGRAPHY
        </h1>

        {/* Descriptive Body Paragraph */}
        <p
          id="hero-subtitle-paragraph"
          className="text-white/80 text-xs sm:text-sm md:text-base font-normal tracking-wide max-w-2xl leading-relaxed mb-8 sm:mb-10 font-sans"
        >
          Dive into amazing world of black-and-white photography full of emotions, feelings,
          beautiful faces and personalities. Enjoy this mixture of beauty and creativity!
        </p>

        {/* Action Button: READ MORE */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            id="hero-read-more-button"
            type="button"
            onClick={onReadMore}
            className="cursor-pointer bg-white/90 hover:bg-white text-black font-display font-medium text-xs sm:text-sm uppercase tracking-[0.25em] px-8 sm:px-10 py-3.5 sm:py-4 transition-all duration-300 shadow-lg hover:shadow-white/20 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            READ MORE
          </button>
          
          <button
            id="hero-view-works-button"
            type="button"
            onClick={onExploreWorks}
            className="cursor-pointer border border-white/60 hover:border-white hover:bg-white/10 text-white font-display font-medium text-xs sm:text-sm uppercase tracking-[0.25em] px-8 sm:px-10 py-3.5 sm:py-4 transition-all duration-300 backdrop-blur-xs"
          >
            VIEW GALLERY
          </button>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 animate-bounce cursor-pointer">
        <button
          type="button"
          onClick={onExploreWorks}
          aria-label="Scroll down to gallery"
          className="text-white/70 hover:text-white transition-colors"
        >
          <ArrowDown className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};
