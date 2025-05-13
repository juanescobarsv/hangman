import { useState, useEffect, useRef, useCallback } from "react";
import Header from "./components/Header";
import Figure from "./components/Figure";
import WrongLetters from "./components/WrongLetters";
import Word from "./components/Word";
import { fetchCountries, CountryInfo } from "./components/externalAPI";
import Popup from "./components/Popup";
// import Notification from "./components/Notification";
// import { showNotification as show } from "./helpers/helpers";
import "./App.css";

const App = () => {
  const [playable, setPlayable] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const [words, setWords] = useState<CountryInfo[]>([]);
  const [selectedWord, setSelectedWord] = useState<string>("");
  // const [region, setRegion] = useState<string>("");
  // TO BE USED LATER WHEN SELECTING CONTINENTS
  const [flag, setFlag] = useState<string>("");
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);
  // const [showNotifcation, setShowNotifcation] = useState(false);

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

  const processLetter = useCallback(
    (letter: string) => {
      if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
          setCorrectLetters((prev) => [...prev, letter]);
          // } else {
          //   show(setShowNotifcation);
        }
      } else {
        if (!wrongLetters.includes(letter)) {
          setWrongLetters((prev) => [...prev, letter]);
          // } else {
          //   show(setShowNotifcation);
        }
      }
    },
    [selectedWord, correctLetters, wrongLetters]
  );

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      const { key } = event;

      if (playable && /^[a-zA-Z]$/.test(key)) {
        processLetter(key.toLowerCase());
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [playable, processLetter]);

  function playAgain() {
    if (words.length === 0) return;

    setPlayable(true);
    setCorrectLetters([]);
    setWrongLetters([]);
    inputRef.current?.focus();

    const random = Math.floor(Math.random() * words.length);
    const newCountry = words[random];

    setSelectedWord(newCountry.name.toLowerCase());
    // setRegion(newCountry.region);
    // TO BE USED LATER WHEN SELECTING CONTINENTS
    setFlag(newCountry.flag);
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <Header />
      <input
        ref={inputRef}
        type="text"
        maxLength={1}
        onChange={(e) => {
          const letter = e.target.value.toLowerCase();
          if (playable && /^[a-z]$/.test(letter)) {
            processLetter(letter);
          }
          e.target.value = "";
        }}
        style={{
          // position: "absolute",
          bottom: 10,
          left: 10,
          width: 40,
          height: 40,
          opacity: 0.5,
          zIndex: 10,
        }}
        autoFocus
      />
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
      {/* <Notification showNotification={showNotifcation} /> */}
    </>
  );
};

export default App;
