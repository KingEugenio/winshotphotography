import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { WhatsAppIcon } from '../common/WhatsAppIcon';
import { siteSettings } from '../../data/portfolioData';

export type ActiveNavTab = 'HOME' | 'PORTFOLIO' | 'ABOUT' | 'PRICING' | 'TEAM' | 'CLIENTS' | 'BLOG' | 'CONTACTS';

interface HeaderProps {
  currentTab: ActiveNavTab;
  onSelectTab: (tab: ActiveNavTab, subSection?: string) => void;
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onSelectTab, onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; tab: ActiveNavTab; hasDropdown?: boolean }[] = [
    { label: 'HOME', tab: 'HOME' },
    { label: 'PORTFOLIO', tab: 'PORTFOLIO' },
    { label: 'ABOUT', tab: 'ABOUT', hasDropdown: true },
    { label: 'PRICING', tab: 'PRICING' },
    { label: 'TEAM', tab: 'TEAM' },
    { label: 'CLIENTS', tab: 'CLIENTS' },
    { label: 'BLOG', tab: 'BLOG' },
    { label: 'CONTACTS', tab: 'CONTACTS' },
  ];

  const handleNavClick = (tab: ActiveNavTab, subSection?: string) => {
    onSelectTab(tab, subSection);
    setMobileMenuOpen(false);
    setAboutDropdownOpen(false);
  };

  return (
    <header
      id="main-site-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/95 backdrop-blur-md py-3 shadow-md border-b border-white/10'
          : 'bg-gradient-to-b from-black/85 via-black/50 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Brand Logo: WINSHOT PHOTOGRAPHY */}
        <div
          id="brand-signature-logo"
          onClick={() => handleNavClick('HOME')}
          className="cursor-pointer group flex items-center justify-center select-none mb-3 transition-opacity duration-200 hover:opacity-90 space-x-2.5 px-10 md:px-0"
        >
          <span className="font-display font-light text-white text-base sm:text-lg tracking-[0.3em] transition-colors">
            WINSHOT
          </span>
          <span className="font-display font-light text-white text-base sm:text-lg tracking-[0.3em] transition-colors">
            PHOTOGRAPHY
          </span>
        </div>

        {/* Desktop Navigation Menu (Directly below the logo) */}
        <nav
          id="desktop-navigation-menu"
          aria-label="Main Navigation"
          className="hidden md:flex items-center space-x-7 lg:space-x-10 text-xs tracking-[0.2em] font-display font-medium text-white/90"
        >
          {navItems.map((item) => {
            const isActive = currentTab === item.tab;

            if (item.hasDropdown) {
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setAboutDropdownOpen(true)}
                  onMouseLeave={() => setAboutDropdownOpen(false)}
                >
                  <button
                    id={`nav-item-${item.label.toLowerCase()}`}
                    type="button"
                    onClick={() => handleNavClick('ABOUT', 'biography')}
                    className={`flex items-center space-x-1 py-1 transition-colors duration-200 uppercase cursor-pointer ${
                      isActive ? 'text-white font-semibold' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className="w-3 h-3 text-white/70 transition-transform duration-200 group-hover:rotate-180" />
                  </button>

                  {/* Dropdown Menu */}
                  {aboutDropdownOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-44 bg-[#1a1a1a] border border-white/15 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                      <button
                        type="button"
                        onClick={() => handleNavClick('ABOUT', 'biography')}
                        className="w-full text-left px-4 py-2 text-xs tracking-wider text-white/80 hover:text-white hover:bg-white/10 uppercase transition-colors"
                      >
                        Biography
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNavClick('ABOUT', 'vision')}
                        className="w-full text-left px-4 py-2 text-xs tracking-wider text-white/80 hover:text-white hover:bg-white/10 uppercase transition-colors"
                      >
                        Our Vision
                      </button>
                      <button
                        type="button"
                        onClick={() => handleNavClick('ABOUT', 'exhibitions')}
                        className="w-full text-left px-4 py-2 text-xs tracking-wider text-white/80 hover:text-white hover:bg-white/10 uppercase transition-colors"
                      >
                        Exhibitions
                      </button>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={item.label}
                id={`nav-item-${item.label.toLowerCase()}`}
                type="button"
                onClick={() => handleNavClick(item.tab)}
                className={`py-1 transition-colors duration-200 uppercase cursor-pointer relative ${
                  isActive ? 'text-white font-semibold' : 'text-white/80 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-white rounded-full"></span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Desktop Quick Actions */}
        <div className="hidden md:flex items-center space-x-3 absolute right-6 top-5">
          <a
            href={siteSettings.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Chat directly on WhatsApp"
            aria-label="Chat directly on WhatsApp"
            className="w-8 h-8 rounded-full bg-emerald-600/90 hover:bg-emerald-500 text-white flex items-center justify-center transition-all duration-200 backdrop-blur-xs shadow-xs hover:scale-105"
          >
            <WhatsAppIcon className="w-4 h-4" />
          </a>
          <button
            type="button"
            onClick={onOpenBooking}
            className="border border-white/40 hover:border-white hover:bg-white hover:text-black text-white px-3.5 py-1.5 text-[10px] font-display uppercase tracking-[0.2em] transition-colors cursor-pointer"
          >
            Book Session
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden absolute right-4 top-4">
          <button
            id="mobile-menu-toggle-button"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 text-white hover:text-white/80 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="md:hidden bg-black/95 border-b border-white/10 px-6 py-6 space-y-4 text-center font-display tracking-[0.2em] text-sm text-white"
        >
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handleNavClick(item.tab)}
              className={`block w-full py-2 uppercase transition-colors ${
                currentTab === item.tab ? 'text-white font-bold underline underline-offset-8' : 'text-white/70 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 border-t border-white/15 space-y-2">
            <a
              href={siteSettings.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center space-x-2 bg-emerald-600 text-white font-semibold uppercase text-xs tracking-widest py-3 hover:bg-emerald-700 transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full bg-white text-black font-semibold uppercase text-xs tracking-widest py-3 hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              Book A Session
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
