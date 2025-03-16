"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Clock, SkipForward, Lightbulb, ArrowRight } from "lucide-react"

interface WordScrambleProps {
  onScoreUpdate: (score: number) => void
  onGameOver: () => void
  isPlaying: boolean
}

interface Word {
  original: string
  scrambled: string
  hint: string
  category: string
  difficulty: "easy" | "medium" | "hard"
}

const WordScramble: React.FC<WordScrambleProps> = ({ onScoreUpdate, onGameOver, isPlaying }) => {
  const [words, setWords] = useState<Word[]>([])
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [showHint, setShowHint] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [hintsUsed, setHintsUsed] = useState(0)
  const [skipsUsed, setSkipsUsed] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    if (isPlaying) {
      initializeGame()
    }
  }, [isPlaying])

  const initializeGame = () => {
    const wordList: Word[] = [
      {
        original: "newspaper",
        scrambled: "waperspne",
        hint: "You're reading articles from this",
        category: "media",
        difficulty: "easy",
      },
      {
        original: "keyboard",
        scrambled: "drakebyo",
        hint: "You type on this",
        category: "technology",
        difficulty: "easy",
      },
      {
        original: "elephant",
        scrambled: "pnaeelth",
        hint: "Large gray animal with a trunk",
        category: "animals",
        difficulty: "easy",
      },
      {
        original: "restaurant",
        scrambled: "trantsurea",
        hint: "A place to eat out",
        category: "food",
        difficulty: "medium",
      },
      {
        original: "basketball",
        scrambled: "lbsaatkelb",
        hint: "Sport with a hoop",
        category: "sports",
        difficulty: "medium",
      },
      {
        original: "chocolate",
        scrambled: "ocotacleh",
        hint: "Sweet brown treat",
        category: "food",
        difficulty: "medium",
      },
      {
        original: "university",
        scrambled: "yvtiniseru",
        hint: "Higher education institution",
        category: "education",
        difficulty: "hard",
      },
      {
        original: "algorithm",
        scrambled: "mrgolahit",
        hint: "Step-by-step procedure in computing",
        category: "technology",
        difficulty: "hard",
      },
      {
        original: "symphony",
        scrambled: "yphmsony",
        hint: "Musical composition for orchestra",
        category: "music",
        difficulty: "hard",
      },
      {
        original: "telescope",
        scrambled: "eesclotpe",
        hint: "Instrument to view distant objects",
        category: "science",
        difficulty: "medium",
      },
    ]

    // Shuffle the words
    const shuffled = [...wordList].sort(() => 0.5 - Math.random())
    setWords(shuffled)
    setCurrentWordIndex(0)
    setScore(0)
    setTimeLeft(60)
    setUserAnswer("")
    setIsCorrect(null)
    setShowFeedback(false)
    setShowHint(false)
    setHintsUsed(0)
    setSkipsUsed(0)
    setGameOver(false)
    onScoreUpdate(0)
  }

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isPlaying && !gameOver && !showFeedback) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            handleTimeUp()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => clearInterval(timer)
  }, [isPlaying, gameOver, showFeedback, currentWordIndex])

  const handleTimeUp = () => {
    setShowFeedback(true)
    setIsCorrect(false)

    setTimeout(() => {
      moveToNextWord()
    }, 2000)
  }

  const moveToNextWord = () => {
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex((prev) => prev + 1)
      setTimeLeft(60)
      setUserAnswer("")
      setIsCorrect(null)
      setShowFeedback(false)
      setShowHint(false)
    } else {
      endGame()
    }
  }

  const handleSubmit = () => {
    if (!userAnswer) return

    const currentWord = words[currentWordIndex]
    const correct = userAnswer.toLowerCase() === currentWord.original.toLowerCase()

    setIsCorrect(correct)
    setShowFeedback(true)

    if (correct) {
      // Calculate points based on difficulty, time left, and whether hint was used
      let points = 0

      switch (currentWord.difficulty) {
        case "easy":
          points = 50
          break
        case "medium":
          points = 100
          break
        case "hard":
          points = 150
          break
      }

      // Bonus for time left
      points += Math.floor(timeLeft / 10) * 5

      // Penalty for using hint
      if (showHint) {
        points = Math.floor(points * 0.7)
      }

      const newScore = score + points
      setScore(newScore)
      onScoreUpdate(newScore)
    }

    setTimeout(() => {
      moveToNextWord()
    }, 2000)
  }

  const handleSkip = () => {
    if (skipsUsed >= 3) return

    setSkipsUsed((prev) => prev + 1)
    moveToNextWord()
  }

  const handleShowHint = () => {
    if (hintsUsed >= 3) return

    setHintsUsed((prev) => prev + 1)
    setShowHint(true)
  }

  const endGame = () => {
    setGameOver(true)
    onGameOver()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit()
    }
  }

  if (!isPlaying || words.length === 0) {
    return <div className="flex items-center justify-center h-64">Loading words...</div>
  }

  const currentWord = words[currentWordIndex]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "medium":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100"
      case "hard":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-medium">
            Word {currentWordIndex + 1}/{words.length}
          </span>
          <Badge className={getDifficultyColor(currentWord.difficulty)}>
            {currentWord.difficulty.charAt(0).toUpperCase() + currentWord.difficulty.slice(1)}
          </Badge>
          <Badge variant="outline">{currentWord.category}</Badge>
        </div>
        <div className="bg-white dark:bg-gray-800 px-3 py-1 rounded-md shadow-sm">
          <span className="text-sm font-medium text-muted-foreground">Score</span>
          <div className="text-xl font-bold text-primary">{score}</div>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <Clock className="h-4 w-4 text-amber-500" />
        <Progress value={(timeLeft / 60) * 100} className="h-2" />
        <span className="text-sm font-medium">{timeLeft}s</span>
      </div>

      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-bold mb-6 text-center">Unscramble the word:</h3>

        <div className="flex justify-center mb-8">
          <div className="flex gap-1">
            {currentWord.scrambled.split("").map((letter, index) => (
              <div
                key={index}
                className="w-10 h-10 flex items-center justify-center text-xl font-bold bg-primary/10 rounded-md border-2 border-primary/20"
              >
                {letter}
              </div>
            ))}
          </div>
        </div>

        {showHint && (
          <div className="mb-6 p-3 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100 rounded-md">
            <p className="font-medium">Hint: {currentWord.hint}</p>
          </div>
        )}

        <div className="flex gap-2">
          <Input
            type="text"
            value={userAnswer}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your answer"
            className="flex-1"
            disabled={showFeedback}
            autoComplete="off"
          />
          <Button onClick={handleSubmit} disabled={!userAnswer || showFeedback}>
            Submit <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {showFeedback && (
          <div
            className={`mt-4 p-3 rounded-md ${isCorrect ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"}`}
          >
            {isCorrect ? (
              <p className="font-medium">Correct!</p>
            ) : (
              <p className="font-medium">Incorrect. The correct word is: {currentWord.original}</p>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={handleShowHint} disabled={showHint || hintsUsed >= 3 || showFeedback}>
          <Lightbulb className="mr-2 h-4 w-4" />
          Hint ({3 - hintsUsed} left)
        </Button>

        <Button variant="outline" onClick={handleSkip} disabled={skipsUsed >= 3 || showFeedback}>
          <SkipForward className="mr-2 h-4 w-4" />
          Skip ({3 - skipsUsed} left)
        </Button>
      </div>
    </div>
  )
}

export default WordScramble

