const express = require("express");
const app = express();
const PORT = 5000;
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

// Serve the HTML file for all routes
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
