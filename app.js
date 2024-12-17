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
let recipeObject = {};

addIngredientBtn.addEventListener("click", () => {
  const addIngredientRow = addIngredientRowTemplate.content.cloneNode(true);
  recipeForm.appendChild(addIngredientRow);
});

recipeSubmitBtn.addEventListener("click", (_) => {
  const recipeName = document.querySelector("[data-form-name]").value;
  console.log(recipeName);
  const recipeCalories = document.querySelector("[data-form-calories]").value;
  console.log(recipeCalories);
  recipeObject[recipeName] += recipeCalories;
  console.log(recipeObject);
});
