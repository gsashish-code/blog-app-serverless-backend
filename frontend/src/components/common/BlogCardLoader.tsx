import React from 'react'
import { Skeleton } from '../core/Skeleton'

function BlogCardLoader() {
    return (
        <div className="flex flex-col gap-2 p-4 shadow-md w-full bg-white animate-pulse">
            <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="flex flex-col">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-16 mt-1" />
                </div>
            </div>
            <Skeleton className="h-6 w-3/4 mt-4" />
            <Skeleton className="h-4 w-full mt-2" />
            <Skeleton className="h-4 w-5/6 mt-2" />
        </div>
    )
}

export default BlogCardLoader