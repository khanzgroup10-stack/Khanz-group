import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import gsap from 'gsap';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight,
  ArrowUpRight, 
  X, 
  Sparkles, 
  CheckCircle2,
  PackageCheck,
  Clock,
  Layers
} from 'lucide-react';
import { 
  PRIMARY_CATEGORIES, 
  AUTHENTIC_PRODUCTS, 
  CategoryData, 
  AuthenticProduct,
  getSubcategoryImage
} from './thatsItData';

interface Props {
  categoryId?: string;
}

// =========================================================================
// REUSABLE FEATURED PRODUCT CARD
// Matches Reference Image: 4 columns, ~195-215px height, distinct menswear assets
// =========================================================================
interface FeaturedProductCardProps {
  product: AuthenticProduct;
  onViewSpec: (product: AuthenticProduct) => void;
}

const FeaturedProductCard: React.FC<FeaturedProductCardProps> = ({ product, onViewSpec }) => {
  return (
    <div className="cat-product-card group flex flex-col bg-[#0e0e0e] border border-white/10 hover:border-[#C9A77C]/60 transition-all duration-300 overflow-hidden">
      {/* Controlled image window: ~195-215px on desktop, fully responsive */}
      <div className="relative h-[190px] sm:h-[200px] lg:h-[215px] w-full overflow-hidden bg-black">
        <img 
          src={product.image} 
          alt={product.name}
          loading="lazy"
          style={{ objectPosition: product.objectPosition || 'center 35%' }}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-104"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-black/30 opacity-70 group-hover:opacity-60 transition-opacity duration-300" />
        
        {/* Top-left pill tag */}
        <div className="absolute top-3 left-3 z-10">
          <span className="text-[9px] uppercase tracking-[0.2em] bg-black/85 backdrop-blur-sm text-[#C9A77C] border border-[#C9A77C]/40 px-2.5 py-0.5 font-semibold">
            {product.tag}
          </span>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10px] tracking-[0.25em] text-[#C9A77C] uppercase font-semibold block mb-1">
            {product.subcategory}
          </span>
          <h3 className="text-sm sm:text-base font-serif-luxury text-[#F5F3EF] mb-2 group-hover:text-[#C9A77C] transition-colors leading-snug">
            {product.name}
          </h3>
          <p className="text-[11px] text-[#A8A8A8] font-light leading-relaxed mb-4 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="pt-3 border-t border-white/10 flex items-center justify-between">
          <span className="text-[9px] tracking-[0.2em] text-[#C9A77C] uppercase font-semibold">
            GENUINE BRAND SPEC
          </span>
          <button
            onClick={() => onViewSpec(product)}
            className="inline-flex items-center gap-1 text-xs uppercase tracking-wider font-semibold text-white hover:text-[#C9A77C] transition-colors group/btn"
          >
            <span>VIEW SPEC</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C9A77C] group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// REUSABLE COMPACT SUBCATEGORY CARD
// Matches Reference Image: 6 columns on desktop, ~115-125px image, menswear only
// =========================================================================
interface SubcategoryCardProps {
  subcategoryName: string;
  categorySlug: string;
  categoryTag: string;
  index: number;
  isSelected: boolean;
  onSelectSubcategory: (sub: string) => void;
  onInquireSubcategory: (sub: string) => void;
}

const SubcategoryCard: React.FC<SubcategoryCardProps> = ({
  subcategoryName,
  categorySlug,
  categoryTag,
  index,
  isSelected,
  onSelectSubcategory,
  onInquireSubcategory
}) => {
  const imageUrl = getSubcategoryImage(categorySlug, subcategoryName);

  return (
    <div
      onClick={() => onSelectSubcategory(subcategoryName)}
      className={`group relative flex flex-col bg-[#0e0e0e] border overflow-hidden cursor-pointer transition-all duration-300 ${
        isSelected 
          ? 'border-[#C9A77C] bg-[#C9A77C]/10 shadow-[0_0_20px_rgba(201,167,124,0.15)] ring-1 ring-[#C9A77C]' 
          : 'border-white/10 hover:border-[#C9A77C]/60 hover:bg-[#121212]'
      }`}
    >
      {/* Compact Image Window: Approx 115-125px on desktop */}
      <div className="relative h-[110px] sm:h-[120px] lg:h-[125px] w-full overflow-hidden bg-black">
        <img 
          src={imageUrl} 
          alt={subcategoryName}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-104"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (!target.src.includes('ChatGPT Image Sep 23, 2026, 09_35_21 PM.png')) {
              target.src = '/thats-it/ChatGPT Image Sep 23, 2026, 09_35_21 PM.png';
            }
          }}
        />
        {/* Subtle dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-black/25 to-transparent opacity-85 group-hover:opacity-70 transition-opacity" />
      </div>

      {/* Card Content & Action Bar */}
      <div className="p-3 sm:p-3.5 flex-1 flex flex-col justify-between">
        <div className="mb-2">
          <h4 className="text-xs sm:text-[13px] font-medium text-[#F5F3EF] group-hover:text-[#C9A77C] transition-colors leading-snug truncate">
            {subcategoryName}
          </h4>
        </div>

        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[9px] uppercase tracking-wider">
          <span className={isSelected ? 'text-[#C9A77C] font-semibold' : 'text-white/60 group-hover:text-white'}>
            FILTER BY THIS
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onInquireSubcategory(subcategoryName);
            }}
            className="text-[#C9A77C] hover:text-white transition-colors"
          >
            Inquire Line &rsaquo;
          </button>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// MAIN THAT'S IT CATEGORY VIEW COMPONENT
