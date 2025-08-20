
import React from "react";

const ThemeToggle: React.FC = () => {
  return (
    <button>
      Toggle Theme
    </button>
  );
};


function App() {
  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen text-black dark:text-white">
      <ThemeToggle />
      <h1 className="text-2xl font-bold">Frontend Assignment</h1>
      {/* Your other components */}
    </div>
  );
}

export default App;