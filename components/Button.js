'use client'

import { useState } from "react"
import { getUser } from "@/app/lib/actions/action"
import { useEffect } from "react"


export default function Button() {

    // create state
    const [users, setUsers] = useState([])

    // async function fetchUser() {
    //     const users = await getUser()
    //     setUsers(users)
    // }

    useEffect(function() {
        fetchUser()
    }, [])

    async function fetchUser() {
        const userData = await fetch('https://jsonplaceholder.typicode.com/users')
        const users = await userData.json()
        setUsers(users)
    }

    const [counter, setCounter] = useState(0)

    return (
        <>
            <button
                className='btn btn-primary'
                onClick={fetchUser}
            >
                Get users
            </button>
            <ul className="bg-blue-300">
                {users.map(user => {
                    return <li key={user.id}>{user.name}</li>
                })}
            </ul>
        </>
    )
}