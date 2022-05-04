import { Router } from 'express';
import { createPost } from '../../controllers/posts';
const router = Router();

router.route('/').post(createPost);

export = router;
