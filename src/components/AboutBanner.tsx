import React from 'react';

export const AboutBanner: React.FC = () => {
  return (
    <section
      id="about-us-banner-section"
      className="relative w-full aspect-[2/1] min-h-[580px] max-h-[820px] flex items-center overflow-hidden bg-[#07090e] select-none"
    >
      {/* 
        ========================================================================
        1. CINEMATIC CORPORATE BACKGROUND (NO ocean/fish/marine elements):
        Sophisticated dark cityscape at golden hour / twilight with modern glass 
        architecture, subtle warm golden lights, deep navy and charcoal atmosphere, 
        and very subtle visual connection to the KHANZ global business ecosystem.
        ========================================================================
      */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Modern architectural skyline at dusk with warm golden lights through glass facades */}
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=85&w=2600&auto=format&fit=crop"
          alt="Modern corporate glass architecture at dusk"
          className="w-full h-full object-cover object-center scale-[1.03]"
        />

        {/* 
          Deep Black, Charcoal & Dark Navy atmospheric grading layers:
          Darkens the image heavily to let typography pop with extreme contrast,
          matching the exact darkness level of the reference image.
        */}
        <div className="absolute inset-0 bg-[#06080d]/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#05070a]/95 via-[#080d14]/85 to-[#0b121e]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-transparent to-[#05070a]/70" />

        {/* Subtle warm metallic gold ambient glow / reflections in the architecture */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[500px] h-64 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 
        ========================================================================
        2. ELEGANT THIN GEOMETRIC LINE / DETAILS AROUND TYPOGRAPHY:
        Mirrors the reference image's distinctive framing geometry:
        - A crisp thin line on the left side of the small label
        - Vertical drop line framing the left edge of the big heading
        - Styled in warm metallic gold (#D4AF37 / amber-400)
        ========================================================================
      */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-12">
        <div className="max-w-2xl lg:max-w-3xl">

          {/* Top Label with Left Framing Line */}
          <div className="relative flex items-center mb-1 sm:mb-2">
            
            {/* The horizontal segment of the geometric line sitting to the left of the label */}
            <div className="w-12 sm:w-16 h-[1.5px] bg-gradient-to-r from-amber-400/80 to-amber-300/60 mr-4" />

            {/* Small Uppercase Label: ABOUT KHANZ */}
            <span
              id="banner-small-label"
              className="text-[11px] sm:text-xs md:text-sm font-semibold tracking-[0.32em] uppercase text-amber-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              ABOUT KHANZ
            </span>

            {/* The vertical segment of the geometric line dropping down to frame the big heading */}
            <div 
              className="absolute left-0 top-[0.45rem] w-[1.5px] h-[5.5rem] sm:h-[7.5rem] md:h-[9.5rem] lg:h-[11rem] bg-gradient-to-b from-amber-400/80 via-amber-400/40 to-transparent pointer-events-none" 
            />
          </div>

          {/* 
            Main Heading: ABOUT US
            - Large, bold, modern editorial sans-serif font
            - Extremely clean, powerful, and premium
            - Left-aligned, matching the massive bold scale of "FISH" in the reference
            - Soft white typography with high contrast
          */}
          <h1
            id="banner-main-heading"
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[7.2rem] font-extrabold tracking-tight text-white leading-none pl-3 sm:pl-4 my-2 sm:my-3 drop-shadow-[0_6px_30px_rgba(0,0,0,0.95)] select-text"
            style={{ fontFamily: "'Montserrat', 'Syne', sans-serif" }}
          >
            ABOUT US
          </h1>

          {/* 
            Paragraph Underneath:
            - Exact requested text
            - Smaller, highly readable, professionally spaced
            - Soft off-white / light slate text for luxury readability
          */}
          <p
            id="banner-paragraph"
            className="pl-3 sm:pl-4 mt-4 sm:mt-6 text-xs sm:text-sm md:text-[15px] lg:text-base text-gray-200/90 font-normal leading-relaxed md:leading-[1.75] max-w-xl sm:max-w-2xl tracking-normal drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] select-text"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            KHANZ Group of Companies is a diversified business group bringing together ventures across multiple industries. From marketing and finance to fashion, healthcare, food, real estate, technology and mobility, we are building businesses with one shared vision — creating value, opportunities and a stronger future.
          </p>

        </div>
      </div>

      {/* Subtle bottom edge gradient transition */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#05070a] to-transparent pointer-events-none" />
    </section>
  );
};
