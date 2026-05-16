'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { use } from 'react'

const UserPage = ({ params }: { params: Promise<{ username: string }> }) => {
  const { username } = use(params)
  
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto bg-white/5 dark:bg-[#18181b]/50 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-2xl"
      >
        {/* Banner */}
        <div className="h-48 md:h-64 bg-gradient-to-r from-blue-600 via-purple-600 to-black w-full relative"></div>
        
        <div className="px-8 pb-12">
          {/* Avatar */}
          <div className="relative -mt-20 md:-mt-24 mb-6">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white dark:border-[#09090b] overflow-hidden bg-gray-200">
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-extrabold text-5xl">
                {username[0].toUpperCase()}
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white capitalize">
              {username.replace('-', ' ')}
            </h1>
            <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold tracking-wide">
              @{username}
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
              Passionate storyteller and tech enthusiast. Sharing my journey through code, design, and life. Always learning, always writing.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-gray-200 dark:border-gray-800 pt-8">
            <div className="text-center">
              <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white">42</h3>
              <p className="text-sm text-gray-500 uppercase tracking-widest font-semibold mt-1">Posts</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white">12K</h3>
              <p className="text-sm text-gray-500 uppercase tracking-widest font-semibold mt-1">Reads</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white">850</h3>
              <p className="text-sm text-gray-500 uppercase tracking-widest font-semibold mt-1">Followers</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default UserPage