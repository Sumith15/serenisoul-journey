import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const ParticleField = () => {
  const meshRef = useRef<THREE.Points>(null);
  
  // Create particle geometry and positions
  const particlesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      // Position particles in a sphere
      const radius = Math.random() * 25 + 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Add colors
      const colorChoice = Math.random();
      if (colorChoice < 0.25) {
        // Wellness green
        colors[i * 3] = 0.31; colors[i * 3 + 1] = 0.8; colors[i * 3 + 2] = 0.77;
      } else if (colorChoice < 0.5) {
        // Calm purple  
        colors[i * 3] = 0.66; colors[i * 3 + 1] = 0.55; colors[i * 3 + 2] = 0.98;
      } else if (colorChoice < 0.75) {
        // Support orange
        colors[i * 3] = 1; colors[i * 3 + 1] = 0.84; colors[i * 3 + 2] = 0.67;
      } else {
        // Ocean blue
        colors[i * 3] = 0.38; colors[i * 3 + 1] = 0.65; colors[i * 3 + 2] = 0.98;
      }
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    return geometry;
  }, []);
  
  // Animation loop
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < positions.length; i += 3) {
        // Create wave motion
        positions[i + 1] += Math.sin(clock.elapsedTime * 0.5 + positions[i] * 0.01) * 0.002;
        positions[i] += Math.cos(clock.elapsedTime * 0.3 + positions[i + 2] * 0.01) * 0.001;
      }
      
      meshRef.current.geometry.attributes.position.needsUpdate = true;
      meshRef.current.rotation.y = clock.elapsedTime * 0.05;
    }
  });
  
  return (
    <points ref={meshRef} geometry={particlesGeometry}>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};