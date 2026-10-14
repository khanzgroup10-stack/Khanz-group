import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { 
  ChevronLeft, 
  ArrowUpRight, 
  Search, 
  X, 
  SlidersHorizontal, 
  Compass, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { PRIMARY_CATEGORIES, CategoryData } from './thatsItData';

interface Props {
  onSelectCategory?: (categorySlug: string) => void;
}

export const ThatsItCollectionsView: React.FC<Props> = ({ onSelectCategory }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      gsap.fromTo(
        '.col-hero-badge, .col-hero-title, .col-hero-desc, .col-search-bar',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.col-card-item',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power2.out', delay: 0.2 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const allTags = ['All', ...Array.from(new Set(PRIMARY_CATEGORIES.map(c => c.tag)))];

  const filteredCategories = PRIMARY_CATEGORIES.filter(cat => {
    const matchesTag = selectedTag === 'All' || cat.tag === selectedTag;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesTag;

    const matchesTitle = cat.title.toLowerCase().includes(query);
    const matchesDesc = cat.description.toLowerCase().includes(query);
    const matchesSub = cat.subcategories.some(sub => sub.toLowerCase().includes(query));

    return matchesTag && (matchesTitle || matchesDesc || matchesSub);
  });

  return (
    <div 
      ref={containerRef}
      className="bg-[#0A0A0A] text-[#F5F3EF] min-h-screen font-sans selection:bg-[#C9A77C] selection:text-[#0A0A0A] overflow-x-hidden"
    >
      {/* Top Floating Luxury Header */}
      <header className="sticky top-0 z-40 px-6 sm:px-10 lg:px-16 py-5 flex items-center justify-between bg-black/85 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-4 sm:gap-6">
          <Link 
            to="/divisions/thats-it" 
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C9A77C] hover:text-white transition-colors duration-200"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">THAT'S IT Division</span>
            <span className="sm:hidden">Home</span>
          </Link>
          <span className="text-white/20">/</span>
          <span className="text-xs tracking-[0.2em] uppercase text-white/70 font-semibold">
            All Collections
          </span>
        </div>

        <Link 
          to="/" 
          className="text-xs uppercase tracking-[0.2em] text-[#A8A8A8] hover:text-[#C9A77C] transition-colors"
        >
          KHANZ Group
        </Link>
      </header>

      {/* Editorial Hero Header */}
      <section className="relative px-6 sm:px-10 lg:px-16 pt-16 pb-12 max-w-[1600px] mx-auto">
        <div className="max-w-4xl">
          <div className="col-hero-badge flex items-center gap-3 mb-5">
            <span className="w-8 h-[1px] bg-[#C9A77C]/60" />
            <span className="text-[#C9A77C] text-xs font-semibold tracking-[0.3em] uppercase">
              THAT'S IT &middot; COMPLETE BRAND RANGE
            </span>
          </div>

          <h1 className="col-hero-title text-4xl sm:text-5xl md:text-6xl font-serif-luxury font-light tracking-tight leading-[1.08] text-[#F5F3EF] mb-6">
            ALL SIGNATURE <br />
            <span className="text-[#C9A77C] italic font-normal">COLLECTIONS</span>
          </h1>

          <p className="col-hero-desc text-[#A8A8A8] text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl">
            Explore the complete breadth of THAT'S IT menswear, grooming, accessories and lifestyle divisions. Every category features carefully designed essentials tailored for presence and confidence.
          </p>
        </div>

        {/* Interactive Search & Filter Controls */}
        <div className="col-search-bar mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#C9A77C] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search collections or subcategories (e.g., shirts, sneakers, grooming, wallets)..."
              className="w-full bg-[#111111] border border-white/15 focus:border-[#C9A77C] text-sm text-[#F5F3EF] pl-11 pr-10 py-3.5 outline-none transition-colors duration-200 placeholder:text-white/40 tracking-wide"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Tag Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#A8A8A8] mr-2 hidden sm:inline">
              Filter:
            </span>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3.5 py-1.5 text-xs uppercase tracking-wider transition-all duration-200 border ${
                  selectedTag === tag 
                    ? 'border-[#C9A77C] bg-[#C9A77C] text-black font-semibold' 
                    : 'border-white/15 bg-white/[0.03] text-white/70 hover:border-white/30 hover:text-white'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results Counter */}
        {searchQuery && (
          <div className="mt-4 text-xs text-[#C9A77C] tracking-wider uppercase">
            Showing {filteredCategories.length} category matches for &ldquo;{searchQuery}&rdquo;
          </div>
        )}
      </section>

      {/* Collections Grid */}
      <section className="px-6 sm:px-10 lg:px-16 pb-24 max-w-[1600px] mx-auto">
        {filteredCategories.length === 0 ? (
          <div className="py-20 text-center border border-white/10 bg-[#111111] p-12">
            <p className="text-lg text-white/80 font-serif-luxury mb-2">No categories found matching your query</p>
            <p className="text-xs text-[#A8A8A8] tracking-widest uppercase mb-6">Try searching for &ldquo;shirts&rdquo;, &ldquo;fragrances&rdquo;, &ldquo;sneakers&rdquo; or &ldquo;grooming&rdquo;</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedTag('All'); }}
              className="border border-[#C9A77C] px-6 py-2.5 text-xs uppercase tracking-widest text-[#C9A77C] hover:bg-[#C9A77C] hover:text-black transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {filteredCategories.map((cat) => (
              <div 
                key={cat.id}
                className="col-card-item group relative flex flex-col bg-[#111111] border border-white/10 hover:border-[#C9A77C]/60 transition-all duration-500 overflow-hidden"
              >
                {/* Media Container with Zoom */}
                <div className="relative aspect-[4/5] overflow-hidden bg-black">
                  <img 
                    src={cat.image} 
                    alt={cat.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-black/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
                  
                  {/* Category Pill Tag */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9A77C] font-semibold bg-black/80 backdrop-blur-sm px-2.5 py-1 border border-[#C9A77C]/30">
                      {cat.tag}
                    </span>
                    {cat.isFutureVision && (
                      <span className="text-[9px] uppercase tracking-wider text-amber-300 font-semibold bg-black/90 px-2 py-1 border border-amber-400/50">
                        Future Vision
                      </span>
                    )}
                  </div>

                  {/* Subcategories count badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="text-[9px] uppercase tracking-wider text-white/80 bg-black/60 px-2 py-0.5 border border-white/15">
                      {cat.subcategories.length} Subcategories
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-serif-luxury text-[#F5F3EF] mb-1 group-hover:text-[#C9A77C] transition-colors duration-300">
                      {cat.title}
                    </h3>
                    <p className="text-[11px] text-[#A8A8A8] tracking-widest uppercase font-light mb-3">
                      {cat.subtitle}
                    </p>
                    <p className="text-xs text-white/70 font-light leading-relaxed mb-5 line-clamp-3">
                      {cat.description}
                    </p>

                    {/* Preview Subcategory Pills */}
                    <div className="mb-6">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A77C]/80 block mb-2 font-medium">
                        Highlights:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.previewSubcategories.map((sub) => (
                          <span 
                            key={sub}
                            className="text-[10px] tracking-wider text-white/80 bg-white/5 border border-white/10 px-2.5 py-1"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CTA Action Button */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <Link
                      to={`/divisions/thats-it/collections/${cat.slug}`}
                      className="w-full inline-flex items-center justify-between group/link text-xs uppercase tracking-[0.2em] font-semibold text-[#F5F3EF] hover:text-[#C9A77C] py-2 transition-colors"
                    >
                      <span>Explore Collection</span>
                      <span className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center group-hover/link:border-[#C9A77C] group-hover/link:bg-[#C9A77C] group-hover/link:text-black transition-all duration-300">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer / Back to Top */}
      <footer className="border-t border-white/10 py-12 px-6 sm:px-10 lg:px-16 bg-black">
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img 
              src="/thats-it/thats-it-logo.png" 
              alt="THAT'S IT" 
              className="h-8 w-auto object-contain filter brightness-110"
              onError={(e) => { (e.target as HTMLImageElement).src = '/thats-it/thats-it-logo.jpeg'; }}
            />
            <span className="text-xs uppercase tracking-[0.25em] text-[#A8A8A8]">
              THAT'S IT Luxury Division
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs uppercase tracking-[0.2em] text-[#A8A8A8]">
            <Link to="/divisions/thats-it" className="hover:text-[#C9A77C] transition-colors">
              Division Home
            </Link>
            <Link to="/" className="hover:text-[#C9A77C] transition-colors">
              KHANZ Corporate
            </Link>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-white transition-colors"
            >
              Back to Top &uarr;
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
