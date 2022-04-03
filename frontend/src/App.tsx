import React, { useState } from "react";
import WordCard from "./components/WordCard";
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
          placeholder="Enter a word"
          onChange={handleInputChange}
        />
        <button
          className="border-2 border-sky-500 px-5 py-2 rounded-md"
          onClick={handleWordAdd}
        >
          Add
        </button>
      </div>
      <div className="mt-4 flex flex-col w-2/3 max-w-xs">
        {words.map((word) => (
          <WordCard key={word._id} word={word}>{word.word}</WordCard>
        ))}
      </div>
    </div>
  );
}

export default App;
