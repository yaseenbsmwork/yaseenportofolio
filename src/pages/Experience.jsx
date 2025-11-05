import React, { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Html, Text } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiencesData = [
  {
    id: 'title',
    position: [0, 1.5, 12],
    title: 'Experience',
    subtitle: 'Scroll to explore',
    date: '',
    isTitle: true,
  },
  {
    id: 'docme',
    position: [0, 1.2, 0],
    title: 'Software Developer',
    subtitle: 'DocMe Cloud Solutions, Trivandrum',
    date: 'July 2024 – Present',
    bullets: [
      'React.js & Next.js interfaces',
      'Node.js + Express services',
      'REST APIs + optimized PostgreSQL',
      'Mentored trainees in JS/React',
    ],
  },
  {
    id: 'entrykey',
    position: [0, 1.2, -20],
    title: 'Software Developer (Part Time)',
    subtitle: 'Entry Key Business Solutions, Technopark',
    date: 'Dec 2023 – June 2024',
    bullets: [
      'React frontends',
      'Node.js + Express services',
      'REST APIs + PostgreSQL',
    ],
  },
  {
    id: 'intern',
    position: [0, 1.2, -40],
    title: 'Internship: Full Stack Java Developer',
    subtitle: 'Stem Robotic, Trivandrum',
    date: 'June 2023',
    bullets: [],
  },
  {
    id: 'freelance',
    position: [0, 1.2, -60],
    title: 'Video & Photo Editor',
    subtitle: 'Freelance / YouTube Channels',
    date: '2014 – 2024',
    bullets: [],
  },
  {
    id: 'outro',
    position: [0, 1.5, -75],
    title: 'Thanks for visiting!',
    subtitle: 'Scroll back to explore again',
    date: '',
    isOutro: true,
  },
];

const Marker = ({ position, glow = 1 }) => {
  const meshRef = useRef();
  useFrame(() => {
    if (meshRef.current) {
      const t = performance.now() * 0.001;
      meshRef.current.material.emissiveIntensity = 1.2 + Math.sin(t * 2) * 0.4 * glow;
      meshRef.current.scale.setScalar(1 + Math.sin(t * 1.5) * 0.05);
    }
  });
  return (
    <mesh ref={meshRef} position={position} castShadow>
      <sphereGeometry args={[0.35, 32, 32]} />
      <meshStandardMaterial color="#65a8ff" emissive="#65a8ff" emissiveIntensity={1.2} roughness={0.3} metalness={0.1} />
    </mesh>
  );
};

const Panel = React.forwardRef(function Panel({ position, title, subtitle, date, bullets, center = false, large = false }, ref) {
  return (
    <group position={position}>
      <mesh>
        <planeGeometry args={[large ? 8 : 6, large ? 3.6 : 3]} />
        <meshStandardMaterial color="#0c0f14" transparent opacity={0.75} />
      </mesh>
      <group ref={ref} position={[0, 0, 0.02]}>
        <Text fontSize={large ? 0.5 : 0.44} color="white" anchorX={center ? 'center' : 'left'} anchorY="top" position={[center ? 0 : -((large ? 8 : 6) / 2) + 0.6, (large ? 3.6 : 3) / 2 - 0.5, 0]}>
          {title}
        </Text>
        {subtitle ? (
          <Text fontSize={large ? 0.32 : 0.28} color="#b9c7ff" anchorX={center ? 'center' : 'left'} anchorY="top" position={[center ? 0 : -((large ? 8 : 6) / 2) + 0.6, (large ? 3.6 : 3) / 2 - 1.1, 0]}>
            {subtitle}
          </Text>
        ) : null}
        {date ? (
          <Text fontSize={large ? 0.28 : 0.26} color="#9fb0ff" anchorX={center ? 'center' : 'left'} anchorY="top" position={[center ? 0 : -((large ? 8 : 6) / 2) + 0.6, (large ? 3.6 : 3) / 2 - 1.6, 0]}>
            {date}
          </Text>
        ) : null}
        {bullets && bullets.length > 0 ? (
          <group>
            {bullets.map((b, i) => (
              <Text key={i} fontSize={0.24} color="#d7defa" anchorX="left" anchorY="top" position={[-(large ? 8 : 6) / 2 + 0.6, (large ? 3.6 : 3) / 2 - 2.2 - i * 0.5, 0]}>
                • {b}
              </Text>
            ))}
          </group>
        ) : null}
      </group>
    </group>
  );
});

