import React from 'react';
import RetroWeb from '../retro_web/retro_web';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, PresentationControls } from '@react-three/drei';
import { Laptop }from './laptop';


const LandingPage = ({ Retro }) => {
    return (
        <>
        <div>
            <Canvas className="bg-gray-950 " style={{ height: '100vh', width: '100vw' }}>

                <ambientLight intensity={5} />

                <directionalLight
                    position={[3, 6, 4]}
                    intensity={8}
                    castShadow
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                    shadow-camera-far={10}
                    shadow-camera-left={-5}
                    shadow-camera-right={5}
                    shadow-camera-top={5}
                    shadow-camera-bottom={-5}
                />

                <pointLight position={[2, -1, 6]} intensity={0.8} />



                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    minPolarAngle={Math.PI / 2}
                    maxPolarAngle={Math.PI / 2}
                />

                <directionalLight 
                
                    position={[-3, -4, 6]}
                    intensity={4}
                />

                <Laptop />
            </Canvas>

        </div>
        </>
    );
}

export default LandingPage;
