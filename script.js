// ── HEADER SCROLL ──
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
});

// ── MOBILE NAV ──
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
const closeNav = document.getElementById('closeNav');

hamburger.addEventListener('click', () => mobileNav.classList.add('open'));
closeNav.addEventListener('click', () => mobileNav.classList.remove('open'));

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => mobileNav.classList.remove('open'));
});

// ── CAROUSEL ──
const track = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentIndex = 0;

function getVisibleCount() {
  return window.innerWidth <= 900 ? 1 : 2;
}

function getCardWidth() {
  const wrap = track.parentElement;
  const visible = getVisibleCount();
  const gap = 28;
  return (wrap.offsetWidth - gap * (visible - 1)) / visible;
}

function updateCarousel() {
  const total = track.children.length;
  const visible = getVisibleCount();
  const maxIndex = total - visible;
  currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));

  const cardW = getCardWidth();
  const gap = 28;
  const offset = currentIndex * (cardW + gap);
  track.style.transform = `translateX(-${offset}px)`;

  Array.from(track.children).forEach(card => {
    card.style.flex = `0 0 ${cardW}px`;
  });
}

prevBtn.addEventListener('click', () => { currentIndex--; updateCarousel(); });
nextBtn.addEventListener('click', () => { currentIndex++; updateCarousel(); });
window.addEventListener('resize', updateCarousel);
updateCarousel();

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => observer.observe(el));

// ── FORM SUBMIT ──
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = this.querySelector('.form-submit');
    btn.textContent = '...';
    btn.disabled = true;

    const data = new FormData(this);
    await fetch('https://formspree.io/f/maqddkjo', {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    window.location.href = 'thanks.html';
  });
}

// ── SCROLL TO TOP ──
const scrollTopBtn = document.getElementById('scrollTopBtn');
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const toggleScrollTop = () => {
    const showAfter = 200;
    if (window.scrollY > showAfter) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  };

  toggleScrollTop();
  window.addEventListener('scroll', toggleScrollTop, { passive: true });
}
