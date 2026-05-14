import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars, Environment } from '@react-three/drei';
import WaterMolecule from './WaterMolecule';

const Atom = ({ position, color, radius = 0.35, emissive = '#000000', emissiveIntensity = 0 }) => (
  <mesh position={position} castShadow receiveShadow>
    <sphereGeometry args={[radius, 48, 48]} />
    <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={emissiveIntensity} metalness={0.2} roughness={0.35} />
  </mesh>
);

const Bond = ({ start, end, color = '#b7d6ff' }) => {
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  const dz = end[2] - start[2];
  const length = Math.sqrt(dx * dx + dy * dy + dz * dz);
  const mid = [(start[0] + end[0]) / 2, (start[1] + end[1]) / 2, (start[2] + end[2]) / 2];
  return (
    <mesh position={mid} rotation={[Math.PI / 2, 0, Math.atan2(dx, dz)]} castShadow>
      <cylinderGeometry args={[0.08, 0.08, length, 24]} />
      <meshStandardMaterial color={color} metalness={0.65} roughness={0.22} />
    </mesh>
  );
};

const Ring = ({ radius = 1.2, color = '#88ccff', opacity = 0.25, rotation = [0, 0, 0] }) => (
  <mesh rotation={rotation}>
    <torusGeometry args={[radius, 0.03, 12, 96]} />
    <meshStandardMaterial color={color} transparent opacity={opacity} metalness={0.2} roughness={0.7} />
  </mesh>
);

const MethaneModel = () => (
  <group>
    <Atom position={[0, 0, 0]} color="#3a3a3a" radius={0.42} emissive="#111111" emissiveIntensity={0.08} />
    <Atom position={[1.0, 1.0, 1.0]} color="#ffffff" radius={0.24} />
    <Atom position={[-1.0, -1.0, 1.0]} color="#ffffff" radius={0.24} />
    <Atom position={[1.0, -1.0, -1.0]} color="#ffffff" radius={0.24} />
    <Atom position={[-1.0, 1.0, -1.0]} color="#ffffff" radius={0.24} />
    <Bond start={[0, 0, 0]} end={[1.0, 1.0, 1.0]} />
    <Bond start={[0, 0, 0]} end={[-1.0, -1.0, 1.0]} />
    <Bond start={[0, 0, 0]} end={[1.0, -1.0, -1.0]} />
    <Bond start={[0, 0, 0]} end={[-1.0, 1.0, -1.0]} />
  </group>
);

const SodiumIonModel = () => (
  <group>
    <Atom position={[0, 0, 0]} color="#ffcf86" radius={0.7} emissive="#ffe1b8" emissiveIntensity={0.32} />
    <Ring radius={1.05} color="#ffb347" opacity={0.18} />
    <Ring radius={1.35} color="#ffddb0" opacity={0.08} rotation={[Math.PI / 2, 0, 0]} />
    <Ring radius={1.35} color="#ffddb0" opacity={0.08} rotation={[0, Math.PI / 2, 0]} />
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[1.55, 48, 48]} />
      <meshStandardMaterial transparent opacity={0.09} color="#ffd27a" />
    </mesh>
    <mesh position={[0, 1.65, 0]}>
      <sphereGeometry args={[0.16, 24, 24]} />
      <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.4} />
    </mesh>
  </group>
);

const PotassiumIonModel = () => (
  <group>
    <Atom position={[0, 0, 0]} color="#c084fc" radius={0.9} emissive="#efd9ff" emissiveIntensity={0.28} />
    <Ring radius={1.25} color="#a78bfa" opacity={0.14} />
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[1.6, 48, 48]} />
      <meshStandardMaterial transparent opacity={0.08} color="#c7b7ff" />
    </mesh>
  </group>
);

const AmmoniumIonModel = () => (
  <group>
    <Atom position={[0, 0, 0]} color="#fb923c" radius={0.6} emissive="#ffd3b3" emissiveIntensity={0.28} />
    <Atom position={[0.9, 0.4, 0.5]} color="#ffffff" radius={0.22} />
    <Atom position={[-0.9, 0.4, 0.5]} color="#ffffff" radius={0.22} />
    <Atom position={[0, -0.95, 0.5]} color="#ffffff" radius={0.22} />
    <Atom position={[0, 0.4, -0.95]} color="#ffffff" radius={0.22} />
    <Bond start={[0, 0, 0]} end={[0.9, 0.4, 0.5]} />
    <Bond start={[0, 0, 0]} end={[-0.9, 0.4, 0.5]} />
    <Bond start={[0, 0, 0]} end={[0, -0.95, 0.5]} />
    <Bond start={[0, 0, 0]} end={[0, 0.4, -0.95]} />
    <Ring radius={1.05} color="#fb923c" opacity={0.12} />
  </group>
);

