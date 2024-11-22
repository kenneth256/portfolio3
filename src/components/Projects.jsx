import React, { Suspense, useState } from 'react';
import { myProjects } from '../constants';
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls } from '@react-three/drei';
import Loader from './Loader';
import Demo from '../useComponents/Demo';

const myProjectCount = myProjects.length;

const Projects = () => {
    const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
    const currentProject = myProjects[selectedProjectIndex];

    const handleNavigation = (direction) => {
        setSelectedProjectIndex((prevIndex) => {
            if (direction === 'previous') {
                return prevIndex === 0 ? myProjectCount - 1 : prevIndex - 1;
            } else {
                return prevIndex === myProjectCount - 1 ? 0 : prevIndex + 1;
            }
        });
    };

    return (
        <section className='c-space my-20'>
            <p className='head-text'>My work</p>
            <div className='grid lg:grid-cols-2 w-full grid-cols-1 mt-12 gap-5'>
                {/* Left Section */}
                <div className='flex flex-col sm:p-10 px-5 shadow-xl gap-5 relative shadow-black-200'>
                    {/* Spotlight Image */}
                    <div className='absolute top-0 right-0'>
                        <img
                            src={currentProject.spotlight}
                            alt='spotlight'
                            className='w-full h-96 object-cover rounded-xl'
                        />
                    </div>

                    {/* Logo */}
                    <div style={currentProject.logoStyle} className='p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg'>
                        <img
                            src={currentProject.logo}
                            className='w-10 h-10 object-cover rounded-lg'
                            alt='logo'
                        />
                    </div>

                    {/* Project Description */}
                    <div className='flex flex-col gap-5 text-white-600 my-5'>
                        <p className='text-white text-2xl font-semibold animatedText'>
                            {currentProject.title}
                        </p>
                        <p className='animatedText'>{currentProject.desc}</p>
                        <p className='animatedText'>{currentProject.subdesc}</p>
                    </div>

                    {/* Tags and Live Site */}
                    <div className='flex items-center justify-between flex-wrap gap-5'>
                        <div className='flex items-center gap-3'>
                            {currentProject.tags?.map((tag, index) => (
                                <div key={index} className='tech-logo'>
                                    <img src={tag.path} alt={tag.name} />
                                </div>
                            ))}
                        </div>
                        <a
                            className='flex items-center gap-2 cursor-pointer text-white-600'
                            href={myProjects[selectedProjectIndex].href}
                            target='_blank'
                            rel='noreferrer'
                        >
                            <p>Check Live Site</p>
                            <img
                                alt='arrow'
                                src='/assets/arrow-up.png'
                                className='w-3 h-3'
                            />
                        </a>
                    </div>

                    {/* Navigation Buttons */}
                    <div className='flex justify-between items-center mt-7'>
                        <button className='arrow-btn' onClick={() => handleNavigation('previous')}>
                            <img
                                src='/assets/left-arrow.png'
                                alt='left arrow'
                                className='w-4 h-4'
                            />
                        </button>
                        <button className='arrow-btn' onClick={() => handleNavigation('next')}>
                            <img
                                src='/assets/right-arrow.png'
                                alt='right arrow'
                                className='w-4 h-4'
                            />
                        </button>
                    </div>
                </div>

                {/* Right Section */}
                <div className='border border-black-300 bg-black-200 rounded-lg h-96 md:h-full'>
                    <Canvas>
                        <ambientLight intensity={Math.PI} />
                        <directionalLight position={[10, 10, 5]} />
                        <Center>
                            <Suspense fallback={<Loader />}>
                                <group
                                    scale={2}
                                    position={[0, -3, 0]}
                                    rotation={[0, -0.1, 0]}
                                >
                                    <Demo texture={currentProject.texture} />
                                </group>
                            </Suspense>
                        </Center>
                        <OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={false} />
                    </Canvas>
                </div>
            </div>
        </section>
    );
};

export default Projects;
