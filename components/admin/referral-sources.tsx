"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Direct", value: 35 },
  { name: "Search", value: 28 },
  { name: "Social", value: 22 },
  { name: "Email", value: 10 },
  { name: "Referral", value: 5 },
]

export function ReferralSources() {
  return (
    <div className="h-[300px]">
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
            formatter={(value) => [`${value}%`, "Percentage"]}
          />
          <Bar dataKey="value" fill="hsl(var(--primary))" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

