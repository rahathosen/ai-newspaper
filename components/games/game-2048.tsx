"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react"

interface Game2048Props {
  onScoreUpdate: (score: number) => void
  onGameOver: () => void
  isPlaying: boolean
}

type Cell = number | null
type Grid = Cell[][]

const Game2048: React.FC<Game2048Props> = ({ onScoreUpdate, onGameOver, isPlaying }) => {
  const [grid, setGrid] = useState<Grid>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null)
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null)

  const initializeGrid = useCallback(() => {
    const newGrid: Grid = Array(4)
      .fill(null)
      .map(() => Array(4).fill(null))
    addRandomTile(newGrid)
    addRandomTile(newGrid)
    setGrid(newGrid)
    setScore(0)
    setGameOver(false)
    onScoreUpdate(0)
  }, [onScoreUpdate])

  useEffect(() => {
    if (isPlaying) {
      initializeGrid()
    }
  }, [isPlaying, initializeGrid])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying || gameOver) return

      switch (e.key) {
        case "ArrowUp":
          moveUp()
          break
        case "ArrowDown":
          moveDown()
          break
        case "ArrowLeft":
          moveLeft()
          break
        case "ArrowRight":
          moveRight()
          break
        default:
          return
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [grid, gameOver, isPlaying])

  const addRandomTile = (grid: Grid) => {
    const emptyCells: [number, number][] = []

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (grid[i][j] === null) {
          emptyCells.push([i, j])
        }
      }
    }

    if (emptyCells.length > 0) {
      const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)]
      grid[row][col] = Math.random() < 0.9 ? 2 : 4
    }
  }

  const checkGameOver = (grid: Grid) => {
    // Check if there are any empty cells
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (grid[i][j] === null) {
          return false
        }
      }
    }

    // Check if there are any possible moves
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[i][j] === grid[i][j + 1]) {
          return false
        }
      }
    }

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 4; j++) {
        if (grid[i][j] === grid[i + 1][j]) {
          return false
        }
      }
    }

    return true
  }

  const moveGrid = (direction: "up" | "down" | "left" | "right") => {
    if (gameOver) return

    const newGrid = JSON.parse(JSON.stringify(grid))
    let moved = false
    let newScore = score

    const moveAndMerge = (line: Cell[]): [Cell[], boolean, number] => {
      // Remove nulls
      const nonNullTiles = line.filter((cell) => cell !== null)
      let scoreIncrease = 0
      let hasMoved = line.length !== nonNullTiles.length

      // Merge tiles
      for (let i = 0; i < nonNullTiles.length - 1; i++) {
        if (nonNullTiles[i] === nonNullTiles[i + 1]) {
          nonNullTiles[i] = nonNullTiles[i]! * 2
          scoreIncrease += nonNullTiles[i]!
          nonNullTiles.splice(i + 1, 1)
          hasMoved = true
        }
      }

      // Fill with nulls
      while (nonNullTiles.length < line.length) {
        nonNullTiles.push(null)
      }

      return [nonNullTiles, hasMoved, scoreIncrease]
    }

    if (direction === "left") {
      for (let i = 0; i < 4; i++) {
        const [newLine, hasMoved, scoreIncrease] = moveAndMerge(newGrid[i])
        if (hasMoved) {
          moved = true
          newGrid[i] = newLine
          newScore += scoreIncrease
        }
      }
    } else if (direction === "right") {
      for (let i = 0; i < 4; i++) {
        const [newLine, hasMoved, scoreIncrease] = moveAndMerge(newGrid[i].slice().reverse())
        if (hasMoved) {
          moved = true
          newGrid[i] = newLine.reverse()
          newScore += scoreIncrease
        }
      }
    } else if (direction === "up") {
      for (let j = 0; j < 4; j++) {
        const column = [newGrid[0][j], newGrid[1][j], newGrid[2][j], newGrid[3][j]]
        const [newColumn, hasMoved, scoreIncrease] = moveAndMerge(column)
        if (hasMoved) {
          moved = true
          for (let i = 0; i < 4; i++) {
            newGrid[i][j] = newColumn[i]
          }
          newScore += scoreIncrease
        }
      }
    } else if (direction === "down") {
      for (let j = 0; j < 4; j++) {
        const column = [newGrid[0][j], newGrid[1][j], newGrid[2][j], newGrid[3][j]].reverse()
        const [newColumn, hasMoved, scoreIncrease] = moveAndMerge(column)
        if (hasMoved) {
          moved = true
          const reversedColumn = newColumn.reverse()
          for (let i = 0; i < 4; i++) {
            newGrid[i][j] = reversedColumn[i]
          }
          newScore += scoreIncrease
        }
      }
    }

    if (moved) {
      addRandomTile(newGrid)
      setGrid(newGrid)
      setScore(newScore)
      onScoreUpdate(newScore)

      if (checkGameOver(newGrid)) {
        setGameOver(true)
        onGameOver()
      }
    }
  }

  const moveUp = () => moveGrid("up")
  const moveDown = () => moveGrid("down")
  const moveLeft = () => moveGrid("left")
  const moveRight = () => moveGrid("right")

  // Touch controls for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    })
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    })
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const xDiff = touchStart.x - touchEnd.x
    const yDiff = touchStart.y - touchEnd.y

    // Determine the direction of the swipe
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 10) {
        moveLeft()
      } else if (xDiff < -10) {
        moveRight()
      }
    } else {
      if (yDiff > 10) {
        moveUp()
      } else if (yDiff < -10) {
        moveDown()
      }
    }

    setTouchStart(null)
    setTouchEnd(null)
  }

  const getCellColor = (value: number | null) => {
    if (value === null) return "bg-gray-200 dark:bg-gray-700"

    const colors: Record<number, string> = {
      2: "bg-amber-100 text-amber-800",
      4: "bg-amber-200 text-amber-800",
      8: "bg-amber-300 text-amber-800",
      16: "bg-amber-400 text-amber-800",
      32: "bg-amber-500 text-white",
      64: "bg-amber-600 text-white",
      128: "bg-amber-700 text-white",
      256: "bg-primary text-white",
      512: "bg-primary-600 text-white",
      1024: "bg-primary-700 text-white",
      2048: "bg-primary-800 text-white",
    }

    return colors[value] || "bg-primary-900 text-white"
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className="grid grid-cols-4 gap-2 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-inner"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {grid.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className={`w-full aspect-square flex items-center justify-center rounded-md text-xl md:text-2xl font-bold shadow transition-all duration-100 ${getCellColor(cell)}`}
            >
              {cell}
            </div>
          )),
        )}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-2">
        <div className="col-start-2">
          <Button variant="outline" className="w-full" onClick={moveUp} disabled={gameOver || !isPlaying}>
            <ArrowUp className="h-5 w-5" />
          </Button>
        </div>
        <div className="col-start-1 col-end-4 grid grid-cols-3 gap-2">
          <Button variant="outline" className="w-full" onClick={moveLeft} disabled={gameOver || !isPlaying}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Button variant="outline" className="w-full" onClick={moveDown} disabled={gameOver || !isPlaying}>
            <ArrowDown className="h-5 w-5" />
          </Button>
          <Button variant="outline" className="w-full" onClick={moveRight} disabled={gameOver || !isPlaying}>
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="mt-4 text-center text-sm text-muted-foreground">Swipe or use arrow keys to move tiles</div>
    </div>
  )
}

export default Game2048

