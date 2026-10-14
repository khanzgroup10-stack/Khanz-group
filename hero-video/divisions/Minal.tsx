import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { ShoppingBag, Search, User, ArrowRight } from 'lucide-react';
import minalHeroVideo from '../minal/minal-video.mp4';

gsap.registerPlugin(ScrollTrigger);

export default function Minal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Hero Intro Sequence
      const tl = gsap.timeline();

      // Mask opens to reveal video
      tl.to('.hero-curtain', {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 1.5,
        ease: 'power3.inOut',
      });

      // Logo reveal
      tl.from('.hero-logo', {
        opacity: 0,
        y: 30,
        duration: 1.5,
        ease: 'power2.out',
      }, '-=0.5');

      // Subtitle (Removed per user request if duplicate)
      // Removed subtitle animation from timeline

      // ELEGANCE REFINED text
      tl.from('.hero-eyebrow-text', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      }, '-=0.4');

      // CTA
      tl.from('.hero-cta', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.6');

      // Scroll Indicator
      tl.from('.scroll-indicator', {
        opacity: 0,
        duration: 1,
      }, '-=0.2');

      gsap.to('.scroll-line', {
        yPercent: 100,
        repeat: -1,
        duration: 1.5,
        ease: 'linear',
      });

      // --- SECTION 3: ABOUT BRAND ---
      const aboutLines = new SplitType('.about-heading', { types: 'lines' });
      gsap.from(aboutLines.lines, {
        scrollTrigger: { trigger: '.about-section', start: 'top 75%' },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
      });

      gsap.from('.about-eyebrow', {
        scrollTrigger: { trigger: '.about-section', start: 'top 80%' },
        opacity: 0,
        y: 20,
        duration: 0.8,
      });

      gsap.from('.about-desc', {
        scrollTrigger: { trigger: '.about-section', start: 'top 70%' },
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.3,
      });

      gsap.from('.about-value', {
        scrollTrigger: { trigger: '.about-values-container', start: 'top 85%' },
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out',
      });

      // Parallax & Mask for image
      gsap.from('.about-image-container', {
        scrollTrigger: { trigger: '.about-image-container', start: 'top 85%' },
        clipPath: 'inset(100% 0% 0% 0%)',
        duration: 1.5,
        ease: 'power3.inOut',
      });
      
      gsap.to('.about-image', {
        scrollTrigger: { trigger: '.about-image-container', start: 'top bottom', end: 'bottom top', scrub: true },
        y: 50,
        ease: 'none',
      });

      // --- SECTION 4: EXPLORE COLLECTION ---
      gsap.from('.cat-item', {
        scrollTrigger: { trigger: '.cat-container', start: 'top 80%' },
        opacity: 0,
        y: 40,
        scale: 0.95,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out',
      });
      gsap.from('.cat-line', {
        scrollTrigger: { trigger: '.cat-container', start: 'top 80%' },
        scaleY: 0,
        transformOrigin: 'top',
        stagger: 0.1,
        duration: 0.6,
        delay: 0.4,
      });

      // --- SECTION 5: LATEST ARRIVALS ---
      gsap.from('.arrivals-eyebrow, .arrivals-heading, .arrivals-desc, .arrivals-cta', {
        scrollTrigger: { trigger: '.arrivals-header', start: 'top 85%' },
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out',
      });

      const arrivalCards = gsap.utils.toArray('.arrival-card');
      arrivalCards.forEach((card: any, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: 'top 90%' },
          opacity: 0,
          y: 40,
          scale: 0.98,
          duration: 0.8,
          ease: 'power2.out',
        });
      });

      // --- SECTION 6: MORE THAN FASHION ---
      const moreHeading = new SplitType('.more-heading', { types: 'words' });
      gsap.from(moreHeading.words, {
        scrollTrigger: { trigger: '.more-section', start: 'top 80%' },
        opacity: 0,
        y: 20,
        stagger: 0.05,
        duration: 0.8,
        ease: 'power3.out',
      });
      
      gsap.from('.more-value', {
        scrollTrigger: { trigger: '.more-values-container', start: 'top 85%' },
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out',
      });

      // --- SECTION 7: LIFESTYLE ---
      gsap.from('.lifestyle-img-container', {
        scrollTrigger: { trigger: '.lifestyle-section', start: 'top 80%' },
        clipPath: 'inset(0% 100% 0% 0%)',
        duration: 1.5,
        ease: 'power3.inOut',
      });
      
      gsap.to('.lifestyle-img', {
        scrollTrigger: { trigger: '.lifestyle-section', start: 'top bottom', end: 'bottom top', scrub: true },
        scale: 1.1,
        y: -30,
        ease: 'none',
      });

      const lifeLines = new SplitType('.lifestyle-heading', { types: 'lines' });
      gsap.from(lifeLines.lines, {
        scrollTrigger: { trigger: '.lifestyle-content', start: 'top 75%' },
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
      });
      gsap.from('.lifestyle-eyebrow, .lifestyle-desc, .lifestyle-cta', {
        scrollTrigger: { trigger: '.lifestyle-content', start: 'top 75%' },
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.8,
        delay: 0.2,
      });

      // --- NEWSLETTER & FOOTER ---
      gsap.from('.footer-reveal', {
        scrollTrigger: { trigger: 'footer', start: 'top 90%' },
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.8,
      });
      gsap.from('.footer-divider', {
        scrollTrigger: { trigger: 'footer', start: 'top 90%' },
        scaleX: 0,
        duration: 1.2,
        ease: 'power3.inOut',
      });

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#FAF9F5] text-[#2c3e29] font-serif selection:bg-[#7a9a65] selection:text-white overflow-hidden">
      
      {/* 1. HEADER / NAVIGATION (Removed as requested) */}

      {/* 2. HERO VIDEO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FAF9F5]">
        <div className="hero-curtain absolute inset-0 z-30 bg-[#FAF9F5] w-full h-full pointer-events-none"></div>
        
        <div className="absolute inset-0 z-0 w-full h-full">
          <video 
            src={minalHeroVideo} 
            autoPlay 
            muted 
            loop 
            playsInline
            preload="metadata"
            className="w-full h-full object-cover object-center opacity-85"
          />
        </div>
        
        <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[#FAF9F5]/20 via-black/30 to-transparent pointer-events-none z-10"></div>
        
        <div className="relative z-20 flex flex-col items-center text-center w-full px-6 mt-10">
          <div className="hero-logo mb-10">
            <img 
              src="/minal/minal-logo-transparent.png" 
              alt="Minal Collection's" 
              className="w-[280px] sm:w-[310px] md:w-[380px] lg:w-[480px] xl:w-[540px] max-w-[80vw] object-contain" 
            />
          </div>

          <div className="overflow-hidden mb-10 mt-4">
            <p className="hero-eyebrow-text text-sm md:text-base tracking-[0.3em] uppercase text-white font-semibold drop-shadow-lg">
              Elegance Refined
            </p>
          </div>
          
          <a
            href="#collection" 
            className="hero-cta group flex items-center gap-3 bg-white text-black px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#28342A] hover:text-white transition-colors duration-500 shadow-xl"
          >
            Discover the Collection
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>

        <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
          <div className="w-[1px] h-12 bg-white/30 relative overflow-hidden">
            <div className="scroll-line absolute top-0 left-0 w-full h-1/2 bg-white" />
          </div>
        </div>
      </section>

      {/* 3. ABOUT THE BRAND */}
      <section className="about-section bg-[#FAF9F5] py-24 lg:py-32 overflow-hidden relative">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div className="flex flex-col">
            <span className="about-eyebrow text-[#728361] text-[10px] tracking-[0.25em] font-semibold uppercase mb-6 block">
              About the Brand
            </span>
            
            <h2 className="about-heading text-[#28342A] text-4xl md:text-5xl lg:text-[3.5rem] font-serif leading-[1.1] mb-6 clip-text">
              Timeless Sophistication,<br/>Gracefully Crafted
            </h2>
            
            <div className="w-16 h-[1px] bg-[#C8A46E] mb-8 about-eyebrow" />
            
            <p className="about-desc text-[#777C70] text-base md:text-lg font-sans font-light leading-relaxed mb-16 max-w-lg">
              Minal Collection embodies the essence of pure luxury. We craft garments and lifestyle pieces that speak a language of timeless sophistication, blending traditional artistry with modern grace.
            </p>
            
            <div className="about-values-container grid grid-cols-3 gap-6 text-center lg:text-left">
              {[
                { title: 'Premium\nCraftsmanship', desc: 'Finest materials and delicate detailing.' },
                { title: 'Timeless\nElegance', desc: 'Designed for every occasion.' },
                { title: 'Modern\nFemininity', desc: 'A perfect blend of tradition and today.' },
              ].map((value, i) => (
                <div 
                  key={i}
                  className={`about-value flex flex-col items-center lg:items-start ${i > 0 ? 'lg:pl-6 lg:border-l lg:border-[#728361]/20' : ''}`}
                >
                  <div className="w-8 h-8 rounded-full border border-[#C8A46E]/30 flex items-center justify-center mb-4 text-[#C8A46E]">
                    <span className="text-xs font-serif">{i + 1}</span>
                  </div>
                  <h4 className="text-[#28342A] text-[10px] font-bold tracking-[0.15em] uppercase mb-2 whitespace-pre-line">{value.title}</h4>
                  <p className="text-[#777C70] text-[9px] font-light leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="about-image-container relative h-[600px] lg:h-[800px] w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F5] via-[#FAF9F5]/40 to-transparent z-10 w-full max-w-[150px]"></div>
            <img 
              src="/minal/ChatGPT%20Image%20Sep%2024,%202026,%2009_06_37%20PM.png" 
              alt="Brand Editorial" 
              className="about-image w-full h-[120%] object-cover object-center -mt-[10%]" 
            />
          </div>
        </div>
      </section>

      {/* 4. EXPLORE OUR COLLECTION */}
      <section id="collection" className="bg-[#FFFFFF] py-24 px-6 md:px-12 overflow-hidden">
        <div className="max-w-[1200px] mx-auto cat-container">
          <h2 className="cat-item text-center text-[#28342A] text-xs font-bold tracking-[0.2em] uppercase mb-16">
            Explore Our Collection
          </h2>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {[
              { name: 'Dresses', img: '/minal/ChatGPT%20Image%20Sep%2024,%202026,%2009_05_02%20PM.png' },
              { name: 'Bags', img: '/minal/ChatGPT%20Image%20Sep%2024,%202026,%2009_06_26%20PM.png' },
              { name: 'Beauty', img: '/minal/ChatGPT%20Image%20Sep%2024,%202026,%2009_05_27%20PM.png' },
              { name: 'Footwear', img: '/minal/ChatGPT%20Image%20Sep%2024,%202026,%2009_06_14%20PM.png' },
              { name: 'Accessories', img: '/minal/ChatGPT%20Image%20Sep%2024,%202026,%2009_05_38%20PM.png' }
            ].map((cat, i) => (
              <React.Fragment key={cat.name}>
                <a 
                  href="#"
                  className="cat-item flex flex-col items-center group cursor-pointer"
                >
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-[#FAF9F5] p-2 mb-6 border border-transparent group-hover:border-[#7a9a65] transition-all duration-500 relative">
                    <img src={cat.img} alt={cat.name} className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-700 ease-out" />
                  </div>
                  <span className="text-[#28342A] text-[10px] font-bold tracking-[0.2em] uppercase group-hover:text-[#7a9a65] transition-colors duration-300 flex items-center gap-2">
                    {cat.name}
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </span>
                </a>
                {i < 4 && (
                  <div className="cat-line hidden md:block w-[1px] h-12 bg-[#728361]/20" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* 5. LATEST ARRIVALS */}
      <section className="bg-[#FAF9F5] py-24 px-6 md:px-12 lg:px-20 overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="arrivals-header flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
            <div>
              <span className="arrivals-eyebrow text-[#728361] text-[10px] tracking-[0.25em] font-semibold uppercase mb-4 block">Curated Pieces</span>
              <h2 className="arrivals-heading text-[#28342A] text-4xl md:text-5xl font-serif font-light mb-4">
                Latest Arrivals
              </h2>
              <p className="arrivals-desc text-[#777C70] text-sm md:text-base font-light">A refined selection of our newest pieces, thoughtfully designed for the modern muse.</p>
            </div>
            <a href="#" className="arrivals-cta mt-8 md:mt-0 inline-block border border-[#28342A]/20 text-[#28342A] px-6 py-3 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-[#28342A] hover:text-white transition-colors duration-300">
              View All →
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Sage Green Dress', cat: 'Dresses', img: '/minal/ChatGPT%20Image%20Sep%2024,%202026,%2009_05_02%20PM.png' },
              { title: 'Hair Styling Set', cat: 'Beauty', img: '/minal/ChatGPT%20Image%20Sep%2024,%202026,%2009_05_16%20PM.png' },
              { title: 'Beauty Essentials', cat: 'Beauty', img: '/minal/ChatGPT%20Image%20Sep%2024,%202026,%2009_05_27%20PM.png' },
              { title: 'Elegant Belt', cat: 'Accessories', img: '/minal/ChatGPT%20Image%20Sep%2024,%202026,%2009_05_38%20PM.png' },
              { title: 'Minimal Wallet', cat: 'Accessories', img: '/minal/ChatGPT%20Image%20Sep%2024,%202026,%2009_05_49%20PM.png' },
              { title: 'Signature Watch', cat: 'Accessories', img: '/minal/ChatGPT%20Image%20Sep%2024,%202026,%2009_06_02%20PM.png' },
              { title: 'Grace Heels', cat: 'Footwear', img: '/minal/ChatGPT%20Image%20Sep%2024,%202026,%2009_06_14%20PM.png' },
              { title: 'Classic Bag', cat: 'Bags', img: '/minal/ChatGPT%20Image%20Sep%2024,%202026,%2009_06_26%20PM.png' },
            ].map((product, i) => (
              <a 
                key={i}
                href="#"
                className="arrival-card group block"
              >
                <div className="aspect-[4/5] bg-[#FFFFFF] overflow-hidden mb-6 relative">
                  <img src={product.img} alt={product.title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-focus:scale-105" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-[#28342A] text-lg font-serif mb-1">{product.title}</h3>
                    <span className="text-[#777C70] text-[9px] tracking-[0.2em] uppercase font-bold">{product.cat}</span>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-[#28342A]/10 flex items-center justify-center group-hover:border-[#C8A46E] group-hover:text-[#C8A46E] group-hover:shadow-sm transition-all duration-300 group-focus:border-[#C8A46E] group-focus:text-[#C8A46E]">
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-[2px] transition-transform duration-300" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 6. MORE THAN FASHION */}
      <section className="more-section bg-[#FAF9F5] py-24 md:py-32 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="text-center mb-20 flex flex-col items-center">
            <span className="more-heading text-[#728361] text-[10px] tracking-[0.25em] font-semibold uppercase mb-4 block">
              Why Minal
            </span>
            <h2 className="more-heading text-[#28342A] text-4xl md:text-5xl font-serif font-light mb-4">
              More Than Fashion
            </h2>
            <p className="more-heading text-[#777C70] text-sm font-light">
              A celebration of timeless style, crafted with purpose.
            </p>
          </div>

          <div className="more-values-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Premium Craftsmanship', desc: 'Carefully selected materials and attention to every detail.' },
              { title: 'Curated Luxury', desc: 'Thoughtfully designed pieces for a refined lifestyle.' },
              { title: 'Modern Femininity', desc: 'Blending traditional artistry with contemporary grace.' },
              { title: 'Everyday Elegance', desc: 'Designed to make you feel beautiful, every day.' },
            ].map((value, i) => (
              <div 
                key={i}
                className={`more-value flex flex-col items-center text-center ${i < 3 ? 'lg:border-r border-[#728361]/20' : ''} px-4`}
              >
                <div className="w-10 h-10 rounded-full bg-[#FAF9F5] border border-[#7a9a65]/30 flex items-center justify-center mb-6 text-[#7a9a65]">
                  <span className="font-serif text-sm">{i + 1}</span>
                </div>
                <h4 className="text-[#28342A] text-[10px] font-bold tracking-[0.15em] uppercase mb-3">{value.title}</h4>
                <p className="text-[#777C70] text-[10px] font-light leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. ELEGANCE IN EVERY DETAIL */}
      <section className="lifestyle-section relative h-[600px] md:h-[700px] flex items-center bg-[#FAF9F5] overflow-hidden">
        <div className="lifestyle-img-container absolute inset-0 w-full h-full overflow-hidden">
          <img 
            src="/minal/ChatGPT%20Image%20Sep%2024,%202026,%2009_06_47%20PM.png" 
            alt="Lifestyle Editorial" 
            className="lifestyle-img w-full h-[120%] object-cover object-left md:object-center -mt-[10%]" 
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#FAF9F5] via-[#FAF9F5]/90 md:via-[#FAF9F5]/70 to-transparent w-full"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 flex justify-end">
          <div className="lifestyle-content max-w-md">
            <span className="lifestyle-eyebrow text-[#728361] text-[10px] tracking-[0.25em] font-semibold uppercase mb-4 block">
              A Lifestyle of Intention
            </span>
            <h2 className="lifestyle-heading text-[#28342A] text-5xl md:text-6xl font-serif font-light leading-[1.1] mb-6">
              Elegance<br/>in Every Detail
            </h2>
            <p className="lifestyle-desc text-[#777C70] text-sm font-light mb-10">
              Discover pieces that complement your story.
            </p>
            <a 
              href="#collection" 
              className="lifestyle-cta inline-flex items-center gap-2 bg-[#42563D] text-white px-8 py-4 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-[#28342A] transition-colors duration-500"
            >
              Explore the Collection <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>

      {/* 8. NEWSLETTER */}
      <section className="bg-[#F6F5EF] py-16 px-6 md:px-12 border-b border-[#728361]/10 overflow-hidden">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="footer-reveal text-center md:text-left">
            <h2 className="text-[#28342A] text-2xl font-serif mb-2">Join Our World</h2>
            <p className="text-[#777C70] text-xs font-light">Be the first to know about new arrivals, exclusive pieces and special offers.</p>
          </div>
          <form 
            className="footer-reveal flex w-full md:w-auto" 
            onSubmit={(e) => e.preventDefault()}
          >
            <input 
              type="email" 
              placeholder="Your Email Address" 
              required 
              className="flex-1 md:w-72 px-4 py-3 bg-white border border-transparent text-[#28342A] text-xs focus:outline-none focus:border-[#7a9a65] transition-colors" 
            />
            <button 
              type="submit" 
              className="group flex items-center gap-2 bg-[#42563D] text-white px-8 py-3 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-[#28342A] transition-colors"
            >
              Subscribe <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="bg-[#1D3021] pt-20 pb-10 px-6 md:px-12 lg:px-20 text-white font-sans overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-16">
            <div className="footer-reveal text-center md:text-left">
              <h2 className="text-4xl font-serif tracking-wide text-[#FAF9F5] mb-1">Minal</h2>
              <p className="text-[9px] text-[#C8A46E] tracking-[0.3em] uppercase">Collection's</p>
            </div>
            
            <div className="footer-reveal flex gap-8 text-[10px] font-bold tracking-[0.2em] text-[#FAF9F5] uppercase">
              {['Boutique', 'Campaigns', 'Contact'].map((item) => (
                <a key={item} href="#" className="hover:text-[#C8A46E] transition-colors">{item}</a>
              ))}
            </div>
            
            <div className="footer-reveal flex flex-col md:flex-row items-center gap-6 md:gap-12">
              <div className="flex gap-4 text-white">
                <a href="#" className="hover:text-[#C8A46E] hover:-translate-y-1 transition-all duration-300">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="#" className="hover:text-[#C8A46E] hover:-translate-y-1 transition-all duration-300">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
                </a>
                <a href="#" className="hover:text-[#C8A46E] hover:-translate-y-1 transition-all duration-300">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
              </div>
              <a href="/" className="text-[9px] text-[#A8A8A8] tracking-[0.1em] uppercase hover:text-white transition-colors flex items-center justify-center gap-2">
                <span>← Back to</span>
                <span className="font-bold text-white">KHANZ Group</span>
              </a>
            </div>
          </div>

          <div className="relative flex items-center justify-center mb-10 origin-left">
            <div className="footer-divider absolute inset-x-0 h-[1px] bg-[#C8A46E]/20 origin-left"></div>
            <div className="footer-reveal relative bg-[#1D3021] px-4">
              <div className="w-2 h-2 rounded-full bg-[#C8A46E]"></div>
            </div>
          </div>

          <div className="footer-reveal flex flex-col md:flex-row justify-between items-center text-[9px] text-[#A8A8A8] tracking-widest uppercase gap-4">
            <p>&copy; {new Date().getFullYear()} Minal Collection. All rights reserved.</p>
            <p className="text-[#C8A46E]">Elegance Refined. Always.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