const TimelineScene = ({ container }) => {
  const { camera, gl, size } = useThree();
  const panelsRefs = useRef([]);
  const containerRef = useRef(null);

  const nodes = useMemo(() => experiencesData, []);

  useEffect(() => {
    // initial camera setup
    camera.position.set(0, 2.2, 14);
    camera.lookAt(0, 1.2, 0);

    // create a proxy object for camera to allow gsap smooth tween
    const camProxy = { x: camera.position.x, y: camera.position.y, z: camera.position.z, lookZ: 0 };

    const sectionLen = nodes.length - 1; // we animate from title to outro
    const totalDistance = Math.abs(nodes[0].position[2] - nodes[nodes.length - 1].position[2]);

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: container?.current || gl.domElement.parentElement,
        start: 'top top',
        end: () => `+=${Math.max(nodes.length * 1200, size.height * (sectionLen + 2))}`,
        pin: container?.current || gl.domElement.parentElement,
        scrub: 1.2,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Animate camera along Z through each node, with slight lateral drift for parallax
    nodes.forEach((node, index) => {
      if (index === 0) return; // skip title as starting point
      const prev = nodes[index - 1];
      const targetZ = node.position[2] + 4; // stop a bit before the panel
      const driftX = (index % 2 === 0 ? -0.6 : 0.6);
      const dur = Math.abs(prev.position[2] - node.position[2]) / totalDistance * 4; // normalized segment duration

      tl.to(
        camProxy,
        {
          x: driftX,
          y: 2.1,
          z: targetZ,
          lookZ: node.position[2],
          duration: Math.max(0.6, dur),
          onUpdate: () => {
            camera.position.set(camProxy.x, camProxy.y, camProxy.z);
            camera.lookAt(0, 1.2, camProxy.lookZ);
          },
        },
        '>'
      );

      // opacity in for current panel
      tl.to(
        panelsRefs.current[index]?.children?.[0]?.material || {},
        { opacity: 0.92, duration: 0.4 },
        '<0.05'
      );
      tl.fromTo(
        panelsRefs.current[index],
        { alpha: 0 },
        { alpha: 1, duration: 0.6 },
        '<'
      );
      // fade out previous panel slightly later
      if (index - 1 >= 0) {
        tl.to(
          panelsRefs.current[index - 1]?.children?.[0]?.material || {},
          { opacity: 0.75, duration: 0.3 },
          '>'
        );
      }
    });

    // outro: a small zoom out
    tl.to(
      camera.position,
      {
        x: 0,
        y: 2.8,
        z: nodes[nodes.length - 1].position[2] + 6,
        duration: 0.8,
        onUpdate: () => {
          camera.lookAt(0, 1.5, nodes[nodes.length - 1].position[2]);
        },
      },
      '>'
    );

    // ensure proper sizing after layout changes
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      tl.scrollTrigger && tl.scrollTrigger.kill();
      tl.kill();
      ScrollTrigger.clearMatchMedia();
    };
  }, [camera, gl.domElement, size.height, nodes, container]);

  // subtle background moving light
  const movingLight = useRef();
  useFrame(({ clock }) => {
    if (movingLight.current) {
      const t = clock.getElapsedTime() * 0.25;
      movingLight.current.position.x = Math.sin(t) * 5;
      movingLight.current.position.z = -20 + Math.cos(t) * 10;
    }
  });

  return (
    <group>
      <color attach="background" args={["#06080f"]} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[3, 6, 6]} intensity={0.5} castShadow />
      <pointLight ref={movingLight} position={[0, 3, -20]} intensity={0.9} color="#88aaff" distance={40} decay={2} />
      <Environment preset="city" />

      {/* timeline axis */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, -30]} receiveShadow>
        <planeGeometry args={[0.1, 120]} />
        <meshStandardMaterial color="#2b3350" />
      </mesh>

      {nodes.map((n, i) => (
        <group key={n.id}>
          <Marker position={[n.position[0], 0.6, n.position[2]]} />
          {n.isTitle ? (
            <Panel ref={(el) => (panelsRefs.current[i] = el)} position={[n.position[0], n.position[1], n.position[2]]} title={n.title} subtitle={n.subtitle} date={n.date} bullets={[]} center large />
          ) : n.isOutro ? (
            <Panel ref={(el) => (panelsRefs.current[i] = el)} position={[n.position[0], n.position[1], n.position[2]]} title={n.title} subtitle={n.subtitle} date={n.date} bullets={[]} center large />
          ) : (
            <Panel ref={(el) => (panelsRefs.current[i] = el)} position={[n.position[0], n.position[1], n.position[2]]} title={n.title} subtitle={n.subtitle} date={n.date} bullets={n.bullets} />
          )}
        </group>
      ))}

      {/* gentle floating dust (instanced) */}
      <FloatingDust count={120} area={[8, 4, 90]} />
    </group>
  );
};

const FloatingDust = ({ count = 100, area = [6, 3, 60] }) => {
  const meshRef = useRef();
  const [ax, ay, az] = area;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const positions = useMemo(() => {
    return new Array(count).fill(0).map(() => ({
      x: (Math.random() - 0.5) * ax,
      y: Math.random() * ay + 0.2,
      z: -Math.random() * az,
      s: Math.random() * 0.6 + 0.2,
      r: Math.random() * Math.PI * 2,
      spd: Math.random() * 0.15 + 0.02,
    }));
  }, [count, ax, ay, az]);

  useEffect(() => {
    positions.forEach((p, i) => {
      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.setScalar(p.s);
      dummy.rotation.set(0, 0, p.r);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [positions, dummy]);

  useFrame(() => {
    positions.forEach((p, i) => {
      p.y += Math.sin(performance.now() * 0.001 + p.r) * 0.002;
      p.x += Math.cos(performance.now() * 0.0015 + p.r) * 0.0015;
      dummy.position.set(p.x, p.y, p.z);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshBasicMaterial color="#9fb0ff" transparent opacity={0.35} />
    </instancedMesh>
  );
};

const Experience = () => {
  const containerRef = useRef(null);
  return (
    <section ref={containerRef} className="w-full h-screen" style={{ position: 'relative' }}>
      <Canvas shadows gl={{ antialias: true, alpha: true }} camera={{ position: [0, 2.2, 14], fov: 60 }}>
        <TimelineScene container={containerRef} />
      </Canvas>
    </section>
  );
};

export default Experience;