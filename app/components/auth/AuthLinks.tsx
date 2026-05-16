'use client'
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';

const AuthLinks = () => {
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  }

  // Generate a safe username from the user's name or email
  const username = session?.user?.name 
    ? session.user.name.toLowerCase().replace(/\s+/g, '-') 
    : 'profile';

  return (
    <>
      <Link href="/write" className='hidden md:flex lg:flex hover:text-blue-500 transition-colors duration-300'>Write</Link>

      {status === "unauthenticated" ? (
        <Link href="/login" className='hidden md:flex lg:flex hover:text-blue-500 transition-colors duration-300'>Login</Link>
      ) : (
        <div className='hidden md:flex lg:flex items-center gap-4'>
          <span className='cursor-pointer hover:text-red-500 transition-colors duration-300' onClick={() => signOut()}>Logout</span>
          <Link href={`/user/${username}`}>
            <motion.div whileHover={{ scale: 1.1 }} className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500 hover:shadow-lg hover:shadow-blue-500/50 transition-all cursor-pointer">
              {session?.user?.image ? (
                <Image src={session.user.image} alt="Profile" width={40} height={40} className="object-cover w-full h-full" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                  {session?.user?.name?.[0]?.toUpperCase() || 'U'}
                </div>
              )}
            </motion.div>
          </Link>
        </div>
      )}

      {/* Mobile Menu Toggle */}
      <div className='w-6 h-5 flex flex-col items-center justify-between lg:hidden md:hidden cursor-pointer' onClick={() => setOpen(!open)}>
        <div className={`w-full h-[2px] transition-all bg-black dark:bg-white ${open ? 'rotate-45 translate-y-[9px]' : ''}`}></div>
        <div className={`w-full h-[2px] transition-all bg-black dark:bg-white ${open ? 'opacity-0' : ''}`}></div>
        <div className={`w-full h-[2px] transition-all bg-black dark:bg-white ${open ? '-rotate-45 -translate-y-[9px]' : ''}`}></div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className='absolute top-20 left-0 w-full bg-white/90 dark:bg-[#09090b]/95 backdrop-blur-xl shadow-2xl rounded-b-3xl p-8 flex flex-col items-center gap-6 text-lg font-bold border-b border-gray-200 dark:border-gray-800 z-50'
        >
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/about" onClick={() => setOpen(false)}>About</Link>
          <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
          <Link href="/write" onClick={() => setOpen(false)}>Write</Link>
          
          {status === "unauthenticated" ? (
            <Link href="/login" onClick={() => setOpen(false)} className="text-blue-500">Login</Link>
          ) : (
            <>
              <Link href={`/user/${username}`} onClick={() => setOpen(false)} className="flex items-center gap-2 text-blue-500">
                My Profile
              </Link>
              <span className='cursor-pointer text-red-500' onClick={() => { signOut(); setOpen(false); }}>Logout</span>
            </>
          )}
        </motion.div>
      )}
    </>
  )
}

export default AuthLinks