import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// Initialize vector icons
if (window.lucide) {
  window.lucide.createIcons();
}

/* =========================================================================
   1. LENIS SMOOTH SCROLL & GSAP TICKER
   ========================================================================= */
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 1.5,
  infinite: false,
});

// Update ScrollTrigger on Lenis scroll
lenis.on('scroll', ScrollTrigger.update);

// Sync GSAP ticker with Lenis requestAnimationFrame
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

/* =========================================================================
   2. THREE.JS 3D PARTICLES & FLOATING GEOMETRY
   ========================================================================= */
let scene, camera, renderer, particles, particleCount = 2000;
let floatingMeshes = [];
let mouseX = 0, mouseY = 0;
let targetCameraPos = { x: 0, y: 0, z: 8 };

function initThree() {
  const container = document.getElementById('webgl-canvas-container');
  if (!container) return;

  // Scene setup
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x07090E, 0.08);

  // Camera setup
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(targetCameraPos.x, targetCameraPos.y, targetCameraPos.z);

  // Renderer setup
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Ambient & Directional Lights for Mesh reflections
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const goldLight = new THREE.DirectionalLight(0xD4AF37, 1.5);
  goldLight.position.set(5, 5, 5);
  scene.add(goldLight);

  const saffronLight = new THREE.DirectionalLight(0xFF7E36, 1.2);
  saffronLight.position.set(-5, -5, 5);
  scene.add(saffronLight);

  // 1. Particle System (Warm Golden/Amber Field)
  const particleGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const goldColor = new THREE.Color(0xD4AF37);
  const saffronColor = new THREE.Color(0xFF7E36);

  for (let i = 0; i < particleCount * 3; i += 3) {
    // Spread particles in a wide 3D sphere/box bounds
    positions[i] = (Math.random() - 0.5) * 35;
    positions[i + 1] = (Math.random() - 0.5) * 35;
    positions[i + 2] = (Math.random() - 0.5) * 35;

    // Mix saffron and gold colors
    const mixedColor = goldColor.clone().lerp(saffronColor, Math.random());
    colors[i] = mixedColor.r;
    colors[i + 1] = mixedColor.g;
    colors[i + 2] = mixedColor.b;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  // Point texture/shader
  const pMaterial = new THREE.PointsMaterial({
    size: 0.12,
    vertexColors: true,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  particles = new THREE.Points(particleGeo, pMaterial);
  scene.add(particles);

  // 2. Floating Wireframe Geometric Meshes (Translucent Glass/Outline)
  const meshGeometry = new THREE.IcosahedronGeometry(1.6, 0);
  const meshCount = 8;

  for (let i = 0; i < meshCount; i++) {
    const meshMat = new THREE.MeshBasicMaterial({
      color: 0xD4AF37,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending
    });

    const mesh = new THREE.Mesh(meshGeometry, meshMat);
    
    // Spread in 3D scene boundaries
    mesh.position.set(
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 15 - 5
    );

    // Random rotation speeds
    mesh.userData = {
      rotX: (Math.random() - 0.5) * 0.006,
      rotY: (Math.random() - 0.5) * 0.006,
      rotZ: (Math.random() - 0.5) * 0.006,
      driftSpeed: Math.random() * 0.003,
      driftAngle: Math.random() * Math.PI * 2
    };

    scene.add(mesh);
    floatingMeshes.push(mesh);
  }

  // Mouse Move listener for 3D coordinate tracking and camera parallax
  window.addEventListener('mousemove', (e) => {
    // Parallax values clamped between -1 and 1
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    
    // Update YK Produce coordinate widget text
    const widget = document.querySelector('.cursor-coordinate-widget');
    if (widget) {
      const xStr = String(Math.round(e.clientX)).padStart(4, '0');
      const yStr = String(Math.round(e.clientY)).padStart(4, '0');
      widget.textContent = `[ X: ${xStr} | Y: ${yStr} ]`;
    }
  });

  // Resize handler
  window.addEventListener('resize', onWindowResize);
  
  // Start animation loop
  animate();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  // Slow particle drift rotation
  if (particles) {
    particles.rotation.y += 0.0006;
    particles.rotation.x += 0.0003;
  }

  // Rotate & drift floating wireframe meshes
  floatingMeshes.forEach((mesh) => {
    mesh.rotation.x += mesh.userData.rotX;
    mesh.rotation.y += mesh.userData.rotY;
    mesh.rotation.z += mesh.userData.rotZ;

    // Subtle floating drift
    mesh.userData.driftAngle += mesh.userData.driftSpeed;
    mesh.position.y += Math.sin(mesh.userData.driftAngle) * 0.003;
  });

  // Smooth lerp camera position to active page target coordinates + mouse parallax offset
  const targetX = targetCameraPos.x + mouseX * 1.5;
  const targetY = targetCameraPos.y + mouseY * 1.5;
  
  camera.position.x += (targetX - camera.position.x) * 0.04;
  camera.position.y += (targetY - camera.position.y) * 0.04;
  camera.position.z += (targetCameraPos.z - camera.position.z) * 0.04;

  camera.lookAt(targetCameraPos.x, targetCameraPos.y, 0);

  renderer.render(scene, camera);
}

/* =========================================================================
   3. IMMERSIVE VIRTUAL ROUTER & CAMERA-SHUTTER SWEEPS
   ========================================================================= */
const pagePositions = {
  home: { x: 0, y: 0, z: 8 },
  story: { x: 6, y: 3, z: 10 },
  events: { x: -6, y: -2, z: 9 },
  team: { x: 4, y: -5, z: 11 },
  book: { x: 0, y: 5, z: 8.5 }
};

let activePageId = 'home';
let isTransitioning = false;

function initAperture() {
  // Reveal the initial home page smoothly on load by sweeping aperture to 150%
  const aperture = document.querySelector('.aperture-overlay');
  if (aperture) {
    const radiusObj = { value: 0 };
    gsap.to(radiusObj, {
      value: 150,
      duration: 1.5,
      ease: 'power3.inOut',
      onUpdate: () => {
        aperture.style.setProperty('--aperture-radius', `${radiusObj.value}%`);
      },
      onComplete: () => {
        // Re-init ScrollTrigger reveals
        initScrollReveals();
      }
    });
  }
}

function handlePageTransition(targetPageId) {
  if (targetPageId === activePageId || isTransitioning) return;
  isTransitioning = true;

  const aperture = document.querySelector('.aperture-overlay');
  
  // Close Lenis wheel and lock scroll during camera swap
  lenis.stop();

  const radiusObj = { value: 150 };

  // 1. Sweep camera shutter aperture closed (circle radius 0%)
  const tl = gsap.timeline({
    onComplete: () => {
      // 2. Perform Virtual page panel display update inside the dark shutter cover
      const allPanels = document.querySelectorAll('.page-panel');
      allPanels.forEach(panel => {
        panel.classList.remove('active-page');
      });

      const activePanel = document.getElementById(`page-${targetPageId}`);
      if (activePanel) {
        activePanel.classList.add('active-page');
      }

      // Reset Lenis scrolling position back to top immediately
      lenis.scrollTo(0, { immediate: true });

      // Update Nav links active stylesheet indicators
      const allLinks = document.querySelectorAll('.nav-links a');
      allLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === targetPageId) {
          link.classList.add('active');
        }
      });

      // Update Three.js camera coordinate vector target
      if (pagePositions[targetPageId]) {
        targetCameraPos = pagePositions[targetPageId];
      }

      activePageId = targetPageId;

      // 3. Clear existing ScrollTrigger markers and rebuild reveals on target page
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // Delay opening lens shutter to sync with smooth WebGL camera orbit glide
      setTimeout(() => {
        const reopenObj = { value: 0 };
        gsap.to(reopenObj, {
          value: 150,
          duration: 1.4,
          ease: 'power3.inOut',
          onUpdate: () => {
            if (aperture) {
              aperture.style.setProperty('--aperture-radius', `${reopenObj.value}%`);
            }
          },
          onComplete: () => {
            isTransitioning = false;
            lenis.start();
            initScrollReveals();
          }
        });
      }, 350);
    }
  });

  tl.to(radiusObj, {
    value: 0,
    duration: 1.2,
    ease: 'power3.inOut',
    onUpdate: () => {
      if (aperture) {
        aperture.style.setProperty('--aperture-radius', `${radiusObj.value}%`);
      }
    }
  });
}

