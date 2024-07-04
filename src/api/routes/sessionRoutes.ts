import { Router } from 'express';
import { createSession, updateSession, deleteSession } from '../controllers/sessionController';

const router = Router();

router.post('/movies/:movie_id/sessions', createSession);
router.put('/movies/:movie_id/sessions/:id', updateSession);
router.delete('/movies/:movie_id/sessions/:id', deleteSession);

export default router;
