"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Sample data for articles by division
const data = [
  { name: "Dhaka", articles: 245 },
  { name: "Chittagong", articles: 178 },
  { name: "Rajshahi", articles: 124 },
  { name: "Khulna", articles: 98 },
  { name: "Barisal", articles: 76 },
  { name: "Sylhet", articles: 85 },
  { name: "Rangpur", articles: 67 },
  { name: "Mymensingh", articles: 54 },
]

export function DivisionStats() {
  return (
    <div className="h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              borderColor: "hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
            itemStyle={{ color: "hsl(var(--foreground))" }}
            formatter={(value) => [`${value} articles`, "Count"]}
          />
          <Bar dataKey="articles" fill="hsl(var(--primary))" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

