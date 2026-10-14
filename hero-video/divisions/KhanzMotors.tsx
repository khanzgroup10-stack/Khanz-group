// // 

// import React, { useEffect, useRef, useState } from 'react';
// import {
//   motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring, useInView, animate,
// } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import {
//   ChevronRight, ChevronLeft, Play, ArrowRight, ShieldCheck, Settings, Tag,
//   HardHat, Handshake, Bike, Car, ShoppingBag,
// } from 'lucide-react';

// /* ------------------------------------------------------------------
//    IMAGES — apni images /public/khanmotors/ me rakh do (same naam se).
//    Local image na mili to fallback load hogi.
// ------------------------------------------------------------------- */
// const IMG = {
//   logo: '/khanmotors/khanz-logo.jpeg',
//   heroVideo: '/khanmotors/khanz-motors.mp4',
//   showroom: ['/khanmotors/showroom.jpg', 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=900&q=80'],
//   bike: ['/khanmotors/bike.png', 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1000&q=80'],
//   car: ['/khanmotors/car.png', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1000&q=80'],
//   catBike: ['/khanmotors/cat-bike.jpg', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=700&q=80'],
//   catCar: ['/khanmotors/cat-car.jpg', 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=700&q=80'],
//   catParts: ['/khanmotors/cat-parts.jpg', 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=700&q=80'],
//   catAcc: ['/khanmotors/cat-accessories.jpg', 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=700&q=80'],
//   cta: ['/khanmotors/cta-rider.jpg', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1800&q=80'],
// };

// const RED = '#E60012';
// const EASE = [0.16, 1, 0.3, 1];

// /* ===================== HELPERS ===================== */

// const Img = ({ src, alt = '', className = '' }) => {
//   const list = Array.isArray(src) ? src : [src];
//   const [i, setI] = useState(0);
//   const [dead, setDead] = useState(false);
//   if (dead) return <div className={`${className} bg-gradient-to-br from-[#10141c] to-[#05070a]`} />;
//   return <img src={list[i]} alt={alt} className={className} onError={() => (i < list.length - 1 ? setI(i + 1) : setDead(true))} />;
// };

// const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } };
// const fadeLeft = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 1, ease: EASE } } };
// const fadeRight = { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 1, ease: EASE } } };
// const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } };
// const inView = { initial: 'hidden', whileInView: 'visible', viewport: { once: true, margin: '-10%' } };

// /* Line-by-line masked text reveal */
// const Reveal = ({ lines, className = '', delay = 0, as: Tag = 'h2', onLoad }) => (
//   <Tag className={className}>
//     {lines.map((l, i) => (
//       <span key={i} className="block overflow-hidden pb-[0.08em]">
//         <motion.span
//           className="block"
//           initial={{ y: '110%', rotate: 2 }}
//           {...(onLoad ? { animate: { y: 0, rotate: 0 } } : { whileInView: { y: 0, rotate: 0 }, viewport: { once: true } })}
//           transition={{ duration: 1.1, ease: EASE, delay: delay + i * 0.13 }}
//         >
//           {l}
//         </motion.span>
//       </span>
//     ))}
//   </Tag>
// );

// /* Section label: number + text */
// const Label = ({ num, children }) => (
//   <motion.div variants={fadeUp} className="mb-6">
//     <span className="block text-[10px] tracking-[0.3em] text-white/40 mb-1">{num}</span>
//     <span className="flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-white/60 leading-relaxed">
//       {children}
//     </span>
//   </motion.div>
// );

// /* Counting number */
// const Counter = ({ to, suffix = '' }) => {
//   const ref = useRef(null);
//   const seen = useInView(ref, { once: true });
//   const [v, setV] = useState(0);
//   useEffect(() => {
//     if (!seen) return;
//     const c = animate(0, to, { duration: 1.8, ease: EASE, onUpdate: (x) => setV(Math.round(x)) });
//     return () => c.stop();
//   }, [seen, to]);
//   return <span ref={ref}>{v}{suffix}</span>;
// };

// /* 3D tilt card */
// const TiltCard = ({ children, className = '', ...rest }) => {
//   const x = useMotionValue(0);
//   const y = useMotionValue(0);
//   const rx = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
//   const ry = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });
//   return (
//     <motion.div
//       style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
//       onMouseMove={(e) => {
//         const r = e.currentTarget.getBoundingClientRect();
//         x.set((e.clientX - r.left) / r.width - 0.5);
//         y.set((e.clientY - r.top) / r.height - 0.5);
//       }}
//       onMouseLeave={() => { x.set(0); y.set(0); }}
//       className={className}
//       {...rest}
//     >
//       {children}
//     </motion.div>
//   );
// };

// /* Magnetic wrapper for buttons */
// const Magnetic = ({ children, className = '' }) => {
//   const x = useSpring(0, { stiffness: 250, damping: 15 });
//   const y = useSpring(0, { stiffness: 250, damping: 15 });
//   return (
//     <motion.div
//       style={{ x, y }}
//       className={`inline-block ${className}`}
//       onMouseMove={(e) => {
//         const r = e.currentTarget.getBoundingClientRect();
//         x.set((e.clientX - r.left - r.width / 2) * 0.25);
//         y.set((e.clientY - r.top - r.height / 2) * 0.35);
//       }}
//       onMouseLeave={() => { x.set(0); y.set(0); }}
//     >
//       {children}
//     </motion.div>
//   );
// };

// /* Red primary button with shine sweep */
// const RedBtn = ({ href, children }) => (
//   <Magnetic>
//     <a href={href} className="group relative overflow-hidden bg-[#E60012] hover:bg-[#ff1e27] text-white px-7 py-3.5 text-[13px] font-medium transition-colors rounded-sm flex items-center gap-3 shadow-[0_10px_30px_-8px_rgba(230,0,18,0.9)]">
//       <motion.span
//         className="absolute inset-y-0 -left-1/2 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg]"
//         animate={{ x: ['0%', '500%'] }} transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 2.5, ease: 'easeInOut' }}
//       />
//       <span className="relative flex items-center gap-3">{children}<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
//     </a>
//   </Magnetic>
// );

// const OutlineBtn = ({ href, children, arrow = true }) => (
//   <Magnetic>
//     <a href={href} className="group relative overflow-hidden border border-[#E60012] text-white px-7 py-3.5 text-[13px] font-medium rounded-sm flex items-center gap-3">
//       <span className="absolute inset-0 bg-[#E60012] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
//       <span className="relative flex items-center gap-3">
//         {children}
//         {arrow && <ArrowRight className="w-3.5 h-3.5 text-[#E60012] group-hover:text-white group-hover:translate-x-1 transition-all" />}
//       </span>
//     </a>
//   </Magnetic>
// );

// const CircleArrow = ({ left }) => (
//   <span className="relative w-9 h-9 rounded-full border border-[#E60012]/70 flex items-center justify-center text-white group-hover:bg-[#E60012] group-hover:border-[#E60012] transition-all duration-300 group-hover:shadow-[0_0_18px_rgba(230,0,18,0.7)]">
//     {left ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />}
//   </span>
// );

// const Social = {
//   fb: <path d="M14 8h3V4h-3c-2.8 0-4 1.8-4 4.3V10H7v4h3v8h4v-8h3l1-4h-4V8.6c0-.4.2-.6.6-.6z" fill="currentColor" />,
//   ig: (<g fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="5" /><circle cx="12" cy="12" r="3.5" /><circle cx="17" cy="7" r=".8" fill="currentColor" /></g>),
//   yt: (<g><rect x="3" y="6" width="18" height="12" rx="3.5" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M10.5 9.5v5l4-2.5z" fill="currentColor" /></g>),
//   tt: <path d="M14 4c.4 2 1.7 3.4 4 3.6v3c-1.5 0-2.8-.4-4-1.2V15a5 5 0 1 1-5-5v3a2 2 0 1 0 2 2V4z" fill="currentColor" />,
// };

// /* Deterministic particles */
// const PARTICLES = Array.from({ length: 26 }, (_, i) => ({
//   left: `${(i * 37) % 100}%`,
//   top: `${(i * 53) % 100}%`,
//   size: 1 + (i % 3),
//   dur: 6 + (i % 5) * 1.6,
//   delay: (i % 7) * 0.8,
// }));

// /* ===================== PAGE ===================== */

// export const KhanzMotors = () => {
//   useEffect(() => { window.scrollTo(0, 0); }, []);

//   const { scrollYProgress } = useScroll();
//   const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
//   const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

//   /* Hero mouse parallax */
//   const mx = useMotionValue(0);
//   const my = useMotionValue(0);
//   const smx = useSpring(mx, { stiffness: 60, damping: 20 });
//   const smy = useSpring(my, { stiffness: 60, damping: 20 });
//   const ringX = useTransform(smx, (v) => v * 40);
//   const ringY = useTransform(smy, (v) => v * 30);
//   const partX = useTransform(smx, (v) => v * -25);
//   const partY = useTransform(smy, (v) => v * -20);
//   const glowX = useTransform(smx, (v) => v * 120);

//   /* Hero slides */
//   const [slide, setSlide] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => setSlide((s) => (s + 1) % 3), 5000);
//     return () => clearInterval(t);
//   }, []);
//   const heroTaglines = [
//     'Heavy bike sale & purchase, cars, parts and premium accessories — all in one destination.',
//     'Verified heavy bikes and quality cars — inspected, trusted and ready to ride.',
//     'Genuine parts and premium accessories to upgrade every ride and drive.',
//   ];

//   /* Categories carousel */
//   const trackRef = useRef(null);
//   const scrollCats = (dir) => {
//     const el = trackRef.current;
//     if (el) el.scrollBy({ left: dir * (el.clientWidth / 2), behavior: 'smooth' });
//   };

//   const categories = [
//     { id: 'bikes-cat', title: 'Heavy Bikes', desc: 'Buy & Sell Premium Bikes', img: IMG.catBike, icon: Bike },
//     { id: 'cars-cat', title: 'Cars', desc: 'Buy & Sell Quality Cars', img: IMG.catCar, icon: Car },
//     { id: 'parts', title: 'Parts', desc: 'Genuine Automotive Parts', img: IMG.catParts, icon: Settings },
//     { id: 'accessories', title: 'Accessories', desc: 'Premium Gear & Upgrades', img: IMG.catAcc, icon: ShoppingBag },
//   ];

//   const services = [
//     { title: 'Buy & Sell', desc: 'Easy and secure buying and selling process.', icon: Tag },
//     { title: 'Genuine Parts', desc: 'Authentic parts for reliable performance.', icon: Settings },
//     { title: 'Premium Accessories', desc: 'Top brands to enhance your ride and drive.', icon: HardHat },
//     { title: 'Vehicle Inspection', desc: 'Verified vehicles for your peace of mind.', icon: ShieldCheck },
//     { title: 'Trusted Deals', desc: 'A community built on trust and transparency.', icon: Handshake },
//   ];

//   const footerLinks = [['Home', '#home'], ['Cars', '#cars'], ['Heavy Bikes', '#bikes'], ['Parts', '#parts'], ['Accessories', '#accessories'], ['About', '#about'], ['Contact', '#contact']];

//   /* Two-worlds curves */
//   const curves = [
//     'M0,430 C280,430 380,170 700,300 C1020,430 1120,170 1400,190',
//     'M0,190 C300,170 420,430 700,300 C980,170 1090,470 1400,450',
//   ];

//   /* Vision road */
//   const road = 'M960,-30 C780,50 640,90 570,170 C480,270 660,330 530,420 C400,510 250,480 160,660';

//   return (
//     <div className="bg-[#05070B] min-h-screen font-sans text-[#F5F3EF] overflow-x-hidden selection:bg-[#E60012] selection:text-white">

//       {/* Scroll progress */}
//       <motion.div style={{ scaleX: progress }} className="fixed top-0 left-0 right-0 h-[2px] bg-[#E60012] origin-left z-[60] shadow-[0_0_10px_#E60012]" />

