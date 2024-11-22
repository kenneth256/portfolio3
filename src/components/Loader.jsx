import { Html, useProgress } from '@react-three/drei'
import React from 'react'

const Loader = () => {
    const {progress} = useProgress()
  return (
    <Html as='div' center style={{display: 'flex', alignItems: 'center', flexDirection:'column', justifycontent:'center'}}>
      <span className='canvas-loader' />
      <p style={{fontSize: 14, color: '#f1f1f1', fonttweight:800, marginTop:40 }}>
        {progress !== 0 ? `${progress.toFixed(2)} %` : 'Loading...'}
      </p>
    </Html>
  )
}

export default Loader
