"use client"

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "Jan 1", pageviews: 2400, visitors: 1600 },
  { name: "Jan 5", pageviews: 1398, visitors: 1210 },
  { name: "Jan 10", pageviews: 9800, visitors: 3908 },
  { name: "Jan 15", pageviews: 3908, visitors: 2000 },
  { name: "Jan 20", pageviews: 4800, visitors: 2400 },
  { name: "Jan 25", pageviews: 3800, visitors: 2210 },
  { name: "Jan 30", pageviews: 4300, visitors: 2290 },
  { name: "Feb 5", pageviews: 5300, visitors: 3400 },
  { name: "Feb 10", pageviews: 4890, visitors: 2980 },
  { name: "Feb 15", pageviews: 6800, visitors: 4200 },
  { name: "Feb 20", pageviews: 7200, visitors: 4800 },
  { name: "Feb 25", pageviews: 6500, visitors: 4100 },
  { name: "Mar 1", pageviews: 8200, visitors: 5300 },
  { name: "Mar 5", pageviews: 8100, visitors: 5200 },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey="name" className="text-xs" />
        <YAxis className="text-xs" />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            borderColor: "hsl(var(--border))",
            borderRadius: "var(--radius)",
          }}
          itemStyle={{ color: "hsl(var(--foreground))" }}
          labelStyle={{ color: "hsl(var(--foreground))" }}
        />
        <Line type="monotone" dataKey="pageviews" stroke="hsl(var(--primary))" strokeWidth={2} activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="visitors" stroke="hsl(var(--secondary))" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}

