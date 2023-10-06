const express = require('express');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public')); // Serve static files from the 'public' directory

app.get('/', (req, res) => {
  // Read the HTML file
  const htmlFilePath = 'public/scripts/discuss.html'; // Update the path to your HTML file
  const htmlContent = fs.readFileSync(htmlFilePath, 'utf8');

  // Read the CSV file
  const csvFilePath = 'Data/Discussions.csv'; // Update the path to your CSV file
  const csvLines = fs.readFileSync(csvFilePath, 'utf8').trim().split('\n');

  // Regular expression to match all <h2> elements in the HTML file
  const h2Regex = /<h2>([\s\S]*?)<\/h2>/g;

  // Find all <h2> elements in the HTML file
  const h2Matches = htmlContent.match(h2Regex);

  // Initialize and update the HTML content directly
  const updatedHtmlContent = htmlContent.split('\n').map((line, index) => {
    if (h2Matches[index] && csvLines[index]) {
      return line.replace(h2Matches[index], `<h2>${csvLines[index]}</h2>`);
    }
    return line;
  }).join('\n');

  res.send(updatedHtmlContent);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
