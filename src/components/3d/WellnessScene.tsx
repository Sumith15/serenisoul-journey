import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, Stars, Sparkles } from '@react-three/drei';
import { FloatingElements } from './FloatingElements';
import { ParticleField } from './ParticleField';
import { DynamicSphere } from './DynamicSphere';
import { WaveField } from './WaveField';
import { EnergyRings } from './EnergyRings';
import { LightBeams } from './LightBeams';
import { Suspense } from 'react';

export const WellnessScene = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={75} />
          
          {/* Enhanced Lighting System */}
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1.2}
            color="#ffffff"
            castShadow
          />
          <pointLight position={[-10, -10, -5]} intensity={0.8} color="#4ECDC4" />
          <pointLight position={[10, -10, -5]} intensity={0.6} color="#A78BFA" />
          <pointLight position={[0, 10, 0]} intensity={0.4} color="#FED7AA" />
          
          {/* Atmospheric Effects */}
          <Stars 
            radius={300} 
            depth={60} 
            count={800} 
            factor={7} 
            saturation={0.2} 
            fade 
            speed={0.5}
          />
          <Sparkles 
            count={50} 
            scale={[20, 20, 20]} 
            size={3} 
            speed={0.4}
            opacity={0.6}
            color="#4ECDC4"
          />
          
          {/* 3D Elements */}
          <FloatingElements />
          <ParticleField />
          <DynamicSphere position={[-6, 0, 2]} scale={1.2} />
          <DynamicSphere position={[6, -2, 0]} scale={0.8} />
          <DynamicSphere position={[0, 4, -3]} scale={1.0} />
          <WaveField />
          <EnergyRings />
          <LightBeams />
          
          {/* Environment */}
          <Environment preset="sunset" />
          
          {/* Interactive controls */}
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.3}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 4}
            maxDistance={15}
            minDistance={5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};