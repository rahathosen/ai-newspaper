"use client"

import { Badge } from "@/components/ui/badge"
import { BarChart, ResponsiveContainer, XAxis, YAxis, Bar, Tooltip, CartesianGrid } from "recharts"

const data = [
  {
    title: "Global Leaders Pledge Ambitious Climate Goals at Summit",
    views: 12453,
    category: "Politics",
  },
  {
    title: "Tech Giants Unveil New AI Ethics Guidelines",
    views: 8721,
    category: "Technology",
  },
  {
    title: "Championship Finals Set After Dramatic Semifinal Matches",
    views: 7865,
    category: "Sports",
  },
  {
    title: "Economic Forecast Shows Resilience Despite Challenges",
    views: 6542,
    category: "Business",
  },
  {
    title: "New Study Reveals Benefits of Mediterranean Diet",
    views: 5321,
    category: "Health",
  },
]

export function PopularArticles() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {data.map((article, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none line-clamp-1">{article.title}</p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {article.category}
                </Badge>
                <p className="text-xs text-muted-foreground">{article.views.toLocaleString()} views</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="h-[200px] mt-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 20, right: 20, top: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} className="stroke-muted" />
            <XAxis type="number" className="text-xs" />
            <YAxis type="category" dataKey="title" width={0} tick={false} className="text-xs" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                borderColor: "hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
              itemStyle={{ color: "hsl(var(--foreground))" }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
              formatter={(value, name, props) => {
                return [`${value.toLocaleString()} views`, props.payload.title]
              }}
              labelFormatter={() => ""}
            />
            <Bar dataKey="views" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

