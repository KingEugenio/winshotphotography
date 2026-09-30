import {
  PortfolioProject,
  ServicePackage,
  ProcessStep,
  Testimonial,
  JournalArticle,
  FAQItem,
  SiteSettings,
  TeamMember,
  ClientPartner,
} from '../types';

// Factory defaults. Live edits from the admin portal are stored as an overlay
// in localStorage and merged on top at load time (see below).
export const baseSiteSettings: SiteSettings = {
  photographerName: 'WINSHOT PHOTOGRAPHY',
  brandTitle: 'WINSHOT PHOTOGRAPHY',
  tagline: 'WORLD CLASS PHOTOGRAPHY',
  statement:
    'Dive into amazing world of black-and-white photography full of emotions, feelings, beautiful faces and personalities. Enjoy this mixture of beauty and creativity!',
  serviceLocations: ['ACCRA', 'TORONTO', 'LONDON', 'NEW YORK', 'PARIS'],
  availabilityNotice: 'ACCEPTING PORTRAITURE, WEDDINGS & EDITORIAL COMMISSIONS',
  whatsappNumber: '0275261289',
  whatsappPrefillText:
    "Hello Winshot Photography, I would like to inquire about booking a session.",
  whatsappUrl:
    'https://wa.me/233275261289?text=Hello%20Winshot%20Photography%2C%20I%20would%20like%20to%20inquire%20about%20booking%20a%20photography%20session.',
  contactEmail: 'info@winshot.ca',
  phoneNumber: '0275261289',
  instagramHandle: '@winshot_photography',
  instagramUrl: 'https://www.instagram.com/winshot_photography?stkn=eWV0ajQydDI3cHI0',
  tiktokHandle: '@winshot74',
  tiktokUrl: 'https://www.tiktok.com/@winshot74?_r=1&_t=ZN-99fl5r6T1Yg',
  facebookHandle: '@winshot24',
  facebookUrl: 'https://www.facebook.com/winshot24',
  studioAddress: 'Winshot Photography Atelier // Greater Accra & International',
  primaryColor: '#1a1a1a',
  creatorStudio: 'MAKOR STUDIO',
  creatorInstagramUrl: 'https://www.instagram.com/makorstudio',
};

const SETTINGS_OVERLAY_KEY = 'eko_waas:winshot:settings_overlay';

export function loadSettingsOverlay(): Partial<SiteSettings> {
  try {
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(SETTINGS_OVERLAY_KEY) : null;
    return raw ? (JSON.parse(raw) as Partial<SiteSettings>) : {};
  } catch {
    return {};
  }
}

export function saveSettingsOverlay(overlay: Partial<SiteSettings>): void {
  try {
    localStorage.setItem(SETTINGS_OVERLAY_KEY, JSON.stringify(overlay));
  } catch (err) {
    console.error('Failed to save settings overlay', err);
  }
}

export function resetSettingsOverlay(): void {
  try {
    localStorage.removeItem(SETTINGS_OVERLAY_KEY);
  } catch {
    /* ignore */
  }
}

// Merged settings used across the whole site. Admin edits apply after reload.
export const siteSettings: SiteSettings = { ...baseSiteSettings, ...loadSettingsOverlay() };

// The exact 12 Black & White Fashion/Portrait photographs matching the reference image grid
export interface ReferenceWork {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  imageUrl: string;
  aspectRatio: string;
  exif: {
    camera: string;
    lens: string;
    aperture: string;
    shutter: string;
    iso: string;
  };
  description: string;
}

