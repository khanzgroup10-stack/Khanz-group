import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowRight, 
  ArrowDown, 
  X, 
  SlidersHorizontal, 
  ChevronRight, 
  ShieldCheck, 
  Sparkles, 
  Compass, 
  Layers, 
  ArrowUpRight,
  ChevronLeft,
  Search,
  CheckCircle2
} from 'lucide-react';
import { 
  PRIMARY_CATEGORIES, 
  AUTHENTIC_PRODUCTS, 
  FUTURE_SERVICES,
  LIFESTYLE_PANELS, 
  BRAND_VALUES,
  CategoryData,
  AuthenticProduct
} from './thatsItData';
import { ThatsItCollectionsView } from './ThatsItCollectionsView';
import { ThatsItCategoryView } from './ThatsItCategoryView';

gsap.registerPlugin(ScrollTrigger);

export default function ThatsItPage() {
  const location = useLocation();
  const pathname = location.pathname;

  // Nested Route Matcher
  // Route 1: Dedicated Category View /divisions/thats-it/collections/:categoryId
  const categoryMatch = pathname.match(/\/divisions\/(?:thats-it|ThatsitPage|thatsit)\/collections\/([^/]+)/i);
  if (categoryMatch && categoryMatch[1]) {
    return <ThatsItCategoryView categoryId={categoryMatch[1]} />;
  }

  // Route 2: All Collections Directory View /divisions/thats-it/collections
  const isCollectionsDirectory = /\/divisions\/(?:thats-it|ThatsitPage|thatsit)\/collections\/?$/i.test(pathname);
  if (isCollectionsDirectory) {
    return <ThatsItCollectionsView />;
  }

  // Route 3: Main Curated THAT'S IT Division Homepage
  return <ThatsItHomepage />;
}

