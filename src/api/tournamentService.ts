import api from './axios.ts';

export async function fetchTournaments() {
  const response = await api.get('/tournaments');
  return response.data;
}

export async function createTournament(tournament) {
  // Simulate tournament creation
  return { ...tournament, id: Date.now() };
}
