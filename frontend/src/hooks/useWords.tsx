import { useEffect, useState } from "react";
import { setConstantValue } from "typescript";
import API from "../api";

export default function useWords() {
  const [isLoading, setLoading] = useState(0); // loading if >0
  const [words, setWords] = useState([]);
  async function list() {
    setLoading((l) => l + 1);
    const list = await API.list();
    setWords(list);
    setLoading((l) => l - 1);
  }
  useEffect(() => {
    list();
  }, []);
  return { isLoading, words };
}
