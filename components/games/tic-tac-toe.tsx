"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { RotateCcw, User, Bot } from "lucide-react"

interface TicTacToeProps {
  onGameOver: () => void
  isPlaying: boolean
}

type Player = "X" | "O"
type Board = (Player | null)[][]
type GameMode = "player" | "easy" | "hard"

const TicTacToe: React.FC<TicTacToeProps> = ({ onGameOver, isPlaying }) => {
  const [board, setBoard] = useState<Board>([])
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X")
  const [winner, setWinner] = useState<Player | "Draw" | null>(null)
  const [gameMode, setGameMode] = useState<GameMode>("player")
  const [isComputerThinking, setIsComputerThinking] = useState(false)

  useEffect(() => {
    if (isPlaying) {
      initializeGame()
    }
  }, [isPlaying])

  const initializeGame = () => {
    setBoard(
      Array(3)
        .fill(null)
        .map(() => Array(3).fill(null)),
    )
    setCurrentPlayer("X")
    setWinner(null)
  }

  useEffect(() => {
    if (winner) {
      onGameOver()
    }
  }, [winner, onGameOver])

  useEffect(() => {
    // Computer's turn
    if (isPlaying && !winner && currentPlayer === "O" && gameMode !== "player") {
      setIsComputerThinking(true)
      const timer = setTimeout(() => {
        makeComputerMove()
        setIsComputerThinking(false)
      }, 700) // Add a small delay to make it feel more natural

      return () => clearTimeout(timer)
    }
  }, [currentPlayer, winner, gameMode, isPlaying])

  const checkWinner = (board: Board): Player | "Draw" | null => {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (board[i][0] && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
        return board[i][0]
      }
    }

    // Check columns
    for (let j = 0; j < 3; j++) {
      if (board[0][j] && board[0][j] === board[1][j] && board[0][j] === board[2][j]) {
        return board[0][j]
      }
    }

    // Check diagonals
    if (board[0][0] && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
      return board[0][0]
    }

    if (board[0][2] && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
      return board[0][2]
    }

    // Check for draw
    const isBoardFull = board.every((row) => row.every((cell) => cell !== null))
    if (isBoardFull) {
      return "Draw"
    }

    return null
  }

  const handleCellClick = (row: number, col: number) => {
    if (
      !isPlaying ||
      winner ||
      board[row][col] ||
      (currentPlayer === "O" && gameMode !== "player") ||
      isComputerThinking
    ) {
      return
    }

    const newBoard = [...board.map((row) => [...row])]
    newBoard[row][col] = currentPlayer
    setBoard(newBoard)

    const gameWinner = checkWinner(newBoard)
    if (gameWinner) {
      setWinner(gameWinner)
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X")
    }
  }

  const makeComputerMove = () => {
    if (winner) return

    const newBoard = [...board.map((row) => [...row])]

    if (gameMode === "hard") {
      // Use minimax algorithm for hard mode
      const bestMove = findBestMove(newBoard)
      if (bestMove) {
        newBoard[bestMove.row][bestMove.col] = "O"
      }
    } else {
      // Easy mode: random moves
      const emptyCells: [number, number][] = []

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (newBoard[i][j] === null) {
            emptyCells.push([i, j])
          }
        }
      }

      if (emptyCells.length > 0) {
        const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        newBoard[row][col] = "O"
      }
    }

    setBoard(newBoard)

    const gameWinner = checkWinner(newBoard)
    if (gameWinner) {
      setWinner(gameWinner)
    } else {
      setCurrentPlayer("X")
    }
  }

  // Minimax algorithm for unbeatable AI
  const findBestMove = (board: Board) => {
    let bestVal = -1000
    let bestMove: { row: number; col: number } | null = null

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === null) {
          board[i][j] = "O"

          const moveVal = minimax(board, 0, false)

          board[i][j] = null

          if (moveVal > bestVal) {
            bestVal = moveVal
            bestMove = { row: i, col: j }
          }
        }
      }
    }

    return bestMove
  }

  const minimax = (board: Board, depth: number, isMaximizing: boolean): number => {
    const result = checkWinner(board)

    if (result === "O") return 10 - depth
    if (result === "X") return depth - 10
    if (result === "Draw") return 0

    if (isMaximizing) {
      let bestVal = -1000

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === null) {
            board[i][j] = "O"
            bestVal = Math.max(bestVal, minimax(board, depth + 1, !isMaximizing))
            board[i][j] = null
          }
        }
      }

      return bestVal
    } else {
      let bestVal = 1000

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === null) {
            board[i][j] = "X"
            bestVal = Math.min(bestVal, minimax(board, depth + 1, !isMaximizing))
            board[i][j] = null
          }
        }
      }

      return bestVal
    }
  }

  const handleRestart = () => {
    initializeGame()
  }

  const handleModeChange = (value: GameMode) => {
    setGameMode(value)
    initializeGame()
  }

  const getCellStyle = (value: Player | null) => {
    if (!value) return "hover:bg-gray-100 dark:hover:bg-gray-700"
    return value === "X" ? "bg-primary text-white" : "bg-amber-500 text-white"
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-4">
        <RadioGroup
          value={gameMode}
          onValueChange={(value) => handleModeChange(value as GameMode)}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="player" id="player" />
            <Label htmlFor="player" className="flex items-center">
              <User className="h-4 w-4 mr-1" /> 2 Players
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="easy" id="easy" />
            <Label htmlFor="easy" className="flex items-center">
              <Bot className="h-4 w-4 mr-1" /> Easy AI
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="hard" id="hard" />
            <Label htmlFor="hard" className="flex items-center">
              <Bot className="h-4 w-4 mr-1" /> Hard AI
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <div
          className={`px-3 py-1 rounded-md ${currentPlayer === "X" ? "bg-primary text-white" : "bg-gray-100 dark:bg-gray-800"}`}
        >
          Player X {currentPlayer === "X" && "Turn"}
        </div>
        <Button variant="outline" size="sm" onClick={handleRestart}>
          <RotateCcw className="h-4 w-4 mr-2" /> Restart
        </Button>
        <div
          className={`px-3 py-1 rounded-md ${currentPlayer === "O" ? "bg-amber-500 text-white" : "bg-gray-100 dark:bg-gray-800"}`}
        >
          Player O {currentPlayer === "O" && "Turn"}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md">
        {board.map((row, i) =>
          row.map((cell, j) => (
            <button
              key={`${i}-${j}`}
              className={`w-full aspect-square flex items-center justify-center text-2xl md:text-4xl font-bold border-2 border-gray-200 dark:border-gray-700 rounded-md transition-colors ${getCellStyle(cell)}`}
              onClick={() => handleCellClick(i, j)}
              disabled={!!winner || !!cell || isComputerThinking}
            >
              {cell}
            </button>
          )),
        )}
      </div>

      {winner && (
        <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-md text-center">
          {winner === "Draw" ? (
            <p className="font-bold">It's a draw!</p>
          ) : (
            <p className="font-bold">Player {winner} wins!</p>
          )}
        </div>
      )}

      {isComputerThinking && (
        <div className="mt-4 text-center text-sm text-muted-foreground">Computer is thinking...</div>
      )}
    </div>
  )
}

export default TicTacToe

