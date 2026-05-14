import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * WaterMolecule Component - ENHANCED VERSION
 * Renders a realistic 3D water molecule (H2O) with:
 * - Realistic PBR materials (MeshStandardMaterial)
 * - Glossy red oxygen with emissive glow
 * - Semi-transparent white hydrogen atoms
 * - Metallic bond cylinders with shine
 * - Smooth floating animation in Auto Rotate mode
 * - Static in Live mode for user control
 * - Dynamic shadows and reflections
 * - Optimized for performance
 */
export const WaterMolecule = ({ interactionMode = 'auto' }) => {
  const groupRef = useRef();
  const oxygenRef = useRef();
  const hydrogen1Ref = useRef();
  const hydrogen2Ref = useRef();
  const bond1Ref = useRef();
  const bond2Ref = useRef();
  const floatOffsetRef = useRef(0);

  // Only animate in auto mode
  const shouldAnimate = interactionMode === 'auto';

  // Position calculations for water molecule geometry
  // H2O has a bent molecular geometry with ~104.5° bond angle
  const oxygenPosition = [0, 0, 0];
  const bondLength = 1.5;
  const bondAngle = Math.PI * 0.58; // ~104.5 degrees

  // Calculate hydrogen positions
  const hydrogen1Position = [
    Math.sin(bondAngle / 2) * bondLength,
    Math.cos(bondAngle / 2) * bondLength,
    0,
  ];
  const hydrogen2Position = [
    -Math.sin(bondAngle / 2) * bondLength,
    Math.cos(bondAngle / 2) * bondLength,
    0,
  ];

  // Memoize materials for better performance
  const oxygenMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#ff2222'),
      emissive: new THREE.Color('#ff0000'),
      emissiveIntensity: 0.5,
      metalness: 0.3,
      roughness: 0.4,
      envMapIntensity: 1.0,
    });
  }, []);

  const hydrogenMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#ffffff'),
      emissive: new THREE.Color('#88ffff'),
      emissiveIntensity: 0.3,
      metalness: 0.4,
      roughness: 0.3,
      transparent: true,
      opacity: 0.95,
      envMapIntensity: 0.8,
    });
  }, []);

  const bondMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#b700ff'),
      emissive: new THREE.Color('#9000ff'),
      emissiveIntensity: 0.6,
      metalness: 0.8,
      roughness: 0.2,
      envMapIntensity: 1.2,
    });
  }, []);

  // Smooth animations with useFrame
  useFrame(({ clock }, delta) => {
    const elapsed = clock.getElapsedTime();

    if (groupRef.current) {
      // Floating motion only in auto mode
      groupRef.current.position.y = shouldAnimate ? Math.sin(elapsed * 0.7) * 0.14 : 0;
      groupRef.current.rotation.y = 0;
      groupRef.current.rotation.x = 0;
      groupRef.current.rotation.z = 0;
    }

    // Small breathing effect on the oxygen atom (only in auto mode)
    if (oxygenRef.current && shouldAnimate) {
      const pulseScale = 1 + Math.sin(elapsed * 1.2) * 0.03;
      oxygenRef.current.scale.setScalar(pulseScale);

      const material = oxygenRef.current.material;
      if (material) {
        material.emissiveIntensity = 0.45 + Math.sin(elapsed * 1.2) * 0.08;
      }
    }

    // Keep materials alive with subtle variation (only in auto mode)
    if (shouldAnimate) {
      const hydrogenGlow = 0.22 + Math.sin(elapsed * 1.1) * 0.04;
      const bondGlow = 0.5 + Math.sin(elapsed * 1.0) * 0.06;

      if (hydrogen1Ref.current && hydrogen1Ref.current.material) {
        hydrogen1Ref.current.material.emissiveIntensity = hydrogenGlow;
      }

      if (hydrogen2Ref.current && hydrogen2Ref.current.material) {
        hydrogen2Ref.current.material.emissiveIntensity = hydrogenGlow;
      }

      if (bond1Ref.current && bond1Ref.current.material) {
        bond1Ref.current.material.emissiveIntensity = bondGlow;
      }

      if (bond2Ref.current && bond2Ref.current.material) {
        bond2Ref.current.material.emissiveIntensity = bondGlow;
      }
    } else {
      // Reset to base states when in live mode
      if (oxygenRef.current) oxygenRef.current.scale.setScalar(1);
      if (oxygenRef.current?.material) oxygenRef.current.material.emissiveIntensity = 0.5;
      if (hydrogen1Ref.current?.material) hydrogen1Ref.current.material.emissiveIntensity = 0.3;
      if (hydrogen2Ref.current?.material) hydrogen2Ref.current.material.emissiveIntensity = 0.3;
      if (bond1Ref.current?.material) bond1Ref.current.material.emissiveIntensity = 0.6;
      if (bond2Ref.current?.material) bond2Ref.current.material.emissiveIntensity = 0.6;
    }
  });

  return (
    <group ref={groupRef}>
      {/* OXYGEN ATOM - Glossy red with realistic material */}
      <mesh
        ref={oxygenRef}
        position={oxygenPosition}
        castShadow
        receiveShadow
      >
        <sphereGeometry args={[0.8, 64, 64]} />
        <primitive object={oxygenMaterial} />

        {/* Outer glow layer - subtle enhancement */}
        <mesh scale={1.15} renderOrder={-1}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshBasicMaterial
            color="#ff3333"
            transparent
            opacity={0.08}
          />
        </mesh>
      </mesh>

      {/* HYDROGEN ATOM 1 - Semi-transparent white with cyan glow */}
      <mesh
        ref={hydrogen1Ref}
        position={hydrogen1Position}
        castShadow
        receiveShadow
      >
        <sphereGeometry args={[0.5, 64, 64]} />
        <primitive object={hydrogenMaterial} />

        {/* Subtle glow effect */}
        <mesh scale={1.12} renderOrder={-1}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshBasicMaterial
            color="#00f0ff"
            transparent
            opacity={0.06}
          />
        </mesh>
      </mesh>

      {/* HYDROGEN ATOM 2 - Semi-transparent white with cyan glow */}
      <mesh
        position={hydrogen2Position}
        castShadow
        receiveShadow
        ref={hydrogen2Ref}
      >
        <sphereGeometry args={[0.5, 64, 64]} />
        <primitive object={hydrogenMaterial} />

        {/* Subtle glow effect */}
        <mesh scale={1.12} renderOrder={-1}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshBasicMaterial
            color="#00f0ff"
            transparent
            opacity={0.06}
          />
        </mesh>
      </mesh>

      {/* BONDS - Metallic cylinders with shine */}
      <Bond
        ref={bond1Ref}
        startPos={oxygenPosition}
        endPos={hydrogen1Position}
        material={bondMaterial}
      />
      <Bond
        ref={bond2Ref}
        startPos={oxygenPosition}
        endPos={hydrogen2Position}
        material={bondMaterial}
      />
    </group>
  );
};

