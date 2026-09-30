export type PortfolioCategory =
  | 'ALL'
  | 'STREETWEAR'
  | 'EDITORIAL'
  | 'UNDERGROUND'
  | 'PORTRAITS'
  | 'CAMPAIGN';

export interface ExifData {
  camera: string;
  lens: string;
  iso: string;
  aperture: string;
  shutter: string;
  focalLength: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  thumbnailUrl: string;
  caption: string;
  alt: string;
  aspectRatio: 'square' | 'portrait' | 'landscape' | 'wide';
  exif?: ExifData;
}

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  category: 'STREETWEAR' | 'EDITORIAL' | 'UNDERGROUND' | 'PORTRAITS' | 'CAMPAIGN';
  year: string;
  client: string;
  location: string;
  heroImage: string;
  thumbnailImage: string;
  barcode: string;
  garmentTag?: string;
  collectionCode: string;
  stockist?: string;
  description: string;
  summary: string;
  aspectRatio: 'portrait' | 'square' | 'landscape';
  featured: boolean;
  credits: {
    photographer: string;
    artDirector?: string;
    styling?: string;
    mua?: string;
    models?: string[];
  };
  exif: ExifData;
  gallery: GalleryImage[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export interface ServicePackage {
  id: string;
  title: string;
  tier: 'ESSENTIAL' | 'CAMPAIGN' | 'UNDERGROUND' | 'BESPOKE';
  subtitle: string;
  description: string;
  targetAudience: string;
  approach: string;
  startingPrice: string;
  priceNote: string;
  duration: string;
  deliverables: string[];
  addOns: { name: string; price: string }[];
  featuredImage: string;
  barcode: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
}

export interface Testimonial {
  id: string;
  clientName: string;
  brand: string;
  avatar: string;
  project: string;
  review: string;
  date: string;
  rating: number;
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  readTime: string;
  coverImage: string;
  excerpt: string;
  content: string[];
  tags: string[];
  barcode: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'BOOKING' | 'PRODUCTION' | 'DELIVERY' | 'TRAVEL';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    instagram?: string;
    email?: string;
  };
}

export interface ClientPartner {
  id: string;
  name: string;
  category: string;
  quote?: string;
  logoText: string;
}

export interface SiteSettings {
  photographerName: string;
  brandTitle: string;
  tagline: string;
  statement: string;
  serviceLocations: string[];
  availabilityNotice: string;
  whatsappNumber: string;
  whatsappPrefillText: string;
  whatsappUrl: string;
  contactEmail: string;
  phoneNumber: string;
  instagramHandle: string;
  instagramUrl: string;
  tiktokHandle: string;
  tiktokUrl: string;
  facebookHandle: string;
  facebookUrl: string;
  studioAddress: string;
  primaryColor: string;
  creatorStudio?: string;
  creatorInstagramUrl?: string;
}

export interface BookingFormValues {
  fullName: string;
  email: string;
  phone: string;
  whatsapp: string;
  serviceType: string;
  shootDate: string;
  location: string;
  budgetRange: string;
  projectDetails: string;
  referralSource: string;
}
