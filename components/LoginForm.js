'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

export default function LoginForm({ callbackUrl }) {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async event => {
        event.preventDefault()
        const res = await signIn('credentials', {
            email,
            password,
            redirect: false
        })

        if(res.status === 200) {
            toast.success('Login successful')
            router.push(callbackUrl ?? '/profile')
        } else {
            if(res.error === 'CredentialsSignin') {
                res.error = 'Wrong Password'
            }
            toast.error(`Login failed : ${res.error}`)
        }
    }

    return (
        <form onSubmit={handleSubmit} className='flex-1 space-y-6'>
            <div className='space-y-2'>
                <label className='label' htmlFor='email'>
                    Email
                </label>
                <input type="email" />
            </div>
        </form>
    )
}
