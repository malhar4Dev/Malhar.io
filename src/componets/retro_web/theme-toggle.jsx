import { useState, useEffect } from 'react';

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', newTheme);
    setIsDark(!isDark);
  };

  return (
    <button onClick={toggleTheme} className="p-2">
      {isDark ? <i className="text-xl hover:invert-25 cursor-pointer invert fa-solid fa-moon"> </i>:<i className="text-xl hover:invert-25 invert fa-solid fa-sun"></i> }
    </button>
  );
}

export default ThemeToggle;
