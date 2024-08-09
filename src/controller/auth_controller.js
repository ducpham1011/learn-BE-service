import express from 'express';
import { createUser, getUserByEmail } from '../database/user_db.js';
import md5 from 'crypto-js/md5.js';
import ErrorResponse from '../model/error_response.js';
import SuccessResponse from '../model/success_response.js';
import { generateToken, generateRefreshToken } from '../helper/jwt_helper.js';

export const registerUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email) {
      return res.status(400).send(new ErrorResponse(400, 'Param email invalid'));
    }
    if (!password) {
      return res.status(400).send(new ErrorResponse(400, 'Param password invalid'));
    }

    if (!name) {
      return res.status(400).send(new ErrorResponse(400, 'Param name invalid'));
    }

    const exitsUser = await getUserByEmail(email);
    if (exitsUser) {
      return res.status(400).send(new ErrorResponse('User has exist'));
    }

    const user = await createUser({
      name,
      email,
      password: md5(password)
    })

    return res.status(200).send(new SuccessResponse('Register successed')).end();
  } catch (e) {
    console.log(e);
    res.sendStatus(500).send(new ErrorResponse(e));
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).send(new ErrorResponse(400, 'Param email invalid'));
    }
    if (!password) {
      return res.status(400).send(new ErrorResponse(400, 'Param password invalid'));
    }
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(400).send(new ErrorResponse(400, 'User not exist'));
    }

    if (user.password != md5(password)) {
      return res.status(400).send(new ErrorResponse(400, 'Password incorrect'));
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const accessToken = generateToken(payload);
    const refreshToken = generateRefreshToken(payload);

    const resUser = {
      id: user.id,
      email: user.email,
      accessToken,
      refreshToken,
    }

    return res.status(200).send(new SuccessResponse('Login successful', resUser));
  } catch (e) {
    console.log(e);
    res.sendStatus(500).send(new ErrorResponse(e));
  }
}