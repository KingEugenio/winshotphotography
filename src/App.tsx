import React, { useState, useEffect } from 'react';
import { AdminApp } from './admin/AdminApp';
import { Header, ActiveNavTab } from './components/navigation/Header';
import { Footer } from './components/navigation/Footer';
import { Hero } from './components/home/Hero';
import { LatestWorks } from './components/home/LatestWorks';
import { NewsletterSection } from './components/home/NewsletterSection';
import { BottomFilmstrip } from './components/home/BottomFilmstrip';
import { PortfolioView } from './components/views/PortfolioView';
import { AboutView } from './components/views/AboutView';
import { PricingView } from './components/views/PricingView';
import { TeamView } from './components/views/TeamView';
import { ClientsView } from './components/views/ClientsView';
import { BlogView } from './components/views/BlogView';
import { ContactsView } from './components/views/ContactsView';
import { LightboxModal } from './components/lightbox/LightboxModal';
import { BookingModal } from './components/booking/BookingModal';
import { WhatsAppIcon } from './components/common/WhatsAppIcon';
import { latestWorksGrid, ReferenceWork, siteSettings } from './data/portfolioData';

function isAdminHash(): boolean {
  const h = window.location.hash.toLowerCase();
  return h === '#admin' || h === '#/admin' || h.startsWith('#admin/') || h.startsWith('#/admin');
}

export default function App() {
  const [isAdmin, setIsAdmin] = useState<boolean>(isAdminHash());

  useEffect(() => {
    const onHash = () => setIsAdmin(isAdminHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const [currentTab, setCurrentTab] = useState<ActiveNavTab>('HOME');
  const [aboutSubSection, setAboutSubSection] = useState<string | undefined>(undefined);
  const [selectedServiceForInquiry, setSelectedServiceForInquiry] = useState<string | undefined>(undefined);

  // Booking Modal State (Formspree + WhatsApp)
  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);
  const [bookingService, setBookingService] = useState<string | undefined>(undefined);
  const [bookingPackage, setBookingPackage] = useState<string | undefined>(undefined);

  // Lightbox modal state
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [currentLightboxWork, setCurrentLightboxWork] = useState<ReferenceWork | null>(null);
  const [currentLightboxIndex, setCurrentLightboxIndex] = useState<number>(0);
  const [allLightboxWorks, setAllLightboxWorks] = useState<ReferenceWork[]>(latestWorksGrid);

  const handleSelectTab = (tab: ActiveNavTab, subSection?: string) => {
    setCurrentTab(tab);
    setAboutSubSection(subSection);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenLightbox = (work: ReferenceWork, index: number, worksList: ReferenceWork[]) => {
    setCurrentLightboxWork(work);
    setCurrentLightboxIndex(index);
    setAllLightboxWorks(worksList);
    setLightboxOpen(true);
  };

  const handleOpenBookingModal = (service?: string, pkg?: string) => {
    setBookingService(service || 'Studio Portraiture');
    setBookingPackage(pkg);
    setBookingModalOpen(true);
  };

  const handleSelectPackage = (pkgTitle: string) => {
    handleOpenBookingModal('Commission Session', pkgTitle);
  };

  if (isAdmin) {
    return <AdminApp />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111111] antialiased selection:bg-black selection:text-white">
      {/* Fixed Minimalist Header with exact logo and navigation */}
      <Header
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        onOpenBooking={() => handleOpenBookingModal('General Session')}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {currentTab === 'HOME' && (
          <>
            {/* Hero Section matching screenshot */}
            <Hero
              onReadMore={() => {
                setCurrentTab('ABOUT');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExploreWorks={() => {
                setCurrentTab('PORTFOLIO');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* MY LATEST WORKS 12-image grid matching screenshot */}
            <LatestWorks onSelectImage={handleOpenLightbox} />

            {/* FOLLOW OUR UPDATES newsletter section matching screenshot */}
            <NewsletterSection />

            {/* Filmstrip row of monochrome portraits along bottom matching screenshot */}
            <BottomFilmstrip
              onSelectPortrait={(imageUrl, name) => {
                const workFound: ReferenceWork = {
                  id: 'portrait-' + name,
                  title: name.toUpperCase(),
                  subtitle: 'Studio Monochrome Portrait Series',
                  category: 'PORTRAIT',
                  year: '2025',
                  imageUrl,
                  aspectRatio: 'aspect-[3/4]',
                  exif: {
                    camera: 'Leica M11 Monochrom',
                    lens: '50mm f/1.4 Summilux',
                    aperture: 'f/2.0',
                    shutter: '1/250s',
                    iso: 'ISO 200',
                  },
                  description: `Editorial portrait of ${name} captured under focused studio key lighting.`,
                };
                setCurrentLightboxWork(workFound);
                setCurrentLightboxIndex(0);
                setAllLightboxWorks([workFound]);
                setLightboxOpen(true);
              }}
            />
          </>
        )}

        {currentTab === 'PORTFOLIO' && (
          <PortfolioView
            onSelectImage={handleOpenLightbox}
            onBookSession={() => handleOpenBookingModal('Portfolio Commission')}
          />
        )}

        {currentTab === 'ABOUT' && (
          <AboutView
            initialSubSection={aboutSubSection}
            onBookSession={() => handleOpenBookingModal('Editorial Portrait')}
            onViewPricing={() => {
              setCurrentTab('PRICING');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'PRICING' && (
          <PricingView
            onSelectPackage={(pkg) => handleSelectPackage(pkg.title)}
            onCustomInquiry={() => handleOpenBookingModal('Bespoke Proposal')}
          />
        )}

        {currentTab === 'TEAM' && (
          <TeamView
            onContactTeam={() => {
              setCurrentTab('CONTACTS');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'CLIENTS' && (
          <ClientsView
            onStartProject={() => {
              handleOpenBookingModal('Commercial Campaign');
            }}
          />
        )}

        {currentTab === 'BLOG' && <BlogView />}

        {currentTab === 'CONTACTS' && (
          <ContactsView initialService={selectedServiceForInquiry} />
        )}
      </main>

      {/* Global Minimalist Footer */}
      <Footer onNavigate={(tab) => handleSelectTab(tab)} />

      {/* Floating Instant WhatsApp Action Icon */}
      <aside aria-label="WhatsApp quick contact" className="fixed bottom-6 right-6 z-40 flex items-center">
        <a
          href={siteSettings.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Chat directly on WhatsApp"
          aria-label="Chat directly on WhatsApp"
          className="w-13 h-13 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 border border-emerald-400/30"
        >
          <WhatsAppIcon className="w-7 h-7 text-white" />
        </a>
      </aside>

      {/* Reusable Formspree & WhatsApp Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialService={bookingService}
        initialPackage={bookingPackage}
      />

      {/* Fullscreen High-Resolution Lightbox */}
      <LightboxModal
        isOpen={lightboxOpen}
        work={currentLightboxWork}
        currentIndex={currentLightboxIndex}
        allWorks={allLightboxWorks}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(newIdx) => {
          setCurrentLightboxIndex(newIdx);
          setCurrentLightboxWork(allLightboxWorks[newIdx]);
        }}
      />
    </div>
  );
}
