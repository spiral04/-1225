export type Vector3 = [number, number, number];

export interface TreeConfig {
  height: number;
  radius: number;
  particleCount: number;
  ornamentCount: number;
}

export interface ParticleData {
  position: Vector3;
  scale: number;
  rotation: Vector3;
  color: string;
  type: 'needle' | 'ornament' | 'sparkle';
  speed: number;
  offset: number;
}