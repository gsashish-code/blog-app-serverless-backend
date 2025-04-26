import React, { useEffect, useState } from 'react'
import { BlogPost } from '../../common/contants';
import { makeRequest } from '../../lib/request';
import { dateToString } from '../../common/utils';
import { useParams } from 'react-router';
import BlogPostSkeleton from './BlogPostLoader';

function BlogComponent() {
    type SingleBlog = Pick<BlogPost, "id" | "title" | "content" | "author" | "createdAt">
    const [post, setPost] = useState<SingleBlog>({ id: "", title: "", content: "", author: { name: "" }, createdAt: "" });
    const [isLoading, setIsLoading] = useState(false);
    const params = useParams();
    const getAPi = async () => {
        setIsLoading(true)
        const { error } = await makeRequest({
            url: "/blog/" + params.id,
            method: "get",
            onSuccess(data) {
                console.log(data)
                setPost(data?.blog || {})
                setIsLoading(false)
            },
        })
        if (error) {
            console.log("error")
        }
    }
    useEffect(() => {
        getAPi();
    }, [])

    if (isLoading)
        return <BlogPostSkeleton />
    return (
        <div className="w-full bg-white flex-1 mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Main Content */}
                <div className="md:col-span-3">
                    <h1 className="text-5xl font-extrabold text-gray-900 mb-4">{post.title}</h1>
                    <p className="text-gray-500 mb-8">Posted on {dateToString(post.createdAt)}</p>
                    <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">{post.content}</p>
                </div>

                {/* Author Section */}
                <div className="md:col-span-1 flex flex-col items-start">
                    <span className="text-gray-400 text-sm mb-2">Author</span>
                    <div className="flex items-center gap-4">
                        <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center capitalize text-white font-bold">
                            {post.author.name.charAt(0)}
                        </div>
                        <div>
                            <h3 className="text-lg font-bold">{post.author.name}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogComponent




