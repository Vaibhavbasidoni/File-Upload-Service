const express = require('express');
const dbConfig = require('./config/db');
const fileRoutes = require('./routes/fileRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/files', fileRoutes);

dbConfig();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});