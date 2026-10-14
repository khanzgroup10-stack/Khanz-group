import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { 
  ChevronLeft, 
  ArrowRight, 
  Search, 
  ShoppingBag, 
  Wrench, 
  ShieldCheck, 
  Star, 
  Users, 
  Gem, 
  FileText, 
  Settings, 
  Headphones, 
  MessageSquare, 
  CheckCircle2, 
  X, 
  Send,
  Sparkles,
  Cpu,
  Smartphone,
  Camera,
  Layers,
  Award
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const KzoTech: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  
  // Modals & User state
  const [repairModalOpen, setRepairModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [repairFormSubmitted, setRepairFormSubmitted] = useState(false);

  // Form State
  const [repairDevice, setRepairDevice] = useState('');
  const [repairIssue, setRepairIssue] = useState('');
  const [repairName, setRepairName] = useState('');
  const [repairContact, setRepairContact] = useState('');

  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Categories Data
  const categories = [
    {
      id: 'phones',
      num: '01',
      title: 'Mobile Phones',
      subtitle: 'Flagship & Pre-Owned Ecosystem',
      description: 'Certified pristine flagship devices, fully tested across a strict 40-point technical checklist with guaranteed battery health and clean serial registration.',
      image: '/KZO/cat-phones.jpg',
      badge: 'Flagship Series',
      specs: ['iPhone 15 & 16 Series', 'Samsung Galaxy S24 Ultra', 'Google Pixel 8 & 9 Pro', 'Rigorous 40-Point Inspection']
    },
    {
      id: 'cameras',
      num: '02',
      title: 'Cameras & Optics',
      subtitle: 'Pro Cinema & Mirrorless Gear',
      description: 'Studio-grade mirrorless bodies, cinema lenses, wireless audio transmissions, and precision gimbal stabilizers for filmmakers and creators.',
      image: '/KZO/cat-cameras.jpg',
      badge: 'Pro Optics',
      specs: ['Full-Frame Mirrorless Bodies', 'Prime Cinema & Zoom Lenses', 'Broadcast Wireless Microphones', 'Heavy-Payload Stabilizers']
    },
    {
      id: 'drones',
      num: '03',
      title: 'Aerial Drones',
      subtitle: 'Ultra-Compact & Cinema Flight',
      description: 'High-altitude 4K/8K stabilization platforms, omnidirectional obstacle avoidance, ND filter suites, and high-capacity flight power packs.',
      image: '/KZO/cat-drones.jpg',
      badge: 'Aerial Imaging',
      specs: ['4K & 8K HDR Sensor Systems', 'Omnidirectional Avoidance Flight', 'Fly-More Intelligent Packages', 'Long-Range Signal Transmission']
    },
    {
      id: 'accessories',
      num: '04',
      title: 'Smart Gear',
      subtitle: 'Certified Charging & Audio',
      description: 'High-wattage GaN chargers, braided Kevlar cables, titanium audio buds with active noise cancellation, and calibrated device protection.',
      image: '/KZO/cat-accessories.jpg',
      badge: 'Certified Gear',
      specs: ['Active Noise-Cancelling Audio', 'Titanium Smart Wearables', 'GaN 140W Ultra-Fast Wall Bricks', 'Braided Kevlar Interconnects']
    },
    {
      id: 'repair',
      num: '05',
      title: 'Repair Lab',
      subtitle: 'Micro-Soldering & Board Diagnostics',
      description: 'Surgical motherboard micro-soldering, OEM display restorations, precision battery health calibrations, and ultrasonic liquid recovery.',
      image: '/KZO/cat-repair.jpg',
      badge: 'Expert Lab',
      specs: ['Surgical Micro-Soldering', 'OEM High-Refresh Screen Replacement', 'True Battery Health Calibration', 'Liquid Shock Ultrasonic Recovery']
    }
  ];

  // Repair steps data
  const repairSteps = [
    {
      step: '01',
      title: 'Report & Intake',
      desc: 'Submit your exact device model and symptoms through our online portal or in-store technician desk.',
      tag: 'Initial Triage',
      icon: MessageSquare
    },
    {
      step: '02',
      title: 'Diagnostic Lab Test',
      desc: 'Microscope hardware inspection, motherboard voltage analysis, thermal camera check, and OEM diagnostics.',
      tag: 'Precision Analysis',
      icon: Cpu
    },
    {
      step: '03',
      title: 'Itemized Approval',
      desc: 'Transparent itemized quotation before any seal is opened. Clear pricing with zero hidden surcharges.',
      tag: 'Transparent Estimate',
      icon: FileText
    },
    {
      step: '04',
      title: 'Surgery & Calibrated Return',
      desc: 'Genuine components installed, dust-free sealing, water-resistance gasket reinstatement, and full QA warranty test.',
      tag: 'Certified Quality',
      icon: CheckCircle2
    }
  ];

  // Trust features
  const features = [
    {
      icon: Gem,
      title: 'Verified Quality',
      desc: 'Exhaustive 40-point diagnostics ensuring every flagship device performs at factory spec.'
    },
    {
      icon: FileText,
      title: 'Full Transparency',
      desc: 'Honest cosmetic grading, verified battery health logs, and clean international IMEI status.'
    },
    {
      icon: Settings,
      title: 'Genuine Components',
      desc: 'Calibrated parts, certified fast chargers, and matched accessories guaranteed for longevity.'
    },
    {
      icon: Wrench,
      title: 'Cleanroom Repair Lab',
      desc: 'Antistatic workstation environments with microscope soldering and high-tier thermal diagnostics.'
    },
    {
      icon: Headphones,
      title: 'Dedicated Technical Support',
      desc: 'Real-time repair tracking updates, direct technician chat, and prompt aftercare assistance.'
    }
  ];

  // Handle Repair Form Submit
  const handleRepairSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRepairFormSubmitted(true);
    setTimeout(() => {
      setRepairFormSubmitted(false);
      setRepairModalOpen(false);
      setRepairDevice('');
      setRepairIssue('');
      setRepairName('');
      setRepairContact('');
    }, 2200);
  };

  // Card 3D Tilt handler
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.35,
      ease: 'power2.out',
      transformPerspective: 1000
    });

    // Update glow coordinate inside card
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'power2.out'
    });
  };

  // Magnetic Button Effect
  const handleMagneticMove = (e: React.MouseEvent<HTMLElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, {
      x: x * 0.28,
      y: y * 0.28,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleMagneticLeave = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)'
    });
  };

  // Lenis + GSAP Master Timeline Setup
  useEffect(() => {
    window.scrollTo(0, 0);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.5,
      infinite: false
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // Context for all GSAP instances to ensure clean unmounting
    const ctx = gsap.context(() => {
      // 0. Top Scroll Progress Indicator
      gsap.to('#kzo-scroll-progress', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.2
        }
      });

      // -------------------------------------------------------------
      // 1. HERO — IMMERSIVE CINEMATIC INTRO TIMELINE & SCROLL SCRUB
      // -------------------------------------------------------------
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 0.0 - 0.7s: dark overlay reveals video
      heroTl.fromTo(
        '#hero-blackout',
        { opacity: 1 },
        { opacity: 0, duration: 0.8, ease: 'power2.inOut' },
        0
      );

      // 0.4 - 1.2s: KZO Tech logo fades in and scales gently from 0.94 to 1
      heroTl.fromTo(
        '#hero-brand-badge',
        { opacity: 0, scale: 0.93, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.2)' },
        0.35
      );

      // Electric blue accent line reveals
      heroTl.fromTo(
        '#hero-accent-line',
        { scaleX: 0, transformOrigin: 'center center' },
        { scaleX: 1, duration: 0.7, ease: 'power2.out' },
        0.6
      );

      // 0.8 - 1.8s: Headline masked text line by line
      heroTl.fromTo(
        '.hero-line-inner',
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.18, ease: 'power3.out' },
        0.75
      );

      // Glow on Tomorrow illuminates
      heroTl.fromTo(
        '#hero-glow-word',
        { filter: 'drop-shadow(0 0 0px rgba(0,102,255,0))', color: '#ffffff' },
        { 
          filter: 'drop-shadow(0 0 25px rgba(0,102,255,0.85))', 
          color: '#38bdf8',
          duration: 1.1,
          ease: 'power2.out' 
        },
        1.1
      );

      // 1.3 - 2.0s: CTA staggered
      heroTl.fromTo(
        '.hero-cta-btn',
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: 'back.out(1.4)' },
        1.35
      );

      // 2.1 - 2.6s: Scroll indicator
      heroTl.fromTo(
        '#hero-scroll-indicator',
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5 },
        1.9
      );

      // Hero Scroll Scrub: Video zooms 1 -> 1.12, text moves up and fades away
      if (!prefersReducedMotion) {
        gsap.to('#hero-video-element', {
          scale: 1.12,
          ease: 'none',
          scrollTrigger: {
            trigger: '#hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });

        gsap.to('#hero-content-wrapper', {
          y: -120,
          opacity: 0,
          filter: 'blur(8px)',
          ease: 'none',
          scrollTrigger: {
            trigger: '#hero-section',
            start: 'top top',
            end: '80% top',
            scrub: true
          }
        });
      }

      // -------------------------------------------------------------
      // 2. ABOUT SECTION — PINNED PRODUCT STORYTELLING (DESKTOP)
      // -------------------------------------------------------------
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        const aboutTl = gsap.timeline({
          scrollTrigger: {
            trigger: '#about-pin-container',
            start: 'top top',
            end: '+=130%',
            pin: true,
            scrub: 0.8,
            anticipatePin: 1
          }
        });

        // Left text sequential reveals
        aboutTl.fromTo(
          '#about-kicker',
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.3 }
        );

        aboutTl.fromTo(
          '.about-headline-word',
          { opacity: 0, y: 40, rotateX: -30 },
          { opacity: 1, y: 0, rotateX: 0, stagger: 0.08, duration: 0.6 },
          '-=0.1'
        );

        aboutTl.fromTo(
          '#about-paragraph-1',
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.4 },
          '-=0.2'
        );

        aboutTl.fromTo(
          '#about-paragraph-2',
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.4 },
          '-=0.15'
        );

        aboutTl.fromTo(
          '#about-badges-row',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.4 },
          '-=0.1'
        );

        // Right side product showcase layers reveal into natural positions
        aboutTl.fromTo(
          '#about-main-showcase-frame',
          { scale: 0.88, opacity: 0, y: 60 },
          { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          0.1
        );

        aboutTl.fromTo(
          '#about-floating-card-1',
          { x: 80, y: -40, opacity: 0, scale: 0.8 },
          { x: 0, y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.2)' },
          0.35
        );

        aboutTl.fromTo(
          '#about-floating-card-2',
          { x: -70, y: 60, opacity: 0, scale: 0.8 },
          { x: 0, y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.2)' },
          0.45
        );

        aboutTl.fromTo(
          '#about-glow-orb',
          { scale: 0.5, opacity: 0 },
          { scale: 1.4, opacity: 0.7, duration: 0.8 },
          0.2
        );
      });

      // Mobile fallback for About
      mm.add('(max-width: 1023px)', () => {
        gsap.fromTo(
          '#about-pin-container .about-animate-item',
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            scrollTrigger: {
              trigger: '#about-pin-container',
              start: 'top 80%'
            }
          }
        );
      });

      // -------------------------------------------------------------
      // 3. PRODUCT CATEGORIES — HORIZONTAL SCROLL SHOWCASE (DESKTOP)
      // -------------------------------------------------------------
      mm.add('(min-width: 1024px)', () => {
        const track = document.getElementById('categories-horizontal-track');
        if (track) {
          const trackWidth = track.scrollWidth;
          const viewportWidth = window.innerWidth;
          const scrollDistance = trackWidth - viewportWidth + 140;

          const catTl = gsap.timeline({
            scrollTrigger: {
              trigger: '#categories-pin-wrapper',
              start: 'top top',
              end: () => `+=${scrollDistance * 1.35}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                // Category progress bar
                gsap.set('#categories-progress-bar', { scaleX: self.progress });
                
                // Highlight active category cards based on progress
                const cards = document.querySelectorAll('.cat-showcase-card');
                const activeIndex = Math.min(
                  cards.length - 1,
                  Math.floor(self.progress * cards.length)
                );
                cards.forEach((card, idx) => {
                  if (idx === activeIndex) {
                    card.classList.add('is-active-card');
                  } else {
                    card.classList.remove('is-active-card');
                  }
                });
              }
            }
          });

          catTl.to(track, {
            x: () => -scrollDistance,
            ease: 'none'
          });

          // Subtle inner image parallax inside each category frame
          gsap.utils.toArray<HTMLElement>('.cat-inner-img').forEach((img) => {
            gsap.fromTo(
              img,
              { x: '-8%' },
              {
                x: '8%',
                ease: 'none',
                scrollTrigger: {
                  trigger: '#categories-pin-wrapper',
                  start: 'top top',
                  end: () => `+=${scrollDistance * 1.35}`,
                  scrub: true
                }
              }
            );
          });
        }
      });

      // -------------------------------------------------------------
      // 4. FEATURED PRODUCT — SCROLL-BASED TRANSFORMATION (STAGE 1-5)
      // -------------------------------------------------------------
      mm.add('(min-width: 1024px)', () => {
        const featTl = gsap.timeline({
          scrollTrigger: {
            trigger: '#featured-product-stage',
            start: 'top top',
            end: '+=200%',
            pin: true,
            scrub: 0.9,
            anticipatePin: 1
          }
        });

        // Stage 1: Phone appears large against nearly black background
        featTl.fromTo(
          '#feat-phone-wrapper',
          { scale: 1.35, y: 120, rotateZ: -12, rotateY: 18, opacity: 0 },
          { scale: 1, y: 0, rotateZ: 0, rotateY: 0, opacity: 1, duration: 1, ease: 'power2.out' }
        );

        // Stage 2 & 3: Soft electric-blue rim light appears behind device
        featTl.fromTo(
          '#feat-rim-light',
          { opacity: 0, scale: 0.6 },
          { opacity: 1, scale: 1.3, duration: 0.7, ease: 'power2.inOut' },
          '-=0.4'
        );

        // Stage 4: Headline reveals: "Technology That Moves You Forward."
        featTl.fromTo(
          '#feat-headline-box',
          { opacity: 0, y: 50, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power2.out' },
          '-=0.2'
        );

        // Stage 5: Phone moves toward side, creating depth for next section entry
        featTl.to(
          '#feat-phone-wrapper',
          { x: '24%', scale: 0.92, rotateY: -10, duration: 0.9, ease: 'power2.inOut' },
          '+=0.2'
        );

        featTl.to(
          '#feat-headline-box',
          { x: '-18%', duration: 0.9, ease: 'power2.inOut' },
          '<'
        );
      });

      // Mobile fallback for featured product
      mm.add('(max-width: 1023px)', () => {
        gsap.fromTo(
          '#feat-phone-wrapper',
          { opacity: 0, y: 40, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: '#featured-product-stage',
              start: 'top 75%'
            }
          }
        );
      });

      // -------------------------------------------------------------
      // 5. TRUST SECTION — ANIMATED FEATURE REVEAL WITH STAGGER
      // -------------------------------------------------------------
      gsap.fromTo(
        '.trust-feature-card',
        { opacity: 0, y: 45, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#trust-section',
            start: 'top 75%'
          }
        }
      );

      // Icon line pulse
      gsap.fromTo(
        '.trust-icon-box',
        { rotate: -15, scale: 0.7, opacity: 0 },
        {
          rotate: 0,
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '#trust-section',
            start: 'top 70%'
          }
        }
      );

      // -------------------------------------------------------------
      // 6. REPAIR LAB — INTERACTIVE PINNED SCROLL JOURNEY (01-04)
      // -------------------------------------------------------------
      mm.add('(min-width: 1024px)', () => {
        const repairTl = gsap.timeline({
          scrollTrigger: {
            trigger: '#repair-pinned-wrapper',
            start: 'top top',
            end: '+=160%',
            pin: true,
            scrub: 0.8,
            anticipatePin: 1
          }
        });

        // Step 1 is active by default. Steps 2, 3, 4 activate in sequence:
        repairTl.to('#repair-line-fill', { height: '33%', duration: 0.5 });
        repairTl.to('#repair-step-2', { opacity: 1, scale: 1.03, borderColor: '#0066FF', duration: 0.4 }, '<');
        repairTl.to('#repair-step-1', { opacity: 0.5, scale: 1, borderColor: 'rgba(255,255,255,0.1)', duration: 0.4 }, '<');
        repairTl.to('#repair-visual-img', { filter: 'hue-rotate(20deg) brightness(1.05)', scale: 1.03, duration: 0.4 }, '<');

        repairTl.to('#repair-line-fill', { height: '66%', duration: 0.5 });
        repairTl.to('#repair-step-3', { opacity: 1, scale: 1.03, borderColor: '#0066FF', duration: 0.4 }, '<');
        repairTl.to('#repair-step-2', { opacity: 0.5, scale: 1, borderColor: 'rgba(255,255,255,0.1)', duration: 0.4 }, '<');
        repairTl.to('#repair-visual-img', { filter: 'hue-rotate(40deg) brightness(1.1)', scale: 1.06, duration: 0.4 }, '<');

        repairTl.to('#repair-line-fill', { height: '100%', duration: 0.5 });
        repairTl.to('#repair-step-4', { opacity: 1, scale: 1.03, borderColor: '#0066FF', duration: 0.4 }, '<');
        repairTl.to('#repair-step-3', { opacity: 0.5, scale: 1, borderColor: 'rgba(255,255,255,0.1)', duration: 0.4 }, '<');
        repairTl.to('#repair-visual-img', { filter: 'hue-rotate(0deg) brightness(1.15)', scale: 1.08, duration: 0.4 }, '<');
      });

      // Mobile repair cards stagger
      mm.add('(max-width: 1023px)', () => {
        gsap.fromTo(
          '.mobile-repair-card',
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            scrollTrigger: {
              trigger: '#repair-pinned-wrapper',
              start: 'top 80%'
            }
          }
        );
      });

      // -------------------------------------------------------------
      // 7. FINAL CTA — CINEMATIC BRAND FINALE
      // -------------------------------------------------------------
      const ctaTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#final-cta-section',
          start: 'top 75%'
        }
      });

      ctaTl.fromTo(
        '#cta-bg-layer',
        { opacity: 0, scale: 1.15 },
        { opacity: 0.45, scale: 1, duration: 1.2, ease: 'power2.out' }
      );

      ctaTl.fromTo(
        '#cta-light-sweep',
        { xPercent: -100, opacity: 0 },
        { xPercent: 120, opacity: 0.8, duration: 1.4, ease: 'power2.inOut' },
        0.2
      );

      ctaTl.fromTo(
        '.cta-headline-line',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.18, ease: 'power3.out' },
        0.3
      );

      ctaTl.fromTo(
        '#cta-desc-text',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.7
      );

      ctaTl.fromTo(
        '.cta-action-btn',
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.14, ease: 'back.out(1.3)' },
        0.85
      );

      ctaTl.fromTo(
        '#cta-stamp-box',
        { opacity: 0, scale: 0.9, rotateY: 20 },
        { opacity: 1, scale: 1, rotateY: 0, duration: 0.8, ease: 'back.out(1.2)' },
        0.9
      );
    }, containerRef);

    return () => {
      ctx.revert();
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="bg-[#05070B] text-[#F3F4F6] font-sans selection:bg-[#0066FF] selection:text-white min-h-screen overflow-x-hidden relative"
    >
      {/* Scroll Progress Bar at very top */}
      <div 
        id="kzo-scroll-progress" 
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#0066FF] via-[#38bdf8] to-[#0066FF] z-[100] origin-left scale-x-0 pointer-events-none shadow-[0_0_12px_#0066FF]"
      />

      {/* =========================================================================
          GLOBAL STICKY TECH HEADER
          ========================================================================= */}
      <header className="sticky top-0 z-50 bg-[#05070B]/85 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
        <div className="max-w-[1650px] mx-auto px-6 sm:px-10 lg:px-14 h-20 flex items-center justify-between">
          
          {/* Left: Brand Logo & Navigation Back to KHANZ */}
          <div className="flex items-center gap-6">
            <Link 
              to="/" 
              className="hidden sm:flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase text-white/50 hover:text-[#0066FF] transition-colors group"
            >
              <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>KHANZ Group</span>
            </Link>
            <span className="hidden sm:inline text-white/20">/</span>

            {/* KZO TECH Logo */}
            <a href="#home" className="flex items-center gap-3 group">
              <img 
                src="/KZO/kzo-logo.jpeg" 
                alt="KZO TECH Logo" 
                className="h-9 sm:h-11 w-auto rounded-sm object-contain brightness-105 group-hover:scale-105 transition-transform" 
              />
            </a>
          </div>

          {/* Center: Main Navigation Menu */}
          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.2em] font-medium text-white/70">
            <a href="#home" className="text-white hover:text-[#0066FF] transition-colors relative py-1 group">
              <span>Home</span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0066FF] shadow-[0_0_8px_#0066FF]" />
            </a>
            <a href="#categories-pin-wrapper" className="hover:text-white transition-colors relative py-1 group">
              <span>Products</span>
              <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-[#0066FF] transition-all duration-300" />
            </a>
            <a href="#featured-product-stage" className="hover:text-white transition-colors relative py-1 group">
              <span>Innovation</span>
              <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-[#0066FF] transition-all duration-300" />
            </a>
            <a href="#repair-pinned-wrapper" className="hover:text-white transition-colors flex items-center gap-1.5 py-1 group">
              <span>Repair Lab</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] animate-pulse shadow-[0_0_8px_#0066FF]" />
            </a>
            <a href="#about-pin-container" className="hover:text-white transition-colors relative py-1 group">
              <span>About</span>
              <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-[#0066FF] transition-all duration-300" />
            </a>
          </nav>

          {/* Right: Actions (Search, Cart, Contact Us) */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button 
              onClick={() => alert("Search catalog: Enter smartphone model, drone, or accessory name...")}
              className="text-white/70 hover:text-[#0066FF] transition-colors p-2 hover:scale-110 active:scale-95"
              aria-label="Search Catalog"
            >
              <Search className="w-4 h-4" />
            </button>
            
            <button 
              onClick={() => setCartCount(c => c + 1)}
              className="relative text-white/70 hover:text-[#0066FF] transition-colors p-2 hover:scale-110 active:scale-95"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#0066FF] text-white text-[10px] rounded-full flex items-center justify-center font-bold shadow-[0_0_8px_#0066FF]">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setRepairModalOpen(true)}
              onMouseMove={handleMagneticMove}
              onMouseLeave={handleMagneticLeave}
              className="hidden sm:inline-flex items-center gap-2 border border-[#0066FF]/60 hover:border-[#0066FF] bg-[#0066FF]/10 hover:bg-[#0066FF] text-white px-5 py-2.5 text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-300 rounded-full shadow-[0_0_20px_rgba(0,102,255,0.25)]"
            >
              <span>Book Service</span>
            </button>
          </div>

        </div>
      </header>

      {/* =========================================================================
          SECTION 1 — HERO SECTION (FULL WIDTH CINEMATIC SHOWROOM VIDEO WITH GSAP)
          ========================================================================= */}
      <section 
        id="hero-section" 
        className="relative w-full h-[95vh] min-h-[700px] flex items-center justify-center overflow-hidden bg-black select-none"
      >
        {/* Blackout overlay for initial 0.0-0.7s reveal */}
        <div id="hero-blackout" className="absolute inset-0 bg-[#05070B] z-30 pointer-events-none" />

        {/* Full-width Video Layer with GSAP Scrub Parallax */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <video
            ref={heroVideoRef}
            id="hero-video-element"
            src="/KZO/kzo-video.mp4"
            autoPlay
            loop
            muted
            playsInline
            poster="/KZO/about-showcase.jpg"
            className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.14] will-change-transform"
          />
          {/* Deep Vignette & Studio Lighting Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-[#05070B]/40 to-black/75 z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0066FF]/15 via-transparent to-transparent z-10" />
        </div>

        {/* Hero Central Content: Sized and aligned precisely to fit inside the central black pillar/wall */}
        <div 
          id="hero-content-wrapper"
          className="relative z-20 w-full max-w-[440px] sm:max-w-[480px] lg:max-w-[500px] mx-auto px-4 text-center flex flex-col items-center justify-center will-change-transform"
        >
          {/* KZO TECH Logo (Increased by ~30%) & Electric Blue Accent Line */}
          <div id="hero-brand-badge" className="mb-4 sm:mb-5 flex flex-col items-center">
            <div className="p-3.5 sm:p-4 bg-black/80 backdrop-blur-xl border border-[#0066FF]/40 rounded-2xl shadow-[0_0_40px_rgba(0,102,255,0.35)] mb-3 transition-transform hover:scale-105">
              <img 
                src="/KZO/kzo-logo.jpeg" 
                alt="KZO TECH" 
                className="h-16 sm:h-20 md:h-24 lg:h-[102px] w-auto object-contain"
              />
            </div>
            
            {/* Electric Blue Accent Line */}
            <div id="hero-accent-line" className="w-20 sm:w-24 h-[2px] bg-gradient-to-r from-transparent via-[#0066FF] to-transparent mb-2.5 shadow-[0_0_12px_#0066FF]" />

            <span className="text-[9px] sm:text-[10px] tracking-[0.3em] text-[#0066FF] font-semibold uppercase drop-shadow-[0_0_10px_rgba(0,102,255,0.6)]">
              PREMIUM ELECTRONICS &middot; REPAIR LAB
            </span>
          </div>

          {/* Masked Main Heading: Carefully scaled to sit within the black wall with elegant vertical spacing between lines */}
          <h1 className="flex flex-col gap-3 sm:gap-3.5 text-3xl sm:text-4xl md:text-[2.65rem] lg:text-[2.85rem] font-light text-[#F3F4F6] tracking-tight mb-7 leading-[1.12]">
            <div className="overflow-hidden">
              <span className="hero-line-inner block">Technology for a</span>
            </div>
            <div className="overflow-hidden">
              <span className="hero-line-inner block font-semibold">
                Smarter{' '}
                <span id="hero-glow-word" className="transition-all duration-700">
                  Tomorrow
                </span>
              </span>
            </div>
          </h1>

          {/* Dual Action CTAs: Direct, compact layout below heading */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
            <a
              href="#categories-pin-wrapper"
              onMouseMove={handleMagneticMove}
              onMouseLeave={handleMagneticLeave}
              className="hero-cta-btn w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#0066FF] hover:bg-[#0052CC] text-white px-7 py-3 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(0,102,255,0.55)] hover:shadow-[0_0_45px_rgba(0,102,255,0.8)] group"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
            </a>

            <button
              onClick={() => setRepairModalOpen(true)}
              onMouseMove={handleMagneticMove}
              onMouseLeave={handleMagneticLeave}
              className="hero-cta-btn w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-black/80 hover:bg-black border border-white/20 hover:border-[#0066FF] text-[#F3F4F6] px-7 py-3 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] rounded-full backdrop-blur-xl transition-all duration-300 group shadow-[0_0_15px_rgba(0,0,0,0.6)]"
            >
              <Wrench className="w-3.5 h-3.5 text-[#0066FF] group-hover:rotate-45 transition-transform" />
              <span>Book Repair Lab</span>
            </button>
          </div>

          {/* Mouse Scroll Indicator */}
          <a 
            id="hero-scroll-indicator"
            href="#about-pin-container"
            className="mt-10 sm:mt-12 flex flex-col items-center gap-1.5 text-white/50 hover:text-white transition-colors cursor-pointer"
          >
            <div className="w-4 h-7 rounded-full border border-white/30 flex items-start justify-center p-1">
              <span className="w-1 h-1.5 bg-[#0066FF] rounded-full animate-bounce shadow-[0_0_6px_#0066FF]" />
            </div>
            <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-white/40">SCROLL DOWN</span>
          </a>

        </div>
      </section>

      {/* =========================================================================
          SECTION 2 — ABOUT KZO TECH (PINNED PRODUCT STORYTELLING)
          ========================================================================= */}
      <section 
        id="about-pin-container" 
        className="relative min-h-screen py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#070A0F] border-t border-white/5 flex items-center overflow-hidden"
      >
        {/* Ambient Electric Glow Orb */}
        <div 
          id="about-glow-orb"
          className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-[#0066FF]/10 rounded-full blur-[140px] pointer-events-none will-change-transform" 
        />

        <div className="max-w-[1650px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center z-10">
          
          {/* Left Column (5 cols): Typography & Story */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div id="about-kicker" className="about-animate-item flex items-center gap-3 mb-5">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#0066FF]">
                &mdash; WHO WE ARE
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#F3F4F6] tracking-tight leading-[1.12] mb-6">
              <span className="about-headline-word inline-block mr-2">More</span>
              <span className="about-headline-word inline-block mr-2">Than</span>
              <br />
              <span className="about-headline-word inline-block font-semibold text-white mr-2">Technology.</span>
              <br />
              <span className="about-headline-word inline-block mr-2">A</span>
              <span className="about-headline-word inline-block mr-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#0099FF]">Smarter</span>
              <span className="about-headline-word inline-block">Experience.</span>
            </h2>

            <p id="about-paragraph-1" className="about-animate-item text-sm sm:text-base text-white/70 font-light leading-relaxed mb-6">
              KZO Tech is your premier destination for verified new &amp; pre-owned smartphones, pro camera gear, aerial drones, and laboratory diagnostics. We merge high-performance electronics with dedicated engineering support.
            </p>

            <p id="about-paragraph-2" className="about-animate-item text-xs sm:text-sm text-white/50 font-light leading-relaxed mb-8">
              Every device is certified through rigorous 40-point hardware inspections, backed by genuine component guarantees and direct laboratory technicians who keep your world connected.
            </p>

            {/* Badges Row */}
            <div id="about-badges-row" className="about-animate-item grid grid-cols-3 gap-4 pt-6 border-t border-white/10 text-center">
              <div className="flex flex-col items-center">
                <div className="p-2.5 rounded-full bg-white/5 text-[#0066FF] mb-2 shadow-[0_0_15px_rgba(0,102,255,0.2)]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-medium text-white/90">Premium Devices</h4>
                <p className="text-[10px] text-white/40 mt-0.5">Verified Quality</p>
              </div>

              <div className="flex flex-col items-center border-l border-white/10">
                <div className="p-2.5 rounded-full bg-white/5 text-[#0066FF] mb-2 shadow-[0_0_15px_rgba(0,102,255,0.2)]">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-medium text-white/90">Expert Engineers</h4>
                <p className="text-[10px] text-white/40 mt-0.5">Certified Care</p>
              </div>

              <div className="flex flex-col items-center border-l border-white/10">
                <div className="p-2.5 rounded-full bg-white/5 text-[#0066FF] mb-2 shadow-[0_0_15px_rgba(0,102,255,0.2)]">
                  <Star className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-medium text-white/90">Customer Trust</h4>
                <p className="text-[10px] text-white/40 mt-0.5">Satisfaction First</p>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Layered Visual Showcase Composition */}
          <div className="lg:col-span-7 relative flex items-center justify-center">
            {/* Main Showcase Frame */}
            <div 
              id="about-main-showcase-frame"
              className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/15 bg-[#090D14] shadow-[0_25px_60px_rgba(0,0,0,0.9)] will-change-transform"
            >
              <img
                src="/KZO/about-showcase.jpg"
                alt="KZO Tech Flagship Devices"
                className="w-full h-full object-cover object-center filter brightness-[0.95] contrast-[1.08]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#070A0F]/70 via-transparent to-transparent pointer-events-none" />

              {/* Floating Top Label */}
              <div className="absolute top-5 left-5 z-20 bg-black/70 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#0066FF] font-semibold">
                  FLAGSHIP SHOWROOM &middot; 2026
                </span>
              </div>
            </div>

            {/* Layer 1 Floating Card (Phones & Drones) */}
            <div 
              id="about-floating-card-1"
              className="absolute -top-8 -right-6 hidden sm:flex items-center gap-4 bg-black/80 backdrop-blur-xl border border-white/15 p-4 rounded-xl shadow-[0_15px_40px_rgba(0,102,255,0.25)] z-20 will-change-transform max-w-[260px]"
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-black flex-shrink-0 border border-white/10">
                <img src="/KZO/cat-phones.jpg" alt="Phones" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#0066FF] font-bold block">Smart Mobility</span>
                <p className="text-xs font-semibold text-white">40-Point Inspection</p>
                <p className="text-[10px] text-white/50">Guaranteed Battery Health</p>
              </div>
            </div>

            {/* Layer 2 Floating Card (Repair Lab) */}
            <div 
              id="about-floating-card-2"
              className="absolute -bottom-8 -left-6 hidden sm:flex items-center gap-4 bg-black/80 backdrop-blur-xl border border-[#0066FF]/40 p-4 rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.8)] z-20 will-change-transform max-w-[280px]"
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-black flex-shrink-0 border border-[#0066FF]/30">
                <img src="/KZO/cat-repair.jpg" alt="Repair" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#0066FF] font-bold block">Certified Lab</span>
                <p className="text-xs font-semibold text-white">Micro-Soldering</p>
                <p className="text-[10px] text-white/50">Precision Hardware Repair</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 3 — PRODUCT CATEGORIES (PINNED HORIZONTAL SCROLL SHOWCASE)
          ========================================================================= */}
      <section 
        id="categories-pin-wrapper" 
        className="relative w-full bg-[#05070B] border-t border-white/5 overflow-hidden"
      >
        <div className="max-w-[1650px] mx-auto px-6 sm:px-10 lg:px-14 pt-20 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#0066FF] block mb-2">
              &mdash; PRODUCT ECOSYSTEM
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#F3F4F6] tracking-tight">
              Explore Our Product Categories
            </h2>
          </div>

          {/* Progress Indicator for Desktop */}
          <div className="flex flex-col gap-2 min-w-[240px]">
            <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-white/50 font-mono">
              <span>Scroll to Explore</span>
              <span className="text-[#0066FF]">01 &mdash; 05</span>
            </div>
            <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden">
              <div id="categories-progress-bar" className="h-full bg-[#0066FF] w-full origin-left scale-x-0 shadow-[0_0_10px_#0066FF]" />
            </div>
          </div>
        </div>

        {/* Horizontal Track for Desktop / Responsive Grid for Mobile */}
        <div className="w-full overflow-hidden py-10 px-6 sm:px-10 lg:px-14">
          <div 
            id="categories-horizontal-track" 
            className="flex flex-col lg:flex-row gap-8 lg:gap-10 w-full lg:w-max will-change-transform"
          >
            {categories.map((cat, idx) => (
              <div
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                className="cat-showcase-card group relative flex flex-col w-full lg:w-[460px] xl:w-[490px] h-[560px] bg-[#080B11] border border-white/15 hover:border-[#0066FF] rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 shadow-[0_15px_40px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_50px_rgba(0,102,255,0.3)] flex-shrink-0"
              >
                {/* Image Window with Inner Parallax Element */}
                <div className="relative h-[60%] w-full overflow-hidden bg-black">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="cat-inner-img w-[116%] h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080B11] via-black/30 to-transparent opacity-95 group-hover:opacity-75 transition-opacity" />
                  
                  {/* Category Number Stamp & Badge */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-white bg-black/80 px-2.5 py-1 rounded border border-white/15 backdrop-blur-md">
                      {cat.num}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#0066FF] bg-black/80 px-2.5 py-1 rounded border border-[#0066FF]/40 backdrop-blur-md">
                      {cat.badge}
                    </span>
                  </div>
                </div>

                {/* Card Content & Action Button */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between relative z-10">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#0066FF] font-medium block mb-1">
                      {cat.subtitle}
                    </span>
                    <h3 className="text-2xl font-semibold text-white group-hover:text-[#0066FF] transition-colors leading-snug mb-2">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-white/60 font-light leading-relaxed line-clamp-2">
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-white/50 group-hover:text-white transition-colors">
                      View Specifications &rsaquo;
                    </span>
                    <div className="w-9 h-9 rounded-full bg-white/5 border border-white/15 group-hover:border-[#0066FF] group-hover:bg-[#0066FF] flex items-center justify-center transition-all shadow-[0_0_15px_rgba(0,102,255,0)] group-hover:shadow-[0_0_15px_rgba(0,102,255,0.6)]">
                      <ArrowRight className="w-4 h-4 text-white/70 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Mouse follow radial glow inside card */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 102, 255, 0.12), transparent 40%)'
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4 — FEATURED PRODUCT — SCROLL-BASED TRANSFORMATION
          ========================================================================= */}
      <section 
        id="featured-product-stage" 
        className="relative w-full min-h-screen py-24 px-6 sm:px-10 lg:px-16 bg-[#030508] border-t border-white/5 flex items-center justify-center overflow-hidden"
      >
        {/* Soft Electric Blue Rim Light Orb behind phone */}
        <div 
          id="feat-rim-light"
          className="absolute w-[600px] h-[600px] rounded-full bg-[#0066FF]/25 blur-[160px] pointer-events-none will-change-transform"
        />

        <div className="max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center z-10">
          
          {/* Left Column: Headline and Technical Narrative */}
          <div id="feat-headline-box" className="lg:col-span-6 flex flex-col justify-center will-change-transform">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-4 h-4 text-[#0066FF]" />
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#0066FF]">
                ENGINEERED PRECISION
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-white tracking-tight leading-[1.08] mb-6">
              Technology That <br />
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#0066FF]">
                Moves You Forward.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed mb-6 max-w-xl">
              From aerospace-grade titanium chassis to silicon micro-soldering, our hardware collections redefine personal capability. Every model is calibrated for uncompromising speed and clarity.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10 max-w-md">
              <div>
                <span className="text-2xl sm:text-3xl font-mono font-bold text-white block">100%</span>
                <span className="text-xs text-white/50 tracking-wider uppercase">Authentic Parts Guaranteed</span>
              </div>
              <div className="border-l border-white/10 pl-6">
                <span className="text-2xl sm:text-3xl font-mono font-bold text-[#0066FF] block">40-Pt</span>
                <span className="text-xs text-white/50 tracking-wider uppercase">Quality Benchmark</span>
              </div>
            </div>
          </div>

          {/* Right Column: 2.5D Premium Smartphone Product Sculpture */}
          <div className="lg:col-span-6 flex items-center justify-center relative">
            <div 
              id="feat-phone-wrapper"
              className="relative w-full max-w-[480px] aspect-[4/5] rounded-3xl overflow-hidden border border-white/20 bg-gradient-to-b from-[#0B111D] to-[#04060A] shadow-[0_30px_90px_rgba(0,102,255,0.35)] will-change-transform flex items-center justify-center p-6"
            >
              <img
                src="/KZO/cta-phones.jpg"
                alt="Featured Smartphone Innovation"
                className="w-full h-full object-cover rounded-2xl filter brightness-[1.03] contrast-[1.12]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 right-6 z-20 flex items-center justify-between bg-black/75 backdrop-blur-md border border-white/10 p-4 rounded-xl">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#0066FF] block">Flagship Series</span>
                  <span className="text-sm font-semibold text-white">Next-Gen Pro Architecture</span>
                </div>
                <button
                  onClick={() => {
                    setSelectedCategory('phones');
                  }}
                  className="px-4 py-2 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
                >
                  Inspect
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 5 — TRUST SECTION (ANIMATED FEATURE REVEAL WITH STAGGER)
          ========================================================================= */}
      <section 
        id="trust-section" 
        className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#070A0F] border-t border-white/5"
      >
        <div className="max-w-[1650px] mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#0066FF] block mb-2">
              WHY CHOOSE KZO TECH
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#F3F4F6] tracking-tight">
              Built on Trust. Driven by Expertise.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {features.map((feat, idx) => {
              const IconComp = feat.icon;
              return (
                <div
                  key={idx}
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  className="trust-feature-card p-7 rounded-2xl bg-[#090D14] border border-white/10 hover:border-[#0066FF] transition-all group flex flex-col items-center text-center shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_40px_rgba(0,102,255,0.2)] will-change-transform relative overflow-hidden"
                >
                  <div className="trust-icon-box w-14 h-14 rounded-2xl bg-white/5 text-[#0066FF] flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-[#0066FF]/10 transition-transform shadow-[0_0_20px_rgba(0,102,255,0.15)]">
                    <IconComp className="w-7 h-7" />
                  </div>
                  <h4 className="text-base font-semibold text-white mb-2 group-hover:text-[#0066FF] transition-colors">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-white/60 font-light leading-relaxed">
                    {feat.desc}
                  </p>

                  {/* Subtle inner card radial glow */}
                  <div 
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 102, 255, 0.1), transparent 50%)'
                    }}
                  />
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 6 — REPAIR LAB — INTERACTIVE PINNED SCROLL JOURNEY (01-04)
          ========================================================================= */}
      <section 
        id="repair-pinned-wrapper" 
        className="relative min-h-screen py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#05070B] border-t border-white/5 flex items-center overflow-hidden"
      >
        <div className="max-w-[1650px] mx-auto w-full z-10">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#0066FF] block mb-2">
                &laquo; SURGICAL REPAIR WORKFLOW &mdash;
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#F3F4F6] tracking-tight">
                Simple. Transparent. Reliable.
              </h2>
            </div>

            <button
              onClick={() => setRepairModalOpen(true)}
              onMouseMove={handleMagneticMove}
              onMouseLeave={handleMagneticLeave}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-white/80 hover:text-[#0066FF] transition-colors self-start sm:self-end border-b border-[#0066FF]/40 pb-1"
            >
              <span>Instant Repair Diagnostics Portal</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#0066FF]" />
            </button>
          </div>

          {/* Desktop 2-Column Pinned Technical Journey */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left 6 cols: Animated Vertical Timeline Steps */}
            <div className="lg:col-span-7 relative pl-8">
              {/* Vertical connector line */}
              <div className="absolute left-0 top-6 bottom-6 w-[3px] bg-white/10 rounded-full">
                <div 
                  id="repair-line-fill" 
                  className="w-full bg-[#0066FF] h-[10%] rounded-full shadow-[0_0_12px_#0066FF] transition-all" 
                />
              </div>

              <div className="space-y-6">
                {repairSteps.map((step, idx) => {
                  const IconComp = step.icon;
                  return (
                    <div
                      key={step.step}
                      id={`repair-step-${idx + 1}`}
                      className={`mobile-repair-card relative p-6 sm:p-7 rounded-2xl bg-[#080B11] border transition-all duration-400 ${
                        idx === 0 
                          ? 'border-[#0066FF] opacity-100 shadow-[0_10px_35px_rgba(0,102,255,0.25)]' 
                          : 'border-white/10 opacity-70'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono font-bold text-[#0066FF] bg-[#0066FF]/10 px-3 py-1 rounded-full border border-[#0066FF]/30">
                            STEP {step.step}
                          </span>
                          <span className="text-[10px] uppercase font-mono tracking-widest text-white/40">
                            {step.tag}
                          </span>
                        </div>
                        <IconComp className="w-5 h-5 text-[#0066FF]" />
                      </div>

                      <h3 className="text-xl font-semibold text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/65 font-light leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right 5 cols: Large Repair Lab Visual Window */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden border border-white/15 bg-[#090D14] shadow-[0_25px_70px_rgba(0,0,0,0.9)]">
                <img
                  id="repair-visual-img"
                  src="/KZO/cat-repair.jpg"
                  alt="KZO Tech Repair Cleanroom"
                  className="w-full h-full object-cover object-center filter brightness-[0.95] contrast-[1.1] will-change-transform transition-all duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
                
                {/* Cleanroom Lab Stamp */}
                <div className="absolute bottom-6 left-6 right-6 z-20 bg-black/80 backdrop-blur-xl border border-white/10 p-5 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#0066FF] font-semibold block">
                      DIAGNOSTIC LAB &middot; LEVEL 4
                    </span>
                    <span className="text-sm font-semibold text-white block mt-0.5">
                      ESD Cleanroom Certified
                    </span>
                  </div>
                  <button
                    onClick={() => setRepairModalOpen(true)}
                    className="px-4 py-2 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
                  >
                    Book Diagnostic
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 7 — FINAL CTA (CINEMATIC BRAND FINALE)
          ========================================================================= */}
      <section 
        id="final-cta-section"
        className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16 bg-[#030508] border-t border-white/5 relative overflow-hidden"
      >
        <div className="max-w-[1650px] mx-auto relative z-10">
          
          <div className="relative rounded-3xl overflow-hidden border border-[#0066FF]/50 bg-gradient-to-r from-black via-[#060D1E] to-black p-8 sm:p-14 lg:p-20 shadow-[0_0_80px_rgba(0,102,255,0.25)] flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Background Macro Imagery with GSAP Reveal */}
            <div 
              id="cta-bg-layer"
              className="absolute inset-0 z-0 opacity-40 pointer-events-none will-change-transform"
            >
              <img
                src="/KZO/cta-phones.jpg"
                alt="KZO Tech Flagship Finale"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#030508] via-[#030508]/85 to-transparent w-full lg:w-2/3" />
            </div>

            {/* Light Sweep Effect */}
            <div 
              id="cta-light-sweep" 
              className="absolute -inset-full w-[200%] h-full bg-gradient-to-r from-transparent via-[#0066FF]/20 to-transparent skew-x-12 pointer-events-none"
            />

            {/* Left Copy & Buttons */}
            <div className="relative z-10 max-w-xl">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-light text-white tracking-tight leading-[1.08] mb-4">
                <span className="cta-headline-line block">Upgrade Your Tech.</span>
                <span className="cta-headline-line block font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#0066FF]">
                  Repair With Confidence.
                </span>
              </h2>

              <p id="cta-desc-text" className="text-xs sm:text-sm md:text-base text-white/75 font-light leading-relaxed mb-8 max-w-lg">
                Premium devices. Precision repairs. Lasting support. Discover what KZO Tech can do for you today.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#categories-pin-wrapper"
                  onMouseMove={handleMagneticMove}
                  onMouseLeave={handleMagneticLeave}
                  className="cta-action-btn inline-flex items-center gap-3 bg-[#0066FF] hover:bg-[#0052CC] text-white px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] rounded-full transition-all duration-300 shadow-[0_0_25px_rgba(0,102,255,0.6)]"
                >
                  <span>Shop Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setRepairModalOpen(true)}
                  onMouseMove={handleMagneticMove}
                  onMouseLeave={handleMagneticLeave}
                  className="cta-action-btn inline-flex items-center gap-3 bg-black/75 hover:bg-black border border-white/25 hover:border-[#0066FF] text-white px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] rounded-full backdrop-blur-md transition-all shadow-[0_0_15px_rgba(0,0,0,0.6)]"
                >
                  <Wrench className="w-3.5 h-3.5 text-[#0066FF]" />
                  <span>Book Repair Lab</span>
                </button>
              </div>
            </div>

            {/* Right Brand Stamp */}
            <div 
              id="cta-stamp-box"
              className="relative z-10 hidden md:flex flex-col items-center p-8 bg-black/75 backdrop-blur-xl border border-white/15 rounded-2xl shadow-[0_15px_45px_rgba(0,0,0,0.8)] will-change-transform"
            >
              <img
                src="/KZO/kzo-logo.jpeg"
                alt="KZO TECH"
                className="h-16 w-auto object-contain mb-3"
              />
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#0066FF] font-semibold text-center">
                TECHNOLOGY FOR A SMARTER TOMORROW
              </span>
              <span className="text-[10px] text-white/40 mt-1 uppercase tracking-widest">
                A KHANZ Group Division
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 8 — FOOTER
          ========================================================================= */}
      <footer id="support" className="bg-[#020306] border-t border-white/10 py-16 px-6 sm:px-10 lg:px-16 text-white/70 text-xs">
        <div className="max-w-[1650px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <img 
              src="/KZO/kzo-logo.jpeg" 
              alt="KZO TECH Logo" 
              className="h-10 w-auto mb-4 brightness-105" 
            />
            <p className="text-xs text-white/50 font-light max-w-sm mb-6 leading-relaxed">
              KZO Tech &mdash; Technology for a Smarter Tomorrow. Curated mobile devices, photography gear, drones, and laboratory-grade repair services.
            </p>
            <span className="block text-[11px] text-white/30">
              A proud business division of KHANZ Group.
            </span>
          </div>

          {/* Shop Col */}
          <div>
            <h4 className="text-white font-semibold uppercase tracking-wider text-xs mb-4">Shop Catalog</h4>
            <ul className="space-y-2.5">
              <li><a href="#categories-pin-wrapper" className="hover:text-[#0066FF] transition-colors">Mobile Phones</a></li>
              <li><a href="#categories-pin-wrapper" className="hover:text-[#0066FF] transition-colors">Cameras &amp; Optics</a></li>
              <li><a href="#categories-pin-wrapper" className="hover:text-[#0066FF] transition-colors">Aerial Drones</a></li>
              <li><a href="#categories-pin-wrapper" className="hover:text-[#0066FF] transition-colors">Smart Gear &amp; Audio</a></li>
              <li><a href="#categories-pin-wrapper" className="hover:text-[#0066FF] transition-colors">Pre-Owned Flagships</a></li>
            </ul>
          </div>

          {/* Support Col */}
          <div>
            <h4 className="text-white font-semibold uppercase tracking-wider text-xs mb-4">Service &amp; Lab</h4>
            <ul className="space-y-2.5">
              <li><button onClick={() => setRepairModalOpen(true)} className="hover:text-[#0066FF] transition-colors">Repair Lab Portal</button></li>
              <li><button onClick={() => setRepairModalOpen(true)} className="hover:text-[#0066FF] transition-colors">Track Diagnostics</button></li>
              <li><a href="#about-pin-container" className="hover:text-[#0066FF] transition-colors">Quality Standard</a></li>
              <li><button onClick={() => setRepairModalOpen(true)} className="hover:text-[#0066FF] transition-colors">Contact Engineers</button></li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div>
            <h4 className="text-white font-semibold uppercase tracking-wider text-xs mb-4">Stay Synchronized</h4>
            <p className="text-white/50 text-[11px] mb-3 leading-relaxed">
              Receive updates on newly verified arrivals, trade-in valuations, and laboratory slots.
            </p>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (newsletterEmail) {
                  setNewsletterSubscribed(true);
                  setNewsletterEmail('');
                }
              }}
              className="flex flex-col gap-2"
            >
              <div className="relative">
                <input 
                  type="email" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-white/5 border border-white/15 focus:border-[#0066FF] px-3.5 py-2.5 rounded-lg text-white text-xs outline-none transition-colors"
                />
                <button 
                  type="submit" 
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 text-[#0066FF] hover:text-white transition-colors"
                  aria-label="Subscribe"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {newsletterSubscribed && (
                <span className="text-[11px] text-[#0066FF] font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Subscribed successfully!
                </span>
              )}
            </form>
          </div>

        </div>

        <div className="max-w-[1650px] mx-auto pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/40 gap-4">
          <p>&copy; {new Date().getFullYear()} KZO TECH &middot; KHANZ Group. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#home" className="hover:text-white transition-colors">Back to Top</a>
            <Link to="/" className="hover:text-white transition-colors">KHANZ Group Home</Link>
          </div>
        </div>
      </footer>

      {/* =========================================================================
          INTERACTIVE MODAL: BOOK REPAIR / CONTACT
          ========================================================================= */}
      {repairModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#080D17] border border-[#0066FF]/50 rounded-2xl p-6 sm:p-8 shadow-[0_0_60px_rgba(0,102,255,0.3)] animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setRepairModalOpen(false)}
              className="absolute top-5 right-5 text-white/50 hover:text-white p-1"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-[#0066FF]/15 text-[#0066FF]">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Book Lab Diagnostic</h3>
                <p className="text-xs text-white/50">Direct triage with certified repair engineers</p>
              </div>
            </div>

            {repairFormSubmitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <CheckCircle2 className="w-14 h-14 text-[#0066FF] mb-4 animate-bounce" />
                <h4 className="text-lg font-semibold text-white mb-1">Intake Ticket Created!</h4>
                <p className="text-xs text-white/60 max-w-xs">
                  Our lab engineers will contact you within 15 minutes with preliminary diagnostic assessment.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRepairSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1.5 uppercase tracking-wider">
                    Device Model
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. iPhone 15 Pro Max, DJI Mavic 3, Sony A7IV"
                    value={repairDevice}
                    onChange={(e) => setRepairDevice(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#0066FF] rounded-lg px-4 py-2.5 text-xs text-white outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1.5 uppercase tracking-wider">
                    Issue Description
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe issue (screen flicker, liquid drop, camera sensor, charging port...)"
                    value={repairIssue}
                    onChange={(e) => setRepairIssue(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#0066FF] rounded-lg px-4 py-2.5 text-xs text-white outline-none transition-colors resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1.5 uppercase tracking-wider">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={repairName}
                      onChange={(e) => setRepairName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 focus:border-[#0066FF] rounded-lg px-4 py-2.5 text-xs text-white outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1.5 uppercase tracking-wider">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+92 300 0000000"
                      value={repairContact}
                      onChange={(e) => setRepairContact(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 focus:border-[#0066FF] rounded-lg px-4 py-2.5 text-xs text-white outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-semibold uppercase tracking-[0.2em] rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(0,102,255,0.4)]"
                  >
                    Submit For Diagnostic
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          INTERACTIVE MODAL: CATEGORY SPECIFICATIONS INSPECT
          ========================================================================= */}
      {selectedCategory && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          {(() => {
            const cat = categories.find(c => c.id === selectedCategory);
            if (!cat) return null;
            return (
              <div className="relative w-full max-w-lg bg-[#080D17] border border-[#0066FF]/60 rounded-2xl p-6 sm:p-8 shadow-[0_0_60px_rgba(0,102,255,0.35)] animate-in fade-in zoom-in-95 duration-200">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="absolute top-5 right-5 text-white/50 hover:text-white p-1"
                  aria-label="Close Category Modal"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="aspect-[16/9] w-full rounded-xl overflow-hidden mb-5 bg-black border border-white/10">
                  <img src={cat.image} alt={cat.title} className="w-full h-full object-cover" />
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono font-bold text-[#0066FF] bg-[#0066FF]/10 px-2 py-0.5 rounded border border-[#0066FF]/30">
                    {cat.num}
                  </span>
                  <span className="text-[10px] uppercase font-semibold tracking-wider text-[#0066FF]">
                    {cat.badge}
                  </span>
                </div>

                <h3 className="text-2xl font-semibold text-white mb-2">{cat.title}</h3>
                <p className="text-xs text-white/70 font-light leading-relaxed mb-5">
                  {cat.description}
                </p>

                <div className="space-y-2 mb-6">
                  <span className="text-[10px] uppercase tracking-widest text-white/40 block mb-1">
                    Quality Benchmarks &amp; Specs:
                  </span>
                  {cat.specs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-white/90">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0066FF] flex-shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setRepairModalOpen(true);
                    }}
                    className="flex-1 py-2.5 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors text-center"
                  >
                    Inquire / Order
                  </button>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white text-xs font-medium uppercase tracking-wider rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}

    </div>
  );
};

export default KzoTech;
