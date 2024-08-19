import mongoose from "mongoose";

const RoleSchema = mongoose.Schema({
    role: { type: String, require: true }
})

export const UserRole = mongoose.model('UserRole', RoleSchema);

export const getUserRoleByName = (role) => UserRole.findOne({ role }, 'id');
export const getUserRoleById = (id) => UserRole.findOne({ id }, 'name')