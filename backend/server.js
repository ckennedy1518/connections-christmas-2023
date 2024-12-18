// Author: Christopher Kennedy
// Date: 12-17-24

const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Enable CORS to allow requests from the React app
app.use(cors());

// API endpoint to list files in Games
app.get('/api/files', (req, res) => {
  const directoryPath = path.join(__dirname, '../src/Games');
  
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to scan directory' });
    }
    res.json(files);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
