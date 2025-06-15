import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const Laptop = () => {
  const { scene } = useGLTF('/src/assets/3d_clipart_webdev.glb');
  
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material = new THREE.MeshStandardMaterial({
          color: child.material.color,
          map: child.material.map,
          metalness: 0.8,
          roughness: 0.2,
        });
      }
    });
  }, [scene]);

  return (
    <primitive 
      object={scene} 
      position={[0, -0.5, 0]} 
      scale={[0.4, 0.4, 0.4]}
      rotation={[0, Math.PI / 4, 0]}
    />
  );
};

const Projects = () => {
  const projectList = [
    {
      name: 'BM ONE',
      description: 'Developed an all-in-one educational management platform with the following sub-apps',
      subApps: [
        { name: 'BM Desk:', description: 'Task and team management system for administrators and managers.' },
        { name: 'BM Assessment:', description: 'Exam, assignment, and result management for schools and colleges.' },
        { name: 'BM IRA:', description: 'Budgeting and fund management system for educational institutions.' },
        { name: 'BM Store:', description: 'E-commerce platform for selling school accessories and managing inventory.' },
        { name: 'BM Circular:', description: 'Internal communication system for principals to send circulars to teachers.' },
      ],
    },
  ];

  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center mb-6">
      <div className="w-[100%] h-[100%] relative">
        <Canvas
          camera={{ position: [0, 1, 3], fov: 45 }}
          style={{ background: 'black' }}
          shadows
        >
          <ambientLight intensity={0.3} />
          
          <spotLight 
            position={[0, 3, 2]} 
            angle={0.7} 
            penumbra={1.8} 
            intensity={9} 
            castShadow 
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-near={0.5}
            shadow-camera-far={10}
          />

          <spotLight 
            position={[-3, 2, 0]} 
            angle={0.6} 
            penumbra={1} 
            intensity={5} 
            castShadow 
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-near={0.5}
            shadow-camera-far={10}
          />

          <spotLight 
            position={[3, 2, 0]} 
            angle={0.6} 
            penumbra={1} 
            intensity={5} 
            castShadow 
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-near={0.5}
            shadow-camera-far={10}
          />

          <pointLight position={[-5, 5, -5]} intensity={0.2} />
          <Laptop />
          <OrbitControls 
            enableZoom={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </div>
      
      {/* Project Data Section */}
      <div className="mt-8 text-left">
        <h3 className="text-white text-6xl font-bold mb-2">{projectList[0].name}</h3>
        <p className="text-gray-400 text-lg italic">"{projectList[0].description}"</p>
        <div className="mt-4">
          {projectList[0].subApps.map((app, index) => (
            <p key={index} className="text-white text-base mb-1">
              <span className="font-bold">{app.name}</span> <span className='text-gray-400 text-lg italic'>"{app.description}"</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;