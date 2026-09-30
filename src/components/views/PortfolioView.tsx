import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Search, Filter, Camera, SlidersHorizontal, Check, Eye, X, Image as ImageIcon, Sparkles } from 'lucide-react';
import { ReferenceWork, getLocalPortfolioWorks, saveLocalPortfolioWork } from '../../data/portfolioData';

interface PortfolioViewProps {
  onSelectImage: (work: ReferenceWork, index: number, worksList: ReferenceWork[]) => void;
  onBookSession: () => void;
}

type CategoryFilter = 'ALL' | 'WEDDING' | 'PORTRAIT' | 'FASHION' | 'EVENT' | 'COMMERCIAL';

export const PortfolioView: React.FC<PortfolioViewProps> = ({ onSelectImage, onBookSession }) => {
  const [works, setWorks] = useState<ReferenceWork[]>([]);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showColorByDefault, setShowColorByDefault] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  // New Work Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'WEDDING' | 'PORTRAIT' | 'FASHION' | 'EVENT' | 'COMMERCIAL'>('WEDDING');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newYear, setNewYear] = useState('2025');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newCamera, setNewCamera] = useState('Sony A1');
  const [newLens, setNewLens] = useState('50mm f/1.2 GM');
  const [newDescription, setNewDescription] = useState('');
  const [addSuccessMsg, setAddSuccessMsg] = useState(false);

  useEffect(() => {
    setWorks(getLocalPortfolioWorks());
  }, []);

  const categories: { id: CategoryFilter; label: string; count: number }[] = useMemo(() => {
    const counts: Record<CategoryFilter, number> = {
      ALL: works.length,
      WEDDING: works.filter((w) => w.category === 'WEDDING').length,
      PORTRAIT: works.filter((w) => w.category === 'PORTRAIT' || w.category === 'PORTRAITURE' || w.category === 'FINE ART' || w.category === 'BEAUTY').length,
      FASHION: works.filter((w) => w.category === 'FASHION' || w.category === 'EDITORIAL' || w.category === 'MENSWEAR').length,
      EVENT: works.filter((w) => w.category === 'EVENT').length,
      COMMERCIAL: works.filter((w) => w.category === 'COMMERCIAL').length,
    };

    return [
      { id: 'ALL', label: 'ALL WORKS', count: counts.ALL },
      { id: 'WEDDING', label: 'WEDDINGS & BRIDAL', count: counts.WEDDING },
      { id: 'PORTRAIT', label: 'PORTRAITS & VISAGES', count: counts.PORTRAIT },
      { id: 'FASHION', label: 'FASHION & EDITORIAL', count: counts.FASHION },
      { id: 'EVENT', label: 'EVENTS & CELEBRATIONS', count: counts.EVENT },
      { id: 'COMMERCIAL', label: 'COMMERCIAL & BRAND', count: counts.COMMERCIAL },
    ];
  }, [works]);

  const filteredWorks = useMemo(() => {
    return works.filter((work) => {
      // Category match
      let matchCat = false;
      if (activeCategory === 'ALL') {
        matchCat = true;
      } else if (activeCategory === 'WEDDING') {
        matchCat = work.category === 'WEDDING';
      } else if (activeCategory === 'PORTRAIT') {
        matchCat = ['PORTRAIT', 'PORTRAITURE', 'FINE ART', 'BEAUTY'].includes(work.category);
      } else if (activeCategory === 'FASHION') {
        matchCat = ['FASHION', 'EDITORIAL', 'MENSWEAR'].includes(work.category);
      } else if (activeCategory === 'EVENT') {
        matchCat = work.category === 'EVENT';
      } else if (activeCategory === 'COMMERCIAL') {
        matchCat = work.category === 'COMMERCIAL';
      }

      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        !query ||
        work.title.toLowerCase().includes(query) ||
        work.subtitle.toLowerCase().includes(query) ||
        work.category.toLowerCase().includes(query) ||
        work.year.includes(query) ||
        work.exif.camera.toLowerCase().includes(query);

      return matchCat && matchSearch;
    });
  }, [works, activeCategory, searchQuery]);

  // Quick preset sample images for instant addition
  const samplePresets = [
    {
      title: 'CROWN OF ROSES BRIDE',
      category: 'WEDDING' as const,
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop',
      subtitle: 'Luxury Garden Reception',
    },
    {
      title: 'THE CHIC STUDIO LOOK',
      category: 'PORTRAIT' as const,
      url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop',
      subtitle: 'Classic Monochrome Visage',
    },
    {
      title: 'HAUTE ACCRA RUNWAY',
      category: 'FASHION' as const,
      url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop',
      subtitle: 'Editorial Lookbook 2025',
    },
    {
      title: 'PAN-AFRICAN GALA EVENING',
      category: 'EVENT' as const,
      url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1200&auto=format&fit=crop',
      subtitle: 'Charity Honours Soirée',
    },
  ];

  const handleAddWorkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newImageUrl.trim()) return;

    const newWorkItem: ReferenceWork = {
      id: 'custom-' + Date.now(),
      title: newTitle.toUpperCase(),
      subtitle: newSubtitle || `${newCategory} Series`,
      category: newCategory,
      year: newYear || '2025',
      imageUrl: newImageUrl.trim(),
      aspectRatio: 'aspect-[3/4]',
      exif: {
        camera: newCamera || 'Pro Camera',
        lens: newLens || 'Prime Lens',
        aperture: 'f/2.0',
        shutter: '1/250s',
        iso: 'ISO 100',
      },
      description: newDescription || `Bespoke ${newCategory.toLowerCase()} captured by Winshot Photography.`,
    };

    const updated = saveLocalPortfolioWork(newWorkItem);
    setWorks(updated);
    setAddSuccessMsg(true);

    // Reset form
    setTimeout(() => {
      setAddSuccessMsg(false);
      setAddModalOpen(false);
      setNewTitle('');
      setNewSubtitle('');
      setNewImageUrl('');
      setNewDescription('');
    }, 1200);
  };

  return (
    <div id="portfolio-view-container" className="w-full bg-white text-black pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="font-display text-xs tracking-[0.3em] uppercase text-neutral-500">
            CURATED ARCHIVE & COMMISSION CATALOGUE
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.2em] uppercase text-black mt-2 mb-4">
            PORTFOLIO
          </h1>
          <div className="w-12 h-[2px] bg-black mx-auto mb-6" />
          <p className="text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed">
            Explore our curated collections of luxury weddings, fine-art portraiture, fashion lookbooks, high-profile events,
            and commercial campaigns. Click any photo to examine in full color and inspect technical specs.
          </p>
        </div>

        {/* Action Bar: Category Tabs & "Add New Work" Button */}
        <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-6 mb-10 pb-6 border-b border-neutral-200">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-2 text-xs font-display tracking-widest uppercase transition-all duration-200 cursor-pointer flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-black text-white font-bold shadow-xs'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-black'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded-xs ${
                      isActive ? 'bg-neutral-800 text-neutral-200' : 'bg-neutral-200 text-neutral-700'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Action Tools: Search, View Mode Toggle & Add Button */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-56">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search portfolio..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 pl-8 pr-3 py-2 text-xs font-sans text-black focus:border-black outline-hidden transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Default Color Toggle */}
            <button
              type="button"
              onClick={() => setShowColorByDefault(!showColorByDefault)}
              className={`px-3 py-2 text-xs font-mono uppercase border transition-colors cursor-pointer flex items-center space-x-1.5 ${
                showColorByDefault
                  ? 'border-black bg-neutral-900 text-white'
                  : 'border-neutral-300 bg-white text-neutral-700 hover:border-black'
              }`}
              title="Toggle gallery between color and monochrome display"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showColorByDefault ? 'Display: Color' : 'Display: B&W'}</span>
            </button>

            {/* Add to Portfolio Button */}
            <button
              type="button"
              onClick={() => setAddModalOpen(true)}
              className="bg-black hover:bg-neutral-800 text-white font-display text-xs tracking-widest uppercase px-4 py-2 flex items-center space-x-2 transition-colors cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Work</span>
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredWorks.length === 0 ? (
          <div className="py-20 text-center bg-neutral-50 border border-neutral-200 p-8">
            <Camera className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-neutral-800">
              No matching portfolio works found
            </h3>
            <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
              Try adjusting your search terms or select another category filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('ALL');
                setSearchQuery('');
              }}
              className="mt-4 inline-block bg-black text-white text-xs font-display tracking-widest uppercase px-4 py-2"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredWorks.map((work, index) => {
              return (
                <div
                  key={work.id}
                  onClick={() => onSelectImage(work, index, filteredWorks)}
                  className="group relative cursor-pointer bg-neutral-100 overflow-hidden border border-neutral-200 transition-all duration-300 hover:border-black hover:shadow-xl"
                >
                  {/* Photo Container */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-neutral-200">
                    <img
                      src={work.imageUrl}
                      alt={work.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className={`w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105 ${
                        showColorByDefault
                          ? 'grayscale-0 filter contrast-105'
                          : 'grayscale filter contrast-115 group-hover:grayscale-0'
                      }`}
                    />

                    {/* Category badge */}
                    <div className="absolute top-3 left-3 bg-black/85 text-white text-[9px] font-display tracking-[0.2em] uppercase px-2.5 py-1 backdrop-blur-xs">
                      {work.category}
                    </div>

                    {/* Year badge */}
                    <div className="absolute top-3 right-3 bg-white/90 text-black text-[9px] font-mono px-2 py-0.5 backdrop-blur-xs">
                      {work.year}
                    </div>

                    {/* Hover Inspection Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                      <div className="text-center text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <span className="inline-flex items-center space-x-1 text-[10px] font-display tracking-[0.25em] uppercase bg-white text-black px-3 py-1 font-bold">
                          <Eye className="w-3 h-3 mr-1" /> Inspect in Full Color
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Metadata Footer */}
                  <div className="p-4 bg-white border-t border-neutral-200">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h3 className="font-display text-xs font-bold tracking-wider uppercase text-black line-clamp-1 group-hover:text-neutral-700 transition-colors">
                          {work.title}
                        </h3>
                        <p className="text-[11px] text-neutral-500 font-sans mt-0.5 line-clamp-1">
                          {work.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-neutral-100 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                      <span>{work.exif.camera}</span>
                      <span>{work.exif.lens}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom CTA Banner */}
        <div className="mt-20 bg-neutral-950 text-white p-8 sm:p-12 text-center max-w-4xl mx-auto border border-neutral-800">
          <span className="font-display text-[10px] tracking-[0.3em] uppercase text-neutral-400">
            READY TO CREATE YOUR OWN STORY?
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[0.15em] uppercase mt-2 mb-3 text-white">
            COMMISSION WINSHOT PHOTOGRAPHY
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 font-sans max-w-xl mx-auto mb-6 leading-relaxed">
            Whether for your once-in-a-lifetime wedding, an intimate luxury portrait session, or a high-impact commercial campaign,
            reserve your date with our team.
          </p>
          <button
            type="button"
            onClick={onBookSession}
            className="cursor-pointer bg-white hover:bg-neutral-200 text-black font-display text-xs tracking-[0.25em] uppercase px-8 py-4 font-semibold transition-colors shadow-md inline-block"
          >
            Book Your Session Now
          </button>
        </div>
      </div>

      {/* --- ADD NEW WORK MODAL --- */}
      {addModalOpen && (
        <div
          id="add-portfolio-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setAddModalOpen(false);
          }}
        >
          <div className="relative w-full max-w-2xl bg-white text-black p-6 sm:p-8 shadow-2xl border border-neutral-300 max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setAddModalOpen(false)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-black transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6 pr-6">
              <span className="font-display text-[10px] tracking-[0.3em] uppercase text-neutral-500">
                PORTFOLIO CURATION
              </span>
              <h2 className="font-display text-2xl font-bold tracking-[0.15em] uppercase text-black mt-1">
                ADD NEW PHOTOGRAPHY WORK
              </h2>
              <p className="text-xs text-neutral-600 font-sans mt-1">
                Add weddings, portraits, fashion lookbooks, or event photographs to Winshot's live portfolio.
              </p>
            </div>

            {addSuccessMsg ? (
              <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-8 text-center animate-in zoom-in-95 duration-200">
                <Check className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                <h3 className="font-display text-base font-bold uppercase tracking-wider">
                  WORK ADDED TO PORTFOLIO!
                </h3>
                <p className="text-xs text-emerald-700 mt-1">
                  Your photograph has been added to the live gallery and saved.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAddWorkSubmit} className="space-y-5">
                {/* 1-Click Quick Presets */}
                <div className="bg-neutral-50 p-3.5 border border-neutral-200 text-xs">
                  <div className="flex items-center space-x-1.5 mb-2 font-display uppercase tracking-wider text-neutral-700 text-[10px] font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-neutral-800" />
                    <span>Quick Autofill Presets:</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {samplePresets.map((preset) => (
                      <button
                        key={preset.title}
                        type="button"
                        onClick={() => {
                          setNewTitle(preset.title);
                          setNewCategory(preset.category);
                          setNewSubtitle(preset.subtitle);
                          setNewImageUrl(preset.url);
                        }}
                        className="p-2 border border-neutral-300 hover:border-black bg-white text-left text-[11px] font-sans transition-colors cursor-pointer"
                      >
                        <span className="font-bold block uppercase text-[10px] font-mono text-neutral-500">
                          {preset.category}
                        </span>
                        <span className="line-clamp-1 text-neutral-800">{preset.title}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title & Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-display uppercase tracking-wider text-neutral-700 mb-1">
                      Project / Photograph Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. THE ROYAL GOLDEN WEDDING"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full bg-white border border-neutral-300 p-2.5 text-xs font-sans focus:border-black outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-display uppercase tracking-wider text-neutral-700 mb-1">
                      Category *
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full bg-white border border-neutral-300 p-2.5 text-xs font-mono focus:border-black outline-hidden"
                    >
                      <option value="WEDDING">WEDDING & BRIDAL</option>
                      <option value="PORTRAIT">PORTRAIT & HEADSHOT</option>
                      <option value="FASHION">FASHION & EDITORIAL</option>
                      <option value="EVENT">EVENT & CELEBRATION</option>
                      <option value="COMMERCIAL">COMMERCIAL & BRAND</option>
                    </select>
                  </div>
                </div>

                {/* Subtitle & Year */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-display uppercase tracking-wider text-neutral-700 mb-1">
                      Subtitle / Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Accra Cathedral Nuptials"
                      value={newSubtitle}
                      onChange={(e) => setNewSubtitle(e.target.value)}
                      className="w-full bg-white border border-neutral-300 p-2.5 text-xs font-sans focus:border-black outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-display uppercase tracking-wider text-neutral-700 mb-1">
                      Year
                    </label>
                    <input
                      type="text"
                      placeholder="2025"
                      value={newYear}
                      onChange={(e) => setNewYear(e.target.value)}
                      className="w-full bg-white border border-neutral-300 p-2.5 text-xs font-mono focus:border-black outline-hidden"
                    />
                  </div>
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-xs font-display uppercase tracking-wider text-neutral-700 mb-1">
                    Image URL * (High-Resolution JPEG or PNG)
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://images.unsplash.com/... or cloud image link"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    className="w-full bg-white border border-neutral-300 p-2.5 text-xs font-mono focus:border-black outline-hidden"
                  />
                  {newImageUrl && (
                    <div className="mt-2 flex items-center space-x-3 text-[11px] text-neutral-500 font-mono">
                      <ImageIcon className="w-4 h-4 text-neutral-600" />
                      <span>Preview Image Loaded</span>
                    </div>
                  )}
                </div>

                {/* Gear Specs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-display uppercase tracking-wider text-neutral-700 mb-1">
                      Camera Model
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sony A1 or Leica M11"
                      value={newCamera}
                      onChange={(e) => setNewCamera(e.target.value)}
                      className="w-full bg-white border border-neutral-300 p-2.5 text-xs font-mono focus:border-black outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-display uppercase tracking-wider text-neutral-700 mb-1">
                      Lens / Optics
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 50mm f/1.2 GM"
                      value={newLens}
                      onChange={(e) => setNewLens(e.target.value)}
                      className="w-full bg-white border border-neutral-300 p-2.5 text-xs font-mono focus:border-black outline-hidden"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-display uppercase tracking-wider text-neutral-700 mb-1">
                    Description & Creative Details
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Brief details about the styling, lighting, mood or ceremony..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full bg-white border border-neutral-300 p-2.5 text-xs font-sans focus:border-black outline-hidden resize-none"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setAddModalOpen(false)}
                    className="border border-neutral-300 hover:bg-neutral-100 text-neutral-700 text-xs font-mono uppercase px-5 py-2.5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-black hover:bg-neutral-800 text-white font-display text-xs tracking-widest uppercase px-6 py-2.5 transition-colors cursor-pointer"
                  >
                    Save & Add to Portfolio
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
