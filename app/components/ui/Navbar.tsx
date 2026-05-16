'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

import AuthLinks from '../auth/AuthLinks'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
  return (
    <motion.div 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className='flex h-20 items-center justify-between sticky top-0 z-50 glass px-4 md:px-8 rounded-b-2xl mb-8'
    >
        <div className='hidden lg:flex gap-4'>
            <motion.div whileHover={{ scale: 1.1, rotate: 5 }}><Image src="/facebook.png" alt="facebook" width={24} height={24} className="cursor-pointer" /></motion.div>
            <motion.div whileHover={{ scale: 1.1, rotate: 5 }}><Image src="/instagram.png" alt="instagram" width={24} height={24} className="cursor-pointer" /></motion.div>
            <motion.div whileHover={{ scale: 1.1, rotate: 5 }}><Image src="/tiktok.png" alt="tiktok" width={24} height={24} className="cursor-pointer" /></motion.div>
            <motion.div whileHover={{ scale: 1.1, rotate: 5 }}><Image src="/youtube.png" alt="youtube" width={24} height={24} className="cursor-pointer" /></motion.div>
        </div>
        <Link href="/" className='flex items-center gap-3 text-left justify-start lg:text-center flex-1 lg:justify-center cursor-pointer hover:scale-105 transition-transform'>
            <Image src="/logo.png" alt="BlogScribe Logo" width={32} height={32} className="rounded-full shadow-md" />
            <span className='lg:text-3xl md:text-2xl text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent'>
              BlogScribe
            </span>
        </Link>
        <div className='flex flex-1 gap-6 text-sm lg:text-base items-center justify-end font-medium'>
            <ThemeToggle />
            <Link href="/" className='hidden md:flex lg:flex hover:text-blue-500 transition-colors duration-300'>Home</Link>
            <Link href="/contact" className='hidden md:flex lg:flex hover:text-blue-500 transition-colors duration-300'>Contact</Link>
            <Link href="/about" className='hidden md:flex lg:flex hover:text-blue-500 transition-colors duration-300'>About</Link>
            <AuthLinks />
        </div>
    </motion.div>
  )
}

export default Navbar