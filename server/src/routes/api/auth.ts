import { Router } from 'express';
import { authenticate, validateUser } from '../../controllers/auth';
import { auth } from '../../middleware/auth';
const router = Router();

router.route('/').get(auth, authenticate);
router.route('/').post(validateUser);

export = router;
