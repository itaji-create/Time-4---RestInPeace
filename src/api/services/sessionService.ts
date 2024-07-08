import { getRepository } from 'typeorm';
import { Session } from '../../database/entities/Session';
import { Movie } from '../../database/entities/Movie';
import {sessionModels} from '../models/sessionModels'
import { AppDataSource } from 'src/database/data-source';

export const createSession = async (movieId: number, sessionData: Partial<Session>): Promise<Session> => {
  const movieRepository = getRepository(Movie);
  const sessionRepository = getRepository(Session);

  const movie = await movieRepository.findOneById(movieId);
  if (!movie) {
    throw new Error('Movie not found');
  }

  const session = sessionRepository.create({...sessionData, movie });
  return await sessionRepository.save(session);
};

export const updateSession = async (movieId: number, sessionId: number, sessionData: Partial<Session>): Promise<Session> => {
  const sessionRepository = getRepository(Session);

  const session = await sessionRepository.findOne({ where: { id: sessionId, movie: { id: movieId } } });
  if (!session) {
    throw new Error('Session not found');
  }

  sessionRepository.merge(session, sessionData);
  return await sessionRepository.save(session);
};

export const deleteSession = async (movieId: number, sessionId: number): Promise<void> => {
  const sessionRepository = getRepository(Session);

  const session = await sessionRepository.findOne({ where: { id: sessionId, movie: { id: movieId } } });
  if (!session) {
    throw new Error('Session not found');
  }

  await sessionRepository.remove(session);
};

export const getSession = async (): Promise<Session[]> => {
  const sessionRepository = await AppDataSource.manager.find(Session);
  return sessionRepository 
}