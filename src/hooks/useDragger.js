import { useEffect, useRef } from "react";

function useDragger(ref) {
  const isDragging = useRef(false);
  const coords = useRef({
    startX: 0,
    startY: 0,
    lastX: 100,
    lastY: 100,
  });

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    target.style.position = 'absolute';
    target.style.top = `${coords.current.lastY}px`;
    target.style.left = `${coords.current.lastX}px`;

    const onMouseDown = (e) => {
      isDragging.current = true;
      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;
    };

    const onMouseMove = (e) => {
      if (!isDragging.current) return;

      const x = e.clientX - coords.current.startX + coords.current.lastX;
      const y = e.clientY - coords.current.startY + coords.current.lastY;

      target.style.left = `${x}px`;
      target.style.top = `${y}px`;
    };

    const onMouseUp = () => {
      isDragging.current = false;
      coords.current.lastX = target.offsetLeft;
      coords.current.lastY = target.offsetTop;
    };

    target.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      target.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [ref]);
}

export default useDragger;
