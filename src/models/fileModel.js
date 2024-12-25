const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    fileSize: { type: Number, required: true },
    fileType: { type: String, required: true },
    uploadTimestamp: { type: Date, default: Date.now },
});

const FileModel = mongoose.model('File', fileSchema);

module.exports = FileModel;