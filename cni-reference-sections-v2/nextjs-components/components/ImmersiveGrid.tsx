'use client';
import {useEffect,useRef,useState} from 'react';
import {topics,type TopicKey} from './content';
const entries:[TopicKey,string][]=[['business','Business facilitation'],['mobility','Premium mobility'],['realestate','Real estate & advisory'],['digital','AI & Digital'],['hospitality','Hospitality & travel']];
export default function ImmersiveGrid(){
 const [selected,setSelected]=useState<TopicKey>('digital'),[open,setOpen]=useState(false),[visible,setVisible]=useState(false);
 const section=useRef<HTMLElement>(null),close=useRef<HTMLButtonElement>(null),opener=useRef<HTMLButtonElement|null>(null);
 useEffect(()=>{if(!section.current)return;const io=new IntersectionObserver(([entry])=>{if(entry.isIntersecting)setVisible(true);},{threshold:.1});io.observe(section.current);return()=>io.disconnect();},[]);
 useEffect(()=>{if(!open)return;const prior=document.body.style.overflow;document.body.style.overflow='hidden';close.current?.focus();const key=(e:KeyboardEvent)=>{if(e.key==='Escape')setOpen(false)};window.addEventListener('keydown',key);return()=>{window.removeEventListener('keydown',key);document.body.style.overflow=prior;opener.current?.focus();};},[open]);
 const detail=topics[selected];
 return <section className={'experience'+(visible?' is-visible':'')} id="ksa-experience" ref={section} aria-label="CNI connected platform">
  <div className="experience-image" role="img" aria-label="Illustrative contemporary architecture"/><div className="experience-shade"/>
  <div className="experience-inner">
   <nav className="experience-header" aria-label="Experience section navigation"><div className="experience-header-left"><a href="#divisions">Divisions</a><a href="https://crescentnovainternational.com/why-ksa">Why KSA</a></div><span className="experience-header-brand">Crescent Nova International</span><a className="experience-header-link" href="https://crescentnovainternational.com/contact">Contact <span>↗</span></a></nav>
   <div className="experience-grid">
    <div className="experience-top-left"><span>01 — THE CNI ECOSYSTEM</span></div><div className="experience-top-middle"><span>Eight divisions, one platform.</span></div><div className="experience-top-right"><span>SAUDI ARABIA · VISION 2030</span></div>
    <div className="experience-story"><p className="experience-overline">THE WAY WE WORK</p><h2>A connected approach<br/>to opportunity.</h2><p>From market entry to real estate, mobility and digital solutions — our specialist divisions work together across the Kingdom.</p><div className="experience-ctas"><a className="btn-light" href="https://crescentnovainternational.com/divisions">Explore divisions</a><a className="btn-outline" href="https://crescentnovainternational.com/contact">Contact us</a></div></div>
    {entries.map(([key,label])=><button key={key} type="button" data-tile={key} className={'experience-tile'+(selected===key?' is-active':'')} aria-pressed={selected===key} onMouseEnter={()=>setSelected(key)} onFocus={()=>setSelected(key)} onClick={e=>{opener.current=e.currentTarget;setSelected(key);setOpen(true);}}><span>{label}</span><span className="experience-tile-hint">Select to explore</span><span className="tile-circle">details <span>↘</span></span></button>)}
   </div>
   {open&&<div className="experience-detail" role="dialog" aria-modal="true" aria-labelledby="experienceDetailTitle"><div className="detail-backdrop" onClick={()=>setOpen(false)}></div><div className="detail-content" tabIndex={-1}><button className="detail-close" ref={close} onClick={()=>setOpen(false)} aria-label="Close">✕</button><p>{detail.number}</p><h3 id="experienceDetailTitle">{detail.title}</h3><p>{detail.text}</p><a href={detail.href}>Explore division ↗</a></div></div>}
  </div>
 </section>;
}
