import React from 'react';
import { clientPartners } from '../../data/portfolioData';
import { Quote } from 'lucide-react';

interface ClientsViewProps {
  onStartProject: () => void;
}

export const ClientsView: React.FC<ClientsViewProps> = ({ onStartProject }) => {
  return (
    <div id="clients-view-container" className="w-full bg-white text-black pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="font-display text-xs tracking-[0.3em] uppercase text-neutral-500">
            DISTINGUISHED PATRONS & HOUSES
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.2em] uppercase text-black mt-2 mb-4">
            CLIENT ARCHIVE
          </h1>
          <div className="w-12 h-[2px] bg-black mx-auto mb-6" />
          <p className="text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed">
            Proudly partnering with iconic fashion publications, luxury ateliers, and independent avant-garde
            labels worldwide.
          </p>
        </div>

        {/* Client Logos Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16 py-8 border-y border-neutral-200">
          {clientPartners.map((client) => (
            <div
              key={client.id}
              className="flex items-center justify-center p-6 text-center hover:bg-neutral-50 transition-colors"
            >
              <span className="font-display text-base sm:text-lg font-bold tracking-[0.2em] uppercase text-neutral-800">
                {client.logoText}
              </span>
            </div>
          ))}
        </div>

        {/* Testimonials & Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {clientPartners.map((client) => (
            <div
              key={client.id}
              className="bg-neutral-50 border border-neutral-200 p-8 flex flex-col justify-between"
            >
              <div>
                <Quote className="w-8 h-8 text-neutral-300 mb-4" />
                <p className="font-serif-editorial text-lg text-neutral-800 italic leading-relaxed mb-6">
                  "{client.quote}"
                </p>
              </div>

              <div className="border-t border-neutral-200 pt-4">
                <h4 className="font-display text-xs font-bold tracking-widest uppercase text-black">
                  {client.name}
                </h4>
                <p className="text-[11px] font-mono text-neutral-500 uppercase mt-0.5">
                  {client.category}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-black text-white p-10 sm:p-14 text-center max-w-4xl mx-auto">
          <h3 className="font-display text-xl sm:text-2xl font-bold tracking-[0.2em] uppercase mb-4">
            BEGIN YOUR EDITORIAL CAMPAIGN
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 font-sans max-w-xl mx-auto mb-8 leading-relaxed">
            From haute couture lookbooks to worldwide billboard campaigns, let us bring your vision to life
            in masterly monochrome.
          </p>
          <button
            type="button"
            onClick={onStartProject}
            className="cursor-pointer bg-white hover:bg-neutral-200 text-black font-display text-xs font-semibold tracking-[0.25em] uppercase px-10 py-4 transition-colors"
          >
            Submit Commission Brief
          </button>
        </div>
      </div>
    </div>
  );
};
