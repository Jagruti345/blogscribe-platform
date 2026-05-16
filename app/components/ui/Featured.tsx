'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const Featured = () => {
  return (
    <div className='mt-7 mb-16'>
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-4xl sm:text-5xl md:text-6xl mb-4 leading-tight font-light"
      >
        <b className='font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent'>Welcome to BlogScribe!</b>{" "}
        Where creativity meets technology.
      </motion.h1>
      <div className='mt-10 lg:mt-14 flex flex-col md:flex-row lg:flex-row gap-8 lg:gap-12 items-center'>
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='relative w-full h-64 md:h-80 lg:h-96 flex-1 overflow-hidden rounded-2xl shadow-2xl shadow-blue-500/20 group'
        > 
          <Image src="/hero-bg.png" alt="Featured" fill className='object-cover transition-transform duration-700 group-hover:scale-110'></Image>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className='flex flex-1 flex-col gap-5 text-center lg:text-left'
        >
          <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold leading-snug'>Discover stories that spark imagination and push boundaries.</h1>
          <p className='text-base sm:text-lg text-gray-500 dark:text-gray-400 font-medium'>
            Dive into a world of endless possibilities. From the latest in coding and fashion to deep-dives into culture and travel, BlogScribe is your premier destination for high-quality, thought-provoking articles. Join our community of passionate writers and curious readers.
          </p>
          <div className="flex justify-center md:justify-center lg:justify-start mt-2">
            <Link href="/about">
              <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-8 rounded-full font-bold hover:shadow-lg hover:shadow-blue-500/40 transition-all transform hover:-translate-y-1">
                Read More
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Featured