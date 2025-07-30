"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, ChevronDown, Award, MapPin } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import type { Certification } from "../data/types"

const categoryColors: Record<string, string> = {
  Cloud: "bg-blue-100 text-blue-800 border-blue-200",
  AI: "bg-purple-100 text-purple-800 border-purple-200",
  Developer: "bg-green-100 text-green-800 border-green-200",
  Cybersecurity: "bg-red-100 text-red-800 border-red-200",
  Data: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Networking: "bg-cyan-100 text-cyan-800 border-cyan-200",
}

const categoryIcons: Record<string, string> = {
  Cloud: "☁️",
  AI: "🤖",
  Developer: "💻",
  Cybersecurity: "🔒",
  Data: "📊",
  Networking: "🌐",
}

interface OpportunityCardProps {
  opp: Certification
  isExpanded: boolean
  onToggleExpand: () => void
}

export default function OpportunityCard({ opp, isExpanded, onToggleExpand }: OpportunityCardProps) {
  return (
    <motion.div layout whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
      <Card
        className={`h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${
          isExpanded ? "ring-2 ring-purple-400 shadow-2xl" : ""
        }`}
      >
        <CardContent className="p-0">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-4 text-white">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h3 className="font-bold text-lg leading-tight mb-2 line-clamp-2">{opp.title}</h3>
                {opp.platform && (
                  <div className="flex items-center gap-2 text-purple-100 text-sm">
                    <MapPin className="w-3 h-3" />
                    <span>{opp.source}</span>
                    {opp.platform && <span>• {opp.platform}</span>}
                  </div>
                )}
              </div>
              {opp.url && (
                <a
                  href={opp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {opp.category_label && (
                <Badge
                  className={`${categoryColors[opp.category_label as keyof typeof categoryColors] || "bg-gray-100 text-gray-800"} font-medium`}
                >
                  <span className="mr-1">{categoryIcons[opp.category_label as keyof typeof categoryIcons]}</span>
                  {opp.category_label}
                </Badge>
              )}
              {opp.domain && (
                <Badge variant="secondary" className="font-medium">
                  <Award className="w-3 h-3 mr-1" />
                  {opp.domain}
                </Badge>
              )}
              {opp.search_query && (
                <Badge variant="outline" className="font-medium" title={`Query: ${opp.search_query}`}>
                  🔍 Query
                </Badge>
              )}
            </div>

            {/* Summary */}
            {opp.summary && <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{opp.summary}</p>}

            {/* Expand/Collapse Button */}
            <Button
              variant="ghost"
              onClick={onToggleExpand}
              className="w-full flex items-center justify-center gap-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 transition-colors"
            >
              {isExpanded ? "Hide Details" : "Show Details"}
              <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </Button>

            {/* Animated Details */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 border-t space-y-3">
                    {opp.description && (
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Description</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{opp.description}</p>
                      </div>
                    )}
                    {opp.expectations && (
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">What to Expect</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{opp.expectations}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
