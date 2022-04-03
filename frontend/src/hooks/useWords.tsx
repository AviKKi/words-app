import { useEffect, useState } from "react";
import { setConstantValue } from "typescript";
import API from "../api";

export interface Word {
  _id: string;
  word: string;
}

export default function useWords() {
  const [isLoading, setLoading] = useState(0); // loading if >0
  const [isCreating, setIsCreating] = useState(false);
  const [words, setWords] = useState<Word[]>([]);
  const [isRemoving, setIsRemoving] = useState<string[]>([]);

  async function list() {
    setLoading((l) => l + 1);
    const list = await API.list();
    setWords(list);
    setLoading((l) => l - 1);
  }

  async function create(word: string) {
    setIsCreating(true);
    const newWord = await API.create(word);
    setWords([...words, newWord]);
    setIsCreating(false);
  }

  async function deleteWord(id: string) {
    setIsRemoving([...isRemoving, id]);
    await API.delete(id);
  }

  useEffect(() => {
    list();
  }, []);
  return { isLoading, words, create, isCreating, deleteWord, isRemoving };
}
