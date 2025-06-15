import React, { useRef, useState, useEffect, forwardRef, createContext, useContext } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, useAnimations, useTexture, Text } from '@react-three/drei';
import * as THREE from 'three';

// Create the SceneContentContext
const SceneContentContext = createContext(null);

// Character component with the provided model and textures
const Character = forwardRef(({ position, rotation, isWalking, currentRotationSpeed }, ref) => {
  // Road boundaries
  const ROAD_WIDTH = 10;
  const ROAD_BOUNDARY = ROAD_WIDTH / 2;
  
  // Load the character model from the correct path
  const { scene, animations } = useGLTF('/src/assets/source/684c0f35-ba0b-48e0-ab19-db572ea748d3.glb');
  
  // Load textures
  const textures = useTexture({
    body: '/src/assets/textures/body_texture_2.jpeg',
    face: '/src/assets/textures/face_texture_5.jpeg',
    hair: '/src/assets/textures/hair-23-N_3.png',
    teeth: '/src/assets/textures/Wolf3D_Teeth_15.jpeg',
    outfitTop: '/src/assets/textures/outfit-classic-04-v2-m-top-N_12.jpeg',
    outfitBottom: '/src/assets/textures/outfit-classic-04-v2-m-bottom-N_6.jpeg',
    footwear: '/src/assets/textures/outfit-classic-04-v2-m-footwear-N_9.jpeg'
  });

  // Apply textures to the model
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          // Apply textures based on mesh name or material name
          if (child.material.name.includes('body')) {
            child.material.map = textures.body;
          } else if (child.material.name.includes('face')) {
            child.material.map = textures.face;
          } else if (child.material.name.includes('hair')) {
            child.material.map = textures.hair;
          } else if (child.material.name.includes('teeth')) {
            child.material.map = textures.teeth;
          } else if (child.material.name.includes('top')) {
            child.material.map = textures.outfitTop;
          } else if (child.material.name.includes('bottom')) {
            child.material.map = textures.outfitBottom;
          } else if (child.material.name.includes('footwear')) {
            child.material.map = textures.footwear;
          }
          
          // Enable shadows
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [scene, textures]);

  const { actions } = useAnimations(animations, ref);

  useEffect(() => {
    if (isWalking) {
      if (actions.walk) actions.walk.play();
    } else {
      if (actions.walk) actions.walk.stop();
    }
  }, [isWalking, actions]);

  useFrame((state, delta) => {
    if (ref.current) {
      // Handle rotation
      if (currentRotationSpeed !== 0) {
        ref.current.rotation.y += delta * currentRotationSpeed;
      }
    }
  });

  return (
    <primitive 
      ref={ref}
      object={scene} 
      position={position} 
      rotation={rotation}
      scale={[1, 1, 1]}
    />
  );
});

// Building component
const Building = ({ position, width, height, depth, hasSign, signText, side }) => {
  const buildingRef = useRef();
  
  useEffect(() => {
    if (buildingRef.current) {
      // Create a procedural texture for the building
      const size = 256;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');

      // Fill background
      ctx.fillStyle = '#4a4a4a';
      ctx.fillRect(0, 0, size, size);

      // Draw windows
      const windowSize = 20;
      const windowSpacing = 30;
      const windowColor = '#88ccff';
      const windowRows = 8;
      const windowCols = 4;

      for (let row = 0; row < windowRows; row++) {
        for (let col = 0; col < windowCols; col++) {
          const isLit = Math.random() > 0.3;
          ctx.fillStyle = isLit ? windowColor : '#2a2a2a';
          
          const x = col * windowSpacing + 20;
          const y = row * windowSpacing + 20;
          ctx.fillRect(x, y, windowSize, windowSize);
        }
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1, Math.ceil(height / 20));

      buildingRef.current.material.map = texture;
      buildingRef.current.material.needsUpdate = true;
    }
  }, [height]);

  return (
    <mesh ref={buildingRef} position={position} castShadow receiveShadow>
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial 
        color="#4a4a4a"
        roughness={0.7}
        metalness={0.2}
      />
      {hasSign && (
        <Text
          position={[side === 'left' ? width / 2 + 0.1 : -width / 2 - 0.1,-7, 0]}
          rotation={[0, side === 'left' ? Math.PI / 2 : -Math.PI / 2, 0]}
          fontSize={1.2}
          color="white"
          anchorX="center"
          anchorY="bottom"
        >
          {signText.join('\n')}
        </Text>
      )}
    </mesh>
  );
};

