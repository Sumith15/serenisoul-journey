import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const WaveField = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(20, 20, 100, 100);
    return geo;
  }, []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const positions = meshRef.current.geometry.attributes.position;
      const array = positions.array as Float32Array;
      
      for (let i = 0; i < array.length; i += 3) {
        const x = array[i];
        const y = array[i + 1];
        const distance = Math.sqrt(x * x + y * y);
        
        array[i + 2] = Math.sin(distance * 0.5 - clock.elapsedTime * 2) * 0.5 +
                       Math.cos(x * 0.3 + clock.elapsedTime * 1.5) * 0.3 +
                       Math.sin(y * 0.4 + clock.elapsedTime * 1.8) * 0.2;
      }
      
      positions.needsUpdate = true;
      meshRef.current.geometry.computeVertexNormals();
      
      meshRef.current.rotation.z = clock.elapsedTime * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <meshPhysicalMaterial
        color="#4ECDC4"
        transparent
        opacity={0.3}
        metalness={0.8}
        roughness={0.2}
        transmission={0.5}
        wireframe
      />
    </mesh>
  );
};