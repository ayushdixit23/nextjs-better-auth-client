import { Button } from '@/components/ui/button'
import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'

const SocialProviders = () => {
    return (
        <div className="mt-6 grid grid-cols-2 gap-4">
            <Button
                type="button"

                className="flex bg-blue-500 hover:bg-blue-400 text-white items-center justify-center gap-2"
            >
                <FcGoogle />
                Google
            </Button>
            <Button
                type="button"
                variant="outline"

                className="flex items-center justify-center gap-2"
            >
                <FaGithub />
                GitHub
            </Button>
        </div>
    )
}

export default SocialProviders