import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingCardProps {
  color: string;
  position: [number, number, number];
}

const FloatingCard: React.FC<FloatingCardProps> = ({ color, position }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const floatOffset = useRef(0);

  useFrame(() => {
    if (meshRef.current) {
      floatOffset.current += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(floatOffset.current) * 0.3;
      meshRef.current.rotation.x += 0.003;
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.8, 0.8, 0.1]} />
      <meshPhongMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        shininess={100}
        wireframe={false}
      />
    </mesh>
  );
};

export const Work3DScene: React.FC = () => {
  return (
    <Canvas style={{ width: '100%', height: '100%', background: 'transparent' }}>
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-5, -5, -5]} intensity={0.6} color="#8B5CF6" />

      {/* Three floating cards */}
      <FloatingCard color="#8B5CF6" position={[-1.2, 0, 0]} />
      <FloatingCard color="#F13024" position={[0, 0, 0]} />
      <FloatingCard color="#F59E0B" position={[1.2, 0, 0]} />

      <OrbitControls autoRotate autoRotateSpeed={1} enableZoom={false} />
    </Canvas>
  );
};

export default Work3DScene;
