require('dotenv').config({ path: './backend/.env' });

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const notificationsRouter = require('./notifications'); // Corrected path

const app = express();
const PORT = process.env.PORT || 4000; // Use dynamic port for deployment

// Middleware
app.use(cors({
    origin: ['https://velvet-vault.vercel.app', 'https://velvetvaultauto.com','https://www.velvetvaultauto.com'], 
    methods: ['GET', 'POST'],
}));
app.use(bodyParser.json());
app.use('/api', notificationsRouter);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