export const latestWorksGrid: ReferenceWork[] = [
  // Row 1
  {
    id: 'work-01',
    title: 'SILHOUETTE NO. 01',
    subtitle: 'Fine Art Studio Study',
    category: 'FINE ART',
    year: '2025',
    // Female side-profile sculptural pose
    imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop',
    aspectRatio: 'aspect-[3/4]',
    exif: {
      camera: 'Hasselblad 907X 50C',
      lens: 'XCD 65mm f/2.8',
      aperture: 'f/4.0',
      shutter: '1/160s',
      iso: 'ISO 100',
    },
    description: 'Sculptural exploration of light and shadow on human form against clean studio cyclorama.',
  },
  {
    id: 'work-02',
    title: 'SMOKE & ILLUSION',
    subtitle: 'Editorial Portrait with Cigar',
    category: 'PORTRAITURE',
    year: '2025',
    // Woman with head tilted back smoking cigar / cigarette with moody lighting
    imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1000&auto=format&fit=crop',
    aspectRatio: 'aspect-[3/4]',
    exif: {
      camera: 'Leica M11 Monochrom',
      lens: 'Noctilux-M 50mm f/0.95 ASPH',
      aperture: 'f/1.4',
      shutter: '1/320s',
      iso: 'ISO 400',
    },
    description: 'Cinematic study of motion and vapor using single parabolic reflector and hard rim light.',
  },
  {
    id: 'work-03',
    title: 'VINTAGE MINIMALISM',
    subtitle: 'Classic Fashion Swimwear Study',
    category: 'FASHION',
    year: '2025',
    // Blonde model in vintage white two-piece against neutral backdrop
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
    aspectRatio: 'aspect-[3/4]',
    exif: {
      camera: 'Leica MP Analog 35mm',
      lens: 'Summicron-M 35mm f/2',
      aperture: 'f/2.8',
      shutter: '1/500s',
      iso: 'Kodak Tri-X 400',
    },
    description: 'Mid-century editorial styling inspired by Richard Avedon and Peter Lindbergh.',
  },

  // Row 2
  {
    id: 'work-04',
    title: 'THE UNBUTTONED SHIRT',
    subtitle: 'Dynamic Movement & Contrast',
    category: 'EDITORIAL',
    year: '2025',
    // Woman in open white shirt and dark bra/top leaning
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop',
    aspectRatio: 'aspect-[3/4]',
    exif: {
      camera: 'Phase One IQ4 150MP',
      lens: 'Schneider Kreuznach 80mm LS',
      aperture: 'f/5.6',
      shutter: '1/250s',
      iso: 'ISO 50',
    },
    description: 'A study in high-key monochrome tonality with expressive gesture and crisp fabric texture.',
  },
  {
    id: 'work-05',
    title: 'URBAN REPOSE',
    subtitle: 'Menswear Studio Portrait',
    category: 'MENSWEAR',
    year: '2025',
    // Man sitting casually against textured wall in open shirt
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop',
    aspectRatio: 'aspect-[3/4]',
    exif: {
      camera: 'Contax 645 Medium Format',
      lens: 'Carl Zeiss Planar 80mm f/2',
      aperture: 'f/2.0',
      shutter: '1/125s',
      iso: 'Ilford HP5 Plus 400',
    },
    description: 'Relaxed menswear portrait capturing natural texture, bone structure, and effortless poise.',
  },
  {
    id: 'work-06',
    title: 'DEEP CONTEMPLATION',
    subtitle: 'Dramatic Beauty Close-Up',
    category: 'BEAUTY',
    year: '2025',
    // Woman looking down with hands clenched near chin
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop',
    aspectRatio: 'aspect-[3/4]',
    exif: {
      camera: 'Leica SL2-S',
      lens: 'APO-Summicron-SL 90mm f/2',
      aperture: 'f/2.5',
      shutter: '1/200s',
      iso: 'ISO 200',
    },
    description: 'Intense macro beauty portrait highlighting eyes, micro-texture, and dramatic chiaroscuro.',
  },

  // Row 3
  {
    id: 'work-07',
    title: 'THE WIDE-BRIM HAT',
    subtitle: 'High Fashion Silhouette',
    category: 'COUTURE',
    year: '2025',
    // Woman in wide-brim black hat and dramatic pose
    imageUrl: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1000&auto=format&fit=crop',
    aspectRatio: 'aspect-[3/4]',
    exif: {
      camera: 'Phase One XF',
      lens: '110mm f/2.8 Blue Ring',
      aperture: 'f/8.0',
      shutter: '1/160s',
      iso: 'ISO 100',
    },
    description: 'Graphic composition utilizing hard shadows and geometry of millinery couture.',
  },
  {
    id: 'work-08',
    title: 'GRACE & ALIGNMENT',
    subtitle: 'Fine Art Form Study',
    category: 'FINE ART',
    year: '2025',
    // Woman with arms crossed gracefully across chest
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop',
    aspectRatio: 'aspect-[3/4]',
    exif: {
      camera: 'Hasselblad 503CW Analog',
      lens: 'Zeiss Sonnar 150mm f/4',
      aperture: 'f/5.6',
      shutter: '1/125s',
      iso: 'Fuji Neopan 100 Acros',
    },
    description: 'Delicate anatomical lighting sculpting muscular curves and gentle skin gradient.',
  },
  {
    id: 'work-09',
    title: 'STUDIO CORNER',
    subtitle: 'Casual Modern Editorial',
    category: 'EDITORIAL',
    year: '2025',
    // Woman in dark sunglasses and shorts sitting on floor in corner
    imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000&auto=format&fit=crop',
    aspectRatio: 'aspect-[3/4]',
    exif: {
      camera: 'Leica M11',
      lens: 'Summilux-M 28mm f/1.4',
      aperture: 'f/2.8',
      shutter: '1/250s',
      iso: 'ISO 400',
    },
    description: 'Spontaneous backstage atmosphere capturing effortless street-meets-studio attitude.',
  },

  // Row 4
  {
    id: 'work-10',
    title: 'THE OBSERVER',
    subtitle: 'Winshot Signature Portrait',
    category: 'PORTRAIT',
    year: '2025',
    // Woman holding vintage camera up to chest / looking into lens (matches hero)
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop',
    aspectRatio: 'aspect-[3/4]',
    exif: {
      camera: 'Leica M10 Monochrom',
      lens: 'Summilux 35mm f/1.4',
      aperture: 'f/1.4',
      shutter: '1/500s',
      iso: 'ISO 800',
    },
    description: 'The photographer as subject: exploring the reciprocal gaze through medium format glass.',
  },
  {
    id: 'work-11',
    title: 'MONOCHROME REBEL',
    subtitle: 'Portrait in Smoke and Shades',
    category: 'MENSWEAR',
    year: '2025',
    // Bearded man with sunglasses and cigarette/smoke in patterned shirt
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop',
    aspectRatio: 'aspect-[3/4]',
    exif: {
      camera: 'Canon EOS R5 (BW Conversion)',
      lens: 'RF 50mm f/1.2L USM',
      aperture: 'f/2.0',
      shutter: '1/400s',
      iso: 'ISO 200',
    },
    description: 'Atmospheric menswear editorial exploring rugged textures and diffuse atmospheric haze.',
  },
  {
    id: 'work-12',
    title: 'THE SERENE GAZE',
    subtitle: 'Classic Fashion Portraiture',
    category: 'BEAUTY',
    year: '2025',
    // High-fashion woman with sleek hair looking intently forward
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop',
    aspectRatio: 'aspect-[3/4]',
    exif: {
      camera: 'Phase One IQ4',
      lens: 'Schneider Kreuznach 150mm',
      aperture: 'f/4.5',
      shutter: '1/200s',
      iso: 'ISO 100',
    },
    description: 'Pure, timeless studio portraiture rendered in silver-toned gradations and razor sharpness.',
  },
];

