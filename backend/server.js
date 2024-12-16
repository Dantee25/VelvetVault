require('dotenv').config({ path: './backend/.env' });


const cors = require('cors');
app.use(cors({
    origin: ['http://localhost:3000', 'https://velvetvaultauto.com'], // Replace with your frontend domain
    methods: ['GET', 'POST'],
}));

const express = require('express');
const bodyParser = require('body-parser');
const notificationsRouter = require('./notifications');

const app = express();
const PORT = 4000;

// Middleware
app.use(bodyParser.json());
app.use('/api', notificationsRouter);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
