
import React, { useState } from 'react'
import { Input } from '../core/Input'
import { Button } from '../core/Button'
import { Link, useNavigate } from 'react-router'
import { ROUTES } from '../../routes'
import { SignUp } from '@gsashish/medium-common'
import { makeRequest } from '../../lib/request'

function SignUpComponent() {
    const navigate = useNavigate()
    const [postInputs, setPostInputs] = useState<SignUp>({ name: "", username: "", password: "" })
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof SignUp) => {
        setPostInputs(prev => ({
            ...prev,
            [key]: e.target.value
        }))
    }
    const handleSubmit = async () => {
        const { error, data } = await makeRequest({
            url: "/user/signup",
            method: "post",
            payload: postInputs
        });
        if (error) {
            console.log(error)
        } else {
            const jwt = data?.jwt;
            localStorage.setItem("token", jwt)
            navigate(ROUTES.private.blog.view.absolute);
        }
    }
    return (
        <div className='flex items-center gap-6 justify-center flex-col  h-full w-full'>
            <div className='text-center w-'>
                <div className='text-4xl font-bold'>Create an account</div>
                <div className='text-base font-normal text-neutral-500'>
                    Already have an account?
                    <Link to={ROUTES.public.signin.absolute} className='underline ml-1'>Login</Link>
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                <Input label='Username' value={postInputs.name} onChange={(e) => {
                    handleInputChange(e, "name")
                }} placeholder='Enter your username' />
                <Input label='Email' value={postInputs.username} placeholder='m@example.com' onChange={(e) => handleInputChange(e, "username")} />
                <Input type='password' value={postInputs.password} label='Password' onChange={(e) => handleInputChange(e, "password")} />
                <Button onClick={handleSubmit}>Sign Up</Button>
            </div>
        </div>
    )
}

export default SignUpComponent