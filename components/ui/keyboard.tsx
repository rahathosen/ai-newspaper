"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { SkipBackIcon as Backspace, CornerDownLeft } from "lucide-react"

export type LetterState = "correct" | "present" | "absent" | "empty"

interface KeyboardProps {
  onKeyPress: (key: string) => void
  letterStates?: Record<string, LetterState>
}

export const KeyboardKey: React.FC<{
  value: string
  state?: LetterState
  onClick: (value: string) => void
  wide?: boolean
}> = ({ value, state = "empty", onClick, wide = false }) => {
  const getStateClass = () => {
    switch (state) {
      case "correct":
        return "bg-green-500 hover:bg-green-600 text-white border-none"
      case "present":
        return "bg-amber-500 hover:bg-amber-600 text-white border-none"
      case "absent":
        return "bg-gray-400 hover:bg-gray-500 text-white border-none dark:bg-gray-600 dark:hover:bg-gray-700"
      default:
        return "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
    }
  }

  return (
    <Button
      variant="outline"
      className={`${getStateClass()} font-medium p-0 h-12 ${wide ? "col-span-2" : ""}`}
      onClick={() => onClick(value)}
    >
      {value === "Backspace" ? (
        <Backspace className="h-5 w-5" />
      ) : value === "Enter" ? (
        <CornerDownLeft className="h-5 w-5" />
      ) : (
        value
      )}
    </Button>
  )
}

export const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress, letterStates = {} }) => {
  const rows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
  ]

  return (
    <div className="w-full">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1 mb-1 justify-center">
          {row.map((key) => (
            <KeyboardKey
              key={key}
              value={key}
              state={letterStates[key] || "empty"}
              onClick={onKeyPress}
              wide={key === "Enter" || key === "Backspace"}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

