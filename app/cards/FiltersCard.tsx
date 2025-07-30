"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Filter, Sparkles } from "lucide-react"

interface FiltersCardProps {
  categories: string[]
  levels: string[]
  certTypes: string[]
  platforms: string[]
  tempDomain: string
  tempLevel: string
  selectedCertTypes: string[]
  selectedPlatforms: string[]
  onDomainChange: (category: string, checked: boolean) => void
  onLevelChange: (level: string) => void
  onCertTypeChange: (type: string, checked: boolean) => void
  onPlatformChange: (platform: string, checked: boolean) => void
  onApply: () => void
}

const categoryIcons: Record<string, string> = {
  Cloud: "☁️",
  AI: "🤖",
  Developer: "💻",
  Cybersecurity: "🔒",
  Data: "📊",
  Networking: "🌐",
}

export default function FiltersCard({
  categories,
  levels,
  certTypes,
  platforms,
  tempDomain,
  tempLevel,
  selectedCertTypes,
  selectedPlatforms,
  onDomainChange,
  onLevelChange,
  onCertTypeChange,
  onPlatformChange,
  onApply,
}: FiltersCardProps) {
  return (
    <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-md">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-gray-800">
          <Filter className="w-5 h-5 text-purple-600" />
          Filter Opportunities
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Tech Domains */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-500" />
            Tech Domains
          </Label>
          <RadioGroup value={tempDomain} onValueChange={(value) => onDomainChange(value, true)}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <RadioGroupItem value={category} id={`domain-${category}`} className="text-purple-600" />
                  <Label
                    htmlFor={`domain-${category}`}
                    className="text-sm cursor-pointer flex items-center gap-2 hover:text-purple-600 transition-colors"
                  >
                    <span>{categoryIcons[category]}</span>
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        {/* Level */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-gray-700">Experience Level</Label>
          <RadioGroup value={tempLevel} onValueChange={onLevelChange}>
            <div className="flex flex-wrap gap-3">
              {levels.map((level) => (
                <div key={level} className="flex items-center space-x-2">
                  <RadioGroupItem value={level} id={`level-${level}`} className="text-purple-600" />
                  <Label
                    htmlFor={`level-${level}`}
                    className="text-sm cursor-pointer hover:text-purple-600 transition-colors"
                  >
                    {level}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        {/* Opportunity Types */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-gray-700">Opportunity Types</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {certTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`type-${type}`}
                  checked={selectedCertTypes.includes(type)}
                  onCheckedChange={(checked) => onCertTypeChange(type, checked as boolean)}
                  className="text-purple-600"
                />
                <Label
                  htmlFor={`type-${type}`}
                  className="text-sm cursor-pointer hover:text-purple-600 transition-colors"
                >
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Platforms */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-gray-700">Platforms</Label>
          <div className="flex flex-wrap gap-2">
            {platforms.map((platform) => (
              <Badge
                key={platform}
                variant={selectedPlatforms.includes(platform) ? "default" : "outline"}
                className={`cursor-pointer transition-all hover:scale-105 ${
                  selectedPlatforms.includes(platform)
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "hover:bg-purple-50 hover:border-purple-300"
                }`}
                onClick={() => onPlatformChange(platform, !selectedPlatforms.includes(platform))}
              >
                {platform}
              </Badge>
            ))}
          </div>
        </div>

        {/* Apply Button */}
        <div className="pt-4 border-t">
          <Button
            onClick={onApply}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
