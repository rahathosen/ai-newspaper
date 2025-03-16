"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "Desktop", value: 58 },
  { name: "Mobile", value: 35 },
  { name: "Tablet", value: 7 },
]

const COLORS = ["hsl(var(--primary))", "hsl(var(--secondary))", "hsl(var(--muted))"]

export function DeviceStats() {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              borderColor: "hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
            itemStyle={{ color: "hsl(var(--foreground))" }}
            formatter={(value) => [`${value}%`, "Percentage"]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

