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
function formIngredients(ingredients) {
  let ingredientObject = [];
  ingredients.forEach((row) => {
    let ingredientName = row
      .querySelector("[data-form-ingredientName]")
      .value.trim();
    let ingredientCount = row
      .querySelector("[data-form-ingredientCount]")
      .value.trim();
    let ingredientUnit = row.querySelector("#ingredientSelect").value;
    ingredientObject.push(ingredientName);
    ingredientObject.push(ingredientCount);
    ingredientObject.push(ingredientUnit);
    return ingredientObject;
  });
}

addIngredientBtn.addEventListener("click", () => {
  const addIngredientRow = addIngredientRowTemplate.content.cloneNode(true);
  recipeForm.appendChild(addIngredientRow);
});

recipeSubmitBtn.addEventListener("click", (_) => {
  const recipeName = document.querySelector("[data-form-name]").value;
  const recipeCalories = document.querySelector("[data-form-calories]").value;
  const recipeIngredients = document.querySelectorAll(
    "[data-form-ingredientRow-container]"
  );
  formIngredients(recipeIngredients);
  let recipeObject = { calories: recipeCalories };

  recipeList[recipeName] = recipeObject;
});
