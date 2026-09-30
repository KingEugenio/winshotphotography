import React from 'react';
import { teamMembers } from '../../data/portfolioData';
import { Instagram, Mail } from 'lucide-react';

interface TeamViewProps {
  onContactTeam: () => void;
}

export const TeamView: React.FC<TeamViewProps> = ({ onContactTeam }) => {
  return (
    <div id="team-view-container" className="w-full bg-white text-black pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="font-display text-xs tracking-[0.3em] uppercase text-neutral-500">
            THE ATELIER
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.2em] uppercase text-black mt-2 mb-4">
            OUR STUDIO TEAM
          </h1>
          <div className="w-12 h-[2px] bg-black mx-auto mb-6" />
          <p className="text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed">
            A dedicated collective of photographers, master darkroom retouchers, digital technicians, and
            producers orchestrating museum-grade fashion productions across Paris and New York.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              id={`team-member-${member.id}`}
              className="group flex flex-col bg-neutral-50 border border-neutral-200 overflow-hidden"
            >
              <div className="aspect-[4/5] overflow-hidden bg-neutral-200 relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale contrast-110 group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3 text-white">
                  {member.social.instagram && (
                    <span className="p-2 bg-white/20 rounded-full hover:bg-white hover:text-black transition-colors">
                      <Instagram className="w-4 h-4" />
                    </span>
                  )}
                  {member.social.email && (
                    <span className="p-2 bg-white/20 rounded-full hover:bg-white hover:text-black transition-colors">
                      <Mail className="w-4 h-4" />
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-display text-sm font-bold tracking-widest uppercase text-black mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider mb-3">
                    {member.role}
                  </p>
                  <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Join our productions CTA */}
        <div className="text-center border-t border-neutral-200 pt-12">
          <p className="font-display text-xs tracking-[0.25em] uppercase text-neutral-600 mb-4">
            COLLABORATE WITH OUR PRODUCTION SQUAD
          </p>
          <button
            type="button"
            onClick={onContactTeam}
            className="cursor-pointer bg-black hover:bg-neutral-800 text-white font-display text-xs tracking-[0.25em] uppercase px-10 py-4 transition-colors"
          >
            Inquire For Direct Collaboration
          </button>
        </div>
      </div>
    </div>
  );
};
