import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';

function ShoeModel() {
  const modelPath = `${import.meta.env.BASE_URL}futuristicsneaker3dmodel.glb`;
  const { scene } = useGLTF(modelPath);
  const shoeRef = useRef<THREE.Group>(null);
  const scrollY = useRef(0);
  
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state) => {
    if (shoeRef.current) {
      const currentScroll = scrollY.current;
      const vh = window.innerHeight;
      
      const showcaseStart = vh * 0.8;
      const showcaseEnd = vh * 2.2;
      
      let targetScale = isMobile ? 2.5 : 4.0;
      let targetPosX = isMobile ? 0 : 2;
      let targetPosY = isMobile ? 1 : 0;
      
      let scrollFactor = currentScroll * 0.005;
      let baseRotationY = scrollFactor + (state.clock.elapsedTime * 0.5);
      let targetRotationX = Math.sin(scrollFactor) * 0.5;
      
      let progress = 0;
      if (currentScroll > showcaseStart) {
        progress = Math.min(1, (currentScroll - showcaseStart) / (showcaseEnd - showcaseStart));
      }
      
      let targetRotationY = baseRotationY + (progress * Math.PI * 4);
      
      if (currentScroll > showcaseStart) {
        // Spotlight mode!
        // It enlarges, and then goes back to normal when progress == 1
        // We can use a parabola: 1 - Math.pow((progress * 2 - 1), 2) gives 0 at ends and 1 in middle
        const bump = 1 - Math.pow((progress * 2 - 1), 2); // 0 -> 1 -> 0
        
        targetScale = (isMobile ? 2.5 : 4.0) + (bump * 4.0); // Peak scale is +4.0
        targetPosX = targetPosX * (1 - bump); // Move towards center
        targetPosY = targetPosY * (1 - bump); // Move towards center
        targetRotationX = 0.2 * bump; // tilt up when enlarged
      }

      // Smoothly interpolate
      shoeRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
      shoeRef.current.position.lerp(new THREE.Vector3(targetPosX, targetPosY, 0), 0.08);
      
      shoeRef.current.rotation.y = THREE.MathUtils.lerp(shoeRef.current.rotation.y, targetRotationY, 0.08);
      shoeRef.current.rotation.x = THREE.MathUtils.lerp(shoeRef.current.rotation.x, targetRotationX, 0.08);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={shoeRef} scale={isMobile ? 2.5 : 4.0} position={isMobile ? [0, 1, 0] : [2, 0, 0]}>
        <primitive object={scene} />
      </group>
    </Float>
  );
}

export default function ShoeCanvas() {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      // Fade out exactly as the 100vh spotlight space finishes
      const fadeStart = window.innerHeight * 1.5;
      const fadeEnd = window.innerHeight * 2.2;
      const currentScroll = window.scrollY;
      
      if (currentScroll < fadeStart) {
        setOpacity(1);
      } else if (currentScroll > fadeEnd) {
        setOpacity(0);
      } else {
        const progress = (currentScroll - fadeStart) / (fadeEnd - fadeStart);
        setOpacity(1 - progress);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="fixed inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-500" 
      style={{ opacity, display: opacity === 0 ? 'none' : 'block' }}
    >
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <spotLight position={[10, 15, 10]} angle={0.2} penumbra={1} intensity={1.5} castShadow color="#ffffff" />
        <spotLight position={[-10, 10, -10]} angle={0.3} penumbra={1} intensity={1} color="#FAF7F0" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} />
        
        <ShoeModel />

        <Environment preset="city" />
        <ContactShadows position={[0, -3.5, 0]} opacity={0.3} scale={15} blur={2.5} far={4} color="#1E1B16" />
      </Canvas>
    </div>
  );
}

// Note: Preloading with BASE_URL outside component scope can be tricky, 
// but we'll try to provide it if available.
useGLTF.preload(`${import.meta.env.BASE_URL || '/'}futuristicsneaker3dmodel.glb`);
