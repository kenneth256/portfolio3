import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import React, { useRef } from 'react'

const HeroCam = ({children, isMobile}) => {
    const ref = useRef();
    // maath use
    useFrame((state, delta) => {
        easing.damp3(state.camera.position, [0, 0, 20], 0.25, delta)

         if(!isMobile) {
            easing.dampE(ref.current.rotation, [-state.pointer.y / 3, -state.pointer.x / 5, 0], 0.25, delta)
         }

    })
  return (
    <group ref={ref} scale={isMobile ? 1 : 1.3}>
        {children}
    </group>
  )
  
}

export default HeroCam