const SaltCrystalModel = () => (
  <group>
    {[[-0.85, -0.85, -0.85], [0.85, -0.85, -0.85], [-0.85, 0.85, -0.85], [0.85, 0.85, -0.85], [-0.85, -0.85, 0.85], [0.85, -0.85, 0.85], [-0.85, 0.85, 0.85], [0.85, 0.85, 0.85], [0, 0, 0]].map((pos, index) => (
      <Atom
        key={index}
        position={pos}
        color={index % 2 === 0 ? '#dde7ff' : '#ff8a8a'}
        radius={index === 8 ? 0.26 : 0.2}
        emissive={index === 8 ? '#ffffff' : '#111111'}
        emissiveIntensity={index === 8 ? 0.1 : 0}
      />
    ))}
    {[[-0.85, 0, 0], [0.85, 0, 0], [0, -0.85, 0], [0, 0.85, 0], [0, 0, -0.85], [0, 0, 0.85]].map((pos, index) => (
      <Bond key={`b-${index}`} start={[0, 0, 0]} end={pos} color="#7dd3fc" />
    ))}
    <mesh>
      <boxGeometry args={[2.4, 2.4, 2.4]} />
      <meshStandardMaterial transparent opacity={0.08} color="#b7d6ff" wireframe />
    </mesh>
  </group>
);

const ProteinFragmentModel = () => (
  <group>
    {Array.from({ length: 16 }).map((_, index) => {
      const t = index / 2.2;
      const x = Math.sin(t) * 0.9;
      const y = (index - 8) * 0.18;
      const z = Math.cos(t * 0.7) * 0.5;
      return (
        <Atom
          key={index}
          position={[x, y, z]}
          color={index % 2 === 0 ? '#a78bfa' : '#60a5fa'}
          radius={0.16 + (index % 3) * 0.02}
          emissive={index % 2 === 0 ? '#6d28d9' : '#1d4ed8'}
          emissiveIntensity={0.12}
        />
      );
    })}
    {Array.from({ length: 15 }).map((_, index) => {
      const t1 = index / 2.2;
      const t2 = (index + 1) / 2.2;
      const start = [Math.sin(t1) * 0.9, (index - 8) * 0.18, Math.cos(t1 * 0.7) * 0.5];
      const end = [Math.sin(t2) * 0.9, (index + 1 - 8) * 0.18, Math.cos(t2 * 0.7) * 0.5];
      return <Bond key={`p-${index}`} start={start} end={end} color="#c4b5fd" />;
    })}
    <Ring radius={1.55} color="#c084fc" opacity={0.08} rotation={[Math.PI / 2, 0, 0]} />
  </group>
);

const EnzymeFragmentModel = () => (
  <group>
    {Array.from({ length: 28 }).map((_, index) => {
      const t = index / 3.0;
      const x = Math.sin(t) * 1.2;
      const y = Math.cos(t * 1.3) * 0.6;
      const z = Math.sin(t * 0.8) * 0.6;
      return (
        <Atom
          key={index}
          position={[x, y, z]}
          color={index % 2 === 0 ? '#f472b6' : '#60a5fa'}
          radius={0.14 + (index % 4) * 0.02}
          emissive={index % 2 === 0 ? '#fb7185' : '#0ea5e9'}
          emissiveIntensity={0.08}
        />
      );
    })}
    {Array.from({ length: 22 }).map((_, index) => {
      const a = index / 2.2;
      const start = [Math.sin(a) * 1.2, Math.cos(a * 1.3) * 0.6, Math.sin(a * 0.8) * 0.6];
      const b = (index + 1) / 2.2;
      const end = [Math.sin(b) * 1.2, Math.cos(b * 1.3) * 0.6, Math.sin(b * 0.8) * 0.6];
      return <Bond key={`e-${index}`} start={start} end={end} color="#fbcfe8" />;
    })}
    <Ring radius={1.9} color="#f472b6" opacity={0.06} />
  </group>
);

const AmmoniaModel = () => (
  <group>
    <Atom position={[0, 0.15, 0]} color="#6b7280" radius={0.36} emissive="#111827" emissiveIntensity={0.12} />
    <Atom position={[0.95, -0.55, 0.65]} color="#ffffff" radius={0.22} />
    <Atom position={[-0.95, -0.55, 0.65]} color="#ffffff" radius={0.22} />
    <Atom position={[0, -0.55, -0.9]} color="#ffffff" radius={0.22} />
    <Bond start={[0, 0.15, 0]} end={[0.95, -0.55, 0.65]} />
    <Bond start={[0, 0.15, 0]} end={[-0.95, -0.55, 0.65]} />
    <Bond start={[0, 0.15, 0]} end={[0, -0.55, -0.9]} />
    <mesh position={[0, 1.05, 0]}>
      <sphereGeometry args={[0.14, 24, 24]} />
      <meshStandardMaterial color="#fde68a" emissive="#fde68a" emissiveIntensity={0.35} />
    </mesh>
    <Ring radius={1.15} color="#60a5fa" opacity={0.1} rotation={[Math.PI / 2, 0, 0]} />
  </group>
);

