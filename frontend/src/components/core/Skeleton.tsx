import React from "react";
import { SkeletonProps } from "../../common/contants";



export const Skeleton = ({ className = "" }: SkeletonProps) => {
    return (
        <div
            className={`bg-gray-300 rounded-md animate-pulse ${className}`}
        ></div>
    );
};
