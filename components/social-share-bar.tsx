"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Twitter, Facebook, Linkedin, Mail, LinkIcon, Share2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface SocialShareBarProps {
  title: string;
  url?: string;
  description?: string;
  vertical?: boolean;
  className?: string;
}

export function SocialShareBar({
  title,
  url = typeof window !== "undefined" ? window.location.href : "",
  description = "",
  vertical = false,
  className,
}: SocialShareBarProps) {
  const [showMobileShare, setShowMobileShare] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shareLinks = [
    {
      name: "Twitter",
      icon: Twitter,
      color: "hover:bg-[#1DA1F2] hover:text-white",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    },
    {
      name: "Facebook",
      icon: Facebook,
      color: "hover:bg-[#4267B2] hover:text-white",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "hover:bg-[#0077B5] hover:text-white",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      name: "Email",
      icon: Mail,
      color: "hover:bg-gray-700 hover:text-white",
      url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${description}\n\n${url}`)}`,
    },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      setIsCopied(true);
      toast({
        title: "Link copied!",
        description: "The article link has been copied to your clipboard.",
        duration: 3000,
      });

      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    });
  };

  const handleShare = (e: React.MouseEvent, shareUrl: string) => {
    e.preventDefault();
    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  const handleMobileShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      setShowMobileShare(!showMobileShare);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed z-40 transition-all duration-300",
        vertical
          ? "left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2"
          : "left-0 right-0 bottom-0 p-2 bg-background/80 backdrop-blur-sm border-t",
        className
      )}
    >
      {/* Render buttons */}
    </div>
  );
}