//       {/* ============ LOGO ONLY ============ */}
//       <motion.div
//         initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, ease: EASE }}
//         className="absolute top-0 left-0 z-50 px-6 md:px-12 lg:px-20 py-6"
//       >
//         <Link to="/" className="flex items-center gap-3 group">
//           <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.8, ease: EASE }} className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/80 group-hover:border-[#E60012] transition-colors shadow-[0_0_20px_rgba(230,0,18,0.25)]">
//             <img src={IMG.logo} alt="KhanZ Motors" className="w-full h-full object-cover" />
//           </motion.div>
//           <div className="hidden sm:block">
//             <span className="text-lg font-bold tracking-[0.12em] uppercase">KhanZ <span className="font-light">Motors</span></span>
//             <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.6, ease: EASE }} className="block h-[2px] w-full origin-left bg-gradient-to-r from-[#E60012] via-[#E60012]/60 to-transparent mt-1" />
//           </div>
//         </Link>
//       </motion.div>

//       {/* ============ HERO ============ */}
//       <section
//         id="home"
//         onMouseMove={(e) => { mx.set(e.clientX / window.innerWidth - 0.5); my.set(e.clientY / window.innerHeight - 0.5); }}
//         className="relative h-screen min-h-[740px] w-full flex items-center px-6 md:px-12 lg:px-20 overflow-hidden"
//       >
//         <motion.div style={{ y: yBg }} className="absolute inset-0 z-0">
//           <motion.video initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 2.5, ease: EASE }} src={IMG.heroVideo} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-70" />
//           <div className="absolute inset-0 bg-gradient-to-r from-[#05070B] via-[#05070B]/55 to-transparent" />
//           <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-transparent to-[#05070B]/50" />
//           <motion.div style={{ x: glowX }} className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-[#E60012]/15 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />
//         </motion.div>

//         {/* Floating particles */}
//         <motion.div style={{ x: partX, y: partY }} className="absolute inset-0 z-[1] pointer-events-none">
//           {PARTICLES.map((p, i) => (
//             <motion.span
//               key={i}
//               className="absolute rounded-full bg-[#E60012]"
//               style={{ left: p.left, top: p.top, width: p.size, height: p.size, boxShadow: `0 0 ${p.size * 4}px ${RED}` }}
//               animate={{ y: [0, -60, 0], opacity: [0, 0.9, 0] }}
//               transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
//             />
//           ))}
//         </motion.div>

//         {/* Light streaks on the floor */}
//         <div className="absolute bottom-[14%] right-0 w-[60%] h-24 z-[1] pointer-events-none hidden md:block">
//           {[0, 1, 2].map((i) => (
//             <motion.span
//               key={i}
//               className="absolute h-[2px] w-40 bg-gradient-to-r from-transparent via-[#E60012] to-transparent rounded-full"
//               style={{ top: i * 26, filter: 'blur(0.5px)' }}
//               animate={{ x: ['120%', '-140%'], opacity: [0, 1, 0] }}
//               transition={{ duration: 2.4 + i * 0.6, repeat: Infinity, delay: i * 0.9, ease: 'easeIn' }}
//             />
//           ))}
//         </div>

//         {/* KZ ring emblem */}
//         <motion.div
//           style={{ x: ringX, y: ringY }}
//           initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.6, ease: EASE, delay: 0.3 }}
//           className="absolute top-[10%] right-[16%] w-[360px] h-[360px] hidden lg:block pointer-events-none z-[2]"
//         >
//           <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
//             <circle cx="100" cy="100" r="96" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6" />
//             <circle cx="100" cy="100" r="84" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.6" strokeDasharray="2 4" />
//           </svg>
//           <motion.svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" animate={{ rotate: 360 }} transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}>
//             <circle cx="100" cy="100" r="96" fill="none" stroke={RED} strokeWidth="1.6" strokeDasharray="130 473" strokeLinecap="round" style={{ filter: `drop-shadow(0 0 6px ${RED})` }} />
//           </motion.svg>
//           <motion.svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" animate={{ rotate: -360 }} transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}>
//             <circle cx="100" cy="100" r="84" fill="none" stroke={RED} strokeOpacity="0.5" strokeWidth="0.8" strokeDasharray="40 488" strokeLinecap="round" />
//           </motion.svg>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <motion.span
//               animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 3, repeat: Infinity }}
//               className="text-[150px] font-black italic tracking-tighter leading-none text-transparent" style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.22)' }}
//             >KZ</motion.span>
//           </div>
//         </motion.div>

//         {/* Right vertical category list */}
//         <motion.ul
//           initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.8 } } }}
//           className="absolute right-6 md:right-12 lg:right-20 top-[22%] hidden md:flex flex-col items-end gap-6 text-[10px] tracking-[0.2em] uppercase text-white/70 z-10"
//         >
//           {[['Cars', '#cars'], ['Heavy Bikes', '#bikes'], ['Parts', '#parts'], ['Accessories', '#accessories']].map(([c, h]) => (
//             <motion.li key={c} variants={fadeRight}>
//               <a href={h} className="flex items-center gap-3 group hover:text-white transition-colors">
//                 {c}<span className="w-6 h-[1px] bg-[#E60012] group-hover:w-12 transition-all duration-300" />
//               </a>
//             </motion.li>
//           ))}
//         </motion.ul>

//         <div className="relative z-10 max-w-3xl mt-10">
//           <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="flex items-center gap-4 mb-6">
//             <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="w-8 h-[2px] bg-[#E60012] origin-left" />
//             <span className="text-[11px] tracking-[0.25em] uppercase text-white/70">Welcome to KhanZ Motors</span>
//           </motion.div>

//           <Reveal
//             as="h1" onLoad delay={0.35}
//             className="text-5xl md:text-7xl lg:text-[5.6rem] font-bold leading-[1.02] tracking-tight mb-6"
//             lines={['Performance.', <span className="text-white/60">Precision.</span>, <span className="text-[#E60012] drop-shadow-[0_0_25px_rgba(230,0,18,0.45)]">Passion.</span>]}
//           />

//           <div className="h-14 mb-10 max-w-md">
//             <AnimatePresence mode="wait">
//               <motion.p
//                 key={slide}
//                 initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }} transition={{ duration: 0.6 }}
//                 className="text-sm md:text-base text-white/75 leading-relaxed"
//               >
//                 {heroTaglines[slide]}
//               </motion.p>
//             </AnimatePresence>
//           </div>

//           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1 }} className="flex flex-wrap items-center gap-6">
//             <RedBtn href="#categories">Explore Vehicles</RedBtn>
//             <a href="#about" className="group flex items-center gap-4 text-[13px] text-white/80 hover:text-white transition-colors">
//               <span className="relative w-11 h-11 rounded-full border border-white/30 flex items-center justify-center group-hover:border-[#E60012] transition-colors">
//                 <span className="absolute inset-0 rounded-full border border-[#E60012]/60 animate-ping opacity-40" />
//                 <Play className="w-3 h-3 ml-0.5 fill-current" />
//               </span>
//               Watch Our Story
//             </a>
//           </motion.div>
//         </div>

//         {/* Slide indicators */}
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} className="absolute bottom-12 left-6 md:left-12 lg:left-20 flex items-end gap-6 z-10">
//           {['01', '02', '03'].map((n, i) => (
//             <button key={n} onClick={() => setSlide(i)} className="text-left">
//               <span className={`block text-[10px] tracking-[0.2em] mb-2 transition-colors ${slide === i ? 'text-white' : 'text-white/40'}`}>{n}</span>
//               <span className="block w-20 h-[2px] bg-white/15 overflow-hidden">
//                 {slide === i && <motion.span key={`p${slide}`} className="block h-full bg-[#E60012] shadow-[0_0_8px_#E60012]" initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 5, ease: 'linear' }} />}
//               </span>
//             </button>
//           ))}
//         </motion.div>

//         {/* Scroll cue + side text */}
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-12 right-6 md:right-12 lg:right-20 hidden md:flex items-stretch gap-3 z-10">
//           <span className="relative w-[1px] bg-white/20 overflow-hidden">
//             <motion.span className="absolute left-0 w-full h-1/2 bg-[#E60012]" animate={{ y: ['-100%', '200%'] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} />
//           </span>
//           <p className="text-[9px] tracking-[0.2em] uppercase text-white/60 leading-loose">More<br />Than<br />Vehicles</p>
//         </motion.div>
//       </section>

//       {/* ============ ABOUT ============ */}
//       <section id="about" className="relative border-t border-white/5 bg-[#070A0F] overflow-hidden">
//         <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-stretch">
//           <motion.div {...inView} variants={stagger} className="lg:col-span-4 px-6 md:px-12 lg:pl-20 py-20 lg:py-28">
//             <Label num="02">About Us</Label>
//             <Reveal className="text-4xl md:text-[3.4rem] font-light tracking-tight leading-[1.08]" lines={['More Than', 'Vehicles.']} />
//             <motion.p variants={fadeUp} className="text-[#E60012] text-2xl md:text-[1.7rem] mt-3">A Community of Passion.</motion.p>
//           </motion.div>

//           <motion.div {...inView} variants={stagger} className="lg:col-span-4 px-6 md:px-12 lg:px-6 pb-16 lg:py-28 flex flex-col justify-center">
//             <motion.p variants={fadeUp} className="text-sm text-white/70 leading-relaxed mb-10">
//               KhanZ Motors is your trusted destination for buying and selling heavy bikes and cars, along with genuine parts and premium accessories. We bring together enthusiasts, buyers and sellers on one platform — with a focus on quality, trust and a better driving experience.
//             </motion.p>
//             <motion.div variants={fadeUp} className="grid grid-cols-3">
//               <div className="pr-2">
//                 <p className="text-2xl font-semibold mb-1"><Counter to={4} suffix="+" /></p>
//                 <p className="text-[8px] tracking-[0.15em] uppercase text-white/50">Categories</p>
//               </div>
//               <div className="relative pl-4 pr-2">
//                 <motion.span initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }} className="absolute left-0 top-0 h-full w-[1px] bg-[#E60012] origin-top" />
//                 <p className="text-2xl font-semibold mb-1"><Counter to={100} suffix="%" /></p>
//                 <p className="text-[8px] tracking-[0.15em] uppercase text-white/50">Genuine Products</p>
//               </div>
//               <div className="relative pl-4">
//                 <motion.span initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.6 }} className="absolute left-0 top-0 h-full w-[1px] bg-[#E60012] origin-top" />
//                 <p className="text-lg font-semibold mb-1 mt-1">TRUSTED</p>
//                 <p className="text-[8px] tracking-[0.15em] uppercase text-white/50">By Enthusiasts</p>
//               </div>
//             </motion.div>
//           </motion.div>

//           <motion.div {...inView} variants={fadeRight} className="lg:col-span-4 relative min-h-[400px] overflow-hidden group">
//             <motion.div className="absolute inset-0" whileInView={{ scale: [1.2, 1] }} viewport={{ once: true }} transition={{ duration: 2, ease: EASE }}>
//               <Img src={IMG.showroom} alt="Showroom" className="w-full h-full object-cover opacity-50 group-hover:opacity-65 transition-opacity duration-700" />
//             </motion.div>
//             <div className="absolute inset-0 bg-gradient-to-r from-[#070A0F] via-[#070A0F]/50 to-[#070A0F]/20" />
//             {/* scanning light */}
//             <motion.div className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" animate={{ x: ['-100%', '500%'] }} transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }} />
//             <div className="relative z-10 h-full flex flex-col items-center justify-center p-10">
//               <motion.div animate={{ boxShadow: ['0 0 20px rgba(230,0,18,0.15)', '0 0 50px rgba(230,0,18,0.45)', '0 0 20px rgba(230,0,18,0.15)'] }} transition={{ duration: 3, repeat: Infinity }} className="w-24 h-24 rounded-full overflow-hidden border border-white/20 mb-4">
//                 <img src={IMG.logo} alt="KhanZ" className="w-full h-full object-cover" />
//               </motion.div>
//               <h3 className="text-xl font-bold tracking-[0.15em] uppercase text-white/80 mb-8">KhanZ <span className="font-light">Motors</span></h3>
//               <motion.ul {...inView} variants={stagger} className="self-end border-l border-[#E60012] pl-3 text-[9px] tracking-[0.2em] uppercase text-white/60 space-y-1.5">
//                 {['Cars', 'Bikes', 'Parts', 'Accessories'].map((t) => <motion.li key={t} variants={fadeRight}>{t}</motion.li>)}
//                 <motion.li variants={fadeRight} className="text-white">All Together</motion.li>
//               </motion.ul>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* ============ TWO WORLDS ============ */}
//       <section className="relative py-24 px-6 md:px-12 lg:px-20 border-t border-white/5 bg-[#04060A] overflow-hidden">
//         <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1400 600" preserveAspectRatio="none">
//           {curves.map((d, i) => (
//             <g key={i}>
//               <motion.path d={d} fill="none" stroke={RED} strokeWidth="1" strokeOpacity="0.6"
//                 initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2.4, delay: 0.2 + i * 0.3, ease: 'easeInOut' }} />
//               <motion.path d={d} fill="none" stroke={RED} strokeWidth="6" strokeOpacity="0.14" style={{ filter: 'blur(4px)' }}
//                 initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2.4, delay: 0.2 + i * 0.3, ease: 'easeInOut' }} />
//               {/* energy pulses travelling along curves */}
//               {[0, 1].map((k) => (
//                 <circle key={k} r="3" fill="#ff3340" style={{ filter: `drop-shadow(0 0 6px ${RED})` }}>
//                   <animateMotion dur={`${6 + i * 1.5}s`} begin={`${k * 3 + i}s`} repeatCount="indefinite" path={d} />
//                 </circle>
//               ))}
//             </g>
//           ))}
//         </svg>
//         {[['18%', '28%'], ['55%', '16%'], ['42%', '80%'], ['78%', '72%'], ['90%', '30%'], ['8%', '68%']].map(([l, t], i) => (
//           <span key={i} className="absolute w-1.5 h-1.5 rounded-full bg-[#E60012] shadow-[0_0_12px_#E60012] animate-pulse" style={{ left: l, top: t, animationDelay: `${i * 0.4}s` }} />
//         ))}

