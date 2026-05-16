import Image from 'next/image'
import Link from 'next/link'


const Footer = () => {
  return (
    <footer className='mt-12 py-10 flex flex-col md:flex-row lg:flex-row justify-between text-gray-500 dark:text-gray-400 gap-10 border-t border-gray-200 dark:border-gray-800'>
      <div className='flex flex-1 flex-col gap-4'>
        <div className='flex items-center gap-3'>
          <Image src="/logo.png" alt="BlogScribe Logo" width={32} height={32} className="rounded-full shadow-md" />
          <h1 className='text-xl md:text-2xl font-extrabold text-black dark:text-white'>BlogScribe</h1>
        </div>
        <p className='text-sm md:text-base leading-relaxed'>
          BlogScribe is your premier destination for high-quality, thought-provoking articles. We blend creativity with technology to bring you stories that spark imagination and push boundaries.
        </p>
        <div className='flex mt-2 gap-4'>
          <Link href="https://facebook.com" target="_blank"><Image src="/facebook.png" alt="facebook" width={20} height={20} className="cursor-pointer hover:scale-125 hover:-translate-y-1 transition-all" /></Link>
          <Link href="https://instagram.com" target="_blank"><Image src="/instagram.png" alt="instagram" width={20} height={20} className="cursor-pointer hover:scale-125 hover:-translate-y-1 transition-all" /></Link>
          <Link href="https://tiktok.com" target="_blank"><Image src="/tiktok.png" alt="tiktok" width={20} height={20} className="cursor-pointer hover:scale-125 hover:-translate-y-1 transition-all" /></Link>
          <Link href="https://youtube.com" target="_blank"><Image src="/youtube.png" alt="youtube" width={20} height={20} className="cursor-pointer hover:scale-125 hover:-translate-y-1 transition-all" /></Link>
        </div>
      </div>
      <div className='flex flex-1 justify-between lg:justify-evenly w-full text-sm sm:text-base'>
        <div className='flex flex-col gap-3'>
          <span className='font-bold text-black dark:text-white uppercase tracking-wider mb-1'>Links</span>
          <Link href="/" className="hover:text-blue-500 transition-colors">HomePage</Link>
          <Link href="/blog" className="hover:text-blue-500 transition-colors">Blog</Link>
          <Link href="/about" className="hover:text-blue-500 transition-colors">About</Link>
          <Link href="/contact" className="hover:text-blue-500 transition-colors">Contact</Link>
        </div>
        <div className='flex flex-col gap-3'>
          <span className='font-bold text-black dark:text-white uppercase tracking-wider mb-1'>Tags</span>
          <Link href="/blog?cat=style" className="hover:text-blue-500 transition-colors">Style</Link>
          <Link href="/blog?cat=fashion" className="hover:text-blue-500 transition-colors">Fashion</Link>
          <Link href="/blog?cat=coding" className="hover:text-blue-500 transition-colors">Coding</Link>
          <Link href="/blog?cat=travel" className="hover:text-blue-500 transition-colors">Travel</Link>
        </div>
        <div className='flex flex-col gap-3'>
          <span className='font-bold text-black dark:text-white uppercase tracking-wider mb-1'>Social</span>
          <Link href="https://facebook.com" target="_blank" className="hover:text-blue-500 transition-colors">Facebook</Link>
          <Link href="https://instagram.com" target="_blank" className="hover:text-blue-500 transition-colors">Instagram</Link>
          <Link href="https://tiktok.com" target="_blank" className="hover:text-blue-500 transition-colors">Tiktok</Link>
          <Link href="https://youtube.com" target="_blank" className="hover:text-blue-500 transition-colors">Youtube</Link>
        </div>
      </div>

    </footer>
  )
}

export default Footer