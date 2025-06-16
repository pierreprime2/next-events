'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'

const Navbar = () => {
    const { status, data: session } = useSession()

    console.log("Status:", status)
    console.log("Session:", session)

    return (
        <div className='navbar bg-base-100 shadow-md'>
            <div className='navbar-start'>
                <Link href='/' className='btn btn-ghost text-xl'>
                    Next-Events
                </Link>
            </div>
            <div className='navbar-center'>
                Search bar here
            </div>
            <div className='navbar-end'>
                {status === 'authenticated' && session?.user && (
                    <div className='dropdown dropdown-end'>
                        <div
                            tabIndex={0}
                            role='button'
                            className='btn btn-ghost btn-circle avatar'
                        >
                            <div className='w-10 rounded-full'>
                                <Image
                                    alt='Profile Picture'
                                    src={session.user.image || '/default-user.png'}
                                    width={60}
                                    height={60}
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className='mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52'
                        >
                            <li><Link href='/profile'>Profile</Link></li>
                            <li>
                                <Link href='/events/create'>Create Event</Link>
                            </li>
                            <li>
                               <button onClick={() => signOut({ callbackUrl: '/login' })}>
                                    Sign out
                               </button>
                            </li>
                        </ul>
                    </div>
                )}
                <div className='flex-none'>
                    <ul className='menu menu-horizontal px-1'>
                        <li>
                            <Link href='/login'>Login</Link>
                        </li>
                        <li>
                            <Link href='/signup'>Sign up</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar
