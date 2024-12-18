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
// Middleware to parse JSON requests
app.use(express.json());

const directoryPath = path.join(__dirname, '../src/Games');

// API endpoint to list files in Games
app.get('/api/files', (req, res) => {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to scan directory' });
    }
    res.json(files);
  });
});

// POST endpoint to create a file
app.post('/api/files', (req, res) => {
  const { fileName, content } = req.body;

  if (!fileName) {
    return res.status(400).json({ error: 'File name is required' });
  }

  const filePath = path.join(directoryPath, fileName);

  // Write content to the file or create an empty file if no content
  fs.writeFile(filePath, content || '', (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to create file' });
    }
    res.status(201).json({ message: 'File created successfully', fileName });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
