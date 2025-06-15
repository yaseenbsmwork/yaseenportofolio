import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';

function Table() {
  return (
    <mesh position={[0, -1.8, 0]} rotation={[0, 0, 0]}>
      <boxGeometry args={[7, 0.2, 3.5]} />
      <meshStandardMaterial color="#4a4a4a" />
    </mesh>
  );
}

function Laptop({ position, project }) {
  const { scene } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf');
  
  return (
    <group position={position}>
      <primitive object={scene} scale={1.1} />
      <Html
        transform
        position={[0, 0.1, -0.5]}
        rotation={[0, -Math.PI, 0]}
        style={{
          width: '450px',
          height: '280px',
          background: 'white',
          borderRadius: '10px',
          padding: '20px',
          color: 'black',
          fontSize: '14px',
          overflow: 'auto',
        }}
      >
        <div className="flex flex-col h-full">
          <h3 className="text-2xl font-bold mb-2">{project.name}</h3>
          <p className="text-gray-600 mb-2 italic">{project.period}</p>
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Technologies:</h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, i) => (
                <span key={i} className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Description:</h4>
            <ul className="list-disc list-inside space-y-1">
              {project.description.map((point, i) => (
                <li key={i} className="leading-relaxed">{point}</li>
              ))}
            </ul>
          </div>
        </div>
      </Html>
    </group>
  );
}

export default function OfficeModel({ projectList }) {
  return (
    <div className="w-full h-[700px]">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <Suspense fallback={null}>
          <Table />
          {projectList.map((project, index) => (
            <Laptop 
              key={index} 
              position={index === 0 ? [-2.2, -1.3, 0] : [2.2, -1.3, 0]}
              project={project} 
            />
          ))}
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
} 