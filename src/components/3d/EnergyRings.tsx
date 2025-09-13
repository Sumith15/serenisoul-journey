import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Torus } from '@react-three/drei';
import * as THREE from 'three';

export const EnergyRings = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  const rings = Array.from({ length: 12 }, (_, i) => ({
    radius: 0.5 + i * 0.3,
    thickness: 0.02 + i * 0.01,
    speed: 1 + i * 0.1,
    offset: i * Math.PI / 6,
    color: i % 3 === 0 ? "#4ECDC4" : i % 3 === 1 ? "#A78BFA" : "#FED7AA"
  }));

  useFrame(({ clock, mouse }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.2;
      groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.5) * 0.2;
      
      // React to mouse movement
      groupRef.current.position.x = mouse.x * 2;
      groupRef.current.position.y = mouse.y * 2;
      
      groupRef.current.children.forEach((child, i) => {
        const ring = rings[i];
        child.rotation.z = clock.elapsedTime * ring.speed + ring.offset;
        child.rotation.x = Math.sin(clock.elapsedTime * 0.8 + ring.offset) * 0.5;
        
        // Pulsing scale effect
        const scale = 1 + Math.sin(clock.elapsedTime * 2 + ring.offset) * 0.2;
        child.scale.setScalar(scale);
      });
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -3]}>
      {rings.map((ring, i) => (
        <Torus
          key={i}
          args={[ring.radius, ring.thickness, 8, 32]}
          position={[0, 0, i * 0.1]}
        >
          <meshPhysicalMaterial
            color={ring.color}
            transparent
            opacity={0.7 - i * 0.05}
            metalness={0.9}
            roughness={0.1}
            emissive={ring.color}
            emissiveIntensity={0.2}
          />
        </Torus>
      ))}
    </group>
  );
};