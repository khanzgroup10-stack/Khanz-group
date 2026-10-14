import React from 'react';
import { ArrowRight } from 'lucide-react';

export const GlassCardSection: React.FC = () => {
  return (
    <section 
      id="glass-card-section" 
      className="relative w-full py-10 sm:py-14 px-4 sm:px-6 flex items-center justify-center overflow-hidden bg-[#05070a]"
    >
      {/* 
        Background layer underneath: Warm amber/canyon blurred organic abstract light 
        to illuminate through the frosted glass, mirroring the uploaded image's warm canyon backdrop.
      */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden flex items-center justify-center">
        {/* Warm organic bronze/amber glow representing canyon light */}
        <div className="w-[450px] sm:w-[550px] h-[350px] sm:h-[400px] rounded-full bg-gradient-to-tr from-[#99471f]/45 via-[#c47335]/30 to-[#2c1d18]/50 blur-[90px] opacity-80" />
        {/* Soft cool central highlight passing through the center like the canyon sky opening */}
        <div className="absolute w-[160px] sm:w-[220px] h-[300px] sm:h-[350px] bg-gradient-to-b from-blue-100/20 via-white/15 to-transparent blur-[60px] -rotate-12" />
      </div>

      {/* 
        Exact Glass Card Container (Reduced height / compact vertical profile):
        - Controlled max-w-[480px]
        - Compact padding and tighter vertical flow
        - Deep frosted glassmorphism: backdrop-blur-2xl / backdrop-blur-3xl
        - Rounded corners matching reference image (~24px to 28px)
        - Subtle translucent white border with inner specular reflection
      */}
      <div 
        id="pure-glass-card"
        className="relative w-full max-w-[440px] sm:max-w-[470px] rounded-[24px] sm:rounded-[28px] p-6 sm:p-7 flex flex-col justify-between select-none
                   bg-white/[0.07] backdrop-blur-[36px] backdrop-saturate-[180%] 
                   border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.35)]"
      >
        {/* Top Row: "Pure Glass" on Left, "⟶ Support" on Right */}
        <div className="flex items-center justify-between w-full text-white/85 text-xs sm:text-sm font-medium tracking-wide mb-5 sm:mb-6">
          <span id="glass-tag-left">Pure Glass</span>
          
          <div id="glass-support-btn" className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors">
            <ArrowRight className="w-4 h-4 stroke-[1.8]" />
            <span>Support</span>
          </div>
        </div>

        {/* Center Content: "MASTER EVERY LAYER" + Subtitle */}
        <div className="mb-5 sm:mb-6">
          <h2 
            id="glass-card-title"
            className="text-2xl sm:text-3xl md:text-[2.25rem] font-bold text-white tracking-tight leading-[1.08] drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]"
            style={{ fontFamily: "'Plus Jakarta Sans', 'Montserrat', sans-serif" }}
          >
            MASTER<br />EVERY LAYER
          </h2>

          <p 
            id="glass-card-subtitle"
            className="mt-2.5 sm:mt-3 text-xs sm:text-[13px] text-white/80 font-normal leading-relaxed max-w-[280px] sm:max-w-[320px]"
          >
            Crisp, professional, versatile aesthetics designed for 4K resolution.
          </p>
        </div>

        {/* Bottom Row: "Editable Layer" pill on Left, "2500×3200 Pixel" on Right */}
        <div className="flex items-center justify-between w-full pt-1">
          {/* Rounded Pill: Editable Layer */}
          <div 
            id="glass-pill-editable"
            className="px-3.5 py-1 rounded-full border border-white/35 bg-white/[0.04] text-white/90 text-xs font-normal tracking-wide backdrop-blur-sm shadow-sm"
          >
            Editable Layer
          </div>

          {/* Resolution Specifier */}
          <span 
            id="glass-resolution-spec"
            className="text-white/80 text-xs font-normal tracking-wide"
          >
            2500×3200 Pixel
          </span>
        </div>

      </div>
    </section>
  );
};
