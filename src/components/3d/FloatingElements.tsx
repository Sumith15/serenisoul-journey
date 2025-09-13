import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, Sphere, Box, Torus, MeshDistortMaterial, MeshWobbleMaterial, Dodecahedron, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

export const FloatingElements = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse, viewport } = useThree();
  
  // Create particle system
  const particleCount = 100;
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < particleCount; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20
        ],
        scale: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 0.02 + 0.01
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Enhanced rotation with mouse interaction
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1 + mouse.x * 0.1;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.1) * 0.05 + mouse.y * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Enhanced Wellness Sphere with Distortion */}
      <Float speed={2} rotationIntensity={2} floatIntensity={1.2}>
        <Sphere args={[1.2, 64, 64]} position={[-3, 2, -1]}>
          <MeshDistortMaterial
            color="#4ECDC4"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.1}
            metalness={0.2}
            transparent
            opacity={0.8}
          />
        </Sphere>
      </Float>

      {/* Morphing Torus with Wobble Effect */}
      <Float speed={2.5} rotationIntensity={1.8} floatIntensity={1.5}>
        <Torus args={[1.2, 0.4, 32, 64]} position={[3, -1, 1]} rotation={[0.5, 0.5, 0]}>
          <MeshWobbleMaterial
            color="#A78BFA"
            attach="material"
            factor={0.6}
            speed={1.5}
            roughness={0.1}
            metalness={0.3}
            transparent
            opacity={0.9}
          />
        </Torus>
      </Float>

      {/* Dynamic Support Cube with Enhanced Material */}
      <Float speed={1.8} rotationIntensity={3} floatIntensity={0.8}>
        <Box args={[0.8, 0.8, 0.8]} position={[1.5, 3, -2]}>
          <meshPhysicalMaterial
            color="#FED7AA"
            roughness={0.1}
            metalness={0.5}
            transmission={0.3}
            transparent
            opacity={0.9}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </Box>
      </Float>

      {/* Animated Ocean Sphere with Distortion */}
      <Float speed={2.2} rotationIntensity={2.5} floatIntensity={1.0}>
        <Sphere args={[0.7, 64, 64]} position={[-1, -2.5, 2]}>
          <MeshDistortMaterial
            color="#60A5FA"
            attach="material"
            distort={0.3}
            speed={1.8}
            roughness={0.05}
            metalness={0.2}
            transparent
            opacity={0.85}
          />
        </Sphere>
      </Float>

      {/* Enhanced Particle System */}
      {particles.map((particle, i) => (
        <Float key={i} speed={particle.speed * 10} rotationIntensity={0.5} floatIntensity={0.8}>
          <Sphere
            args={[particle.scale, 8, 8]}
            position={particle.position as [number, number, number]}
          >
            <meshBasicMaterial
              color={
                i % 4 === 0 ? "#4ECDC4" : 
                i % 4 === 1 ? "#A78BFA" : 
                i % 4 === 2 ? "#FED7AA" : "#60A5FA"
              }
              transparent
              opacity={0.4}
            />
          </Sphere>
        </Float>
      ))}

      {/* Morphing Geometric Shapes */}
      <Float speed={1.5} rotationIntensity={2} floatIntensity={1}>
        <Dodecahedron args={[0.8]} position={[-4, 0, 3]}>
          <MeshDistortMaterial
            color="#A78BFA"
            attach="material"
            distort={0.6}
            speed={3}
            roughness={0.1}
            metalness={0.8}
            transparent
            opacity={0.8}
          />
        </Dodecahedron>
      </Float>

      <Float speed={2.2} rotationIntensity={1.5} floatIntensity={0.8}>
        <Icosahedron args={[0.6]} position={[4, 2, -1]}>
          <MeshWobbleMaterial
            color="#FED7AA"
            attach="material"
            factor={0.8}
            speed={2.5}
            roughness={0.05}
            metalness={0.9}
            transparent
            opacity={0.9}
          />
        </Icosahedron>
      </Float>

      {/* Spinning Crystal Formation */}
      {Array.from({ length: 5 }).map((_, i) => (
        <Float key={`crystal-${i}`} speed={1.8 + i * 0.2} rotationIntensity={3} floatIntensity={1.2}>
          <Box 
            args={[0.2, 1.5, 0.2]} 
            position={[
              Math.cos(i * (Math.PI * 2) / 5) * 2,
              Math.sin(Date.now() * 0.001 + i) * 0.5,
              Math.sin(i * (Math.PI * 2) / 5) * 2
            ]}
            rotation={[0, i * (Math.PI * 2) / 5, 0]}
          >
            <meshPhysicalMaterial
              color="#4ECDC4"
              transparent
              opacity={0.8}
              metalness={1}
              roughness={0}
              transmission={0.9}
              thickness={0.5}
              clearcoat={1}
            />
          </Box>
        </Float>
      ))}
      
      {/* DNA Helix Structure */}
      {Array.from({ length: 30 }).map((_, i) => {
        const angle = (i / 30) * Math.PI * 6;
        const height = (i / 30) * 8 - 4;
        return (
          <Float key={`helix-${i}`} speed={0.8} rotationIntensity={0.5} floatIntensity={0.3}>
            <Sphere
              args={[0.08, 8, 8]}
              position={[
                Math.cos(angle) * 1.5,
                height,
                Math.sin(angle) * 1.5
              ]}
            >
              <meshBasicMaterial
                color={i % 2 === 0 ? "#60A5FA" : "#A78BFA"}
                transparent
                opacity={0.9}
              />
            </Sphere>
          </Float>
        );
      })}

      {/* Floating Ring Elements with Complex Motion */}
      {Array.from({ length: 8 }).map((_, i) => (
        <Float key={`complex-ring-${i}`} speed={1 + i * 0.3} rotationIntensity={2} floatIntensity={1}>
          <Torus
            args={[0.4 + i * 0.1, 0.05, 8, 16]}
            position={[
              Math.sin(i * 1.2) * 4 + Math.cos(Date.now() * 0.001 * (i + 1)) * 2,
              Math.cos(i * 0.8) * 3 + Math.sin(Date.now() * 0.001 * (i + 1)) * 1,
              Math.sin(i * 1.5) * 2
            ]}
            rotation={[
              i * 0.5 + Date.now() * 0.001,
              i * 0.3 + Date.now() * 0.001 * 0.5,
              i * 0.8 + Date.now() * 0.001 * 0.3
            ]}
          >
            <meshPhysicalMaterial
              color={i % 3 === 0 ? "#4ECDC4" : i % 3 === 1 ? "#A78BFA" : "#FED7AA"}
              transparent
              opacity={0.8}
              metalness={0.9}
              roughness={0.1}
              emissive={i % 3 === 0 ? "#4ECDC4" : i % 3 === 1 ? "#A78BFA" : "#FED7AA"}
              emissiveIntensity={0.3}
            />
          </Torus>
        </Float>
      ))}

      {/* Spiral Elements */}
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i / 20) * Math.PI * 4;
        const radius = 1 + (i / 20) * 3;
        return (
          <Float key={`spiral-${i}`} speed={0.8 + i * 0.1} rotationIntensity={0.3} floatIntensity={0.4}>
            <Sphere
              args={[0.05, 8, 8]}
              position={[
                Math.cos(angle) * radius,
                (i / 20) * 6 - 3,
                Math.sin(angle) * radius
              ]}
            >
              <meshBasicMaterial
                color="#FFFFFF"
                transparent
                opacity={0.8 - (i / 20) * 0.6}
              />
            </Sphere>
          </Float>
        );
      })}
    </group>
  );
};