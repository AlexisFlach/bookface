import { Router } from 'express';
import { createUser, getAllUsers, getUser } from '../../controllers/users';

const router = Router();

router.route('/').post(createUser);
router.route('/:id').get(getUser);
router.route('/').get(getAllUsers);

export = router;
