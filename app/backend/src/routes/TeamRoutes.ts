//
import { Request, Router, Response } from 'express';
import TeamController from '../controllers/TeamController';

const teamController = new TeamController();

const router = Router();

// Get all teams
router.get('/', (req: Request, res: Response) => teamController.getAllTeams(req, res));

// Get team by id
router.get('/:id', (req: Request, res: Response) => teamController.getTeamById(req, res));

export default router;
