export type Movie = {
  id: number;
  name: string;
  language: string | null;
  rating: number | null;
  genre: string | null;
  imageUrl: string | null;
  duration: string | null;
  description?: string | null;
  playingDate?: string | null;
  playingTime?: string | null;
  ticketPrice?: number | null;
  trailorUrl?: string | null;
  image?: string | null;
  reservations?: any | null;
};