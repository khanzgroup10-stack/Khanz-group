/** KHANZ BUSINESS UNIVERSE - Original Flat Layout logic */
const businesses = [
  { title: 'Voyant Eye + Kidstoons', kicker: 'Marketing & Edutainment', location: 'Marketing & Edutainment', description: 'Two dynamic brands under one umbrella. Voyant Eye offers premium marketing, while Kidstoons provides engaging edutainment.', image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=1200', fallback: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=1200', alt: 'Voyant Eye & Kidstoons', href: '' },
  { title: 'Crypfo', kicker: 'Stock Market', location: 'Financial Services', description: 'Advanced financial insights and stock market solutions.', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200', fallback: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200', alt: 'Crypfo Stock Market', href: 'http://localhost:5173/divisions/crypfo' },
  { title: "That's It", kicker: "Men's only Brand", location: "Men's Fashion", description: 'Premium menswear and lifestyle branding.', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1200', fallback: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1200', alt: "That's It Men's Brand", href: 'http://localhost:5173/divisions/thats-it' },
  { title: 'Minal Collection', kicker: "Women's Brand", location: "Women's Fashion", description: 'Elegant womenswear and premium fashion collections.', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200', fallback: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200', alt: 'Minal Collection', href: 'http://localhost:5173/divisions/minal' },
  { title: 'Kash Medical Complex', kicker: 'Healthcare', location: 'Healthcare Services', description: 'State-of-the-art healthcare facilities and wellness services.', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200', fallback: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200', alt: 'Kash Medical Complex', href: '' },
  { title: 'Food Business', kicker: 'Coming Soon', location: 'Food & Beverage', description: 'Curated dining experiences and premium food services coming soon.', image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1200', fallback: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1200', alt: 'Food Business', href: '' },
  { title: 'KHANZ Housing Society', kicker: 'Real Estate', location: 'Real Estate', description: 'Commercial, residential and industrial property opportunities.', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200', fallback: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200', alt: 'KHANZ Housing Society', href: '' },
  { title: 'Kash Electronics', kicker: 'Electronics & Repair Lab', location: 'Technology', description: 'Premium mobile devices, laptops, photography gear, and professional repair services.', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1200', fallback: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1200', alt: 'Kash Electronics', href: 'http://localhost:5173/divisions/kash-electronics' },
  { title: 'KHANZ Motors', kicker: 'Mobility', location: 'Automotive', description: 'Premium bikes, cars, and commercial mobility solutions.', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200', fallback: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200', alt: 'KHANZ Motors', href: '' },
  { title: 'Coming Soon', kicker: 'Future Venture', location: 'Innovation', description: 'Expanding the KHANZ universe with new opportunities.', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200', fallback: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200', alt: 'Future Venture', href: '' }
];
const pad = n => String(n + 1).padStart(2, '0');
const numWrap = document.getElementById('divisionNumbers');
const imgLayer0 = document.getElementById('imgLayer0');
const imgLayer1 = document.getElementById('imgLayer1');
const imgLayer2 = document.getElementById('imgLayer2');
const content = document.querySelector('.division-content');
const currentTitle = document.getElementById('divisionTitle');
const currentDesc = document.getElementById('divisionDescription');
const currentKicker = document.getElementById('divisionKicker');
const currentLocation = document.getElementById('divisionLocation');
const currentPlace = document.getElementById('divisionPlace');
const currentLink = document.getElementById('divisionLink');
const exploreBtn = document.getElementById('divisionExploreBtn');
const root = document.getElementById('divisions');
let current = 0, updateToken = 0, framePending = false;

