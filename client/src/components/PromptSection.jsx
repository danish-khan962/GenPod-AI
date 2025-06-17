import React, { useState } from 'react'
import { RiMicAiFill } from "react-icons/ri";
import { BiSolidSend } from "react-icons/bi";
import MiniTitle from './MiniTitle';
import HostCards from './HostCards';
import { assets } from '../assets/assets';

const PromptSection = ({prompt, setPrompt}) => {

    const suggestions = ["AI in healthcare", "Web3", "Digital Nomads"];

    return (
        <section className='flex flex-col px-6 md:px-16 lg:px-36 py-4 gap-7' id='MainArea'>

            {/* PROMPT Section */}
            <div className=' w-full bg-gray_2/15 p-5 rounded-md'>
                <div className='flex gap-x-2 items-center justify-between'>
                    <input type="text" placeholder='Enter your podcast topic..' onChange={(e) => setPrompt(e.target.value)} className='bg-gray_1/10 placeholder:text-sm p-2 rounded-md outline-none w-full' value={prompt} />
                    <div className='flex gap-x-2'>
                        <RiMicAiFill className='h-5 w-5 text-primary fill-primary hover:cursor-pointer' />
                        <BiSolidSend className='h-5 w-5 text-primary fill-primary hover:cursor-pointer' />
                    </div>
                </div>

                <ul className='flex gap-3 mt-5'>
                    {suggestions.map((item, idx) => (
                        <li
                            key={idx}
                            className='text-xs bg-gray_1/10 px-[0.40rem] rounded-full hover:cursor-pointer'
                            onClick={() => setPrompt(item)}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </div>


            {/* HOST Section */}
            <div className=' w-[100%] bg-gray_2/15 p-5 rounded-md'>
                <MiniTitle text={"Choose Host Style"} />

                <div className='grid grid-cols-2 gap-3 mt-4'>
                    <HostCards image={assets.techExpert} hostType={"Tech Expert"} />
                    <HostCards image={assets.philospher} hostType={"Philospher"} />
                    <HostCards image={assets.comedian} hostType={"Comedian"} />
                    <HostCards image={assets.academic} hostType={"Academic"} />
                    <HostCards image={assets.entrepeneur} hostType={"Entrepeneur"} />
                    <HostCards image={assets.journalist} hostType={"Journalist"} />
                </div>
            </div>

        </section>
    )
}

export default PromptSection
