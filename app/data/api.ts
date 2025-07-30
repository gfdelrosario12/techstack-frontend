const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function fetchCertificationsAPI(
  domain: string,
  search: string,
  level: string,
  types: string,
  platforms: string
) {
  if (!domain || domain === "All") return []

  const params = new URLSearchParams({
    domain: domain.toLowerCase(),
    search: search || "",
    level: level || "All",
    types: types || "certifications",
    platforms: platforms || "",
  })

  const res = await fetch(`${API_URL}/certifications?${params.toString()}`) // ✅ Calls FastAPI
  const data = await res.json()

  if (!data.results) return []

  const unique = Object.values(
    data.results.reduce((acc: Record<string, any>, cert: any) => {
      if (!acc[cert.url]) acc[cert.url] = cert
      return acc
    }, {})
  )

  return unique
}
