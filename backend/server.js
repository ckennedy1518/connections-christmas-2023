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

// Serve React frontend
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

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

// Endpoint to get the contents of a file
app.get('/api/files/:fileName', (req, res) => {
  const { fileName } = req.params;

  if (!fileName) {
    return res.status(400).json({ error: 'File name is required' });
  }

  const filePath = path.join(directoryPath, fileName);

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' });
  }

  // Read the file contents
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ error: 'Failed to read file' });
    }
    res.status(200).json({ content: data });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
