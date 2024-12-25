const express = require('express');
const upload = require('../middleware/upload');
const FileController = require('../controllers/fileController');
const FileModel = require('../models/fileModel');

const router = express.Router();
const fileController = new FileController(FileModel);

// File upload route with detailed error handling
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        // Check if a file was uploaded
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded. Please provide a valid file.' });
        }

        // Process the uploaded file using the file controller
        const result = await fileController.uploadFile(req, res);

        // Respond with success and file processing results
        return res.status(200).json(result);
    } catch (error) {
        console.error('File upload error:', error);
        return res.status(500).json({ message: 'Error uploading file.', error: error.message });
    }
});

// File download route
router.get('/download/:filename', async (req, res) => {
    try {
        await fileController.downloadFile(req, res);
    } catch (error) {
        console.error('File download error:', error);
        return res.status(500).json({ message: 'Error downloading file.', error: error.message });
    }
});

// File deletion route
router.delete('/delete/:filename', async (req, res) => {
    try {
        await fileController.deleteFile(req, res);
    } catch (error) {
        console.error('File deletion error:', error);
        return res.status(500).json({ message: 'Error deleting file.', error: error.message });
    }
});

module.exports = router;