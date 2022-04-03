import React, { useState } from "react";
import useWords from "./hooks/useWords";

function App() {
  const { words, create } = useWords();
  const [input, setInput] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value);

  const handleWordAdd = () => {
    create(input);
  };

  return (
    <div className="flex flex-col items-center mt-10 w-screen min-h-screen rounded-md">
      <div>
        <input
          className="px-2 py-2 mr-3"
          value={input}
          onChange={handleInputChange}
        />
        <button
          className="border-2 border-indigo-700 px-2 py-2 rounded-md"
          onClick={handleWordAdd}
        >
          Add
        </button>
      </div>
      <div>
        {words.map((word) => (
          <div key={word._id}>{word.word}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