const CarbonDioxideModel = () => (
  <group>
    <Atom position={[-1.2, 0, 0]} color="#ef4444" radius={0.42} emissive="#7f1d1d" emissiveIntensity={0.12} />
    <Atom position={[0, 0, 0]} color="#374151" radius={0.34} emissive="#111827" emissiveIntensity={0.08} />
    <Atom position={[1.2, 0, 0]} color="#ef4444" radius={0.42} emissive="#7f1d1d" emissiveIntensity={0.12} />
    <Bond start={[-1.2, 0, 0]} end={[0, 0, 0]} color="#fca5a5" />
    <Bond start={[0, 0, 0]} end={[1.2, 0, 0]} color="#fca5a5" />
    <Bond start={[-1.1, 0.12, 0]} end={[-0.1, 0.12, 0]} color="#fecaca" />
    <Bond start={[0.1, -0.12, 0]} end={[1.1, -0.12, 0]} color="#fecaca" />
    <Ring radius={1.65} color="#93c5fd" opacity={0.08} rotation={[0, 0, Math.PI / 2]} />
  </group>
);

const CalciumChlorideHydrateModel = () => (
  <group>
    {[
      [-1.1, 0.9, 0.9], [1.1, 0.9, 0.9], [-1.1, -0.9, 0.9], [1.1, -0.9, 0.9],
      [-1.1, 0.9, -0.9], [1.1, 0.9, -0.9], [-1.1, -0.9, -0.9], [1.1, -0.9, -0.9],
      [0, 0, 0],
    ].map((position, index) => (
      <Atom
        key={index}
        position={position}
        color={index === 8 ? '#fde68a' : index % 2 === 0 ? '#dbeafe' : '#fca5a5'}
        radius={index === 8 ? 0.34 : 0.2}
        emissive={index === 8 ? '#fde68a' : '#111827'}
        emissiveIntensity={index === 8 ? 0.18 : 0}
      />
    ))}
    {[
      [[0, 0, 0], [-1.1, 0.9, 0.9]],
      [[0, 0, 0], [1.1, 0.9, 0.9]],
      [[0, 0, 0], [-1.1, -0.9, -0.9]],
      [[0, 0, 0], [1.1, -0.9, -0.9]],
    ].map(([start, end], index) => (
      <Bond key={index} start={start} end={end} color="#7dd3fc" />
    ))}
    <Ring radius={2.0} color="#67e8f9" opacity={0.08} />
  </group>
);

/**
 * Scene3D Component - ENHANCED VERSION
 * Sets up the complete Three.js rendering environment with:
 * - Advanced lighting setup (ambient + directional + point lights)
 * - Shadow mapping for realistic depth
 * - Two interaction modes: Auto Rotate (cinematic) and Live (user-controlled)
 * - Starfield background
 * - Environment mapping for reflections
 * - Optimized rendering performance
 */