// =========================================================================
export const ThatsItCategoryView: React.FC<Props> = ({ categoryId: propCategoryId }) => {
  const params = useParams<{ categoryId?: string }>();
  const containerRef = useRef<HTMLDivElement>(null);
  const activeCategoryId = propCategoryId || params.categoryId || 'clothing';

  // Find active category
  const category = PRIMARY_CATEGORIES.find(
    c => c.slug.toLowerCase() === activeCategoryId.toLowerCase() || c.id.toLowerCase() === activeCategoryId.toLowerCase()
  ) || PRIMARY_CATEGORIES[0];

  const [activeSubcategory, setActiveSubcategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<AuthenticProduct | null>(null);
  const [inquiryModalSub, setInquiryModalSub] = useState<string | null>(null);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  // Scroll to top when category changes
  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveSubcategory('All');
    setSelectedProduct(null);
  }, [category.id]);

  // GSAP Animations with proper cleanup
  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      gsap.fromTo(
        '.cat-hero-title, .cat-hero-tag, .cat-hero-desc, .cat-breadcrumb, .cat-hero-stats',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.cat-tab-btn',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.015, ease: 'power2.out', delay: 0.1 }
      );

      gsap.fromTo(
        '.cat-product-card',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power2.out', delay: 0.2 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [category.id]);

  // Authentic products matching this category
  const categoryProducts = AUTHENTIC_PRODUCTS.filter(
    p => p.categoryId.toLowerCase() === category.id.toLowerCase()
  );

  // Filtered authentic products if subcategory selected
  const displayedProducts = activeSubcategory === 'All' 
    ? categoryProducts 
    : categoryProducts.filter(p => p.subcategory.toLowerCase() === activeSubcategory.toLowerCase());

  // Find next and previous category for sequential navigation
  const currentIndex = PRIMARY_CATEGORIES.findIndex(c => c.id === category.id);
  const prevCategory = PRIMARY_CATEGORIES[(currentIndex - 1 + PRIMARY_CATEGORIES.length) % PRIMARY_CATEGORIES.length];
  const nextCategory = PRIMARY_CATEGORIES[(currentIndex + 1) % PRIMARY_CATEGORIES.length];

  return (
    <div 
      ref={containerRef}
      className="bg-[#050608] text-[#F5F3EF] min-h-screen font-sans selection:bg-[#C9A77C] selection:text-[#0A0A0A] overflow-x-hidden"
    >
      {/* =========================================================================
          TOP FLOATING LUXURY HEADER BAR (Matches Reference Image)
          ========================================================================= */}
      <header className="sticky top-0 z-40 px-6 sm:px-10 lg:px-16 py-3.5 flex items-center justify-between bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-3 sm:gap-4 text-xs uppercase tracking-[0.2em]">
          <Link 
            to="/divisions/thats-it" 
            className="text-[#C9A77C] hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>THAT'S IT</span>
          </Link>
          <span className="text-white/20">/</span>
          <Link 
            to="/divisions/thats-it/collections" 
            className="text-white/70 hover:text-[#C9A77C] transition-colors"
          >
            COLLECTIONS
          </Link>
          <span className="text-white/20">/</span>
          <span className="text-white/40 truncate max-w-[220px]">
            {category.title.toUpperCase()}
          </span>
        </div>

        <Link 
          to="/divisions/thats-it/collections"
          className="border border-[#C9A77C]/60 text-white/90 hover:text-[#C9A77C] hover:border-[#C9A77C] px-3.5 py-1.5 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center gap-1.5"
        >
          <span>ALL COLLECTIONS DIRECTORY</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#C9A77C]" />
        </Link>
      </header>

      {/* =========================================================================
          EDITORIAL HERO SECTION (Matches Reference Image)
          Left: Typography & Stats | Right: THAT'S IT Logo & Draped Wool Blazer
          ========================================================================= */}
      <section className="relative min-h-[460px] lg:min-h-[500px] flex items-center bg-[#070707] overflow-hidden border-b border-white/10">
        {/* Background Visual: Category-specific luxury menswear hero visual with amber atmospheric backlight on right */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          {/* Right side warm amber atmospheric glow */}
          <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 overflow-hidden flex justify-end">
            <img 
              src={category.id === 'footwear' ? '/thats-it/footwear/hero-footwear.jpg' : 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=1200&auto=format&fit=crop'} 
              alt={category.id === 'footwear' ? "THAT'S IT Luxury Footwear" : "Luxury Menswear"}
              className="w-full lg:w-4/5 h-full object-cover object-center filter brightness-[0.6] contrast-[1.15] opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#070707] via-[#070707]/75 to-transparent w-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-black/80" />
          </div>
        </div>

        <div className="relative z-20 w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-12 lg:py-16">
          {/* Hero Content: Breadcrumb & Typography */}
          <div className="max-w-3xl">
            {/* Breadcrumb Line */}
            <div className="cat-breadcrumb flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#A8A8A8] mb-4">
              <Link to="/" className="hover:text-white transition-colors">KHANZ</Link>
              <span>&rsaquo;</span>
              <Link to="/divisions/thats-it" className="hover:text-white transition-colors">THAT'S IT</Link>
              <span>&rsaquo;</span>
              <Link to="/divisions/thats-it/collections" className="hover:text-white transition-colors">COLLECTIONS</Link>
              <span>&rsaquo;</span>
              <span className="text-[#C9A77C]">{category.title.toUpperCase()}</span>
            </div>

            {/* Division Eyebrow */}
            <div className="cat-hero-tag flex items-center gap-3 mb-3">
              <span className="text-[#C9A77C] text-[11px] font-semibold tracking-[0.3em] uppercase">
                {category.isFutureVision ? 'FUTURE VISION &middot; COMING SOON' : 'APPAREL DIVISION &nbsp;|&nbsp; SIGNATURE LINE'}
              </span>
            </div>

            {/* Headline */}
            <h1 className="cat-hero-title text-4xl sm:text-5xl md:text-6xl font-serif-luxury font-light leading-[1.06] text-[#F5F3EF] mb-2 tracking-tight">
              {category.title}
            </h1>

            {/* Tagline */}
            <p className="cat-hero-desc text-xs sm:text-sm text-[#C9A77C] tracking-[0.25em] uppercase font-medium mb-5">
              {category.subtitle}
            </p>

            {/* Description */}
            <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed max-w-xl mb-6">
              {category.editorialHero || category.description}
            </p>

            {/* Stat Pills */}
            <div className="cat-hero-stats flex flex-wrap items-center gap-6 text-[11px] uppercase tracking-[0.2em] pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-white/80">
                <span className="w-2 h-2 rounded-full bg-[#C9A77C]" />
                <span>{category.subcategories.length} SPECIALIZED SUBCATEGORIES</span>
              </div>
              <span className="text-white/20">|</span>
              <div className="flex items-center gap-2 text-[#C9A77C]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{categoryProducts.length} OF 4 AUTHENTICATED PIECES SHOWN</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SUBCATEGORIES PILL FILTER BAR (Matches Reference Image)
          Horizontal rounded pill buttons row
          ========================================================================= */}
      <section className="sticky top-[52px] z-30 bg-[#0E0E0E]/95 backdrop-blur-md border-b border-white/10 px-6 sm:px-10 lg:px-16 py-3 overflow-x-auto scrollbar-none">
        <div className="max-w-[1600px] mx-auto flex items-center gap-2">
          {/* Active / All Subcategories Button */}
          <button
            onClick={() => setActiveSubcategory('All')}
            className={`cat-tab-btn px-4 py-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.15em] whitespace-nowrap transition-all duration-200 ${
              activeSubcategory === 'All'
                ? 'bg-[#C9A77C] text-black font-semibold'
                : 'border border-white/20 bg-black/40 text-white/80 hover:border-[#C9A77C] hover:text-white'
            }`}
          >
            ALL SUBCATEGORIES
          </button>

          {/* Individual Category Pills */}
          {category.subcategories.map((sub) => {
            const isSelected = activeSubcategory === sub;
            return (
              <button
                key={sub}
                onClick={() => setActiveSubcategory(sub)}
                className={`cat-tab-btn px-3 py-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.15em] whitespace-nowrap transition-all duration-200 ${
                  isSelected
                    ? 'bg-[#C9A77C] text-black font-semibold'
                    : 'border border-white/20 bg-black/40 text-white/80 hover:border-[#C9A77C] hover:text-white'
                }`}
              >
                {sub.toUpperCase()}
              </button>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          MAIN CONTENT AREA
          ========================================================================= */}
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-12 sm:py-16">
        
        {/* =========================================================================
            SECTION 1: FEATURED COLLECTION (Matches Reference Image)
            Exactly 4 distinct, masculine menswear cards in a 4-column row
            ========================================================================= */}
        {categoryProducts.length > 0 && (
          <div className="mb-16">
            {/* Section Header with Divider Line */}
            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9A77C] font-semibold block mb-1">
                FEATURED COLLECTION
              </span>
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl sm:text-2xl font-serif-luxury text-[#F5F3EF] whitespace-nowrap">
                  Authenticated {category.title} Pieces
                </h2>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-[#C9A77C]/40 via-white/10 to-transparent hidden sm:block" />
                <span className="text-[10px] sm:text-[11px] text-[#A8A8A8] tracking-[0.2em] uppercase whitespace-nowrap">
                  {displayedProducts.length} OF {categoryProducts.length} GENUINE ASSETS
                </span>
              </div>
            </div>

            {displayedProducts.length === 0 ? (
              <div className="p-8 bg-[#111111] border border-white/10 text-center">
                <p className="text-sm text-white/80 font-serif-luxury mb-2">
                  No direct featured piece specifically for &ldquo;{activeSubcategory}&rdquo;.
                </p>
                <p className="text-xs text-[#A8A8A8] tracking-widest uppercase mb-4">
                  Full specifications and subcategory card for {activeSubcategory} are listed in the architecture directory below.
                </p>
                <button
                  onClick={() => setActiveSubcategory('All')}
                  className="text-xs uppercase tracking-widest text-[#C9A77C] border border-[#C9A77C]/50 px-4 py-2 hover:bg-[#C9A77C] hover:text-black transition-colors"
                >
                  VIEW ALL FEATURED PIECES
                </button>
              </div>
            ) : (
              /* Exactly 4 columns on desktop, 2 on tablet, 1 on mobile */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {displayedProducts.map((prod) => (
                  <FeaturedProductCard
                    key={prod.id}
                    product={prod}
                    onViewSpec={(p) => setSelectedProduct(p)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            SECTION 2: SUBCATEGORY ARCHITECTURE (Matches Reference Image)
            Exactly 6 columns on large desktop, relevant menswear images, no females
            ========================================================================= */}
        <div className="mb-16">
          {/* Section Header with Divider Line */}
          <div className="mb-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9A77C] font-semibold block mb-1">
              SUBCATEGORY ARCHITECTURE
            </span>
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl sm:text-2xl font-serif-luxury text-[#F5F3EF] whitespace-nowrap">
                All {category.title} Subcategories
              </h2>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-[#C9A77C]/40 via-white/10 to-transparent hidden sm:block" />
              <span className="text-[10px] sm:text-[11px] text-[#A8A8A8] tracking-[0.2em] uppercase whitespace-nowrap">
                {category.subcategories.length} SPECIALIZED SUBCATEGORIES
              </span>
            </div>
          </div>

          <p className="text-xs text-[#A8A8A8] font-light max-w-3xl mb-6">
            Explore our complete range of men&rsquo;s clothing and apparel. Click on any category to view products and specifications.
          </p>

          {/* 6 columns on desktop, 4 on tablet, 2 on mobile */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-3.5">
            {category.subcategories.map((sub, index) => {
              const isSelected = activeSubcategory === sub;

              return (
                <SubcategoryCard
                  key={sub}
                  subcategoryName={sub}
                  categorySlug={category.slug}
                  categoryTag={category.tag}
                  index={index}
                  isSelected={isSelected}
                  onSelectSubcategory={(s) => setActiveSubcategory(isSelected ? 'All' : s)}
                  onInquireSubcategory={(s) => {
                    setInquiryModalSub(s);
                    setInquirySubmitted(false);
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            BOTTOM SEQUENTIAL COLLECTION NAVIGATION (Matches Reference Image)
            ========================================================================= */}
        <div className="pt-10 pb-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Previous Collection */}
          <Link
            to={`/divisions/thats-it/collections/${prevCategory.slug}`}
            className="flex items-center gap-3 group text-left w-full sm:w-auto text-xs uppercase tracking-[0.2em] text-[#A8A8A8] hover:text-[#C9A77C] transition-colors"
          >
            <div className="w-8 h-8 border border-white/20 flex items-center justify-center group-hover:border-[#C9A77C] group-hover:text-[#C9A77C] transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[9px] tracking-[0.2em] uppercase text-white/50 block">PREVIOUS COLLECTION</span>
              <span className="text-xs font-serif-luxury text-[#F5F3EF] group-hover:text-[#C9A77C] transition-colors">
                {prevCategory.title}
              </span>
            </div>
          </Link>

          {/* Center All Collections Button */}
          <Link
            to="/divisions/thats-it/collections"
            className="text-xs uppercase tracking-[0.2em] text-[#C9A77C] hover:text-white transition-colors border border-[#C9A77C]/50 px-5 py-2.5 flex items-center gap-2"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>ALL COLLECTIONS DIRECTORY</span>
          </Link>

          {/* Next Collection */}
          <Link
            to={`/divisions/thats-it/collections/${nextCategory.slug}`}
            className="flex items-center gap-3 group text-right w-full sm:w-auto justify-end text-xs uppercase tracking-[0.2em] text-[#A8A8A8] hover:text-[#C9A77C] transition-colors"
          >
            <div>
              <span className="text-[9px] tracking-[0.2em] uppercase text-white/50 block">NEXT COLLECTION</span>
              <span className="text-xs font-serif-luxury text-[#F5F3EF] group-hover:text-[#C9A77C] transition-colors">
                {nextCategory.title}
              </span>
            </div>
            <div className="w-8 h-8 border border-white/20 flex items-center justify-center group-hover:border-[#C9A77C] group-hover:text-[#C9A77C] transition-colors">
              <ChevronRight className="w-4 h-4" />
            </div>
          </Link>
        </div>

      </div>

      {/* =========================================================================
          PRODUCT SPEC DETAIL MODAL (Preserved unchanged)
          ========================================================================= */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-3xl bg-[#111111] border border-[#C9A77C]/50 p-6 sm:p-10 shadow-2xl overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-6 right-6 text-white/60 hover:text-white p-2 border border-white/10 hover:border-[#C9A77C] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="h-[260px] sm:h-[300px] overflow-hidden bg-black border border-white/10">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  style={{ objectPosition: selectedProduct.objectPosition || 'center center' }}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <span className="text-[10px] tracking-[0.25em] text-[#C9A77C] uppercase font-semibold block mb-2">
                  THAT'S IT Official Piece
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif-luxury text-[#F5F3EF] mb-2">
                  {selectedProduct.name}
                </h3>
                <p className="text-xs text-[#A8A8A8] tracking-widest uppercase mb-4">
                  Subcategory: {selectedProduct.subcategory} &middot; Tag: {selectedProduct.tag}
                </p>
                <p className="text-sm text-[#A8A8A8] font-light leading-relaxed mb-6">
                  {selectedProduct.description}
                </p>

                <div className="p-4 bg-white/[0.03] border border-white/10 mb-6">
                  <span className="text-[10px] tracking-[0.2em] text-[#C9A77C] uppercase font-semibold block mb-1">
                    Authentic Guarantee
                  </span>
                  <p className="text-xs text-white/70 font-light">
                    Supplied directly under the THAT'S IT luxury division. Preserves bespoke artisan detailing, certified textile standards, and original brand insignia.
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => {
                      setInquiryModalSub(selectedProduct.name);
                      setSelectedProduct(null);
                      setInquirySubmitted(false);
                    }}
                    className="border border-[#C9A77C] bg-[#C9A77C] text-black px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-transparent hover:text-white transition-colors"
                  >
                    Inquire Specification
                  </button>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="border border-white/20 px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-white/80 hover:text-white transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          LINE INQUIRY MODAL DIALOG (Preserved unchanged)
          ========================================================================= */}
      {inquiryModalSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#111111] border border-[#C9A77C]/60 p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setInquiryModalSub(null)}
              className="absolute top-6 right-6 text-white/60 hover:text-white p-2 border border-white/10 hover:border-[#C9A77C] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {inquirySubmitted ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-12 h-12 text-[#C9A77C] mx-auto mb-4" />
                <h4 className="text-2xl font-serif-luxury text-[#F5F3EF] mb-2">Inquiry Logged</h4>
                <p className="text-xs text-[#A8A8A8] font-light max-w-sm mx-auto mb-6">
                  Your inquiry regarding <strong className="text-white">{inquiryModalSub}</strong> has been received by the THAT'S IT luxury division desk.
                </p>
                <button
                  onClick={() => setInquiryModalSub(null)}
                  className="border border-[#C9A77C] bg-[#C9A77C] text-black px-6 py-2 text-xs font-semibold uppercase tracking-[0.2em]"
                >
                  Return to Collection
                </button>
              </div>
            ) : (
              <div>
                <span className="text-[10px] tracking-[0.25em] text-[#C9A77C] uppercase font-semibold block mb-2">
                  THAT'S IT Division Inquiry
                </span>
                <h3 className="text-2xl font-serif-luxury text-[#F5F3EF] mb-1">
                  Inquire: {inquiryModalSub}
                </h3>
                <p className="text-xs text-[#A8A8A8] mb-6 font-light">
                  Request comprehensive line specifications, lookbooks, or allocations.
                </p>

                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    setInquirySubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-white/70 block mb-1">Your Full Name</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Alexander Vance"
                      className="w-full bg-black border border-white/20 focus:border-[#C9A77C] text-xs text-white p-3 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-white/70 block mb-1">Contact Email / Phone</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. alexander@executive.com"
                      className="w-full bg-black border border-white/20 focus:border-[#C9A77C] text-xs text-white p-3 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-white/70 block mb-1">Notes / Specific Requirements</label>
                    <textarea 
                      rows={3}
                      placeholder={`I would like further information regarding ${inquiryModalSub}...`}
                      className="w-full bg-black border border-white/20 focus:border-[#C9A77C] text-xs text-white p-3 outline-none resize-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setInquiryModalSub(null)}
                      className="px-4 py-2.5 text-xs uppercase tracking-wider text-white/60 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="border border-[#C9A77C] bg-[#C9A77C] text-black px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-transparent hover:text-[#C9A77C] transition-colors"
                    >
                      Submit Inquiry
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          DIVISION FOOTER (Matches Reference Image)
          ========================================================================= */}
      <footer className="border-t border-white/10 py-10 px-6 sm:px-10 lg:px-16 bg-black">
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img 
              src="/thats-it/thats-it-logo.png" 
              alt="THAT'S IT" 
              className="h-8 w-auto object-contain filter brightness-110"
              onError={(e) => { (e.target as HTMLImageElement).src = '/thats-it/thats-it-logo.jpeg'; }}
            />
            <span className="text-xs uppercase tracking-[0.25em] text-[#A8A8A8]">
              THAT'S IT LUXURY DIVISION
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs uppercase tracking-[0.2em] text-[#A8A8A8]">
            <Link to="/divisions/thats-it" className="hover:text-[#C9A77C] transition-colors">
              DIVISION HOME
            </Link>
            <span className="text-white/20">|</span>
            <Link to="/divisions/thats-it/collections" className="hover:text-[#C9A77C] transition-colors">
              ALL COLLECTIONS
            </Link>
            <span className="text-white/20">|</span>
            <Link to="/" className="hover:text-[#C9A77C] transition-colors">
              KHANZ GROUP
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
