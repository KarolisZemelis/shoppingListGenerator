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

addIngredientBtn.addEventListener("click", () => {
  const addIngredientRow = addIngredientRowTemplate.content.cloneNode(true);
  recipeForm.appendChild(addIngredientRow);
});
let recipeList = {};
recipeSubmitBtn.addEventListener("click", (_) => {
  const recipeName = document.querySelector("[data-form-name]").value;
  const recipeCalories = document.querySelector("[data-form-calories]").value;
  let recipeObject = { calories: recipeCalories };
  recipeList[recipeName] = recipeObject;
  console.log(recipeList);
});
