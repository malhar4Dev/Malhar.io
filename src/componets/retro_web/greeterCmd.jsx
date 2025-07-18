import React, { useEffect, useState } from "react";
import Window from "./window";
import TerminalWindow from "./TerminalWindow";

const GreeterCmd = () => {
  const [showGreeting, setShowGreeting] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");

    if (!hasVisited) {
      setShowGreeting(true);
      sessionStorage.setItem("hasVisited", "true");
    }
  }, []);

  if (!showGreeting) return null;

  return (
    <Window
      title="cmd.exe"
      onClose={() => setShowGreeting(false)}
      child={
        <div className="bg-black text-sm font-[hacker-font] h-full w-full">
          <TerminalWindow />
        </div>
      }
    />
  );
};

export default GreeterCmd;
