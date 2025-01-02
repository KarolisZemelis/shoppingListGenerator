const recipeBoxTemplate = document.querySelector("[data-render-recipe]");
const recipeContainers = document.querySelectorAll("[data-recipe-container]");

const submitSavedRecipe = () => {};

const editRecipe = (recipe, name, type, calories, ingredients, editButton) => {
  name.innerHTML = `<input type="text" name="recipeName" value=${recipe.name} data-form-newRecipeName />`;
  type.innerHTML = `
  <select name="recipeType" id="newRecipeType" data-form-type>
    <option value="pusryčiai" ${
      recipe.type === "pusryčiai" ? "selected" : "1"
    }>Pusryčiai</option>
    <option value="pietūs" ${
      recipe.type === "pietūs" ? "selected" : "2"
    }>Pietūs</option>
    <option value="užkandis" ${
      recipe.type === "užkandis" ? "selected" : "3"
    }>Užkandis</option>
    <option value="vakarienė" ${
      recipe.type === "vakarienė" ? "selected" : "4"
    }>Vakarienė</option>
  </select>`;
  calories.innerHTML = `<input type="number" name="recipeCalories" value=${recipe.calories} data-form-newCalories />`;
  ingredients.forEach((ingredient) => {
    let ingredientId = ingredient.id;
    ingredient.innerHTML = `<div data-form-ingredientRow-container>
        <input type="text" name="ingredientName" value=${
          recipe.ingredients[ingredientId].name
        } data-form-ingredientName />
        <input type="number" name="ingredientCount" value=${
          recipe.ingredients[ingredientId].count
        } data-form-ingredientCount />
        <select name="ingredientSelect" id="ingredientSelect" data-form-unit>
          <option value="g" ${
            recipe.ingredients[ingredientId].unit === "g" ? "selected" : ""
          }>G</option>
          <option value="vnt" ${
            recipe.ingredients[ingredientId].unit === "vnt" ? "selected" : ""
          }>VNT</option>
          <option value="ml" ${
            recipe.ingredients[ingredientId].unit === "ml" ? "selected" : ""
          }>ML</option>
        </select>
        <button
          type="button"
          onclick="return this.parentNode.remove();"
          data-form-removeIngredientBtn
        >
          Remove
        </button>
      </div>`;
  });

  const saveButton = document.createElement("button");
  saveButton.id = "saveButton";
  saveButton.innerText = "Save";

  editButton.parentNode.replaceChild(saveButton, editButton);
  saveButton.addEventListener("click", (event) => {
    const newRecipeName = document.querySelector(
      "[data-form-newRecipeName]"
    ).value;
    const newRecipeType = document.getElementById("newRecipeType").value;
    const newRecipeCalories = document.querySelector(
      "[data-form-newCalories]"
    ).value;
    console.log(newRecipeType);
    console.log(newRecipeCalories);
    console.log(newRecipeName);
    submitSavedRecipe();
  });
};

async function fetchRecipes() {
  try {
    const response = await fetch("/api/recipes");
    const recipes = await response.json();
    const recipeList = document.getElementById("recipe-list");
    recipeList.innerHTML = ""; // Clear previous recipes

    recipes.forEach((recipe) => {
      const addRecipeBox = recipeBoxTemplate.content.cloneNode(true);
      addRecipeBox.querySelector("[data-recipe-name]").textContent =
        recipe.name;
      addRecipeBox.querySelector("[data-recipe-type]").textContent =
        recipe.type;
      console.log(recipe);
      addRecipeBox.querySelector("[data-recipe-calories]").textContent =
        recipe.calories;
      let ingredientList = addRecipeBox.querySelector(
        "[data-ingredient-container]"
      );
      const editButton = addRecipeBox.querySelector("[data-edit-button]");
      const deleteButton = addRecipeBox.querySelector("[data-delete-button]");

      for (i = 0; i <= recipe.ingredients.length - 1; i++) {
        let ingredientRow = document.createElement("div");
        ingredientRow.className = "ingredientRow";
        ingredientRow.id = i;
        for (const [key, value] of Object.entries(recipe.ingredients[i])) {
          let ingredient = document.createElement("p");
          ingredient.innerHTML += ` ${value}`;
          ingredientRow.appendChild(ingredient);
        }
        ingredientList.appendChild(ingredientRow);
        recipeList.appendChild(addRecipeBox);
      }

      editButton.addEventListener("click", () => {
        let recipeCard = editButton.parentElement.parentElement;
        console.log(recipeCard);
        let name = recipeCard.querySelector("[data-recipe-name]");
        let type = recipeCard.querySelector("[data-recipe-type]");
        let calories = recipeCard.querySelector("[data-recipe-calories]");
        let ingredients = recipeCard.querySelectorAll(
          "[data-ingredient-container] div"
        );

        editRecipe(recipe, name, type, calories, ingredients, editButton);
      });

      deleteButton.addEventListener("click", () => {
        console.log(`Deleting recipe: ${recipe.name}`);
        // addedRecipe.remove(); // Example: Remove the recipe from the DOM
      });
    });
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchRecipes);
