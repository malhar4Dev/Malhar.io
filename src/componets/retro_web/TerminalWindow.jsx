import { useEffect, useState } from "react";
import Help from "./help";

const TerminalWindow = () => {
    const [displayedLines, setDisplayedLines] = useState([]);
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isBooting, setIsBooting] = useState(true);
    const [command, setCommand] = useState("");
    const [showHelp, setShowHelp] = useState(false);

    const terminalLines = [
        "Initializing Malhar.io System [v1.0.0]...",
        "Checking user level ... Done",
        "Awesome user found !",
        ".",
        "Establishing secure connection... Success",
        ".",
        ".",
        "Welcome to Malhar.io , this website aims to Enlighten the work i've done in a complete retro theme.",
        "> Hello ,I am Malhar Kulkarni !",
        "> MERN-stack developer , Graphic designer from Pune,India.",
        "> Projects, thoughts, and experiments live here — and so does a tiny bit of chaos.",
        ".",
        " ",
        "Type 'help' to explore, or just sit back and enjoy the experience.",
    ];

    // Typewriter effect
    useEffect(() => {
        if (lineIndex >= terminalLines.length) {
            setIsBooting(false);
            return;
        }

        const currentLine = terminalLines[lineIndex];
        if (charIndex < currentLine.length) {
            const timer = setTimeout(() => {
                setDisplayedLines((prev) => {
                    const updated = [...prev];
                    if (!updated[lineIndex]) updated[lineIndex] = "";
                    updated[lineIndex] += currentLine[charIndex];
                    return updated;
                });
                setCharIndex((prev) => prev + 1);
            }, 5 + Math.random() * 50); 
            return () => clearTimeout(timer);
        } else {
            // Finished typing current line, move to next after short delay
            const nextLineDelay = setTimeout(() => {
                setLineIndex((prev) => prev + 1);
                setCharIndex(0);
            }, 50);
            return () => clearTimeout(nextLineDelay);
        }
    }, [lineIndex, charIndex]);

    // Handle user command input
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            setDisplayedLines((prev) => [...prev, `> ${command}`]);
            if (command.toLowerCase() === "help") {
                setShowHelp(true);
            } else {
                setDisplayedLines((prev) => [...prev, `Unknown command: ${command}`]);
            }
            setCommand("");
        }
    };

    return (
        <div className="bg-black text-white font-mono text-sm p-4 h-full overflow-y-auto">
            {displayedLines.map((line, index) => (
                <div key={index}>{line}</div>
            ))}

            {!isBooting && !showHelp && (
                <div className="flex">
                    <span>&gt; </span>
                    <input
                        className="bg-black text-green-400 border-none outline-none w-full"
                        value={command}
                        onChange={(e) => setCommand(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                    />
                </div>
            )}

            {isBooting && <div className="animate-pulse text-green-400">_</div>}

            {showHelp && <Help />}
        </div>
    );
};

export default TerminalWindow;
