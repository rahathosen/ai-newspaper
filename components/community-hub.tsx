"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Users,
  MessageSquare,
  TrendingUp,
  Award,
  User,
  Bell,
  Settings,
  LogOut,
  PlusCircle,
  Search,
  Filter,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Advertisement } from "@/components/advertisement"
import { Vote } from "lucide-react"

export function CommunityHub() {
  const [activeTab, setActiveTab] = useState("discussions")

  return (
    <div className="bg-card border rounded-lg overflow-hidden">
      <div className="p-4 border-b flex items-center justify-between">
        <div>
          <h2 className="font-serif text-xl font-bold flex items-center gap-2">
            <Users className="h-5 w-5" />
            <span>Community Hub</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-1">Join the conversation with fellow readers</p>
        </div>

        <div className="flex items-center gap-2">
          <UserMenu />
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            <span>New Post</span>
          </Button>
        </div>
      </div>

      <div className="p-4 border-b bg-muted/50">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search discussions..." className="pl-9" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-1">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Filter By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Most Recent</DropdownMenuItem>
              <DropdownMenuItem>Most Popular</DropdownMenuItem>
              <DropdownMenuItem>Most Commented</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Categories</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Politics</DropdownMenuItem>
              <DropdownMenuItem>Technology</DropdownMenuItem>
              <DropdownMenuItem>Business</DropdownMenuItem>
              <DropdownMenuItem>Sports</DropdownMenuItem>
              <DropdownMenuItem>Health</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs defaultValue="discussions" value={activeTab} onValueChange={setActiveTab}>
        <div className="px-4 pt-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="discussions" className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>Discussions</span>
            </TabsTrigger>
            <TabsTrigger value="trending" className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              <span>Trending</span>
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="flex items-center gap-1">
              <Award className="h-4 w-4" />
              <span>Leaderboard</span>
            </TabsTrigger>
            <TabsTrigger value="my-activity" className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>My Activity</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="discussions" className="p-0 m-0">
          <ScrollArea className="h-[500px]">
            <div className="p-4 space-y-4">
              <DiscussionPost
                id="1"
                title="What do you think about the new climate policy announced yesterday?"
                author={{
                  name: "Sarah Johnson",
                  avatar: "/thumbnail.jpg?height=40&width=40&text=SJ",
                  badge: "Verified",
                }}
                category="Politics"
                timestamp="2 hours ago"
                commentCount={42}
                likeCount={128}
                excerpt="I found the policy to be ambitious but lacking in specific implementation details. What are your thoughts on the timeline and funding mechanisms proposed?"
              />

              <Advertisement size="banner" className="my-4" />

              <DiscussionPost
                id="2"
                title="Tech companies' new AI ethics guidelines - sufficient or just PR?"
                author={{
                  name: "Michael Chen",
                  avatar: "/thumbnail.jpg?height=40&width=40&text=MC",
                  badge: "Expert",
                }}
                category="Technology"
                timestamp="4 hours ago"
                commentCount={37}
                likeCount={95}
                excerpt="The new guidelines seem to address many concerns about bias and privacy, but I'm skeptical about enforcement. Do you think these self-imposed rules will lead to meaningful change?"
              />

              <DiscussionPost
                id="3"
                title="How will rising interest rates affect the housing market in your area?"
                author={{
                  name: "Jennifer Lee",
                  avatar: "/thumbnail.jpg?height=40&width=40&text=JL",
                }}
                category="Business"
                timestamp="Yesterday"
                commentCount={56}
                likeCount={87}
                excerpt="I've been tracking housing prices in several major cities, and the trends vary significantly. I'm curious to hear about local impacts from different regions."
              />

              <DiscussionPost
                id="4"
                title="Controversial call in last night's championship game - fair or foul?"
                author={{
                  name: "Marcus Johnson",
                  avatar: "/thumbnail.jpg?height=40&width=40&text=MJ",
                  badge: "Top Contributor",
                }}
                category="Sports"
                timestamp="Yesterday"
                commentCount={112}
                likeCount={203}
                excerpt="That final call completely changed the outcome of the game. After reviewing the footage multiple times, I still can't decide if the referee made the right decision."
              />

              <Advertisement size="banner" className="my-4" />

              <DiscussionPost
                id="5"
                title="New study on intermittent fasting - have you tried it?"
                author={{
                  name: "Dr. Emma Thompson",
                  avatar: "/thumbnail.jpg?height=40&width=40&text=ET",
                  badge: "Health Expert",
                }}
                category="Health"
                timestamp="2 days ago"
                commentCount={78}
                likeCount={156}
                excerpt="The recent research shows promising results for metabolic health, but I'm interested in hearing about real-world experiences from those who have tried different fasting protocols. What has worked for you?"
              />
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="trending" className="p-0 m-0">
          <ScrollArea className="h-[500px]">
            <div className="p-4 space-y-4">
              <TrendingTopic
                title="Supreme Court Ruling"
                postCount={156}
                activity="+43% today"
                categories={["Politics", "Law"]}
              />

              <TrendingTopic
                title="Market Volatility"
                postCount={124}
                activity="+27% today"
                categories={["Business", "Economy"]}
              />

              <TrendingTopic
                title="AI Image Generation"
                postCount={98}
                activity="+65% today"
                categories={["Technology", "Art"]}
                isHot={true}
              />

              <Advertisement size="banner" className="my-4" />

              <TrendingTopic title="Olympic Qualifiers" postCount={87} activity="+18% today" categories={["Sports"]} />

              <TrendingTopic
                title="Remote Work Debate"
                postCount={76}
                activity="+12% today"
                categories={["Business", "Lifestyle"]}
              />

              <TrendingTopic
                title="New Cancer Treatment"
                postCount={65}
                activity="+31% today"
                categories={["Health", "Science"]}
                isHot={true}
              />
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="leaderboard" className="p-0 m-0">
          <ScrollArea className="h-[500px]">
            <div className="p-4">
              <div className="mb-4">
                <h3 className="font-medium mb-2">Top Contributors This Month</h3>
                <div className="space-y-3">
                  {[
                    {
                      rank: 1,
                      name: "Sarah Johnson",
                      avatar: "/thumbnail.jpg?height=40&width=40&text=SJ",
                      points: 1250,
                      badge: "Expert",
                    },
                    {
                      rank: 2,
                      name: "Michael Chen",
                      avatar: "/thumbnail.jpg?height=40&width=40&text=MC",
                      points: 1120,
                      badge: "Verified",
                    },
                    {
                      rank: 3,
                      name: "Robert Williams",
                      avatar: "/thumbnail.jpg?height=40&width=40&text=RW",
                      points: 980,
                    },
                    {
                      rank: 4,
                      name: "Emma Thompson",
                      avatar: "/thumbnail.jpg?height=40&width=40&text=ET",
                      points: 875,
                      badge: "Health Expert",
                    },
                    {
                      rank: 5,
                      name: "David Rodriguez",
                      avatar: "/thumbnail.jpg?height=40&width=40&text=DR",
                      points: 820,
                    },
                  ].map((user) => (
                    <div key={user.rank} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold">
                          {user.rank}
                        </div>
                        <Avatar>
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium flex items-center gap-2">
                            {user.name}
                            {user.badge && (
                              <Badge variant="outline" className="text-[10px] h-5">
                                {user.badge}
                              </Badge>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">{user.points} points</div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Follow
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <Advertisement size="banner" className="my-4" />

              <div className="mt-6">
                <h3 className="font-medium mb-2">Your Ranking</h3>
                <div className="p-3 bg-primary/10 border border-primary/20 rounded-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold">
                        42
                      </div>
                      <Avatar>
                        <AvatarImage src="/thumbnail.jpg?height=40&width=40&text=You" alt="Your avatar" />
                        <AvatarFallback>You</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">You</div>
                        <div className="text-xs text-muted-foreground">320 points</div>
                      </div>
                    </div>
                    <div className="text-sm">
                      <div className="font-medium">Next Rank: 41</div>
                      <div className="text-xs text-muted-foreground">15 points to go</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-medium mb-2">Badges & Achievements</h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { name: "Conversation Starter", icon: "🗣️", description: "Started 5 discussions", achieved: true },
                    { name: "Helpful Commenter", icon: "👍", description: "Received 50 likes", achieved: true },
                    {
                      name: "Regular Contributor",
                      icon: "📝",
                      description: "Posted for 30 consecutive days",
                      achieved: false,
                    },
                    {
                      name: "Trending Topic",
                      icon: "🔥",
                      description: "Started a trending discussion",
                      achieved: false,
                    },
                    { name: "Expert Insight", icon: "🧠", description: "Recognized for expertise", achieved: false },
                    { name: "Community Builder", icon: "🏗️", description: "Invited 10 new members", achieved: false },
                  ].map((badge) => (
                    <Card
                      key={badge.name}
                      className={`border ${badge.achieved ? "border-primary/20" : "border-muted-foreground/20"}`}
                    >
                      <CardContent className="p-3 text-center">
                        <div className="text-3xl mb-2">{badge.icon}</div>
                        <div className="font-medium text-sm">{badge.name}</div>
                        <div className="text-xs text-muted-foreground mt-1">{badge.description}</div>
                        <Badge variant={badge.achieved ? "default" : "outline"} className="mt-2 text-[10px]">
                          {badge.achieved ? "Achieved" : "Locked"}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="my-activity" className="p-0 m-0">
          <ScrollArea className="h-[500px]">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Your Recent Activity</h3>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>

              <div className="space-y-4">
                <ActivityItem
                  type="comment"
                  content="I agree with your assessment. The correlation between policy changes and market reactions was particularly well-documented."
                  target="Global Leaders Pledge Ambitious Climate Goals at Summit"
                  timestamp="1 hour ago"
                  interactions={{ likes: 8, replies: 2 }}
                />

                <ActivityItem
                  type="post"
                  content="What do you think about the new streaming service announced yesterday? Worth the subscription fee?"
                  timestamp="Yesterday"
                  interactions={{ likes: 15, comments: 7 }}
                />

                <ActivityItem type="like" target="Tech Giants Unveil New AI Ethics Guidelines" timestamp="2 days ago" />

                <Advertisement size="banner" className="my-4" />

                <ActivityItem
                  type="comment"
                  content="The statistics in this article don't seem to match the official reports. I think there might be an error in the data interpretation."
                  target="Economic Forecast Shows Resilience Despite Challenges"
                  timestamp="3 days ago"
                  interactions={{ likes: 23, replies: 5 }}
                />

                <ActivityItem
                  type="poll"
                  content="Voted: 'Yes, but with stronger regulations'"
                  target="Should AI development be accelerated?"
                  timestamp="4 days ago"
                />
              </div>

              <div className="mt-6">
                <h3 className="font-medium mb-3">Your Saved Items</h3>
                <div className="space-y-3">
                  {[
                    {
                      title: "Global Leaders Pledge Ambitious Climate Goals at Summit",
                      category: "Politics",
                      date: "Mar 15, 2025",
                    },
                    {
                      title: "Tech Giants Unveil New AI Ethics Guidelines",
                      category: "Technology",
                      date: "Mar 14, 2025",
                    },
                    {
                      title: "New Study Reveals Benefits of Mediterranean Diet",
                      category: "Health",
                      date: "Mar 10, 2025",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                      <div>
                        <div className="font-medium">{item.title}</div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Badge variant="outline" className="text-[10px]">
                            {item.category}
                          </Badge>
                          <span>{item.date}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>

      <div className="p-4 border-t">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            <span>Community Guidelines</span>
            <span className="mx-2">•</span>
            <span>Privacy Policy</span>
            <span className="mx-2">•</span>
            <span>Terms of Use</span>
          </div>
          <Button variant="outline" size="sm">
            Report an Issue
          </Button>
        </div>
      </div>
    </div>
  )
}

function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/thumbnail.jpg?height=40&width=40&text=You" alt="Your avatar" />
            <AvatarFallback>You</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Your Name</p>
            <p className="text-xs leading-none text-muted-foreground">your.email@example.com</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Bell className="mr-2 h-4 w-4" />
          <span>Notifications</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

interface DiscussionPostProps {
  id: string
  title: string
  author: {
    name: string
    avatar?: string
    badge?: string
  }
  category: string
  timestamp: string
  commentCount: number
  likeCount: number
  excerpt: string
}

function DiscussionPost({
  id,
  title,
  author,
  category,
  timestamp,
  commentCount,
  likeCount,
  excerpt,
}: DiscussionPostProps) {
  return (
    <Card>
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={author.avatar} alt={author.name} />
              <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{author.name}</span>
                {author.badge && (
                  <Badge variant="outline" className="text-[10px] h-5">
                    {author.badge}
                  </Badge>
                )}
              </div>
              <div className="text-xs text-muted-foreground">{timestamp}</div>
            </div>
          </div>
          <Badge>{category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <Link href="#" className="hover:underline">
          <CardTitle className="text-lg font-medium mb-2">{title}</CardTitle>
        </Link>
        <CardDescription className="line-clamp-2">{excerpt}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm">
            <MessageSquare className="h-4 w-4" />
            <span>{commentCount}</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <TrendingUp className="h-4 w-4" />
            <span>{likeCount}</span>
          </div>
        </div>
        <Button variant="outline" size="sm">
          Join Discussion
        </Button>
      </CardFooter>
    </Card>
  )
}

interface TrendingTopicProps {
  title: string
  postCount: number
  activity: string
  categories: string[]
  isHot?: boolean
}

function TrendingTopic({ title, postCount, activity, categories, isHot }: TrendingTopicProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-lg font-medium">{title}</CardTitle>
              {isHot && (
                <Badge variant="destructive" className="text-[10px] h-5">
                  🔥 HOT
                </Badge>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {categories.map((category) => (
                <Badge key={category} variant="outline">
                  {category}
                </Badge>
              ))}
            </div>
          </div>
          <div className="text-right">
            <div className="font-medium">{postCount} posts</div>
            <div className="text-xs text-green-500">{activity}</div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <Avatar key={i} className="h-6 w-6 border-2 border-background">
                <AvatarImage src={`/thumbnail.jpg?height=30&width=30&text=${i}`} />
                <AvatarFallback>{i}</AvatarFallback>
              </Avatar>
            ))}
            <div className="flex items-center justify-center h-6 w-6 rounded-full bg-muted text-[10px] border-2 border-background">
              +{postCount > 4 ? postCount - 4 : 0}
            </div>
          </div>
          <Button size="sm">View Topic</Button>
        </div>
      </CardContent>
    </Card>
  )
}

interface ActivityItemProps {
  type: "comment" | "post" | "like" | "poll"
  content?: string
  target?: string
  timestamp: string
  interactions?: {
    likes?: number
    comments?: number
    replies?: number
  }
}

function ActivityItem({ type, content, target, timestamp, interactions }: ActivityItemProps) {
  return (
    <div className="p-3 bg-muted/50 rounded-md">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          {type === "comment" && <MessageSquare className="h-4 w-4" />}
          {type === "post" && <PlusCircle className="h-4 w-4" />}
          {type === "like" && <TrendingUp className="h-4 w-4" />}
          {type === "poll" && <Vote className="h-4 w-4" />}
        </div>
        <div className="flex-1">
          <div className="text-sm">
            {type === "comment" && <span>You commented on </span>}
            {type === "like" && <span>You liked </span>}
            {type === "poll" && <span>You participated in poll: </span>}
            {target && (
              <Link href="#" className="font-medium hover:underline">
                {target}
              </Link>
            )}
          </div>
          {content && <div className="mt-1 text-sm bg-muted p-2 rounded-md">{content}</div>}
          <div className="mt-2 flex items-center justify-between">
            <div className="text-xs text-muted-foreground">{timestamp}</div>
            {interactions && (
              <div className="flex items-center gap-3">
                {interactions.likes !== undefined && (
                  <div className="flex items-center gap-1 text-xs">
                    <TrendingUp className="h-3 w-3" />
                    <span>{interactions.likes}</span>
                  </div>
                )}
                {interactions.comments !== undefined && (
                  <div className="flex items-center gap-1 text-xs">
                    <MessageSquare className="h-3 w-3" />
                    <span>{interactions.comments}</span>
                  </div>
                )}
                {interactions.replies !== undefined && (
                  <div className="flex items-center gap-1 text-xs">
                    <MessageSquare className="h-3 w-3" />
                    <span>{interactions.replies}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

