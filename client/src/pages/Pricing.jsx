import React from 'react'
import PriceCard from '../components/PriceCard'

const Pricing = () => {
  return (
    <div className='px-6 md:px-16 lg:px-36 py-3 flex flex-col justify-center items-center mt-10'>

      <h1 className='font-Poppins text-4xl mb-14'>Plan & Pricing</h1>

      <PriceCard />
    </div>
  )
}

export default Pricing
