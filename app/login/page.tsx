'use client'
import { signIn, useSession } from "next-auth/react"
import { motion } from "framer-motion"
import Image from "next/image"

const Login = () => {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-10 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/5 dark:bg-black/40 backdrop-blur-xl border border-gray-200 dark:border-gray-800 p-10 md:p-14 rounded-3xl shadow-2xl shadow-blue-500/10 flex flex-col items-center gap-10"
      >
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-300">
            Welcome Back
          </h1>
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 font-medium">
            Sign in to continue to BlogScribe
          </p>
        </div>

        <div className="w-full flex flex-col gap-4">
          <motion.button 
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-xl text-white font-bold cursor-pointer bg-gradient-to-r from-red-500 to-red-600 hover:shadow-lg hover:shadow-red-500/30 transition-all"
          >
            Sign in with Google
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-xl text-white font-bold cursor-pointer bg-gradient-to-r from-gray-800 to-black hover:shadow-lg hover:shadow-gray-800/30 transition-all border border-gray-700"
          >
            Sign in with Github
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-xl text-white font-bold cursor-pointer bg-gradient-to-r from-blue-600 to-blue-800 hover:shadow-lg hover:shadow-blue-600/30 transition-all"
          >
            Sign in with Facebook
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default Login