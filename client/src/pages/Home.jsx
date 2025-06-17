import React, { useState } from 'react'
import HeroSection from '../components/HeroSection'
import PromptSection from '../components/PromptSection'
import EpisodeSettings from '../components/EpisodeSettings'
import PreviewSection from '../components/PreviewSection'
import TrendingTopics from '../components/TrendingTopics'

const Home = () => {

  const [prompt, setPrompt] = useState(""); 

  return (
    <>
      <HeroSection />

      <div className=''>
        <PromptSection prompt={prompt} setPrompt={setPrompt}/>
        <EpisodeSettings />
        <PreviewSection />
      </div>

      <TrendingTopics setPrompt={setPrompt} />
    </>
  )
}

export default Home
