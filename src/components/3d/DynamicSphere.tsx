import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import * as THREE from 'three';

// Custom holographic shader material
const HolographicMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0.2, 0.0, 0.1),
  },
  // Vertex shader
  `
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    uniform float time;
    
    void main() {
      vUv = uv;
      vPosition = position;
      vNormal = normal;
      
      vec3 pos = position;
      float noise = sin(pos.x * 4.0 + time) * sin(pos.y * 4.0 + time * 1.5) * sin(pos.z * 4.0 + time * 0.5);
      pos += normal * noise * 0.1;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float time;
    uniform vec3 color;
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    
    void main() {
      vec2 uv = vUv;
      
      // Create holographic effect
      float hologram = sin(uv.y * 50.0 + time * 2.0) * 0.5 + 0.5;
      hologram *= sin(uv.x * 30.0 + time * 3.0) * 0.5 + 0.5;
      
      // Color variations
      vec3 hologramColor = mix(
        vec3(0.2, 0.8, 1.0),
        vec3(0.8, 0.2, 1.0),
        sin(time + vPosition.y * 2.0) * 0.5 + 0.5
      );
      
      // Fresnel effect
      float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
      
      gl_FragColor = vec4(hologramColor * hologram * fresnel, 0.8);
    }
  `
);

extend({ HolographicMaterial });

export const DynamicSphere = ({ position, scale = 1 }: { position: [number, number, number], scale?: number }) => {
  const materialRef = useRef<any>();
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock, mouse }) => {
    if (materialRef.current) {
      materialRef.current.time = clock.elapsedTime;
    }
    
    if (sphereRef.current) {
      sphereRef.current.rotation.x = clock.elapsedTime * 0.5;
      sphereRef.current.rotation.y = clock.elapsedTime * 0.3;
      sphereRef.current.position.y = position[1] + Math.sin(clock.elapsedTime * 2) * 0.5;
      
      // React to mouse
      sphereRef.current.rotation.z = mouse.x * 0.5;
      sphereRef.current.scale.setScalar(scale + Math.sin(clock.elapsedTime * 1.5) * 0.2);
    }
  });

  return (
    <Sphere ref={sphereRef} args={[1, 64, 64]} position={position} scale={scale}>
      {/* @ts-ignore */}
      <holographicMaterial ref={materialRef} transparent />
    </Sphere>
  );
};