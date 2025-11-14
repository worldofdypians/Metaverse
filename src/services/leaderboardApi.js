import axios from "axios";

export const BACKEND_API_BASE =
  "https://axf717szte.execute-api.eu-central-1.amazonaws.com/prod";

/**
 * Fetches the full Global Star Monthly leaderboard.
 * @returns {Promise<Array>} Array of leaderboard entries.
 */
export const fetchStarMonthlyLeaderboard = async () => {
  const payload = {
    StatisticName: "GlobalStarMonthlyLeaderboard",
    StartPosition: 0,
    MaxResultsCount: 100,
  };

  const response = await axios.post(
    `${BACKEND_API_BASE}/auth/GetLeaderboard`,
    payload
  );

  return response?.data?.data?.leaderboard ?? [];
};