// Additional works loaded when user clicks "LOAD MORE"
export const additionalWorksGrid: ReferenceWork[] = [
  {
    id: 'work-13',
    title: 'THE ARCHITECTURAL COLLAR',
    subtitle: 'High Collar Tailoring',
    category: 'FASHION',
    year: '2025',
    imageUrl: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=1000&auto=format&fit=crop',
    aspectRatio: 'aspect-[3/4]',
    exif: {
      camera: 'Leica M11',
      lens: '50mm f/1.4',
      aperture: 'f/2.0',
      shutter: '1/250s',
      iso: 'ISO 200',
    },
    description: 'Bold geometric silhouette exploring stark structural tailoring.',
  },
  {
    id: 'work-14',
    title: 'MIRROR REFLECTIONS',
    subtitle: 'Prism & Double Exposure',
    category: 'EXPERIMENTAL',
    year: '2025',
    imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop',
    aspectRatio: 'aspect-[3/4]',
    exif: {
      camera: 'Hasselblad 907X',
      lens: '45mm f/4',
      aperture: 'f/4.0',
      shutter: '1/160s',
      iso: 'ISO 100',
    },
    description: 'Analog reflection techniques using precision studio front-surface mirrors.',
  },
  {
    id: 'work-15',
    title: 'PARISIAN DAWN',
    subtitle: 'Haute Couture On Location',
    category: 'COUTURE',
    year: '2025',
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000&auto=format&fit=crop',
    aspectRatio: 'aspect-[3/4]',
    exif: {
      camera: 'Leica MP Analog',
      lens: '35mm Summilux',
      aperture: 'f/2.8',
      shutter: '1/500s',
      iso: 'Kodak T-Max 400',
    },
    description: 'Early morning light washing over marble colonnades in the Place Vendôme.',
  },
  {
    id: 'work-16',
    title: 'THE TEXTILE SCULPTURE',
    subtitle: 'Pleats & Drape in Monochrome',
    category: 'EDITORIAL',
    year: '2025',
    imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop',
    aspectRatio: 'aspect-[3/4]',
    exif: {
      camera: 'Phase One IQ4',
      lens: '80mm LS',
      aperture: 'f/8.0',
      shutter: '1/200s',
      iso: 'ISO 50',
    },
    description: 'Microscopic fabric detail rendered with 151-megapixel dynamic range.',
  },
  {
    id: 'work-17',
    title: 'STEEL HORIZONS',
    subtitle: 'Brutalist Fashion Narrative',
    category: 'MENSWEAR',
    year: '2025',
    imageUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=1000&auto=format&fit=crop',
    aspectRatio: 'aspect-[3/4]',
    exif: {
      camera: 'Leica M11 Monochrom',
      lens: '35mm f/2',
      aperture: 'f/4.0',
      shutter: '1/1000s',
      iso: 'ISO 400',
    },
    description: 'High-contrast industrial fashion study against brutalist concrete structures.',
  },
  {
    id: 'work-18',
    title: 'THE TIMELESS PROFILE',
    subtitle: 'Pure Form and Shadow',
    category: 'FINE ART',
    year: '2025',
    imageUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=1000&auto=format&fit=crop',
    aspectRatio: 'aspect-[3/4]',
    exif: {
      camera: 'Hasselblad 503CW',
      lens: '120mm Makro-Planar',
      aperture: 'f/5.6',
      shutter: '1/125s',
      iso: 'Ilford Delta 100',
    },
    description: 'A study in classical Renaissance proportions translated into twentieth-century film.',
  },
];

