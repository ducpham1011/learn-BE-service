import mongoose from "mongoose";

const FileSchema = mongoose.Schema({
    fieldname: { type: String, require: true },
    mimetype: { type: String, require: true },
    destination: { type: String, require: true },
    filename: { type: String, require: true },
    path: { type: String, require: true },
    size: { type: Number, require: false }
})

export const FileModel = mongoose.model('File', FileSchema);

export const addFile = (file) => new FileModel(file).save();
export const deleteFile = (id) => FileModel.findByIdAndDelete(id);
