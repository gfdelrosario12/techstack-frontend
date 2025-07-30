import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingState() {
  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="border-0 shadow-lg">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-gray-200 to-gray-300 p-4">
              <Skeleton className="h-6 w-3/4 mb-2 bg-white/50" />
              <Skeleton className="h-4 w-1/2 bg-white/30" />
            </div>
            <div className="p-4 space-y-4">
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-20" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-8 w-full" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
