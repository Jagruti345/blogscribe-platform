'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

const AboutPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-[var(--background)]">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full text-center space-y-12"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-600 to-black dark:to-white">
          Our Story
        </h1>
        
        <div className="relative w-full h-64 md:h-96 rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/20">
          <Image 
            src="/p1.jpeg" 
            alt="About us" 
            fill 
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-8">
            <p className="text-white text-xl md:text-2xl font-semibold tracking-wide">
              Empowering writers since 2026
            </p>
          </div>
        </div>

        <div className="text-left space-y-6 text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed">
          <motion.p 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <strong className="text-blue-600 dark:text-blue-400">BlogScribe</strong> was founded with a simple mission: to provide a beautiful, seamless, and deeply engaging platform for writers and thinkers to share their voices with the world.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We believe that technology should fade into the background, leaving only the pure essence of your words. Our design philosophy revolves around clean lines, rich typography, and fluid interactions.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-8 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-4">Join Our Community</h2>
          <p className="text-blue-700 dark:text-blue-300 mb-6">Start writing your own stories today and connect with thousands of like-minded individuals.</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-transform hover:scale-105 shadow-md shadow-blue-500/30">
            Get Started
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default AboutPage