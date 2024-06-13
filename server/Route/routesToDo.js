import express from 'express'
import { addToDoList, getToDoList, tododelete, todoupdate } from '../Controller/todo.js';

const router = express.Router();
router.get('/getToDoList',getToDoList);
router.post('/addToDoList',addToDoList);
router.delete('/delete/:id',tododelete);
router.put('/update/:id',todoupdate);

export default router