"use client"

import { useState } from "react"
import type { Certification } from "../data/types"

export function useCertifications() {
  // ✅ Only use env var, no dynamic fallback
  const API_BASE = process.env.NEXT_PUBLIC_API_URL
  console.log("API_BASE env:", process.env.NEXT_PUBLIC_API_URL)
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const fetchCertifications = async (
    domain: string,
    search: string,
    level: string,
    types: string[],
    platforms: string[],
  ) => {
    setLoading(true)
    setError("")

    try {
      const params = new URLSearchParams()
      params.append("domain", domain)
      if (search) params.append("search", search)
      if (level) params.append("level", level)
      types.forEach((t) => params.append("types", t))
      platforms.forEach((p) => params.append("platforms", p))

      const response = await fetch(`${API_BASE}/certifications?${params.toString()}`)

      if (!response.ok) {
        throw new Error(`Failed to fetch certifications: ${response.status}`)
      }

      const data = await response.json()
      setCertifications(data.results || [])
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred")
      setCertifications([])
    } finally {
      setLoading(false)
    }
  }

  return { certifications, loading, error, fetchCertifications }
}
