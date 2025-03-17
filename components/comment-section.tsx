"use client"

import type React from "react"

import { useState } from "react"
import { MessageSquare, ThumbsUp, ThumbsDown, Reply, MoreHorizontal, Flag, Trash2, Edit, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Advertisement } from "@/components/advertisement"

interface Comment {
  id: number
  author: {
    name: string
    avatar?: string
    isVerified?: boolean
    isAuthor?: boolean
  }
  content: string
  timestamp: string
  likes: number
  dislikes: number
  replies?: Comment[]
  isLiked?: boolean
  isDisliked?: boolean
}

export function CommentSection() {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40&text=SJ",
        isVerified: true,
        isAuthor: true,
      },
      content:
        "This is a fascinating article. I particularly appreciated the in-depth analysis of how climate policy is affecting global markets. Looking forward to the follow-up piece mentioned at the end.",
      timestamp: "2 hours ago",
      likes: 24,
      dislikes: 2,
      isLiked: true,
      replies: [
        {
          id: 4,
          author: {
            name: "Michael Chen",
            avatar: "/placeholder.svg?height=40&width=40&text=MC",
          },
          content:
            "I agree with your assessment. The correlation between policy changes and market reactions was particularly well-documented.",
          timestamp: "1 hour ago",
          likes: 8,
          dislikes: 0,
        },
      ],
    },
    {
      id: 2,
      author: {
        name: "Robert Williams",
        avatar: "/placeholder.svg?height=40&width=40&text=RW",
        isVerified: true,
      },
      content:
        "While I appreciate the thoroughness of this report, I think it overlooks some key factors in the Asian markets that could significantly impact the global outlook. Would love to see more coverage on that aspect.",
      timestamp: "3 hours ago",
      likes: 15,
      dislikes: 3,
    },
    {
      id: 3,
      author: {
        name: "Emma Thompson",
        avatar: "/placeholder.svg?height=40&width=40&text=ET",
      },
      content:
        "Great reporting as always. The Daily Summary continues to provide the most comprehensive coverage of these complex issues.",
      timestamp: "5 hours ago",
      likes: 19,
      dislikes: 1,
    },
  ])

  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyContent, setReplyContent] = useState("")
  const [activeTab, setActiveTab] = useState("newest")
  const [isLoggedIn, setIsLoggedIn] = useState(true) // Mock login state

  const handleLike = (commentId: number, isReply = false, parentId?: number) => {
    if (isReply && parentId) {
      setComments(
        comments.map((comment) => {
          if (comment.id === parentId && comment.replies) {
            return {
              ...comment,
              replies: comment.replies.map((reply) => {
                if (reply.id === commentId) {
                  const wasLiked = reply.isLiked
                  return {
                    ...reply,
                    likes: wasLiked ? reply.likes - 1 : reply.likes + 1,
                    isLiked: !wasLiked,
                    isDisliked: false,
                  }
                }
                return reply
              }),
            }
          }
          return comment
        }),
      )
    } else {
      setComments(
        comments.map((comment) => {
          if (comment.id === commentId) {
            const wasLiked = comment.isLiked
            return {
              ...comment,
              likes: wasLiked ? comment.likes - 1 : comment.likes + 1,
              isLiked: !wasLiked,
              isDisliked: false,
            }
          }
          return comment
        }),
      )
    }
  }

  const handleDislike = (commentId: number, isReply = false, parentId?: number) => {
    if (isReply && parentId) {
      setComments(
        comments.map((comment) => {
          if (comment.id === parentId && comment.replies) {
            return {
              ...comment,
              replies: comment.replies.map((reply) => {
                if (reply.id === commentId) {
                  const wasDisliked = reply.isDisliked
                  return {
                    ...reply,
                    dislikes: wasDisliked ? reply.dislikes - 1 : reply.dislikes + 1,
                    isDisliked: !wasDisliked,
                    isLiked: false,
                  }
                }
                return reply
              }),
            }
          }
          return comment
        }),
      )
    } else {
      setComments(
        comments.map((comment) => {
          if (comment.id === commentId) {
            const wasDisliked = comment.isDisliked
            return {
              ...comment,
              dislikes: wasDisliked ? comment.dislikes - 1 : comment.dislikes + 1,
              isDisliked: !wasDisliked,
              isLiked: false,
            }
          }
          return comment
        }),
      )
    }
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const newCommentObj: Comment = {
      id: Math.max(...comments.map((c) => c.id)) + 1,
      author: {
        name: "You",
        avatar: "/placeholder.svg?height=40&width=40&text=You",
      },
      content: newComment,
      timestamp: "Just now",
      likes: 0,
      dislikes: 0,
    }

    setComments([newCommentObj, ...comments])
    setNewComment("")
  }

  const handleSubmitReply = (parentId: number) => {
    if (!replyContent.trim()) return

    setComments(
      comments.map((comment) => {
        if (comment.id === parentId) {
          const newReply: Comment = {
            id: Date.now(),
            author: {
              name: "You",
              avatar: "/placeholder.svg?height=40&width=40&text=You",
            },
            content: replyContent,
            timestamp: "Just now",
            likes: 0,
            dislikes: 0,
          }

          return {
            ...comment,
            replies: [...(comment.replies || []), newReply],
          }
        }
        return comment
      }),
    )

    setReplyingTo(null)
    setReplyContent("")
  }

  const sortedComments = [...comments].sort((a, b) => {
    if (activeTab === "newest") {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    } else if (activeTab === "top") {
      return b.likes - a.likes
    }
    return 0
  })

  return (
    <div className="bg-card border rounded-lg overflow-hidden">
      <div className="p-4 border-b flex items-center justify-between">
        <div>
          <h3 className="font-serif text-xl font-bold flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            <span>Comments ({comments.length})</span>
          </h3>
          <p className="text-sm text-muted-foreground mt-1">Join the conversation</p>
        </div>

        <Tabs defaultValue="newest" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="newest">Newest</TabsTrigger>
            <TabsTrigger value="top">Top</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="p-4 border-b">
        <form onSubmit={handleSubmitComment}>
          <div className="flex gap-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40&text=You" alt="Your avatar" />
              <AvatarFallback>You</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder={isLoggedIn ? "Add a comment..." : "Sign in to comment"}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                disabled={!isLoggedIn}
                className="resize-none mb-2"
              />
              <div className="flex justify-end">
                <Button type="submit" disabled={!isLoggedIn || !newComment.trim()}>
                  Post Comment
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="divide-y">
        {sortedComments.map((comment, index) => (
          <div key={comment.id} className="p-4">
            <div className="flex gap-3">
              <Avatar>
                <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{comment.author.name}</span>
                  {comment.author.isVerified && (
                    <Badge variant="outline" className="text-[10px] h-5 px-1 border-blue-500 text-blue-500">
                      Verified
                    </Badge>
                  )}
                  {comment.author.isAuthor && (
                    <Badge variant="outline" className="text-[10px] h-5 px-1 border-primary text-primary">
                      Author
                    </Badge>
                  )}
                  <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                </div>
                <p className="mt-1 text-sm">{comment.content}</p>
                <div className="flex items-center gap-4 mt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-7 px-2 ${comment.isLiked ? "text-primary" : ""}`}
                    onClick={() => handleLike(comment.id)}
                  >
                    <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                    <span>{comment.likes}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-7 px-2 ${comment.isDisliked ? "text-destructive" : ""}`}
                    onClick={() => handleDislike(comment.id)}
                  >
                    <ThumbsDown className="h-3.5 w-3.5 mr-1" />
                    <span>{comment.dislikes}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2"
                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                  >
                    <Reply className="h-3.5 w-3.5 mr-1" />
                    <span>Reply</span>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-7 px-2">
                        <MoreHorizontal className="h-3.5 w-3.5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="flex items-center">
                        <Flag className="h-4 w-4 mr-2" />
                        <span>Report</span>
                      </DropdownMenuItem>
                      {comment.author.name === "You" && (
                        <>
                          <DropdownMenuItem className="flex items-center">
                            <Edit className="h-4 w-4 mr-2" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {replyingTo === comment.id && (
                  <div className="mt-3 flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=40&width=40&text=You" alt="Your avatar" />
                      <AvatarFallback>You</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea
                        placeholder="Write a reply..."
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        className="resize-none text-sm min-h-[80px]"
                      />
                      <div className="flex justify-end gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setReplyingTo(null)
                            setReplyContent("")
                          }}
                        >
                          Cancel
                        </Button>
                        <Button size="sm" onClick={() => handleSubmitReply(comment.id)} disabled={!replyContent.trim()}>
                          <Send className="h-3.5 w-3.5 mr-1" />
                          <span>Reply</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-4 pl-4 border-l space-y-4">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={reply.author.avatar} alt={reply.author.name} />
                          <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{reply.author.name}</span>
                            {reply.author.isVerified && (
                              <Badge variant="outline" className="text-[10px] h-5 px-1 border-blue-500 text-blue-500">
                                Verified
                              </Badge>
                            )}
                            <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                          </div>
                          <p className="mt-1 text-sm">{reply.content}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`h-6 px-2 text-xs ${reply.isLiked ? "text-primary" : ""}`}
                              onClick={() => handleLike(reply.id, true, comment.id)}
                            >
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              <span>{reply.likes}</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`h-6 px-2 text-xs ${reply.isDisliked ? "text-destructive" : ""}`}
                              onClick={() => handleDislike(reply.id, true, comment.id)}
                            >
                              <ThumbsDown className="h-3 w-3 mr-1" />
                              <span>{reply.dislikes}</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Insert ad after the first comment */}
            {index === 0 && (
              <div className="mt-4">
                <Advertisement size="banner" className="mx-auto" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-4 border-t text-center">
        <Button variant="outline">Load More Comments</Button>
      </div>
    </div>
  )
}

