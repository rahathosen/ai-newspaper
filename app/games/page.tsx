"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Award,
  Users,
  Brain,
  Grid3X3,
  Calculator,
  ChevronRight,
  Star,
  Trophy,
  Bomb,
  Keyboard,
  AlignJustify,
} from "lucide-react"

export default function GamesPage() {
  const [activeTab, setActiveTab] = useState("all")

  const games = [
    {
      id: "2048",
      title: "2048",
      description: "Combine the numbers to reach 2048 in this addictive puzzle game.",
      category: "puzzle",
      icon: <Calculator className="h-6 w-6 text-amber-500" />,
      difficulty: "Medium",
      playCount: 12453,
      featured: true,
      new: false,
    },
    {
      id: "tic-tac-toe",
      title: "Tic-Tac-Toe",
      description: "The classic game of X's and O's. Challenge a friend or play against the computer.",
      category: "classic",
      icon: <Grid3X3 className="h-6 w-6 text-indigo-500" />,
      difficulty: "Easy",
      playCount: 8721,
      featured: false,
      new: false,
    },
    {
      id: "brain-puzzle",
      title: "Brain Teasers",
      description: "Test your cognitive skills with these challenging brain teasers and puzzles.",
      category: "puzzle",
      icon: <Brain className="h-6 w-6 text-emerald-500" />,
      difficulty: "Hard",
      playCount: 5632,
      featured: true,
      new: true,
    },
    {
      id: "word-scramble",
      title: "Word Scramble",
      description: "Unscramble the letters to form words. How many can you solve?",
      category: "word",
      icon: <AlignJustify className="h-6 w-6 text-blue-500" />,
      difficulty: "Medium",
      playCount: 7845,
      featured: false,
      new: true,
    },
    {
      id: "memory-match",
      title: "Memory Match",
      description: "Find matching pairs of cards in this classic memory game.",
      category: "memory",
      icon: <Users className="h-6 w-6 text-purple-500" />,
      difficulty: "Easy",
      playCount: 9321,
      featured: true,
      new: false,
    },
    {
      id: "sudoku",
      title: "Sudoku",
      description: "Fill the grid with numbers 1-9 so each row, column, and 3×3 section contains all digits.",
      category: "puzzle",
      icon: <Calculator className="h-6 w-6 text-red-500" />,
      difficulty: "Hard",
      playCount: 11245,
      featured: false,
      new: false,
    },
    {
      id: "wordle",
      title: "Wordle",
      description: "Guess the 5-letter word in six tries. Each guess must be a valid word.",
      category: "word",
      icon: <Keyboard className="h-6 w-6 text-green-500" />,
      difficulty: "Medium",
      playCount: 15782,
      featured: true,
      new: true,
    },
    {
      id: "hangman",
      title: "Hangman",
      description: "Guess the word one letter at a time before the hangman is complete.",
      category: "word",
      icon: <AlignJustify className="h-6 w-6 text-orange-500" />,
      difficulty: "Easy",
      playCount: 8932,
      featured: false,
      new: false,
    },
    {
      id: "snake",
      title: "Snake",
      description: "Control the snake to eat food and grow without hitting the walls or yourself.",
      category: "arcade",
      icon: <Users className="h-6 w-6 text-teal-500" />,
      difficulty: "Medium",
      playCount: 13567,
      featured: true,
      new: false,
    },
    {
      id: "minesweeper",
      title: "Minesweeper",
      description: "Clear the minefield without detonating any of the hidden mines.",
      category: "puzzle",
      icon: <Bomb className="h-6 w-6 text-gray-500" />,
      difficulty: "Hard",
      playCount: 10234,
      featured: false,
      new: true,
    },
  ]

  const filteredGames =
    activeTab === "all"
      ? games
      : activeTab === "featured"
        ? games.filter((game) => game.featured)
        : activeTab === "new"
          ? games.filter((game) => game.new)
          : games.filter((game) => game.category === activeTab)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2 text-primary">Games & Puzzles</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Take a break and challenge yourself with our collection of games and puzzles. Exercise your brain, have fun,
          and compete with others!
        </p>
      </div>

      <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
        <div className="flex justify-center mb-4">
          <TabsList className="grid grid-cols-3 md:grid-cols-7 gap-1">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="puzzle">Puzzles</TabsTrigger>
            <TabsTrigger value="word">Word</TabsTrigger>
            <TabsTrigger value="classic">Classic</TabsTrigger>
            <TabsTrigger value="arcade">Arcade</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={activeTab} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map((game) => (
              <Link href={`/games/${game.id}`} key={game.id}>
                <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50 cursor-pointer overflow-hidden group">
                  <CardHeader className="pb-2 relative">
                    <div className="absolute right-4 top-4 flex gap-2">
                      {game.featured && (
                        <Badge
                          variant="secondary"
                          className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100"
                        >
                          <Star className="h-3 w-3 mr-1" /> Featured
                        </Badge>
                      )}
                      {game.new && (
                        <Badge
                          variant="secondary"
                          className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100"
                        >
                          New
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-primary/10">{game.icon}</div>
                      <div>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                          {game.title}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {game.category.charAt(0).toUpperCase() + game.category.slice(1)}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-muted-foreground">{game.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <Award className="h-4 w-4 mr-1" />
                        <span>{game.difficulty}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{game.playCount.toLocaleString()}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary group-hover:translate-x-1 transition-transform"
                    >
                      Play <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 bg-primary/5 rounded-lg p-6 border border-primary/10">
        <div className="flex items-center gap-3 mb-4">
          <Trophy className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold text-primary">Leaderboards</h2>
        </div>
        <p className="text-muted-foreground mb-4">
          See how you stack up against other players. Our weekly leaderboards track the best scores across all games.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["2048", "Wordle", "Snake"].map((game) => (
            <Card key={game} className="bg-white dark:bg-gray-900">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{game}</CardTitle>
                <CardDescription>Top players this week</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[1, 2, 3].map((rank) => (
                    <li key={rank} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                            rank === 1
                              ? "bg-amber-500 text-white"
                              : rank === 2
                                ? "bg-gray-300 text-gray-800"
                                : "bg-amber-700 text-white"
                          }`}
                        >
                          {rank}
                        </span>
                        <span className="font-medium">Player{rank * 123}</span>
                      </div>
                      <span className="font-bold">{Math.floor(10000 / rank)}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="w-full text-primary">
                  View Full Leaderboard
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

