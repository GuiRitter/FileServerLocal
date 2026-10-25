import express from 'express';

import { get } from '../controller/fileController';

const router = express.Router();

router.get('/:filePathEncoded', get);

export default router;
