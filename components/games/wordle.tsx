"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Keyboard } from "@/components/ui/keyboard";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Fixed list of 5-letter words
const WORDS = [
  "REACT",
  "WORLD",
  "HELLO",
  "GAMES",
  "PAPER",
  "MUSIC",
  "WATER",
  "EARTH",
  "LIGHT",
  "PHONE",
  "SMART",
  "QUICK",
  "JUMPS",
  "BRAVE",
  "FOCUS",
  "POWER",
  "LEARN",
  "THINK",
  "DREAM",
  "HAPPY",
];

type LetterState = "correct" | "present" | "absent" | "unused";

interface KeyboardState {
  [key: string]: LetterState;
}

export default function Wordle() {
  const [targetWord, setTargetWord] = useState<string>("");
  const [guesses, setGuesses] = useState<string[]>(Array(6).fill(""));
  const [currentGuess, setCurrentGuess] = useState<number>(0);
  const [currentInput, setCurrentInput] = useState<string>("");
  const [keyboardState, setKeyboardState] = useState<KeyboardState>({});
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">(
    "playing"
  );
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");

  // Initialize game
  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    setTargetWord(WORDS[randomIndex]);
    setGuesses(Array(6).fill(""));
    setCurrentGuess(0);
    setCurrentInput("");
    setKeyboardState({});
    setGameStatus("playing");
    setShowAlert(false);
  };

  const handleKeyPress = useCallback(
    (key: string) => {
      if (gameStatus !== "playing") return;

      if (key === "ENTER") {
        if (currentInput.length !== 5) {
          setAlertMessage("Word must be 5 letters");
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 2000);
          return;
        }

        // Check if word is valid (in a real game, you'd check against a dictionary)
        // For this demo, we'll accept any 5-letter combination

        // Update guesses
        const newGuesses = [...guesses];
        newGuesses[currentGuess] = currentInput;
        setGuesses(newGuesses);

        // Update keyboard state
        const newKeyboardState = { ...keyboardState };
        for (let i = 0; i < 5; i++) {
          const letter = currentInput[i];
          if (!letter) continue;

          if (letter === targetWord[i]) {
            newKeyboardState[letter] = "correct";
          } else if (
            targetWord.includes(letter) &&
            newKeyboardState[letter] !== "correct"
          ) {
            newKeyboardState[letter] = "present";
          } else if (
            newKeyboardState[letter] !== "correct" &&
            newKeyboardState[letter] !== "present"
          ) {
            newKeyboardState[letter] = "absent";
          }
        }
        setKeyboardState(newKeyboardState);

        // Check win condition
        if (currentInput === targetWord) {
          setGameStatus("won");
          setAlertMessage("Congratulations! You won!");
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 3000);
          return;
        }

        // Move to next guess or end game
        if (currentGuess === 5) {
          setGameStatus("lost");
          setAlertMessage(`Game over! The word was ${targetWord}`);
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 3000);
        } else {
          setCurrentGuess(currentGuess + 1);
          setCurrentInput("");
        }
      } else if (key === "BACKSPACE") {
        setCurrentInput((prev) => prev.slice(0, -1));
      } else if (/^[A-Z]$/.test(key) && currentInput.length < 5) {
        setCurrentInput((prev) => prev + key);
      }
    },
    [currentGuess, currentInput, gameStatus, guesses, keyboardState, targetWord]
  );

  // Handle physical keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleKeyPress("ENTER");
      } else if (e.key === "Backspace") {
        handleKeyPress("BACKSPACE");
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        handleKeyPress(e.key.toUpperCase());
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyPress]);

  // Get letter state for grid display
  const getLetterState = (
    guessIndex: number,
    letterIndex: number
  ): LetterState => {
    if (guessIndex > currentGuess || guesses[guessIndex] === "")
      return "unused";

    const letter = String(guesses[guessIndex][letterIndex] || "").toUpperCase();
    if (!letter) return "unused";

    if (letter === targetWord[letterIndex]) return "correct";
    if (targetWord.includes(letter)) return "present";
    return "absent";
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold text-navy">Wordle</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={startNewGame}
            className="text-navy hover:text-burgundy"
          >
            <RefreshCw className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Game grid */}
        <div className="grid grid-rows-6 gap-1 mb-4">
          {Array.from({ length: 6 }).map((_, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-5 gap-1">
              {Array.from({ length: 5 }).map((_, colIndex) => {
                const letter =
                  rowIndex === currentGuess
                    ? currentInput[colIndex] || ""
                    : (guesses[rowIndex] || "")[colIndex] || "";

                const state =
                  rowIndex === currentGuess &&
                  letter &&
                  gameStatus === "playing"
                    ? "unused"
                    : getLetterState(rowIndex, colIndex);

                const stateClasses = {
                  correct: "bg-green-500 text-white border-green-500",
                  present: "bg-yellow-500 text-white border-yellow-500",
                  absent: "bg-gray-500 text-white border-gray-500",
                  unused:
                    "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600",
                };

                return (
                  <div
                    key={colIndex}
                    className={`flex items-center justify-center w-full aspect-square text-xl font-bold border-2 ${stateClasses[state]} transition-colors`}
                  >
                    {letter}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Virtual keyboard */}
        <Keyboard onKeyPress={handleKeyPress} keyState={keyboardState} />

        {/* Alert message */}
        {showAlert && (
          <div className="mt-4">
            <Alert variant={gameStatus === "won" ? "default" : "destructive"}>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>
                {gameStatus === "won"
                  ? "Success!"
                  : gameStatus === "lost"
                  ? "Game Over"
                  : "Notice"}
              </AlertTitle>
              <AlertDescription>{alertMessage}</AlertDescription>
            </Alert>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