function drawNumbers() {
  numWrap.innerHTML = '';
  for (let i = 0; i < businesses.length; i++) {
    const b = document.createElement('button');
    b.className = 'division-number' + (i === current ? ' is-active' : '');
    b.dataset.index = String(i);
    b.type = 'button';
    b.setAttribute('aria-label', `Show division ${i + 1}: ${businesses[i].title}`);
    b.setAttribute('aria-current', i === current ? 'true' : 'false');
    const delta = Math.abs(i - current);
    b.dataset.hidden = delta > 1 ? 'true' : 'false';
    b.innerHTML = `${pad(i)}${i === current ? '<small>• 10</small>' : ''}`;
    b.addEventListener('click', () => selectDivision(i, true));
    numWrap.appendChild(b);
  }
}

function selectDivision(index, scrollToIndex = false) {
  index = Math.max(0, Math.min(businesses.length - 1, index));
  if (index !== current || !currentTitle.textContent.trim()) {
    current = index;
    const myToken = ++updateToken;
    content.classList.add('is-changing');
    window.setTimeout(() => {
      if (myToken !== updateToken) return;
      const item = businesses[index];
      currentTitle.textContent = item.title;
      currentKicker.textContent = `${pad(index)} / 10 · ${item.kicker}`;
      currentDesc.textContent = item.description;
      if (currentLocation) currentLocation.textContent = item.location;
      if (currentPlace) currentPlace.textContent = item.location.toUpperCase();
      if (currentLink) currentLink.href = item.href || '#';
      if (exploreBtn) {
        exploreBtn.removeAttribute('disabled');
        exploreBtn.href = item.href || '#';
      }
      drawNumbers();
      content.classList.remove('is-changing');
    }, 185);
  } else {
    drawNumbers();
  }
  if (scrollToIndex && window.matchMedia('(min-width:691px)').matches) {
    const rect = root.getBoundingClientRect(), travel = root.offsetHeight - window.innerHeight;
    window.scrollTo({ top: window.scrollY + rect.top + (index / (businesses.length - 1)) * travel, behavior: 'smooth' });
  }
}

function syncToScroll() {
  framePending = false;
  if (window.matchMedia('(max-width:690px)').matches) {
    imgLayer0.src = businesses[current].image;
    imgLayer1.style.setProperty('--wipe-angle-dark', '0deg');
    imgLayer2.style.setProperty('--wipe-angle-bright', '0deg');
    return;
  }
  const rect = root.getBoundingClientRect(), travel = rect.height - window.innerHeight;
  if (travel <= 0) return;

  const progress = Math.min(1, Math.max(0, -rect.top / travel));
  const exactProgress = progress * (businesses.length - 1);
  const activeIndex = Math.min(businesses.length - 1, Math.max(0, Math.round(exactProgress)));

  if (activeIndex !== current) selectDivision(activeIndex, false);

  const fromIndex = Math.floor(exactProgress);
  const toIndex = Math.min(businesses.length - 1, Math.ceil(exactProgress));
  const localProgress = exactProgress - fromIndex;

  imgLayer0.src = businesses[fromIndex].image;
  if (toIndex !== fromIndex) {
    imgLayer1.src = businesses[toIndex].image;
    imgLayer2.src = businesses[toIndex].image;
  }

  let darkAngle = 0;
  let brightAngle = 0;

  if (localProgress > 0) {
    if (localProgress <= 0.5) {
      darkAngle = (localProgress * 2) * 360;
      brightAngle = 0;
    } else {
      darkAngle = 360;
      brightAngle = ((localProgress - 0.5) * 2) * 360;
    }
  }

  imgLayer1.style.setProperty('--wipe-angle-dark', `${darkAngle}deg`);
  imgLayer2.style.setProperty('--wipe-angle-bright', `${brightAngle}deg`);
}

window.addEventListener('scroll', () => {
  if (!framePending) {
    framePending = true;
    requestAnimationFrame(syncToScroll);
  }
}, { passive: true });
window.addEventListener('resize', syncToScroll);
imgLayer0.src = businesses[0].image;
drawNumbers();
syncToScroll();

