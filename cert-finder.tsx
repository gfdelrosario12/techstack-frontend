"use client"

import { useState } from "react"
import { Search, Filter, ExternalLink, Sparkles, Award, BookOpen } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock certification data
const certifications = [
  {
    id: 1,
    label: "Cloud",
    title: "AWS Certified Solutions Architect",
    url: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
    summary: "Validates expertise in designing distributed systems on AWS",
    description:
      "This certification validates your ability to design and deploy scalable, highly available, and fault-tolerant systems on AWS. It covers architectural best practices and cost optimization.",
    expectations:
      "2+ years of hands-on experience with AWS, understanding of core AWS services, networking concepts, and security best practices",
  },
  {
    id: 2,
    label: "Security",
    title: "Certified Information Systems Security Professional (CISSP)",
    url: "https://www.isc2.org/Certifications/CISSP",
    summary: "Advanced-level security certification for experienced professionals",
    description:
      "CISSP is an advanced-level certification for experienced security practitioners, managers and executives. It validates expertise across eight domains of cybersecurity.",
    expectations: "5+ years of cumulative paid work experience in two or more of the eight domains of the CISSP CBK",
  },
  {
    id: 3,
    label: "DevOps",
    title: "Docker Certified Associate",
    url: "https://training.mirantis.com/dca-certification-exam/",
    summary: "Validates skills in containerization and Docker technologies",
    description:
      "This certification validates your skills in Docker containerization, including image creation, container orchestration, networking, and security.",
    expectations:
      "6-12 months of experience with Docker in a professional environment, understanding of containerization concepts",
  },
  {
    id: 4,
    label: "Cloud",
    title: "Microsoft Azure Fundamentals",
    url: "https://docs.microsoft.com/en-us/learn/certifications/azure-fundamentals/",
    summary: "Entry-level certification covering Azure cloud concepts",
    description:
      "This certification validates foundational knowledge of cloud services and how those services are provided with Microsoft Azure.",
    expectations: "Basic understanding of cloud concepts, no prior Azure experience required",
  },
  {
    id: 5,
    label: "Data",
    title: "Google Cloud Professional Data Engineer",
    url: "https://cloud.google.com/certification/data-engineer",
    summary: "Validates ability to design and build data processing systems",
    description:
      "This certification validates your ability to design, build, operationalize, secure, and monitor data processing systems with a particular emphasis on security and compliance.",
    expectations:
      "3+ years of industry experience including 1+ years designing and managing solutions using Google Cloud",
  },
  {
    id: 6,
    label: "Project Management",
    title: "Project Management Professional (PMP)",
    url: "https://www.pmi.org/certifications/project-management-pmp",
    summary: "Globally recognized project management certification",
    description:
      "PMP certification validates your competence to perform in the role of a project manager, leading and directing projects and teams.",
    expectations:
      "4-year degree and 3 years of project management experience, or high school diploma and 5 years of project management experience",
  },
  {
    id: 7,
    label: "Networking",
    title: "Cisco Certified Network Associate (CCNA)",
    url: "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/ccna.html",
    summary: "Foundation-level networking certification from Cisco",
    description:
      "CCNA certification validates your ability to install, configure, operate, and troubleshoot medium-size routed and switched networks.",
    expectations:
      "1+ years of experience implementing and administering Cisco solutions, basic understanding of networking fundamentals",
  },
  {
    id: 8,
    label: "Development",
    title: "Oracle Certified Professional Java SE Developer",
    url: "https://education.oracle.com/oracle-certified-professional-java-se-11-developer/pexam_1Z0-819",
    summary: "Professional-level Java development certification",
    description:
      "This certification validates your expertise in Java SE development, including advanced language features, APIs, and best practices.",
    expectations:
      "Strong foundation in Java programming, experience with Java SE development, understanding of OOP concepts",
  },
]

const categories = ["All", "Cloud", "Security", "DevOps", "Data", "Project Management", "Networking", "Development"]
const levels = ["All", "Entry Level", "Associate", "Professional", "Expert"]

