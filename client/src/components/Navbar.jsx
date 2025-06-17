import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { UserButton, useClerk, useUser } from '@clerk/clerk-react'
import { FaSliders } from "react-icons/fa6";
import { MdOutlineClose } from "react-icons/md";

const Navbar = () => {

  //dropdown menu
  const [isOpen, setIsOpen] = useState(false);

  //Clerk Authentication
  const { user } = useUser();
  const { openSignIn } = useClerk();


  return (
    <nav  className='flex w-full items-center justify-between px-6 py-5 md:px-16 lg:px-36'>
      <NavLink to={"/"} className="max-md:flex-1">
        <img src={assets.logo} alt="" className='h-8 w-auto' />
      </NavLink>

      <div className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-lg z-50 flex flex-col md:flex-row items-center max-md:justify-center gap-8 md:px-8 py-3 max-md:h-screen md:rounded-full backdrop-blur overflow-hidden transition-[width] duration-300 ${isOpen ? 'max-md:w-full' : 'max-md:w-0'}`}>

        <MdOutlineClose className='md:hidden absolute top-6 right-6 cursor-pointer w-6 h-6' onClick={()=>{setIsOpen(!isOpen)}}/>

        <NavLink to={"/"} className="text-gray_2" onClick={()=> {setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' })}}>Home</NavLink>
        <NavLink to={"/library"} className="text-gray_2" onClick={()=> {setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' })}}>Library</NavLink>
        <NavLink to={"/pricing"} className="text-gray_2" onClick={()=> {setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' })}}>Pricing</NavLink>
        <NavLink to={"/help"} className="text-gray_2" onClick={()=> {setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' })}}>Help</NavLink>
      </div>

      <div className='flex flex-row items-center'>
        {!user ? (<button onClick={openSignIn} className='bg-primary text-black py-2 px-8 rounded-full font-semibold hover:bg-primary-dull transition-all duration-300 ease-in-out cursor-pointer'>Login</button>)

          :


          (<UserButton/>)}

          <FaSliders className='max-md:ml-4 md:hidden w-6 h-6 cursor-pointer' onClick={()=> setIsOpen(!isOpen)}/>
      </div>

    </nav>
  )
}

export default Navbar
