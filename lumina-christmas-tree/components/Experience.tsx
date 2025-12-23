import React, { useRef } from 'react';
import { OrbitControls, PerspectiveCamera, Environment, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import { ChristmasTree } from './ChristmasTree';
import { StarTop } from './Star';
import { Color } from 'three';

interface ExperienceProps {
  rotationSpeed: number;
  sparkleIntensity: number;
  showParticles: boolean;
}

export const Experience: React.FC<ExperienceProps> = ({ rotationSpeed, sparkleIntensity, showParticles }) => {
  return (
    <>
      <color attach="background" args={['#000502']} />
      
      {/* Cinematic Fog */}
      <fog attach="fog" args={['#000502', 5, 25]} />

      {/* Camera & Controls */}
      <OrbitControls 
        enablePan={false} 
        minPolarAngle={Math.PI / 3} 
        maxPolarAngle={Math.PI / 1.8}
        minDistance={5}
        maxDistance={20}
        autoRotate
        autoRotateSpeed={rotationSpeed}
      />

      {/* Lighting Setup for Drama */}
      <ambientLight intensity={0.2} color="#041f0e" />
      <spotLight 
        position={[10, 20, 10]} 
        angle={0.2} 
        penumbra={1} 
        intensity={2} 
        color="#fff5b6" 
        castShadow 
      />
      <pointLight position={[-5, 5, -5]} intensity={1} color="#046307" />
      <pointLight position={[5, 0, 5]} intensity={1.5} color="#FFD700" distance={10} />

      {/* Environment Reflections */}
      <Environment preset="night" />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      {/* The Main Subject */}
      <group position={[0, -3, 0]}>
        <ChristmasTree 
          sparkleIntensity={sparkleIntensity} 
          showParticles={showParticles} 
        />
        <StarTop />
        {/* Floor Reflection Placeholder (Implicit via environment or can be added) */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
            <circleGeometry args={[8, 64]} />
            <meshStandardMaterial 
                color="#000905" 
                roughness={0.1} 
                metalness={0.8} 
            />
        </mesh>
      </group>

      {/* Post Processing for the "Cinematic Glow" */}
      <EffectComposer enableNormalPass={false}>
        <Bloom 
          luminanceThreshold={1.1} // Only very bright things glow (emissive > 1)
          mipmapBlur 
          intensity={1.5} 
          radius={0.6}
        />
        <Vignette eskil={false} offset={0.1} darkness={0.6} />
        <Noise opacity={0.02} />
      </EffectComposer>
    </>
  );
};