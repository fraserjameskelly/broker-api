import express from 'express';
import { list, details, create, update, remove } from '../controller/PolicyType';

const router = express.Router();

router.use(function timeLog (_req, _res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.get('/', list)
router.post('/', create)

router.get('/:id', details)
router.post('/:id', update)
router.delete('/:id', remove)

export default router;