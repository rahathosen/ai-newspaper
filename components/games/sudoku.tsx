"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, Lightbulb, Check, X } from "lucide-react"

interface SudokuProps {
  onScoreUpdate: (score: number) => void
  onGameOver: () => void
  isPlaying: boolean
}

type SudokuGrid = (number | null)[][]

const Sudoku: React.FC<SudokuProps> = ({ onScoreUpdate, onGameOver, isPlaying }) => {
  const [originalGrid, setOriginalGrid] = useState<SudokuGrid>([])
  const [grid, setGrid] = useState<SudokuGrid>([])
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null)
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy")
  const [mistakes, setMistakes] = useState<number>(0)
  const [hintsUsed, setHintsUsed] = useState<number>(0)
  const [time, setTime] = useState<number>(0)
  const [gameOver, setGameOver] = useState<boolean>(false)
  const [isComplete, setIsComplete] = useState<boolean>(false)
  const [score, setScore] = useState<number>(0)
  const [conflicts, setConflicts] = useState<[number, number][]>([])

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

    // Generate a solved Sudoku grid
    const solvedGrid = generateSolvedGrid()

    // Create a puzzle by removing numbers based on difficulty
    const puzzle = createPuzzle(solvedGrid, selectedDifficulty)

    setOriginalGrid(JSON.parse(JSON.stringify(puzzle)))
    setGrid(JSON.parse(JSON.stringify(puzzle)))
    setSelectedCell(null)
    setMistakes(0)
    setHintsUsed(0)
    setTime(0)
    setGameOver(false)
    setIsComplete(false)
    setScore(0)
    onScoreUpdate(0)
    setConflicts([])
  }

  const generateSolvedGrid = (): SudokuGrid => {
    // For simplicity, we'll use a pre-solved grid
    // In a real implementation, you would use a proper Sudoku generator
    return [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9],
    ]
  }

  const createPuzzle = (solvedGrid: SudokuGrid, difficulty: "easy" | "medium" | "hard"): SudokuGrid => {
    const puzzle = JSON.parse(JSON.stringify(solvedGrid))

    // Determine how many cells to remove based on difficulty
    let cellsToRemove = 0
    switch (difficulty) {
      case "easy":
        cellsToRemove = 40 // ~45% empty
        break
      case "medium":
        cellsToRemove = 50 // ~55% empty
        break
      case "hard":
        cellsToRemove = 60 // ~65% empty
        break
    }

    // Randomly remove cells
    let removed = 0
    while (removed < cellsToRemove) {
      const row = Math.floor(Math.random() * 9)
      const col = Math.floor(Math.random() * 9)

      if (puzzle[row][col] !== null) {
        puzzle[row][col] = null
        removed++
      }
    }

    return puzzle
  }

  const handleCellClick = (row: number, col: number) => {
    if (originalGrid[row][col] !== null || gameOver) {
      return // Don't allow editing of original cells
    }

    setSelectedCell([row, col])
  }

  const handleNumberInput = (value: number | null) => {
    if (!selectedCell || gameOver) return

    const [row, col] = selectedCell

    // Check if the input is valid
    const solvedValue = getSolvedValue(row, col)
    const isValid = value === null || value === solvedValue

    // Update the grid
    const newGrid = [...grid.map((row) => [...row])]
    newGrid[row][col] = value
    setGrid(newGrid)

    // Check for conflicts
    const newConflicts = findConflicts(newGrid, row, col, value)
    setConflicts(newConflicts)

    // Update mistakes if needed
    if (value !== null && !isValid) {
      setMistakes((prev) => prev + 1)

      // Game over after 3 mistakes
      if (mistakes + 1 >= 3) {
        endGame(false)
      }
    }

    // Check if the puzzle is complete
    if (isPuzzleComplete(newGrid)) {
      endGame(true)
    }
  }

  const getSolvedValue = (row: number, col: number): number => {
    // In a real implementation, you would have the solution grid
    // For simplicity, we'll use our pre-solved grid
    const solvedGrid = generateSolvedGrid()
    return solvedGrid[row][col]
  }

  const findConflicts = (grid: SudokuGrid, row: number, col: number, value: number | null): [number, number][] => {
    if (value === null) return []

    const conflicts: [number, number][] = []

    // Check row
    for (let c = 0; c < 9; c++) {
      if (c !== col && grid[row][c] === value) {
        conflicts.push([row, c])
      }
    }

    // Check column
    for (let r = 0; r < 9; r++) {
      if (r !== row && grid[r][col] === value) {
        conflicts.push([r, col])
      }
    }

    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3
    const boxCol = Math.floor(col / 3) * 3

    for (let r = boxRow; r < boxRow + 3; r++) {
      for (let c = boxCol; c < boxCol + 3; c++) {
        if (r !== row && c !== col && grid[r][c] === value) {
          conflicts.push([r, c])
        }
      }
    }

    return conflicts
  }

  const isPuzzleComplete = (grid: SudokuGrid): boolean => {
    // Check if all cells are filled
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (grid[r][c] === null) {
          return false
        }
      }
    }

    // Check if there are no conflicts
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const value = grid[r][c]
        if (value !== null && findConflicts(grid, r, c, value).length > 0) {
          return false
        }
      }
    }

    return true
  }

  const useHint = () => {
    if (!selectedCell || hintsUsed >= 3 || gameOver) return

    const [row, col] = selectedCell
    const solvedValue = getSolvedValue(row, col)

    const newGrid = [...grid.map((row) => [...row])]
    newGrid[row][col] = solvedValue
    setGrid(newGrid)

    setHintsUsed((prev) => prev + 1)
    setConflicts([])

    // Check if the puzzle is complete
    if (isPuzzleComplete(newGrid)) {
      endGame(true)
    }
  }

  const endGame = (success: boolean) => {
    setGameOver(true)
    setIsComplete(success)

    if (success) {
      // Calculate score based on difficulty, time, mistakes, and hints
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

      // Penalties
      const timePenalty = Math.floor(time / 60) * 50
      const mistakesPenalty = mistakes * 100
      const hintsPenalty = hintsUsed * 200

      const finalScore = Math.max(0, baseScore - timePenalty - mistakesPenalty - hintsPenalty)

      setScore(finalScore)
      onScoreUpdate(finalScore)
    } else {
      setScore(0)
      onScoreUpdate(0)
    }

    onGameOver()
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const isCellInConflict = (row: number, col: number): boolean => {
    return conflicts.some(([r, c]) => r === row && c === col)
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="mb-4 flex justify-between items-center">
        <div className="flex gap-3">
          <div className="bg-white dark:bg-gray-800 px-3 py-1 rounded-md shadow-sm">
            <span className="text-sm font-medium text-muted-foreground">Mistakes</span>
            <div className="text-xl font-bold text-red-500">{mistakes}/3</div>
          </div>
          <div className="bg-white dark:bg-gray-800 px-3 py-1 rounded-md shadow-sm">
            <span className="text-sm font-medium text-muted-foreground">Hints</span>
            <div className="text-xl font-bold text-amber-500">{hintsUsed}/3</div>
          </div>
          <div className="bg-white dark:bg-gray-800 px-3 py-1 rounded-md shadow-sm">
            <span className="text-sm font-medium text-muted-foreground">Time</span>
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

      <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-9 gap-1">
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`aspect-square flex items-center justify-center text-lg font-bold border ${
                  Math.floor(rowIndex / 3) * 3 + (Math.floor(colIndex / 3) % 2) === 0
                    ? "bg-gray-50 dark:bg-gray-800"
                    : "bg-white dark:bg-gray-900"
                } ${(rowIndex + 1) % 3 === 0 && rowIndex < 8 ? "border-b-2 border-b-gray-400" : "border-gray-300"} ${
                  (colIndex + 1) % 3 === 0 && colIndex < 8 ? "border-r-2 border-r-gray-400" : "border-gray-300"
                } ${
                  selectedCell && selectedCell[0] === rowIndex && selectedCell[1] === colIndex
                    ? "bg-primary/20 border-primary"
                    : ""
                } ${isCellInConflict(rowIndex, colIndex) ? "bg-red-100 dark:bg-red-900/30" : ""} ${
                  originalGrid[rowIndex][colIndex] !== null
                    ? "cursor-not-allowed"
                    : "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {cell !== null ? cell : ""}
              </div>
            )),
          )}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2 mb-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <Button
            key={num}
            variant="outline"
            className="h-12 text-lg font-bold"
            onClick={() => handleNumberInput(num)}
            disabled={!selectedCell || gameOver}
          >
            {num}
          </Button>
        ))}
        <Button
          variant="outline"
          className="h-12 text-lg font-bold"
          onClick={() => handleNumberInput(null)}
          disabled={!selectedCell || gameOver}
        >
          Clear
        </Button>
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={useHint}
          disabled={!selectedCell || hintsUsed >= 3 || gameOver}
          className="flex items-center"
        >
          <Lightbulb className="h-4 w-4 mr-2" /> Use Hint ({3 - hintsUsed} left)
        </Button>

        <Button variant="outline" onClick={() => endGame(false)} className="flex items-center text-red-500">
          <X className="h-4 w-4 mr-2" /> Give Up
        </Button>
      </div>

      {gameOver && (
        <div
          className={`mt-6 p-4 rounded-lg ${
            isComplete ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            {isComplete ? (
              <>
                <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                <h3 className="text-lg font-bold text-green-600 dark:text-green-400">Puzzle Completed!</h3>
              </>
            ) : (
              <>
                <X className="h-5 w-5 text-red-600 dark:text-red-400" />
                <h3 className="text-lg font-bold text-red-600 dark:text-red-400">Game Over</h3>
              </>
            )}
          </div>

          {isComplete && (
            <div className="mb-2">
              <p className="font-medium">Your score: {score}</p>
              <p className="text-sm text-muted-foreground">
                Time: {formatTime(time)} | Mistakes: {mistakes} | Hints: {hintsUsed}
              </p>
            </div>
          )}

          <Button onClick={() => initializeGame(difficulty)} className="mt-2">
            <RotateCcw className="h-4 w-4 mr-2" /> Play Again
          </Button>
        </div>
      )}
    </div>
  )
}

export default Sudoku

