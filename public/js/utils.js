const submitRecipe = (recipe, argument) => {
  if (argument === "new") {
    fetch("http://localhost:3000/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to save the recipe.");
        }
      })
      .then((data) => {
        console.log(data.message);
        window.location.reload(); // Force reload after successful submission
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    console.log("tureciau buti else");
    fetch("http://localhost:3000/api/recipesUpdate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to save the recipe.");
        }
      })
      .then((data) => {
        console.log(data.message);
        window.location.reload(); // Force reload after successful submission
      })
      .catch((error) => {
        console.error(error);
      });
  }
};

export default submitRecipe;
