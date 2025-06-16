import { createUploadthing } from 'uploadthing/next'

import { getServerSession } from 'next-auth'
import { authConfig } from '@/app/api/auth/[...nextauth]/authConfig'

const uploadBuilder = createUploadthing()

// check on server session and return user session
const auth = async () => {
    const session = await getServerSession(authConfig)
    return session
}

export const UTrouter = {
    imageUploader:uploadBuilder({ image: { maxFileSize: '4MB' }})
    // set permissions
    .middleware(async () => {
        // code runs on server before upload
        const session = await auth()

        if(!session)
            throw new Error('Unauthorized')

        return { userEmail: session.user?.email }
    })
    .onUploadComplete(async ({ metadata, file }) => {
        // runs on server after upload
        console.log('Upload complete for user:', metadata.userEmail)
        console.log('file url', file.url)
        return { uploadedBy: metadata.userEmail }
    })
}
