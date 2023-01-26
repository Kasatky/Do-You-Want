require('dotenv').config();
const path = require('path');
const express = require('express');

const { PORT } = process.env || 3000;

const app = express();

app.use(express.static(path.join(__dirname, '../../frontend/build')));
app.get('/', (req, res) => res.json({ message: 'ok' }));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

app.listen(PORT, () => console.log('Server listen ', PORT));