// Road component with buildings
const Road = ({ ROAD_WIDTH, hiddenTextKeys }) => {
  const roadRef = useRef();

  // Generate buildings along the road
  const generateBuildings = () => {
    const buildings = [];
    const buildingSpacing = 15;
    const numBuildings = 5;

    // Left side buildings
    for (let i = 0; i < numBuildings; i++) {
      const height = Math.random() * 10 + 10;
      let hasSign = false;
      let signText = [];
      let side = "left";

      buildings.push(
        <Building
          key={`left-${i}`}
          position={[-12, height/2, i * buildingSpacing - 30]}
          width={8}
          height={height}
          depth={8}
          hasSign={hasSign}
          signText={signText}
          side={side}
        />
      );
    }

    // Right side buildings
    for (let i = 0; i < numBuildings; i++) {
      const height = Math.random() * 10 + 10;
      buildings.push(
        <Building
          key={`right-${i}`}
          position={[12, height/2, i * buildingSpacing - 30]}
          width={8}
          height={height}
          depth={8}
          hasSign={false}
          signText={[]}
          side="right"
        />
      );
    }

    // Add the end building
    buildings.push(
      <mesh key="end-building" position={[0, 15, -40]} castShadow receiveShadow>
        <boxGeometry args={[20, 30, 20]} />
        <meshStandardMaterial 
          color="white"
          roughness={0.3}
          metalness={0.1}
        />
        {/* Add black windows */}
        <mesh position={[0, 0, 10.01]}>
          <planeGeometry args={[18, 28]} />
          <meshStandardMaterial color="black" />
        </mesh>
        <mesh position={[0, 0, -10.01]}>
          <planeGeometry args={[18, 28]} />
          <meshStandardMaterial color="black" />
        </mesh>
        <mesh position={[10.01, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[20, 28]} />
          <meshStandardMaterial color="black" />
        </mesh>
        <mesh position={[-10.01, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[20, 28]} />
          <meshStandardMaterial color="black" />
        </mesh>
      </mesh>
    );

    return buildings;
  };

  return (
    <group>
      {/* Road segment */}
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[ROAD_WIDTH, 100]} />
        <meshStandardMaterial color="#3a3a3a" />
      </mesh>

      {/* Road markings */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, 0]}>
        <planeGeometry args={[0.5, 100]} />
        <meshStandardMaterial color="white" />
      </mesh>

      {/* Freelance Text on the road */}
      {/* {!hiddenTextKeys.includes('freelance-text') && (
        <Text
          position={[0, 0.02, -35]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={1.5}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {"Freelance\n2014-2023\nVideo Editing"}
        </Text>
      )} */}

      {/* STEM Robotics Text on the road */}
      {/* {!hiddenTextKeys.includes('stem-robotics-text') && (
        <Text
          position={[0, 0.02, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={1.5}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {"STEM Robotics\n2023\nInternship"}
        </Text>
      )} */}

      {/* Buildings */}
      {generateBuildings()}
    </group>
  );
};

