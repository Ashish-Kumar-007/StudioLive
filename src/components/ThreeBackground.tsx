import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeBackgroundProps {
  targetCameraPos: { x: number; y: number; z: number };
}

export const ThreeBackground: React.FC<ThreeBackgroundProps> = ({ targetCameraPos }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetPosRef = useRef(targetCameraPos);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Sync props immediately to ref so animate loop has real-time access without re-binding
  useEffect(() => {
    targetPosRef.current = targetCameraPos;
  }, [targetCameraPos]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let particles: THREE.Points;
    const particleCount = 2000;
    const floatingMeshes: THREE.Mesh[] = [];
    let animationFrameId: number;

    // 1. Scene & Fog
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07090E, 0.08);

    // 2. Camera Setup
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(targetPosRef.current.x, targetPosRef.current.y, targetPosRef.current.z);

    // 3. Renderer Setup
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const goldLight = new THREE.DirectionalLight(0xD4AF37, 1.5);
    goldLight.position.set(5, 5, 5);
    scene.add(goldLight);

    const saffronLight = new THREE.DirectionalLight(0xFF7E36, 1.2);
    saffronLight.position.set(-5, -5, 5);
    scene.add(saffronLight);

    // 5. Golden/Amber Particle Field
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const goldColor = new THREE.Color(0xD4AF37);
    const saffronColor = new THREE.Color(0xFF7E36);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 35;
      positions[i + 1] = (Math.random() - 0.5) * 35;
      positions[i + 2] = (Math.random() - 0.5) * 35;

      const mixedColor = goldColor.clone().lerp(saffronColor, Math.random());
      colors[i] = mixedColor.r;
      colors[i + 1] = mixedColor.g;
      colors[i + 2] = mixedColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pMaterial = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    particles = new THREE.Points(particleGeo, pMaterial);
    scene.add(particles);

    // 6. Floating Drifting Icosahedrons
    const meshGeometry = new THREE.IcosahedronGeometry(1.6, 0);
    const meshCount = 8;

    for (let i = 0; i < meshCount; i++) {
      const meshMat = new THREE.MeshBasicMaterial({
        color: 0xD4AF37,
        wireframe: true,
        transparent: true,
        opacity: 0.12,
        blending: THREE.AdditiveBlending,
      });

      const mesh = new THREE.Mesh(meshGeometry, meshMat);
      mesh.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15 - 5
      );

      mesh.userData = {
        rotX: (Math.random() - 0.5) * 0.006,
        rotY: (Math.random() - 0.5) * 0.006,
        rotZ: (Math.random() - 0.5) * 0.006,
        driftSpeed: Math.random() * 0.003,
        driftAngle: Math.random() * Math.PI * 2,
      };

      scene.add(mesh);
      floatingMeshes.push(mesh);
    }

    // 7. Mouse and Resize Handlers
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;

      // Update monospace coordinate display text
      const widget = document.querySelector('.cursor-coordinate-widget');
      if (widget) {
        const xStr = String(Math.round(e.clientX)).padStart(4, '0');
        const yStr = String(Math.round(e.clientY)).padStart(4, '0');
        widget.textContent = `[ X: ${xStr} | Y: ${yStr} ]`;
      }
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove as any);
    window.addEventListener('resize', handleResize);

    // 8. Animation Loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Rotate particle cloud
      if (particles) {
        particles.rotation.y += 0.0006;
        particles.rotation.x += 0.0003;
      }

      // Drift wireframe meshes
      floatingMeshes.forEach((mesh) => {
        mesh.rotation.x += mesh.userData.rotX;
        mesh.rotation.y += mesh.userData.rotY;
        mesh.rotation.z += mesh.userData.rotZ;

        mesh.userData.driftAngle += mesh.userData.driftSpeed;
        mesh.position.y += Math.sin(mesh.userData.driftAngle) * 0.003;
      });

      // Smooth camera interpolation with mouse drift parallax
      const activeTarget = targetPosRef.current;
      const targetCamX = activeTarget.x + mouseRef.current.x * 1.5;
      const targetCamY = activeTarget.y + mouseRef.current.y * 1.5;

      camera.position.x += (targetCamX - camera.position.x) * 0.04;
      camera.position.y += (targetCamY - camera.position.y) * 0.04;
      camera.position.z += (activeTarget.z - camera.position.z) * 0.04;

      camera.lookAt(activeTarget.x, activeTarget.y, 0);

      renderer.render(scene, camera);
    };

    animate();

    // 9. Cleanup on Unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove as any);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      scene.clear();
    };
  }, []);

  return (
    <>
      <div id="webgl-canvas-container" ref={containerRef} />
      <div className="cursor-coordinate-widget font-mono hidden md:block">
        [ X: 0000 | Y: 0000 ]
      </div>
    </>
  );
};
