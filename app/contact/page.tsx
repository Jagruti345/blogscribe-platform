'use client'
import { motion } from 'framer-motion'

const ContactPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12"
      >
        {/* Contact Info */}
        <div className="space-y-8 flex flex-col justify-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-black dark:to-white">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Have a question, feedback, or just want to say hi? We would love to hear from you. Drop us a message and we will get back to you as soon as possible.
          </p>
          
          <div className="space-y-6">
            <motion.div whileHover={{ x: 10 }} className="flex items-center gap-4 cursor-default">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xl">
                @
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100">Email</h3>
                <p className="text-gray-500 dark:text-gray-400">hello@blogscribe.com</p>
              </div>
            </motion.div>
            <motion.div whileHover={{ x: 10 }} className="flex items-center gap-4 cursor-default">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xl">
                📍
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100">Location</h3>
                <p className="text-gray-500 dark:text-gray-400">123 Creator Ave, SF, CA</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass p-8 md:p-10 rounded-3xl shadow-2xl shadow-blue-500/10"
        >
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
              <input 
                type="text" 
                id="name" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-black/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
              <input 
                type="email" 
                id="email" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-black/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Message</label>
              <textarea 
                id="message" 
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-black/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                placeholder="How can we help you?"
              ></textarea>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all transform hover:-translate-y-1 shadow-lg shadow-blue-500/30">
              Send Message
            </button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default ContactPage