const recipeBoxTemplate = document.querySelector("[data-render-recipe]");
const recipeContainers = document.querySelectorAll("[data-recipe-container]");

const editRecipe = (recipe, name, type, calories, ingredients) => {
  name.innerHTML = `<input type="text" name="ingredientName" value=${recipe.name} data-form-ingredientName />`;
  type.innerHTML = `
  <select name="recipeType" id="recipeType" data-form-type>
    <option value="pusryčiai" ${
      recipe.type === "pusryčiai" ? "selected" : ""
    }>Pusryčiai</option>
    <option value="pietūs" ${
      recipe.type === "pietūs" ? "selected" : ""
    }>Pietūs</option>
    <option value="užkandis" ${
      recipe.type === "užkandis" ? "selected" : ""
    }>Užkandis</option>
    <option value="vakarinė" ${
      recipe.type === "vakarinė" ? "selected" : ""
    }>Vakarienė</option>
  </select>`;
  calories.innerHTML = `<input type="number" name="recipeCalories" value=${recipe.calories} data-form-calories />`;
  ingredients.forEach((ingredient) => {
    let ingredientId = ingredient.id;
    console.log(recipe);
    ingredient.innerHTML = `      <div data-form-ingredientRow-container>
       
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
        let name = recipeCard.querySelector("[data-recipe-name]");
        let type = recipeCard.querySelector("[data-recipe-type]");
        let calories = recipeCard.querySelector("[data-recipe-calories]");
        let ingredients = recipeCard.querySelectorAll(
          "[data-ingredient-container] div"
        );

        editRecipe(recipe, name, type, calories, ingredients);
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
