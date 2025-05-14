"use client"

import { Link } from "react-router-dom"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface NavProps {
  isCollapsed: boolean
  links: {
    title: string
    icon: LucideIcon
    variant: "default" | "ghost"
    href: string
  }[]
}

export function Nav({ links, isCollapsed }: NavProps) {
  const currentPath = window.location.pathname

  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-data-[collapsed=true]:justify-center group-data-[collapsed=true]:px-2">
        {links.map((link, index) => {
          const isActive = currentPath === link.href
          return isCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  to={link.href}
                  className={cn(
                    buttonVariants({ variant: isActive ? "default" : "ghost", size: "icon" }),
                    "h-9 w-9",
                    isActive && "dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  <span className="sr-only">{link.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4 bg-gray-800 text-white">
                {link.title}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              key={index}
              to={link.href}
              className={cn(
                buttonVariants({ variant: isActive ? "default" : "ghost", size: "sm" }),
                isActive && "dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700",
                "justify-start text-white hover:text-white"
              )}
            >
              <link.icon className="mr-2 h-4 w-4" />
              {link.title}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}