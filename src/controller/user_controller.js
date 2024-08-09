import express from 'express';
import { createUser, getUserByEmail, getUserById } from '../database/user_db.js';
import md5 from 'crypto-js/md5.js';
import ErrorResponse from '../model/error_response.js';
import SuccessResponse from '../model/success_response.js';
import { generateToken, generateRefreshToken } from '../helper/jwt_helper.js';

export const getUserInfo = async (req, res) => {
  try {
    // const {id} = req.query;
    
    const user = req.user;
    const resUser = {
        id: user.id,
        email: user.email
    }
    return res.status(200).send(new SuccessResponse('Thanh cong', resUser)).end();
  } catch(e){
    console.log(e)
    return res.sendStatus(500);
  }
}