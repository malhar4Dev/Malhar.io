import { useRef, useEffect, useState } from "react";
import useDragger from "../../hooks/useDragger";

const Window = ({ title, onClose, child }) => {
  const windowRef = useRef(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [initialized, setInitialized] = useState(false);


  useDragger(windowRef, position, setPosition);


  useEffect(() => {
    if (windowRef.current) {
      const win = windowRef.current;
      if (isMaximized) {
        win.style.top = "0px";
        win.style.left = "0px";
        win.style.width = "100vw";
        win.style.height = "100vh";
      } else {
        win.style.width = "60vw";
        win.style.height = "80vh";
      }
    }
  }, [isMaximized]);

//centering the div
  useEffect(() => {
    if (!initialized && windowRef.current) {
      const win = windowRef.current;
      const { width, height } = win.getBoundingClientRect();
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      const centerX = (screenWidth - width) / 2;
      const centerY = (screenHeight - height) / 2;

      setPosition({ x: centerX, y: centerY });
      setInitialized(true);
    }
  }, [initialized]);

  if (isMinimized) return null;

  return (
    <div
      ref={windowRef}
      className="fixed z-50  bg-white border border-gray-600 rounded shadow-lg overflow-hidden"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      <div className="bg-blue-500  text-white flex justify-between px-2 items-center cursor-move select-none">
        <span>{title}</span>
        <div className="flex gap-2">
          <button onClick={() => setIsMinimized(true)}>🗕</button>
          <button onClick={() => setIsMaximized(!isMaximized)}>
            {isMaximized ? "🗗" : "🗖"}
          </button>
          <button onClick={onClose}>✖</button>
        </div>
      </div>
      <div className="h-full overflow-auto">{child} </div>
    </div>
  );
};

export default Window;
