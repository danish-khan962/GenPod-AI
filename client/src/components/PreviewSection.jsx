import React, { useState } from 'react'
import MiniTitle from './MiniTitle'
import { FaPause, FaPlay } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import {useNavigate} from "react-router-dom"

const PreviewSection = () => {

    const [togglePlayPause, setTogglePlayPause] = useState(false);
    

    const navigate = useNavigate();

    const toggleFunction = () => {
        setTogglePlayPause(!togglePlayPause);
    }

    return (
        <section className='flex flex-col px-6 md:px-16 lg:px-36 py-4 gap-8'>

            <div className='w-full bg-gray_2/15 p-5 rounded-md'>
                <MiniTitle text={"Preview Transcript"} />

                <textarea name="preview" id="previewTranscript" className='p-3 bg-backgroundColor_2/60 outline-none w-full resize-none rounded-md mt-3 text-sm' rows={8} ></textarea>

                <div className='flex flex-row justify-between items-center mt-4'>
                    <p className='text-xs text-gray_2'>Approx Time: 10:32</p>
                    <button className='text-sm bg-primary text-black px-3 py-2 rounded-md transition-all ease-in-out duration-300 hover:bg-primary-dull'>Generate Episode</button>
                </div>
            </div>

            <div className=' w-full bg-gray_2/15 p-5 rounded-md'>
                <div className='flex flex-row justify-between items-center'>
                    <MiniTitle text={"Preview Playback"} />
                    {togglePlayPause ? (
                        <FaPause onClick={toggleFunction} className='cursor-pointer' />
                    ) : (
                        <FaPlay onClick={toggleFunction} className='cursor-pointer' />
                    )}
                </div>

                <div className='mt-3'>
                    <textarea name="" id="" className='p-3 bg-backgroundColor_2/60 outline-none w-full resize-none rounded-md mt-3 text-sm ' rows={3} ></textarea>
                </div>

                <div className='flex flex-row justify-between items-center mt-2'>
                    <p className='text-xs text-gray_2'>0:00</p>
                    <p className='text-xs text-gray_2'>10:32</p>
                </div>

            </div>

            <div className='mt-3'>
                <button className='font-semibold bg-primary px-8 py-2 rounded-md transition-all ease-in-out duration-300 hover:bg-primary-dull cursor-pointer text-black' onClick={()=> {navigate("/library"); window.scrollTo(0,0)}}>View All Episodes <IoIosArrowForward className='h-5 w-5 inline-flex ml-2'/></button>
            </div>

        </section >
    )
}

export default PreviewSection
