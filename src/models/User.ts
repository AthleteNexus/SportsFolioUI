export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  name: string;
  bio: string;
  sports: Array<{
    name: string;
    primary: boolean;
    equipment: string[];
    achievements: string[];
  }>;
  friends: number[];
  endorsements: Array<{ sport: string; by: number }>;
}
