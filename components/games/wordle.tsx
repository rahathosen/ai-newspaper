"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Keyboard } from "@/components/ui/keyboard"
import { RotateCcw, AlertCircle, Check, Share2 } from 'lucide-react'

interface WordleProps {
  onScoreUpdate: (score: number) => void
  onGameOver: () => void
  isPlaying: boolean
}

type LetterState = "correct" | "present" | "absent" | "empty"

interface LetterResult {
  letter: string
  state: LetterState
}

const WORD_LENGTH = 5
const MAX_ATTEMPTS = 6

const Wordle: React.FC<WordleProps> = ({ onScoreUpdate, onGameOver, isPlaying }) => {
  const [targetWord, setTargetWord] = useState<string>("")
  const [attempts, setAttempts] = useState<string[]>([])
  const [currentAttempt, setCurrentAttempt] = useState<string>("")
  const [gameState, setGameState<"playing" | "won" | "lost">>(("playing"))
  const [letterStates, setLetterStates] = useState<Record<string, LetterState>>({})
  const [message, setMessage] = useState<string | null>(null)
  const [shake, setShake] = useState<number | null>(null)
  const [reveal, setReveal] = useState<number | null>(null)
  const [dictionary, setDictionary] = useState<string[]>([])

  // Word list - in a real app, this would be loaded from an API or larger file
  const wordList = [
    "apple",
    "beach",
    "chair",
    "dance",
    "eagle",
    "flame",
    "globe",
    "house",
    "image",
    "juice",
    "knife",
    "lemon",
    "music",
    "night",
    "ocean",
    "piano",
    "queen",
    "river",
    "sugar",
    "table",
    "unity",
    "video",
    "water",
    "youth",
    "zebra",
    "bread",
    "cloud",
    "dream",
    "earth",
    "focus",
    "green",
    "heart",
    "ivory",
    "jewel",
    "kiosk",
    "light",
    "money",
    "north",
    "olive",
    "power",
    "quiet",
    "radio",
    "storm",
    "tiger",
    "urban",
    "value",
    "world",
    "xylophone",
  ]

  // Valid guesses - in a real app, this would be a much larger list
  const validGuesses = [
    ...wordList,
    "about",
    "above",
    "abuse",
    "actor",
    "adapt",
    "admit",
    "adopt",
    "adult",
    "after",
    "again",
    "agent",
  ]

  const initializeGame = useCallback(() => {
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)]
    setTargetWord(randomWord.toUpperCase())
    setAttempts([])
    setCurrentAttempt("")
    setGameState("playing")
    setLetterStates({})
    setMessage(null)
    setShake(null)
    setReveal(null)
    onScoreUpdate(0)
  }, [wordList, onScoreUpdate])

  useEffect(() => {
    if (isPlaying) {
      initializeGame()
    }
  }, [isPlaying, initializeGame])

  const checkGuess = useCallback(
    (guess: string) => {
      const newLetterStates: Record<string, LetterState> = { ...letterStates }
      let allCorrect = true

      const results: LetterResult[] = [...guess].map((letter, index) => {
        const correctLetter = targetWord[index]
        let state: LetterState = "absent"

        if (letter === correctLetter) {
          state = "correct"
        } else if (targetWord.includes(letter)) {
          state = "present"
          allCorrect = false
        } else {
          allCorrect = false
        }

        newLetterStates[letter] = state
        return { letter, state }
      })

      setLetterStates(newLetterStates)
      return { results, allCorrect }
    },
    [targetWord, letterStates],
  )

  const handleKeyPress = (key: string) => {
    if (gameState !== "playing") return

    if (key === "Enter") {
      if (currentAttempt.length !== WORD_LENGTH) {
        setMessage("Not enough letters")
        setShake(Date.now())
        setTimeout(() => setMessage(null), 2000)
        return
      }

      if (!validGuesses.includes(currentAttempt.toLowerCase())) {
        setMessage("Not in word list")
        setShake(Date.now())
        setTimeout(() => setMessage(null), 2000)
        return
      }

      const { results, allCorrect } = checkGuess(currentAttempt)

      setAttempts((prev) => [...prev, currentAttempt])
      setCurrentAttempt("")

      if (allCorrect) {
        setGameState("won")
        const newScore = calculateScore(attempts.length + 1)
        onScoreUpdate(newScore)
        onGameOver()
      } else if (attempts.length + 1 === MAX_ATTEMPTS) {
        setGameState("lost")
        onScoreUpdate(0)
        onGameOver()
      }
    } else if (key === "Backspace") {
      setCurrentAttempt((prev) => prev.slice(0, -1))
    } else if (currentAttempt.length < WORD_LENGTH && /^[a-zA-Z]$/.test(key)) {
      setCurrentAttempt((prev) => prev + key.toUpperCase())
    }
  }

  const calculateScore = (attempts: number) => {
    return 1000 - attempts * 100
  }

  const getLetterState = (letter: string, attemptIndex: number): LetterState => {
    const attempt = attempts[attemptIndex]
    if (!attempt) return "empty"

    const letterIndex = attempt.indexOf(letter)
    if (letterIndex === -1) return "empty"

    return letterStates[letter] || "empty"
  }

  const renderBoard = () => {
    const board = []
    for (let i = 0; i < MAX_ATTEMPTS; i++) {
      const attempt = attempts[i] || currentAttempt.padEnd(WORD_LENGTH, "")
      const isCurrentAttempt = i === attempts.length && gameState === "playing"

      const row = (
        <div key={i} className="flex justify-center gap-1">
          {[...attempt].map((letter, j) => {
            let state: LetterState = "empty"
            if (i < attempts.length) {
              state = getLetterState(letter, i)
            }

            return (
              <div
                key={`${i}-${j}`}
                className={`w-12 h-12 flex items-center justify-center text-2xl font-bold border-2 rounded-md transition-colors duration-300 ${
                  state === "correct"
                    ? "bg-green-500 text-white border-none"
                    : state === "present"
                      ? "bg-amber-500 text-white border-none"
                      : state === "absent"
                        ? "bg-gray-400 text-white border-none dark:bg-gray-600"
                        : isCurrentAttempt && shake === null
                          ? "border-gray-300 dark:border-gray-700"
                          : "border-gray-300 dark:border-gray-700"
                }`}
              >
                {letter}
              </div>
            )
          })}
        </div>
      )
      board.push(row)
    }
    return board
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {message && (
        <Alert className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">{renderBoard()}</div>

      {gameState !== "playing" && (
        <div className="mt-6 p-4 bg-primary/5 rounded-lg text-center">
          {gameState === "won" ? (
            <>
              <Check className="h-6 w-6 mx-auto text-green-500 mb-2" />
              <h3 className="text-xl font-bold text-green-600">Congratulations! You guessed the word!</h3>
              <p className="text-muted-foreground">Score: {calculateScore(attempts.length)}</p>
            </>
          ) : (
            <>
              <AlertCircle className="h-6 w-6 mx-auto text-red-500 mb-2" />
              <h3 className="text-xl font-bold text-red-600">You ran out of attempts!</h3>
              <p className="text-muted-foreground">The word was: {targetWord}</p>
            </>
          )}
          <Button onClick={initializeGame} className="mt-4">
            <RotateCcw className="h-4 w-4 mr-2" /> Play Again
          </Button>
        </div>
      )}

      <Keyboard onKeyPress={handleKeyPress} letterStates={letterStates} />
    </div>
  )
}

export default Wordle

