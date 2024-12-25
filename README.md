# File Upload Service

This project is a simple file upload service built using Node.js and Express.js. It allows users to upload files, store them on the server, and save file metadata in a MongoDB database.

## Features

- File upload API with support for common file types (JPEG, PNG, PDF).
- File metadata storage in MongoDB.
- File download API to retrieve uploaded files.
- File deletion API to remove files and their metadata.
- Error handling for unsupported file types and oversized files.

## Project Structure

```
file-upload-service
├── src
│   ├── controllers
│   │   ├── fileController.js
│   ├── models
│   │   ├── fileModel.js
│   ├── routes
│   │   ├── fileRoutes.js
│   ├── app.js
│   ├── config
│   │   ├── db.js
│   └── middleware
│       ├── upload.js
├── package.json
├── .env
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Vaibhavbasidoni/File-Upload-Service.git
   cd file-upload-service
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your MongoDB connection string:
   ```
   MONGODB_URI=<your_mongodb_connection_string>
   ```

## Usage

1. Start the server:
   ```
   npm start
   ```

2. API Endpoints:

   ### File Upload Endpoint
   - **Endpoint**: `POST /api/files/upload`
   - **Description**: Upload a file to the server.
   - **Headers**: `Content-Type: multipart/form-data`
   - **Body**:
     ```
     file: The file to upload (use form-data in Postman).
     ```
   - **Response**:
     ```json
     {
       "message": "File uploaded successfully.",
       "file": {
         "_id": "676ad52bf78421590c4933b7",
         "filename": "Picture2.png",
         "fileSize": 363889,
         "fileType": "image/png",
         "uploadTimestamp": "2024-12-24T15:37:15.604Z",
         "__v": 0
       }
     }
     ```

   ### File Download Endpoint
   - **Endpoint**: `GET /api/files/download/:filename`
   - **Description**: Download a file from the server.
   - **URL Parameters**:
     ```
     :filename: The name of the file to download.
     ```
   - **Response**: The file will be downloaded with its original filename.

   ### File Deletion Endpoint
   - **Endpoint**: `DELETE /api/files/delete/:filename`
   - **Description**: Delete a file from the server and the database.
   - **URL Parameters**:
     ```
     :filename: The name of the file to delete.
     ```
   - **Response**:
     ```json
     {
       "message": "File deleted successfully."
     }
     ```

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.

## License

This project is licensed under the MIT License.

