import React from 'react'
import { assets } from '../assets/assets'

const HeroSection = () => {
  return (
    <section className='px-6 md:px-16 lg:px-36 py-12 mt-3 bg-backgroundColor_2'>
      
        <div className='flex flex-col gap-6 w-7/12 max-sm:w-[100%]'>
          <h1 className='text-4xl text-white font-bold lg:text-5xl leading-tight'>From Idea to Audio: Your AI-Powered Podcast Studio</h1>
          
          <p className='text-gray_1'>Create professional podcast episodes in minutes with Advanced AI Tech. Just input your topic and let the magic happen.</p>

          <a href="#MainArea">
            <button className='px-8 py-2 text-black bg-primary rounded-md font-medium hover:bg-primary-dull hover:rounded-lg transition-all duration-300 ease-in-out cursor-pointer'>Start Creating</button>
          </a>
        </div>

    </section>
  )
}

export default HeroSection