// =========================================================================
// THAT'S IT DIVISION CURATED HOMEPAGE
// =========================================================================
function ThatsItHomepage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProductSpec, setSelectedProductSpec] = useState<AuthenticProduct | null>(null);
  const [activeLifestyleIndex, setActiveLifestyleIndex] = useState(0);
  const [showAllEssentials, setShowAllEssentials] = useState(false);
  const [inquirySub, setInquirySub] = useState<string | null>(null);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // GSAP Cinematic Animation System
  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      // 01. HERO TIMELINE
      const heroTl = gsap.timeline();

      heroTl.fromTo(
        '.ti-hero-curtain',
        { scaleY: 1 },
        { scaleY: 0, transformOrigin: 'top', duration: 1.2, ease: 'power3.inOut' }
      );

      heroTl.fromTo(
        '.ti-hero-logo',
        { opacity: 0, scale: 0.88, filter: 'blur(8px)', y: 30 },
        { opacity: 1, scale: 1, filter: 'blur(0px)', y: 0, duration: 1.2, ease: 'power2.out' },
        '-=0.4'
      );

      heroTl.fromTo(
        '.ti-hero-tagline',
        { opacity: 0, letterSpacing: '0.4em', y: 15 },
        { opacity: 1, letterSpacing: '0.25em', y: 0, duration: 0.9, ease: 'power2.out' },
        '-=0.5'
      );

      heroTl.fromTo(
        '.ti-hero-headline',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.4'
      );

      heroTl.fromTo(
        '.ti-hero-cta, .ti-hero-scroll-indicator',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.15 },
        '-=0.3'
      );

      // Subtle Hero Parallax
      gsap.to('.ti-hero-video-bg', {
        scrollTrigger: {
          trigger: '.ti-hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        y: 100,
        scale: 1.05,
        ease: 'none'
      });

      // 02. ABOUT SECTION REVEALS
      gsap.fromTo(
        '.ti-about-badge, .ti-about-heading',
        { opacity: 0, y: 30 },
        {
          scrollTrigger: {
            trigger: '.ti-about-section',
            start: 'top 80%',
          },
          opacity: 1,
          y: 0,
          stagger: 0.18,
          duration: 0.9,
          ease: 'power3.out'
        }
      );

      gsap.fromTo(
        '.ti-about-copy, .ti-about-feature',
        { opacity: 0, y: 25 },
        {
          scrollTrigger: {
            trigger: '.ti-about-section',
            start: 'top 70%',
          },
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power2.out'
        }
      );

      // 03. SIGNATURE COLLECTIONS CARDS STAGGER
      gsap.fromTo(
        '.ti-collection-card',
        { opacity: 0, y: 40 },
        {
          scrollTrigger: {
            trigger: '.ti-collections-grid',
            start: 'top 85%',
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out'
        }
      );

      // 04. CURATED ESSENTIALS REVEAL
      gsap.fromTo(
        '.ti-essential-card',
        { opacity: 0, y: 35 },
        {
          scrollTrigger: {
            trigger: '.ti-essentials-grid',
            start: 'top 85%',
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out'
        }
      );

      // 05. FRAGRANCE CAMPAIGN ANIMATIONS
      const fragTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.ti-fragrance-section',
          start: 'top 75%',
        }
      });

      fragTl.fromTo(
        '.ti-frag-label',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );

      fragTl.fromTo(
        '.ti-frag-heading',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.3'
      );

      fragTl.fromTo(
        '.ti-frag-desc',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        '-=0.4'
      );

      fragTl.fromTo(
        '.ti-frag-cta',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        '-=0.4'
      );

      if (window.innerWidth >= 1024) {
        gsap.to('.ti-fragrance-parallax', {
          scrollTrigger: {
            trigger: '.ti-fragrance-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
          y: 35,
          ease: 'none'
        });
      }

      // 06. LIFESTYLE PANELS FADE
      gsap.fromTo(
        '.ti-lifestyle-panel',
        { opacity: 0, y: 30 },
        {
          scrollTrigger: {
            trigger: '.ti-lifestyle-section',
            start: 'top 80%',
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out'
        }
      );

      // 07. FUTURE SERVICES REVEAL
      gsap.fromTo(
        '.ti-future-card',
        { opacity: 0, y: 40 },
        {
          scrollTrigger: {
            trigger: '.ti-future-section',
            start: 'top 80%',
          },
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.2,
          ease: 'power3.out'
        }
      );

      // 08. BRAND VALUES
      gsap.fromTo(
        '.ti-value-card',
        { opacity: 0, y: 30 },
        {
          scrollTrigger: {
            trigger: '.ti-values-grid',
            start: 'top 85%',
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power2.out'
        }
      );

      // 09. FINAL CAMPAIGN BANNER
      gsap.fromTo(
        '.ti-final-content',
        { opacity: 0, y: 35 },
        {
          scrollTrigger: {
            trigger: '.ti-final-section',
            start: 'top 75%',
          },
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out'
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const displayedEssentials = showAllEssentials 
    ? AUTHENTIC_PRODUCTS 
    : AUTHENTIC_PRODUCTS.slice(0, 6);

  return (
    <div 
      ref={containerRef} 
      className="bg-[#0A0A0A] text-[#F5F3EF] min-h-screen font-sans selection:bg-[#C9A77C] selection:text-[#0A0A0A] overflow-x-hidden"
    >
      {/* Top Floating Luxury Header */}
      <header className="absolute top-0 left-0 right-0 z-40 px-6 sm:px-10 lg:px-16 py-6 flex items-center justify-between pointer-events-none">
        <Link 
          to="/" 
          className="pointer-events-auto inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C9A77C] hover:text-white transition-colors duration-300 bg-black/50 backdrop-blur-md px-4 py-2 border border-[#C9A77C]/30 hover:border-[#C9A77C]"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>KHANZ Home</span>
        </Link>
        <div className="hidden sm:flex pointer-events-auto items-center gap-8 text-[11px] uppercase tracking-[0.2em] text-[#A8A8A8] bg-black/40 backdrop-blur-md px-6 py-2 border border-white/10">
          <a href="#about" className="hover:text-[#C9A77C] transition-colors">About</a>
          <a href="#collections" className="hover:text-[#C9A77C] transition-colors">8 Collections</a>
          <a href="#curated" className="hover:text-[#C9A77C] transition-colors">Curated</a>
          <a href="#future-vision" className="hover:text-[#C9A77C] transition-colors">Future Vision</a>
          <Link to="/divisions/thats-it/collections" className="text-[#C9A77C] font-semibold hover:text-white transition-colors">
            All Collections &rarr;
          </Link>
        </div>
      </header>

      {/* =========================================================================
          01 — CINEMATIC HERO SECTION
          ========================================================================= */}
      <section className="relative w-full h-screen min-h-[640px] flex items-center justify-center overflow-hidden bg-black ti-hero-section">
        {/* Entrance Curtain for Smooth Mask Reveal */}
        <div className="ti-hero-curtain absolute inset-0 z-30 bg-[#0A0A0A] pointer-events-none" />

        {/* Video Background Layer with Cinematic Fallback & Gradient Overlays */}
        <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
          <video
            src="/thats-it/thatsit-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            poster="/thats-it/ChatGPT Image Sep 23, 2026, 09_35_01 PM.png"
            className="ti-hero-video-bg w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.12]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-black/60 z-10" />
          <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/80 z-10 pointer-events-none" />
        </div>

        {/* Hero Content Stack */}
        <div className="relative z-20 w-full max-w-5xl mx-auto px-6 text-center flex flex-col items-center justify-center pt-8">
          
          {/* Subtle Division Header Pill */}
          <div className="ti-hero-tagline flex items-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-[#C9A77C]/60" />
            <span className="text-[#C9A77C] text-[11px] md:text-xs font-semibold tracking-[0.3em] uppercase">
              KHANZ LUXURY DIVISION
            </span>
            <span className="w-8 h-[1px] bg-[#C9A77C]/60" />
          </div>

          {/* Official THAT'S IT Logo */}
          <div className="ti-hero-logo mb-6 relative">
            <img
              src="/thats-it/thats-it-logo.png"
              alt="THAT'S IT — Everything Men's"
              className="h-28 sm:h-36 md:h-44 lg:h-52 w-auto mx-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)] filter brightness-110"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/thats-it/thats-it-logo.jpeg';
              }}
            />
          </div>

          {/* Supporting Headline */}
          <p className="ti-hero-headline text-[#A8A8A8] text-xs sm:text-sm md:text-base font-light tracking-[0.25em] uppercase max-w-xl mx-auto mb-10">
            Style &middot; Grooming &middot; Essentials &middot; Lifestyle
          </p>

          {/* Action CTAs: First Curated Highlights, Below Explore All 8 Collections */}
          <div className="ti-hero-cta flex flex-col items-center gap-3 w-full max-w-md mx-auto">
            <a
              href="/divisions/thats-it#collections"
              className="text-[#A8A8A8] hover:text-[#F5F3EF] px-6 py-2 text-xs tracking-[0.2em] uppercase transition-colors flex items-center gap-2 group"
            >
              <span>Curated Highlights</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#C9A77C] group-hover:translate-x-0.5 transition-transform" />
            </a>

            <Link
              to="/divisions/thats-it/collections"
              className="group relative overflow-hidden border border-[#C9A77C]/70 bg-black/40 backdrop-blur-sm text-[#F5F3EF] px-9 py-4 text-xs font-semibold uppercase tracking-[0.25em] transition-all duration-300 hover:border-[#C9A77C] flex items-center gap-3"
            >
              <span className="relative z-10 group-hover:text-black transition-colors duration-400">
                Explore All 8 Collections
              </span>
              <span className="relative z-10 text-[#C9A77C] group-hover:text-black transition-colors duration-400">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
              <div className="absolute inset-0 bg-[#C9A77C] transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400 ease-out z-0" />
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className="ti-hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-80 pointer-events-none">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#A8A8A8]">Scroll To Explore</span>
            <div className="w-[1px] h-9 bg-gradient-to-b from-[#C9A77C] via-[#C9A77C]/50 to-transparent animate-pulse" />
          </div>
        </div>
      </section>


      {/* =========================================================================
          02 — ABOUT THE BRAND
          ========================================================================= */}
      <section id="about" className="ti-about-section bg-[#0D0D0D] py-24 md:py-32 px-6 md:px-12 lg:px-20 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div className="flex flex-col justify-center">
            <div className="ti-about-badge flex items-center gap-4 mb-6">
              <span className="text-[#C9A77C] text-xs tracking-[0.25em] font-semibold uppercase">
                About The Brand
              </span>
              <div className="w-16 h-[1px] bg-[#C9A77C]/50" />
            </div>

            <h2 className="ti-about-heading text-4xl sm:text-5xl md:text-6xl font-serif-luxury font-light leading-[1.1] mb-8 text-[#F5F3EF]">
              CRAFTED FOR <br />
              THE <span className="text-[#C9A77C] italic font-normal">MODERN MAN</span>
            </h2>

            <div className="ti-about-copy space-y-4 text-[#A8A8A8] text-sm sm:text-base leading-relaxed font-light max-w-xl mb-10">
              <p>
                THAT’S IT was conceived with a single, uncompromising vision: to curate a complete wardrobe and lifestyle ecosystem built entirely around the modern man. From precision-tailored clothing and sharp dress shirts to durable everyday casuals, every garment is thoughtfully designed to deliver effortless presence and timeless masculine poise.
              </p>
              <p>
                Our comprehensive taxonomy extends beyond apparel to embody every facet of daily distinction. Handcrafted footwear, architectural leather goods, signature Eau de Parfum blends, master-formulated grooming essentials, and breathable foundation layers unite under one coherent design philosophy — pairing dependable quality with clean, accessible luxury.
              </p>
              <p>
                We believe genuine confidence is forged in the details. By bringing together premium materials, meticulous craftsmanship, and purposeful functionality, THAT’S IT provides the modern gentleman with a versatile toolkit for every trajectory — from commanding boardroom summits to relaxed weekend retreats.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 sm:gap-8 pt-6 border-t border-white/10">
              <div className="ti-about-feature flex flex-col">
                <div className="text-[#C9A77C] mb-3">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h4 className="text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase text-[#F5F3EF] mb-1">
                  Timeless Style
                </h4>
                <p className="text-[11px] text-[#A8A8A8] font-light leading-snug">
                  Classics tailored for today and tomorrow.
                </p>
              </div>

              <div className="ti-about-feature flex flex-col border-l border-white/10 pl-6 sm:pl-8">
                <div className="text-[#C9A77C] mb-3">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase text-[#F5F3EF] mb-1">
                  Premium Quality
                </h4>
                <p className="text-[11px] text-[#A8A8A8] font-light leading-snug">
                  Exceptional materials with lasting durability.
                </p>
              </div>

              <div className="ti-about-feature flex flex-col border-l border-white/10 pl-6 sm:pl-8">
                <div className="text-[#C9A77C] mb-3">
                  <Compass className="w-6 h-6" />
                </div>
                <h4 className="text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase text-[#F5F3EF] mb-1">
                  Modern Confidence
                </h4>
                <p className="text-[11px] text-[#A8A8A8] font-light leading-snug">
                  Everyday essentials for a bolder you.
                </p>
              </div>
            </div>
          </div>

          <div className="ti-about-image-wrap relative h-[480px] sm:h-[600px] lg:h-[720px] w-full overflow-hidden bg-black/60">
            <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-transparent to-transparent z-10 w-1/3 pointer-events-none" />
            <img
              src="https://images.unsplash.com/photo-1593030103066-0093718efeb9?q=80&w=1200&auto=format&fit=crop"
              alt="THAT'S IT Luxury Menswear"
              className="ti-about-img w-full h-[115%] object-cover object-top grayscale-[18%] transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute bottom-6 right-6 z-20 bg-black/80 backdrop-blur-md border border-[#C9A77C]/40 px-5 py-3">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#C9A77C] font-semibold block">
                Editorial Standard
              </span>
              <span className="text-xs text-[#F5F3EF] font-serif-luxury italic">
                Autumn / Winter Signature
              </span>
            </div>
          </div>

        </div>
      </section>


      {/* =========================================================================
          03 — SIGNATURE COLLECTIONS (8 PRIMARY CATEGORIES GRID)
          ========================================================================= */}
      <section id="collections" className="bg-[#141414] py-24 md:py-32 px-6 md:px-12 lg:px-20 border-t border-white/5">
        <div className="max-w-[1600px] mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[#C9A77C] text-xs tracking-[0.25em] font-semibold uppercase mb-3 block">
                Signature Collections
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-luxury font-light uppercase tracking-wide text-[#F5F3EF]">
                All 8 Brand Divisions
              </h2>
              <p className="text-xs sm:text-sm text-[#A8A8A8] tracking-[0.15em] uppercase mt-3 max-w-xl">
                Every aspect of a modern gentleman's wardrobe, grooming, and lifestyle
              </p>
            </div>

            <Link
              to="/divisions/thats-it/collections"
              className="inline-flex items-center gap-3 text-xs uppercase font-semibold tracking-[0.25em] text-[#C9A77C] hover:text-[#F5F3EF] border-b border-[#C9A77C]/40 pb-1 self-start md:self-end"
            >
              Explore Complete Taxonomy Directory
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="ti-collections-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {PRIMARY_CATEGORIES.filter(c => !c.isFutureVision).map((cat) => (
              <div
                key={cat.id}
                className="ti-collection-card group relative flex flex-col bg-[#0A0A0A] border border-white/10 hover:border-[#C9A77C]/60 transition-all duration-500 overflow-hidden"
              >
                {/* Genuine Branded Photography Container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-black">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-500" />
                  
                  {/* Category Pill Tag */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9A77C] font-semibold bg-black/80 backdrop-blur-sm px-2.5 py-1 border border-[#C9A77C]/30">
                      {cat.tag}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 z-10">
                    <span className="text-[9px] uppercase tracking-wider text-white/80 bg-black/60 px-2 py-0.5 border border-white/15">
                      {cat.subcategories.length} lines
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
                    <p className="text-xs text-white/70 font-light leading-relaxed mb-4 line-clamp-2">
                      {cat.description}
                    </p>

                    {/* Subtle Contextual Subcategory Previews */}
                    <div className="flex flex-wrap gap-1 mb-5">
                      {cat.previewSubcategories.slice(0, 3).map((sub) => (
                        <span
                          key={sub}
                          className="text-[9px] uppercase tracking-wider text-white/60 bg-white/5 border border-white/10 px-2 py-0.5"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  {cat.id === 'grooming' || cat.id === 'sports-fitness' ? (
                    <div
                      aria-disabled="true"
                      className="pt-3 border-t border-white/10 flex items-center justify-between text-xs uppercase tracking-[0.2em] font-semibold text-[#A8A8A8] cursor-default select-none pointer-events-none"
                    >
                      <span>COMING SOON</span>
                    </div>
                  ) : (
                    <Link
                      to={`/divisions/thats-it/collections/${cat.slug}`}
                      className="pt-3 border-t border-white/10 flex items-center justify-between text-xs uppercase tracking-[0.2em] font-semibold text-[#F5F3EF] group-hover:text-[#C9A77C] transition-colors"
                    >
                      <span>Open Category View</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C9A77C] group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* =========================================================================
          04 — CURATED FOR CHARACTER (AUTHENTIC FEATURED PIECES)
          ========================================================================= */}
      <section id="curated" className="bg-[#0D0D0D] py-24 md:py-32 px-6 md:px-12 lg:px-20 border-t border-white/5">
        <div className="max-w-[1500px] mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[#C9A77C] text-xs tracking-[0.25em] font-semibold uppercase mb-3 block">
                Featured Essentials
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-luxury font-light text-[#F5F3EF]">
                Curated For Character
              </h2>
              <p className="text-xs text-[#A8A8A8] tracking-[0.2em] uppercase mt-2">
                A selection of genuine supplied branded assets
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowAllEssentials(!showAllEssentials)}
                className="text-xs uppercase font-semibold tracking-[0.2em] text-[#C9A77C] hover:text-[#F5F3EF] transition-colors border-b border-[#C9A77C]/40 pb-1"
              >
                {showAllEssentials ? 'Show Highlighted' : 'View All Supplied Products'}
              </button>
              <Link
                to="/divisions/thats-it/collections"
                className="text-xs uppercase font-semibold tracking-[0.2em] text-white hover:text-[#C9A77C] transition-colors border border-white/20 px-4 py-2"
              >
                Explore Complete Range &rarr;
              </Link>
            </div>
          </div>

          <div className="ti-essentials-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedEssentials.map((item) => (
              <div
                key={item.id}
                className="ti-essential-card group bg-[#111111] border border-white/10 hover:border-[#C9A77C]/50 transition-all duration-500 flex flex-col overflow-hidden"
              >
                <div className="relative aspect-square overflow-hidden bg-black">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="text-[9px] uppercase tracking-[0.2em] bg-black/80 backdrop-blur-sm text-[#C9A77C] border border-[#C9A77C]/30 px-2.5 py-1">
                      {item.tag}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#A8A8A8] block mb-2 font-medium">
                      {item.subcategory}
                    </span>
                    <h4 className="text-lg font-serif-luxury text-[#F5F3EF] mb-3 group-hover:text-[#C9A77C] transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-xs text-[#A8A8A8] font-light leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-[10px] tracking-[0.2em] text-[#C9A77C] uppercase font-semibold">
                      THAT’S IT EXCLUSIVE
                    </span>
                    <Link
                      to={`/divisions/thats-it/collections/${item.categoryId}`}
                      className="text-white/70 hover:text-white flex items-center gap-1 group/btn text-[11px] uppercase tracking-wider"
                    >
                      <span>In Category</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#C9A77C] group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* =========================================================================
          05 — SIGNATURE FRAGRANCE CAMPAIGN
          Strict Two-Column Design Matching Reference Image
          Left Side (45%): Typography & CTA | Right Side (55%): Bottle & Packaging
          ========================================================================= */}
      <section className="ti-fragrance-section relative min-h-[580px] lg:min-h-[660px] xl:min-h-[720px] flex items-center bg-[#070707] overflow-hidden border-t border-white/5">
        {/* Background Visual Layer: Signature Presence Fragrance Collection */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <img
            src="/thats-it/Signature Presence Fragrance Collection.png"
            alt="THAT'S IT Signature Fragrance — Your Signature, Your Presence"
            className="ti-fragrance-parallax w-full h-full object-cover object-right md:object-center filter brightness-[0.95] contrast-[1.05]"
            loading="lazy"
          />
          {/* Subtle directional scrim on the left ensures crisp typographic legibility without washing out the product */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-transparent w-full lg:w-3/5 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 z-10 lg:hidden" />
        </div>

        {/* Two-Column Horizontal Layout */}
        <div className="relative z-20 w-full max-w-[1600px] mx-auto px-6 sm:px-10 md:px-14 lg:px-20 py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* LEFT SIDE — 45% width */}
          <div className="lg:col-span-6 xl:col-span-5 max-w-xl">
            {/* Small Label */}
            <div className="ti-frag-label flex items-center gap-3 mb-6">
              <span className="text-[#C9A77C] text-xs font-semibold tracking-[0.25em] uppercase">
                Signature Scents
              </span>
              <div className="w-12 h-[1px] bg-[#C9A77C]/60" />
            </div>

            {/* Large Heading */}
            <h2 className="ti-frag-heading text-4xl sm:text-5xl md:text-6xl font-serif-luxury font-light leading-[1.08] mb-6 text-[#F5F3EF] tracking-tight">
              YOUR SIGNATURE. <br />
              YOUR <span className="text-[#C9A77C] italic font-normal">PRESENCE.</span>
            </h2>

            {/* Description */}
            <p className="ti-frag-desc text-[#A8A8A8] text-sm sm:text-base leading-relaxed font-light mb-8 max-w-lg">
              A rich olfactive dialogue between smoky agarwood, warm leather, and Italian bergamot. Engineered to leave an undeniable mark in every boardroom and evening reception.
            </p>

            {/* CTA Button */}
            <div className="ti-frag-cta">
              <Link
                to="/divisions/thats-it/collections/fragrances"
                className="group relative inline-flex items-center gap-3 border border-[#C9A77C]/70 bg-black/60 backdrop-blur-sm text-[#F5F3EF] px-8 sm:px-9 py-4 text-xs font-semibold uppercase tracking-[0.25em] transition-all duration-300 hover:border-[#C9A77C] hover:bg-[#C9A77C] hover:text-black"
              >
                <span className="relative z-10 transition-colors duration-300">
                  Explore Fragrances Collection
                </span>
                <span className="relative z-10 text-[#C9A77C] group-hover:text-black transition-colors duration-300">
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE — 55% width dedicated stage for bottle & packaging */}
          <div className="hidden lg:flex lg:col-span-6 xl:col-span-7 justify-end items-center pointer-events-none min-h-[420px]">
            {/* The right 55% preserves the large, sharp, beautifully staged perfume bottle and luxury box */}
          </div>
        </div>
      </section>


      {/* =========================================================================
          06 — STYLE FOR EVERY MOMENT (4 INTERACTIVE LIFESTYLE PANELS)
          ========================================================================= */}
      <section className="ti-lifestyle-section bg-[#0A0A0A] py-24 md:py-32 px-6 md:px-12 lg:px-20 border-t border-white/5">
        <div className="max-w-[1500px] mx-auto">
          
          <div className="text-center mb-16">
            <span className="text-[#C9A77C] text-xs tracking-[0.25em] font-semibold uppercase mb-4 block">
              Dynamic Wardrobe Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-luxury font-light uppercase text-[#F5F3EF]">
              Style For Every Moment
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row h-auto lg:h-[540px] gap-4">
            {LIFESTYLE_PANELS.map((panel, idx) => {
              const isActive = activeLifestyleIndex === idx;
              return (
                <div
                  key={panel.id}
                  onClick={() => setActiveLifestyleIndex(idx)}
                  className={`ti-lifestyle-panel relative overflow-hidden cursor-pointer transition-all duration-700 ease-out border border-white/5 ${
                    isActive ? 'lg:flex-[2.5] min-h-[380px] lg:min-h-full border-[#C9A77C]/50' : 'lg:flex-[1] min-h-[220px] lg:min-h-full'
                  }`}
                >
                  <img
                    src={panel.image}
                    alt={panel.label}
                    className="w-full h-full object-cover object-center filter grayscale-[15%] transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />

                  <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end z-10">
                    <span className="text-[10px] tracking-[0.25em] text-[#C9A77C] uppercase font-semibold mb-2 block">
                      {panel.label}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif-luxury text-[#F5F3EF] mb-2">
                      {panel.headline}
                    </h3>
                    
                    <p className={`text-xs text-[#A8A8A8] font-light leading-relaxed max-w-sm transition-all duration-500 ${
                      isActive ? 'opacity-100 max-h-24' : 'opacity-0 max-h-0 overflow-hidden lg:block'
                    }`}>
                      {panel.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>





      {/* =========================================================================
          08 — OUR FUTURE VISION (SEPARATE FUTURE SERVICE CONCEPTS)
          ========================================================================= */}
      <section id="future-vision" className="ti-future-section bg-[#0A0A0A] py-24 md:py-32 px-6 md:px-12 lg:px-20 border-t border-white/5">
        <div className="max-w-[1500px] mx-auto">
          
          <div className="text-center mb-16 md:mb-20">
            <span className="text-[#C9A77C] text-xs tracking-[0.25em] font-semibold uppercase mb-4 block">
              Expanding The Experience
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-luxury font-light uppercase text-[#F5F3EF]">
              Future Vision &middot; Services
            </h2>
            <div className="inline-block mt-3 bg-white/5 border border-white/10 px-4 py-1.5 text-[11px] uppercase tracking-widest text-[#A8A8A8]">
              Future Concepts &middot; Not Currently Operational
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {FUTURE_SERVICES.map((srv) => (
              <div 
                key={srv.id}
                className="ti-future-card relative min-h-[480px] bg-black border border-white/10 p-8 sm:p-12 flex flex-col justify-between overflow-hidden group"
              >
                <img
                  src={srv.image}
                  alt={srv.title}
                  className="absolute inset-0 w-full h-full object-cover filter brightness-[0.35] group-hover:scale-104 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />

                <div className="relative z-20 flex justify-between items-start">
                  <span className="text-[10px] tracking-[0.25em] uppercase bg-[#C9A77C]/20 border border-[#C9A77C] text-[#C9A77C] font-semibold px-3 py-1">
                    {srv.status}
                  </span>
                </div>

                <div className="relative z-20">
                  <h3 className="text-2xl sm:text-3xl font-serif-luxury text-[#F5F3EF] mb-2">
                    {srv.title}
                  </h3>
                  <p className="text-xs uppercase tracking-widest text-[#C9A77C] mb-4">
                    {srv.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-[#A8A8A8] font-light leading-relaxed max-w-md mb-6">
                    {srv.description}
                  </p>

                  <div className="space-y-1.5 mb-6">
                    {srv.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-2 text-xs text-white/80 font-light">
                        <span className="w-1.5 h-1.5 bg-[#C9A77C] rounded-full" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="inline-block border border-white/20 px-4 py-2 text-[10px] tracking-[0.2em] uppercase text-white/70">
                      Concept In Development
                    </span>
                    <Link 
                      to={`/divisions/thats-it/collections/${srv.id}`}
                      className="border border-[#C9A77C]/60 text-[#C9A77C] hover:bg-[#C9A77C] hover:text-black px-4 py-2 text-[10px] tracking-[0.2em] uppercase font-semibold transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>Explore Taxonomy</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* =========================================================================
          09 — BRAND VALUES (A LIFESTYLE OF INTENTION)
          ========================================================================= */}
      <section className="bg-[#0E0E0E] py-24 md:py-32 px-6 md:px-12 lg:px-20 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="text-center mb-16 md:mb-20">
            <span className="text-[#C9A77C] text-xs tracking-[0.25em] font-semibold uppercase mb-4 block">
              More Than Fashion
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-luxury font-light uppercase text-[#F5F3EF]">
              A Lifestyle of Intention
            </h2>
            <div className="w-16 h-[1px] bg-[#C9A77C]/50 mx-auto mt-6" />
          </div>

          <div className="ti-values-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {BRAND_VALUES.map((val, idx) => (
              <div
                key={val.title}
                className="ti-value-card flex flex-col items-center text-center p-6 border-b sm:border-b-0 sm:border-r border-white/5 last:border-none"
              >
                <div className="w-20 h-20 rounded-full border border-[#C9A77C]/40 flex items-center justify-center mb-6 bg-black/40">
                  <span className="text-[#C9A77C] text-xl font-serif-luxury">
                    0{idx + 1}
                  </span>
                </div>
                <h3 className="text-sm font-semibold tracking-[0.15em] uppercase text-[#F5F3EF] mb-3">
                  {val.title}
                </h3>
                <p className="text-xs text-[#A8A8A8] font-light leading-relaxed max-w-xs">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* =========================================================================
          10 — FINAL CAMPAIGN BANNER (LOOK GOOD. FEEL GREAT.)
          ========================================================================= */}
      <section className="ti-final-section relative min-h-[580px] lg:h-[700px] flex items-center bg-[#070707] overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1550246140-5119ae4790b8?q=80&w=2000&auto=format&fit=crop"
            alt="LOOK GOOD. FEEL GREAT."
            className="ti-final-bg w-full h-[120%] object-cover object-top filter grayscale brightness-50"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent w-full max-w-3xl z-10" />
        </div>

        <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-20">
          <div className="ti-final-content max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[#C9A77C] text-xs tracking-[0.25em] font-semibold uppercase">
                THAT'S IT
              </span>
              <div className="w-16 h-[1px] bg-[#C9A77C]/60" />
            </div>

            <h2 className="text-5xl sm:text-6xl md:text-7xl font-serif-luxury font-light leading-[1.05] mb-6 text-[#F5F3EF]">
              LOOK GOOD. <br />
              FEEL GREAT.
            </h2>

            <p className="text-xs sm:text-sm text-[#A8A8A8] tracking-[0.2em] uppercase font-light mb-10">
              Premium essentials for a better you.
            </p>

            <Link
              to="/divisions/thats-it/collections"
              className="inline-flex items-center gap-3 border border-[#C9A77C] bg-black text-[#F5F3EF] px-10 py-4 text-xs font-semibold uppercase tracking-[0.25em] hover:bg-[#C9A77C] hover:text-black transition-all duration-400"
            >
              Browse All Collections
              <ArrowRight className="w-4 h-4 text-[#C9A77C] group-hover:text-black" />
            </Link>
          </div>
        </div>
      </section>


      {/* =========================================================================
          11 — DIVISION END SECTION (THAT'S IT SIGN-OFF & PARENT SITE LINK)
          ========================================================================= */}
      <div className="bg-black py-12 px-6 md:px-12 lg:px-20 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          
          <div className="flex items-center gap-4">
            <img
              src="/thats-it/thats-it-logo.png"
              alt="THAT'S IT"
              className="h-10 w-auto object-contain filter brightness-110"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/thats-it/thats-it-logo.jpeg';
              }}
            />
            <div className="border-l border-white/20 pl-4">
              <h4 className="text-xs font-semibold tracking-[0.2em] text-[#F5F3EF] uppercase">
                THAT'S IT
              </h4>
              <p className="text-[9px] text-[#A8A8A8] tracking-[0.3em] uppercase">
                A Division of KHANZ Group
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-[11px] font-semibold tracking-[0.2em] uppercase text-[#A8A8A8]">
            <Link to="/divisions/thats-it/collections" className="hover:text-[#C9A77C] transition-colors">
              Collections Directory
            </Link>
            <a href="#about" className="hover:text-[#C9A77C] transition-colors">
              About
            </a>
            <Link to="/" className="hover:text-[#C9A77C] transition-colors flex items-center gap-1.5 text-white/80">
              <ChevronLeft className="w-3.5 h-3.5" /> Back to KHANZ
            </Link>
          </div>

          <div className="text-[10px] text-[#A8A8A8] font-light tracking-widest uppercase">
            &copy; {new Date().getFullYear()} THAT'S IT. All rights reserved.
          </div>

        </div>
      </div>
    </div>
  );
}