/**
 * Bond Component - ENHANCED VERSION
 * Renders metallic bonds between atoms with realistic materials
 * @param {Object} ref - React ref
 * @param {Array} startPos - Starting position
 * @param {Array} endPos - Ending position
 * @param {Material} material - Three.js material
 */
const Bond = React.forwardRef(({ startPos, endPos, material }, ref) => {
  const meshRef = useRef();

  useEffect(() => {
    if (meshRef.current) {
      // Calculate bond direction and length
      const start = new THREE.Vector3(...startPos);
      const end = new THREE.Vector3(...endPos);
      const direction = end.clone().sub(start);
      const length = direction.length();

      // Position bond at midpoint
      const midpoint = start.clone().add(direction.clone().multiplyScalar(0.5));
      meshRef.current.position.copy(midpoint);

      // Rotate bond to point from start to end
      meshRef.current.lookAt(end);
      meshRef.current.rotateX(Math.PI / 2);
    }
  }, [startPos, endPos]);

  const distance = Math.hypot(
    endPos[0] - startPos[0],
    endPos[1] - startPos[1],
    endPos[2] - startPos[2]
  );

  return (
    <mesh
      ref={(node) => {
        meshRef.current = node;
        if (ref) ref.current = node;
      }}
      castShadow
      receiveShadow
    >
      <cylinderGeometry args={[0.12, 0.12, distance, 32]} />
      <primitive object={material} />
    </mesh>
  );
});

Bond.displayName = 'Bond';

export default WaterMolecule;
