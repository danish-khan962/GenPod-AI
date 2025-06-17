import React, { useRef, useEffect } from 'react'
import {NavLink, useNavigate} from "react-router-dom"
import { assets } from '../assets/assets';
import gsap from "gsap"

const NotFound = () => {

  const navigate = useNavigate();
  const imageRef = useRef(null);

  useEffect(() => {
    gsap.to(imageRef.current, {
      y: -20,
      rotation: 5,
      duration: 2,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
    });
  }, []);

  return (
    <div className='max-w-[600px] w-[100%] text-center'>
      <div className='flex flex-col justify-center items-center'>
        <img src={assets.companion} alt="" className='h-56 w-auto' ref={imageRef}/>
      </div>

      <p className='font-Poppins text-gray_2 mt-10'>The page You're Looking for Can't be Found. It's Looks Like You're Trying to Access a Page That Either Has Been Deleted or Never Existed..</p>

      <div className='mt-5'>
        <button className='font-Montserrat font-semibold bg-primary px-8 py-2 text-black rounded-md hover:bg-primary-dull transition-all ease-in-out duration-300' onClick={()=> navigate("/")}>HOME PAGE</button>
      </div>
    </div>
  )
}

export default NotFound
