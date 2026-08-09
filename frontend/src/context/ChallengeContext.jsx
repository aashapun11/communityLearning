import { createContext, useContext, useState, useEffect } from "react";
import { getMyChallenges, 
joinChallenge as joinChallengeApi,
  leaveChallenge as leaveChallengeApi,
  getChallengeById

 } from "../api/challengeApi";

const ChallengeContext = createContext();

export function ChallengeProvider({ children }) {
  // Joined challenges
  const [myChallenges, setMyChallenges] = useState([]);

  // Loading state
  const [loading, setLoading] = useState(false);

  // Error state
  const [error, setError] = useState(null);

  const getJoinedChallenges = async () => {
  try {
    setLoading(true);
    setError(null);

    const response = await getMyChallenges();

    setMyChallenges(response.data.challenges);
  } catch (err) {
    setError(err.response?.data?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};


// const joinChallenge = async (challengeId) => {
//   try {
//     setLoading(true);
//     setError(null);

//     await joinChallengeApi(challengeId);

//     // Refresh joined challenges
//     await getJoinedChallenges();

//     return { success: true };
//   } catch (err) {
//     const message =
//       err.response?.data?.message || "Failed to join challenge";

//     setError(message);

//     return {
//       success: false,
//       message,
//     };
//   } finally {
//     setLoading(false);
//   }
// };

// const leaveChallenge = async (challengeId) => {
//   try {
//     setLoading(true);
//     setError(null);

//     await leaveChallengeApi(challengeId);

//     // Refresh joined challenges
//     await getJoinedChallenges();

//     return { success: true };
//   } catch (err) {
//     const message =
//       err.response?.data?.message || "Failed to leave challenge";

//     setError(message);

//     return {
//       success: false,
//       message,
//     };
//   } finally {
//     setLoading(false);
//   }
// };

// const getSingleChallenge = async (challengeId) => {
//   try {
//     setLoading(true);
//     setError(null);
//     let id = challengeId;
//     console.log("Fetching challenge details for ID:", id); // Debugging line
//     console.log("getChallengeById function:", challengeId); // Debugging line

//     const response = await getChallengeById(challengeId);
//     setSingleChallenge(response.data.challenge);
//     console.log("getChallengeById response:", response.data.challenge); // Debugging line

//     return { success: true, challenge: response.data.challenge };
//   } catch (err) {
//     const message =
//       err.response?.data?.message || "Failed to fetch challenge details";

//     setError(message);

//     return {
//       success: false,
//       message,
//     };
//   } finally {
//     setLoading(false);
//   }
// };

useEffect(() => {
  getJoinedChallenges();
}, []);
  return (
    <ChallengeContext.Provider value={{ myChallenges, loading, error }}>
      {children}
    </ChallengeContext.Provider>
  );
}

export function useChallenge() {
  const context = useContext(ChallengeContext);

  if (!context) {
    throw new Error(
      "useChallenge must be used within ChallengeProvider"
    );
  }

  return context;
}