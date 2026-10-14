'use client';
import {useEffect,useRef,useState} from 'react';
import {divisions} from './content';

const pad=(i:number)=>String(i+1).padStart(2,'0');
export default function DivisionShowcase(){
 const [active,setActive]=useState(0),[fallback,setFallback]=useState(false),[failed,setFailed]=useState(false);
 const root=useRef<HTMLElement>(null),startX=useRef(0);
 const data=divisions[active];
 useEffect(()=>{setFallback(false);setFailed(false);},[active]);
 useEffect(()=>{
  let scheduled=false;
  const update=()=>{scheduled=false;const node=root.current;if(!node||window.innerWidth<=690)return;
   const rect=node.getBoundingClientRect(),length=rect.height-window.innerHeight;if(length<=0)return;
   setActive(Math.min(7,Math.max(0,Math.round(Math.min(1,Math.max(0,-rect.top/length))*7))));};
  const queue=()=>{if(!scheduled){scheduled=true;requestAnimationFrame(update);}};
  window.addEventListener('scroll',queue,{passive:true});window.addEventListener('resize',queue);queue();
  return()=>{window.removeEventListener('scroll',queue);window.removeEventListener('resize',queue);};
 },[]);
 const select=(i:number)=>{const index=Math.min(7,Math.max(0,i));if(window.innerWidth<=690){setActive(index);return;}
  const node=root.current;if(!node)return;const rect=node.getBoundingClientRect();const length=node.offsetHeight-window.innerHeight;
  window.scrollTo({top:window.scrollY+rect.top+index/7*length,behavior:'smooth'});
 };
 return <section className="division-scroll" id="divisions" aria-label="Explore eight flagship divisions" ref={root}>
 <div className="division-sticky"><div className="division-layout">
  <header className="editorial-nav">
   <div className="editorial-nav-left"><a href="#divisions">Divisions</a><a href="#ksa-experience">Opportunity</a></div>
   <a className="editorial-brand" href="https://crescentnovainternational.com/">Crescent Nova<span>International</span></a>
   <div className="editorial-nav-right"><a className="round-icon" aria-label="Contact CNI" href="https://crescentnovainternational.com/contact">↗</a><span className="round-icon decorative" aria-hidden="true">✳</span></div>
  </header>
  <div className="division-workspace">
   <div className="division-numbers" aria-label="Select a division">
    {divisions.map((d,i)=><button key={d.title} type="button" className={'division-number'+(i===active?' is-active':'')} data-hidden={Math.abs(i-active)>1?'true':'false'} aria-label={`Show division ${i+1}: ${d.title}`} aria-current={i===active?'true':undefined} onClick={()=>select(i)}>{pad(i)}{i===active&&<small>• 08</small>}</button>)}
   </div>
   <figure className="division-orbit" aria-label="Selected CNI division visual" onTouchStart={e=>{startX.current=e.touches[0].clientX;}} onTouchEnd={e=>{const dx=e.changedTouches[0].clientX-startX.current;if(Math.abs(dx)>60)select(active+(dx<0?1:-1));}}>
    <div className="division-photo">{!failed&&<img key={`${active}-${fallback}`} src={fallback?data.fallback:data.image} alt={data.alt} onError={()=>fallback?setFailed(true):setFallback(true)}/>}</div>
    <span className="orbit-pin" aria-hidden="true"/><span className="orbit-line" aria-hidden="true"/>
   </figure>
   <div className="division-content" key={active} aria-live="polite">
    <p className="division-kicker">{pad(active)} / 08 · {data.kicker}</p><h2>{data.title}</h2>
    <p className="division-location">{data.location}</p><p className="division-description">{data.description}</p>
   </div>
  </div>
  <footer className="division-footbar"><span className="foot-label">Eight flagship divisions</span><span className="foot-location">{data.location.toUpperCase()}<span className="foot-location-line"/></span><a className="black-link" href={data.href}>Explore division <span aria-hidden="true">↗</span></a></footer>
  <div className="division-scroll-cue" aria-hidden="true">SCROLL TO EXPLORE <span>↓</span></div>
 </div></div>
 </section>;
}