// Bottom strip portraits matching the bottom of the reference image
export const filmstripPortraits = [
  {
    id: 'strip-1',
    name: 'Julian Vance',
    role: 'Editorial Model',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: 'strip-2',
    name: 'Astrid Lindholm',
    role: 'Runway Model // Paris',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: 'strip-3',
    name: 'Camille Laurent',
    role: 'Couture Subject',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: 'strip-4',
    name: 'Nadia Rostova',
    role: 'Beauty Face // Vogue',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: 'strip-5',
    name: 'Eleanor Sterling',
    role: 'Vintage Fashion Icon',
    imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: 'strip-6',
    name: 'Chloe Mercer',
    role: 'Editorial Talent',
    imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: 'strip-7',
    name: 'Marcus Thorne',
    role: 'Musician & Subject',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: 'strip-8',
    name: 'Seraphina Holt',
    role: 'High Fashion Muse',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=500&auto=format&fit=crop',
  },
];

// Team Members for the TEAM page
export const teamMembers: TeamMember[] = [
  {
    id: 'team-1',
    name: 'WINSTON MBAJEKWE',
    role: 'Founder, Principal Photographer & Creative Director',
    bio: 'Founder and Creative Director of Winshot Photography. Renowned for capturing timeless memories, emotive portraits, weddings, and editorial campaigns with striking lighting and clean compositions.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop',
    social: {
      instagram: '@winshot_photography',
      email: 'info@winshot.ca',
    },
  },
  {
    id: 'team-2',
    name: 'ELENA VANCE',
    role: 'First Assistant & Digital Technician',
    bio: 'Specialist in high-speed capture, Broncolor lighting systems, and live tethered workflow for international fashion weeks.',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop',
    social: {
      instagram: '@elenavance.photo',
    },
  },
  {
    id: 'team-3',
    name: 'MARCUS THORNE',
    role: 'Master Retoucher & Archival Printmaker',
    bio: 'Over fifteen years in darkroom silver-gelatin printing and 16-bit non-destructive retouching for luxury houses and museum archives.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop',
    social: {
      instagram: '@marcusthorne.retouch',
    },
  },
  {
    id: 'team-4',
    name: 'SOPHIE DUBOIS',
    role: 'Senior Producer & Wardrobe Lead',
    bio: 'Coordinates casting, location permits, customs clearances, and bespoke production sets across Europe, North America, and Japan.',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop',
    social: {
      instagram: '@sophiedubois.prod',
    },
  },
];

