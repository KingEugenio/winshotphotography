import React from 'react';
import { filmstripPortraits, siteSettings } from '../../data/portfolioData';
import { Instagram } from 'lucide-react';

interface BottomFilmstripProps {
  onSelectPortrait?: (imageUrl: string, name: string) => void;
}

export const BottomFilmstrip: React.FC<BottomFilmstripProps> = ({ onSelectPortrait }) => {
  return (
    <section
      id="bottom-filmstrip-strip"
      className="w-full bg-black overflow-hidden border-t border-white/10"
      aria-label="Studio Portrait Strip"
    >
      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 w-full">
        {filmstripPortraits.map((portrait) => (
          <div
            key={portrait.id}
            id={`filmstrip-item-${portrait.id}`}
            onClick={() => onSelectPortrait?.(portrait.imageUrl, portrait.name)}
            className="group relative aspect-square overflow-hidden cursor-pointer bg-neutral-900 border-r border-black/40 last:border-r-0"
          >
            <img
              src={portrait.imageUrl}
              alt={portrait.name}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center grayscale contrast-125 group-hover:scale-110 transition-transform duration-500 ease-out"
            />
            {/* Subtle dark gradient overlay on hover */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2.5 sm:p-3 text-white">
              <p className="font-display text-[10px] tracking-wider uppercase font-semibold truncate">
                {portrait.name}
              </p>
              <p className="text-[9px] text-white/70 font-mono truncate">{portrait.role}</p>
              <div className="mt-1 flex items-center space-x-1 text-white/80">
                <Instagram className="w-3 h-3" />
                <span className="text-[8px] font-mono tracking-tighter">{siteSettings.instagramHandle}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
