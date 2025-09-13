import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder } from '@react-three/drei';
import * as THREE from 'three';

export const LightBeams = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  const beams = Array.from({ length: 8 }, (_, i) => ({
    height: 15 + Math.random() * 10,
    radius: 0.05 + Math.random() * 0.03,
    position: [
      (Math.random() - 0.5) * 20,
      0,
      (Math.random() - 0.5) * 20
    ] as [number, number, number],
    speed: 0.5 + Math.random() * 1,
    color: i % 4 === 0 ? "#4ECDC4" : i % 4 === 1 ? "#A78BFA" : i % 4 === 2 ? "#FED7AA" : "#60A5FA"
  }));

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const beam = beams[i];
        const intensity = Math.sin(clock.elapsedTime * beam.speed + i) * 0.5 + 0.5;
        
        // Animate height and opacity
        child.scale.y = intensity;
        child.position.y = (beam.height * intensity) / 2;
        
        // Rotate beams
        child.rotation.y = clock.elapsedTime * 0.3 + i;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {beams.map((beam, i) => (
        <Cylinder
          key={i}
          args={[beam.radius, beam.radius, beam.height, 8]}
          position={beam.position}
        >
          <meshBasicMaterial
            color={beam.color}
            transparent
            opacity={0.4}
            blending={THREE.AdditiveBlending}
          />
        </Cylinder>
      ))}
    </group>
  );
};