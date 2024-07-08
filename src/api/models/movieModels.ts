export interface Movie {
  id: number;
  title: string;
  description: string;
  releaseDate: Date;
  duration: number;
  director: string;
  cast: string[];
  genres: string[];
}
