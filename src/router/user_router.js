import express from 'express';
import { getUserInfo } from '../controller/user_controller.js';
import { isAuthentication } from '../middleware/index.js';

export default (router) => {
    router.get('/user', isAuthentication, getUserInfo)
}