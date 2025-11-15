import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [word, setWord] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!word.trim()) return setError("Please enter a word.");
    setError("");
    setResult(null);

    try {
      const res = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );

      const data = res.data[0];
      setResult({
        word: data.word,
        partOfSpeech: data.meanings[0].partOfSpeech,
        definition: data.meanings[0].definitions[0].definition,
      });
    } catch (err) {
      setError("Word not found. Try another one.");
    }
  };

  // 🔊 Speech Function
  const handleSpeak = (text) => {
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    speechSynthesis.speak(utterance);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <>
      {/* Header */}
      <div className="bg-blue-700 p-4 text-white text-center">
        <h1 className="text-2xl font-bold">🔊 Mini Dictionary</h1>
      </div>

      {/* Search Box */}
      <div className="max-w-md mx-auto mt-10 bg-gray-100 p-6 rounded-lg shadow-md border">
        <div className="flex">
          <input
            type="text"
            placeholder="Enter a word..."
            value={word}
            onChange={(e) => setWord(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow p-2 border border-gray-400 rounded-l-md outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md font-semibold"
          >
            Search
          </button>
        </div>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {/* Result Display */}
        {result && (
          <div className="mt-6 bg-white p-4 rounded-md border border-gray-300">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-blue-700 capitalize">
                {result.word}
              </h2>
              <button
                onClick={() => handleSpeak(result.word)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
              >
                🔊 Speak
              </button>
            </div>
            <p className="text-gray-600 italic">{result.partOfSpeech}</p>
            <p className="text-gray-800 mt-2">{result.definition}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
