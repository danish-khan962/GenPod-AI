import React, { useEffect, useRef, useState } from 'react';
import MiniTitle from './MiniTitle';
import { FaPause, FaPlay } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import WaveSurfer from 'wavesurfer.js';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';

const PreviewSection = ({ transcript, setTranscript }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const navigate = useNavigate();
  const { getToken } = useAuth();

  // Initialize WaveSurfer when audioUrl changes
  useEffect(() => {
    if (audioUrl && waveformRef.current) {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }

      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#bbb",
        progressColor: "#4ade80",
        cursorColor: "#333",
        height: 80,
        responsive: true,
      });

      wavesurfer.current.load(audioUrl);
      wavesurfer.current.on("finish", () => setIsPlaying(false));
    }

    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
        wavesurfer.current = null;
      }
    };
  }, [audioUrl]);

  const togglePlayPause = () => {
    if (wavesurfer.current) {
      wavesurfer.current.playPause();
      setIsPlaying(prev => !prev);
    }
  };

  const handleGenerateEpisode = async () => {
    if (!transcript.trim()) {
      alert('Please paste a transcript before generating.');
      return;
    }

    try {
      setLoading(true);

      // Generate audio from ElevenLabs via backend
      const generateResponse = await axios.post('/api/episodes/generate', {
        transcript,
        voiceId: 'SAz9YHcvj6GT2YYXdXww', // Optional: make this dynamic later
      });

      const { audioUrl } = generateResponse.data;
      setAudioUrl(audioUrl);

      // Save to database
      const token = await getToken();
      await axios.post(
        '/api/episodes',
        { transcript, audioUrl },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.error('Error generating/saving episode:', error?.response?.data || error.message);
      alert('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='flex flex-col px-6 md:px-16 lg:px-36 py-4 gap-8'>
      {/* Transcript Input Section */}
      <div className='w-full bg-gray_2/15 p-5 rounded-md'>
        <MiniTitle text="Paste Transcript" />
        <textarea
          className='p-3 bg-backgroundColor_2/60 outline-none w-full resize-none rounded-md mt-3 text-sm'
          rows={8}
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="Paste your transcript here..."
        />
        <div className='flex justify-between items-center mt-4'>
          <p className='text-xs text-gray_2'>Transcript Length: {transcript.length} chars</p>
          <button
            className='text-sm bg-primary text-black px-3 py-2 rounded-md hover:bg-primary-dull transition-all disabled:opacity-60'
            onClick={handleGenerateEpisode}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Episode'}
          </button>
        </div>
      </div>

      {/* Audio Player Section */}
      {audioUrl && (
        <div className='w-full bg-gray_2/15 p-5 rounded-md'>
          <div className='flex justify-between items-center'>
            <MiniTitle text="Preview Playback" />
            {isPlaying ? (
              <FaPause onClick={togglePlayPause} className='cursor-pointer' />
            ) : (
              <FaPlay onClick={togglePlayPause} className='cursor-pointer' />
            )}
          </div>

          <div ref={waveformRef} className='mt-4 rounded-md overflow-hidden' />

          <textarea
            className='p-3 bg-backgroundColor_2/60 outline-none w-full resize-none rounded-md mt-3 text-sm'
            rows={3}
            value={transcript.slice(0, 150) + '...'}
            readOnly
          />

          <div className='flex justify-between text-xs text-gray_2 mt-2'>
            <span>0:00</span>
            <span>~{Math.ceil(transcript.split(' ').length / 2.5)} sec</span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className='mt-3'>
        <button
          className='font-semibold bg-primary px-8 py-2 rounded-md transition-all hover:bg-primary-dull text-black'
          onClick={() => {
            navigate("/library");
            window.scrollTo(0, 0);
          }}
        >
          View All Episodes <IoIosArrowForward className='inline-block ml-2 h-5 w-5' />
        </button>
      </div>
    </section>
  );
};

export default PreviewSection;
