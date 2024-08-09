import express from 'express';
import { createUser, getUserByEmail, getUserById } from '../database/user_db.js';
import md5 from 'crypto-js/md5.js';
import ErrorResponse from '../model/error_response.js';
import SuccessResponse from '../model/success_response.js';
import { verifyRefreshToken, verifyToken } from '../helper/jwt_helper.js';

export const isAuthentication = async (req, res, next) => {
    try {
        let [scheme, token] = req.headers.authorization.split(' ');
        if (scheme == 'Bearer') {
            const payload = verifyToken(token);

            const user = await getUserById(payload.id);
            if (!user) {
                return res.sendStatus(401);
            }

            req.user = user;
            return next()
        } else {
            return res.sendStatus(401);
        }
    } catch(e){
        console.log(e);
        return res.sendStatus(401)
    }
}