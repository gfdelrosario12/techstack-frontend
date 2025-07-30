"use client"

import { useState } from "react"
import type { Certification } from "../data/types"

export function useCertifications() {
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
      params.append("level", level)
      types.forEach((t) => params.append("types", t))
      platforms.forEach((p) => params.append("platforms", p))

      const response = await fetch(`http://127.0.0.1:8000/certifications?${params.toString()}`)

      if (!response.ok) {
        throw new Error(`Failed to fetch opportunities: ${response.status}`)
      }

      const data = await response.json()

      if (data.results) {
        setCertifications(data.results)
      } else {
        setCertifications([])
      }
    } catch (err: any) {
      setError(err.message)
      setCertifications([])
    } finally {
      setLoading(false)
    }
  }

  return { certifications, loading, error, fetchCertifications }
}
