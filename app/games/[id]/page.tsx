"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Share2, Trophy, Users, Clock, RotateCcw, Save } from "lucide-react"
import Game2048 from "@/components/games/game-2048"
import TicTacToe from "@/components/games/tic-tac-toe"
import BrainPuzzle from "@/components/games/brain-puzzle"
import WordScramble from "@/components/games/word-scramble"
import MemoryMatch from "@/components/games/memory-match"
import Sudoku from "@/components/games/sudoku"
import Wordle from "@/components/games/wordle"
import Hangman from "@/components/games/hangman"
import Snake from "@/components/games/snake"
import Minesweeper from "@/components/games/minesweeper"

export default function GameDetailPage() {
  const params = useParams()
  const router = useRouter()
  const gameId = params.id as string
  const [score, setScore] = useState(0)
  const [time, setTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isPlaying && !gameOver) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [isPlaying, gameOver])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleScoreUpdate = (newScore: number) => {
    setScore(newScore)
  }

  const handleGameStart = () => {
    setIsPlaying(true)
    setGameOver(false)
    setTime(0)
    setScore(0)
  }

  const handleGameOver = () => {
    setIsPlaying(false)
    setGameOver(true)
  }

  const handleRestart = () => {
    setIsPlaying(true)
    setGameOver(false)
    setTime(0)
    setScore(0)
  }

  const games = {
    "2048": {
      title: "2048",
      description: "Combine the numbers to reach 2048 in this addictive puzzle game.",
      instructions:
        "Use arrow keys (or swipe on mobile) to move the tiles. When two tiles with the same number touch, they merge into one. Try to reach the 2048 tile!",
      component: <Game2048 onScoreUpdate={handleScoreUpdate} onGameOver={handleGameOver} isPlaying={isPlaying} />,
      highScore: 16384,
      averageTime: "08:42",
    },
    "tic-tac-toe": {
      title: "Tic-Tac-Toe",
      description: "The classic game of X's and O's. Challenge a friend or play against the computer.",
      instructions:
        "Take turns placing your mark (X or O) on the 3x3 grid. The first player to get three in a row (horizontally, vertically, or diagonally) wins!",
      component: <TicTacToe onGameOver={handleGameOver} isPlaying={isPlaying} />,
      highScore: "N/A",
      averageTime: "01:15",
    },
    "brain-puzzle": {
      title: "Brain Teasers",
      description: "Test your cognitive skills with these challenging brain teasers and puzzles.",
      instructions:
        "Solve a series of logic puzzles and brain teasers. Each correct answer earns you points. Try to solve as many as you can!",
      component: <BrainPuzzle onScoreUpdate={handleScoreUpdate} onGameOver={handleGameOver} isPlaying={isPlaying} />,
      highScore: 2500,
      averageTime: "12:30",
    },
    "word-scramble": {
      title: "Word Scramble",
      description: "Unscramble the letters to form words. How many can you solve?",
      instructions:
        "Rearrange the scrambled letters to form a valid word. Type your answer in the input field and press Enter to submit.",
      component: <WordScramble onScoreUpdate={handleScoreUpdate} onGameOver={handleGameOver} isPlaying={isPlaying} />,
      highScore: 3200,
      averageTime: "07:15",
    },
    "memory-match": {
      title: "Memory Match",
      description: "Find matching pairs of cards in this classic memory game.",
      instructions:
        "Click on cards to flip them over. Find all matching pairs with the fewest moves possible. The game ends when all pairs are found.",
      component: <MemoryMatch onScoreUpdate={handleScoreUpdate} onGameOver={handleGameOver} isPlaying={isPlaying} />,
      highScore: 100,
      averageTime: "03:45",
    },
    sudoku: {
      title: "Sudoku",
      description: "Fill the grid with numbers 1-9 so each row, column, and 3×3 section contains all digits.",
      instructions:
        "Fill in the grid so that every row, column, and 3×3 box contains the digits 1 through 9. Start with the given numbers and use logic to solve the puzzle.",
      component: <Sudoku onScoreUpdate={handleScoreUpdate} onGameOver={handleGameOver} isPlaying={isPlaying} />,
      highScore: 10000,
      averageTime: "15:20",
    },
    wordle: {
      title: "Wordle",
      description: "Guess the 5-letter word in six tries. Each guess must be a valid word.",
      instructions:
        "After each guess, the color of the tiles will change to show how close your guess was to the word. Green means the letter is correct and in the right spot, yellow means the letter is in the word but in the wrong spot, and gray means the letter is not in the word.",
      component: <Wordle onScoreUpdate={handleScoreUpdate} onGameOver={handleGameOver} isPlaying={isPlaying} />,
      highScore: 600,
      averageTime: "04:30",
    },
    hangman: {
      title: "Hangman",
      description: "Guess the word one letter at a time before the hangman is complete.",
      instructions:
        "Try to guess the hidden word by suggesting letters. Each incorrect guess adds a part to the hangman. The game ends when the hangman is complete or when you guess the word correctly.",
      component: <Hangman onScoreUpdate={handleScoreUpdate} onGameOver={handleGameOver} isPlaying={isPlaying} />,
      highScore: 500,
      averageTime: "03:15",
    },
    snake: {
      title: "Snake",
      description: "Control the snake to eat food and grow without hitting the walls or yourself.",
      instructions:
        "Use the arrow keys (or swipe on mobile) to control the direction of the snake. Eat the food to grow longer, but avoid hitting the walls or your own tail!",
      component: <Snake onScoreUpdate={handleScoreUpdate} onGameOver={handleGameOver} isPlaying={isPlaying} />,
      highScore: 250,
      averageTime: "05:45",
    },
    minesweeper: {
      title: "Minesweeper",
      description: "Clear the minefield without detonating any of the hidden mines.",
      instructions:
        "Left-click to reveal a cell, right-click to place a flag where you think a mine is hidden. Numbers indicate how many mines are adjacent to that cell. Use logic to determine where the mines are!",
      component: <Minesweeper onScoreUpdate={handleScoreUpdate} onGameOver={handleGameOver} isPlaying={isPlaying} />,
      highScore: 3500,
      averageTime: "10:30",
    },
  }

  const game = games[gameId as keyof typeof games]

  if (!game) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Game not found</h1>
        <p className="mb-8">The game you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => router.push("/games")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Games
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={() => router.push("/games")} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold text-primary">{game.title}</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" /> Share
          </Button>
          <Button variant="outline" size="sm">
            <Trophy className="mr-2 h-4 w-4" /> Leaderboard
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6 overflow-hidden border-2 border-primary/20">
            <CardContent className="p-0">
              <div className="bg-primary/5 p-4 flex justify-between items-center border-b border-primary/10">
                <div className="flex items-center gap-4">
                  <div className="bg-white dark:bg-gray-800 px-3 py-1 rounded-md shadow-sm">
                    <span className="text-sm font-medium text-muted-foreground">Score</span>
                    <div className="text-xl font-bold text-primary">{score}</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 px-3 py-1 rounded-md shadow-sm">
                    <span className="text-sm font-medium text-muted-foreground">Time</span>
                    <div className="text-xl font-bold text-primary">{formatTime(time)}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {!isPlaying && !gameOver && (
                    <Button onClick={handleGameStart} className="bg-primary hover:bg-primary/90">
                      Start Game
                    </Button>
                  )}
                  {(isPlaying || gameOver) && (
                    <Button variant="outline" onClick={handleRestart}>
                      <RotateCcw className="mr-2 h-4 w-4" /> Restart
                    </Button>
                  )}
                </div>
              </div>
              <div className="p-6 min-h-[400px] flex items-center justify-center bg-white dark:bg-gray-900">
                {!isPlaying && !gameOver ? (
                  <div className="text-center max-w-md">
                    <h3 className="text-xl font-bold mb-2">{game.title}</h3>
                    <p className="text-muted-foreground mb-6">{game.description}</p>
                    <div className="bg-primary/5 p-4 rounded-lg mb-6 text-left">
                      <h4 className="font-semibold mb-2">How to Play:</h4>
                      <p className="text-sm text-muted-foreground">{game.instructions}</p>
                    </div>
                    <Button onClick={handleGameStart} size="lg" className="bg-primary hover:bg-primary/90">
                      Start Game
                    </Button>
                  </div>
                ) : (
                  <div className="w-full h-full">{game.component}</div>
                )}
              </div>
            </CardContent>
          </Card>

          {gameOver && (
            <Card className="mb-6 border-2 border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle>Game Over!</CardTitle>
                <CardDescription>Here's how you did</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
                    <div className="text-sm text-muted-foreground">Final Score</div>
                    <div className="text-2xl font-bold text-primary">{score}</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
                    <div className="text-sm text-muted-foreground">Time</div>
                    <div className="text-2xl font-bold text-primary">{formatTime(time)}</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
                    <div className="text-sm text-muted-foreground">Rank</div>
                    <div className="text-2xl font-bold text-amber-500">#42</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
                    <div className="text-sm text-muted-foreground">Personal Best</div>
                    <div className="text-2xl font-bold text-emerald-500">
                      {score > 0 ? "New Record!" : "Not Beaten"}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-3 justify-center">
                <Button onClick={handleRestart}>
                  <RotateCcw className="mr-2 h-4 w-4" /> Play Again
                </Button>
                <Button variant="outline">
                  <Save className="mr-2 h-4 w-4" /> Save Score
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>

        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Game Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">All-Time High Score</div>
                  <div className="text-xl font-bold">{game.highScore}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Average Completion Time</div>
                  <div className="text-xl font-bold">{game.averageTime}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Players Today</div>
                  <div className="text-xl font-bold">1,245</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Your Best Score</div>
                  <div className="text-xl font-bold">0</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Leaderboard</CardTitle>
              <CardDescription>Top players this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((rank) => (
                  <div key={rank} className="flex items-center justify-between p-2 rounded-lg hover:bg-primary/5">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                          rank === 1
                            ? "bg-amber-500 text-white"
                            : rank === 2
                              ? "bg-gray-300 text-gray-800"
                              : rank === 3
                                ? "bg-amber-700 text-white"
                                : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {rank}
                      </div>
                      <div>
                        <div className="font-medium">Player{rank * 123}</div>
                        <div className="text-xs text-muted-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" /> {formatTime(Math.floor(1800 / rank))}
                        </div>
                      </div>
                    </div>
                    <div className="font-bold">{Math.floor(10000 / rank)}</div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full">
                View Full Leaderboard
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Similar Games</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(games)
                  .filter(([id]) => id !== gameId)
                  .slice(0, 3)
                  .map(([id, game]) => (
                    <div
                      key={id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-primary/5 cursor-pointer"
                      onClick={() => router.push(`/games/${id}`)}
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <div className="text-2xl font-bold text-primary">{game.title.charAt(0)}</div>
                      </div>
                      <div>
                        <div className="font-medium">{game.title}</div>
                        <div className="text-xs text-muted-foreground flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          {Math.floor(Math.random() * 10000)} players
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

