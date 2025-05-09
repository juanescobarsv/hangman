import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Figure from "./components/Figure";
import WrongLetters from "./components/WrongLetters";
import { Word, words } from "./components/Word";
import fetchCountries from "./components/externalAPI";
import Popup from "./components/Popup";
import Notification from "./components/Notification";
import { showNotification as show } from "./helpers/helpers";
import "./App.css";

const App = () => {
  const [playable, setPlayable] = useState(true);
  const [words, setWords] = useState<string[]>([]);
  const [selectedWord, setSelectedWord] = useState<string>("");
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotifcation, setShowNotifcation] = useState(false);

  useEffect(() => {
    const loadWords = async () => {
      const countries = await fetchCountries();
      setWords(countries);

      const random = Math.floor(Math.random() * countries.length);
      setSelectedWord(countries[random]);
    };
    loadWords();
  }, []);

  useEffect(() => {
    const handleKeydown = (event) => {
      const { key, keyCode } = event;

      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();

        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            // setCorrectLetters((correctLetters) => [...correctLetters, letter]);
            setCorrectLetters((currentLetters) => [...currentLetters, letter]);
          } else {
            show(setShowNotifcation);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters((wrongLetters) => [...wrongLetters, letter]);
          } else {
            show(setShowNotifcation);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [correctLetters, wrongLetters, playable]);

  function playAgain() {
    if (words.length === 0) return;

    setPlayable(true);
    setCorrectLetters([]);
    setWrongLetters([]);

    const newWord = words[Math.floor(Math.random() * words.length)]
      .toLowerCase()
      .replace(/\s+/g, "");

    setSelectedWord(newWord);
  }

  return (
    <>
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Popup
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        selectedWord={selectedWord}
        setPlayable={setPlayable}
        playAgain={playAgain}
      />
      <Notification showNotification={showNotifcation} />
    </>
  );
};

export default App;