/* =========================================================================
   4. 3D DOOR-OPENING & TRAPDOOR SCROLL REVEALS
   ========================================================================= */
function initScrollReveals() {
  const activePanel = document.getElementById(`page-${activePageId}`);
  if (!activePanel) return;

  const reveals = activePanel.querySelectorAll('.reveal');
  
  reveals.forEach((el, index) => {
    // Alternates visual hinges: Even index swings Left door, Odd index folds down Top trapdoor
    const isEven = index % 2 === 0;

    gsap.fromTo(el,
      {
        opacity: 0,
        rotationX: isEven ? 0 : -25,
        rotationY: isEven ? -25 : 0,
        z: -120,
        transformPerspective: 1200,
        transformOrigin: isEven ? 'left center' : 'top center'
      },
      {
        opacity: 1,
        rotationX: 0,
        rotationY: 0,
        z: 0,
        duration: 1.4,
        ease: 'power2.out',
        clearProps: 'transform',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
          // once entry completes, clean indicators
        }
      }
    );
  });
}

/* =========================================================================
   5. BIND ROUTER CLICKS & MENU TRIGGERS
   ========================================================================= */
function initNavigationListeners() {
  // Logo & link clicks
  const links = document.querySelectorAll('[data-page]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.getAttribute('data-page');
      handlePageTransition(page);
      
      // Close mobile drawer if active
      const mobileNav = document.querySelector('.nav-links');
      if (mobileNav) {
        mobileNav.classList.remove('mobile-active');
      }
    });
  });

  // Dynamic booking trigger buttons (Book Now CTAs)
  const bookingButtons = document.querySelectorAll('[data-navigate]');
  bookingButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const page = btn.getAttribute('data-navigate');
      handlePageTransition(page);
    });
  });

  // Mobile navigation drawer toggle
  const toggle = document.querySelector('.mobile-nav-toggle');
  const nav = document.querySelector('.nav-links');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('mobile-active');
    });
  }
}

/* =========================================================================
   INITIALIZATION TRIGGER
   ========================================================================= */
window.addEventListener('DOMContentLoaded', () => {
  initThree();
  initAperture();
  initNavigationListeners();
});
