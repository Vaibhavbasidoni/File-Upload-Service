const path = require('path');
const fs = require('fs');

class FileController {
    constructor(fileModel) {
        this.fileModel = fileModel;
    }

    async uploadFile(req, res) {
        try {
            const file = req.file;
            if (!file) {
                return res.status(400).json({ message: 'No file uploaded.' });
            }

            const newFile = new this.fileModel({
                filename: file.filename, // Use the saved filename
                fileSize: file.size,
                fileType: file.mimetype,
                uploadTimestamp: new Date(),
            });

            await newFile.save();
            res.status(201).json({ message: 'File uploaded successfully.', file: newFile });
        } catch (error) {
            res.status(500).json({ message: 'Error uploading file.', error: error.message });
        }
    }

    async downloadFile(req, res) {
        try {
            const { filename } = req.params;
            const file = await this.fileModel.findOne({ filename });
            if (!file) {
                return res.status(404).json({ message: 'File not found.' });
            }

            const filePath = path.join(__dirname, '../../uploads', filename);
            if (!fs.existsSync(filePath)) {
                return res.status(404).json({ message: 'File not found on server.' });
            }

            res.download(filePath, file.filename);
        } catch (error) {
            res.status(500).json({ message: 'Error downloading file.', error: error.message });
        }
    }

    async deleteFile(req, res) {
        try {
            const { filename } = req.params;
            const file = await this.fileModel.findOneAndDelete({ filename });
            if (!file) {
                return res.status(404).json({ message: 'File not found.' });
            }

            const filePath = path.join(__dirname, '../../uploads', filename);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }

            res.status(200).json({ message: 'File deleted successfully.' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting file.', error: error.message });
        }
    }
}

module.exports = FileController;