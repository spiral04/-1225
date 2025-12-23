import React from 'react';
import { Settings, Sparkles, RotateCw, Eye } from 'lucide-react';

interface UIProps {
  rotationSpeed: number;
  setRotationSpeed: (v: number) => void;
  sparkleIntensity: number;
  setSparkleIntensity: (v: number) => void;
  showParticles: boolean;
  setShowParticles: (v: boolean) => void;
}

export const UI: React.FC<UIProps> = ({ 
    rotationSpeed, setRotationSpeed, 
    sparkleIntensity, setSparkleIntensity,
    showParticles, setShowParticles
}) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none p-6 flex flex-col justify-between">
      {/* Header */}
      <header className="flex flex-col items-center pt-8 animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 tracking-wider drop-shadow-lg">
          LUMINA
        </h1>
        <p className="text-emerald-200/80 text-sm tracking-widest mt-2 uppercase">
          Interactive Holiday Experience
        </p>
      </header>

      {/* Controls */}
      <div className="pointer-events-auto w-full max-w-md mx-auto bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 transition-all hover:bg-black/50">
        <div className="flex items-center gap-2 mb-4 text-yellow-100/80 border-b border-white/10 pb-2">
            <Settings size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">Controls</span>
        </div>

        <div className="space-y-6">
            {/* Rotation Control */}
            <div className="space-y-2">
                <div className="flex justify-between text-xs text-white/60 uppercase tracking-wider">
                    <span className="flex items-center gap-2"><RotateCw size={12}/> Rotation</span>
                    <span>{Math.round(rotationSpeed * 10)}</span>
                </div>
                <input 
                    type="range" 
                    min="0" 
                    max="2" 
                    step="0.1"
                    value={rotationSpeed}
                    onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
                    className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-yellow-400 hover:accent-yellow-300"
                />
            </div>

            {/* Sparkle Intensity */}
            <div className="space-y-2">
                <div className="flex justify-between text-xs text-white/60 uppercase tracking-wider">
                    <span className="flex items-center gap-2"><Sparkles size={12}/> Glimmer</span>
                    <span>{Math.round(sparkleIntensity * 10)}</span>
                </div>
                <input 
                    type="range" 
                    min="0" 
                    max="3" 
                    step="0.1"
                    value={sparkleIntensity}
                    onChange={(e) => setSparkleIntensity(parseFloat(e.target.value))}
                    className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-yellow-400 hover:accent-yellow-300"
                />
            </div>

             {/* Visibility Toggle */}
             <div className="flex items-center justify-between pt-2">
                <span className="flex items-center gap-2 text-xs text-white/60 uppercase tracking-wider">
                    <Eye size={12}/> Particles
                </span>
                <button 
                    onClick={() => setShowParticles(!showParticles)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                        showParticles 
                        ? 'bg-emerald-900/80 text-emerald-200 border border-emerald-500/30' 
                        : 'bg-white/5 text-white/40 border border-white/10'
                    }`}
                >
                    {showParticles ? 'ACTIVE' : 'HIDDEN'}
                </button>
            </div>
        </div>
      </div>
      
      {/* Footer credits */}
      <footer className="text-center text-white/20 text-xs pb-4">
        Designed with React Three Fiber
      </footer>
    </div>
  );
};