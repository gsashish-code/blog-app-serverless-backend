import React, { useEffect, useState } from 'react'
import { BlogCard } from '../common/BlogCard'
import { makeRequest } from '../../lib/request';
import { BlogPost } from '../../common/contants';
import { dateToString } from '../../common/utils';
import BlogCardLoader from '../common/BlogCardLoader';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../routes';

function AllBlogsComponent() {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    const getAPi = async () => {
        setIsLoading(true)
        const { error } = await makeRequest({
            url: "/blog/bulk",
            method: "get",
            onSuccess(data) {
                console.log(data)
                setBlogs(data?.blogs || [])
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
    return (
        <div className='flex-1'>
            {blogs.map(blog => <BlogCard
                key={blog.id}
                isLoading={false}
                title={blog.title}
                description={blog.content}
                author={blog.author.name}
                date={dateToString(blog.updatedAt)}
                handleClick={() => {
                    navigate(`${ROUTES.private.blog.view.absolute}/${blog.id}`)
                }}
            />)}
            {isLoading ? [...new Array(2)].map((i, index) => <BlogCardLoader key={`blog-card-loader${index}`} />) : null}
        </div>
    )
}

export default AllBlogsComponent