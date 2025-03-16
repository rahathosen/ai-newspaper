"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RotateCcw, Flag, Bomb, Clock } from "lucide-react"

interface MinesweeperProps {
  onScoreUpdate: (score: number) => void
  onGameOver: () => void
  isPlaying: boolean
}

type CellState = {
  revealed: boolean
  hasMine: boolean
  flagged: boolean
  adjacentMines: number
}

type Difficulty = "easy" | "medium" | "hard"

const difficultySettings = {
  easy: { rows: 9, cols: 9, mines: 10 },
  medium: { rows: 16, cols: 16, mines: 40 },
  hard: { rows: 16, cols: 30, mines: 99 },
}

const Minesweeper: React.FC<MinesweeperProps> = ({ onScoreUpdate, onGameOver, isPlaying }) => {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy")
  const [grid, setGrid] = useState<CellState[][]>([])
  const [gameState, setGameState] = useState<"playing" | "won" | "lost">("playing")
  const [flagsPlaced, setFlagsPlaced] = useState(0)
  const [time, setTime] = useState(0)
  const [firstClick, setFirstClick] = useState(true)
  const [score, setScore] = useState(0)

  useEffect(() => {
    if (isPlaying) {
      initializeGame(difficulty)
    }
  }, [isPlaying])

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isPlaying && gameState === "playing" && !firstClick) {
      timer = setInterval(() => {
        setTime((prev) => prev + 1)
      }, 1000)
    }

    return () => clearInterval(timer)
  }, [isPlaying, gameState, firstClick])

  const initializeGame = (selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty)
    const { rows, cols } = difficultySettings[selectedDifficulty]

    // Create empty grid
    const newGrid: CellState[][] = Array(rows)
      .fill(null)
      .map(() =>
        Array(cols)
          .fill(null)
          .map(() => ({
            revealed: false,
            hasMine: false,
            flagged: false,
            adjacentMines: 0,
          })),
      )

    setGrid(newGrid)
    setGameState("playing")
    setFlagsPlaced(0)
    setTime(0)
    setFirstClick(true)
    setScore(0)
    onScoreUpdate(0)
  }

  const placeMines = (grid: CellState[][], firstClickRow: number, firstClickCol: number) => {
    const { rows, cols, mines } = difficultySettings[difficulty]
    const newGrid = JSON.parse(JSON.stringify(grid))
    let minesPlaced = 0

    // Create a safe zone around the first click
    const safeZone = []
    for (let r = Math.max(0, firstClickRow - 1); r <= Math.min(rows - 1, firstClickRow + 1); r++) {
      for (let c = Math.max(0, firstClickCol - 1); c <= Math.min(cols - 1, firstClickCol + 1); c++) {
        safeZone.push({ row: r, col: c })
      }
    }

    // Place mines randomly
    while (minesPlaced < mines) {
      const row = Math.floor(Math.random() * rows)
      const col = Math.floor(Math.random() * cols)

      // Skip if mine already exists or if it's in the safe zone
      if (newGrid[row][col].hasMine || safeZone.some((pos) => pos.row === row && pos.col === col)) {
        continue
      }

      newGrid[row][col].hasMine = true
      minesPlaced++

      // Update adjacent mine counts
      for (let r = Math.max(0, row - 1); r <= Math.min(rows - 1, row + 1); r++) {
        for (let c = Math.max(0, col - 1); c <= Math.min(cols - 1, col + 1); c++) {
          if (r === row && c === col) continue
          newGrid[r][c].adjacentMines++
        }
      }
    }

    return newGrid
  }

  const handleCellClick = (row: number, col: number) => {
    if (gameState !== "playing" || grid[row][col].revealed || grid[row][col].flagged) {
      return
    }

    // First click should never be a mine
    if (firstClick) {
      const newGrid = placeMines(grid, row, col)
      setGrid(newGrid)
      setFirstClick(false)

      // Reveal the clicked cell
      revealCell(newGrid, row, col)
      return
    }

    const newGrid = JSON.parse(JSON.stringify(grid))

    // Check if clicked on a mine
    if (newGrid[row][col].hasMine) {
      // Game over
      revealAllMines(newGrid)
      setGameState("lost")
      onGameOver()
      return
    }

    // Reveal the clicked cell and adjacent cells if needed
    revealCell(newGrid, row, col)

    // Check if the game is won
    if (checkWinCondition(newGrid)) {
      const newScore = calculateScore()
      setScore(newScore)
      setGameState("won")
      onScoreUpdate(newScore)
      onGameOver()
    }
  }

  const handleRightClick = (e: React.MouseEvent, row: number, col: number) => {
    e.preventDefault()

    if (gameState !== "playing" || grid[row][col].revealed) {
      return
    }

    const newGrid = JSON.parse(JSON.stringify(grid))

    // Toggle flag
    newGrid[row][col].flagged = !newGrid[row][col].flagged

    // Update flag count
    setFlagsPlaced((prev) => (newGrid[row][col].flagged ? prev + 1 : prev - 1))

    setGrid(newGrid)
  }

  const revealCell = (grid: CellState[][], row: number, col: number) => {
    const { rows, cols } = difficultySettings[difficulty]

    // If out of bounds, already revealed, or flagged, return
    if (row < 0 || row >= rows || col < 0 || col >= cols || grid[row][col].revealed || grid[row][col].flagged) {
      return
    }

    // Reveal the cell
    grid[row][col].revealed = true

    // If it has no adjacent mines, reveal adjacent cells
    if (grid[row][col].adjacentMines === 0) {
      for (let r = Math.max(0, row - 1); r <= Math.min(rows - 1, row + 1); r++) {
        for (let c = Math.max(0, col - 1); c <= Math.min(cols - 1, col + 1); c++) {
          if (r === row && c === col) continue
          revealCell(grid, r, c)
        }
      }
    }

    setGrid([...grid])
  }

  const revealAllMines = (grid: CellState[][]) => {
    const { rows, cols } = difficultySettings[difficulty]

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (grid[row][col].hasMine) {
          grid[row][col].revealed = true
        }
      }
    }

    setGrid([...grid])
  }

  const checkWinCondition = (grid: CellState[][]) => {
    const { rows, cols, mines } = difficultySettings[difficulty]
    let revealedCount = 0

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (grid[row][col].revealed) {
          revealedCount++
        }
      }
    }

    // Win if all non-mine cells are revealed
    return revealedCount === rows * cols - mines
  }

  const calculateScore = () => {
    const { mines } = difficultySettings[difficulty]

    // Base score depends on difficulty
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

    // Time penalty
    const timePenalty = Math.floor(time / 10) * 10

    return Math.max(0, baseScore - timePenalty)
  }

  const getCellContent = (cell: CellState) => {
    if (!cell.revealed) {
      if (cell.flagged) {
        return <Flag className="h-4 w-4 text-red-500" />
      }
      return null
    }

    if (cell.hasMine) {
      return <Bomb className="h-4 w-4" />
    }

    if (cell.adjacentMines === 0) {
      return null
    }

    const colors = [
      "", // 0 mines (not used)
      "text-blue-600 dark:text-blue-400",
      "text-green-600 dark:text-green-400",
      "text-red-600 dark:text-red-400",
      "text-purple-600 dark:text-purple-400",
      "text-amber-600 dark:text-amber-400",
      "text-teal-600 dark:text-teal-400",
      "text-black dark:text-white",
      "text-gray-600 dark:text-gray-400",
    ]

    return <span className={`font-bold ${colors[cell.adjacentMines]}`}>{cell.adjacentMines}</span>
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getCellSize = () => {
    switch (difficulty) {
      case "easy":
        return "w-8 h-8 md:w-10 md:h-10"
      case "medium":
        return "w-6 h-6 md:w-8 md:h-8"
      case "hard":
        return "w-5 h-5 md:w-6 md:h-6"
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-4">
        <Tabs defaultValue={difficulty} onValueChange={(value) => initializeGame(value as Difficulty)}>
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="easy">Easy</TabsTrigger>
            <TabsTrigger value="medium">Medium</TabsTrigger>
            <TabsTrigger value="hard">Hard</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <div className="flex gap-3">
          <div className="bg-white dark:bg-gray-800 px-3 py-1 rounded-md shadow-sm flex items-center">
            <Flag className="h-4 w-4 mr-1 text-red-500" />
            <div className="text-xl font-bold">
              {flagsPlaced}/{difficultySettings[difficulty].mines}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 px-3 py-1 rounded-md shadow-sm flex items-center">
            <Clock className="h-4 w-4 mr-1 text-amber-500" />
            <div className="text-xl font-bold">{formatTime(time)}</div>
          </div>
        </div>

        <Button variant="outline" size="sm" onClick={() => initializeGame(difficulty)}>
          <RotateCcw className="h-4 w-4 mr-2" /> Restart
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-900 p-2 md:p-4 rounded-lg shadow-md overflow-auto">
        <div
          className="grid gap-1"
          style={{
            gridTemplateRows: `repeat(${difficultySettings[difficulty].rows}, 1fr)`,
            gridTemplateColumns: `repeat(${difficultySettings[difficulty].cols}, 1fr)`,
          }}
        >
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                className={`${getCellSize()} flex items-center justify-center border ${
                  cell.revealed
                    ? cell.hasMine
                      ? "bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700"
                      : "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                    : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 border-gray-300 dark:border-gray-600"
                }`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                onContextMenu={(e) => handleRightClick(e, rowIndex, colIndex)}
                disabled={gameState !== "playing"}
              >
                {getCellContent(cell)}
              </button>
            )),
          )}
        </div>
      </div>

      {gameState !== "playing" && (
        <div
          className={`mt-6 p-4 rounded-lg ${
            gameState === "won"
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-100"
              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-100"
          }`}
        >
          <h3 className="text-lg font-bold mb-2">{gameState === "won" ? "You won!" : "Game over!"}</h3>
          <p>Time: {formatTime(time)}</p>
          {gameState === "won" && <p>Score: {score}</p>}
          <Button onClick={() => initializeGame(difficulty)} className="mt-3">
            <RotateCcw className="h-4 w-4 mr-2" /> Play Again
          </Button>
        </div>
      )}

      <div className="mt-4 text-center text-sm text-muted-foreground">
        Left click to reveal a cell, right click to place a flag
      </div>
    </div>
  )
}

export default Minesweeper

