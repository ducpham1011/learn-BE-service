import jwt from 'jsonwebtoken';
import 'dotenv/config.js';

const expireAccessTokenTime = process.env.expireAccessTokenTime;
const expireRefreshTokenTime = process.env.expireRefreshTokenTime;
const accessTokenSecret = process.env.accessTokenSecret;
const refreshTokenSecret = process.env.refreshTokenSecret;

export const generateToken = (payload) => {
    const token = jwt.sign(payload, accessTokenSecret, { algorithm: 'HS256', expiresIn: expireAccessTokenTime });
    return token;
}

export const generateRefreshToken = (payload) => {
    const token = jwt.sign(payload, refreshTokenSecret, { algorithm: 'HS256', expiresIn: expireRefreshTokenTime });
    return token;
}

export const verifyToken = (token) => {
    const payload = jwt.verify(token, accessTokenSecret, { algorithms: 'HS256' });
    return payload;
}

export const verifyRefreshToken = (token) => {
    const payload = jwt.verify(token, refreshTokenSecret, { algorithms: 'HS256' });
    return payload;
}