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
let recipeList = {};

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
    type: recipeType,
    calories: recipeCalories,
    ingredients: ingredients,
  };
  recipeList[recipeName] = recipeObject;
});
console.log(recipeList);
