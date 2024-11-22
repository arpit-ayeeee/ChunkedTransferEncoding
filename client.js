const http = require('http');
const fs = require('fs');
const path = require('path');

const FILE_PATH = 'large_file.dat'; // Path to the 1GB file
const SERVER_URL = 'http://localhost:3000/upload';

// Create a large file for testing if it doesn't exist
function createLargeFile() {
  if (!fs.existsSync(FILE_PATH)) {
    const writeStream = fs.createWriteStream(FILE_PATH);
    for (let i = 0; i < 1024 * 1024; i++) {
      writeStream.write('A'.repeat(1024)); // Write 1MB of data
    }
    writeStream.end();
    console.log('Large test file created.');
  }
}

// Stream the file to the server
function streamFile() {
  const fileStream = fs.createReadStream(FILE_PATH);

  const options = {
    method: 'POST',
    hostname: 'localhost',
    port: 3000,
    path: '/upload',
    headers: {
      'Content-Type': 'application/octet-stream',
      'Transfer-Encoding': 'chunked',
    },
  };

  const req = http.request(options, (res) => {
    console.log(`Server responded with status: ${res.statusCode}`);
    res.on('data', (chunk) => {
      console.log('Response chunk:', chunk.toString());
    });
    res.on('end', () => {
      console.log('File upload completed successfully.');
    });
  });

  req.on('error', (err) => {
    console.error('Error uploading file:', err);
  });

  fileStream.pipe(req);

  fileStream.on('end', () => {
    console.log('File fully streamed to the server.');
  });
}

// Create the test file and upload it
createLargeFile();
streamFile();
