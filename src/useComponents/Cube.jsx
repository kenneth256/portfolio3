import React, { useRef, useState } from 'react';
import { useGLTF, Float } from '@react-three/drei';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { MeshStandardMaterial } from 'three';

const Cube = (props) => {
  const { nodes, materials } = useGLTF('/models/cube1.glb');
  const cubeRef = useRef();
  const [hovered, setHovered] = useState(false);

  useGSAP(() => {
    gsap.timeline({
      repeat: -1,
      repeatDelay: 0.5,
    })
    .to(cubeRef.current.rotation, {
      y: hovered ? '+=2' : `+=${Math.PI * 2}`,
      x: hovered ? '+=2' : `-=${Math.PI * 2}`,
      duration: 2.5,
      stagger: {
        each: 0.15,
      },
    });
  });

  return (
    <Float floatIntensity={2}>
      <group {...props} dispose={null} scale={0.1}>
        <group 
          ref={cubeRef}
          rotation={[-Math.PI / 2, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_3.geometry}
            position={[0, -4, 0]}
            onPointerEnter={() => setHovered(true)}>
            <meshPhongMaterial 
              color={hovered ? '#ff0000' : '#00ff00'}
              emissive={hovered ? '#880000' : '#008800'}
              shininess={100}
            />
          </mesh>
        </group>
      </group>
    </Float>
  );
};

useGLTF.preload('/models/cube1.glb');
export default Cube;