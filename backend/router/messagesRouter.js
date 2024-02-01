import express from 'express'
import { addMessage, getMessage } from '../controllers/messageController.js';

const router = express.Router();

router.route('/addmsg').post(addMessage);
router.route('/getmsg').get(getMessage);

export default router;