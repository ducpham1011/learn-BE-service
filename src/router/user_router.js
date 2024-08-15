import express from 'express';
import { isAuthentication } from '../middleware/index.js';
import { deleteAccount, changePassword, getUserInfo } from '../controller/user_controller.js';

export default (router) => {
    router.get('/user', isAuthentication, getUserInfo);
    router.post('/user/changePassword', isAuthentication, changePassword);
    router.delete('/user', isAuthentication, deleteAccount)

}