const SceneContent = () => {
  const characterRef = useRef();
  const worldRef = useRef();
  const { camera } = useThree();

  const [isWalking, setIsWalking] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState(0);
  const [showPopover, setShowPopover] = useState(false);
  const [popoverContent, setPopoverContent] = useState("");
  const [hiddenTextKeys, setHiddenTextKeys] = useState([]);

  const ROAD_WIDTH = 10;
  const ROAD_BOUNDARY = ROAD_WIDTH / 2;
  const MOVEMENT_SPEED = 5;
  const CHARACTER_ROTATION_SPEED = 2.5;
  const MAX_WORLD_Z_OFFSET = -40;

  // Define text trigger points and content
  const textTriggers = [
    {
      key: 'freelance-text',
      localZ: -35,
      content: "Freelance\n2014-2023\nVideo Editing",
    },
    {
      key: 'stem-robotics-text',
      localZ: 0,
      content: "STEM Robotics\n2023\nInternship",
    },
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          setIsWalking(true);
          break;
        case 'ArrowLeft':
          setRotationSpeed(CHARACTER_ROTATION_SPEED);
          break;
        case 'ArrowRight':
          setRotationSpeed(-CHARACTER_ROTATION_SPEED);
          break;
      }
    };

    const handleKeyUp = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          setIsWalking(false);
          break;
        case 'ArrowLeft':
        case 'ArrowRight':
          setRotationSpeed(0);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame((state, delta) => {
    if (!characterRef.current || !worldRef.current) return;

    const currentRotation = characterRef.current.rotation.y;

    if (rotationSpeed !== 0) {
      characterRef.current.rotation.y += rotationSpeed * delta;
    }

    if (isWalking) {
      const worldMovement = new THREE.Vector3(
        -Math.sin(currentRotation) * MOVEMENT_SPEED * delta,
        0,
        -Math.cos(currentRotation) * MOVEMENT_SPEED * delta
      );

      const newWorldPosition = worldRef.current.position.clone().add(worldMovement);

      if (newWorldPosition.z >= MAX_WORLD_Z_OFFSET) {
        worldRef.current.position.copy(newWorldPosition);
      } else {
        worldRef.current.position.z = MAX_WORLD_Z_OFFSET;
      }
    }

    // Update camera position to follow character with more distance
    const cameraOffset = new THREE.Vector3(
      -Math.sin(currentRotation) * 8, // Reduced distance from 12 to 8
      5, // Reduced height from 8 to 5
      -Math.cos(currentRotation) * 8 // Reduced distance from 12 to 8
    );
    camera.position.copy(characterRef.current.position).add(cameraOffset);
    camera.lookAt(characterRef.current.position);

    // Popover trigger logic
    textTriggers.forEach((trigger) => {
      const worldZPosition = worldRef.current.position.z + trigger.localZ;
      if (worldZPosition > -5 && worldZPosition < 5 && !hiddenTextKeys.includes(trigger.key)) {
        setPopoverContent(trigger.content);
        setShowPopover(true);
        setHiddenTextKeys((prev) => [...prev, trigger.key]);

        setTimeout(() => {
          setShowPopover(false);
          setPopoverContent("");
        }, 5000);
      }
    });
  });

  return (
    <SceneContentContext.Provider value={{ showPopover, popoverContent }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} castShadow />
      <Environment preset="city" />

      <group ref={worldRef}>
        <Road ROAD_WIDTH={ROAD_WIDTH} hiddenTextKeys={hiddenTextKeys} />
      </group>

      <Character 
        ref={characterRef} 
        position={[0, 0, 0]} 
        rotation={[0, Math.PI, 0]} 
        isWalking={isWalking} 
        currentRotationSpeed={rotationSpeed} 
      />
    </SceneContentContext.Provider>
  );
};

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error in Canvas:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong. Please refresh the page.</div>;
    }
    return this.props.children;
  }
}

const Experience = () => {
  return (
    <div className="w-full h-screen">
      <ErrorBoundary>
        <Canvas
          shadows
          camera={{ position: [0, 5, 8], fov: 75 }}
          gl={{ preserveDrawingBuffer: true }}
        >
          <SceneContent />
        </Canvas>
      </ErrorBoundary>
      <div className="absolute top-4 left-4 text-white bg-black bg-opacity-50 p-4 rounded">
        <h2 className="text-xl font-bold mb-2">Controls</h2>
        <p className="mb-1">↑ - Walk forward</p>
        <p className="mb-1">← - Rotate left</p>
        <p>→ - Rotate right</p>
      </div>
      {/* Popover for displaying text content */}
      <SceneContentContext.Consumer>
        {(context) => context?.showPopover && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-80 text-white p-6 rounded-lg text-center">
            <div className="text-lg whitespace-pre-line">
              {context.popoverContent}
            </div>
          </div>
        )}
      </SceneContentContext.Consumer>
    </div>
  );
};

export default Experience;