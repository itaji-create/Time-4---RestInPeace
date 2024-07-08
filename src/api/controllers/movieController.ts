import { Request, Response } from 'express';
import * as movieService from '../services/movieService';

type AsyncHandler = (req: Request, res: Response) => Promise<void>;

const handleAsync =
  (fn: AsyncHandler) => async (req: Request, res: Response) => {
    try {
      await fn(req, res);
    } catch (error) {
      res.status(500).json({ message: 'Ocorreu um erro!', error });
    }
  };

export const getMovies = handleAsync(async (req: Request, res: Response) => {
  const movies = await movieService.getMovies();
  res.json(movies);
});

export const getMovieById = handleAsync(async (req: Request, res: Response) => {
  const movie = await movieService.getMovieById(Number(req.params.id));
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ message: 'Filme não encontrado!' });
  }
});

export const createMovie = handleAsync(async (req: Request, res: Response) => {
  const newMovie = await movieService.createMovie(req.body);
  res.status(201).json(newMovie);
});

export const updateMovie = handleAsync(async (req: Request, res: Response) => {
  const updatedMovie = await movieService.updateMovie(
    Number(req.params.id),
    req.body,
  );
  if (updatedMovie) {
    res.json(updatedMovie);
  } else {
    res.status(404).json({ message: 'Filme não encontrado!' });
  }
});

export const deleteMovie = handleAsync(async (req: Request, res: Response) => {
  const success = await movieService.deleteMovie(Number(req.params.id));
  if (success) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Filme não encontrado!' });
  }
});
