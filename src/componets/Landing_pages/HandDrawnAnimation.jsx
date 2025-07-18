import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import MyDrawing from '../../assets/web_intro1.svg?react';
import '../../HandDrawnAnimation.css';

const HandDrawnAnimation = ({ onAnimationComplete = () => {} }) => {
    const wrapperRef = useRef(null); 
    const [isAnimationDone, setIsAnimationDone] = useState(false);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        const svgElement = wrapper.querySelector('svg');
        if (!svgElement) return;

        const paths = svgElement.querySelectorAll('path');
        paths.forEach(path => {
            path.style.stroke = 'white';
            path.style.strokeWidth = '2px';
            path.style.fill = 'transparent';
            const length = path.getTotalLength();
            gsap.set(path, {
                strokeDasharray: length,
                strokeDashoffset: length,
            });
        });

        const tl = gsap.timeline({
            onComplete: () => {
                setIsAnimationDone(true);
            }
        });

        tl.to(paths, {
            strokeDashoffset: 0,
            duration: 1,
            ease: 'power1.inOut',
            stagger: 0.04
        });
        tl.to(paths, {
            fill: '#7a6fb9',
            duration: 0.5
        });

        tl.to(wrapper, {
            scale: 1.1,
            duration: 1,
            ease: 'expo.out'
        });

        tl.to(wrapper, {
            scale: 1,
            duration: 0.8,
            ease: 'expo.inOut'
        });

        tl.timeScale(2.7);

    }, []);

    return (
        <div className="animation-container relative flex flex-col justify-center items-center bg-black top-0 left-0 w-lvw h-lvh overflow-hidden">
            <div
                ref={wrapperRef}
                className="svg-wrapper w-lvw h-lvh flex justify-center items-center"
                style={{ transformOrigin: 'center center' }}
            >
                <MyDrawing />
            </div>

            {isAnimationDone && (
                <div className="enter-btn absolute bottom-[15%] font-[hand-font] text-white hover:bg-[#7a6fb9] hover:px-10 text-normal border rounded-full px-8 py-2 animate-pulse transition-all duration-300">
                    <button className="enter-button cursor-pointer" onClick={onAnimationComplete}>
                        Enter into Awesomeness !
                    </button>
                </div>
            )}
        </div>
    );
};

export default HandDrawnAnimation;
