const fs = require('fs');

try {
  let css = fs.readFileSync('index.css', 'utf8');
  // if it's UTF-16, it has null bytes
  if (css.includes('\0')) {
    css = fs.readFileSync('index.css', 'utf16le');
  }

  const lines = css.split('\n');
  const cleanLines = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('/* Premium UI Overhaul Additions */') || lines[i].includes('/ *   P r e m i u m')) {
      break;
    }
    cleanLines.push(lines[i].replace(/\0/g, ''));
  }

  const addition = `
/* Premium UI Overhaul Additions */
.font-serif {
  font-family: var(--font-serif);
}

.text-editorial {
  font-family: var(--font-serif);
  font-weight: 400;
  font-style: italic;
  letter-spacing: 1px;
}

/* Floating WhatsApp Widget */
.floating-whatsapp {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: #25D366;
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(37, 211, 102, 0.4);
  z-index: 1000;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease;
  text-decoration: none;
}

.floating-whatsapp:hover {
  transform: scale(1.1) translateY(-5px);
  box-shadow: 0 15px 35px rgba(37, 211, 102, 0.5);
}

.floating-whatsapp svg {
  width: 32px;
  height: 32px;
  fill: currentColor;
}

/* Masonry Gallery Grid */
.masonry-grid {
  column-count: 1;
  column-gap: var(--spacing-md);
  margin-top: var(--spacing-xl);
}

@media (min-width: 640px) {
  .masonry-grid {
    column-count: 2;
  }
}

@media (min-width: 1024px) {
  .masonry-grid {
    column-count: 3;
    column-gap: var(--spacing-lg);
  }
}

.masonry-item {
  break-inside: avoid;
  margin-bottom: var(--spacing-md);
  position: relative;
  border-radius: var(--radius-sm);
  overflow: hidden;
  display: block;
}

@media (min-width: 1024px) {
  .masonry-item {
    margin-bottom: var(--spacing-lg);
  }
}

.masonry-img {
  width: 100%;
  display: block;
  transition: transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
  object-fit: cover;
}

.masonry-item:hover .masonry-img {
  transform: scale(1.05);
}

.masonry-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: var(--spacing-lg);
  background: linear-gradient(to top, rgba(48, 54, 79, 0.9) 0%, transparent 100%);
  color: var(--accent-white);
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.4s ease;
}

.masonry-item:hover .masonry-overlay {
  opacity: 1;
  transform: translateY(0);
}

/* Testimonials / Love Stories */
.testimonials-section {
  padding: 100px 0;
  background-color: var(--surface);
  text-align: center;
}

.testimonial-card {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--spacing-xl);
  background: var(--bg-dark);
  border-radius: var(--radius-lg);
  box-shadow: 0 20px 40px rgba(48, 54, 79, 0.05);
  position: relative;
}

.quote-icon {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--accent-primary);
  color: var(--accent-white);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 20px rgba(48, 54, 79, 0.2);
}

.testimonial-text {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  line-height: 1.6;
  color: var(--text-main);
  margin-bottom: var(--spacing-lg);
  margin-top: var(--spacing-md);
  font-style: italic;
}

.testimonial-author {
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--accent-primary);
  font-size: 0.9rem;
}

/* Massive Footer CTA */
.footer-cta {
  background-color: var(--accent-primary);
  color: var(--text-dark);
  text-align: center;
  padding: 120px 20px;
  position: relative;
  overflow: hidden;
}

.footer-cta h2 {
  font-family: var(--font-serif);
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin-bottom: var(--spacing-md);
  color: var(--accent-white);
}

.footer-cta p {
  font-size: 1.2rem;
  opacity: 0.8;
  margin-bottom: var(--spacing-xl);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.footer-cta .btn-primary {
  background-color: var(--surface);
  color: var(--accent-primary);
  border: none;
  font-weight: 600;
  padding: 1.2rem 3rem;
  font-size: 1.1rem;
}

.footer-cta .btn-primary:hover {
  background-color: var(--accent-white);
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(255, 255, 255, 0.2);
}

/* Full Bleed Cinematic Hero Adjustment */
.hero-section {
  min-height: 100vh;
  padding-top: 100px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.hero-grid {
  grid-template-columns: 1fr;
  text-align: center;
  z-index: 10;
  max-width: 1000px;
}

.hero-text h1 {
  font-family: var(--font-serif);
  font-size: clamp(3rem, 8vw, 6rem);
  line-height: 1.1;
  margin-bottom: var(--spacing-md);
  color: var(--accent-primary);
}

.hero-visual {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.hero-visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.15;
}

@media (min-width: 1024px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }
}
`;

  fs.writeFileSync('index.css', cleanLines.join('\n') + addition, 'utf8');
  console.log('Successfully fixed index.css');
} catch (e) {
  console.error(e);
}
