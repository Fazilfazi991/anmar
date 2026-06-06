const fs = require('fs');

const path = 'c:\\Users\\Perfect Elect\\Desktop\\Website Projects\\Anmar logistics\\index.html';
let content = fs.readFileSync(path, 'utf8');

const sliderCSS = `
    .hero-slider {
      position: relative;
      height: 620px;
      overflow: hidden;
      background: #04162c;
    }
    @media (max-width: 760px) {
      .hero-slider { height: 500px; }
    }
    .slide {
      position: absolute;
      inset: 0;
      opacity: 0;
      transition: opacity 0.8s ease-in-out, transform 4s ease-out;
      background-size: cover;
      background-position: center;
      transform: scale(1.05);
    }
    .slide.active {
      opacity: 1;
      z-index: 1;
      transform: scale(1);
    }
    .slide::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, rgba(4,22,44,0.92) 0%, rgba(4,22,44,0.6) 40%, rgba(4,22,44,0.1) 100%);
    }
    .slide-content {
      position: relative;
      z-index: 2;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-bottom: 40px;
    }
    .slide h1, .slide .lead {
      color: #fff;
    }
    .slide h1 span {
      color: var(--gold);
    }
    .slide .eyebrow {
      color: var(--gold);
      border-color: rgba(216, 180, 106, 0.4);
      background: rgba(216, 180, 106, 0.1);
    }
    .slider-nav {
      position: absolute;
      bottom: 80px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 5;
      display: flex;
      gap: 12px;
    }
    .slider-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: rgba(255,255,255,0.3);
      cursor: pointer;
      border: none;
      padding: 0;
      transition: background 0.3s, transform 0.3s;
    }
    .slider-dot.active {
      background: var(--gold);
      transform: scale(1.3);
    }
    .slider-arrows {
      position: absolute;
      top: 50%;
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      z-index: 5;
      transform: translateY(-50%);
      pointer-events: none;
    }
    .slider-arrow {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      color: #fff;
      display: grid;
      place-items: center;
      cursor: pointer;
      pointer-events: auto;
      backdrop-filter: blur(4px);
      transition: background 0.2s, transform 0.2s;
    }
    .slider-arrow:hover {
      background: rgba(255,255,255,0.25);
      transform: scale(1.05);
    }
    .quote-bar-wrapper {
      position: relative;
      z-index: 10;
      margin-top: -60px;
    }
`;

// Insert slider CSS just before </style>
content = content.replace('</style>', sliderCSS + '\n  </style>');

// Remove the old hero CSS
content = content.replace(/\.hero\s*{[\s\S]*?overflow:\s*hidden;\s*}/, '');
content = content.replace(/\.hero-grid\s*{[\s\S]*?align-items:\s*center;\s*}/, '');
content = content.replace(/\.hero-copy\s*{[\s\S]*?gap:\s*24px;\s*}/, '');
content = content.replace(/\.hero-actions\s*{[\s\S]*?align-items:\s*center;\s*}/, '.hero-actions { display: flex; flex-wrap: wrap; gap: 14px; align-items: center; }');
content = content.replace(/\.hero-points\s*{[\s\S]*?gap:\s*10px;\s*}/, '.hero-points { display: flex; flex-wrap: wrap; gap: 10px; }');
content = content.replace(/\.hero-points\sspan\s*{[\s\S]*?font-weight:\s*700;\s*}/, '.hero-points span { display: inline-flex; align-items: center; gap: 7px; padding: 8px 11px; border: 1px solid rgba(255,255,255,0.2); border-radius: 999px; background: rgba(255,255,255,0.1); color: #fff; font-size: 13px; font-weight: 700; backdrop-filter: blur(4px); }');
content = content.replace(/\.hero-media\s*{[\s\S]*?position:\s*relative;\s*}/, '');
content = content.replace(/\.hero-photo\s*{[\s\S]*?box-shadow:\s*var\(--shadow\);\s*}/, '');
content = content.replace(/\.hero-photo\simg\s*{[\s\S]*?object-fit:\s*cover;\s*}/, '');
content = content.replace(/\.hero-photo::after\s*{[\s\S]*?rgba\(46,49,48,0\.78\)\);\s*}/, '');