// Pricing Packages for the PRICING page
export const servicePackages: ServicePackage[] = [
  {
    id: 'pkg-portrait',
    title: 'PRIVATE PORTRAIT SESSION',
    tier: 'ESSENTIAL',
    subtitle: 'Personal & Professional Black & White Study',
    description:
      'A relaxed, intimate studio session designed to capture genuine emotion, personal presence, and timeless fine-art black-and-white portraits.',
    targetAudience: 'Artists, actors, executives, and individuals seeking museum-grade personal portraits.',
    approach: 'Natural daylight and subtle parabolic fill in our Chelsea or Paris studio.',
    startingPrice: '$1,800 USD',
    priceNote: 'Includes 2 hours in-studio with full hair & makeup direction.',
    duration: '2 Hours Studio',
    deliverables: [
      '15 Master retouched high-resolution monochrome exposures',
      'Full personal usage and archival rights',
      'One museum-grade 16x20 inch silver-gelatin fine art print',
      'Private online preview gallery within 48 hours',
    ],
    addOns: [
      { name: 'Additional location shoot', price: '+$600' },
      { name: 'Framed 24x36 gallery print', price: '+$850' },
      { name: 'Rush delivery within 24 hours', price: '+$400' },
    ],
    featuredImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop',
    barcode: 'PKG-PORTRAIT-2025',
  },
  {
    id: 'pkg-editorial',
    title: 'EDITORIAL LOOKBOOK',
    tier: 'CAMPAIGN',
    subtitle: 'High-Fashion Capsule Collection',
    description:
      'Engineered for independent designers and luxury fashion labels. Dynamic lighting, surgical texture separation, and compelling editorial storytelling.',
    targetAudience: 'Fashion brands, lookbook drops, accessory designers, and model portfolios.',
    approach: 'Tethered live digital workflow with real-time client monitor and on-set grading.',
    startingPrice: '$4,500 USD',
    priceNote: 'Full-day studio or on-location production.',
    duration: 'Half or Full Day',
    deliverables: [
      'Up to 12 styled looks / garments',
      '40 Master retouched 16-bit TIFF and JPEG files',
      'Full commercial and global digital licensing rights',
      'Dedicated digital tech and assistant on set',
      'Color-calibrated contact sheets for press releases',
    ],
    addOns: [
      { name: 'Fashion video / BTS reels (4K ProRes)', price: '+$1,500' },
      { name: 'Wardrobe stylist on set', price: '+$950' },
      { name: 'Extended global billboard rights', price: '+$2,200' },
    ],
    featuredImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
    barcode: 'PKG-LOOKBOOK-2025',
  },
  {
    id: 'pkg-commercial',
    title: 'GLOBAL CAMPAIGN & RUNWAY',
    tier: 'BESPOKE',
    subtitle: 'International Brand Advertising',
    description:
      'Comprehensive multi-day production for international fashion houses, cosmetics campaigns, and Paris / New York / Milan Fashion Week backstage and runway.',
    targetAudience: 'Global brands, advertising agencies, major fashion houses, and editorial covers.',
    approach: 'Full camera and lighting retinue with Medium Format Phase One 150MP capture.',
    startingPrice: '$12,000 USD',
    priceNote: 'Custom proposal tailored to project scope and worldwide licensing.',
    duration: 'Multi-Day / International',
    deliverables: [
      'Phase One 150-Megapixel raw digital assets',
      'Unlimited looks across multiple indoor and outdoor setups',
      'Complete creative direction, casting, and location scouting',
      'Unrestricted worldwide multi-year advertising buyout',
      'Same-day live press dispatch for fashion week publications',
    ],
    addOns: [
      { name: 'Dual-city shoot (NYC + Paris)', price: 'Custom' },
      { name: 'Archival hardcover monograph book', price: '+$2,500' },
      { name: 'Live streaming client review bridge', price: 'Included' },
    ],
    featuredImage: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=800&auto=format&fit=crop',
    barcode: 'PKG-CAMPAIGN-2025',
  },
];

// Prestigious Clients for the CLIENTS page
export const clientPartners: ClientPartner[] = [
  {
    id: 'cl-1',
    name: 'VOGUE ITALIA',
    category: 'Editorial Cover & Feature',
    quote: 'Anna Solas brings an intoxicating stillness and tactile majesty to the monochrome medium.',
    logoText: 'VOGUE',
  },
  {
    id: 'cl-2',
    name: "HARPER'S BAZAAR",
    category: 'Fashion Week Retrospective',
    quote: 'Her images transcend seasonal trends, possessing the gravitas of mid-century masters.',
    logoText: "HARPER'S BAZAAR",
  },
  {
    id: 'cl-3',
    name: 'SAINT LAURENT',
    category: 'Winter Campaign Lookbook',
    quote: 'Uncompromising precision in line, silhouette, and shadow.',
    logoText: 'SAINT LAURENT',
  },
  {
    id: 'cl-4',
    name: 'ACNE STUDIOS',
    category: 'Capsule Collection Campaign',
    quote: 'The textures of our wools and raw leathers have never felt so palpable in two dimensions.',
    logoText: 'ACNE STUDIOS',
  },
  {
    id: 'cl-5',
    name: 'ELLE FRANCE',
    category: 'Portrait Series',
    quote: 'An intimate, authentic masterclass in contemporary portraiture.',
    logoText: 'ELLE',
  },
  {
    id: 'cl-6',
    name: 'DAZED & CONFUSED',
    category: 'Underground Youth Special',
    quote: 'Capturing the raw electricity of youth rebellion with surgical optical elegance.',
    logoText: 'DAZED',
  },
];