export const Scene3D = ({ selectedModel, interactionMode = 'auto' }) => {
  // Determine orbit control settings based on interaction mode
  const isAutoMode = interactionMode === 'auto';
  
  const orbitSettings = {
    autoMode: {
      autoRotate: true,
      autoRotateSpeed: 2.5,
      rotateSpeed: 0.1,
      dampingFactor: 0.06,
      enableDamping: true,
      enableRotate: true,
      zoomSpeed: 0.35,
      minPolarAngle: 0.35,
      maxPolarAngle: Math.PI - 0.35,
      minDistance: 3.5,
      maxDistance: 12,
    },
    liveMode: {
      autoRotate: false,
      rotateSpeed: 0.75,
      dampingFactor: 0.085,
      enableDamping: true,
      enableRotate: true,
      zoomSpeed: 0.5,
      minPolarAngle: 0,
      maxPolarAngle: Math.PI,
      minDistance: 2.5,
      maxDistance: 15,
    },
  };

  const currentSettings = isAutoMode ? orbitSettings.autoMode : orbitSettings.liveMode;
  // Memoize shadow properties for consistency
  const shadowProps = useMemo(
    () => ({
      mapSize: 2048,
      camera: {
        left: -10,
        right: 10,
        top: 10,
        bottom: -10,
        near: 0.5,
        far: 50,
      },
    }),
    []
  );

  return (
    <div
      className="w-full h-96 relative"
      style={{
        touchAction: 'none',
        overscrollBehavior: 'contain',
        userSelect: 'none',
        pointerEvents: 'auto',
      }}
    >
      <Canvas
        className="w-full h-full"
        gl={{
          antialias: true,
          alpha: true,
          pixelRatio: window.devicePixelRatio,
          physicallyCorrectLights: true,
          shadowMap: {
            enabled: true,
            type: 2,
          },
        }}
        camera={{
          position: [0, 0, 5],
          fov: 75,
          near: 0.1,
          far: 1000,
        }}
      >
        {/* CAMERA */}
        <PerspectiveCamera
          makeDefault
          position={[0, 0, 5]}
          fov={75}
          near={0.1}
          far={1000}
        />

        {/* ADVANCED LIGHTING SETUP */}

        {/* Soft ambient light - provides base illumination without harsh shadows */}
        <ambientLight intensity={0.5} color="#ffffff" />

        {/* Main directional light - simulates sunlight with shadows */}
        <directionalLight
          position={[6, 8, 4]}
          intensity={1.2}
          color="#ffffff"
          castShadow
          shadow-mapSize-width={shadowProps.mapSize}
          shadow-mapSize-height={shadowProps.mapSize}
          shadow-camera-left={shadowProps.camera.left}
          shadow-camera-right={shadowProps.camera.right}
          shadow-camera-top={shadowProps.camera.top}
          shadow-camera-bottom={shadowProps.camera.bottom}
          shadow-camera-near={shadowProps.camera.near}
          shadow-camera-far={shadowProps.camera.far}
          shadow-bias={-0.0001}
        />

        {/* Cyan accent light - creates cool tone from left */}
        <pointLight
          position={[-6, 3, 5]}
          intensity={0.8}
          color="#00d4ff"
          distance={25}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        {/* Purple accent light - creates warm tone from right */}
        <pointLight
          position={[6, -4, 3]}
          intensity={0.7}
          color="#c700ff"
          distance={25}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        {/* Pink fill light - subtle from back */}
        <pointLight
          position={[0, 0, -8]}
          intensity={0.5}
          color="#ff1493"
          distance={20}
        />

        {/* Back light - creates rim lighting effect */}
        <directionalLight
          position={[0, -2, 8]}
          intensity={0.6}
          color="#1a88ff"
        />

        {/* ENVIRONMENT & ATMOSPHERE */}

        {/* Starfield background */}
        <Stars
          radius={120}
          depth={60}
          count={8000}
          factor={5}
          saturation={0}
          fade
          speed={0.1}
        />

        {/* Subtle environment for realistic reflections */}
        <Environment preset="night" intensity={0.4} />

        {/* FOG - Optional subtle atmospheric effect */}
        <fog attach="fog" args={["#0f0f1e", 10, 50]} />

        {/* 3D MODEL - switch by selectedModel */}
        {selectedModel ? (
          selectedModel.id === 'water' ? (
            <WaterMolecule interactionMode={interactionMode} />
          ) : selectedModel.id === 'methane' ? (
            <MethaneModel />
          ) : selectedModel.id === 'carbon_dioxide' ? (
            <CarbonDioxideModel />
          ) : selectedModel.id === 'ammonia' ? (
            <AmmoniaModel />
          ) : selectedModel.id === 'calcium_chloride_hydrate' ? (
            <CalciumChlorideHydrateModel />
          ) : selectedModel.id === 'salt_crystal' || selectedModel.id === 'calcium_chloride' ? (
            <SaltCrystalModel />
          ) : selectedModel.id === 'sodium_ion' ? (
            <SodiumIonModel />
          ) : selectedModel.id === 'potassium_ion' ? (
            <PotassiumIonModel />
          ) : selectedModel.id === 'ammonium_ion' ? (
            <AmmoniumIonModel />
          ) : selectedModel.id === 'protein_fragment' || selectedModel.id === 'enzyme_fragment' ? (
            selectedModel.id === 'enzyme_fragment' ? <EnzymeFragmentModel /> : <ProteinFragmentModel />
          ) : (
            <WaterMolecule interactionMode={interactionMode} />
          )
        ) : (
          <WaterMolecule interactionMode={interactionMode} />
        )}

        {/* ORBIT CONTROLS - Dynamic settings based on interaction mode */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          enableRotate={currentSettings.enableRotate}
          autoRotate={currentSettings.autoRotate}
          autoRotateSpeed={currentSettings.autoRotateSpeed}
          rotateSpeed={currentSettings.rotateSpeed}
          zoomSpeed={currentSettings.zoomSpeed}
          minDistance={currentSettings.minDistance}
          maxDistance={currentSettings.maxDistance}
          dampingFactor={currentSettings.dampingFactor}
          enableDamping={currentSettings.enableDamping}
          screenSpacePanning={false}
          zoomToCursor={false}
          minPolarAngle={currentSettings.minPolarAngle}
          maxPolarAngle={currentSettings.maxPolarAngle}
          regress={false}
          listenToKeyEvents={false}
        />
      </Canvas>
    </div>
  );
};

export default Scene3D;
