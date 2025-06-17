import React, { useState } from 'react';
import MiniTitle from './MiniTitle';

const EpisodeSettings = ({hosts, setHosts, length, setLength}) => {

  return (
    <section className='flex flex-col px-6 md:px-16 lg:px-36 py-4'>

      <div className=' w-full bg-gray_2/15 p-5 rounded-md'>
        <MiniTitle text={"Episode Settings"} />

        {/* Number of Hosts */}
        <div className='flex justify-between items-center mt-3'>
          <p className='text-sm'>Number of Hosts</p>
          <div className='flex gap-x-2'>
            {[1, 2].map((num) => (
              <button
                key={num}
                className={`text-xs px-2 py-1 rounded-lg ${
                  hosts === num ? 'bg-primary text-black' : 'bg-gray_2/10'
                }`}
                onClick={() => setHosts(num)}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Episode Length */}
        <div className='mt-2'>
          <p className='text-sm'>Episode Length</p>
          <div className='flex flex-row gap-4 mt-2'>
            {['5min', '10min', '15+min'].map((len) => (
              <button
                key={len}
                className={`text-xs px-2 py-1 rounded-lg ${
                  length === len ? 'bg-primary text-black' : 'bg-gray_2/10'
                }`}
                onClick={() => setLength(len)}
              >
                {len}
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default EpisodeSettings;