//         <div className="max-w-[1400px] mx-auto relative z-10">
//           <motion.div {...inView} variants={stagger}><Label num="03">Two Worlds<br />One Passion</Label></motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-10">
//             {/* Bikes */}
//             <motion.div {...inView} variants={fadeLeft} id="bikes" className="flex items-center gap-2 group">
//               <div className="flex-shrink-0 w-[40%] z-10">
//                 <h3 className="text-2xl md:text-3xl font-bold tracking-wide mb-2">HEAVY BIKES</h3>
//                 <motion.span initial={{ width: 0 }} whileInView={{ width: 32 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.6 }} className="block h-[2px] bg-[#E60012] mb-5" />
//                 <p className="text-xs text-white/70 mb-6 leading-relaxed">Feel the power.<br />Live the freedom.</p>
//                 <a href="#bikes" className="group/l flex items-center gap-3 text-[11px] hover:text-[#E60012] transition-colors">
//                   <span className="group"><CircleArrow /></span> Explore Bikes <ArrowRight className="w-3 h-3 group-hover/l:translate-x-1 transition-transform" />
//                 </a>
//               </div>
//               <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} className="relative flex-1 aspect-[4/3]">
//                 <div className="absolute inset-[20%] bg-[#E60012]/25 blur-3xl rounded-full" />
//                 <Img src={IMG.bike} alt="Heavy bike" className="relative w-full h-full object-cover brightness-[0.75] contrast-125 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_72%)] group-hover:scale-105 transition-transform duration-700" />
//                 <div className="absolute bottom-[12%] left-[15%] right-[15%] h-4 bg-black/70 blur-xl rounded-full" />
//               </motion.div>
//             </motion.div>

//             {/* KZ center */}
//             <motion.div initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.4, ease: EASE }} className="flex flex-col items-center">
//               <div className="relative w-36 h-36">
//                 <motion.div className="absolute -inset-8 rounded-full border border-white/10 border-dashed" animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} />
//                 <motion.div className="absolute -inset-3 rounded-full border-2 border-transparent border-t-[#E60012] border-r-[#E60012]/40" animate={{ rotate: -360 }} transition={{ duration: 7, repeat: Infinity, ease: 'linear' }} />
//                 <motion.div className="absolute -inset-3 rounded-full border border-[#E60012]/40" animate={{ scale: [1, 1.5], opacity: [0.6, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }} />
//                 <div className="w-full h-full rounded-full bg-[#06080C] border border-[#E60012]/40 p-2 shadow-[0_0_60px_rgba(230,0,18,0.35)]">
//                   <img src={IMG.logo} alt="KZ" className="w-full h-full object-cover rounded-full" />
//                 </div>
//               </div>
//               <p className="mt-12 text-[9px] tracking-[0.3em] text-center text-white/50 uppercase leading-loose">Different Roads<br />Same Destination</p>
//             </motion.div>

//             {/* Cars */}
//             <motion.div {...inView} variants={fadeRight} id="cars" className="flex items-center gap-2 group">
//               <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, delay: 2.5, repeat: Infinity, ease: 'easeInOut' }} className="relative flex-1 aspect-[4/3]">
//                 <div className="absolute inset-[20%] bg-[#E60012]/20 blur-3xl rounded-full" />
//                 <Img src={IMG.car} alt="Car" className="relative w-full h-full object-cover brightness-[0.75] contrast-125 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_72%)] group-hover:scale-105 transition-transform duration-700" />
//                 <div className="absolute bottom-[12%] left-[15%] right-[15%] h-4 bg-black/70 blur-xl rounded-full" />
//               </motion.div>
//               <div className="flex-shrink-0 w-[40%] z-10">
//                 <h3 className="text-2xl md:text-3xl font-bold tracking-wide mb-2">CARS</h3>
//                 <motion.span initial={{ width: 0 }} whileInView={{ width: 32 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.6 }} className="block h-[2px] bg-[#E60012] mb-5" />
//                 <p className="text-xs text-white/70 mb-6 leading-relaxed">Elegance on roads.<br />Power in every drive.</p>
//                 <a href="#cars" className="group/l flex items-center gap-3 text-[11px] hover:text-[#E60012] transition-colors">
//                   <span className="group"><CircleArrow /></span> Explore Cars <ArrowRight className="w-3 h-3 group-hover/l:translate-x-1 transition-transform" />
//                 </a>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* ============ CATEGORIES ============ */}
//       <section id="categories" className="py-24 md:py-28 px-6 md:px-12 lg:px-20 bg-[#070A0F] border-t border-white/5">
//         <div className="max-w-[1400px] mx-auto">
//           <motion.div {...inView} variants={stagger} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
//             <div className="lg:col-span-6">
//               <Label num="04">Two Categories</Label>
//               <Reveal className="text-4xl md:text-5xl font-light tracking-tight leading-[1.1]" lines={['Find Exactly', 'What You Need.']} />
//             </div>
//             <motion.p variants={fadeUp} className="lg:col-span-4 text-sm text-white/65 leading-relaxed">
//               From performance bikes and luxury cars to genuine parts and premium accessories — KhanZ Motors has everything an automotive enthusiast needs.
//             </motion.p>
//             <motion.div variants={fadeUp} className="lg:col-span-2 flex lg:justify-end gap-3">
//               {[-1, 1].map((d) => (
//                 <motion.button key={d} whileTap={{ scale: 0.85 }} onClick={() => scrollCats(d)} className="w-10 h-10 rounded-full border border-white/20 hover:border-[#E60012] hover:bg-[#E60012] flex items-center justify-center transition-colors">
//                   {d < 0 ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
//                 </motion.button>
//               ))}
//             </motion.div>
//           </motion.div>

//           <div ref={trackRef} className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
//             {categories.map((cat, i) => {
//               const Icon = cat.icon;
//               return (
//                 <TiltCard
//                   key={cat.id} id={cat.id}
//                   initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.12, ease: EASE }}
//                   className="group snap-start flex-shrink-0 w-[85%] sm:w-[48%] xl:w-[calc(25%-15px)] bg-[#0B0E15] border border-white/10 hover:border-[#E60012]/60 rounded-md overflow-hidden cursor-pointer transition-colors hover:shadow-[0_20px_50px_-20px_rgba(230,0,18,0.5)]"
//                 >
//                   <div className="aspect-[4/3] relative overflow-hidden">
//                     <Img src={cat.img} alt={cat.title} className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
//                     <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E15] via-[#0B0E15]/10 to-transparent" />
//                     <div className="absolute inset-x-0 bottom-0 h-[2px] bg-[#E60012] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
//                   </div>
//                   <div className="px-5 pb-5 -mt-6 relative">
//                     <Icon className="w-6 h-6 mb-3 text-white group-hover:text-[#E60012] group-hover:-translate-y-1 transition-all" strokeWidth={1.5} />
//                     <div className="flex items-end justify-between">
//                       <div>
//                         <h4 className="text-lg font-medium mb-1">{cat.title}</h4>
//                         <p className="text-[11px] text-white/55">{cat.desc}</p>
//                       </div>
//                       <CircleArrow />
//                     </div>
//                   </div>
//                 </TiltCard>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* ============ SERVICES ============ */}
//       <section className="py-24 md:py-28 px-6 md:px-12 lg:px-20 border-t border-white/5 bg-[#05070B]">
//         <div className="max-w-[1400px] mx-auto">
//           <motion.div {...inView} variants={stagger} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
//             <div className="lg:col-span-6">
//               <Label num="05">Our Categories</Label>
//               <Reveal className="text-4xl md:text-5xl font-light tracking-tight leading-[1.1]" lines={['Built for', 'Every Enthusiast.']} />
//             </div>
//             <motion.p variants={fadeUp} className="lg:col-span-4 text-sm text-white/65 leading-relaxed">
//               We offer complete solutions to make your buying, selling and ownership journey smooth, safe and rewarding.
//             </motion.p>
//           </motion.div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
//             {services.map((s, i) => {
//               const Icon = s.icon;
//               return (
//                 <TiltCard
//                   key={s.title}
//                   initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
//                   className="group relative p-7 border border-white/10 bg-[#0A0D13] hover:border-[#E60012]/60 rounded-md transition-colors overflow-hidden"
//                 >
//                   <div className="absolute -top-16 -right-16 w-32 h-32 bg-[#E60012]/0 group-hover:bg-[#E60012]/20 blur-2xl rounded-full transition-all duration-500" />
//                   <motion.div initial={{ scale: 0, rotate: -45 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 180, damping: 12, delay: 0.3 + i * 0.1 }}>
//                     <Icon className="w-10 h-10 mb-7 text-[#E60012] group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500" strokeWidth={1.3} style={{ filter: 'drop-shadow(0 0 8px rgba(230,0,18,0.6))' }} />
//                   </motion.div>
//                   <h4 className="text-[15px] font-medium mb-3">{s.title}</h4>
//                   <p className="text-xs text-white/55 leading-relaxed">{s.desc}</p>
//                   <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#E60012] group-hover:w-full transition-all duration-500" />
//                 </TiltCard>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* ============ VISION — animated winding road ============ */}
//       <section className="relative min-h-[640px] py-24 px-6 md:px-12 lg:px-20 overflow-hidden border-t border-white/5 bg-[#04060A]">
//         <div className="absolute inset-y-0 right-0 w-full lg:w-[66%] z-0 opacity-40 lg:opacity-100">
//           <svg viewBox="0 0 900 620" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
//             <defs>
//               <filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
//               <radialGradient id="fog" cx="60%" cy="45%" r="60%"><stop offset="0" stopColor="#1a1f2a" /><stop offset="1" stopColor="#04060A" /></radialGradient>
//             </defs>
//             <rect width="900" height="620" fill="url(#fog)" />
//             {/* terrain contours */}
//             {[-120, -60, 60, 120, 180].map((o, i) => (
//               <path key={i} d={road} transform={`translate(${o},${o * 0.15})`} fill="none" stroke="rgba(255,255,255,0.035)" strokeWidth="1" />
//             ))}
//             {/* road */}
//             <motion.path d={road} fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="66"
//               initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2.5, ease: 'easeInOut' }} />
//             <motion.path d={road} fill="none" stroke="#0c0f15" strokeWidth="62"
//               initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2.5, ease: 'easeInOut' }} />
//             <motion.path d={road} fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2" strokeDasharray="16 18"
//               animate={{ strokeDashoffset: [0, -68] }} transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }} />
//             {/* cars on the road */}
//             {[
//               { dur: '9s', begin: '0s', rev: false, off: -14 },
//               { dur: '11s', begin: '3s', rev: true, off: 14 },
//               { dur: '9s', begin: '5s', rev: false, off: -14 },
//             ].map((c, i) => (
//               <g key={i} filter="url(#glow)">
//                 <g transform={`translate(0,${c.off})`}>
//                   <rect x="-11" y="-5.5" width="22" height="11" rx="3" fill="#1b1f28" stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" />
//                   <circle cx={c.rev ? -11 : 11} cy="-3.5" r="1.6" fill="#fff" />
//                   <circle cx={c.rev ? -11 : 11} cy="3.5" r="1.6" fill="#fff" />
//                   <circle cx={c.rev ? 11 : -11} cy="-3.5" r="1.8" fill={RED} />
//                   <circle cx={c.rev ? 11 : -11} cy="3.5" r="1.8" fill={RED} />
//                 </g>
//                 <animateMotion dur={c.dur} begin={c.begin} repeatCount="indefinite" rotate="auto" path={road}
//                   {...(c.rev ? { keyPoints: '1;0', keyTimes: '0;1', calcMode: 'linear' } : {})} />
//               </g>
//             ))}
//             {/* callouts */}
//             {[
//               { x: 600, y: 140, lx: 740, ly: 90, t: 'BETTER VEHICLES', d: 'More choices. Higher standards.' },
//               { x: 610, y: 300, lx: 720, ly: 270, t: 'STRONGER COMMUNITY', d: 'Enthusiasts helping enthusiasts.' },
//               { x: 400, y: 485, lx: 250, ly: 540, t: 'BRIGHTER ROADS', d: 'A more connected tomorrow.' },
//             ].map((c, i) => (
//               <motion.g key={c.t} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 1.6 + i * 0.35 }}>
//                 <motion.line x1={c.x} y1={c.y} x2={c.lx} y2={c.ly} stroke="rgba(255,255,255,0.4)" strokeWidth="1"
//                   initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 1.7 + i * 0.35 }} />
//                 <circle cx={c.x} cy={c.y} r="5" fill={RED} filter="url(#glow)" />
//                 <circle cx={c.x} cy={c.y} r="5" fill="none" stroke={RED}>
//                   <animate attributeName="r" values="5;16" dur="1.8s" repeatCount="indefinite" />
//                   <animate attributeName="opacity" values="0.9;0" dur="1.8s" repeatCount="indefinite" />
//                 </circle>
//                 <circle cx={c.lx} cy={c.ly} r="2.5" fill={RED} />
//                 <text x={c.lx + 10} y={c.ly + 4} fill="#fff" fontSize="10" fontWeight="600" letterSpacing="1.5">{c.t}</text>
//                 <text x={c.lx + 10} y={c.ly + 18} fill="rgba(255,255,255,0.55)" fontSize="9">{c.d}</text>
//               </motion.g>
//             ))}
//           </svg>
//           <div className="absolute inset-0 bg-gradient-to-r from-[#04060A] via-transparent to-transparent pointer-events-none" />
//           <div className="absolute inset-0 bg-gradient-to-t from-[#04060A] via-transparent to-[#04060A]/70 pointer-events-none" />
//         </div>

