'use client'

import { useState } from 'react'
import { createUser } from '@/lib/actions/user.action'
import toast, { Toaster } from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation'

export default function SignUpForm() {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            const user = await createUser({
                email: email,
                name: name,
                password: password
            })

            if (user) {
                const res = await signIn('credentials', {
                    email,
                    password,
                    redirect: false
                })

                if (res.status === 200) {
                    toast.success('Sign Up Successful')
                    router.push('/profile')
                }

                toast.success('Sign up successfully')
            }
        } catch (error) {
            if (error.message === 'EMAIL_ALREADY_EXISTS') {
                toast.error('Sign Up failed: this mail is already registered');
            } else {
                toast.error('Sign Up failed: ' + error.message);
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='space-y-2'>
                <label className='label' htmlFor='name'>
                    Name
                </label>
                <input
                    id='name'
                    className='input input-bordered w-full'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    type="text"
                    placeholder="James Weasley"
                    required
                />
            </div>
            <div className='space-y-2'>
                <label
                    className="label"
                    htmlFor="email"
                >
                    Email
                </label>
                <input
                    id="email"
                    className="input input-bordered w-full"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                    placeholder='Enter email address'
                    required
                />
            </div>
            <div className='space-y-2'>
                <label className='label' htmlFor="password">
                    Password
                </label>
                <input
                    id='password'
                    className='input input-bordered w-full'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    placeholder='Enter password'
                    required
                    minLength={6}
                />
            </div>
            <button className='btn btn-primary btn-block mt-4'>Sign up</button>
        </form>
    )
}


