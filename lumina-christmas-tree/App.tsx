import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Experience } from './components/Experience';
import { UI } from './components/UI';
import { Loader } from '@react-three/drei';

const App: React.FC = () => {
  const [rotationSpeed, setRotationSpeed] = useState(0.5);
  const [sparkleIntensity, setSparkleIntensity] = useState(1.0);
  const [showParticles, setShowParticles] = useState(true);

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-gray-900 to-black">
      <Canvas
        shadows
        camera={{ position: [0, 2, 12], fov: 45 }}
        dpr={[1, 2]} // Handle high pixel density screens
        gl={{ antialias: false, stencil: false, depth: true, alpha: false }}
      >
        <Suspense fallback={null}>
          <Experience 
            rotationSpeed={rotationSpeed} 
            sparkleIntensity={sparkleIntensity}
            showParticles={showParticles}
          />
        </Suspense>
      </Canvas>
      
      <Loader 
        containerStyles={{ background: '#000' }}
        innerStyles={{ background: '#046307' }}
        barStyles={{ background: '#FFD700' }}
        dataStyles={{ color: '#FFD700' }} 
      />

      <UI 
        rotationSpeed={rotationSpeed}
        setRotationSpeed={setRotationSpeed}
        sparkleIntensity={sparkleIntensity}
        setSparkleIntensity={setSparkleIntensity}
        showParticles={showParticles}
        setShowParticles={setShowParticles}
      />
    </div>
  );
};

export default App;