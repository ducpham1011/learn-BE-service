import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name: {type: String, require: true},
    password: {type: String, require: true},
    email: {type: String, require: true},
})

export const UserModel = mongoose.model('User', UserSchema);

export const getUsers = () => UserModel.find();
export const getUserById = (id) => UserModel.findById(id);
export const getUserByEmail = (email) => UserModel.findOne({email});
export const createUser = (user) => new UserModel(user).save()
export const deleteUserById = (id) => UserModel.findByIdAndDelete(id);
export const updateUserById = (id, value) => UserModel.findByIdAndUpdate(id, value);