// Blog Articles for the BLOG page
export const blogArticles: JournalArticle[] = [
  {
    id: 'blog-1',
    slug: 'the-alchemy-of-monochrome',
    title: 'THE ALCHEMY OF MONOCHROME: BEYOND COLOR',
    subtitle: 'Why stripping away chroma reveals the psychological core of the subject.',
    category: 'ESSAY',
    date: 'OCTOBER 14, 2025',
    readTime: '6 MIN READ',
    coverImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop',
    excerpt:
      'Color describes the outward clothes of a person; black and white describes the soul beneath. An exploration of tonal range, Ansel Adams’ Zone System, and modern sensor dynamics.',
    content: [
      'When color is removed from a frame, the brain stops decoding hue comparisons and begins interpreting pure geometry, texture, and emotional resonance.',
      'In our studio sessions, whether using a 35mm Leica rangefinder or a 150-megapixel Phase One back, we construct lighting not around chromatic temperatures, but around the fall-off rate of specular highlights into velvety shadows.',
      'Black and white is not an absence of color. It is an intentional, heightened language where gray tones carry psychological weight.',
    ],
    tags: ['MONOCHROME', 'ZONE SYSTEM', 'STUDIO LIGHTING'],
    barcode: 'DISPATCH-2025-01',
  },
  {
    id: 'blog-2',
    slug: 'analog-halides-vs-150mp-sensors',
    title: 'GRAIN VS PIXELS: THE CONTINUING CONVERSATION',
    subtitle: 'Working with Leica M11 Monochrom and Silver-Gelatin Tri-X 400 in tandem.',
    category: 'EQUIPMENT',
    date: 'NOVEMBER 02, 2025',
    readTime: '8 MIN READ',
    coverImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop',
    excerpt:
      'A technical side-by-side comparison of physical silver halide crystallization versus modern monochrome silicon sensor architecture.',
    content: [
      'The modern Leica Monochrom sensor contains no color filter array (CFA). Without the Bayer interpolation pattern, every single pixel records raw luminance with extraordinary micro-contrast and acute edge definition.',
      'Yet there remains an intangible magic in physical gelatin silver emulsions. The random distribution of silver bromide grains gives organic life to subtle transitions in skin tones that digital mathematics can only emulate.',
      'For our flagship museum commissions, we often shoot both formats simultaneously, fusing the sharpness of digital optics with the soul of chemical darkroom prints.',
    ],
    tags: ['LEICA', 'DARKROOM', 'HASSELBLAD', 'ANALOG'],
    barcode: 'DISPATCH-2025-02',
  },
  {
    id: 'blog-3',
    slug: 'sculpting-with-parabolic-reflectors',
    title: 'THE GEOMETRY OF LIGHT: PARABOLIC PRECISION',
    subtitle: 'How a 133cm parabolic reflector creates three-dimensional depth on a two-dimensional plane.',
    category: 'TECHNIQUE',
    date: 'DECEMBER 19, 2025',
    readTime: '5 MIN READ',
    coverImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop',
    excerpt:
      'Understanding focus positions inside deep parabolic umbrellas to wrap light around bone structure and high-fashion textiles.',
    content: [
      'A true parabolic reflector allows the light source to be moved along the optical central axis. When focused, it produces a parallel beam that yields crisp specular details alongside gentle wrap-around gradients.',
      'This single modifier has become our studio signature. It illuminates couture fabrics with tactile depth while sculpting the jawlines and collarbones of our subjects without harsh fall-off.',
    ],
    tags: ['STUDIO LIGHTING', 'BRONCOLOR', 'PORTRAITURE'],
    barcode: 'DISPATCH-2025-03',
  },
];

// FAQs for the CONTACT / INFO section
export const faqItems: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'WHERE IS WINSHOT PHOTOGRAPHY BASED AND DO YOU TRAVEL?',
    answer:
      'Winshot Photography is based in Greater Accra with international projects across Toronto, London, Paris, and worldwide destinations. We regularly travel for destination weddings, fashion campaigns, and private portrait bookings.',
    category: 'TRAVEL',
  },
  {
    id: 'faq-2',
    question: 'WHAT IS THE TYPICAL TURNAROUND TIME FOR EDITED ASSETS?',
    answer:
      'An online watermarked preview gallery of unedited proofs is delivered within 48 hours of the shoot. Once final selects are confirmed by your team, fully retouched high-resolution 16-bit master files are delivered within 7 to 10 business days.',
    category: 'DELIVERY',
  },
  {
    id: 'faq-3',
    question: 'CAN COMMERCIAL LICENSING BE TAILORED FOR GLOBAL CAMPAIGNS?',
    answer:
      'Yes. All our commercial and lookbook packages include standard editorial and digital usage. For global billboards, print advertising, and worldwide seasonal campaigns, we provide clear, straightforward buyout contracts tailored to your campaign duration and territories.',
    category: 'BOOKING',
  },
  {
    id: 'faq-4',
    question: 'DO YOU PROVIDE FULL PRODUCTION SERVICES INCLUDING CASTING AND STYLING?',
    answer:
      'Yes. Our senior production team can handle full-service logistics including talent casting, agency booking, wardrobe styling, hair and makeup artists, location permits, and set construction.',
    category: 'PRODUCTION',
  },
];

