import React, { useState, useRef, useEffect } from 'react';
import theme_music from '../../assets/Robots a Cometh - Dan Lebowitz.mp3'


function ThemeMusic() {
    const audioRef = useRef(null);
    const audiobtnRef = useRef(null);
    const [isMuted, setIsMuted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);

    useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.15;

    const savedMuteState = localStorage.getItem('isMuted');
    const mute = savedMuteState === 'true'; 
    audio.muted = mute;
    setIsMuted(mute);

    const tryPlay = () => {
        audio.play()
            .then(() => {
                setIsPlaying(true);
                window.removeEventListener('click', tryPlay);
            })
            .catch(err => {
                console.log('Autoplay blocked:', err.message);
                setIsPlaying(false);
                window.addEventListener('click', tryPlay, { once: true });
            });
    };

    tryPlay();
}, []);


    const toggleMute = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (!isPlaying) {
            audio.play();
            setIsPlaying(true);
        }

        const newMuted = !isMuted;
        audio.muted = newMuted;
        setIsMuted(newMuted);
        localStorage.setItem('isMuted', newMuted);
    };

    return (
        <div>
            <audio
                ref={audioRef} src={theme_music} autoPlay loop />
            <button ref={audiobtnRef} onClick={toggleMute}className="text-xl text-gray-800 dark:text-gray-100 cursor-pointer">
                {isMuted ? (
                    <i className="fa-solid fa-volume-xmark"></i>) : (
                    <i className="fa-solid fa-volume-high"></i>
                )}
            </button>
        </div>
    );
}

export default ThemeMusic;
