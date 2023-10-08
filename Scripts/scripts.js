const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000; // You can change the port if needed

app.use(express.static('html')); // Serve the static HTML file

app.get('/', (req, res) => {
   const txtFilePath = path.join(__dirname, 'txt', 'life.txt');
   const fileContents = fs.readFileSync(txtFilePath, 'utf-8');
   const lines = fileContents.trim().split('\n');

   res.send(lines);
});

app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});

