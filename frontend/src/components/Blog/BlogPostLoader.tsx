import React from 'react';
import { Skeleton } from '../core/Skeleton';

const BlogPostSkeleton = () => {
    return (
        <div className="p-8 flex-1 bg-white rounded-lg shadow-md space-y-6 animate-pulse">
            {/* Title */}
            <Skeleton className="h-10 w-2/3" />

            {/* Date */}
            <Skeleton className="h-4 w-1/4" />

            {/* Content */}
            <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-2/3" />
            </div>

            {/* Sidebar Author */}
            <div className="flex items-center space-x-4 pt-8 border-t mt-8">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-32" />
                </div>
            </div>
        </div>
    );
};

export default BlogPostSkeleton;
