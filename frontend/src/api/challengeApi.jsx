import axiosInstance from "./axiosInstance";

// Get all challenges joined by the logged-in user
export const getMyChallenges = async () => {
  return await axiosInstance.get("/challenges/getMyChallenges");
};
export const joinChallenge = (challengeId) =>
  axiosInstance.post(`/challenges/${challengeId}/join`);

export const leaveChallenge = (challengeId) =>
  axiosInstance.delete(`/challenges/${challengeId}/leave`);

export const getChallengeById = (challengeId) =>
  axiosInstance.get(`/challenges/getChallengeById/${challengeId}`);

// challengeApi.js should contain all challenge-related API calls, for example:

// export const getMyChallenges = ...
// export const joinChallenge = ...
// export const leaveChallenge = ...
