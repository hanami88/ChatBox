import { useState, useEffect } from "react";

function ThemeToggle() {
  const [dark, setDark] = useState(localStorage.getItem("theme") === "dark");
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);
  return (
    <div className="switch-wrapper-sun-moon pt-2 ml-[5.1rem]">
      <label className="switch-sun-moon" htmlFor="switch-sun-moon">
        <input
          id="switch-sun-moon"
          type="checkbox"
          checked={dark}
          onChange={() => setDark(!dark)}
        />
        <span className="slider-sun-moon"></span>
      </label>
    </div>
  );
}

export default ThemeToggle;
