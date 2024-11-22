import { PerspectiveCamera } from "@react-three/drei";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import HackerRoom from "./Labo";
import Loader from "./Loader";

import { useMediaQuery } from "react-responsive";
import { calculateSizes } from "../constants";
import Target from "../useComponents/Target";
import ReactLogo from "../useComponents/ReactLogo";
import Cube from "../useComponents/Cube";
import Rings from "../useComponents/Rings";
import HeroCam from "./HeroCam";
import Button from "../useComponents/Buttont";

const Hero = () => {
  const isMall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const sizes = calculateSizes(isMall, isMobile, isTablet);

  return (
    <section className="min-h-screen w-full flex flex-col relative">
      <div className="mt-20 sm:my-36 gap-3 c-space flex items-center flex-col">
        <p className="text-center text-generalsans text-white font-medium sm:font-3xl text-2xl">
          Hi, I am kenneth a web developer{" "}
          <span className="waving-hand"> 😊 </span>{" "}
        </p>
        <p className="hero tag text-gray_gradient">
          Building beautiful web apps
        </p>
      </div>
      <div className="w-full h-full absolute inset-0 ">
        <Canvas className="w-full h-full">
          <Suspense fallback={<Loader />}>
            <PerspectiveCamera makeDefault position={[0, 0, 20]} />
            <HeroCam>
              <HackerRoom
                scale={sizes.deskScale}
                position={sizes.deskPosition}
                rotation={[0, -Math.PI, 0]}
              />
            </HeroCam>
            <group>
              <Target position={sizes.targetPosition} />
              <ReactLogo position={sizes.reactLogoPosition} />
              <Cube position={sizes.cubePosition} />
              <Rings position={sizes.ringPosition} />
            </group>
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 10]} intensity={0.5} />
          </Suspense>
        </Canvas>
      </div>
      <div className="absolute c-space bottom-7 z-10 left-0 w-full right-0">
        <a href="#about" className="w-fit">
        <Button name="Let's work together" isBeam containerClass="sm:w-fit w-full sm:min-w-96" />

        </a>
      </div>
    </section>
  );
};

export default Hero;
