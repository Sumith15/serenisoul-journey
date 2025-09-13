import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { FloatingElements } from './FloatingElements';
import { Suspense } from 'react';

export const WellnessScene = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={60} />
          
          {/* Lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            color="#ffffff"
          />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4ECDC4" />
          <pointLight position={[10, -10, -5]} intensity={0.3} color="#A78BFA" />
          
          {/* 3D Elements */}
          <FloatingElements />
          
          {/* Environment */}
          <Environment preset="dawn" />
          
          {/* Interactive controls */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};