import { getRepository, Repository } from 'typeorm';
import { Movie } from '../models/movieModels';

let movieRepository: Repository<Movie>;

const initializeRepository = () => {
  movieRepository = getRepository(Movie);
};

export const getMovies = async (): Promise<Movie[]> => {
  return await movieRepository.find();
};

export const getMovieById = async (id: number): Promise<Movie | undefined> => {
  const movie = await movieRepository.findOne(id);
  return movie || undefined;
};

export const createMovie = async (
  movieData: Partial<Movie>,
): Promise<Movie> => {
  const newMovie = movieRepository.create(movieData);
  return await movieRepository.save(newMovie);
};

export const updateMovie = async (
  id: number,
  movieData: Partial<Movie>,
): Promise<Movie | undefined> => {
  await movieRepository.update(id, movieData);
  return await movieRepository.findOne(id);
};

export const deleteMovie = async (id: number): Promise<boolean> => {
  const result = await movieRepository.delete(id);
  return result.affected !== 0;
};

initializeRepository();
