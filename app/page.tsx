"use client"

import React, { useState, useEffect } from "react"
import { useCertifications } from "./utils/useCertifications"
import type { Certification } from "./data/types"
import { Award, Sparkles, TrendingUp, AlertCircle, ChevronDown } from "lucide-react"
import FiltersCard from "./cards/FiltersCard"
import OpportunityCard from "./cards/OpportunityCard"
import LoadingState from "./utils/loading"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

const categories = ["Cloud", "AI", "Developer", "Cybersecurity", "Data", "Networking"]
const levels = ["All", "Entry Level", "Associate", "Professional", "Expert"]
const certTypes = ["Certifications", "Vouchers", "Courses", "Events", "Internships", "Fellowships", "Others"]
const platforms = ["LinkedIn", "Facebook", "Reddit", "Medium", "Dev.to", "Devpost"]

export default function TechStack() {
  const [domain, setDomain] = useState("cloud")
  const [tempDomain, setTempDomain] = useState("Cloud")
  const [level, setLevel] = useState("All")
  const [tempLevel, setTempLevel] = useState("All")
  const [selectedCertTypes, setSelectedCertTypes] = useState<string[]>(["Certifications"])
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["LinkedIn", "Facebook"])
  const [expanded, setExpanded] = useState<string | null>(null)

  // 🔹 Scroll hint state
  const [showScrollHint, setShowScrollHint] = useState(false)

  const { certifications: opportunities, loading, error, fetchCertifications } = useCertifications()

  // === Filter Handlers ===
  const handleDomainChange = (category: string, checked: boolean) => {
    if (checked) setTempDomain(category)
  }

  const handleCertTypeChange = (type: string, checked: boolean) => {
    setSelectedCertTypes((prev) => (checked ? [...prev, type] : prev.filter((t) => t !== type)))
  }

  const handlePlatformChange = (platform: string, checked: boolean) => {
    setSelectedPlatforms((prev) => (checked ? [...prev, platform] : prev.filter((p) => p !== platform)))
  }

  const applyFilters = () => {
    const newDomain = tempDomain.toLowerCase()
    const newLevel = tempLevel
    setDomain(newDomain)
    setLevel(newLevel)
    fetchCertifications(newDomain, "", newLevel, selectedCertTypes, selectedPlatforms)

    // 🔹 Show arrow popup
    setShowScrollHint(true)
  }

  // 🔹 Auto-hide arrow after 5 seconds
  useEffect(() => {
    if (showScrollHint) {
      const timer = setTimeout(() => setShowScrollHint(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [showScrollHint])

  // 🔹 Hide arrow on scroll
  useEffect(() => {
    const handleScroll = () => setShowScrollHint(false)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=800')] opacity-10"></div>

        <div className="relative container mx-auto px-4 py-20 text-center">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Award className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-6xl font-bold text-white drop-shadow-lg">TechStack</h1>
            <Sparkles className="w-10 h-10 text-yellow-300 animate-pulse" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Discover certifications, vouchers, courses, events, and more to accelerate your tech career journey
          </motion.p>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <FiltersCard
              categories={categories}
              levels={levels}
              certTypes={certTypes}
              platforms={platforms}
              tempDomain={tempDomain}
              tempLevel={tempLevel}
              selectedCertTypes={selectedCertTypes}
              selectedPlatforms={selectedPlatforms}
              onDomainChange={handleDomainChange}
              onLevelChange={setTempLevel}
              onCertTypeChange={handleCertTypeChange}
              onPlatformChange={handlePlatformChange}
              onApply={applyFilters}
            />
          </motion.div>
        </div>
      </header>

      {/* 🔹 Arrow Popup */}
      <AnimatePresence>
        {showScrollHint && (
          <motion.div
            className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
          >
            <div className="bg-white/90 backdrop-blur-md shadow-lg px-4 py-2 rounded-full border border-purple-200 text-purple-600 font-medium mb-2">
              Scroll down to see results
            </div>
            <motion.button
              whileTap={{ rotate: 180 }}
              onClick={() => {
                const resultsSection = document.querySelector("#results-section")
                if (resultsSection) {
                  resultsSection.scrollIntoView({ behavior: "smooth" })
                }
                setShowScrollHint(false)
              }}
              className="p-2 rounded-full bg-white/80 backdrop-blur-md shadow hover:bg-purple-50"
            >
              <ChevronDown className="w-8 h-8 text-purple-600 animate-bounce" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <main id="results-section" className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 text-purple-600" />
            <h2 className="text-4xl font-bold text-gray-900">Opportunities</h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
              <span className="text-lg">Finding the best opportunities for you...</span>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center gap-2 text-red-600">
              <AlertCircle className="w-5 h-5" />
              <span className="text-lg font-medium">{error}</span>
            </div>
          ) : (
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-gray-700">
                {Array.isArray(opportunities) && opportunities.length > 0
                  ? `Found ${opportunities.length} ${opportunities.length > 1 ? "Opportunities" : "Opportunity"}`
                  : "No Results Found"}
              </h3>
              {Array.isArray(opportunities) && opportunities.length > 0 && (
                <p className="text-gray-500">
                  Showing results for <span className="font-semibold text-purple-600">{tempDomain}</span> •{" "}
                  <span className="font-semibold text-purple-600">{tempLevel}</span>
                </p>
              )}
            </div>
          )}
        </div>

        {/* Results Grid */}
        {loading ? (
          <LoadingState />
        ) : !loading && Array.isArray(opportunities) && opportunities.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          >
            {opportunities.map((opp: Certification, index) => {
              // ✅ Create unique key from URL or fallback to title-index
              const uniqueKey = opp.url || `${opp.title}-${index}`

              return (
                <motion.div
                  key={uniqueKey} // ✅ Unique key to fix warning
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <OpportunityCard
                    opp={opp}
                    isExpanded={expanded === uniqueKey}
                    onToggleExpand={() => setExpanded(expanded === uniqueKey ? null : uniqueKey)}
                  />
                </motion.div>
              )
            })}
          </motion.div>
        ) : (
          !loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <div className="max-w-md mx-auto">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No opportunities found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters to find more results.</p>
                <Button
                  onClick={applyFilters}
                  variant="outline"
                  className="border-purple-300 text-purple-600 hover:bg-purple-50 bg-transparent"
                >
                  Reset Filters
                </Button>
              </div>
            </motion.div>
          )
        )}
      </main>
    </div>
  )
}
