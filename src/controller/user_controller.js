import express from 'express';
import md5 from 'crypto-js/md5.js';
import { getUserById, updateUserById, deleteUserById } from '../database/user_db.js';
import { getUserRoleByName } from '../database/permission_db.js';
import { addFile } from '../database/file_db.js';
import ErrorResponse from '../model/error_response.js';
import SuccessResponse from '../model/success_response.js';

export const getUserInfo = async (req, res) => {
  try {
    const user = req.user;
    console.log(user);
    if (!req.query.userId) {
      const resUser = {
        id: user.id,
        email: user.email
      }
      return res.status(200).send(new SuccessResponse('Successed', resUser)).end();
    } else {

      if (req.query.userId == user.id) {
        const resUser = {
          id: user.id,
          email: user.email
        }
        return res.status(200).send(new SuccessResponse('Successed', resUser)).end();
      }

      const readPermissionId = await getUserRoleByName('READ');

      if (!user.role) {
        return res.status(400).send(new ErrorResponse(400, 'Permission denied')).end();
      }

      if (user.role.includes(readPermissionId.id)) {
        const userRequire = await getUserById(req.query.userId);
        const resUser = {
          id: userRequire.id,
          email: userRequire.email
        }
        return res.status(200).send(new SuccessResponse('Successed', resUser)).end();
      } else {
        return res.status(400).send(new ErrorResponse(400, 'Permission denied')).end();
      }

    }

  } catch (e) {
    console.log(e);
    return res.status(400).send(new ErrorResponse(400, 'User not found.')).end();
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
          return res.status(200).send(new SuccessResponse('Change password successed.')).end();
        } else {
          return res.status(400).send(new ErrorResponse(400, 'An error occurred.'));
        }
      } else {
        return res.status(400).send(new ErrorResponse(400, 'Re-entered password not match.'));
      }
    } else {
      return res.status(400).send(new ErrorResponse(400, 'Current password not match.'));
    }
  } catch (e) {
    return res.status(500).send(new ErrorResponse(e));
  }
}

export const deleteAccount = async (req, res) => {
  try {
    const user = req.user;

    var userId = null;
    if (req.query.userId) {

      if (req.query.userId == user.id) {
        await deleteUserById(user.id);
        return res.status(200).send(new SuccessResponse('Successed.')).end();
      }

      const deletePermissionId = await getUserRoleByName('DELETE');

      if (!user.role) {
        return res.status(400).send(new ErrorResponse(400, 'Permission denied')).end();
      }
      if (user.role.includes(deletePermissionId.id)) {
        userId = req.query.userId;
      } else {
        return res.status(400).send(new ErrorResponse(400, 'Permission denied')).end();
      }
    } else {
      userId = user.id;
    }

    await deleteUserById(userId);
    return res.status(200).send(new SuccessResponse('Successed.')).end();

  } catch (e) {
    return res.status(400).send(new ErrorResponse(400, 'An error occurred.'));
  }
}

export const uploadFile = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send(new ErrorResponse(400, 'An error occurred.'));
    }
    await addFile(file);
    const newFile = {
      path: file.path,
      fileName: file.filename,
      mimeType: file.mimetype
    }
    return res.status(200).send(new SuccessResponse('Successed.', newFile)).end();
  } catch (e) {
    return res.status(400).send(new ErrorResponse(400, 'An error occurred.'));
  }
}

