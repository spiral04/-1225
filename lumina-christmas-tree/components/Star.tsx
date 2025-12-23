import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

export const StarTop: React.FC = () => {
  const starRef = useRef<Mesh>(null);
  const coreRef = useRef<Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (starRef.current) {
      starRef.current.rotation.y = t * 0.5;
      starRef.current.rotation.z = Math.sin(t * 0.5) * 0.1;
    }
    if (coreRef.current) {
        // Pulse the core
        const s = 1 + Math.sin(t * 2) * 0.1;
        coreRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group position={[0, 7.2, 0]}>
      {/* Main Silver Star Shape */}
      <mesh ref={starRef}>
        {/* Using an Icosahedron as a base for a complex crystal star look */}
        <icosahedronGeometry args={[0.6, 0]} />
        <meshStandardMaterial 
          color="#E0E0E0" 
          emissive="#C0C0C0"
          emissiveIntensity={2}
          roughness={0}
          metalness={1}
          toneMapped={false}
        />
      </mesh>

      {/* Inner light core for extra bloom center */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.3, 0]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
      
      {/* Light coming from the star */}
      <pointLight intensity={3} color="#FFFFFF" distance={5} decay={2} />
    </group>
  );
};