// Mobile swipe logic
let touchX = 0;
const orbit = document.querySelector('.division-orbit');
if (orbit) {
  orbit.addEventListener('touchstart', e => touchX = e.touches[0].clientX, { passive: true });
  orbit.addEventListener('touchend', e => {
    let dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 60) selectDivision(current + (dx < 0 ? 1 : -1), false);
  }, { passive: true });
}

// Division Modal Logic
const divisionModal = document.getElementById('divisionModal');
const divisionModalCloseBtn = document.getElementById('divisionModalClose');

if (exploreBtn && divisionModal) {
  exploreBtn.addEventListener('click', (e) => {
    const item = businesses[current];
    if (!item.href || item.href.startsWith('#')) {
      e.preventDefault();
      document.getElementById('divisionModalTitle').textContent = item.title;
      document.getElementById('divisionModalKicker').textContent = item.kicker;
      document.getElementById('divisionModalDesc').textContent = item.description;
      document.getElementById('divisionModalImage').src = item.image;

      if (item.kicker.toLowerCase().includes('coming soon')) {
        document.getElementById('divisionModalComingSoon').style.display = 'inline-block';
      } else {
        document.getElementById('divisionModalComingSoon').style.display = 'none';
      }

      divisionModal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
  });

  const closeDivModal = () => {
    divisionModal.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  if (divisionModalCloseBtn) {
    divisionModalCloseBtn.addEventListener('click', closeDivModal);
  }

  divisionModal.addEventListener('click', (e) => {
    if (e.target === divisionModal) {
      closeDivModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && divisionModal.classList.contains('is-open')) {
      closeDivModal();
    }
  });
}

// Section 3 Tiles Logic
const tiles = { business: { number: '01 / 10', title: 'Voyant Eye + Kidstoons', text: 'Marketing & Edutainment solutions.', href: '#voyant' }, mobility: { number: '09 / 10', title: 'KHANZ Motors', text: 'Premium mobility solutions.', href: '#motors' }, realestate: { number: '07 / 10', title: 'KHANZ Housing Society', text: 'Real estate opportunities.', href: '#housing' }, digital: { number: '08 / 10', title: 'Kash Electronics', text: 'Premium devices, accessories & repair lab.', href: 'http://localhost:5173/divisions/kash-electronics' }, hospitality: { number: '06 / 10', title: 'Food Business', text: 'Coming soon - premium food services.', href: '#food' } };
const tileButtons = [...document.querySelectorAll('.experience-tile')], dialog = document.getElementById('experienceDetail'), close = document.getElementById('detailClose'); let lastOpener = null;
function openDetail(tile) { lastOpener = tile; const d = tiles[tile.dataset.tile]; if (!d) return; tileButtons.forEach(t => { t.classList.toggle('is-active', t === tile); t.setAttribute('aria-pressed', String(t === tile)); }); document.getElementById('experienceDetailNumber').textContent = d.number; document.getElementById('experienceDetailTitle').textContent = d.title; document.getElementById('experienceDetailCopy').textContent = d.text; document.getElementById('experienceDetailLink').href = d.href; dialog.hidden = false; document.body.style.overflow = 'hidden'; if (close) close.focus(); }
function closeDetail() { dialog.hidden = true; document.body.style.overflow = ''; lastOpener?.focus(); }
tileButtons.forEach(t => { t.addEventListener('click', () => openDetail(t)); t.addEventListener('mouseenter', () => { tileButtons.forEach(x => x.classList.toggle('is-active', x === t)); }); });
if (close) close.addEventListener('click', closeDetail);
const closeBtn = document.querySelector('[data-close-detail]');
if (closeBtn) closeBtn.addEventListener('click', closeDetail);
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !dialog.hidden) closeDetail(); });
const experience = document.querySelector('.experience'); if ('IntersectionObserver' in window) { new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) experience.classList.add('is-visible'); }), { threshold: .12 }).observe(experience) } else experience.classList.add('is-visible');
