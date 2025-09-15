const express = require('express');
const app = express();
const PORT = 3000;

// Serve the frontend folder
app.use(express.static(__dirname + '/frontend'));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
