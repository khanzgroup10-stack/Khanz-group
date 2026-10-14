import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const VoyantEye = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 150]);

  // Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
  };
  const fadeUpStagger = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }
    })
  };
  const lineDraw = {
    hidden: { scaleX: 0, transformOrigin: 'left' },
    visible: { scaleX: 1, transition: { duration: 1.2, ease: "easeInOut" } }
  };

  return (
    <div className="bg-[#080A08] text-[#F5F3EF] font-sans selection:bg-[#39FF14] selection:text-black min-h-screen overflow-hidden">

      {/* SECTION 01 - HERO */}
      <section className="relative w-full h-screen flex items-center bg-[#080A08] overflow-hidden">
        {/* Background Video/GIF (Right Side) */}
        <div className="absolute inset-0 z-0 flex justify-end opacity-70 lg:opacity-100">
          <div className="w-full lg:w-3/5 h-full relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#080A08] via-[#080A08]/80 to-transparent z-10 hidden lg:block"></div>
            <div className="absolute inset-0 bg-[#080A08]/40 z-10 lg:hidden"></div>
            <img
              src="/vyont eye/hero-video-vy.gif"
              alt="Voyant Eye Hero"
              className="w-full h-full object-cover object-center mix-blend-screen"
            />
          </div>
        </div>

        {/* Hero Content */}
        <motion.div style={{ y: heroY }} className="relative z-20 w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 flex flex-col justify-center h-full">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="absolute top-12 left-6 md:left-12 lg:left-24"
          >
            <img src="/vyont eye/VOYANT EYE LOGO-02.png" alt="Voyant Eye Logo" className="h-8 md:h-12 w-auto" />
          </motion.div>

          <div className="max-w-2xl mt-16 lg:mt-0">
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] tracking-tight font-light mb-10">
              <div className="overflow-hidden"><motion.span custom={0} variants={fadeUpStagger} initial="hidden" animate="visible" className="block">Learn with</motion.span></div>
              <div className="overflow-hidden"><motion.span custom={1} variants={fadeUpStagger} initial="hidden" animate="visible" className="block">Voyant Eye.</motion.span></div>
              <div className="overflow-hidden"><motion.span custom={2} variants={fadeUpStagger} initial="hidden" animate="visible" className="block"><span className="text-[#39FF14]">Grow</span> with</motion.span></div>
              <div className="overflow-hidden"><motion.span custom={3} variants={fadeUpStagger} initial="hidden" animate="visible" className="block">Voyant Eye.</motion.span></div>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-lg md:text-xl text-[#F5F3EF]/70 font-light max-w-xl mb-12 leading-relaxed"
            >
              Voyant Eye is a professional learning academy and marketing company helping individuals develop valuable digital skills and businesses build stronger digital presence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              <a href="#academy" className="group relative overflow-hidden bg-[#F5F3EF] text-[#080A08] px-8 py-4 text-xs tracking-[0.2em] uppercase transition-colors hover:bg-[#39FF14]">
                <span className="relative z-10 font-medium">Explore Academy</span>
              </a>
              <a href="#marketing" className="text-xs tracking-[0.2em] uppercase text-[#F5F3EF] hover:text-[#39FF14] transition-colors relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-[1px] after:bg-[#F5F3EF]/30 hover:after:bg-[#39FF14]">
                Marketing Solutions
              </a>
            </motion.div>
          </div>

          {/* Side Microcopy */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.5 }}
            className="absolute right-6 md:right-12 lg:right-24 top-1/2 -translate-y-1/2 flex flex-col gap-8 text-[9px] tracking-[0.4em] uppercase text-[#F5F3EF]/40 hidden md:flex"
          >
            <span className="writing-vertical hover:text-[#39FF14] transition-colors">Skills</span>
            <span className="writing-vertical hover:text-[#39FF14] transition-colors">Strategy</span>
            <span className="writing-vertical hover:text-[#39FF14] transition-colors">Creativity</span>
            <span className="writing-vertical hover:text-[#39FF14] transition-colors">Growth</span>
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 02 - INTRO */}
      <motion.section
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-[#F5F3EF] text-[#080A08] py-20 md:py-32 px-6 md:px-12 lg:px-24 z-30"
      >
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10">
          <div className="relative">
            <span className="text-xs tracking-[0.2em] text-[#080A08]/40 mb-12 block">01</span>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tight leading-[1.1]">
              <motion.span variants={fadeUpStagger} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} className="block">Academy Skills.</motion.span>
              <motion.span variants={fadeUpStagger} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} className="block text-[#064e3b]">Marketing Results.</motion.span>
            </h2>
          </div>
          <div>
            <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-lg md:text-2xl font-light leading-relaxed text-[#080A08]/70 max-w-xl">
              Voyant Eye brings learning and execution together. Our academy develops practical digital skills from basic to professional level, while our marketing company helps businesses build visibility, reach the right audience and grow through effective digital strategies.
            </motion.p>
          </div>
        </div>

        {/* Subtle background line */}
        <motion.svg className="absolute inset-0 w-full h-full z-0 opacity-10 pointer-events-none" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <motion.path
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeInOut" }}
            d="M0,800 C300,800 400,200 1000,200"
            fill="none"
            stroke="#064e3b"
            strokeWidth="2"
          />
        </motion.svg>
      </motion.section>

      {/* SECTION 03 - TWO PATHS */}
      <section className="relative bg-[#080A08] py-20 md:py-28 px-6 md:px-12 lg:px-24 overflow-hidden">
        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-xs tracking-[0.2em] text-[#F5F3EF]/40 mb-8 block">02</span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight">
              Two Paths. <span className="text-[#39FF14]">One Vision.</span>
            </h2>
          </div>

          <div className="relative flex flex-col lg:flex-row justify-between items-center lg:items-center min-h-[500px]">
            {/* Center Logo */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-[#080A08] p-6 rounded-full border border-[#39FF14]/30 flex items-center justify-center"
            >
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 border border-[#39FF14] rounded-full shadow-[0_0_15px_#39FF14]"
              ></motion.div>
              <img src="/vyont eye/VOYANT EYE LOGO-02.png" alt="Voyant Eye Icon" className="w-16 h-16 object-contain relative z-10" />
            </motion.div>

            {/* Left Column: Academy */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-20%" }} transition={{ duration: 1.2, delay: 1.5, ease: "easeOut" }} className="w-full lg:w-[40%] mb-16 lg:mb-0 relative z-10">
              <h3 className="text-2xl font-light mb-2 tracking-wide">ACADEMY</h3>
              <p className="text-xs tracking-[0.2em] text-[#39FF14] uppercase mb-12">Build Your Skills</p>
              <ul className="space-y-6 text-[#F5F3EF]/70 font-light text-lg">
                <li className="flex items-center gap-4"><span className="w-1 h-1 bg-[#39FF14] rounded-full"></span>Graphic Designing</li>
                <li className="flex items-center gap-4"><span className="w-1 h-1 bg-[#39FF14] rounded-full"></span>Video Editing</li>
                <li className="flex items-center gap-4"><span className="w-1 h-1 bg-[#39FF14] rounded-full"></span>Digital Marketing</li>
                <li className="flex items-center gap-4"><span className="w-1 h-1 bg-[#39FF14] rounded-full"></span>SEO</li>
                <li className="flex items-center gap-4"><span className="w-1 h-1 bg-[#39FF14] rounded-full"></span>3D Modeling</li>
              </ul>
            </motion.div>

            {/* Right Column: Marketing */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-20%" }} transition={{ duration: 1.2, delay: 1.5, ease: "easeOut" }} className="w-full lg:w-[40%] lg:text-right relative z-10">
              <h3 className="text-2xl font-light mb-2 tracking-wide">MARKETING</h3>
              <p className="text-xs tracking-[0.2em] text-[#39FF14] uppercase mb-12">Grow Your Business</p>
              <ul className="space-y-6 text-[#F5F3EF]/70 font-light text-lg flex flex-col lg:items-end">
                <li className="flex items-center gap-4"><span className="w-1 h-1 bg-[#39FF14] rounded-full lg:order-last"></span>Social Media Management</li>
                <li className="flex items-center gap-4"><span className="w-1 h-1 bg-[#39FF14] rounded-full lg:order-last"></span>Content Creation</li>
                <li className="flex items-center gap-4"><span className="w-1 h-1 bg-[#39FF14] rounded-full lg:order-last"></span>Marketing Campaign Management</li>
                <li className="flex items-center gap-4"><span className="w-1 h-1 bg-[#39FF14] rounded-full lg:order-last"></span>Branding & Strategy</li>
                <li className="flex items-center gap-4"><span className="w-1 h-1 bg-[#39FF14] rounded-full lg:order-last"></span>Audience Growth</li>
                <li className="flex items-center gap-4"><span className="w-1 h-1 bg-[#39FF14] rounded-full lg:order-last"></span>Business Growth</li>
              </ul>
            </motion.div>

            {/* Animated Data Paths for Desktop */}
            <svg viewBox="0 0 1000 600" preserveAspectRatio="none" className="absolute inset-0 w-full h-full z-0 hidden lg:block" style={{ pointerEvents: 'none' }}>
              {/* Left Paths */}
              <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, margin: "-20%" }} transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }} d="M 500 300 C 400 300, 300 60, 150 60" fill="none" stroke="#39FF14" strokeWidth="1" strokeOpacity="0.4" />
              <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, margin: "-20%" }} transition={{ duration: 2, ease: "easeInOut", delay: 0.7 }} d="M 500 300 C 400 300, 300 180, 150 180" fill="none" stroke="#39FF14" strokeWidth="1" strokeOpacity="0.3" />
              <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, margin: "-20%" }} transition={{ duration: 2, ease: "easeInOut", delay: 0.9 }} d="M 500 300 C 400 300, 300 300, 150 300" fill="none" stroke="#39FF14" strokeWidth="1" strokeOpacity="0.2" />
              <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, margin: "-20%" }} transition={{ duration: 2, ease: "easeInOut", delay: 1.1 }} d="M 500 300 C 400 300, 300 420, 150 420" fill="none" stroke="#39FF14" strokeWidth="1" strokeOpacity="0.3" />
              <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, margin: "-20%" }} transition={{ duration: 2, ease: "easeInOut", delay: 1.3 }} d="M 500 300 C 400 300, 300 540, 150 540" fill="none" stroke="#39FF14" strokeWidth="1" strokeOpacity="0.4" />

              {/* Right Paths (6 items) */}
              <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, margin: "-20%" }} transition={{ duration: 2, ease: "easeInOut", delay: 0.6 }} d="M 500 300 C 600 300, 700 30, 850 30" fill="none" stroke="#39FF14" strokeWidth="1" strokeOpacity="0.4" />
              <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, margin: "-20%" }} transition={{ duration: 2, ease: "easeInOut", delay: 0.8 }} d="M 500 300 C 600 300, 700 130, 850 130" fill="none" stroke="#39FF14" strokeWidth="1" strokeOpacity="0.3" />
              <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, margin: "-20%" }} transition={{ duration: 2, ease: "easeInOut", delay: 1.0 }} d="M 500 300 C 600 300, 700 230, 850 230" fill="none" stroke="#39FF14" strokeWidth="1" strokeOpacity="0.2" />
              <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, margin: "-20%" }} transition={{ duration: 2, ease: "easeInOut", delay: 1.1 }} d="M 500 300 C 600 300, 700 330, 850 330" fill="none" stroke="#39FF14" strokeWidth="1" strokeOpacity="0.2" />
              <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, margin: "-20%" }} transition={{ duration: 2, ease: "easeInOut", delay: 1.2 }} d="M 500 300 C 600 300, 700 430, 850 430" fill="none" stroke="#39FF14" strokeWidth="1" strokeOpacity="0.2" />
              <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, margin: "-20%" }} transition={{ duration: 2, ease: "easeInOut", delay: 1.4 }} d="M 500 300 C 600 300, 700 530, 850 530" fill="none" stroke="#39FF14" strokeWidth="1" strokeOpacity="0.3" />

              {/* Animated Traveling Nodes */}
              <motion.circle r="3" fill="#39FF14" filter="drop-shadow(0 0 5px #39FF14)">
                <animateMotion dur="4s" repeatCount="indefinite" path="M 500 300 C 400 300, 300 60, 150 60" />
              </motion.circle>
              <motion.circle r="3" fill="#39FF14" filter="drop-shadow(0 0 5px #39FF14)">
                <animateMotion dur="5s" repeatCount="indefinite" path="M 500 300 C 600 300, 700 130, 850 130" />
              </motion.circle>
              <motion.circle r="3" fill="#39FF14" filter="drop-shadow(0 0 5px #39FF14)">
                <animateMotion dur="6s" repeatCount="indefinite" path="M 500 300 C 400 300, 300 540, 150 540" />
              </motion.circle>
              <motion.circle r="3" fill="#39FF14" filter="drop-shadow(0 0 5px #39FF14)">
                <animateMotion dur="4.5s" repeatCount="indefinite" path="M 500 300 C 600 300, 700 430, 850 430" />
              </motion.circle>
            </svg>
          </div>
        </div>
      </section>

      {/* SECTION 04 - ACADEMY */}
      <section id="academy" className="bg-[#0A0D0A] py-20 md:py-28 px-6 md:px-12 lg:px-24 overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div className="overflow-hidden">
              <motion.span initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} className="text-xs tracking-[0.2em] text-[#F5F3EF]/40 mb-6 block">03</motion.span>
              <motion.h2 initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tight">
                Our Academy
              </motion.h2>
            </div>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }} className="text-base lg:text-lg text-[#F5F3EF]/60 font-light max-w-sm">
              Professional digital skills taught from basic to professional level.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { num: '01', title: 'Graphic Designing', text: 'Build strong visual communication and professional design skills.', cta: 'DESIGN →', icon: 'M 4 4 H 20 V 20 H 4 Z M 4 10 H 20 M 12 4 V 20' },
              { num: '02', title: 'Video Editing', text: 'Learn professional editing, visual storytelling and content production.', cta: 'EDIT →', icon: 'M 4 4 H 20 V 16 H 4 Z M 10 7 L 16 10 L 10 13 Z M 4 20 H 20' },
              { num: '03', title: 'Digital Marketing', text: 'Understand campaigns, audiences and strategies for digital growth.', cta: 'GROW →', icon: 'M 4 20 V 12 M 12 20 V 4 M 20 20 V 8' },
              { num: '04', title: 'SEO', text: 'Learn how to improve online visibility and search performance.', cta: 'RANK →', icon: 'M 4 20 L 12 12 L 16 16 L 22 4 M 16 4 H 22 V 10' },
              { num: '05', title: '3D Modeling', text: 'Develop foundational skills for creating professional 3D forms and visuals.', cta: 'CREATE →', icon: 'M 12 4 L 4 8 V 16 L 12 20 L 20 16 V 8 Z M 12 12 L 4 8 M 12 12 L 20 8 M 12 12 V 20' }
            ].map((module, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                className="group relative bg-[#0d100d] border border-[#064e3b] p-6 lg:p-8 flex flex-col justify-between hover:bg-[#111411] transition-colors duration-500 overflow-hidden h-[340px]"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#39FF14]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Top Header */}
                <div className="flex justify-between items-start relative z-10">
                  <span className="text-[10px] tracking-[0.2em] text-[#F5F3EF]/40 font-medium">{module.num}</span>
                  <div className="flex gap-1.5 opacity-30 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-1 h-1 bg-[#39FF14] rounded-full"></div>
                    <div className="w-1 h-1 bg-[#39FF14] rounded-full group-hover:animate-ping"></div>
                  </div>
                </div>

                {/* Animated Technical Icon */}
                <div className="mt-6 mb-auto relative z-10">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-[#F5F3EF]/30 group-hover:stroke-[#39FF14] transition-colors duration-500 fill-none" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <motion.path
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 2, delay: i * 0.2 + 0.5 }}
                      d={module.icon}
                      className="group-hover:animate-[dash_2s_ease-in-out_infinite]"
                    />
                  </svg>
                </div>

                {/* Content */}
                <div className="relative z-10 transform group-hover:-translate-y-2 transition-transform duration-500 mt-8">
                  <h3 className="text-xl font-light text-[#F5F3EF] mb-3">{module.title}</h3>
                  <p className="text-sm font-light text-[#F5F3EF]/50 leading-relaxed mb-6">{module.text}</p>
                </div>

                {/* Bottom CTA */}
                <div className="relative z-10 text-[10px] tracking-[0.2em] text-[#39FF14] flex items-center transform group-hover:translate-x-2 transition-transform duration-500">
                  {module.cta}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-24 border-l border-[#39FF14]/50 pl-6 lg:pl-10">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1]">
              <div className="overflow-hidden">
                <motion.span initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="block text-[#F5F3EF]">
                  Learn skills.
                </motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.span initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} className="block text-[#39FF14]">
                  Create opportunities.
                </motion.span>
              </div>
            </h2>
          </div>
        </div>
      </section>

      {/* SECTION 05 - MARKETING COMPANY */}
      <section id="marketing" className="bg-[#080A08] py-32 md:py-48 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
            <div className="lg:col-span-5">
              <h2 className="text-5xl lg:text-7xl font-light tracking-tight leading-[1.1] mb-12">
                One Stop <br /><span className="text-[#F5F3EF]/40">Marketing</span><br />Solution.
              </h2>
              <p className="text-lg text-[#F5F3EF]/60 font-light max-w-md leading-relaxed">
                Voyant Eye provides professional marketing solutions designed to help businesses build a strong online presence, reach the right audience, increase brand awareness and achieve sustainable growth.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Abstract Panel 1 */}
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="border border-[#F5F3EF]/10 p-8 relative overflow-hidden group">
                <div className="flex justify-between items-center mb-16">
                  <p className="text-xs tracking-widest text-[#F5F3EF]/70">Social & Content</p>
                  <div className="flex gap-1">
                    <span className="w-1 h-1 bg-[#39FF14] rounded-full animate-pulse"></span>
                    <span className="w-1 h-1 bg-[#39FF14]/30 rounded-full"></span>
                  </div>
                </div>
                <div className="h-32 w-full relative">
                  <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
                    <motion.path
                      initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }}
                      d="M0,80 Q25,20 50,60 T100,40 T150,70 T200,30"
                      fill="none" stroke="#39FF14" strokeWidth="1" strokeOpacity="0.5"
                    />
                  </svg>
                </div>
                <p className="mt-8 text-sm font-light text-[#F5F3EF]/50 group-hover:text-[#F5F3EF] transition-colors">Social Media Management & Content Creation</p>
              </motion.div>

              {/* Abstract Panel 2 */}
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.2 }} className="border border-[#F5F3EF]/10 p-8 relative overflow-hidden group">
                <div className="flex justify-between items-center mb-16">
                  <p className="text-xs tracking-widest text-[#F5F3EF]/70">Strategy</p>
                  <div className="flex gap-1">
                    <span className="w-1 h-1 bg-[#39FF14]/30 rounded-full"></span>
                    <span className="w-1 h-1 bg-[#39FF14] rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></span>
                  </div>
                </div>
                <div className="h-32 w-full relative flex items-center justify-center">
                  <svg className="w-32 h-32" viewBox="0 0 100 100">
                    <motion.circle
                      initial={{ strokeDasharray: "0 100" }} whileInView={{ strokeDasharray: "75 100" }} viewport={{ once: true }} transition={{ duration: 2, ease: "easeOut" }}
                      cx="50" cy="50" r="40" fill="none" stroke="#39FF14" strokeWidth="1" strokeOpacity="0.5" strokeDasharray="100 100" strokeDashoffset="25"
                    />
                    <circle cx="50" cy="50" r="30" fill="none" stroke="#F5F3EF" strokeWidth="0.5" strokeOpacity="0.1" />
                  </svg>
                </div>
                <p className="mt-8 text-sm font-light text-[#F5F3EF]/50 group-hover:text-[#F5F3EF] transition-colors">Branding & Marketing Campaign Management</p>
              </motion.div>

              {/* Abstract Panel 3 */}
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.4 }} className="border border-[#F5F3EF]/10 p-8 relative overflow-hidden group md:col-span-2">
                <div className="flex justify-between items-center mb-12">
                  <p className="text-xs tracking-widest text-[#F5F3EF]/70">Growth</p>
                  <div className="flex gap-1">
                    <span className="w-1 h-1 bg-[#39FF14] rounded-full animate-pulse"></span>
                    <span className="w-1 h-1 bg-[#39FF14] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-1 h-1 bg-[#39FF14] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
                <div className="w-full flex justify-between items-end border-b border-[#F5F3EF]/10 pb-4 mb-4">
                  {[30, 50, 40, 70, 60, 90, 80, 100].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.1 }}
                      className="w-8 bg-[#39FF14]/20 group-hover:bg-[#39FF14]/40 transition-colors" style={{ minHeight: '4px' }}
                    ></motion.div>
                  ))}
                </div>
                <div className="flex justify-between text-sm font-light text-[#F5F3EF]/50">
                  <p>Audience Growth & Business Growth</p>
                  <p>Customized Solutions</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 06 - PACKAGES */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="bg-[#F6F7F4] text-[#080A08] py-14 md:py-16 lg:py-20 px-6 md:px-12 lg:px-24 relative overflow-hidden z-20"
      >
        {/* Subtle circular artwork — kept very light like the reference */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-[62%] w-[620px] h-[620px] rounded-full border border-[#064e3b]/[0.06] pointer-events-none" />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-[67%] w-[790px] h-[790px] rounded-full border border-[#064e3b]/[0.035] pointer-events-none" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-[62%] w-[650px] h-[650px] rounded-full border border-[#064e3b]/[0.06] pointer-events-none" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-[67%] w-[820px] h-[820px] rounded-full border border-[#064e3b]/[0.035] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          {/* Header — matches the left-title / right-copy reference layout */}
          <div className="mb-9 md:mb-10 lg:mb-12">
            <span className="text-[10px] tracking-[0.24em] text-[#080A08]/35 mb-4 block">04</span>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-end">
              <div className="lg:col-span-6">
                <h2 className="text-4xl md:text-5xl lg:text-[3.7rem] leading-none font-light tracking-tight">
                  Marketing <span className="text-[#0B684A]">Packages</span>
                </h2>
              </div>

              <div className="lg:col-span-4 lg:border-l border-[#080A08]/15 lg:pl-7">
                <p className="text-xs md:text-sm font-light leading-relaxed text-[#080A08]/55 max-w-md">
                  Flexible packages designed for startups, small businesses and growing brands. Get high-quality content and complete social media management at competitive rates.
                </p>
              </div>

              <div className="hidden lg:flex lg:col-span-2 justify-end">
                <div className="text-[9px] leading-[1.55] tracking-[0.17em] uppercase text-[#080A08]/50">
                  <span className="block">Quality</span>
                  <span className="block">Strategy</span>
                  <span className="block">Consistency</span>
                  <span className="block">Growth</span>
                  <span className="block w-4 h-[2px] bg-[#39FF14] mt-2" />
                </div>
              </div>
            </div>
          </div>

          {/* Pricing cards — compact proportions matching the reference */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4 items-stretch">
            {/* BASIC */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white/70 border border-[#080A08]/10 flex flex-col min-h-[420px] lg:h-[455px]"
            >
              <div className="px-7 pt-6 pb-5 flex-1 flex flex-col">
                <div className="mb-5">
                  <h3 className="text-[1.2rem] font-semibold tracking-tight text-[#0B5B3D] leading-none mb-1.5">BASIC</h3>
                  <p className="text-[10px] tracking-[0.05em] text-[#080A08]/45">Most Popular for Startups</p>
                </div>

                <div className="space-y-1.5 text-[12px] font-light mb-5">
                  <div className="flex items-center justify-between gap-5"><span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#16A05D]" />Static</span><span className="font-semibold text-[#0B5B3D]">10</span></div>
                  <div className="flex items-center justify-between gap-5"><span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#16A05D]" />Animated</span><span className="font-semibold text-[#0B5B3D]">05</span></div>
                  <div className="flex items-center justify-between gap-5"><span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#16A05D]" />Story Reels</span><span className="font-semibold text-[#0B5B3D]">04</span></div>
                  <div className="flex items-center justify-between gap-5"><span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#16A05D]" />Video Ads</span><span className="font-semibold text-[#0B5B3D]">02</span></div>
                </div>

                <div className="mt-auto">
                  <div className="mb-4">
                    <p className="text-[10px] font-semibold text-[#0B5B3D] mb-1.5">Bonus</p>
                    <ol className="text-[9.5px] leading-[1.45] font-light text-[#080A08]/60 list-decimal list-inside">
                      <li>Overall Branding Outline</li>
                      <li>Social Media Management</li>
                      <li>Marketing Campaign Management</li>
                    </ol>
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold text-[#0B5B3D] mb-1.5">Terms</p>
                    <ol className="text-[9.5px] leading-[1.45] font-light text-[#080A08]/55 list-decimal list-inside">
                      <li>No Customized Reviews</li>
                      <li>On Demand Content will be charged separately</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="h-[48px] bg-[#075C38] text-white flex items-center justify-center gap-2 px-5">
                <span className="text-xl md:text-lg lg:text-xl font-semibold tracking-tight">PKR 50K</span>
                <span className="text-[10px] font-light text-white/80">/ Monthly</span>
              </div>
            </motion.div>

            {/* PREMIUM */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white/80 border border-[#080A08]/10 flex flex-col min-h-[420px] lg:h-[455px] relative"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#0D7650]" />

              <div className="px-7 pt-6 pb-5 flex-1 flex flex-col">
                <div className="mb-4">
                  <h3 className="text-[1.2rem] font-semibold tracking-tight text-[#0B5B3D] leading-none mb-1.5">PREMIUM</h3>
                  <p className="text-[10px] tracking-[0.05em] text-[#080A08]/45">Best for Growing Businesses</p>
                </div>

                <div className="space-y-1 text-[11px] font-light mb-4">
                  <div className="flex items-center justify-between gap-5"><span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#16A05D]" />Static</span><span className="font-semibold text-[#0B5B3D]">15</span></div>
                  <div className="flex items-center justify-between gap-5"><span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#16A05D]" />Animated</span><span className="font-semibold text-[#0B5B3D]">07</span></div>
                  <div className="flex items-center justify-between gap-5"><span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#16A05D]" />Story Reels</span><span className="font-semibold text-[#0B5B3D]">05</span></div>
                  <div className="flex items-center justify-between gap-5"><span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#16A05D]" />On-Site Shoot</span><span className="font-semibold text-[#0B5B3D]">01</span></div>
                  <div className="flex items-center justify-between gap-5"><span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#16A05D]" />Dev. Updates</span><span className="font-semibold text-[#0B5B3D]">04</span></div>
                  <div className="flex items-center justify-between gap-5"><span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#16A05D]" />Visit Updates</span><span className="font-semibold text-[#0B5B3D]">05</span></div>
                  <div className="flex items-center justify-between gap-5"><span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#16A05D]" />Video Ads</span><span className="font-semibold text-[#0B5B3D]">02</span></div>
                </div>

                <div className="mt-auto">
                  <div className="mb-3">
                    <p className="text-[10px] font-semibold text-[#0B5B3D] mb-1">Bonus</p>
                    <ol className="text-[9px] leading-[1.35] font-light text-[#080A08]/60 list-decimal list-inside">
                      <li>Overall Branding Outline</li>
                      <li>Social Media Management</li>
                      <li>Marketing Campaign Management</li>
                      <li>Multiple Idea Meetings</li>
                      <li>Customized Post Reviews</li>
                    </ol>
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold text-[#0B5B3D] mb-1">Terms</p>
                    <ol className="text-[9px] leading-[1.35] font-light text-[#080A08]/55 list-decimal list-inside">
                      <li>Talent/Drone will be charged separately</li>
                      <li>On Demand Content will be charged separately</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="h-[48px] bg-[#075C38] text-white flex items-center justify-center gap-2 px-5">
                <span className="text-xl md:text-lg lg:text-xl font-semibold tracking-tight">PKR 100K</span>
                <span className="text-[10px] font-light text-white/80">/ Monthly</span>
              </div>
            </motion.div>

            {/* CUSTOM */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white/75 border border-[#080A08]/10 flex flex-col min-h-[420px] lg:h-[455px]"
            >
              <div className="px-7 pt-6 pb-5 flex-1 flex flex-col">
                <div>
                  <h3 className="text-[1.2rem] font-semibold tracking-tight text-[#0B5B3D] leading-none mb-1.5">CUSTOM</h3>
                  <p className="text-[10px] tracking-[0.05em] text-[#080A08]/45">Tailored for Your Needs</p>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center text-center px-3 -mt-1">
                  <div className="w-16 h-16 mb-5 opacity-90 overflow-hidden flex items-center justify-center">
                    <img src="/vyont eye/VOYANT EYE LOGO-02.png" alt="Voyant Symbol" className="w-full h-full object-contain" />
                  </div>

                  <h4 className="text-base md:text-sm lg:text-base font-light leading-snug text-[#080A08] max-w-[250px]">
                    Tailored Content for<br />Targeted Audience
                  </h4>

                  <div className="w-6 h-[1px] bg-[#0B684A] my-4" />

                  <p className="text-[11px] font-light leading-relaxed text-[#080A08]/60 max-w-[230px]">
                    Ideal for Brands &amp;<br />Multi-National Companies
                  </p>
                </div>
              </div>

              <div className="h-[48px] bg-[#075C38] text-white flex items-center justify-center px-5">
                <span className="text-lg font-semibold tracking-tight">Negotiable</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 07 - COMPACT FINAL CTA + FOOTER */}
      <section className="relative bg-[#080A08] text-[#F5F3EF] overflow-hidden border-t border-[#F5F3EF]/5">
        {/* Section 05 / compact CTA */}
        <div className="relative px-6 md:px-12 lg:px-24 py-16 md:py-20 lg:py-24 overflow-hidden">
          {/* Concentric technical rings */}
          <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                initial={{ scale: 0.82, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.2 + i * 0.18, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="absolute rounded-full border border-[#39FF14]/10"
                style={{
                  width: `${220 + i * 180}px`,
                  height: `${220 + i * 180}px`,
                }}
              />
            ))}

            {/* Small glowing nodes like the reference */}
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: [0, 1, 0.45, 1] }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.45 }}
              className="absolute left-[19%] top-[42%] w-1.5 h-1.5 rounded-full bg-[#39FF14] shadow-[0_0_10px_#39FF14] hidden md:block"
            />
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: [0, 1, 0.45, 1] }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.75 }}
              className="absolute left-[27%] top-[66%] w-1.5 h-1.5 rounded-full bg-[#39FF14] shadow-[0_0_10px_#39FF14] hidden md:block"
            />
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: [0, 1, 0.45, 1] }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.95 }}
              className="absolute right-[25%] top-[58%] w-1.5 h-1.5 rounded-full bg-[#39FF14] shadow-[0_0_10px_#39FF14] hidden md:block"
            />
          </div>

          <div className="relative z-10 max-w-[1600px] mx-auto">
            <span className="absolute left-0 top-0 text-[10px] tracking-[0.22em] text-[#F5F3EF]/30">05</span>

            {/* Right-side micro statement — replaces the oversized standalone section */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-start">
              <p className="text-[10px] leading-[1.45] tracking-[0.18em] uppercase text-[#F5F3EF]/45">
                LOSE THE<br />
                POCKET.<br />
                WIN THE<br />
                MARKET.
              </p>
              <div className="mt-4 w-6 h-[2px] bg-[#39FF14]" />
            </div>

            <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
              <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] font-light tracking-tight leading-[1.05] mb-4">
                <motion.span
                  variants={fadeUpStagger}
                  custom={0}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="block"
                >
                  Learn with Voyant Eye.
                </motion.span>

                <motion.span
                  variants={fadeUpStagger}
                  custom={1}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="block"
                >
                  <span className="text-[#39FF14]">Grow</span> with Voyant Eye.
                </motion.span>
              </h2>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="text-[11px] md:text-sm font-light leading-relaxed text-[#F5F3EF]/50 max-w-2xl mb-5"
              >
                Whether you want to learn in-demand skills or grow your business with professional marketing solutions — Voyant Eye is your partner in progress.
              </motion.p>

              <motion.a
                href="mailto:voyanteye01@gmail.com"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.55 }}
                className="group bg-[#F5F3EF] text-[#080A08] min-w-[150px] px-6 py-3 text-[10px] tracking-[0.12em] uppercase font-medium hover:bg-[#39FF14] transition-colors duration-500 flex items-center justify-center gap-3"
              >
                Contact Us
                <span className="w-4 h-4 rounded-full bg-[#39FF14] group-hover:bg-[#080A08] group-hover:text-[#39FF14] flex items-center justify-center text-[8px] transition-colors">
                  →
                </span>
              </motion.a>
            </div>
          </div>
        </div>

        {/* Compact footer strip exactly under CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-20 border-t border-[#F5F3EF]/10 bg-[#070907]"
        >
          <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 min-h-[74px] flex flex-col lg:flex-row lg:items-center">
            <div className="hidden lg:flex items-center pr-8 mr-8 border-r border-[#F5F3EF]/10 self-stretch">
              <span className="text-[10px] tracking-[0.22em] text-[#F5F3EF]/30 self-center">06</span>
            </div>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-0">
              <div className="py-4 sm:py-0 sm:pr-8 sm:border-r border-[#F5F3EF]/10 flex items-center gap-4">
                <div className="w-8 h-8 flex items-center justify-center text-[#F5F3EF]/80">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="1.4">
                    <path d="M3 5h18v14H3z" />
                    <path d="m3 6 9 7 9-7" />
                  </svg>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.15em] text-[#F5F3EF]/45 mb-1">Official Email</p>
                  <a href="mailto:voyanteye01@gmail.com" className="text-[11px] md:text-xs text-[#F5F3EF]/85 hover:text-[#39FF14] transition-colors">
                    voyanteye01@gmail.com
                  </a>
                </div>
              </div>

              <div className="py-4 sm:py-0 sm:px-8 sm:border-r border-[#F5F3EF]/10 flex items-center gap-4">
                <div className="w-8 h-8 flex items-center justify-center text-[#F5F3EF]/80">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="1.4">
                    <path d="M7 3h4l2 5-3 2c1.8 3.1 4.2 5.5 7.3 7.3l2-3 4.7 2v4c0 1.1-.9 2-2 2C11 22 2 13 2 2c0-1.1.9-2 2-2" transform="scale(.86) translate(2 2)" />
                  </svg>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.15em] text-[#F5F3EF]/45 mb-1">Contact</p>
                  <a href="tel:+923359505957" className="text-[11px] md:text-xs text-[#F5F3EF]/85 hover:text-[#39FF14] transition-colors">
                    +92 335 950 5957
                  </a>
                </div>
              </div>

              <div className="py-4 sm:py-0 sm:px-8 flex items-center gap-4">
                <div className="w-8 h-8 flex items-center justify-center text-[#F5F3EF]/80">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="1.4">
                    <path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z" />
                    <circle cx="12" cy="10" r="2" />
                  </svg>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.15em] text-[#F5F3EF]/45 mb-1">Address</p>
                  <p className="text-[11px] md:text-xs text-[#F5F3EF]/85">
                    Newcity Phase 2, Wah Cantt
                  </p>
                </div>
              </div>
            </div>

            <div className="py-4 lg:py-0 lg:pl-8 lg:ml-4 lg:border-l border-[#F5F3EF]/10 flex items-center justify-center lg:justify-end">
              <img
                src="/vyont eye/VOYANT EYE LOGO-02.png"
                alt="Voyant Eye"
                className="w-28 md:w-32 h-auto object-contain"
              />
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
};