const categoryColors = {
  Cloud: "bg-blue-100 text-blue-800 border-blue-200",
  Security: "bg-red-100 text-red-800 border-red-200",
  DevOps: "bg-green-100 text-green-800 border-green-200",
  Data: "bg-purple-100 text-purple-800 border-purple-200",
  "Project Management": "bg-orange-100 text-orange-800 border-orange-200",
  Networking: "bg-cyan-100 text-cyan-800 border-cyan-200",
  Development: "bg-yellow-100 text-yellow-800 border-yellow-200",
}

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["All"])
  const [selectedLevel, setSelectedLevel] = useState("All")
  const [filteredCerts, setFilteredCerts] = useState(certifications)
  const [tempSearchTerm, setTempSearchTerm] = useState("")
  const [tempCategories, setTempCategories] = useState<string[]>(["All"])
  const [tempLevel, setTempLevel] = useState("All")

  const handleCategoryChange = (category: string, checked: boolean) => {
    let newCategories: string[]

    if (category === "All") {
      newCategories = checked ? ["All"] : []
    } else {
      if (checked) {
        newCategories = tempCategories.filter((cat) => cat !== "All").concat(category)
      } else {
        newCategories = tempCategories.filter((cat) => cat !== category)
        if (newCategories.length === 0) {
          newCategories = ["All"]
        }
      }
    }

    setTempCategories(newCategories)
  }

  const applyFilters = () => {
    setSearchTerm(tempSearchTerm)
    setSelectedCategories(tempCategories)
    setSelectedLevel(tempLevel)

    let filtered = certifications

    // Filter by search term
    if (tempSearchTerm) {
      filtered = filtered.filter(
        (cert) =>
          cert.title.toLowerCase().includes(tempSearchTerm.toLowerCase()) ||
          cert.summary.toLowerCase().includes(tempSearchTerm.toLowerCase()) ||
          cert.description.toLowerCase().includes(tempSearchTerm.toLowerCase()),
      )
    }

    // Filter by categories
    if (!tempCategories.includes("All")) {
      filtered = filtered.filter((cert) => tempCategories.includes(cert.label))
    }

    setFilteredCerts(filtered)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4 py-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white">CertFinder</h1>
            <Sparkles className="w-8 h-8 text-yellow-300" />
          </div>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover your next professional certification and accelerate your career journey
          </p>

          {/* Centered Search Section */}
          <div className="max-w-4xl mx-auto">
            <Card className="backdrop-blur-sm bg-white/95 shadow-2xl border-0">
              <CardContent className="p-8">
                {/* Search Input */}
                <div className="relative mb-6">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search certifications by title, summary, or description..."
                    value={tempSearchTerm}
                    onChange={(e) => setTempSearchTerm(e.target.value)}
                    className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-indigo-500 rounded-xl"
                  />
                </div>

                {/* Filters Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Categories */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <Filter className="w-4 h-4" />
                      Categories
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox
                            id={category}
                            checked={tempCategories.includes(category)}
                            onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                            className="data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                          />
                          <label htmlFor={category} className="text-sm font-medium text-gray-700 cursor-pointer">
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Level */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Certification Level
                    </label>
                    <Select value={tempLevel} onValueChange={setTempLevel}>
                      <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-indigo-500 rounded-xl">
                        <SelectValue placeholder="Select certification level" />
                      </SelectTrigger>
                      <SelectContent>
                        {levels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Search Button */}
                <Button
                  onClick={applyFilters}
                  className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Find Certifications
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </header>

      {/* Results Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {filteredCerts.length > 0
              ? `Found ${filteredCerts.length} Certification${filteredCerts.length !== 1 ? "s" : ""}`
              : "No Results Found"}
          </h2>
          {filteredCerts.length > 0 && <p className="text-gray-600">Click on any certification title to learn more</p>}
        </div>

        {filteredCerts.length === 0 ? (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No certifications found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search terms or filters to find more results.</p>
              <Button
                onClick={() => {
                  setTempSearchTerm("")
                  setTempCategories(["All"])
                  setTempLevel("All")
                  applyFilters()
                }}
                variant="outline"
                className="border-2"
              >
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {filteredCerts.map((cert) => (
              <Card
                key={cert.id}
                className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-indigo-500"
              >
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                    {/* Label */}
                    <div className="lg:col-span-2">
                      <Badge
                        className={`${categoryColors[cert.label as keyof typeof categoryColors] || "bg-gray-100 text-gray-800"} border font-medium px-3 py-1`}
                      >
                        {cert.label}
                      </Badge>
                    </div>

                    {/* Title */}
                    <div className="lg:col-span-3">
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-semibold text-indigo-600 hover:text-indigo-800 flex items-start gap-2 group transition-colors"
                      >
                        <span className="leading-tight">{cert.title}</span>
                        <ExternalLink className="w-4 h-4 mt-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                      </a>
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-2">
                      <p className="text-sm text-gray-600 leading-relaxed">{cert.summary}</p>
                    </div>

                    {/* Description */}
                    <div className="lg:col-span-3">
                      <p className="text-sm text-gray-800 leading-relaxed">{cert.description}</p>
                    </div>

                    {/* Expectations */}
                    <div className="lg:col-span-2">
                      <p className="text-sm text-gray-600 leading-relaxed">{cert.expectations}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