// Rich Portfolio works categorized for Wedding, Portrait, Fashion, Event, Commercial
export const defaultPortfolioWorks: ReferenceWork[] = [
  // --- WEDDINGS & BRIDAL ---
  {
    id: 'port-w1',
    title: 'THE GOLDEN VOWS',
    subtitle: 'Luxury Cathedral Nuptials',
    category: 'WEDDING',
    year: '2025',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
    aspectRatio: 'aspect-[3/4]',
    exif: {
      camera: 'Sony A1',
      lens: 'FE 50mm f/1.2 GM',
      aperture: 'f/1.4',
      shutter: '1/800s',
      iso: 'ISO 100',
    },
    description: 'Breathtaking bridal veil catch amidst sunlight streaming into the cathedral nave in Accra.',
  },
  {
    id: 'port-w2',
    title: 'ETERNAL EMBRACE',
    subtitle: 'Private Sunset Estate Vows',
    category: 'WEDDING',
    year: '2025',
    imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop',
    aspectRatio: 'aspect-[3/4]',
    exif: {
      camera: 'Hasselblad H6D-100c',
      lens: 'HC 100mm f/2.2',
      aperture: 'f/2.2',
      shutter: '1/400s',
      iso: 'ISO 64',
    },
    description: 'Intimate sunset bridal couple portrait celebrating classic tailoring and delicate lace embroidery.',
  },
  {
    id: 'port-w3',
    title: 'THE BRIDAL GLOW',
    subtitle: 'Morning Prep & High-Jewelry',
    category: 'WEDDING',
    year: '2024',
    imageUrl: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1200&auto=format&fit=crop',
    aspectRatio: 'aspect-[3/4]',
    exif: {
      camera: 'Leica SL2',
      lens: 'APO-Summicron-SL 75mm f/2',
      aperture: 'f/2.0',
      shutter: '1/250s',
      iso: 'ISO 200',
    },
    description: 'Capturing the serenity of the bride before the walk down the aisle with natural window light.',
  },
  {
    id: 'port-w4',
    title: 'CELEBRATORY PROCESSION',
    subtitle: 'Grand Ballroom Reception',
    category: 'WEDDING',
    year: '2024',
    imageUrl: 'https://images.unsplash.com/photo-1519225429980-715cb0215aed?q=80&w=1200&auto=format&fit=crop',
    aspectRatio: 'aspect-[3/4]',
    exif: {
      camera: 'Canon EOS R5',
      lens: 'RF 28-70mm f/2L USM',
      aperture: 'f/2.0',
      shutter: '1/320s',
      iso: 'ISO 800',
    },
    description: 'Dynamic reception entrance with sparkling fireworks and spontaneous joy.',
  },

  // --- PORTRAITS & HEADSHOTS ---
  {
    id: 'port-p1',
    title: 'THE OBSERVER',
    subtitle: 'Fine Art Studio Visage',
    category: 'PORTRAIT',
    year: '2025',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop',
    aspectRatio: 'aspect-[3/4]',
    exif: {
      camera: 'Leica M11 Monochrom',
      lens: 'Noctilux-M 50mm f/0.95',
      aperture: 'f/1.2',
      shutter: '1/500s',
      iso: 'ISO 125',
    },
    description: 'High-contrast studio portrait emphasizing natural facial geometry and intense emotional presence.',
  },
  {
    id: 'port-p2',
    title: 'URBAN NOCTURNE',
    subtitle: 'Editorial Menswear Portrait',
    category: 'PORTRAIT',
    year: '2025',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop',
    aspectRatio: 'aspect-[3/4]',
    exif: {
      camera: 'Sony A7R V',
      lens: 'FE 85mm f/1.4 GM II',
      aperture: 'f/1.4',
      shutter: '1/200s',
      iso: 'ISO 160',
    },
    description: 'Tailored menswear portrait with deep shadows and clean edge rim lighting.',
  },
  {
    id: 'port-p3',
    title: 'STUDIO SCULPTURE',
    subtitle: 'Classic Profile Study',
    category: 'PORTRAIT',
    year: '2024',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop',
    aspectRatio: 'aspect-[3/4]',
    exif: {
      camera: 'Phase One IQ4 150MP',
      lens: 'Schneider Kreuznach 110mm LS',
      aperture: 'f/4.5',
      shutter: '1/250s',
      iso: 'ISO 50',
    },
    description: 'Sharp studio profile displaying authentic skin texture and confident composure.',
  },
  {
    id: 'port-p4',
    title: 'SILENT MEDITATION',
    subtitle: 'Cinematic Beauty Close-Up',
    category: 'PORTRAIT',
    year: '2024',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop',
    aspectRatio: 'aspect-[3/4]',
    exif: {
      camera: 'Hasselblad X2D 100C',
      lens: 'XCD 90mm f/2.5 V',
      aperture: 'f/2.5',
      shutter: '1/160s',
      iso: 'ISO 100',
    },
    description: 'Close-up beauty examination exploring emotional vulnerability through single key-light focus.',
  },

  // --- FASHION & EDITORIAL ---
  {
    id: 'port-f1',
    title: 'AVANT COUTURE',
    subtitle: 'Paris Editorial Series',
    category: 'FASHION',
    year: '2025',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop',
    aspectRatio: 'aspect-[3/4]',
    exif: {
      camera: 'Phase One IQ4',
      lens: 'Schneider Kreuznach 80mm',
      aperture: 'f/5.6',
      shutter: '1/250s',
      iso: 'ISO 50',
    },
    description: 'Monochrome haute couture editorial combining bold angles, crisp tailoring, and clean studio space.',
  },
  {
    id: 'port-f2',
    title: 'RUNWAY VISION',
    subtitle: 'Streetwear & High-Fashion Lookbook',
    category: 'FASHION',
    year: '2025',
    imageUrl: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1200&auto=format&fit=crop',
    aspectRatio: 'aspect-[3/4]',
    exif: {
      camera: 'Canon R5',
      lens: 'RF 50mm f/1.2L',
      aperture: 'f/1.8',
      shutter: '1/1000s',
      iso: 'ISO 200',
    },
    description: 'Vibrant modern streetwear lookbook shot on location in Osu, Accra.',
  },
  {
    id: 'port-f3',
    title: 'MINIMAL DRAPE',
    subtitle: 'Textile Movement & Structure',
    category: 'FASHION',
    year: '2024',
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop',
    aspectRatio: 'aspect-[3/4]',
    exif: {
      camera: 'Sony A1',
      lens: 'FE 24-70mm f/2.8 GM II',
      aperture: 'f/4.0',
      shutter: '1/500s',
      iso: 'ISO 100',
    },
    description: 'Fluid silk movement frozen at 1/500s with studio parabolic fill.',
  },

  // --- EVENTS & CELEBRATIONS ---
  {
    id: 'port-e1',
    title: 'GOLD COAST GALA',
    subtitle: 'Annual Cultural Philanthropy Soirée',
    category: 'EVENT',
    year: '2025',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop',
    aspectRatio: 'aspect-[3/4]',
    exif: {
      camera: 'Nikon Z9',
      lens: 'NIKKOR Z 24-70mm f/2.8 S',
      aperture: 'f/2.8',
      shutter: '1/200s',
      iso: 'ISO 1600',
    },
    description: 'Black-tie gala capturing keynote speeches, VIP arrivals, and candid high-society interactions.',
  },
  {
    id: 'port-e2',
    title: 'MIDNIGHT CHAMPAGNE',
    subtitle: 'Luxury Rooftop Celebration',
    category: 'EVENT',
    year: '2024',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop',
    aspectRatio: 'aspect-[3/4]',
    exif: {
      camera: 'Sony A7S III',
      lens: 'FE 35mm f/1.4 GM',
      aperture: 'f/1.4',
      shutter: '1/160s',
      iso: 'ISO 2500',
    },
    description: 'Atmospheric nightlife and celebratory toast overlooking the sparkling city skyline.',
  },

  // --- COMMERCIAL & BRAND ---
  {
    id: 'port-c1',
    title: 'PRECISION HOROLOGY',
    subtitle: 'Swiss Timepiece Campaign',
    category: 'COMMERCIAL',
    year: '2025',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop',
    aspectRatio: 'aspect-[3/4]',
    exif: {
      camera: 'Hasselblad H6D',
      lens: 'Macro 120mm f/4 II',
      aperture: 'f/11',
      shutter: '1/125s',
      iso: 'ISO 64',
    },
    description: 'Macro commercial still life with cross-polarized light showing brushed titanium finish.',
  },
  {
    id: 'port-c2',
    title: 'ATELIER RETAIL LOOKBOOK',
    subtitle: 'Luxury Fashion House Campaign',
    category: 'COMMERCIAL',
    year: '2024',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop',
    aspectRatio: 'aspect-[3/4]',
    exif: {
      camera: 'Phase One IQ3 100MP',
      lens: 'Schneider Kreuznach 55mm LS',
      aperture: 'f/8.0',
      shutter: '1/125s',
      iso: 'ISO 50',
    },
    description: 'Architectural flagship store lookbook showcasing bespoke interior design and garment displays.',
  },
];

// Helper to get portfolio works merging defaults with any custom added works from localStorage
export const getLocalPortfolioWorks = (): ReferenceWork[] => {
  try {
    const saved = localStorage.getItem('winshot_custom_portfolio');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return [...parsed, ...defaultPortfolioWorks];
      }
    }
  } catch (err) {
    console.error('Error loading custom portfolio items:', err);
  }
  return defaultPortfolioWorks;
};

// Helper to add a new custom work
export const saveLocalPortfolioWork = (newWork: ReferenceWork): ReferenceWork[] => {
  try {
    const saved = localStorage.getItem('winshot_custom_portfolio');
    const current: ReferenceWork[] = saved ? JSON.parse(saved) : [];
    const updated = [newWork, ...current];
    localStorage.setItem('winshot_custom_portfolio', JSON.stringify(updated));
    return [...updated, ...defaultPortfolioWorks];
  } catch (err) {
    console.error('Error saving portfolio item:', err);
    return [newWork, ...defaultPortfolioWorks];
  }
};

