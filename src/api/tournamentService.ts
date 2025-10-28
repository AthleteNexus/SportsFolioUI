import api from './axios.ts';
import type { Tournament } from '../models/Tournament.ts';

export async function fetchTournaments() {
  const response = await api.get('/tournaments');
  return response.data;
}

export async function createTournament(tournament: Tournament) {
  // Simulate tournament creation
  return { ...tournament, id: Date.now() };
}
