import submitRecipe from "./utils.js";
const recipeForm = document.querySelector("[data-form]");

const addIngredientBtn = document.querySelector("[data-form-addIngredientBtn]");
const removeIngredientBtn = document.querySelector(
  "[data-form-removeIngredientBtn]"
);
const recipeSubmitBtn = document.querySelector(
  "[data-form-submitIngredientBtn]"
);
const addIngredientRowTemplate = document.querySelector(
  "[data-form-ingredient]"
);

// const submitRecipe = (recipe) => {
//   fetch("http://localhost:3000/api/recipes", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(recipe),
//   })
//     .then((response) => {
//       if (response.ok) {
//         return response.json();
//       } else {
//         throw new Error("Failed to save the recipe.");
//       }
//     })
//     .then((data) => {
//       console.log(data.message);
//       window.location.reload(); // Force reload after successful submission
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

function formIngredientObject(ingredients) {
  let ingredientObject = []; // Array to hold all ingredient data

  ingredients.forEach((row) => {
    let ingredientName = row
      .querySelector("[data-form-ingredientName]")
      .value.trim();
    let ingredientCount = row
      .querySelector("[data-form-ingredientCount]")
      .value.trim();
    let ingredientUnit = row.querySelector("#ingredientSelect").value;

    // Create an object for this ingredient
    ingredientObject.push({
      name: ingredientName,
      count: ingredientCount,
      unit: ingredientUnit,
    });
  });

  return ingredientObject; // Return the array of ingredient objects
}

addIngredientBtn.addEventListener("click", () => {
  const addIngredientRow = addIngredientRowTemplate.content.cloneNode(true);
  recipeForm.appendChild(addIngredientRow);
});

recipeSubmitBtn.addEventListener("click", (_) => {
  const recipeName = document.querySelector("[data-form-name]").value;
  const recipeType = document.querySelector("[data-form-type]").value;
  const recipeCalories = document.querySelector("[data-form-calories]").value;
  const recipeIngredients = document.querySelectorAll(
    "[data-form-ingredientRow-container]"
  );

  let ingredients = formIngredientObject(recipeIngredients);

  let recipeObject = {
    name: recipeName,
    type: recipeType,
    calories: recipeCalories,
    ingredients: ingredients,
  };

  submitRecipe(recipeObject, "new"); // Call submitRecipe with the recipeObject
});
