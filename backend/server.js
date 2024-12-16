require('dotenv').config({ path: './backend/.env' });

const express = require('express');
const bodyParser = require('body-parser');
const notificationsRouter = require('./notifications');

const app = express();
const PORT = 4000;

// Middleware
app.use(bodyParser.json());
app.use('/api', notificationsRouter);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
