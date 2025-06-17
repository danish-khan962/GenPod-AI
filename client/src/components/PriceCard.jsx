import React from 'react'
import { assets } from '../assets/assets'
import { SiTicktick } from "react-icons/si";

const PriceCard = () => {

    const features = ["Unlimited AI-generated episodes", "All AI-host voice styles", "Flexible episodes length", "High-Quality MP3 downloads", "Access full library", "Episode preview player", "No credit or debit card needed"]

  return (
    <div className='flex flex-col max-w-[550px] w-[100%] bg-gray_2/10 p-5 gap-3 rounded-xl'>
      <div className='flex justify-between items-center'>
        <img src={assets.favicon} alt="" className='h-10 w-10'/>
        <p className='text-xs px-6 py-1 bg-black rounded-full text-gray_1'>Most Popular</p>
      </div>
      <p className='text-lg font-semibold mt-2'>Free Plan</p>
      <p className='text-[15px] text-gray_2'>Everything you need to start podcasting — completely free.</p>

      <button className='p-2 bg-yellow-400 text-black font-semibold cursor-not-allowed mt-2 rounded uppercase font-Montserrat'>Subscribed</button>

      

      <div className='flex flex-col gap-2 mt-3'>
        {features.map((item, index) => (
            <div key={index} className='flex items-center flex-row gap-x-4'>
            <SiTicktick  className='text-xs text-primary-dull w-3 h-3'/> 
            <p className='text-xs text-gray_2/65'>{item}</p>
        </div>
        ))}
      </div>
    </div>
  )
}

export default PriceCard
