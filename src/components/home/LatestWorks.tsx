import React, { useState } from 'react';
import { Maximize2, Camera } from 'lucide-react';
import { latestWorksGrid, additionalWorksGrid, ReferenceWork } from '../../data/portfolioData';

interface LatestWorksProps {
  onSelectImage: (work: ReferenceWork, index: number, allWorks: ReferenceWork[]) => void;
}

export const LatestWorks: React.FC<LatestWorksProps> = ({ onSelectImage }) => {
  const [works, setWorks] = useState<ReferenceWork[]>(latestWorksGrid);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleToggleLoadMore = () => {
    if (!isExpanded) {
      setIsLoadingMore(true);
      setTimeout(() => {
        setWorks([...latestWorksGrid, ...additionalWorksGrid]);
        setIsExpanded(true);
        setIsLoadingMore(false);
      }, 350);
    } else {
      setWorks(latestWorksGrid);
      setIsExpanded(false);
      // Smooth scroll back to section header
      const el = document.getElementById('latest-works-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <section
      id="latest-works-section"
      className="w-full bg-white text-black py-16 sm:py-20 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading matching screenshot: MY LATEST WORKS */}
        <div className="text-center mb-12 sm:mb-16">
          <h2
            id="latest-works-heading"
            className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-[0.25em] text-black uppercase select-none"
          >
            MY LATEST WORKS
          </h2>
          <div className="w-12 h-[2px] bg-black/80 mx-auto mt-4" />
        </div>

        {/* 3-Column Image Grid (12 photos initially, exactly matching reference image) */}
        <div
          id="photography-works-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
        >
          {works.map((work, index) => (
            <div
              key={work.id}
              id={`portfolio-card-${work.id}`}
              onClick={() => onSelectImage(work, index, works)}
              className="group cursor-pointer flex flex-col bg-white overflow-hidden transition-all duration-300"
            >
              {/* Image Frame with Aspect Ratio */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
                <img
                  src={work.imageUrl}
                  alt={work.title}
                  loading={index < 6 ? 'eager' : 'lazy'}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center grayscale contrast-110 bw-image-hover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Elegant Hover Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 text-white">
                  <div className="flex justify-between items-start">
                    <span className="font-display text-[10px] tracking-[0.25em] uppercase bg-white/20 backdrop-blur-xs px-2.5 py-1 text-white">
                      {work.category}
                    </span>
                    <button
                      type="button"
                      aria-label="Enlarge image"
                      className="p-2 bg-white/20 hover:bg-white text-white hover:text-black rounded-full transition-colors"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="font-display text-sm font-semibold tracking-[0.15em] uppercase text-white mb-1">
                      {work.title}
                    </p>
                    <div className="flex items-center text-xs text-white/80 space-x-2 font-mono">
                      <Camera className="w-3.5 h-3.5" />
                      <span>{work.exif.camera}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Discreet Caption below card */}
              <div className="pt-3 pb-1 flex justify-between items-baseline">
                <span className="font-display text-xs font-semibold tracking-[0.15em] text-neutral-800 uppercase">
                  {work.title}
                </span>
                <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                  {work.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Centered LOAD MORE Button matching screenshot */}
        <div className="flex justify-center mt-14 sm:mt-18">
          <button
            id="load-more-works-button"
            type="button"
            onClick={handleToggleLoadMore}
            disabled={isLoadingMore}
            className="cursor-pointer bg-[#555555] hover:bg-black text-white font-display text-xs sm:text-sm font-medium tracking-[0.25em] uppercase px-10 sm:px-14 py-3.5 sm:py-4 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            {isLoadingMore ? (
              <span className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-white rounded-full animate-ping" />
                <span>LOADING...</span>
              </span>
            ) : isExpanded ? (
              'SHOW LESS'
            ) : (
              'LOAD MORE'
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