//         <div className="max-w-[1400px] mx-auto relative z-10">
//           <motion.div {...inView} variants={stagger} className="max-w-md">
//             <Label num="06">Driven By A<br />Bigger Vision</Label>
//             <Reveal className="text-5xl md:text-6xl font-light tracking-tight leading-[1.05] mb-8" lines={['People.', 'Performance.', <span className="text-[#E60012] font-semibold">Possibilities.</span>]} />
//             <motion.p variants={fadeUp} className="text-sm text-white/70 leading-relaxed mb-10">
//               KhanZ Motors is more than a marketplace — it's a growing community of riders, drivers and dreamers. We connect people, vehicles and opportunities through a shared love for the road.
//             </motion.p>
//             <motion.div variants={fadeUp}><OutlineBtn href="#about">Our Journey</OutlineBtn></motion.div>
//           </motion.div>
//         </div>
//       </section>

//       {/* ============ CTA ============ */}
//       <section id="contact" className="relative min-h-[580px] py-24 px-6 md:px-12 lg:px-20 border-t border-white/5 overflow-hidden flex items-center bg-[#05070B]">
//         <motion.div initial={{ scale: 1.2 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 2.2, ease: EASE }} className="absolute inset-0 z-0">
//           <Img src={IMG.cta} alt="Drive your dreams" className="w-full h-full object-cover opacity-55" />
//           <div className="absolute inset-0 bg-gradient-to-r from-[#05070B] via-[#05070B]/75 to-[#05070B]/10" />
//           <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-transparent to-[#05070B]/40" />
//         </motion.div>

//         {/* City skyline with blinking windows */}
//         <svg className="absolute bottom-0 right-0 w-full lg:w-[60%] h-[45%] z-[1] pointer-events-none" viewBox="0 0 600 200" preserveAspectRatio="xMaxYMax slice">
//           {Array.from({ length: 22 }, (_, i) => {
//             const w = 18 + ((i * 7) % 16);
//             const h = 50 + ((i * 41) % 120);
//             const x = i * 28;
//             return (
//               <g key={i}>
//                 <rect x={x} y={200 - h} width={w} height={h} fill="#0a0d13" opacity="0.9" />
//                 {[0, 1, 2].map((k) => (
//                   <rect key={k} x={x + 4 + (k % 2) * 7} y={200 - h + 10 + k * 18} width="3" height="3" fill={k === 1 ? RED : '#ffb38a'}>
//                     <animate attributeName="opacity" values="0.1;0.9;0.1" dur={`${2 + ((i + k) % 5)}s`} repeatCount="indefinite" begin={`${(i * 0.3) % 3}s`} />
//                   </rect>
//                 ))}
//               </g>
//             );
//           })}
//         </svg>
//         <motion.div className="absolute bottom-0 right-[20%] w-[500px] h-[220px] bg-[#E60012]/25 blur-[100px] z-[1]" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 4, repeat: Infinity }} />
//         {/* passing light trails */}
//         <div className="absolute bottom-[8%] inset-x-0 h-10 z-[2] pointer-events-none">
//           {[0, 1].map((i) => (
//             <motion.span key={i} className="absolute h-[2px] w-56 rounded-full bg-gradient-to-r from-transparent via-[#E60012] to-transparent" style={{ top: i * 14 }}
//               animate={{ x: ['110vw', '-30vw'] }} transition={{ duration: 3 + i, repeat: Infinity, delay: i * 1.4, ease: 'easeIn' }} />
//           ))}
//         </div>

//         <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.5 }} className="absolute top-14 right-6 md:right-12 lg:right-20 z-10 hidden md:flex gap-3">
//           <span className="w-[1px] bg-[#E60012]" />
//           <p className="text-[10px] tracking-[0.2em] uppercase text-white/70 leading-loose">Same<br />Passion<br />Higher<br />Destinations</p>
//         </motion.div>

//         <div className="max-w-[1400px] w-full mx-auto relative z-10">
//           <motion.div {...inView} variants={stagger} className="max-w-xl">
//             <Label num="07">Ready To Ride?</Label>
//             <Reveal className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6" lines={[<>Drive Your <span className="text-[#E60012] drop-shadow-[0_0_25px_rgba(230,0,18,0.45)]">Dreams.</span></>]} />
//             <motion.p variants={fadeUp} className="text-sm text-white/75 max-w-md mb-10 leading-relaxed">
//               Explore our latest cars, heavy bikes, parts and accessories. Join thousands of enthusiasts who trust KhanZ Motors.
//             </motion.p>
//             <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
//               <RedBtn href="#categories">Browse All Vehicles</RedBtn>
//               <OutlineBtn href="#contact" arrow={false}>Contact Us</OutlineBtn>
//             </motion.div>
//           </motion.div>
//         </div>
//       </section>

//       {/* ============ FOOTER ============ */}
//       <footer className="relative bg-[#04060A] border-t border-white/10 pt-16 pb-8 px-6 md:px-12 lg:px-20 overflow-hidden">
//         <div className="absolute top-[110px] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
//         {['12%', '30%', '68%', '86%'].map((l, i) => (
//           <span key={l} className="absolute top-[107px] w-1.5 h-1.5 rounded-full bg-[#E60012] shadow-[0_0_14px_#E60012] animate-pulse" style={{ left: l, animationDelay: `${i * 0.5}s` }} />
//         ))}
//         <motion.span className="absolute top-[109px] h-[2px] w-32 bg-gradient-to-r from-transparent via-[#E60012] to-transparent" animate={{ left: ['-10%', '110%'] }} transition={{ duration: 5, repeat: Infinity, ease: 'linear' }} />
//         <span className="absolute top-10 left-6 md:left-12 lg:left-20 text-[10px] tracking-[0.3em] text-white/30">07</span>
//         <div className="absolute top-12 right-6 md:right-12 lg:right-20 hidden md:flex gap-3">
//           <span className="w-[1px] bg-[#E60012]" />
//           <p className="text-[9px] tracking-[0.2em] uppercase text-white/50 leading-loose">Drive<br />Your<br />Dreams</p>
//         </div>

//         <div className="max-w-[1400px] mx-auto relative z-10">
//           <motion.div {...inView} variants={stagger} className="flex flex-col items-center mb-12">
//             <motion.div variants={fadeUp} whileHover={{ rotate: 360, scale: 1.05 }} transition={{ duration: 0.8 }} className="w-20 h-20 rounded-full border-2 border-white/80 overflow-hidden mb-4 shadow-[0_0_40px_rgba(230,0,18,0.35)] bg-[#04060A]">
//               <img src={IMG.logo} alt="KhanZ Motors" className="w-full h-full object-cover" />
//             </motion.div>
//             <motion.h2 variants={fadeUp} className="text-xl font-bold tracking-[0.15em] uppercase">KhanZ <span className="font-light">Motors</span></motion.h2>
//             <motion.div variants={fadeUp} className="flex items-center gap-3 mt-2">
//               <span className="w-6 h-[1px] bg-[#E60012]" />
//               <p className="text-[9px] tracking-[0.3em] text-white/60 uppercase">Drive Your Dreams</p>
//               <span className="w-6 h-[1px] bg-[#E60012]" />
//             </motion.div>
//             <motion.div variants={fadeUp} className="flex gap-3 mt-6">
//               {Object.entries(Social).map(([k, icon]) => (
//                 <motion.a key={k} href="#" aria-label={k} whileHover={{ y: -4, scale: 1.1 }} className="w-8 h-8 rounded-full border border-white/20 hover:border-[#E60012] hover:bg-[#E60012] flex items-center justify-center transition-colors">
//                   <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">{icon}</svg>
//                 </motion.a>
//               ))}
//             </motion.div>
//           </motion.div>

//           <div className="flex flex-col md:flex-row justify-between gap-6 text-[11px] text-white/55 mb-8">
//             <div className="flex flex-wrap gap-6">
//               {footerLinks.map(([l, h]) => (
//                 <a key={l} href={h} className="relative hover:text-white transition-colors group">
//                   {l}<span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-[#E60012] group-hover:w-full transition-all duration-300" />
//                 </a>
//               ))}
//             </div>
//             <div className="flex flex-wrap gap-4 items-center">
//               {['Cars', 'Bikes', 'Parts', 'Accessories'].map((l, i) => (
//                 <React.Fragment key={l}>
//                   {i > 0 && <span className="w-[1px] h-3 bg-white/20" />}
//                   <a href="#categories" className="hover:text-white transition-colors">{l}</a>
//                 </React.Fragment>
//               ))}
//             </div>
//           </div>

//           <div className="w-full h-[1px] bg-white/5 mb-6" />
//           <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-white/40">
//             <p>© {new Date().getFullYear()} KhanZ Motors. All rights reserved.</p>
//             <div className="flex items-center gap-4">
//               <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
//               <span className="w-[1px] h-3 bg-white/20" />
//               <a href="#" className="hover:text-white transition-colors">Terms</a>
//               <span className="w-[1px] h-3 bg-white/20" />
//               <a href="#" className="hover:text-white transition-colors">Sitemap</a>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default KhanzMotors;


