import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sphere, Box, Torus } from '@react-three/drei';
import * as THREE from 'three';

export const FloatingElements = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Wellness Sphere */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={0.5}>
        <Sphere args={[0.8, 32, 32]} position={[-3, 2, -1]}>
          <meshPhysicalMaterial
            color="#4ECDC4"
            roughness={0.1}
            metalness={0.1}
            transmission={0.9}
            transparent
            opacity={0.8}
          />
        </Sphere>
      </Float>

      {/* Calm Torus */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
        <Torus args={[1, 0.3, 16, 32]} position={[3, -1, 1]} rotation={[0.5, 0.5, 0]}>
          <meshPhysicalMaterial
            color="#A78BFA"
            roughness={0.2}
            metalness={0.3}
            transmission={0.7}
            transparent
            opacity={0.9}
          />
        </Torus>
      </Float>

      {/* Support Cube */}
      <Float speed={1} rotationIntensity={2} floatIntensity={0.3}>
        <Box args={[0.6, 0.6, 0.6]} position={[1.5, 3, -2]}>
          <meshPhysicalMaterial
            color="#FED7AA"
            roughness={0.3}
            metalness={0.2}
            transmission={0.5}
            transparent
            opacity={0.85}
          />
        </Box>
      </Float>

      {/* Ocean Sphere */}
      <Float speed={1.8} rotationIntensity={1.5} floatIntensity={0.6}>
        <Sphere args={[0.5, 32, 32]} position={[-1, -2.5, 2]}>
          <meshPhysicalMaterial
            color="#60A5FA"
            roughness={0.1}
            metalness={0.1}
            transmission={0.8}
            transparent
            opacity={0.9}
          />
        </Sphere>
      </Float>

      {/* Small accent spheres */}
      {Array.from({ length: 8 }).map((_, i) => (
        <Float key={i} speed={0.5 + i * 0.2} rotationIntensity={0.2} floatIntensity={0.2}>
          <Sphere
            args={[0.1, 16, 16]}
            position={[
              Math.sin(i * 0.8) * 5,
              Math.cos(i * 0.6) * 3,
              Math.sin(i * 1.2) * 3
            ]}
          >
            <meshBasicMaterial
              color={i % 2 === 0 ? "#4ECDC4" : "#A78BFA"}
              transparent
              opacity={0.6}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  );
};