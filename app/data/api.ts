import type { Certification } from "../data/types"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function fetchCertificationsAPI(
  domain: string,
  search: string,
  level: string,
  types: string,
  platforms: string
): Promise<Certification[]> {
  if (!domain || domain === "All") return []

  const params = new URLSearchParams({
    domain: domain.toLowerCase(),
    search: search || "",
    level: level || "All",
    types: types || "certifications",
    platforms: platforms || "",
  })

  console.log("API_BASE env:", API_URL)

  const res = await fetch(`${API_URL}/certifications?${params.toString()}`)
  const data: { results?: Certification[] } = await res.json()

  if (!data.results) return []

  // ✅ Remove all `any` by using Certification
  const unique = Object.values(
    data.results.reduce<Record<string, Certification>>((acc, cert) => {
      if (!acc[cert.url]) acc[cert.url] = cert
      return acc
    }, {})
  )

  return unique
}
