import express from 'express';
import { setAvatar, userLogin, userRegister } from '../controllers/userController.js';


const router = express.Router()

router.route('/register').post(userRegister)
router.route('/login').post(userLogin)
router.route('/setAvatar/:id').post(setAvatar)


// router.get('/logout', userLogout)


export default router;


