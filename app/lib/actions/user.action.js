'use server'

import { dbConnect } from "../dbConnect"
import User from "../models/user.model"
import bcrypt from 'bcrypt'

export async function createUser(user) {
    await dbConnect()

    const passwordHash = await bcrypt.hash(user.password, 10)

    const newUser = await User.create({
        ...user,
        password: passwordHash
    })

    return JSON.parse(JSON.stringify(newUser))
}

export async function getUserByEmail(userEmail) {
    await dbConnect()

    const user = await User.findOne({ email: userEmail })

    if(!user)
        throw new Error('User not found')

    return JSON.parse(JSON.stringify(user))
}