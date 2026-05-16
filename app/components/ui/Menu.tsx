import Image from 'next/image'
import Link from 'next/link'

import MenuPosts from './ManuPosts'
import MenuCategories from './MenuCategories'

const Menu = () => {
  return (
    <div className='flex flex-2 flex-col mt-10 lg:mt-0'>
    <div className='flex flex-col mb-12'>
      <h2 className='w-full text-gray-500 dark:text-gray-400 text-sm font-semibold uppercase tracking-widest'>{"What's hot"}</h2>
      <h1 className='w-full mb-6 text-left font-extrabold text-2xl md:text-3xl lg:text-3xl tracking-tight'>Most Popular</h1>
      <MenuPosts withImage={false}/>
    </div>

    <div className='flex flex-col mb-12'>
      <h2 className='w-full text-gray-500 dark:text-gray-400 text-sm font-semibold uppercase tracking-widest'>Discover by topic</h2>
      <h1 className='w-full mb-6 text-left font-extrabold text-2xl md:text-3xl lg:text-3xl tracking-tight'>Categories</h1>
      <MenuCategories />
    </div>

    <div className='flex flex-col mb-12'>
      <h2 className='w-full text-gray-500 dark:text-gray-400 text-sm font-semibold uppercase tracking-widest'>Chosen by the editor</h2>
      <h1 className='w-full mb-6 text-left font-extrabold text-2xl md:text-3xl lg:text-3xl tracking-tight'>Editors Pick</h1>
      <MenuPosts withImage={true}/>
    </div>
    </div>
  )
}

export default Menu