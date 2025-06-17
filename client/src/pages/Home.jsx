import React, { useState } from 'react'
import HeroSection from '../components/HeroSection'
import PromptSection from '../components/PromptSection'
import EpisodeSettings from '../components/EpisodeSettings'
import PreviewSection from '../components/PreviewSection'
import TrendingTopics from '../components/TrendingTopics'

const Home = () => {

  const [prompt, setPrompt] = useState(""); 
  const [hosts, setHosts] = useState(null);
  const [length, setLength] = useState(null);

  return (
    <>
      <HeroSection />

      <div className=''>
        <PromptSection prompt={prompt} setPrompt={setPrompt}/>
        <EpisodeSettings hosts={hosts} setHosts={setHosts} length={length} setLength={setLength}/>
        <PreviewSection />
      </div>

      <TrendingTopics setPrompt={setPrompt} />
    </>
  )
}

export default Home
