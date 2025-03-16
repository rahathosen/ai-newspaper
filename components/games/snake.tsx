"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { RotateCcw, Pause, Play, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react"

interface SnakeProps {
  onScoreUpdate: (score: number) => void
  onGameOver: () => void
  isPlaying: boolean
}

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT"
type Position = { x: number; y: number }

const GRID_SIZE = 20
const INITIAL_SPEED = 150 // ms
const MIN_SPEED = 50 // ms (fastest)
const MAX_SPEED = 300 // ms (slowest)

const Snake: React.FC<SnakeProps> = ({ onScoreUpdate, onGameOver, isPlaying }) => {
  const [snake, setSnake] = useState<Position[]>([])
  const [food, setFood] = useState<Position | null>(null)
  const [direction, setDirection] = useState<Direction>("RIGHT")
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [speed, setSpeed] = useState(INITIAL_SPEED)
  const [isPaused, setIsPaused] = useState(false)
  const [highScore, setHighScore] = useState(0)
  const [touchStart, setTouchStart] = useState<Position | null>(null)

  const gameLoopRef = useRef<NodeJS.Timeout | null>(null)
  const directionQueueRef = useRef<Direction[]>([])
  const lastRenderTimeRef = useRef<number>(0)

  useEffect(() => {
    if (isPlaying) {
      initializeGame()
    }

    return () => {
      if (gameLoopRef.current) {
        clearTimeout(gameLoopRef.current)
      }
    }
  }, [isPlaying])

  const initializeGame = () => {
    // Initialize snake in the middle of the grid
    const initialSnake = [
      { x: Math.floor(GRID_SIZE / 2), y: Math.floor(GRID_SIZE / 2) },
      { x: Math.floor(GRID_SIZE / 2) - 1, y: Math.floor(GRID_SIZE / 2) },
      { x: Math.floor(GRID_SIZE / 2) - 2, y: Math.floor(GRID_SIZE / 2) },
    ]

    setSnake(initialSnake)
    setDirection("RIGHT")
    setGameOver(false)
    setScore(0)
    setSpeed(INITIAL_SPEED)
    setIsPaused(false)
    directionQueueRef.current = []

    // Generate initial food
    generateFood(initialSnake)

    // Start game loop
    if (gameLoopRef.current) {
      clearTimeout(gameLoopRef.current)
    }

    lastRenderTimeRef.current = Date.now()
    gameLoop()

    onScoreUpdate(0)
  }

  const generateFood = (currentSnake: Position[]) => {
    let newFood: Position
    let foodOnSnake = true

    // Generate food until it's not on the snake
    while (foodOnSnake) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      }

      foodOnSnake = currentSnake.some((segment) => segment.x === newFood.x && segment.y === newFood.y)

      if (!foodOnSnake) {
        setFood(newFood)
      }
    }
  }

  const gameLoop = () => {
    if (gameOver || isPaused || !isPlaying) return

    const now = Date.now()
    const delta = now - lastRenderTimeRef.current

    if (delta >= speed) {
      lastRenderTimeRef.current = now
      updateGame()
    }

    gameLoopRef.current = setTimeout(gameLoop, 10)
  }

  const updateGame = () => {
    // Process direction queue
    if (directionQueueRef.current.length > 0) {
      setDirection(directionQueueRef.current.shift()!)
    }

    setSnake((prevSnake) => {
      // Create new head based on direction
      const head = { ...prevSnake[0] }

      switch (direction) {
        case "UP":
          head.y -= 1
          break
        case "DOWN":
          head.y += 1
          break
        case "LEFT":
          head.x -= 1
          break
        case "RIGHT":
          head.x += 1
          break
      }

      // Check for collisions
      if (
        head.x < 0 ||
        head.x >= GRID_SIZE ||
        head.y < 0 ||
        head.y >= GRID_SIZE ||
        prevSnake.some((segment) => segment.x === head.x && segment.y === head.y)
      ) {
        handleGameOver()
        return prevSnake
      }

      // Create new snake array
      const newSnake = [head, ...prevSnake]

      // Check if snake ate food
      if (food && head.x === food.x && head.y === food.y) {
        // Snake grows, don't remove tail
        const newScore = score + 10
        setScore(newScore)
        onScoreUpdate(newScore)

        // Generate new food
        generateFood(newSnake)

        // Increase speed slightly
        if (speed > MIN_SPEED) {
          setSpeed((prevSpeed) => Math.max(prevSpeed - 5, MIN_SPEED))
        }
      } else {
        // Remove tail
        newSnake.pop()
      }

      return newSnake
    })
  }

  const handleGameOver = () => {
    setGameOver(true)

    if (gameLoopRef.current) {
      clearTimeout(gameLoopRef.current)
    }

    if (score > highScore) {
      setHighScore(score)
    }

    onGameOver()
  }

  const handleDirectionChange = (newDirection: Direction) => {
    if (gameOver || isPaused) return

    // Prevent 180-degree turns
    const lastDirection =
      directionQueueRef.current.length > 0 ? directionQueueRef.current[directionQueueRef.current.length - 1] : direction

    if (
      (lastDirection === "UP" && newDirection === "DOWN") ||
      (lastDirection === "DOWN" && newDirection === "UP") ||
      (lastDirection === "LEFT" && newDirection === "RIGHT") ||
      (lastDirection === "RIGHT" && newDirection === "LEFT")
    ) {
      return
    }

    // Add direction to queue (limit queue size to prevent too many inputs)
    if (directionQueueRef.current.length < 3) {
      directionQueueRef.current.push(newDirection)
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          handleDirectionChange("UP")
          break
        case "ArrowDown":
          handleDirectionChange("DOWN")
          break
        case "ArrowLeft":
          handleDirectionChange("LEFT")
          break
        case "ArrowRight":
          handleDirectionChange("RIGHT")
          break
        case " ": // Space bar
          setIsPaused((prev) => !prev)
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  useEffect(() => {
    if (isPaused) {
      if (gameLoopRef.current) {
        clearTimeout(gameLoopRef.current)
      }
    } else if (!gameOver && isPlaying) {
      lastRenderTimeRef.current = Date.now()
      gameLoop()
    }
  }, [isPaused, gameOver, isPlaying])

  // Touch controls for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    })
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return

    const touchEnd = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    }

    const dx = touchEnd.x - touchStart.x
    const dy = touchEnd.y - touchStart.y

    // Determine swipe direction based on the greatest difference
    if (Math.abs(dx) > Math.abs(dy)) {
      // Horizontal swipe
      if (dx > 20) {
        handleDirectionChange("RIGHT")
      } else if (dx < -20) {
        handleDirectionChange("LEFT")
      }
    } else {
      // Vertical swipe
      if (dy > 20) {
        handleDirectionChange("DOWN")
      } else if (dy < -20) {
        handleDirectionChange("UP")
      }
    }

    setTouchStart(touchEnd)
  }

  const renderGrid = () => {
    const cells = []

    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        // Check if this cell is part of the snake
        const isSnakeCell = snake.some((segment) => segment.x === x && segment.y === y)
        const isSnakeHead = snake.length > 0 && snake[0].x === x && snake[0].y === y
        const isFood = food && food.x === x && food.y === y

        let cellClass = "bg-gray-100 dark:bg-gray-800"

        if (isSnakeHead) {
          cellClass = "bg-primary"
        } else if (isSnakeCell) {
          cellClass = "bg-primary/80"
        } else if (isFood) {
          cellClass = "bg-red-500"
        }

        cells.push(<div key={`${x}-${y}`} className={`w-full h-full ${cellClass}`} />)
      }
    }

    return cells
  }

  const handleSpeedChange = (value: number[]) => {
    // Convert slider value (0-100) to speed (MIN_SPEED to MAX_SPEED)
    // Note: Higher slider value = lower speed value (faster game)
    const newSpeed = MAX_SPEED - (value[0] / 100) * (MAX_SPEED - MIN_SPEED)
    setSpeed(newSpeed)
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="mb-4 flex justify-between items-center">
        <div className="flex gap-3">
          <div className="bg-white dark:bg-gray-800 px-3 py-1 rounded-md shadow-sm">
            <span className="text-sm font-medium text-muted-foreground">Score</span>
            <div className="text-xl font-bold text-primary">{score}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 px-3 py-1 rounded-md shadow-sm">
            <span className="text-sm font-medium text-muted-foreground">High Score</span>
            <div className="text-xl font-bold text-amber-500">{highScore}</div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsPaused((prev) => !prev)} disabled={gameOver}>
            {isPaused ? (
              <>
                <Play className="h-4 w-4 mr-2" /> Resume
              </>
            ) : (
              <>
                <Pause className="h-4 w-4 mr-2" /> Pause
              </>
            )}
          </Button>
          <Button variant="outline" size="sm" onClick={initializeGame}>
            <RotateCcw className="h-4 w-4 mr-2" /> Restart
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm">Speed:</span>
          <Badge variant="outline">{Math.round(100 - ((speed - MIN_SPEED) / (MAX_SPEED - MIN_SPEED)) * 100)}%</Badge>
        </div>
        <Slider
          defaultValue={[50]}
          max={100}
          step={1}
          value={[100 - ((speed - MIN_SPEED) / (MAX_SPEED - MIN_SPEED)) * 100]}
          onValueChange={handleSpeedChange}
          disabled={gameOver}
        />
      </div>

      <div
        className="aspect-square bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div className="w-full h-full grid" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}>
          {renderGrid()}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="col-start-2">
          <Button variant="outline" className="w-full" onClick={() => handleDirectionChange("UP")} disabled={gameOver}>
            <ArrowUp className="h-5 w-5" />
          </Button>
        </div>
        <div className="col-start-1 col-end-4 grid grid-cols-3 gap-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleDirectionChange("LEFT")}
            disabled={gameOver}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleDirectionChange("DOWN")}
            disabled={gameOver}
          >
            <ArrowDown className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleDirectionChange("RIGHT")}
            disabled={gameOver}
          >
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {gameOver && (
        <div className="mt-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-100 rounded-lg">
          <h3 className="text-lg font-bold mb-2">Game Over!</h3>
          <p>
            Your score: <span className="font-bold">{score}</span>
          </p>
          <Button onClick={initializeGame} className="mt-3">
            <RotateCcw className="h-4 w-4 mr-2" /> Play Again
          </Button>
        </div>
      )}

      <div className="mt-4 text-center text-sm text-muted-foreground">Use arrow keys or swipe to control the snake</div>
    </div>
  )
}

export default Snake

