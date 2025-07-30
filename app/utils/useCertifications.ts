"use client"

import { useState } from "react"
import type { Certification } from "../data/types"

export function useCertifications() {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL

  const [certifications, setCertifications] = useState<Certification[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function fetchCertifications(
    domain: string,
    search: string,
    level: string,
    types: string[],
    platforms: string[]
  ) {
    if (!domain || domain === "All") {
      setCertifications([])
      return
    }

    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({
        domain: domain.toLowerCase(),
        search: search || "",
        level,
        types: types.join(","),
        platforms: platforms.join(","),
      })

      const res = await fetch(`${API_BASE}/certifications?${params.toString()}`)

      if (!res.ok) {
        throw new Error(`Failed to fetch certifications: ${res.statusText}`)
      }

      const data: Certification[] = await res.json()
      setCertifications(data)
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching certifications")
      setCertifications([])
    } finally {
      setLoading(false)
    }
  }

  return { certifications, loading, error, fetchCertifications }
}
