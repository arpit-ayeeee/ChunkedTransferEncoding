# Chunked File Transfer in Node.js

This project demonstrates how to implement chunked transfer encoding in Node.js to transfer a 1GB file from a client to a server over HTTP. The server accepts a large file in chunks via a `POST` request, and the client streams the file to the server efficiently using Node.js streams.

---

## Features

1. **Chunked Transfer Encoding**:
   - The client uses `Transfer-Encoding: chunked` to send data in manageable chunks to the server.

2. **Efficient Streaming**:
   - Both the server and client use Node.js streams to handle large files without exhausting memory.

3. **Error Handling**:
   - Graceful handling of errors during file transfer to ensure reliability.

---

## Project Structure

- `server.js`: Implements the HTTP server that receives and writes the file in chunks.
- `client.js`: Implements the HTTP client that reads and streams the file to the server.
- `large_file.dat`: A test file (1GB) created by the client script to simulate the file upload.

---

## Prerequisites

- **Node.js**: Ensure Node.js is installed on your system.
- **Filesystem Space**: Ensure you have at least 1GB of free disk space for the test file.

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/arpit-ayeeee/ChnkedTransferEncoding.git
cd chunked-file-transfer
```

### 2. Install Dependencies

No additional dependencies are required; this project uses Node.js core modules.

---

## Running the Project

### 1. Start the Server

Run the following command to start the server:

```bash
node server.js
```

The server will listen on port `3000` by default.

---

### 2. Run the Client

The client creates a 1GB test file (`large_file.dat`) and streams it to the server.

Run the client script:

```bash
node client.js
```

---

## Output

### Server

The server logs the chunks received and writes the uploaded file to `uploaded_file.dat`:

```text
Server running on http://localhost:3000
Received chunk of size: 65536 bytes
Received chunk of size: 65536 bytes
...
Upload complete. Total bytes: 1073741824
```

### Client

The client streams the file and logs the upload status:

```text
Large test file created.
File fully streamed to the server.
Server responded with status: 200
File upload completed successfully.
```

---

## Customization

- **File Path**: Modify the file path in `client.js` and `server.js` as needed.
- **Port**: Update the port in `server.js` and `client.js` to your preference.
- **File Size**: Change the size of the test file in `client.js` for testing smaller or larger files.

---

## Notes

1. **Efficiency**: Chunked transfer encoding is memory-efficient, especially for large files.
2. **Scalability**: This approach is suitable for streaming data in real-time applications.

