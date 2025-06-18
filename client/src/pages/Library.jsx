import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { getUserEpisodes } from '../api/episodeApi'; 
import LibraryCard from '../components/LibraryCard';
import NotFound from '../components/NotFound';

const Library = () => {
  const { user } = useUser();
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const data = await getUserEpisodes(user?.id);
        setEpisodes(data);
      } catch (err) {
        console.error('Failed to fetch episodes:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) fetchEpisodes();
  }, [user]);

  if (loading) return <div className="text-center mt-10 font-semibold text-primary-dull animate-pulse">Loading...</div>;

  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-36 py-3 mt-14">
      {episodes.length > 0 ? (
        episodes.map((ep) => <LibraryCard key={ep._id} episode={ep} />)
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default Library;
