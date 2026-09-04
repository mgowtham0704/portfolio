import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface Service3DIconProps {
  type: 'agent' | 'data' | 'vision';
}

const AgentIcon: React.FC<{ meshRef: React.RefObject<THREE.Mesh> }> = ({ meshRef }) => {
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.004;
      meshRef.current.rotation.y += 0.006;
    }
  });

  return (
    <mesh ref={meshRef} scale={1.5}>
      <octahedronGeometry args={[1, 0]} />
      <meshPhongMaterial
        color="#8B5CF6"
        emissive="#8B5CF6"
        emissiveIntensity={0.3}
        shininess={100}
        wireframe={false}
      />
    </mesh>
  );
};

const DataIcon: React.FC<{ meshRef: React.RefObject<THREE.Mesh> }> = ({ meshRef }) => {
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.003;
      meshRef.current.rotation.y += 0.007;
    }
  });

  return (
    <mesh ref={meshRef} scale={1.5}>
      <cylinderGeometry args={[1, 1, 1, 32]} />
      <meshPhongMaterial
        color="#F59E0B"
        emissive="#F59E0B"
        emissiveIntensity={0.3}
        shininess={100}
        wireframe={false}
      />
    </mesh>
  );
};

const VisionIcon: React.FC<{ meshRef: React.RefObject<THREE.Mesh> }> = ({ meshRef }) => {
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={meshRef} scale={1.5}>
      <icosahedronGeometry args={[1, 0]} />
      <meshPhongMaterial
        color="#F13024"
        emissive="#F13024"
        emissiveIntensity={0.3}
        shininess={100}
        wireframe={false}
      />
    </mesh>
  );
};

export const Service3DIcon: React.FC<Service3DIconProps> = ({ type }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  const IconComponent = () => {
    switch (type) {
      case 'agent':
        return <AgentIcon meshRef={meshRef} />;
      case 'data':
        return <DataIcon meshRef={meshRef} />;
      case 'vision':
        return <VisionIcon meshRef={meshRef} />;
      default:
        return <AgentIcon meshRef={meshRef} />;
    }
  };

  return (
    <Canvas style={{ width: '100%', height: '100%', background: 'transparent' }}>
      <PerspectiveCamera makeDefault position={[0, 0, 3]} />
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-5, -5, -5]} intensity={0.4} color="#8B5CF6" />
      <IconComponent />
      <OrbitControls autoRotate autoRotateSpeed={2} enableZoom={false} />
    </Canvas>
  );
};

export default Service3DIcon;
