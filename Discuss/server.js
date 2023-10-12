const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000; // You can choose any available port

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'NewPosts.html')); // Replace 'your-html-file.html' with your actual HTML file's name
});

app.post('/save', (req, res) => {
  const { 'post-title': postTitle, 'post-description': postDescription } = req.body;

  // Combine title and description in the desired format
  const postText = `${postTitle} | ${postDescription}\n`;

  // Append the data to a hardcoded text file (posts.txt)
  fs.appendFile('posts.txt', postText, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error while saving the post.');
    } else {
      console.log('Post saved successfully.');
      res.redirect('/discuss.html'); // Redirect to the discuss.html page
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
