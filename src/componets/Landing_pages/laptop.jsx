import React, { useRef, useEffect, useState } from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Laptop(props) {
  const { nodes, materials } = useGLTF('/models/modern_slim_laptop.glb');
  const texture = useTexture('/assets/maybefinal.jpg'); 

  const screenGroupRef = useRef();
  const laptopGroupRef = useRef();
  const pivotGroupRef = useRef();

  const [animationStartTime] = useState(() => performance.now());

  const closedAngle = THREE.MathUtils.degToRad(180);
  const openAngle = THREE.MathUtils.degToRad(80);

  useEffect(() => {
    if (screenGroupRef.current) {
      screenGroupRef.current.rotation.set(closedAngle, 0, 0);
    }
  }, []);

  useFrame(() => {
    const elapsed = (performance.now() - animationStartTime) / 1000;

    if (!pivotGroupRef.current || !laptopGroupRef.current || !screenGroupRef.current) return;

    const scaleProgress = Math.min(elapsed / 2, 1);
    const scale = THREE.MathUtils.lerp(0.25, 0.1, scaleProgress);
    laptopGroupRef.current.scale.set(scale, scale, scale);

    const positionX = THREE.MathUtils.lerp(0, -1.5, scaleProgress);
    laptopGroupRef.current.position.x = positionX;

    const openProgress = Math.min(elapsed / 2, 1);
    screenGroupRef.current.rotation.x = THREE.MathUtils.lerp(closedAngle, openAngle, openProgress);

    const baseRotation = Math.PI * 2;
    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    if (elapsed < 1.8) {
      const preSpin = elapsed;
      pivotGroupRef.current.rotation.y = baseRotation + preSpin * 0.28;
    } else if (elapsed >= 1.8 && elapsed <= 3) {
      const spinProgress = (elapsed - 1.8) / 1.2;
      const easedSpin = easeInOutCubic(spinProgress);
      pivotGroupRef.current.rotation.y = baseRotation + 1.8 * 0.28 + easedSpin * Math.PI * 2;
    } else if (elapsed > 3) {
      const postSpin = elapsed - 3;
      pivotGroupRef.current.rotation.y = baseRotation + 1.8 * 0.28 + Math.PI * 2 + postSpin * 0.2;
    }
  });

  return (
    <group {...props} ref={pivotGroupRef} position={[0, 0, 0]}>
      <group
        ref={laptopGroupRef}
        rotation={[0, 0, -Math.PI / 9]}
        position={[0, -0.6, 0]}
      >
        <group>
          <group position={[0, 0.024, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh geometry={nodes.Modern_Slim_Laptop_Base_0.geometry} material={materials.Base} />
            <mesh geometry={nodes.Modern_Slim_Laptop_Touchpad_0.geometry} material={materials.Touchpad} />
            <mesh geometry={nodes.Modern_Slim_Laptop_Plastic_Black_Ports_0.geometry} material={materials.Plastic_Black_Ports} />
            <mesh geometry={nodes.Modern_Slim_Laptop_Lights_0.geometry} material={materials.Lights} />
            <group ref={screenGroupRef} position={[0, 0.122, 0.008]}>
              <mesh geometry={nodes.Screen_Frame_Screen_Frame_0.geometry} material={materials.Screen_Frame} />
              <mesh geometry={nodes.Screen_Frame_Screen_Shiny_Border_0.geometry} material={materials.Screen_Shiny_Border} />
              <mesh geometry={nodes.Screen_Frame_Base_0.geometry} material={materials.Base} />

              {/* ✅ This is where we override the screen with the image */}
              <mesh geometry={nodes.Screen_Screen_0.geometry}>
                <meshBasicMaterial map={texture} toneMapped={false} />
              </mesh>
            </group>
            <mesh
              geometry={nodes.Keyboard_Keyboard_0.geometry}
              material={materials.Keyboard}
              position={[-0.067, 0.001, 0.009]}
              rotation={[0.023, 0, 0]}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/models/modern_slim_laptop.glb');
