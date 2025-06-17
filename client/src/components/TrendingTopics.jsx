import React, { useState } from 'react'

const TrendingTopics = ({setPrompt}) => {

    const trendingTopics = ["Space Tech", "Quanutm Ethics", "Remote Work", "AI Ethics", "Future of Work", "Digital Privacy"];

    return (
        <div className='flex flex-col px-6 py-3 md:px-16 lg:px-36 mt-10 bg-backgroundColor_2'>
            <h2 className='font-semibold text-lg text-white'>Trending Topics</h2>

            <div className='flex flex-row flex-wrap gap-4 mt-4'>
                {trendingTopics.map((item, index) => (
                    <a href="#MainArea" key={index} className='text-sm bg-gray_2/10 px-3 py-1 rounded-full hover:cursor-pointer'onClick={() => setPrompt(item)}>
                        {item}
                    </a>
                ))}
            </div>
        </div>
    )
}

export default TrendingTopics
