import React, { useState } from 'react'
import { Input } from '../core/Input';
import { Button } from '../core/Button';
import { Link, useNavigate } from 'react-router';
import { ROUTES } from '../../routes';
import { SignIn } from '@gsashish/medium-common';
import { makeRequest } from '../../lib/request';

function SignInComponent() {
    const navigate = useNavigate()
    const [postInputs, setPostInputs] = useState<SignIn>({ username: "", password: "" })
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof SignIn) => {
        setPostInputs(prev => ({
            ...prev,
            [key]: e.target.value
        }))
    }
    const handleSubmit = async () => {
        const { error, data } = await makeRequest({
            url: "/user/signin",
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
                <div className='text-4xl font-bold'>Log in</div>
                <div className='text-base font-normal text-neutral-500'>
                    Need to create an account?
                    <Link to={ROUTES.public.signup.absolute} className='underline ml-1'>Sign up</Link>
                </div>
            </div>
            <div className='flex flex-col gap-4'>

                <Input label='Email' value={postInputs.username} placeholder='m@example.com' onChange={(e) => handleInputChange(e, "username")} />
                <Input type='password' value={postInputs.password} label='Password' onChange={(e) => handleInputChange(e, "password")} />
                <Button onClick={handleSubmit}>Log In</Button>
            </div>
        </div>
    );
}

export default SignInComponent