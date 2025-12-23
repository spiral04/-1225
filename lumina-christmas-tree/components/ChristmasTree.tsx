import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Instance, Instances } from '@react-three/drei';

interface ChristmasTreeProps {
  sparkleIntensity: number;
  showParticles: boolean;
}

// Helper to generate tree distribution
const generateTreeParticles = (count: number, height: number, maxRadius: number) => {
  const particles = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = (i / count) * height; // Bottom to top
    const radius = maxRadius * (1 - y / height); // Cone shape
    const theta = i * goldenAngle;

    const x = radius * Math.cos(theta);
    const z = radius * Math.sin(theta);
    
    // Add some random noise to position to make it organic
    const noise = 0.2;
    const xN = x + (Math.random() - 0.5) * noise;
    const yN = y + (Math.random() - 0.5) * noise;
    const zN = z + (Math.random() - 0.5) * noise;

    // Rotation to face outwards roughly
    const rotation = new THREE.Euler(
      (Math.random() - 0.5) * 0.5, 
      -theta, 
      (Math.random() - 0.5) * 0.5 + Math.PI / 4 // Tilt up slightly
    );

    particles.push({ position: [xN, yN, zN], rotation, scale: Math.random() * 0.5 + 0.5 });
  }
  return particles;
};

const generateOrnaments = (count: number, height: number, maxRadius: number) => {
  const particles = [];
  for (let i = 0; i < count; i++) {
    // Random distribution but biased towards surface
    const y = Math.random() * height;
    const rBase = maxRadius * (1 - y / height);
    const r = rBase * (0.8 + Math.random() * 0.4); // Near surface
    const theta = Math.random() * Math.PI * 2;

    const x = r * Math.cos(theta);
    const z = r * Math.sin(theta);

    particles.push({ position: [x, y, z], scale: Math.random() * 0.5 + 0.5 });
  }
  return particles;
};

export const ChristmasTree: React.FC<ChristmasTreeProps> = ({ sparkleIntensity, showParticles }) => {
  const treeHeight = 7;
  const treeRadius = 3;
  const needleCount = 1800;
  const ornamentCount = 150;
  const sparkleCount = 80;

  const needles = useMemo(() => generateTreeParticles(needleCount, treeHeight, treeRadius), []);
  const ornaments = useMemo(() => generateOrnaments(ornamentCount, treeHeight, treeRadius), []);
  const sparkles = useMemo(() => generateOrnaments(sparkleCount, treeHeight, treeRadius), []);

  const needlesRef = useRef<THREE.Group>(null);
  const sparklesRef = useRef<THREE.InstancedMesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Gentle sway for the whole tree
    if (needlesRef.current) {
      needlesRef.current.rotation.z = Math.sin(t * 0.5) * 0.02;
      needlesRef.current.rotation.x = Math.cos(t * 0.3) * 0.02;
    }

    // Twinkle effect for sparkles by scaling instances or updating color
    // Updating instances in loop is expensive, let's use the material emissive intensity pulse in the shader,
    // Or for simple instanced mesh, we can just let the post-processing bloom handle the glow,
    // but moving them slightly looks nice.
  });

  return (
    <group ref={needlesRef}>
      {/* 1. Deep Green "Needles" - Directional Particles (Cones) */}
      <Instances range={needleCount}>
        <coneGeometry args={[0.08, 0.4, 4]} />
        <meshStandardMaterial 
          color="#034205" 
          roughness={0.6}
          metalness={0.1}
        />
        {needles.map((data, i) => (
          <Instance
            key={i}
            position={data.position as [number, number, number]}
            rotation={data.rotation}
            scale={[data.scale, data.scale, data.scale]}
          />
        ))}
      </Instances>

      {/* 2. Gold "Ornaments" - Circular Particles (Spheres) */}
      <Instances range={ornamentCount}>
        <dodecahedronGeometry args={[0.15, 0]} />
        <meshPhysicalMaterial 
          color="#FFD700" 
          emissive="#FFAA00"
          emissiveIntensity={0.5}
          metalness={1}
          roughness={0.1}
          clearcoat={1}
        />
        {ornaments.map((data, i) => (
          <Instance
            key={i}
            position={data.position as [number, number, number]}
            scale={[data.scale, data.scale, data.scale]}
          />
        ))}
      </Instances>

      {/* 3. White/Diamond "Sparkles" - High Bloom */}
      {showParticles && (
        <Instances range={sparkleCount}>
          <octahedronGeometry args={[0.08, 0]} />
          <meshStandardMaterial 
            color="#FFFFFF" 
            emissive="#FFFFFF"
            emissiveIntensity={3 * sparkleIntensity}
            toneMapped={false} 
          />
          {sparkles.map((data, i) => (
            <SparkleInstance 
                key={i} 
                position={data.position as [number, number, number]} 
                scale={data.scale} 
                speed={Math.random()} 
                offset={Math.random() * 100}
            />
          ))}
        </Instances>
      )}
    </group>
  );
};

// Component to handle individual sparkle animation
const SparkleInstance = ({ position, scale, speed, offset }: { position: [number, number, number], scale: number, speed: number, offset: number }) => {
    const ref = useRef<any>(null);
    
    useFrame((state) => {
        if (!ref.current) return;
        const t = state.clock.getElapsedTime();
        // Pulse scale
        const s = scale * (0.8 + 0.4 * Math.sin(t * 3 * speed + offset));
        ref.current.scale.set(s, s, s);
    });

    return <Instance ref={ref} position={position} />;
};