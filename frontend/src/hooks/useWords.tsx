import { useEffect, useState } from "react";
import { setConstantValue } from "typescript";
import API from "../api";

interface Word {
  _id: string;
  word: string;
}

export default function useWords() {
  const [isLoading, setLoading] = useState(0); // loading if >0
  const [isCreating, setIsCreating] = useState(false);
  const [words, setWords] = useState<Word[]>([]);
  async function list() {
    setIsCreating(true);
    const list = await API.list();
    setWords(list);
    setIsCreating(false);
  }

  async function create(word: string) {
    setLoading((l) => l + 1);
    const newWord = await API.create(word);
    setWords([...words, newWord]);
    setLoading((l) => l - 1);
  }

  useEffect(() => {
    list();
  }, []);
  return { isLoading, words, create, isCreating };
}