const sliderHTML = `
    <section class="hero-slider">
      <div class="slide active" style="background-image: url('assets/warehouse-hero.png');">
        <div class="container slide-content">
          <div style="max-width: 680px; display: grid; gap: 24px;">
            <span class="eyebrow">Strategic Warehousing</span>
            <h1>Reliable Warehousing <span>in Riyadh</span></h1>
            <p class="lead">Secure and flexible storage solutions for medical, food, cosmetics, and retail businesses. Built for scale, designed for compliance, and supported by our dedicated local team.</p>
            <div class="hero-actions">
              <a class="btn" href="#quote">Request a Quote <span aria-hidden="true">-></span></a>
              <a class="btn secondary" href="#locations" style="color: #fff; border-color: rgba(255,255,255,0.4);">Explore Operations</a>
            </div>
            <div class="hero-points" aria-label="Service highlights">
              <span>SFDA-ready handling</span>
              <span>FIFO / FEFO inventory</span>
              <span>Same-day quote review</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="slide" style="background-image: url('assets/food-warehouse.png');">
        <div class="container slide-content">
          <div style="max-width: 680px; display: grid; gap: 24px;">
            <span class="eyebrow">Temperature Controlled</span>
            <h1>Specialized <span>Food Storage</span></h1>
            <p class="lead">Hygienic storage for packaged, chilled, frozen, and dry food products with dependable handling and route planning support.</p>
            <div class="hero-actions">
              <a class="btn" href="#quote">Get Pricing <span aria-hidden="true">-></span></a>
            </div>
            <div class="hero-points" aria-label="Service highlights">
              <span>Ambient to Frozen</span>
              <span>Daily Reporting</span>
            </div>
          </div>
        </div>
      </div>

      <div class="slide" style="background-image: url('assets/medical-warehouse.png');">
        <div class="container slide-content">
          <div style="max-width: 680px; display: grid; gap: 24px;">
            <span class="eyebrow">SFDA Compliant</span>
            <h1>Secure <span>Medical Logistics</span></h1>
            <p class="lead">Compliant storage for pharmaceuticals and medical devices. We maintain the highest standards of cleanliness, security, and climate control.</p>
            <div class="hero-actions">
              <a class="btn" href="#quote">Request a Quote <span aria-hidden="true">-></span></a>
            </div>
            <div class="hero-points" aria-label="Service highlights">
              <span>24/7 Monitoring</span>
              <span>Strict Compliance</span>
            </div>
          </div>
        </div>
      </div>

      <div class="slider-arrows container" style="position: absolute; left: 50%; transform: translate(-50%, -50%);">
        <button class="slider-arrow prev" aria-label="Previous slide">
          <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button class="slider-arrow next" aria-label="Next slide">
          <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
      
      <div class="slider-nav">
        <button class="slider-dot active" aria-label="Go to slide 1"></button>
        <button class="slider-dot" aria-label="Go to slide 2"></button>
        <button class="slider-dot" aria-label="Go to slide 3"></button>
      </div>
    </section>

    <div class="container quote-bar-wrapper">
      <div class="quote-bar" id="quote">
`;

// Replace the old hero HTML section up to quote-bar
const heroRegex = /<section class="hero">[\s\S]*?<div class="quote-bar" id="quote">/;
content = content.replace(heroRegex, sliderHTML);

// Also need to remove the `.stats` and `.stat` CSS as they were part of the image overlay
content = content.replace(/\.stats\s*{[\s\S]*?gap:\s*10px;\s*}/, '');
content = content.replace(/\.stat\s*{[\s\S]*?backdrop-filter:\s*blur\(12px\);\s*}/, '');
content = content.replace(/\.stat\sstrong\s*{[\s\S]*?line-height:\s*1;\s*}/, '');
content = content.replace(/\.stat\sspan\s*{[\s\S]*?font-size:\s*12px;\s*}/, '');

// Add slider javascript before </body>
const sliderJS = \`
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.slider-arrow.prev');
    const nextBtn = document.querySelector('.slider-arrow.next');
    let currentSlide = 0;
    let slideInterval;

    function goToSlide(index) {
      slides[currentSlide].classList.remove('active');
      dots[currentSlide].classList.remove('active');
      currentSlide = (index + slides.length) % slides.length;
      slides[currentSlide].classList.add('active');
      dots[currentSlide].classList.add('active');
    }

    function nextSlide() { goToSlide(currentSlide + 1); }
    function prevSlide() { goToSlide(currentSlide - 1); }

    function startSlider() {
      slideInterval = setInterval(nextSlide, 6000);
    }
    function resetSlider() {
      clearInterval(slideInterval);
      startSlider();
    }

    nextBtn.addEventListener('click', () => { nextSlide(); resetSlider(); });
    prevBtn.addEventListener('click', () => { prevSlide(); resetSlider(); });

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        goToSlide(index);
        resetSlider();
      });
    });

    startSlider();
\`;
content = content.replace('</body>', sliderJS + '\\n</body>');

fs.writeFileSync(path, content);
console.log('Slider added successfully!');
