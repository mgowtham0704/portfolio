import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface RotatingCubeProps {
  scale?: number;
}

const RotatingCube: React.FC<RotatingCubeProps> = ({ scale = 2 }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.008;
    }
  });

  return (
    <mesh ref={meshRef} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshPhongMaterial
        color="#F13024"
        emissive="#8B5CF6"
        emissiveIntensity={0.5}
        shininess={100}
        wireframe={false}
      />
    </mesh>
  );
};

export const Hero3DCanvas: React.FC = () => {
  return (
    <Canvas style={{ width: '100%', height: '400px', background: 'transparent' }}>
      <PerspectiveCamera makeDefault position={[0, 0, 3]} />
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#8B5CF6" />
      <RotatingCube scale={2} />
      <OrbitControls autoRotate autoRotateSpeed={2} enableZoom={false} />
    </Canvas>
  );
};

export default Hero3DCanvas;