import React, { useEffect, useRef, useState } from 'react';
import {
  motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring, useInView, animate,
} from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ChevronRight, ChevronLeft, Play, ArrowRight, ShieldCheck, Settings, Tag,
  HardHat, Handshake, Bike, Car, ShoppingBag,
} from 'lucide-react';
import { BIKE_IMG, CAR_IMG } from './khanzVehicles';

/* ------------------------------------------------------------------
   IMAGES — apni images /public/khanmotors/ me rakh do (same naam se).
   Local image na mili to fallback load hogi.
------------------------------------------------------------------- */
const IMG = {
  logo: '/khanmotors/khanz-logo.jpeg',
  heroVideo: '/khanmotors/khanz-motors.mp4',
  bike: BIKE_IMG, // section 03 — khanzVehicles.js se (embedded)
  car: CAR_IMG, // section 03 — khanzVehicles.js se (embedded)
  catBike: ['/khanmotors/cat-bike.jpg', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=700&q=80'],
  catCar: ['/khanmotors/cat-car.jpg', 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=700&q=80'],
  catParts: ['/khanmotors/cat-parts.jpg', 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=700&q=80'],
  catAcc: ['/khanmotors/cat-accessories.jpg', 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=700&q=80'],
  cta: ['/khanmotors/cta-rider.jpg', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1800&q=80'],
};

const RED = '#E60012';
const EASE = [0.16, 1, 0.3, 1];

/* ===================== HELPERS ===================== */

const Img = ({ src, alt = '', className = '' }) => {
  const list = Array.isArray(src) ? src : [src];
  const [i, setI] = useState(0);
  const [dead, setDead] = useState(false);
  if (dead) return <div className={`${className} bg-gradient-to-br from-[#10141c] to-[#05070a]`} />;
  return <img src={list[i]} alt={alt} className={className} onError={() => (i < list.length - 1 ? setI(i + 1) : setDead(true))} />;
};

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } };
const fadeRight = { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 1, ease: EASE } } };
const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } };
const inView = { initial: 'hidden', whileInView: 'visible', viewport: { once: true, margin: '-10%' } };

/* Line-by-line masked text reveal */
const Reveal = ({ lines, className = '', delay = 0, as: Tag = 'h2', onLoad }) => (
  <Tag className={className}>
    {lines.map((l, i) => (
      <span key={i} className="block overflow-hidden pb-[0.08em]">
        <motion.span
          className="block"
          initial={{ y: '110%', rotate: 2 }}
          {...(onLoad ? { animate: { y: 0, rotate: 0 } } : { whileInView: { y: 0, rotate: 0 }, viewport: { once: true } })}
          transition={{ duration: 1.1, ease: EASE, delay: delay + i * 0.13 }}
        >
          {l}
        </motion.span>
      </span>
    ))}
  </Tag>
);

/* Section label: number + text */
const Label = ({ num, children }) => (
  <motion.div variants={fadeUp} className="mb-6">
    <span className="block text-[10px] tracking-[0.3em] text-white/40 mb-1">{num}</span>
    <span className="flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-white/60 leading-relaxed">
      {children}
    </span>
  </motion.div>
);

/* Counting number */
const Counter = ({ to, suffix = '' }) => {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!seen) return;
    const c = animate(0, to, { duration: 1.8, ease: EASE, onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [seen, to]);
  return <span ref={ref}>{v}{suffix}</span>;
};

/* 3D tilt card */
const TiltCard = ({ children, className = '', ...rest }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });
  return (
    <motion.div
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

/* Magnetic wrapper for buttons */
const Magnetic = ({ children, className = '' }) => {
  const x = useSpring(0, { stiffness: 250, damping: 15 });
  const y = useSpring(0, { stiffness: 250, damping: 15 });
  return (
    <motion.div
      style={{ x, y }}
      className={`inline-block ${className}`}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.25);
        y.set((e.clientY - r.top - r.height / 2) * 0.35);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
};

/* Red primary button with shine sweep */
const RedBtn = ({ href, children }) => (
  <Magnetic>
    <a href={href} className="group relative overflow-hidden bg-[#E60012] hover:bg-[#ff1e27] text-white px-7 py-3.5 text-[13px] font-medium transition-colors rounded-sm flex items-center gap-3 shadow-[0_10px_30px_-8px_rgba(230,0,18,0.9)]">
      <motion.span
        className="absolute inset-y-0 -left-1/2 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg]"
        animate={{ x: ['0%', '500%'] }} transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 2.5, ease: 'easeInOut' }}
      />
      <span className="relative flex items-center gap-3">{children}<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
    </a>
  </Magnetic>
);

const OutlineBtn = ({ href, children, arrow = true }) => (
  <Magnetic>
    <a href={href} className="group relative overflow-hidden border border-[#E60012] text-white px-7 py-3.5 text-[13px] font-medium rounded-sm flex items-center gap-3">
      <span className="absolute inset-0 bg-[#E60012] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
      <span className="relative flex items-center gap-3">
        {children}
        {arrow && <ArrowRight className="w-3.5 h-3.5 text-[#E60012] group-hover:text-white group-hover:translate-x-1 transition-all" />}
      </span>
    </a>
  </Magnetic>
);

const CircleArrow = ({ left }) => (
  <span className="relative w-9 h-9 rounded-full border border-[#E60012]/70 flex items-center justify-center text-white group-hover:bg-[#E60012] group-hover:border-[#E60012] transition-all duration-300 group-hover:shadow-[0_0_18px_rgba(230,0,18,0.7)]">
    {left ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />}
  </span>
);

const Social = {
  fb: <path d="M14 8h3V4h-3c-2.8 0-4 1.8-4 4.3V10H7v4h3v8h4v-8h3l1-4h-4V8.6c0-.4.2-.6.6-.6z" fill="currentColor" />,
  ig: (<g fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="5" /><circle cx="12" cy="12" r="3.5" /><circle cx="17" cy="7" r=".8" fill="currentColor" /></g>),
  yt: (<g><rect x="3" y="6" width="18" height="12" rx="3.5" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M10.5 9.5v5l4-2.5z" fill="currentColor" /></g>),
  tt: <path d="M14 4c.4 2 1.7 3.4 4 3.6v3c-1.5 0-2.8-.4-4-1.2V15a5 5 0 1 1-5-5v3a2 2 0 1 0 2 2V4z" fill="currentColor" />,
};

/* Deterministic particles */
const PARTICLES = Array.from({ length: 26 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  top: `${(i * 53) % 100}%`,
  size: 1 + (i % 3),
  dur: 6 + (i % 5) * 1.6,
  delay: (i % 7) * 0.8,
}));

/* ===================== SECTION 03 — TWO WORLDS ===================== */
/* Design canvas 1440 x 600 — saari positions isi ke % mein hain */
const TW_WHITE = [
  'M330,60 C470,80 560,150 610,215 C660,280 700,300 760,330 C860,380 920,430 1010,445 C1120,462 1260,430 1440,420',
  'M0,330 C120,320 210,250 330,205',
  'M1440,70 C1250,60 1050,70 930,120 C860,150 820,180 790,200',
  'M560,340 C600,360 640,368 660,365',
];
const TW_RED = [
  'M440,420 C520,400 590,330 650,280',
  'M800,215 C870,170 940,120 1040,95 C1150,70 1300,80 1440,95',
];
const TW_DOTS = [[800, 150], [628, 318], [1120, 90], [470, 408], [1185, 452], [560, 110]];
const TW_WDOTS = [[990, 442], [350, 62], [960, 155]];

/* Vehicle cutout (soft-edged PNG). Image na mile to kuch nahi dikhega — oval nahi banega */
const TWVehicle = ({ src, alt }) => {
  const [ok, setOk] = useState(true);
  if (!ok) return null;
  return <img src={src} alt={alt} onError={() => setOk(false)} className="w-full h-full object-contain select-none pointer-events-none" draggable="false" />;
};

