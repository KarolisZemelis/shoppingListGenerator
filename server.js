const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Path to the JSON file where recipes are stored
const filePath = path.join(__dirname, "recipes.json");

// Middleware to parse JSON bodies
app.use(express.json());

// Handle root route to serve the index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html")); // Serve index.html
});

// Endpoint to add a new recipe
app.post("/api/recipes", (req, res) => {
  const newRecipe = req.body;

  // Read the existing JSON file
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return res.status(500).send({ message: "Server error" });
    }

    let recipes = [];
    if (data) {
      try {
        recipes = JSON.parse(data); // Parse the existing data
      } catch (err) {
        console.error("Error parsing JSON:", err);
        return res.status(500).send({ message: "Invalid JSON format" });
      }
    }

    // Append the new recipe to the array
    recipes.push(newRecipe);

    // Write the updated array back to the file
    fs.writeFile(filePath, JSON.stringify(recipes, null, 2), (err) => {
      if (err) {
        console.error("Error writing to the file:", err);
        return res.status(500).send({ message: "Could not save recipe" });
      }

      res.status(201).send({ message: "Recipe saved successfully!" });
    });
  });
});

// Endpoint to fetch all recipes
app.get("/api/recipes", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return res.status(500).send({ message: "Server error" });
    }

    try {
      const recipes = JSON.parse(data) || [];
      res.status(200).send(recipes);
    } catch (err) {
      console.error("Error parsing JSON:", err);
      res.status(500).send({ message: "Invalid JSON format" });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
