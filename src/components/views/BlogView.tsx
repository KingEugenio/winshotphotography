import React, { useState } from 'react';
import { blogArticles } from '../../data/portfolioData';
import { JournalArticle } from '../../types';
import { Clock, ArrowRight, X } from 'lucide-react';

export const BlogView: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);

  return (
    <div id="blog-view-container" className="w-full bg-white text-black pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="font-display text-xs tracking-[0.3em] uppercase text-neutral-500">
            DISPATCHES & ESSAYS
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.2em] uppercase text-black mt-2 mb-4">
            STUDIO JOURNAL
          </h1>
          <div className="w-12 h-[2px] bg-black mx-auto mb-6" />
          <p className="text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed">
            Musings on monochrome philosophy, medium-format optics, zone system exposures, and the timeless
            art of lighting.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {blogArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="group cursor-pointer flex flex-col bg-white border border-neutral-200 overflow-hidden hover:border-black transition-colors"
            >
              <div className="aspect-[16/10] overflow-hidden bg-neutral-100 relative">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover grayscale contrast-115 group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-black/80 text-white font-mono text-[10px] tracking-widest px-2 py-1 uppercase">
                  {article.category}
                </span>
              </div>

              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center space-x-3 text-[11px] font-mono text-neutral-500 mb-2">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{article.readTime}</span>
                    </span>
                  </div>

                  <h3 className="font-display text-base font-bold tracking-wide uppercase text-black mb-2 group-hover:text-neutral-600 transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-xs text-neutral-600 font-sans line-clamp-3 leading-relaxed mb-4">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-display font-semibold tracking-wider text-black">
                  <span>READ ARTICLE</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Article Reader Modal */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <div className="bg-white max-w-3xl w-full p-6 sm:p-10 relative max-h-[90vh] overflow-y-auto shadow-2xl">
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                aria-label="Close article"
                className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-black"
              >
                <X className="w-6 h-6" />
              </button>

              <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
                {selectedArticle.date} • {selectedArticle.readTime}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-wide uppercase text-black mt-2 mb-4">
                {selectedArticle.title}
              </h2>
              <p className="font-serif-editorial text-lg text-neutral-600 italic mb-6">
                "{selectedArticle.subtitle}"
              </p>

              <div className="aspect-[16/9] mb-8 bg-neutral-100 overflow-hidden">
                <img
                  src={selectedArticle.coverImage}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover grayscale contrast-115"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-4 text-sm sm:text-base text-neutral-800 font-sans leading-relaxed">
                {selectedArticle.content.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-200 flex flex-wrap gap-2">
                {selectedArticle.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] bg-neutral-100 text-neutral-700 px-3 py-1 uppercase tracking-wider"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
