"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, AlertCircle, Check, Lightbulb } from "lucide-react"

interface HangmanProps {
  onScoreUpdate: (score: number) => void
  onGameOver: () => void
  isPlaying: boolean
}

const Hangman: React.FC<HangmanProps> = ({ onScoreUpdate, onGameOver, isPlaying }) => {
  const [word, setWord] = useState<string>("")
  const [category, setCategory] = useState<string>("")
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set())
  const [wrongGuesses, setWrongGuesses] = useState<number>(0)
  const [gameState, setGameState] = useState<"playing" | "won" | "lost">("playing")
  const [hintsUsed, setHintsUsed] = useState<number>(0)
  const [score, setScore] = useState<number>(0)
  const [message, setMessage] = useState<string | null>(null)

  const MAX_WRONG_GUESSES = 6

  // Word categories
  const wordCategories = {
    animals: [
      "elephant",
      "giraffe",
      "penguin",
      "dolphin",
      "kangaroo",
      "leopard",
      "octopus",
      "rhinoceros",
      "squirrel",
      "zebra",
    ],
    countries: [
      "australia",
      "brazil",
      "canada",
      "denmark",
      "egypt",
      "france",
      "germany",
      "hungary",
      "iceland",
      "japan",
    ],
    fruits: ["apple", "banana", "cherry", "dragonfruit", "elderberry", "fig", "grape", "honeydew", "kiwi", "lemon"],
    sports: [
      "baseball",
      "basketball",
      "cricket",
      "football",
      "golf",
      "hockey",
      "rugby",
      "swimming",
      "tennis",
      "volleyball",
    ],
    occupations: [
      "architect",
      "baker",
      "carpenter",
      "dentist",
      "engineer",
      "firefighter",
      "gardener",
      "journalist",
      "lawyer",
      "musician",
    ],
  }

  useEffect(() => {
    if (isPlaying) {
      initializeGame()
    }
  }, [isPlaying])

  const initializeGame = () => {
    // Select a random category
    const categories = Object.keys(wordCategories)
    const randomCategory = categories[Math.floor(Math.random() * categories.length)]

    // Select a random word from the category
    const words = wordCategories[randomCategory as keyof typeof wordCategories]
    const randomWord = words[Math.floor(Math.random() * words.length)]

    setWord(randomWord)
    setCategory(randomCategory)
    setGuessedLetters(new Set())
    setWrongGuesses(0)
    setGameState("playing")
    setHintsUsed(0)
    setScore(0)
    setMessage(null)

    onScoreUpdate(0)
  }

  const handleLetterGuess = (letter: string) => {
    if (gameState !== "playing" || guessedLetters.has(letter)) return

    const newGuessedLetters = new Set(guessedLetters)
    newGuessedLetters.add(letter)
    setGuessedLetters(newGuessedLetters)

    if (!word.includes(letter)) {
      const newWrongGuesses = wrongGuesses + 1
      setWrongGuesses(newWrongGuesses)

      if (newWrongGuesses >= MAX_WRONG_GUESSES) {
        setGameState("lost")
        onScoreUpdate(0)
        onGameOver()
      }
    } else {
      // Check if all letters have been guessed
      const isWordGuessed = [...word].every((char) => newGuessedLetters.has(char))

      if (isWordGuessed) {
        const newScore = calculateScore()
        setScore(newScore)
        setGameState("won")
        onScoreUpdate(newScore)
        onGameOver()
      }
    }
  }

  const calculateScore = () => {
    // Base score depends on word length
    const baseScore = word.length * 50

    // Penalty for wrong guesses
    const wrongGuessPenalty = wrongGuesses * 30

    // Penalty for hints
    const hintPenalty = hintsUsed * 50

    return Math.max(0, baseScore - wrongGuessPenalty - hintPenalty)
  }

  const useHint = () => {
    if (hintsUsed >= 3 || gameState !== "playing") return

    // Find a letter that hasn't been guessed yet
    const unguessedLetters = [...new Set(word)].filter((letter) => !guessedLetters.has(letter))

    if (unguessedLetters.length > 0) {
      const hintLetter = unguessedLetters[Math.floor(Math.random() * unguessedLetters.length)]
      handleLetterGuess(hintLetter)
      setHintsUsed((prev) => prev + 1)
      setMessage(`Hint: The letter "${hintLetter.toUpperCase()}" is in the word.`)

      setTimeout(() => {
        setMessage(null)
      }, 2000)
    }
  }

  const displayWord = () => {
    return [...word].map((letter, index) => (
      <div
        key={index}
        className={`w-10 h-10 flex items-center justify-center text-xl font-bold border-b-2 border-gray-400 mx-1 ${
          guessedLetters.has(letter) ? "text-primary" : "text-transparent"
        }`}
      >
        {guessedLetters.has(letter) ? letter.toUpperCase() : "_"}
      </div>
    ))
  }

  const renderHangman = () => {
    const parts = [
      // Head
      <circle key="head" cx="50" cy="30" r="10" className="stroke-2 stroke-current fill-none" />,
      // Body
      <line key="body" x1="50" y1="40" x2="50" y2="70" className="stroke-2 stroke-current" />,
      // Left arm
      <line key="left-arm" x1="50" y1="50" x2="30" y2="60" className="stroke-2 stroke-current" />,
      // Right arm
      <line key="right-arm" x1="50" y1="50" x2="70" y2="60" className="stroke-2 stroke-current" />,
      // Left leg
      <line key="left-leg" x1="50" y1="70" x2="30" y2="90" className="stroke-2 stroke-current" />,
      // Right leg
      <line key="right-leg" x1="50" y1="70" x2="70" y2="90" className="stroke-2 stroke-current" />,
    ]

    return (
      <svg width="100" height="100" viewBox="0 0 100 100" className="text-primary">
        {/* Gallows */}
        <line x1="10" y1="95" x2="90" y2="95" className="stroke-2 stroke-current" />
        <line x1="30" y1="95" x2="30" y2="10" className="stroke-2 stroke-current" />
        <line x1="30" y1="10" x2="50" y2="10" className="stroke-2 stroke-current" />
        <line x1="50" y1="10" x2="50" y2="20" className="stroke-2 stroke-current" />

        {/* Body parts - only show based on wrong guesses */}
        {parts.slice(0, wrongGuesses)}
      </svg>
    )
  }

  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("")

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-medium">Hangman</h3>
          <Badge variant="outline" className="capitalize">
            {category}
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={initializeGame}>
            <RotateCcw className="h-4 w-4 mr-2" /> New Word
          </Button>
          <Button variant="outline" size="sm" onClick={useHint} disabled={hintsUsed >= 3 || gameState !== "playing"}>
            <Lightbulb className="h-4 w-4 mr-2" /> Hint ({3 - hintsUsed})
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md mb-6">
        <div className="flex justify-center mb-8">{renderHangman()}</div>

        <div className="flex justify-center mb-8 flex-wrap">{displayWord()}</div>

        {message && (
          <div className="mb-4 p-3 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100 rounded-md">
            {message}
          </div>
        )}

        <div className="grid grid-cols-9 gap-2">
          {alphabet.map((letter) => (
            <Button
              key={letter}
              variant={guessedLetters.has(letter) ? (word.includes(letter) ? "default" : "outline") : "outline"}
              className={`h-10 ${
                guessedLetters.has(letter) && word.includes(letter)
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : guessedLetters.has(letter)
                    ? "bg-gray-400 hover:bg-gray-500 text-white dark:bg-gray-600"
                    : ""
              }`}
              onClick={() => handleLetterGuess(letter)}
              disabled={guessedLetters.has(letter) || gameState !== "playing"}
            >
              {letter.toUpperCase()}
            </Button>
          ))}
        </div>
      </div>

      {gameState !== "playing" && (
        <div
          className={`p-4 rounded-lg ${
            gameState === "won"
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-100"
              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-100"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            {gameState === "won" ? (
              <>
                <Check className="h-5 w-5" />
                <h3 className="text-lg font-bold">You won!</h3>
              </>
            ) : (
              <>
                <AlertCircle className="h-5 w-5" />
                <h3 className="text-lg font-bold">Game over</h3>
              </>
            )}
          </div>
          <p>
            The word was: <span className="font-bold uppercase">{word}</span>
          </p>
          {gameState === "won" && (
            <p className="mt-2">
              Score: <span className="font-bold">{score}</span>
            </p>
          )}
          <Button onClick={initializeGame} className="mt-3">
            <RotateCcw className="h-4 w-4 mr-2" /> Play Again
          </Button>
        </div>
      )}
    </div>
  )
}

export default Hangman

