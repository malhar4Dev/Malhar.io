import { useState } from 'react';

import LandingPage from './componets/Landing_pages/landing_page';
import HandDrawnAnimation from './componets/Landing_pages/HandDrawnAnimation';
import RetroWeb from './componets/retro_web/retro_web';
import './index.css';

import { Laptop } from './componets/Landing_pages/laptop';
import { Mac } from './componets/Landing_pages/macbook';


function App() {
  const [animationFinished, setAnimationFinished] = useState(false);


  const handleAnimationComplete = () => {
    setAnimationFinished(true);
  };

  return (
    <>
      {!animationFinished ? (
        <HandDrawnAnimation onAnimationComplete={handleAnimationComplete} />
      ) : (
        <LandingPage />
      )}

      



    </>
  );
}

export default App;