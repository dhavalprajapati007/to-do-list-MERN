import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import todoController from '../controllers/todoController.js';

const router = express.Router();

router.use(authMiddleware); // Protect all routes

router.post('/', todoController.createTodo);
router.get('/', todoController.getTodos);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

export default router;
