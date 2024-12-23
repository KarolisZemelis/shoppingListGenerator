const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs"); // For basic file-based storage (optional)

const app = express();
const port = 3000;
// Serve static files from the "public" directory
app.use(express.static("public"));

// Middleware to parse JSON
app.use(bodyParser.json());

// Endpoint to receive recipe data
app.post("/api/recipes", (req, res) => {
  const recipe = req.body;

  // Save recipe (for now, write to a file or just log it)
  fs.appendFileSync("recipes.json", JSON.stringify(recipe) + "\n");
  res.status(201).send({ message: "Recipe saved successfully!" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
