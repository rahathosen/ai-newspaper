"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "Admins", value: 5 },
  { name: "Editors", value: 12 },
  { name: "Authors", value: 28 },
  { name: "Subscribers", value: 573219 },
]

// For display purposes, we'll use a modified version that doesn't include subscribers
// since they would make the chart unreadable
const displayData = [
  { name: "Admins", value: 5 },
  { name: "Editors", value: 12 },
  { name: "Authors", value: 28 },
]

const COLORS = ["hsl(var(--primary))", "hsl(var(--secondary))", "hsl(var(--muted))"]

export function UserRoleStats() {
  return (
    <div className="space-y-4">
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={displayData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {displayData.map((entry, index) => (
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
              formatter={(value) => [`${value} users`, "Count"]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="border rounded-md p-3">
          <div className="text-sm font-medium">Total Staff</div>
          <div className="text-2xl font-bold">{data[0].value + data[1].value + data[2].value}</div>
          <div className="text-xs text-muted-foreground">Admin, editors & authors</div>
        </div>

        <div className="border rounded-md p-3">
          <div className="text-sm font-medium">Subscribers</div>
          <div className="text-2xl font-bold">{data[3].value.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">+9.2% from last month</div>
        </div>
      </div>
    </div>
  )
}

