export interface Tournament {
  id: number;
  name: string;
  sport: string;
  location: string;
  startDate: string;
  endDate: string;
  participants: number[];
}