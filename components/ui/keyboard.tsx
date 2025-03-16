"use client"

import { Button } from "@/components/ui/button"
import { SkipBackIcon as Backspace } from 'lucide-react'

type LetterState = "correct" | "present" | "absent" | "unused"

type KeyboardProps = {
  onKeyPress: (key: string) => void
  keyState?: Record<string, LetterState>
}

export function Keyboard({ onKeyPress, keyState = {} }: KeyboardProps) {
  const rows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
  ]

  const getKeyClass = (key: string) => {
    if (key === "ENTER" || key === "BACKSPACE") return ""

    const state = keyState[key] || "unused"
    switch (state) {
      case "correct":
        return "key-correct"
      case "present":
        return "key-present"
      case "absent":
        return "key-absent"
      default:
        return "key-unused"
    }
  }

  return (
    <div className="w-full">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key) => (
            <Button
              key={key}
              onClick={() => onKeyPress(key)}
              className={`keyboard-key ${getKeyClass(key)} ${
                key === "ENTER" || key === "BACKSPACE" ? "key-action" : "key-letter"
              }`}
            >
              {key === "BACKSPACE" ? <Backspace className="h-4 w-4" /> : key}
            </Button>
          ))}
        </div>
      ))}
    </div>
  )
}
