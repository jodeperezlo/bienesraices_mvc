// Copyright (c) 2022 Jorge de Jesus Perez Lopez
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { Router } from 'express';
import {
  formLogin,
  formRegister,
  registerUser,
  formForgotPassword,
} from '../controllers/users.controller.js';

const router = Router();

router.get('/login', formLogin);
router.get('/register', formRegister);
router.post('/register', registerUser);
router.get('/forgot-password', formForgotPassword);

export default router;
