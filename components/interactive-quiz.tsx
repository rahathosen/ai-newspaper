"use client"

import { useState, useEffect } from "react"
import { Check, X, ChevronRight, Award, RefreshCw, Clock, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface QuizQuestion {
  id: string
  question: string
  options: {
    id: string
    text: string
  }[]
  correctAnswer: string
  explanation?: string
}

interface InteractiveQuizProps {
  title: string
  description?: string
  questions: QuizQuestion[]
  timeLimit?: number // in seconds
  category?: string
  difficulty?: "easy" | "medium" | "hard"
  className?: string
}

export function InteractiveQuiz({
  title,
  description,
  questions,
  timeLimit,
  category,
  difficulty = "medium",
  className,
}: InteractiveQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(timeLimit || 0)
  const [isTimerRunning, setIsTimerRunning] = useState(!!timeLimit)

  const currentQuestion = questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === questions.length - 1

  // Timer logic
  useEffect(() => {
    if (!timeLimit || !isTimerRunning) return

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          if (!isAnswerSubmitted) {
            handleSubmitAnswer()
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLimit, isTimerRunning, isAnswerSubmitted])

  // Format time remaining
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  // Handle answer submission
  const handleSubmitAnswer = () => {
    if (!selectedAnswer && !isAnswerSubmitted) return

    setIsAnswerSubmitted(true)
    setIsTimerRunning(false)

    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1)
    }
  }

  // Move to next question
  const handleNextQuestion = () => {
    if (isLastQuestion) {
      setQuizCompleted(true)
      return
    }

    setCurrentQuestionIndex(currentQuestionIndex + 1)
    setSelectedAnswer(null)
    setIsAnswerSubmitted(false)
    setTimeRemaining(timeLimit || 0)
    setIsTimerRunning(!!timeLimit)
  }

  // Restart quiz
  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setIsAnswerSubmitted(false)
    setScore(0)
    setQuizCompleted(false)
    setTimeRemaining(timeLimit || 0)
    setIsTimerRunning(!!timeLimit)
  }

  // Get difficulty badge color
  const getDifficultyColor = () => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "hard":
        return "bg-red-500"
      default:
        return "bg-blue-500"
    }
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-medium">{title}</CardTitle>
            {description && <CardDescription className="mt-1">{description}</CardDescription>}
          </div>
          <div className="flex items-center gap-2">
            {category && <Badge variant="outline">{category}</Badge>}
            {difficulty && (
              <div className="flex items-center gap-1">
                <div className={`h-2 w-2 rounded-full ${getDifficultyColor()}`} />
                <span className="text-xs capitalize">{difficulty}</span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      {!quizCompleted ? (
        <>
          <CardContent>
            <div className="mb-4 flex items-center justify-between">
              <div className="text-sm">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
              {timeLimit && (
                <div className="flex items-center gap-1 text-sm">
                  <Clock className="h-4 w-4" />
                  <span>{formatTime(timeRemaining)}</span>
                </div>
              )}
            </div>

            <Progress value={(currentQuestionIndex / questions.length) * 100} className="h-1 mb-4" />

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>

              <RadioGroup
                value={selectedAnswer || ""}
                onValueChange={setSelectedAnswer}
                className="space-y-3"
                disabled={isAnswerSubmitted}
              >
                {currentQuestion.options.map((option) => (
                  <div
                    key={option.id}
                    className={cn(
                      "flex items-center space-x-2 rounded-md border p-3 transition-colors",
                      selectedAnswer === option.id && !isAnswerSubmitted && "border-primary bg-primary/5",
                      isAnswerSubmitted &&
                        option.id === currentQuestion.correctAnswer &&
                        "border-green-500 bg-green-500/10",
                      isAnswerSubmitted &&
                        selectedAnswer === option.id &&
                        option.id !== currentQuestion.correctAnswer &&
                        "border-red-500 bg-red-500/10",
                    )}
                  >
                    <RadioGroupItem value={option.id} id={option.id} />
                    <Label htmlFor={option.id} className="flex-1 cursor-pointer font-normal">
                      {option.text}
                    </Label>
                    {isAnswerSubmitted && option.id === currentQuestion.correctAnswer && (
                      <Check className="h-5 w-5 text-green-500" />
                    )}
                    {isAnswerSubmitted &&
                      selectedAnswer === option.id &&
                      option.id !== currentQuestion.correctAnswer && <X className="h-5 w-5 text-red-500" />}
                  </div>
                ))}
              </RadioGroup>
            </div>

            {isAnswerSubmitted && currentQuestion.explanation && (
              <div className="p-3 bg-muted rounded-md text-sm">
                <p className="font-medium mb-1">Explanation:</p>
                <p>{currentQuestion.explanation}</p>
              </div>
            )}
          </CardContent>

          <CardFooter className="border-t pt-3 flex justify-between">
            <div className="text-sm">
              Score: {score}/{currentQuestionIndex + (isAnswerSubmitted ? 1 : 0)}
            </div>

            {!isAnswerSubmitted ? (
              <Button onClick={handleSubmitAnswer} disabled={!selectedAnswer}>
                Submit Answer
              </Button>
            ) : (
              <Button onClick={handleNextQuestion}>
                {isLastQuestion ? "Finish Quiz" : "Next Question"}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            )}
          </CardFooter>
        </>
      ) : (
        <CardContent className="pt-0">
          <div className="py-6 text-center">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-4">
              <Award className="h-10 w-10 text-primary" />
            </div>

            <h3 className="text-2xl font-bold mb-2">Quiz Completed!</h3>
            <p className="text-muted-foreground mb-6">
              You scored {score} out of {questions.length} questions correctly.
            </p>

            <div className="mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Progress value={(score / questions.length) * 100} className="h-3 w-48" />
                <span className="font-bold">{Math.round((score / questions.length) * 100)}%</span>
              </div>

              <p className="text-sm text-muted-foreground">
                {score === questions.length && "Perfect score! Excellent job!"}
                {score >= questions.length * 0.8 && score < questions.length && "Great job! You know your stuff!"}
                {score >= questions.length * 0.6 && score < questions.length * 0.8 && "Good effort! Keep learning!"}
                {score < questions.length * 0.6 && "Keep practicing to improve your score!"}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button onClick={handleRestartQuiz} variant="outline" className="gap-1">
                <RefreshCw className="h-4 w-4" />
                <span>Try Again</span>
              </Button>
              <Button className="gap-1">
                <Share2 className="h-4 w-4" />
                <span>Share Results</span>
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}