const TWText = ({ title, line1, line2, cta, href, hovered, delay = 0.5 }) => (
  <motion.div
    initial="h" whileInView="v" viewport={{ once: true, margin: '-10%' }}
    variants={{ h: {}, v: { transition: { staggerChildren: 0.12, delayChildren: delay } } }}
  >
    {[
      <h3 className="text-2xl font-bold tracking-[0.04em] mb-3.5 whitespace-nowrap">{title}</h3>,
      <motion.span animate={{ width: hovered ? 52 : 30 }} transition={{ duration: 0.4, ease: EASE }} className="block h-[2px] bg-[#E60012] mb-5" />,
      <p className="text-[13px] leading-[1.75] text-white/80 mb-7 whitespace-nowrap">{line1}<br />{line2}</p>,
      <a href={href} className="group/l inline-flex items-center gap-3.5 text-[12px] text-white/90 hover:text-white transition-colors whitespace-nowrap">
        <span className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${hovered ? 'bg-[#E60012] border-[#E60012] shadow-[0_0_18px_rgba(230,0,18,0.7)]' : 'border-[#E60012]/85'}`}>
          <ChevronRight className="w-4 h-4" />
        </span>
        {cta}
        <ArrowRight className="w-3.5 h-3.5 group-hover/l:translate-x-1 transition-transform" />
      </a>,
    ].map((el, k) => (
      <motion.div key={k} variants={{ h: { opacity: 0, y: 20 }, v: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }}>{el}</motion.div>
    ))}
  </motion.div>
);

/* KZ emblem with rings */
const TWEmblem = () => (
  <motion.div
    initial={{ scale: 0.4, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }}
    transition={{ duration: 1.1, delay: 0.5, ease: EASE }}
    className="relative w-[120px] h-[120px]"
  >
    <div className="absolute -inset-16 bg-[#E60012]/15 blur-3xl rounded-full" />
    {/* rings */}
    <div className="absolute -inset-[68px] rounded-full border border-white/[0.06]" />
    <motion.div className="absolute -inset-[44px] rounded-full border border-dashed border-white/[0.1]" animate={{ rotate: 360 }} transition={{ duration: 45, repeat: Infinity, ease: 'linear' }} />
    <div className="absolute -inset-[24px] rounded-full border border-white/[0.12]" />
    {/* red arc on right side (gently swings) */}
    <motion.svg viewBox="0 0 168 168" className="absolute -inset-[24px] w-[168px] h-[168px] overflow-visible"
      animate={{ rotate: [-12, 12, -12] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
      <path d="M 143 39 A 84 84 0 0 1 143 129" fill="none" stroke={RED} strokeWidth="2.4" strokeLinecap="round" style={{ filter: `drop-shadow(0 0 5px ${RED})` }} />
    </motion.svg>
    {/* thin red arc on outer ring (rotates) */}
    <motion.svg viewBox="0 0 256 256" className="absolute -inset-[68px] w-[256px] h-[256px] overflow-visible"
      animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
      <path d="M 58 25 A 128 128 0 0 1 128 0" fill="none" stroke={RED} strokeOpacity="0.6" strokeWidth="1" />
    </motion.svg>
    {/* ripple */}
    <motion.div className="absolute -inset-1 rounded-full border border-[#E60012]/50" animate={{ scale: [1, 1.7], opacity: [0.6, 0] }} transition={{ duration: 2.8, repeat: Infinity, ease: 'easeOut' }} />
    <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.9, ease: EASE }} className="relative w-full h-full rounded-full overflow-hidden shadow-[0_0_50px_rgba(230,0,18,0.35)]">
      <img src={IMG.logo} alt="KhanZ Motors" className="w-full h-full object-cover" />
    </motion.div>
  </motion.div>
);

const TwoWorlds = () => {
  const [hover, setHover] = useState(null);
  const bikeOn = hover === 'bike';
  const carOn = hover === 'car';

  return (
    <section className="relative border-t border-white/5 overflow-hidden"
      style={{ background: 'radial-gradient(ellipse 45% 60% at 50% 45%, rgba(38,46,64,.45), transparent 70%), radial-gradient(ellipse 30% 40% at 85% 40%, rgba(30,36,52,.5), transparent 70%), linear-gradient(#070a12,#05070c)' }}>

      {/* ================= DESKTOP (md+) — exact design canvas ================= */}
      <div className="relative hidden md:block max-w-[1440px] h-[600px] mx-auto">
        {/* curves */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1440 600" preserveAspectRatio="none">
          <defs>
            <filter id="tw-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          {TW_WHITE.map((d, i) => (
            <motion.path key={`w${i}`} d={d} fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
              transition={{ duration: 2.4, delay: 0.2 + i * 0.15, ease: 'easeInOut' }} />
          ))}
          {TW_RED.map((d, i) => (
            <g key={`r${i}`}>
              <motion.path d={d} fill="none" stroke={RED} strokeWidth="1.4" strokeOpacity="0.85" filter="url(#tw-glow)"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                transition={{ duration: 2, delay: 0.7 + i * 0.3, ease: 'easeInOut' }} />
              <circle r="3" fill="#ff4050" filter="url(#tw-glow)">
                <animateMotion dur={`${4.5 + i}s`} begin={`${1.5 + i}s`} repeatCount="indefinite" path={d} />
              </circle>
            </g>
          ))}
          {TW_WHITE.slice(0, 1).map((d, i) => (
            <circle key={`wm${i}`} r="2" fill="#fff" opacity="0.85">
              <animateMotion dur="10s" begin="2s" repeatCount="indefinite" path={d} />
            </circle>
          ))}
          {TW_DOTS.map(([x, y], i) => (
            <circle key={`d${i}`} cx={x} cy={y} r={i < 2 ? 3.5 : 2.8} fill={RED} filter="url(#tw-glow)">
              <animate attributeName="opacity" values="0.35;1;0.35" dur={`${2 + (i % 3) * 0.7}s`} repeatCount="indefinite" />
            </circle>
          ))}
          {TW_WDOTS.map(([x, y], i) => (
            <circle key={`wd${i}`} cx={x} cy={y} r="2" fill="#fff">
              <animate attributeName="opacity" values="0.3;1;0.3" dur={`${2.5 + i * 0.6}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </svg>

        {/* floor glows */}
        <motion.div animate={{ opacity: bikeOn ? 1 : 0.65, scaleX: bikeOn ? 1.2 : 1 }} transition={{ duration: 0.6 }}
          className="absolute rounded-full blur-[28px] bg-[#E60012]/35" style={{ left: '21.5%', top: '71.7%', width: '15%', height: 40 }} />
        <motion.div animate={{ opacity: carOn ? 1 : 0.65, scaleX: carOn ? 1.2 : 1 }} transition={{ duration: 0.6 }}
          className="absolute rounded-full blur-[28px] bg-[#E60012]/30" style={{ left: '59.5%', top: '73.3%', width: '21%', height: 36 }} />

        {/* BIKE */}
        <motion.div
          initial={{ x: -160, opacity: 0, filter: 'blur(14px)' }}
          whileInView={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.15 }}
          className="absolute" style={{ left: '20%', top: '18%', width: '18%', height: '64%' }}
          onMouseEnter={() => setHover('bike')} onMouseLeave={() => setHover(null)}
        >
          <motion.div
            className="relative w-full h-full"
            animate={bikeOn ? { y: -8, scale: 1.04 } : { y: [0, -6, 0], scale: 1 }}
            transition={bikeOn ? { duration: 0.5, ease: EASE } : { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <TWVehicle src={IMG.bike} alt="Heavy Bike" />
            {/* headlight flare */}
            <motion.span className="absolute w-4 h-4 -ml-2 -mt-2 rounded-full bg-[#ff2a3a] blur-[6px]"
              style={{ left: '53%', top: '34%' }}
              animate={{ opacity: [0.25, 0.9, 0.25], scale: [1, 1.8, 1] }} transition={{ duration: 2.4, repeat: Infinity }} />
          </motion.div>
        </motion.div>

        {/* CAR */}
        <motion.div
          initial={{ x: 160, opacity: 0, filter: 'blur(14px)' }}
          whileInView={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
          className="absolute" style={{ left: '57%', top: '27%', width: '26%', height: '55%' }}
          onMouseEnter={() => setHover('car')} onMouseLeave={() => setHover(null)}
        >
          <motion.div
            className="relative w-full h-full"
            animate={carOn ? { y: -8, scale: 1.04 } : { y: [0, -5, 0], scale: 1 }}
            transition={carOn ? { duration: 0.5, ease: EASE } : { duration: 4.5, delay: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <TWVehicle src={IMG.car} alt="Car" />
            {/* tail light glow */}
            <motion.span className="absolute h-2 -mt-1 rounded-full bg-[#E60012] blur-[7px]"
              style={{ left: '66%', top: '31%', width: '16%' }}
              animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />
          </motion.div>
        </motion.div>

        {/* label */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="absolute text-[10px] tracking-[0.3em] uppercase leading-[1.9]" style={{ left: '6.67%', top: '9.3%' }}>
          <span className="block text-white/40">03</span>
          <span className="block text-white/70">Two Worlds<br />One Passion</span>
        </motion.div>

        {/* bike text (over bike) */}
        <div className="absolute z-10" style={{ left: '6.67%', top: '31.3%' }}
          onMouseEnter={() => setHover('bike')} onMouseLeave={() => setHover(null)}>
          <TWText title="HEAVY BIKES" line1="Feel the power." line2="Live the freedom." cta="Explore Bikes" href="#bikes" hovered={bikeOn} />
        </div>

        {/* center */}
        <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: '50%', top: '41.7%' }}>
          <TWEmblem />
        </div>
        <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute -translate-x-1/2 text-center text-[10px] tracking-[0.36em] text-white/60 leading-[2.1] whitespace-nowrap uppercase"
          style={{ left: '50%', top: '63%' }}>
          Different Roads<br />Same Destination
        </motion.p>

        {/* car text */}
        <div className="absolute z-10" style={{ left: '86%', top: '35.7%' }}
          onMouseEnter={() => setHover('car')} onMouseLeave={() => setHover(null)}>
          <TWText title="CARS" line1="Elegance on roads." line2="Power in every drive." cta="Explore Cars" href="#cars" hovered={carOn} delay={0.7} />
        </div>

        {/* anchors for nav links */}
        <span id="bikes" className="absolute top-0" />
        <span id="cars" className="absolute top-0" />
      </div>

      {/* ================= MOBILE (< md) ================= */}
      <div className="md:hidden px-6 py-16">
        <div className="text-[10px] tracking-[0.3em] uppercase leading-[1.9] mb-8">
          <span className="block text-white/40">03</span>
          <span className="block text-white/70">Two Worlds<br />One Passion</span>
        </div>
        <div className="relative h-[340px] mb-2">
          <div className="absolute left-[25%] w-[60%] h-full"><TWVehicle src={IMG.bike} alt="Heavy Bike" /></div>
          <div className="absolute left-0 top-[28%] z-10"><TWText title="HEAVY BIKES" line1="Feel the power." line2="Live the freedom." cta="Explore Bikes" href="#bikes" /></div>
        </div>
        <div className="flex flex-col items-center py-20">
          <TWEmblem />
          <p className="mt-20 text-center text-[10px] tracking-[0.36em] text-white/60 leading-[2.1] uppercase">Different Roads<br />Same Destination</p>
        </div>
        <div className="relative h-[280px]">
          <div className="absolute left-0 w-[80%] h-full"><TWVehicle src={IMG.car} alt="Car" /></div>
          <div className="absolute right-0 top-[22%] z-10"><TWText title="CARS" line1="Elegance on roads." line2="Power in every drive." cta="Explore Cars" href="#cars" /></div>
        </div>
      </div>
    </section>
  );
};

/* ===================== PAGE ===================== */

export const KhanzMotors = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  /* Hero mouse parallax */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });
  const partX = useTransform(smx, (v) => v * -25);
  const partY = useTransform(smy, (v) => v * -20);
  const glowX = useTransform(smx, (v) => v * 120);

  /* Hero slides */
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % 3), 5000);
    return () => clearInterval(t);
  }, []);
  const heroTaglines = [
    'Heavy bike sale & purchase, cars, parts and premium accessories — all in one destination.',
    'Verified heavy bikes and quality cars — inspected, trusted and ready to ride.',
    'Genuine parts and premium accessories to upgrade every ride and drive.',
  ];

  /* Categories carousel */
  const trackRef = useRef(null);
  const scrollCats = (dir) => {
    const el = trackRef.current;
    if (el) el.scrollBy({ left: dir * (el.clientWidth / 2), behavior: 'smooth' });
  };

  const categories = [
    { id: 'bikes-cat', title: 'Heavy Bikes', desc: 'Buy & Sell Premium Bikes', img: IMG.catBike, icon: Bike },
    { id: 'cars-cat', title: 'Cars', desc: 'Buy & Sell Quality Cars', img: IMG.catCar, icon: Car },
    { id: 'parts', title: 'Parts', desc: 'Genuine Automotive Parts', img: IMG.catParts, icon: Settings },
    { id: 'accessories', title: 'Accessories', desc: 'Premium Gear & Upgrades', img: IMG.catAcc, icon: ShoppingBag },
  ];

  const services = [
    { title: 'Buy & Sell', desc: 'Easy and secure buying and selling process.', icon: Tag },
    { title: 'Genuine Parts', desc: 'Authentic parts for reliable performance.', icon: Settings },
    { title: 'Premium Accessories', desc: 'Top brands to enhance your ride and drive.', icon: HardHat },
    { title: 'Vehicle Inspection', desc: 'Verified vehicles for your peace of mind.', icon: ShieldCheck },
    { title: 'Trusted Deals', desc: 'A community built on trust and transparency.', icon: Handshake },
  ];

  const footerLinks = [['Home', '#home'], ['Cars', '#cars'], ['Heavy Bikes', '#bikes'], ['Parts', '#parts'], ['Accessories', '#accessories'], ['About', '#about'], ['Contact', '#contact']];

  /* Vision road */
  const road = 'M960,-30 C780,50 640,90 570,170 C480,270 660,330 530,420 C400,510 250,480 160,660';

  return (
    <div className="bg-[#05070B] min-h-screen font-sans text-[#F5F3EF] overflow-x-hidden selection:bg-[#E60012] selection:text-white">

      {/* Scroll progress */}
      <motion.div style={{ scaleX: progress }} className="fixed top-0 left-0 right-0 h-[2px] bg-[#E60012] origin-left z-[60] shadow-[0_0_10px_#E60012]" />

      {/* ============ LOGO ONLY ============ */}
      <motion.div
        initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, ease: EASE }}
        className="absolute top-0 left-0 z-50 px-6 md:px-12 lg:px-20 py-6"
      >
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.8, ease: EASE }} className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/80 group-hover:border-[#E60012] transition-colors shadow-[0_0_20px_rgba(230,0,18,0.25)]">
            <img src={IMG.logo} alt="KhanZ Motors" className="w-full h-full object-cover" />
          </motion.div>
          <div className="hidden sm:block">
            <span className="text-lg font-bold tracking-[0.12em] uppercase">KhanZ <span className="font-light">Motors</span></span>
            <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.6, ease: EASE }} className="block h-[2px] w-full origin-left bg-gradient-to-r from-[#E60012] via-[#E60012]/60 to-transparent mt-1" />
          </div>
        </Link>
      </motion.div>

      {/* ============ HERO ============ */}
      <section
        id="home"
        onMouseMove={(e) => { mx.set(e.clientX / window.innerWidth - 0.5); my.set(e.clientY / window.innerHeight - 0.5); }}
        className="relative h-screen min-h-[740px] w-full flex items-center px-6 md:px-12 lg:px-20 overflow-hidden"
      >
        <motion.div style={{ y: yBg }} className="absolute inset-0 z-0">
          <motion.video initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 2.5, ease: EASE }} src={IMG.heroVideo} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#05070B] via-[#05070B]/55 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-transparent to-[#05070B]/50" />
          <motion.div style={{ x: glowX }} className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-[#E60012]/15 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />
        </motion.div>

        {/* Floating particles */}
        <motion.div style={{ x: partX, y: partY }} className="absolute inset-0 z-[1] pointer-events-none">
          {PARTICLES.map((p, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full bg-[#E60012]"
              style={{ left: p.left, top: p.top, width: p.size, height: p.size, boxShadow: `0 0 ${p.size * 4}px ${RED}` }}
              animate={{ y: [0, -60, 0], opacity: [0, 0.9, 0] }}
              transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </motion.div>

        {/* Light streaks on the floor */}
        <div className="absolute bottom-[14%] right-0 w-[60%] h-24 z-[1] pointer-events-none hidden md:block">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="absolute h-[2px] w-40 bg-gradient-to-r from-transparent via-[#E60012] to-transparent rounded-full"
              style={{ top: i * 26, filter: 'blur(0.5px)' }}
              animate={{ x: ['120%', '-140%'], opacity: [0, 1, 0] }}
              transition={{ duration: 2.4 + i * 0.6, repeat: Infinity, delay: i * 0.9, ease: 'easeIn' }}
            />
          ))}
        </div>


        {/* Right vertical category list */}
        <motion.ul
          initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.8 } } }}
          className="absolute right-6 md:right-12 lg:right-20 top-[22%] hidden md:flex flex-col items-end gap-6 text-[10px] tracking-[0.2em] uppercase text-white/70 z-10"
        >
          {[['Cars', '#cars'], ['Heavy Bikes', '#bikes'], ['Parts', '#parts'], ['Accessories', '#accessories']].map(([c, h]) => (
            <motion.li key={c} variants={fadeRight}>
              <a href={h} className="flex items-center gap-3 group hover:text-white transition-colors">
                {c}<span className="w-6 h-[1px] bg-[#E60012] group-hover:w-12 transition-all duration-300" />
              </a>
            </motion.li>
          ))}
        </motion.ul>

        <div className="relative z-10 max-w-3xl mt-10">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="flex items-center gap-4 mb-6">
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="w-8 h-[2px] bg-[#E60012] origin-left" />
            <span className="text-[11px] tracking-[0.25em] uppercase text-white/70">Welcome to KhanZ Motors</span>
          </motion.div>

          <Reveal
            as="h1" onLoad delay={0.35}
            className="text-5xl md:text-7xl lg:text-[5.6rem] font-bold leading-[1.02] tracking-tight mb-6"
            lines={['Performance.', <span className="text-white/60">Precision.</span>, <span className="text-[#E60012] drop-shadow-[0_0_25px_rgba(230,0,18,0.45)]">Passion.</span>]}
          />

          <div className="h-14 mb-10 max-w-md">
            <AnimatePresence mode="wait">
              <motion.p
                key={slide}
                initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }} transition={{ duration: 0.6 }}
                className="text-sm md:text-base text-white/75 leading-relaxed"
              >
                {heroTaglines[slide]}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1 }} className="flex flex-wrap items-center gap-6">
            <RedBtn href="#categories">Explore Vehicles</RedBtn>
            <a href="#about" className="group flex items-center gap-4 text-[13px] text-white/80 hover:text-white transition-colors">
              <span className="relative w-11 h-11 rounded-full border border-white/30 flex items-center justify-center group-hover:border-[#E60012] transition-colors">
                <span className="absolute inset-0 rounded-full border border-[#E60012]/60 animate-ping opacity-40" />
                <Play className="w-3 h-3 ml-0.5 fill-current" />
              </span>
              Watch Our Story
            </a>
          </motion.div>
        </div>

        {/* Slide indicators */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} className="absolute bottom-12 left-6 md:left-12 lg:left-20 flex items-end gap-6 z-10">
          {['01', '02', '03'].map((n, i) => (
            <button key={n} onClick={() => setSlide(i)} className="text-left">
              <span className={`block text-[10px] tracking-[0.2em] mb-2 transition-colors ${slide === i ? 'text-white' : 'text-white/40'}`}>{n}</span>
              <span className="block w-20 h-[2px] bg-white/15 overflow-hidden">
                {slide === i && <motion.span key={`p${slide}`} className="block h-full bg-[#E60012] shadow-[0_0_8px_#E60012]" initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 5, ease: 'linear' }} />}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Scroll cue + side text */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-12 right-6 md:right-12 lg:right-20 hidden md:flex items-stretch gap-3 z-10">
          <span className="relative w-[1px] bg-white/20 overflow-hidden">
            <motion.span className="absolute left-0 w-full h-1/2 bg-[#E60012]" animate={{ y: ['-100%', '200%'] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} />
          </span>
          <p className="text-[9px] tracking-[0.2em] uppercase text-white/60 leading-loose">More<br />Than<br />Vehicles</p>
        </motion.div>
      </section>

      {/* ============ ABOUT ============ */}
      <section id="about" className="relative border-t border-white/5 bg-[#070A0F] overflow-hidden">
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <motion.div {...inView} variants={stagger} className="lg:col-span-4 px-6 md:px-12 lg:pl-20 py-20 lg:py-28">
            <Label num="02">About Us</Label>
            <Reveal className="text-4xl md:text-[3.4rem] font-light tracking-tight leading-[1.08]" lines={['More Than', 'Vehicles.']} />
            <motion.p variants={fadeUp} className="text-[#E60012] text-2xl md:text-[1.7rem] mt-3">A Community of Passion.</motion.p>
          </motion.div>

          <motion.div {...inView} variants={stagger} className="lg:col-span-4 px-6 md:px-12 lg:px-6 pb-16 lg:py-28 flex flex-col justify-center">
            <motion.p variants={fadeUp} className="text-sm text-white/70 leading-relaxed mb-10">
              KhanZ Motors is your trusted destination for buying and selling heavy bikes and cars, along with genuine parts and premium accessories. We bring together enthusiasts, buyers and sellers on one platform — with a focus on quality, trust and a better driving experience.
            </motion.p>
            <motion.div variants={fadeUp} className="grid grid-cols-3">
              <div className="pr-2">
                <p className="text-2xl font-semibold mb-1"><Counter to={4} suffix="+" /></p>
                <p className="text-[8px] tracking-[0.15em] uppercase text-white/50">Categories</p>
              </div>
              <div className="relative pl-4 pr-2">
                <motion.span initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }} className="absolute left-0 top-0 h-full w-[1px] bg-[#E60012] origin-top" />
                <p className="text-2xl font-semibold mb-1"><Counter to={100} suffix="%" /></p>
                <p className="text-[8px] tracking-[0.15em] uppercase text-white/50">Genuine Products</p>
              </div>
              <div className="relative pl-4">
                <motion.span initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.6 }} className="absolute left-0 top-0 h-full w-[1px] bg-[#E60012] origin-top" />
                <p className="text-lg font-semibold mb-1 mt-1">TRUSTED</p>
                <p className="text-[8px] tracking-[0.15em] uppercase text-white/50">By Enthusiasts</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div {...inView} variants={fadeRight} className="lg:col-span-4 relative min-h-[400px] overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#070A0F] via-[#070A0F]/50 to-[#070A0F]/20" />
            {/* scanning light */}
            <motion.div className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" animate={{ x: ['-100%', '500%'] }} transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }} />
            <div className="relative z-10 h-full flex items-center justify-center gap-8 px-6 py-12">
              <div className="relative flex flex-col items-center">
                <div className="absolute w-[300px] h-[300px] bg-[#E60012]/10 blur-[80px] rounded-full pointer-events-none" />
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ duration: 1.4, ease: EASE }}
                  className="relative w-[220px] h-[220px] pointer-events-none mb-4"
                >
                  <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
                    <circle cx="100" cy="100" r="96" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6" />
                    <circle cx="100" cy="100" r="84" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.6" strokeDasharray="2 4" />
                  </svg>
                  <motion.svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" animate={{ rotate: 360 }} transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}>
                    <circle cx="100" cy="100" r="96" fill="none" stroke={RED} strokeWidth="1.6" strokeDasharray="130 473" strokeLinecap="round" style={{ filter: `drop-shadow(0 0 6px ${RED})` }} />
                  </motion.svg>
                  <motion.svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" animate={{ rotate: -360 }} transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}>
                    <circle cx="100" cy="100" r="84" fill="none" stroke={RED} strokeOpacity="0.5" strokeWidth="0.8" strokeDasharray="40 488" strokeLinecap="round" />
                  </motion.svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span
                      animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 3, repeat: Infinity }}
                      className="text-[90px] font-black italic tracking-tighter leading-none text-transparent" style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.22)' }}
                    >KZ</motion.span>
                  </div>
                </motion.div>
                <h3 className="text-lg font-bold tracking-[0.15em] uppercase text-white/80 mb-0 whitespace-nowrap">KhanZ <span className="font-light">Motors</span></h3>
              </div>
              <motion.ul {...inView} variants={stagger} className="self-center shrink-0 border-l border-[#E60012] pl-3 text-[9px] tracking-[0.2em] uppercase text-white/60 space-y-2.5">
                {['Cars', 'Bikes', 'Parts', 'Accessories'].map((t) => <motion.li key={t} variants={fadeRight}>{t}</motion.li>)}
                <motion.li variants={fadeRight} className="text-white">All Together</motion.li>
              </motion.ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ TWO WORLDS ============ */}
      <TwoWorlds />

      {/* ============ CATEGORIES ============ */}
      <section id="categories" className="py-24 md:py-28 px-6 md:px-12 lg:px-20 bg-[#070A0F] border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...inView} variants={stagger} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
            <div className="lg:col-span-6">
              <Label num="04">Two Categories</Label>
              <Reveal className="text-4xl md:text-5xl font-light tracking-tight leading-[1.1]" lines={['Find Exactly', 'What You Need.']} />
            </div>
            <motion.p variants={fadeUp} className="lg:col-span-4 text-sm text-white/65 leading-relaxed">
              From performance bikes and luxury cars to genuine parts and premium accessories — KhanZ Motors has everything an automotive enthusiast needs.
            </motion.p>
            <motion.div variants={fadeUp} className="lg:col-span-2 flex lg:justify-end gap-3">
              {[-1, 1].map((d) => (
                <motion.button key={d} whileTap={{ scale: 0.85 }} onClick={() => scrollCats(d)} className="w-10 h-10 rounded-full border border-white/20 hover:border-[#E60012] hover:bg-[#E60012] flex items-center justify-center transition-colors">
                  {d < 0 ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>

          <div ref={trackRef} className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <TiltCard
                  key={cat.id} id={cat.id}
                  initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.12, ease: EASE }}
                  className="group snap-start flex-shrink-0 w-[85%] sm:w-[48%] xl:w-[calc(25%-15px)] bg-[#0B0E15] border border-white/10 hover:border-[#E60012]/60 rounded-md overflow-hidden cursor-pointer transition-colors hover:shadow-[0_20px_50px_-20px_rgba(230,0,18,0.5)]"
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Img src={cat.img} alt={cat.title} className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E15] via-[#0B0E15]/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 h-[2px] bg-[#E60012] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                  </div>
                  <div className="px-5 pb-5 -mt-6 relative">
                    <Icon className="w-6 h-6 mb-3 text-white group-hover:text-[#E60012] group-hover:-translate-y-1 transition-all" strokeWidth={1.5} />
                    <div className="flex items-end justify-between">
                      <div>
                        <h4 className="text-lg font-medium mb-1">{cat.title}</h4>
                        <p className="text-[11px] text-white/55">{cat.desc}</p>
                      </div>
                      <CircleArrow />
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ SERVICES ============ */}
      <section className="py-24 md:py-28 px-6 md:px-12 lg:px-20 border-t border-white/5 bg-[#05070B]">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...inView} variants={stagger} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
            <div className="lg:col-span-6">
              <Label num="05">Our Categories</Label>
              <Reveal className="text-4xl md:text-5xl font-light tracking-tight leading-[1.1]" lines={['Built for', 'Every Enthusiast.']} />
            </div>
            <motion.p variants={fadeUp} className="lg:col-span-4 text-sm text-white/65 leading-relaxed">
              We offer complete solutions to make your buying, selling and ownership journey smooth, safe and rewarding.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <TiltCard
                  key={s.title}
                  initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
                  className="group relative p-7 border border-white/10 bg-[#0A0D13] hover:border-[#E60012]/60 rounded-md transition-colors overflow-hidden"
                >
                  <div className="absolute -top-16 -right-16 w-32 h-32 bg-[#E60012]/0 group-hover:bg-[#E60012]/20 blur-2xl rounded-full transition-all duration-500" />
                  <motion.div initial={{ scale: 0, rotate: -45 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 180, damping: 12, delay: 0.3 + i * 0.1 }}>
                    <Icon className="w-10 h-10 mb-7 text-[#E60012] group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500" strokeWidth={1.3} style={{ filter: 'drop-shadow(0 0 8px rgba(230,0,18,0.6))' }} />
                  </motion.div>
                  <h4 className="text-[15px] font-medium mb-3">{s.title}</h4>
                  <p className="text-xs text-white/55 leading-relaxed">{s.desc}</p>
                  <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#E60012] group-hover:w-full transition-all duration-500" />
                </TiltCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ VISION — animated winding road ============ */}
      <section className="relative min-h-[640px] py-24 px-6 md:px-12 lg:px-20 overflow-hidden border-t border-white/5 bg-[#04060A]">
        <div className="absolute inset-y-0 right-0 w-full lg:w-[66%] z-0 opacity-40 lg:opacity-100">
          <svg viewBox="0 0 900 620" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
              <radialGradient id="fog" cx="60%" cy="45%" r="60%"><stop offset="0" stopColor="#1a1f2a" /><stop offset="1" stopColor="#04060A" /></radialGradient>
            </defs>
            <rect width="900" height="620" fill="url(#fog)" />
            {/* terrain contours */}
            {[-120, -60, 60, 120, 180].map((o, i) => (
              <path key={i} d={road} transform={`translate(${o},${o * 0.15})`} fill="none" stroke="rgba(255,255,255,0.035)" strokeWidth="1" />
            ))}
            {/* road */}
            <motion.path d={road} fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="66"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2.5, ease: 'easeInOut' }} />
            <motion.path d={road} fill="none" stroke="#0c0f15" strokeWidth="62"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2.5, ease: 'easeInOut' }} />
            <motion.path d={road} fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2" strokeDasharray="16 18"
              animate={{ strokeDashoffset: [0, -68] }} transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }} />
            {/* cars on the road */}
            {[
              { dur: '9s', begin: '0s', rev: false, off: -14 },
              { dur: '11s', begin: '3s', rev: true, off: 14 },
              { dur: '9s', begin: '5s', rev: false, off: -14 },
            ].map((c, i) => (
              <g key={i} filter="url(#glow)">
                <g transform={`translate(0,${c.off})`}>
                  <rect x="-11" y="-5.5" width="22" height="11" rx="3" fill="#1b1f28" stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" />
                  <circle cx={c.rev ? -11 : 11} cy="-3.5" r="1.6" fill="#fff" />
                  <circle cx={c.rev ? -11 : 11} cy="3.5" r="1.6" fill="#fff" />
                  <circle cx={c.rev ? 11 : -11} cy="-3.5" r="1.8" fill={RED} />
                  <circle cx={c.rev ? 11 : -11} cy="3.5" r="1.8" fill={RED} />
                </g>
                <animateMotion dur={c.dur} begin={c.begin} repeatCount="indefinite" rotate="auto" path={road}
                  {...(c.rev ? { keyPoints: '1;0', keyTimes: '0;1', calcMode: 'linear' } : {})} />
              </g>
            ))}
            {/* callouts */}
            {[
              { x: 600, y: 140, lx: 740, ly: 90, t: 'BETTER VEHICLES', d: 'More choices. Higher standards.' },
              { x: 610, y: 300, lx: 720, ly: 270, t: 'STRONGER COMMUNITY', d: 'Enthusiasts helping enthusiasts.' },
              { x: 400, y: 485, lx: 250, ly: 540, t: 'BRIGHTER ROADS', d: 'A more connected tomorrow.' },
            ].map((c, i) => (
              <motion.g key={c.t} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 1.6 + i * 0.35 }}>
                <motion.line x1={c.x} y1={c.y} x2={c.lx} y2={c.ly} stroke="rgba(255,255,255,0.4)" strokeWidth="1"
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 1.7 + i * 0.35 }} />
                <circle cx={c.x} cy={c.y} r="5" fill={RED} filter="url(#glow)" />
                <circle cx={c.x} cy={c.y} r="5" fill="none" stroke={RED}>
                  <animate attributeName="r" values="5;16" dur="1.8s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.9;0" dur="1.8s" repeatCount="indefinite" />
                </circle>
                <circle cx={c.lx} cy={c.ly} r="2.5" fill={RED} />
                <text x={c.lx + 10} y={c.ly + 4} fill="#fff" fontSize="10" fontWeight="600" letterSpacing="1.5">{c.t}</text>
                <text x={c.lx + 10} y={c.ly + 18} fill="rgba(255,255,255,0.55)" fontSize="9">{c.d}</text>
              </motion.g>
            ))}
          </svg>
          <div className="absolute inset-0 bg-gradient-to-r from-[#04060A] via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#04060A] via-transparent to-[#04060A]/70 pointer-events-none" />
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          <motion.div {...inView} variants={stagger} className="max-w-md">
            <Label num="06">Driven By A<br />Bigger Vision</Label>
            <Reveal className="text-5xl md:text-6xl font-light tracking-tight leading-[1.05] mb-8" lines={['People.', 'Performance.', <span className="text-[#E60012] font-semibold">Possibilities.</span>]} />
            <motion.p variants={fadeUp} className="text-sm text-white/70 leading-relaxed mb-10">
              KhanZ Motors is more than a marketplace — it's a growing community of riders, drivers and dreamers. We connect people, vehicles and opportunities through a shared love for the road.
            </motion.p>
            <motion.div variants={fadeUp}><OutlineBtn href="#about">Our Journey</OutlineBtn></motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section id="contact" className="relative min-h-[580px] py-24 px-6 md:px-12 lg:px-20 border-t border-white/5 overflow-hidden flex items-center bg-[#05070B]">
        <motion.div initial={{ scale: 1.2 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 2.2, ease: EASE }} className="absolute inset-0 z-0">
          <Img src={IMG.cta} alt="Drive your dreams" className="w-full h-full object-cover opacity-55" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#05070B] via-[#05070B]/75 to-[#05070B]/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-transparent to-[#05070B]/40" />
        </motion.div>

        {/* City skyline with blinking windows */}
        <svg className="absolute bottom-0 right-0 w-full lg:w-[60%] h-[45%] z-[1] pointer-events-none" viewBox="0 0 600 200" preserveAspectRatio="xMaxYMax slice">
          {Array.from({ length: 22 }, (_, i) => {
            const w = 18 + ((i * 7) % 16);
            const h = 50 + ((i * 41) % 120);
            const x = i * 28;
            return (
              <g key={i}>
                <rect x={x} y={200 - h} width={w} height={h} fill="#0a0d13" opacity="0.9" />
                {[0, 1, 2].map((k) => (
                  <rect key={k} x={x + 4 + (k % 2) * 7} y={200 - h + 10 + k * 18} width="3" height="3" fill={k === 1 ? RED : '#ffb38a'}>
                    <animate attributeName="opacity" values="0.1;0.9;0.1" dur={`${2 + ((i + k) % 5)}s`} repeatCount="indefinite" begin={`${(i * 0.3) % 3}s`} />
                  </rect>
                ))}
              </g>
            );
          })}
        </svg>
        <motion.div className="absolute bottom-0 right-[20%] w-[500px] h-[220px] bg-[#E60012]/25 blur-[100px] z-[1]" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 4, repeat: Infinity }} />
        {/* passing light trails */}
        <div className="absolute bottom-[8%] inset-x-0 h-10 z-[2] pointer-events-none">
          {[0, 1].map((i) => (
            <motion.span key={i} className="absolute h-[2px] w-56 rounded-full bg-gradient-to-r from-transparent via-[#E60012] to-transparent" style={{ top: i * 14 }}
              animate={{ x: ['110vw', '-30vw'] }} transition={{ duration: 3 + i, repeat: Infinity, delay: i * 1.4, ease: 'easeIn' }} />
          ))}
        </div>

        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.5 }} className="absolute top-14 right-6 md:right-12 lg:right-20 z-10 hidden md:flex gap-3">
          <span className="w-[1px] bg-[#E60012]" />
          <p className="text-[10px] tracking-[0.2em] uppercase text-white/70 leading-loose">Same<br />Passion<br />Higher<br />Destinations</p>
        </motion.div>

        <div className="max-w-[1400px] w-full mx-auto relative z-10">
          <motion.div {...inView} variants={stagger} className="max-w-xl">
            <Label num="07">Ready To Ride?</Label>
            <Reveal className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6" lines={[<>Drive Your <span className="text-[#E60012] drop-shadow-[0_0_25px_rgba(230,0,18,0.45)]">Dreams.</span></>]} />
            <motion.p variants={fadeUp} className="text-sm text-white/75 max-w-md mb-10 leading-relaxed">
              Explore our latest cars, heavy bikes, parts and accessories. Join thousands of enthusiasts who trust KhanZ Motors.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
              <RedBtn href="#categories">Browse All Vehicles</RedBtn>
              <OutlineBtn href="#contact" arrow={false}>Contact Us</OutlineBtn>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="relative bg-[#04060A] border-t border-white/10 pt-16 pb-8 px-6 md:px-12 lg:px-20 overflow-hidden">
        <div className="absolute top-[110px] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        {['12%', '30%', '68%', '86%'].map((l, i) => (
          <span key={l} className="absolute top-[107px] w-1.5 h-1.5 rounded-full bg-[#E60012] shadow-[0_0_14px_#E60012] animate-pulse" style={{ left: l, animationDelay: `${i * 0.5}s` }} />
        ))}
        <motion.span className="absolute top-[109px] h-[2px] w-32 bg-gradient-to-r from-transparent via-[#E60012] to-transparent" animate={{ left: ['-10%', '110%'] }} transition={{ duration: 5, repeat: Infinity, ease: 'linear' }} />
        <span className="absolute top-10 left-6 md:left-12 lg:left-20 text-[10px] tracking-[0.3em] text-white/30">07</span>
        <div className="absolute top-12 right-6 md:right-12 lg:right-20 hidden md:flex gap-3">
          <span className="w-[1px] bg-[#E60012]" />
          <p className="text-[9px] tracking-[0.2em] uppercase text-white/50 leading-loose">Drive<br />Your<br />Dreams</p>
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          <motion.div {...inView} variants={stagger} className="flex flex-col items-center mb-12">
            <motion.div variants={fadeUp} whileHover={{ rotate: 360, scale: 1.05 }} transition={{ duration: 0.8 }} className="w-20 h-20 rounded-full border-2 border-white/80 overflow-hidden mb-4 shadow-[0_0_40px_rgba(230,0,18,0.35)] bg-[#04060A]">
              <img src={IMG.logo} alt="KhanZ Motors" className="w-full h-full object-cover" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-xl font-bold tracking-[0.15em] uppercase">KhanZ <span className="font-light">Motors</span></motion.h2>
            <motion.div variants={fadeUp} className="flex items-center gap-3 mt-2">
              <span className="w-6 h-[1px] bg-[#E60012]" />
              <p className="text-[9px] tracking-[0.3em] text-white/60 uppercase">Drive Your Dreams</p>
              <span className="w-6 h-[1px] bg-[#E60012]" />
            </motion.div>
            <motion.div variants={fadeUp} className="flex gap-3 mt-6">
              {Object.entries(Social).map(([k, icon]) => (
                <motion.a key={k} href="#" aria-label={k} whileHover={{ y: -4, scale: 1.1 }} className="w-8 h-8 rounded-full border border-white/20 hover:border-[#E60012] hover:bg-[#E60012] flex items-center justify-center transition-colors">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">{icon}</svg>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <div className="flex flex-col md:flex-row justify-between gap-6 text-[11px] text-white/55 mb-8">
            <div className="flex flex-wrap gap-6">
              {footerLinks.map(([l, h]) => (
                <a key={l} href={h} className="relative hover:text-white transition-colors group">
                  {l}<span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-[#E60012] group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 items-center">
              {['Cars', 'Bikes', 'Parts', 'Accessories'].map((l, i) => (
                <React.Fragment key={l}>
                  {i > 0 && <span className="w-[1px] h-3 bg-white/20" />}
                  <a href="#categories" className="hover:text-white transition-colors">{l}</a>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="w-full h-[1px] bg-white/5 mb-6" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-white/40">
            <p>© {new Date().getFullYear()} KhanZ Motors. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <span className="w-[1px] h-3 bg-white/20" />
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <span className="w-[1px] h-3 bg-white/20" />
              <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default KhanzMotors;