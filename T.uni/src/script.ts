module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};

import { Request, Response } from 'express';
import * as movieService from '../services/movieService';
import {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} from './movieController';

jest.mock('../services/movieService');

describe('Movie Controller', () => {
  const mockRequest = {} as Request;
  const mockResponse = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  } as unknown as Response;

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getMovieById', () => {
    it('should return a movie when found', async () => {
      const mockMovie = { id: 1, title: 'Movie 1' };
      (movieService.getMovieById as jest.Mock).mockResolvedValue(mockMovie);

      mockRequest.params = { id: '1' };
      await getMovieById(mockRequest, mockResponse);

      expect(movieService.getMovieById).toHaveBeenCalledWith(1);
      expect(mockResponse.json).toHaveBeenCalledWith(mockMovie);
    });

    it('should return 404 when movie is not found', async () => {
      (movieService.getMovieById as jest.Mock).mockResolvedValue(null);

      mockRequest.params = { id: '999' };
      await getMovieById(mockRequest, mockResponse);

      expect(movieService.getMovieById).toHaveBeenCalledWith(999);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Filme não encontrado!',
      });
    });
  });

  describe('createMovie', () => {
    it('should create a new movie', async () => {
      const mockNewMovie = { title: 'New Movie' };
      (movieService.createMovie as jest.Mock).mockResolvedValue(mockNewMovie);

      mockRequest.body = mockNewMovie;
      await createMovie(mockRequest, mockResponse);

      expect(movieService.createMovie).toHaveBeenCalledWith(mockNewMovie);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(mockNewMovie);
    });
  });

  describe('updateMovie', () => {
    it('should update an existing movie', async () => {
      const mockUpdatedMovie = { id: 1, title: 'Updated Movie' };
      (movieService.updateMovie as jest.Mock).mockResolvedValue(mockUpdatedMovie);

      mockRequest.params = { id: '1' };
      mockRequest.body = { title: 'Updated Movie' };
      await updateMovie(mockRequest, mockResponse);

      expect(movieService.updateMovie).toHaveBeenCalledWith(1, mockRequest.body);
      expect(mockResponse.json).toHaveBeenCalledWith(mockUpdatedMovie);
    });

    it('should return 404 when movie to update is not found', async () => {
      (movieService.updateMovie as jest.Mock).mockResolvedValue(null);

      mockRequest.params = { id: '999' };
      await updateMovie(mockRequest, mockResponse);

      expect(movieService.updateMovie).toHaveBeenCalledWith(999, {});
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Filme não encontrado!',
      });
    });
  });

  describe('deleteMovie', () => {
    it('should delete an existing movie', async () => {
      (movieService.deleteMovie as jest.Mock).mockResolvedValue(true);

      mockRequest.params = { id: '1' };
      await deleteMovie(mockRequest, mockResponse);

      expect(movieService.deleteMovie).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockResponse.send).toHaveBeenCalled();
    });

    it('should return 404 when movie to delete is not found', async () => {
      (movieService.deleteMovie as jest.Mock).mockResolvedValue(false);

      mockRequest.params = { id: '999' };
      await deleteMovie(mockRequest, mockResponse);

      expect(movieService.deleteMovie).toHaveBeenCalledWith(999);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Filme não encontrado!',
      });
    });
  });
});