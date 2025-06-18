import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import PromptSection from '../components/PromptSection';
import EpisodeSettings from '../components/EpisodeSettings';
import PreviewSection from '../components/PreviewSection';
import TrendingTopics from '../components/TrendingTopics';
import {useUser} from "@clerk/clerk-react"

const Home = () => {
  const [prompt, setPrompt] = useState("");
  const [hosts, setHosts] = useState(null);
  const [length, setLength] = useState(null);
  const [transcript, setTranscript] = useState("");

  const {user} = useUser();

  return (
    <>
      <HeroSection />

      <div>
        <PromptSection
          prompt={prompt}
          setPrompt={setPrompt}
        />

        <EpisodeSettings
          hosts={hosts}
          setHosts={setHosts}
          length={length}
          setLength={setLength}
        />

        <PreviewSection
          prompt={prompt}
          hosts={hosts}
          length={length}
          transcript={transcript}
          setTranscript={setTranscript}
          user={user}
        />
      </div>

      <TrendingTopics setPrompt={setPrompt} />
    </>
  );
};

export default Home;
