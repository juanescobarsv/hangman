import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Figure from "./components/Figure";
import WrongLetters from "./components/WrongLetters";
import Word from "./components/Word";
import { fetchCountries, CountryInfo } from "./components/externalAPI";
import Popup from "./components/Popup";
import Notification from "./components/Notification";
import { showNotification as show } from "./helpers/helpers";
import "./App.css";

const App = () => {
  const [playable, setPlayable] = useState(true);
  const [words, setWords] = useState<CountryInfo[]>([]);
  const [selectedWord, setSelectedWord] = useState<string>("");
  // const [region, setRegion] = useState<string>("");
  // TO BE USED LATER WHEN SELECTING CONTINENTS
  const [flag, setFlag] = useState<string>("");
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);
  const [showNotifcation, setShowNotifcation] = useState(false);

  const loadWords = async () => {
    const countries = await fetchCountries();
    setWords(countries);

    const random = Math.floor(Math.random() * countries.length);
    const selected = countries[random];

    setSelectedWord(selected.name.toLowerCase());
    // setRegion(selected.region);
    setFlag(selected.flag);
  };

  useEffect(() => {
    loadWords();
  }, []);

  useEffect(() => {
    const handleKeydown = (event: { key: string; keyCode: number }) => {
      const { key, keyCode } = event;

      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key;

        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters((correctLetters) => [...correctLetters, letter]);
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
  }, [selectedWord, correctLetters, wrongLetters, playable]);

  function playAgain() {
    if (words.length === 0) return;

    setPlayable(true);
    setCorrectLetters([]);
    setWrongLetters([]);

    const random = Math.floor(Math.random() * words.length);
    const newCountry = words[random];

    setSelectedWord(newCountry.name.toLowerCase());
    // setRegion(newCountry.region);
    // TO BE USED LATER WHEN SELECTING CONTINENTS
    setFlag(newCountry.flag);
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
        flag={flag}
        setPlayable={setPlayable}
        playAgain={playAgain}
      />
      <Notification showNotification={showNotifcation} />
    </>
  );
};

export default App;
