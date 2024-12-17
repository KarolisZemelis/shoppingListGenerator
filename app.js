const recipeForm = document.querySelector("[data-form]");
const addIngredientBtn = document.querySelector("[data-form-addIngredientBtn]");
const removeIngredientBtn = document.querySelector(
  "[data-form-removeIngredientBtn]"
);

const addIngredientRowTemplate = document.querySelector(
  "[data-form-ingredient]"
);

function rand(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

addIngredientBtn.addEventListener("click", () => {
  const addIngredientRow = addIngredientRowTemplate.content.cloneNode(true);
  recipeForm.appendChild(addIngredientRow);
});
