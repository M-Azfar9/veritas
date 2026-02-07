import { Skeleton } from "@/components/ui/skeleton"

export function RumorSkeleton() {
    return (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Skeleton className="h-4 w-24 rounded-full" />
                    <Skeleton className="h-4 w-16 rounded-full" />
                </div>
                <Skeleton className="h-4 w-12" />
            </div>

            <div className="space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
            </div>

            <div className="flex gap-2">
                <Skeleton className="h-20 w-32 rounded-lg" />
                <Skeleton className="h-20 w-32 rounded-lg" />
            </div>

            <div className="pt-4 flex items-center justify-between">
                <div className="flex gap-2">
                    <Skeleton className="h-10 w-24 rounded-full" />
                    <Skeleton className="h-10 w-24 rounded-full" />
                </div>
                <Skeleton className="h-10 w-32 rounded-full" />
            </div>
        </div>
    )
}
