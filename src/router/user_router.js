import express from 'express';
import { isAuthentication } from '../middleware/index.js';
import { deleteAccount, changePassword, getUserInfo, uploadFile } from '../controller/user_controller.js';
import { upload } from '../helper/upload_file_helper.js'

export default (router) => {
    router.get('/user', isAuthentication, getUserInfo);
    router.post('/user/changePassword', isAuthentication, changePassword);
    router.delete('/user', isAuthentication, deleteAccount);
    router.post('/upload', isAuthentication, upload.single('file'), uploadFile);
}