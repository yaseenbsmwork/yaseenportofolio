import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export default function Character({ progress }) {
  const { scene } = useGLTF('/avatar.glb');
  const group = useRef();

  useFrame(() => {
    const z = THREE.MathUtils.lerp(0, -60, progress); // walk forward as scroll
    if (group.current) {
      group.current.position.set(0, 0, z);
      group.current.rotation.y = Math.sin(z * 0.1) * 0.2;
    }
  });

  return <primitive object={scene} ref={group} scale={1.2} position={[0, 0, 0]} />;
}
