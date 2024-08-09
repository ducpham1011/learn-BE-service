import express from 'express';
import { registerUser, login } from '../controller/auth_controller.js';

export default (router) => {
    router.post('/auth/register', registerUser)
    router.post('/auth/login', login)
}