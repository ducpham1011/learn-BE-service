import express from 'express';
import md5 from 'crypto-js/md5.js';
import { updateUserById, deleteUserById } from '../database/user_db.js';
import ErrorResponse from '../model/error_response.js';
import SuccessResponse from '../model/success_response.js';

export const getUserInfo = async (req, res) => {
  try {
    // const {id} = req.query;

    const user = req.user;
    const resUser = {
      id: user.id,
      email: user.email
    }
    return res.status(200).send(new SuccessResponse('Thanh cong', resUser)).end();
  } catch (e) {
    console.log(e);
    return res.sendStatus(500).send(new ErrorResponse(e));
  }
}

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, reNewPassword } = req.body;
    const currentUser = req.user;
    const enctyptInputCurrentPassword = md5(currentPassword);

    if (enctyptInputCurrentPassword == currentUser.password) {
      if (newPassword == reNewPassword) {
        const encryptNewPassword = md5(newPassword);
        currentUser.password = encryptNewPassword;
        const newUser = await updateUserById(currentUser.id, currentUser);
        if (newUser) {
          return res.status(200).send(new SuccessResponse('Doi mat khau thanh cong')).end();
        } else {
          return res.status(400).send(new ErrorResponse(400, 'Co loi xay ra'));
        }
      } else {
        return res.status(400).send(new ErrorResponse(400, 'Mat khau nhap lai khong dung'));
      }
    } else {
      return res.status(400).send(new ErrorResponse(400, 'Mat khau hien tai khong dung'));
    }
  } catch (e) {
    return res.sendStatus(500).send(new ErrorResponse(e));
  }
}

export const deleteAccount = async (req, res) => {
  try {
    const user = req.user;
    const userDelete = await deleteUserById(user.id);
    if (userDelete) {
      return res.status(200).send(new SuccessResponse('Thanh cong')).end();
    } else {
      return res.status(400).send(new ErrorResponse(400, 'Co loi xay ra'));
    }
  } catch (e) {
    return res.sendStatus(500).send(new ErrorResponse(e));
  }
}

