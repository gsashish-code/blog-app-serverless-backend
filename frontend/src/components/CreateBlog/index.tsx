import React, { useState } from 'react';
import { Button } from '../core/Button';
import { CreateBlog } from '@gsashish/medium-common';
import { makeRequest } from '../../lib/request';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../routes';

function CreateBlogsComponent() {
    const [postForm, setPostForm] = useState<CreateBlog>({ title: "", content: "" });
    const navigate = useNavigate();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof CreateBlog) => {
        setPostForm(prev => ({
            ...prev,
            [key]: e.target.value
        }))
    }
    const handleSubmit = async () => {
        const { error } = await makeRequest({
            url: "/blog",
            method: "post",
            payload: postForm,
            onSuccess(data) {
                setPostForm({ content: "", title: "" })
                navigate(ROUTES.private.blog.all.absolute)
            },
        })
        if (error) {
            console.log("error")
        }
    }
    return (
        <div className="flex flex-col flex-1 bg-white px-4">
            <div className="flex items-center gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Title"
                    value={postForm.title}
                    onChange={(e) => handleChange(e, "title")}
                    className="text-4xl font-bold text-gray-600 outline-none placeholder-gray-300 w-full"
                />
                <Button onClick={handleSubmit} className='max-w-32'>Publish</Button>
            </div>
            <textarea
                placeholder="Tell your story..."
                value={postForm.content}
                onChange={(e) => handleChange(e, "content")}
                className="flex-grow w-full mt-2 text-xl text-gray-500 placeholder-gray-300 outline-none resize-none min-h-[300px]"
            />
        </div>
    );
}

export default CreateBlogsComponent;
