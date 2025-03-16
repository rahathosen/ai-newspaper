"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, Clock } from "lucide-react"

interface MemoryMatchProps {
  onScoreUpdate: (score: number) => void
  onGameOver: () => void
  isPlaying: boolean
}

interface Card {
  id: number
  value: string
  flipped: boolean
  matched: boolean
}

const MemoryMatch: React.FC<MemoryMatchProps> = ({ onScoreUpdate, onGameOver, isPlaying }) => {
  const [cards, setCards] = useState<Card[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedPairs, setMatchedPairs] = useState<number>(0)
  const [moves, setMoves] = useState<number>(0)
  const [time, setTime] = useState<number>(0)
  const [gameOver, setGameOver] = useState<boolean>(false)
  const [score, setScore] = useState<number>(0)
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy")
  const [isLocked, setIsLocked] = useState<boolean>(false)

  const cardValues = {
    easy: ["🍎", "🍌", "🍇", "🍊", "🍓", "🍉", "🍋", "🥑"],
    medium: ["🍎", "🍌", "🍇", "🍊", "🍓", "🍉", "🍋", "🥑", "🍍", "🥥", "🥝", "🍒"],
    hard: ["🍎", "🍌", "🍇", "🍊", "🍓", "🍉", "🍋", "🥑", "🍍", "🥥", "🥝", "🍒", "🥭", "🍑", "🍐", "🍈"],
  }

  useEffect(() => {
    if (isPlaying) {
      initializeGame(difficulty)
    }
  }, [isPlaying])

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isPlaying && !gameOver) {
      timer = setInterval(() => {
        setTime((prev) => prev + 1)
      }, 1000)
    }

    return () => clearInterval(timer)
  }, [isPlaying, gameOver])

  const initializeGame = (selectedDifficulty: "easy" | "medium" | "hard") => {
    setDifficulty(selectedDifficulty)

    const values = cardValues[selectedDifficulty]
    const pairs = values.slice(0, values.length)

    // Create pairs of cards
    const cardPairs = [...pairs, ...pairs]

    // Shuffle the cards
    const shuffledCards = cardPairs
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({
        id: index,
        value,
        flipped: false,
        matched: false,
      }))

    setCards(shuffledCards)
    setFlippedCards([])
    setMatchedPairs(0)
    setMoves(0)
    setTime(0)
    setGameOver(false)
    setScore(0)
    onScoreUpdate(0)
    setIsLocked(false)
  }

  useEffect(() => {
    // Check if all pairs are matched
    if (matchedPairs === cardValues[difficulty].length && matchedPairs > 0) {
      endGame()
    }
  }, [matchedPairs, difficulty])

  const endGame = () => {
    setGameOver(true)

    // Calculate score based on difficulty, moves, and time
    let baseScore = 0

    switch (difficulty) {
      case "easy":
        baseScore = 1000
        break
      case "medium":
        baseScore = 2000
        break
      case "hard":
        baseScore = 3000
        break
    }

    // Penalty for moves and time
    const movePenalty = moves * 10
    const timePenalty = time * 2

    const finalScore = Math.max(0, baseScore - movePenalty - timePenalty)

    setScore(finalScore)
    onScoreUpdate(finalScore)
    onGameOver()
  }

  const handleCardClick = (id: number) => {
    if (isLocked || gameOver || cards[id].flipped || cards[id].matched) {
      return
    }

    // Flip the card
    setCards((prev) => prev.map((card) => (card.id === id ? { ...card, flipped: true } : card)))

    // Add to flipped cards
    setFlippedCards((prev) => [...prev, id])

    // If two cards are flipped, check for a match
    if (flippedCards.length === 1) {
      setIsLocked(true)
      setMoves((prev) => prev + 1)

      const firstCardId = flippedCards[0]
      const secondCardId = id

      if (cards[firstCardId].value === cards[secondCardId].value) {
        // Match found
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === firstCardId || card.id === secondCardId ? { ...card, matched: true } : card,
            ),
          )
          setMatchedPairs((prev) => prev + 1)
          setFlippedCards([])
          setIsLocked(false)
        }, 500)
      } else {
        // No match
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === firstCardId || card.id === secondCardId ? { ...card, flipped: false } : card,
            ),
          )
          setFlippedCards([])
          setIsLocked(false)
        }, 1000)
      }
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getGridClass = () => {
    switch (difficulty) {
      case "easy":
        return "grid-cols-4"
      case "medium":
        return "grid-cols-4 md:grid-cols-6"
      case "hard":
        return "grid-cols-4 md:grid-cols-8"
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-4 flex justify-between items-center">
        <div className="flex gap-3">
          <div className="bg-white dark:bg-gray-800 px-3 py-1 rounded-md shadow-sm">
            <span className="text-sm font-medium text-muted-foreground">Moves</span>
            <div className="text-xl font-bold text-primary">{moves}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 px-3 py-1 rounded-md shadow-sm flex items-center">
            <Clock className="h-4 w-4 mr-1 text-amber-500" />
            <div className="text-xl font-bold">{formatTime(time)}</div>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="flex gap-1">
            <Badge variant="outline" className="cursor-pointer" onClick={() => initializeGame("easy")}>
              Easy
            </Badge>
            <Badge variant="outline" className="cursor-pointer" onClick={() => initializeGame("medium")}>
              Medium
            </Badge>
            <Badge variant="outline" className="cursor-pointer" onClick={() => initializeGame("hard")}>
              Hard
            </Badge>
          </div>
          <Button variant="outline" size="sm" onClick={() => initializeGame(difficulty)}>
            <RotateCcw className="h-4 w-4 mr-1" /> Restart
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md">
        <div className={`grid ${getGridClass()} gap-2`}>
          {cards.map((card) => (
            <div
              key={card.id}
              className={`aspect-square rounded-md cursor-pointer transition-all duration-300 transform ${
                card.flipped || card.matched ? "rotate-y-180" : ""
              }`}
              onClick={() => handleCardClick(card.id)}
            >
              <div
                className={`w-full h-full flex items-center justify-center text-2xl md:text-3xl font-bold rounded-md ${
                  card.flipped || card.matched ? "bg-primary text-white" : "bg-primary/10 text-transparent"
                } ${card.matched ? "opacity-70" : "opacity-100"}`}
              >
                {card.flipped || card.matched ? card.value : "?"}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center text-sm text-muted-foreground">
        <div>
          Pairs: {matchedPairs}/{cardValues[difficulty].length}
        </div>
        <div>Difficulty: {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</div>
      </div>
    </div>
  )
}

export default MemoryMatch

