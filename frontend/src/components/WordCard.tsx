import { Word } from "../hooks/useWords";
import { FiX, FiEdit3 } from "react-icons/fi";
import React, { useState } from "react";
interface WordCardProps {
  word: Word;
  children: React.ReactNode;
  deleteWord: (id: string) => void;
}

export default function WordCard({
  word,
  deleteWord,
  ...props
}: WordCardProps) {
  const [value, setValue] = useState(word.word);
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleUpdate = () => {};
  const handleDelete = () => {
    deleteWord(word._id);
  };
  return (
    <div className="bg-white py-2 my-2 border-2 border-gray-300 rounded-md px-4 hover:border-sky-200 flex justify-between items-center">
      <input onBlur={handleUpdate} value={value} onChange={handleValueChange} />
      <div className="flex gap-2">
        <FiX onClick={handleDelete} className="cursor-pointer" />
      </div>
    </div>
  );
}
