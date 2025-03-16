"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, Brain, Clock } from "lucide-react"

interface BrainPuzzleProps {
  onScoreUpdate: (score: number) => void
  onGameOver: () => void
  isPlaying: boolean
}

interface Puzzle {
  question: string
  options?: string[]
  answer: string | number
  type: "multiple-choice" | "text" | "math"
  points: number
}

const BrainPuzzle: React.FC<BrainPuzzleProps> = ({ onScoreUpdate, onGameOver, isPlaying }) => {
  const [puzzles, setPuzzles] = useState<Puzzle[]>([])
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    if (isPlaying) {
      initializeGame()
    }
  }, [isPlaying])

  const initializeGame = () => {
    const generatedPuzzles: Puzzle[] = [
      {
        question: "If a train travels at 120 km/h, how far will it travel in 2.5 hours?",
        answer: 300,
        type: "text",
        points: 100,
      },
      {
        question: "What comes next in the sequence: 2, 4, 8, 16, __?",
        answer: 32,
        type: "text",
        points: 150,
      },
      {
        question: "If today is Tuesday, what day will it be after 100 days?",
        options: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        answer: "Thursday",
        type: "multiple-choice",
        points: 200,
      },
      {
        question: "Solve for x: 3x + 7 = 22",
        answer: 5,
        type: "text",
        points: 100,
      },
      {
        question:
          "A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost?",
        answer: 0.05,
        type: "text",
        points: 250,
      },
      {
        question:
          "If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?",
        answer: 5,
        type: "text",
        points: 300,
      },
      {
        question: "Which word is the odd one out?",
        options: ["Apple", "Banana", "Carrot", "Orange", "Grape"],
        answer: "Carrot",
        type: "multiple-choice",
        points: 150,
      },
      {
        question: "What is 25% of 80?",
        answer: 20,
        type: "text",
        points: 100,
      },
      {
        question: "If you rearrange the letters 'CIFAIPC', you would get the name of a:",
        options: ["River", "City", "Ocean", "Country", "Animal"],
        answer: "Ocean",
        type: "multiple-choice",
        points: 200,
      },
      {
        question: "Complete the analogy: Hand is to Glove as Foot is to ___",
        options: ["Leg", "Toe", "Shoe", "Sock", "Walk"],
        answer: "Shoe",
        type: "multiple-choice",
        points: 150,
      },
    ]

    // Shuffle the puzzles
    const shuffled = [...generatedPuzzles].sort(() => 0.5 - Math.random())
    setPuzzles(shuffled.slice(0, 5)) // Take 5 random puzzles
    setCurrentPuzzleIndex(0)
    setScore(0)
    setTimeLeft(30)
    setUserAnswer("")
    setIsCorrect(null)
    setShowFeedback(false)
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
  }, [isPlaying, gameOver, showFeedback, currentPuzzleIndex])

  const handleTimeUp = () => {
    setShowFeedback(true)
    setIsCorrect(false)

    setTimeout(() => {
      if (currentPuzzleIndex < puzzles.length - 1) {
        setCurrentPuzzleIndex((prev) => prev + 1)
        setTimeLeft(30)
        setUserAnswer("")
        setIsCorrect(null)
        setShowFeedback(false)
      } else {
        endGame()
      }
    }, 2000)
  }

  const handleSubmit = () => {
    if (!userAnswer) return

    const currentPuzzle = puzzles[currentPuzzleIndex]
    let correct = false

    if (currentPuzzle.type === "text" || currentPuzzle.type === "math") {
      // For numerical answers, convert to number and compare
      const numericAnswer = Number.parseFloat(userAnswer)
      correct = !isNaN(numericAnswer) && numericAnswer === currentPuzzle.answer
    } else {
      // For multiple choice, compare strings
      correct = userAnswer.toLowerCase() === currentPuzzle.answer.toString().toLowerCase()
    }

    setIsCorrect(correct)
    setShowFeedback(true)

    if (correct) {
      const newScore = score + currentPuzzle.points
      setScore(newScore)
      onScoreUpdate(newScore)
    }

    setTimeout(() => {
      if (currentPuzzleIndex < puzzles.length - 1) {
        setCurrentPuzzleIndex((prev) => prev + 1)
        setTimeLeft(30)
        setUserAnswer("")
        setIsCorrect(null)
        setShowFeedback(false)
      } else {
        endGame()
      }
    }, 2000)
  }

  const endGame = () => {
    setGameOver(true)
    onGameOver()
  }

  const handleOptionSelect = (option: string) => {
    setUserAnswer(option)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit()
    }
  }

  if (!isPlaying || puzzles.length === 0) {
    return <div className="flex items-center justify-center h-64">Loading puzzles...</div>
  }

  const currentPuzzle = puzzles[currentPuzzleIndex]

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center">
          <Brain className="h-5 w-5 mr-2 text-primary" />
          <span className="font-medium">
            Puzzle {currentPuzzleIndex + 1}/{puzzles.length}
          </span>
        </div>
        <div className="bg-white dark:bg-gray-800 px-3 py-1 rounded-md shadow-sm">
          <span className="text-sm font-medium text-muted-foreground">Score</span>
          <div className="text-xl font-bold text-primary">{score}</div>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <Clock className="h-4 w-4 text-amber-500" />
        <Progress value={(timeLeft / 30) * 100} className="h-2" />
        <span className="text-sm font-medium">{timeLeft}s</span>
      </div>

      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md mb-6 min-h-[200px]">
        <h3 className="text-xl font-bold mb-4">{currentPuzzle.question}</h3>

        {currentPuzzle.type === "multiple-choice" && currentPuzzle.options && (
          <div className="space-y-2">
            {currentPuzzle.options.map((option, index) => (
              <Button
                key={index}
                variant={userAnswer === option ? "default" : "outline"}
                className="w-full justify-start text-left h-auto py-3 px-4"
                onClick={() => handleOptionSelect(option)}
                disabled={showFeedback}
              >
                {option}
              </Button>
            ))}
          </div>
        )}

        {(currentPuzzle.type === "text" || currentPuzzle.type === "math") && (
          <div className="flex gap-2">
            <Input
              type="text"
              value={userAnswer}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter your answer"
              className="flex-1"
              disabled={showFeedback}
            />
            <Button onClick={handleSubmit} disabled={!userAnswer || showFeedback}>
              Submit <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        {showFeedback && (
          <div
            className={`mt-4 p-3 rounded-md ${isCorrect ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"}`}
          >
            {isCorrect ? (
              <p className="font-medium">Correct! +{currentPuzzle.points} points</p>
            ) : (
              <p className="font-medium">Incorrect. The correct answer is: {currentPuzzle.answer}</p>
            )}
          </div>
        )}
      </div>

      {currentPuzzle.type === "multiple-choice" && (
        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            disabled={!userAnswer || showFeedback}
            className="bg-primary hover:bg-primary/90"
          >
            Submit <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="mt-4 flex justify-between text-sm text-muted-foreground">
        <div>Points: {currentPuzzle.points}</div>
        <div>Difficulty: {currentPuzzle.points <= 100 ? "Easy" : currentPuzzle.points <= 200 ? "Medium" : "Hard"}</div>
      </div>
    </div>
  )
}

export default BrainPuzzle

