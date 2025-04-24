import { Router } from 'express';
import { lessonsController } from './controllers/LessonsController';

export const router = Router();

router.get('/lessons', lessonsController.findLessonsByFilter);
