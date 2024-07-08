import express from 'express';
import * as MovieController from '../controllers/movieController';

const router = express.Router();

router.get('/movies', MovieController.getMovies);
router.get('/movies/:id', MovieController.getMovieById);
router.post('/movies', MovieController.createMovie);
router.put('/movies/:id', MovieController.updateMovie);
router.delete('/movies/:id', MovieController.deleteMovie);

export default router;
