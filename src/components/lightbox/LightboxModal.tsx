import React, { useEffect, useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Info, ZoomIn, ZoomOut, Camera, Palette } from 'lucide-react';
import { ReferenceWork } from '../../data/portfolioData';

interface LightboxModalProps {
  work: ReferenceWork | null;
  currentIndex: number;
  allWorks: ReferenceWork[];
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  work,
  currentIndex,
  allWorks,
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [showInfo, setShowInfo] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [colorMode, setColorMode] = useState<'color' | 'monochrome'>('color');

  // Reset to full color on each newly opened picture
  useEffect(() => {
    setColorMode('color');
    setIsZoomed(false);
  }, [currentIndex, work?.id]);

  const handleNext = useCallback(() => {
    if (allWorks.length === 0) return;
    setIsZoomed(false);
    const nextIdx = (currentIndex + 1) % allWorks.length;
    onNavigate(nextIdx);
  }, [currentIndex, allWorks, onNavigate]);

  const handlePrev = useCallback(() => {
    if (allWorks.length === 0) return;
    setIsZoomed(false);
    const prevIdx = (currentIndex - 1 + allWorks.length) % allWorks.length;
    onNavigate(prevIdx);
  }, [currentIndex, allWorks, onNavigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'i' || e.key === 'I') setShowInfo((prev) => !prev);
      if (e.key === 'c' || e.key === 'C') {
        setColorMode((prev) => (prev === 'color' ? 'monochrome' : 'color'));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handleNext, handlePrev]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !work) return null;

  return (
    <div
      id="lightbox-overlay-modal"
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between select-none animate-in fade-in duration-200"
    >
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/10 z-20">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <span className="font-mono text-xs text-white/60 tracking-widest">
            {String(currentIndex + 1).padStart(2, '0')} / {String(allWorks.length).padStart(2, '0')}
          </span>
          <span className="hidden sm:inline-block text-white/30">|</span>
          <span className="hidden sm:inline-block font-display text-xs text-white/90 tracking-[0.2em] uppercase font-medium truncate max-w-[200px] lg:max-w-md">
            {work.title}
          </span>
          {/* Active color mode indicator tag */}
          <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono tracking-wider uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            {colorMode === 'color' ? 'Full Color View' : 'Monochrome Preview'}
          </span>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Toggle Color / Monochrome Button */}
          <button
            type="button"
            onClick={() => setColorMode((prev) => (prev === 'color' ? 'monochrome' : 'color'))}
            title="Toggle Full Color / Black & White"
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-none text-xs font-mono tracking-wider transition-colors border ${
              colorMode === 'color'
                ? 'bg-white text-black border-white'
                : 'bg-white/10 text-white/90 border-white/20 hover:bg-white/20'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{colorMode === 'color' ? 'COLOR' : 'B&W'}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsZoomed(!isZoomed)}
            aria-label="Toggle zoom"
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
          </button>

          <button
            type="button"
            onClick={() => setShowInfo(!showInfo)}
            aria-label="Toggle image info"
            className={`p-2 rounded-full transition-colors ${
              showInfo ? 'bg-white text-black' : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Info className="w-5 h-5" />
          </button>

          <button
            id="lightbox-close-button"
            type="button"
            onClick={onClose}
            aria-label="Close viewer"
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden">
        {/* Previous Button */}
        <button
          id="lightbox-prev-button"
          type="button"
          onClick={handlePrev}
          aria-label="Previous photograph"
          className="cursor-pointer absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-colors z-20"
        >
          <ChevronLeft className="w-7 h-7 sm:w-8 sm:h-8" />
        </button>

        {/* Image Container */}
        <div
          className={`relative max-w-full max-h-[80vh] transition-transform duration-300 ease-out flex items-center justify-center ${
            isZoomed ? 'scale-125 sm:scale-150 cursor-zoom-out' : 'cursor-zoom-in'
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        >
          {/* Colored when user opens the pic; B&W when not selected */}
          <img
            src={work.imageUrl}
            alt={work.title}
            referrerPolicy="no-referrer"
            className={`max-w-full max-h-[78vh] object-contain shadow-2xl transition-all duration-300 ${
              colorMode === 'color'
                ? 'grayscale-0 saturate-110 contrast-105 filter-none'
                : 'grayscale contrast-110'
            }`}
          />
        </div>

        {/* Next Button */}
        <button
          id="lightbox-next-button"
          type="button"
          onClick={handleNext}
          aria-label="Next photograph"
          className="cursor-pointer absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-colors z-20"
        >
          <ChevronRight className="w-7 h-7 sm:w-8 sm:h-8" />
        </button>

        {/* Details Drawer Slide-over */}
        {showInfo && (
          <aside
            id="lightbox-info-drawer"
            className="absolute right-0 top-0 bottom-0 w-full sm:w-96 bg-[#161616]/95 border-l border-white/10 p-6 sm:p-8 overflow-y-auto z-30 animate-in slide-in-from-right duration-200 text-white"
          >
            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
              <span className="font-display text-xs tracking-[0.25em] uppercase text-white/60">
                PHOTOGRAPH SPECS
              </span>
              <button
                type="button"
                onClick={() => setShowInfo(false)}
                className="p-1 text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="font-display text-lg sm:text-xl font-bold tracking-wider uppercase mb-1">
              {work.title}
            </h3>
            <p className="text-xs text-white/70 font-sans mb-4">{work.subtitle}</p>

            <div className="space-y-3 mb-6 font-mono text-xs">
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-white/50">CATEGORY:</span>
                <span className="text-white">{work.category}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-white/50">YEAR:</span>
                <span className="text-white">{work.year}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-white/50">PALETTE:</span>
                <span className="text-emerald-400">Full Natural Color Display</span>
              </div>
            </div>

            {/* EXIF Data */}
            <div className="bg-black/50 border border-white/10 p-4 rounded-none mb-6">
              <div className="flex items-center space-x-2 text-white/80 font-mono text-xs uppercase mb-3">
                <Camera className="w-4 h-4" />
                <span className="tracking-wider">CAPTURE SPECIFICATIONS</span>
              </div>
              <div className="space-y-2 text-xs font-mono text-white/70">
                <p>
                  <span className="text-white/40">CAMERA:</span> {work.exif.camera}
                </p>
                <p>
                  <span className="text-white/40">LENS:</span> {work.exif.lens}
                </p>
                <div className="grid grid-cols-3 gap-2 pt-1">
                  <div>
                    <span className="block text-[10px] text-white/40">APERTURE</span>
                    <span>{work.exif.aperture}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-white/40">SHUTTER</span>
                    <span>{work.exif.shutter}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-white/40">ISO</span>
                    <span>{work.exif.iso}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4">
              <p className="text-xs text-white/80 font-sans leading-relaxed">
                {work.description}
              </p>
            </div>
          </aside>
        )}
      </div>

      {/* Bottom Minimalist Bar */}
      <div className="px-6 py-3 border-t border-white/10 flex flex-wrap justify-between items-center text-xs font-mono text-white/50 gap-2">
        <span>PRESS ESC TO EXIT</span>
        <span className="hidden sm:inline">PRESS C TO TOGGLE COLOR</span>
        <span>PRESS I FOR SPECS</span>
        <span>ARROW KEYS TO NAVIGATE</span>
      </div>
    </div>
  );
};
