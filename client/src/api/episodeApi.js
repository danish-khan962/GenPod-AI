import axiosInstance from "./axiosInstance";

// Get episodes for a user
export const getUserEpisodes = async (userId) => {
  const response = await axiosInstance.get(`/episodes/${userId}`);
  return response.data;
};

// Create a new episode
export const createEpisode = async (episodeData) => {
  const response = await axiosInstance.post("/episodes", episodeData);
  return response.data;
};

// Delete an episode
export const deleteEpisode = async (episodeId) => {
  const response = await axiosInstance.delete(`/episodes/${episodeId}`);
  return response.data;
};

//AI response 
export const generateEpisode = async (data) => {
  const response = await axios.post("/episodes/generate", data);
  return response.data;
};
