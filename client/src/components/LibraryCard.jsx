import React from 'react'
import { MdDelete } from 'react-icons/md';
import { deleteEpisode } from '../api/episodeApi';
import { toast } from 'react-hot-toast';


const LibraryCard = () => {
  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this episode?');
    if (!confirmDelete) return;

    const toastId = toast.loading('Deleting episode...');
    try {
      await deleteEpisode(episode._id);
      toast.success('Episode deleted successfully!', { id: toastId });
      if (onDelete) onDelete(episode._id); // Let parent remove it from UI
    } catch (err) {
      toast.error('Failed to delete episode.', { id: toastId });
    }
  };

  return (
    <div className="bg-white/5 p-5 rounded-xl shadow-sm w-full max-w-md flex flex-col gap-3">
      <div>
        <h2 className="text-xl font-semibold">{episode.title}</h2>
        <p className="text-xs text-gray-400 mt-1">Host: {episode.hosts || 'N/A'}</p>
        <audio controls className="w-full mt-3">
          <source src={episode.audioUrl} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
        <p className="text-sm text-gray-300 mt-2">{episode.duration || 'Duration unknown'}</p>
        <p className="text-sm text-gray-400 mt-2">
          {episode.transcript?.slice(0, 100)}...
        </p>
      </div>

      <button
        onClick={handleDelete}
        className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm mt-2 self-start"
      >
        <MdDelete className="w-4 h-4" /> Delete
      </button>
    </div>
  );
}

export default LibraryCard
