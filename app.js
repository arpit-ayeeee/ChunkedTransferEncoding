const http = require('http');
const fs = require('fs');

const PORT = 3000;

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/upload') {
    // Stream incoming data into a file
    const writeStream = fs.createWriteStream('uploaded_file.dat');
    let totalBytes = 0;

    req.on('data', (chunk) => {
      totalBytes += chunk.length;
      console.log(`Received chunk of size: ${chunk.length} bytes`);
    });

    req.pipe(writeStream);

    req.on('end', () => {
      console.log(`Upload complete. Total bytes: ${totalBytes}`);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('File uploaded successfully!');
    });

    req.on('error', (err) => {
      console.error('Error receiving file:', err);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Server error');
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
