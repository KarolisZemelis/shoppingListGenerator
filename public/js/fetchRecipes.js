const recipeBoxTemplate = document.querySelector("[data-render-recipe]");
const recipeContainers = document.querySelectorAll("[data-recipe-container]");
const recipeList = document.getElementById("recipe-list");

async function getData() {
  try {
    const response = await fetch("/api/recipes");
    const recipes = await response.json();
    return recipes;
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
}

function renderRecipeBox(recipe) {
  const addRecipeBox = recipeBoxTemplate.content.cloneNode(true);
  addRecipeBox.querySelector("[data-recipe-name]").textContent = recipe.name;
  addRecipeBox.querySelector("[data-recipe-type]").textContent = recipe.type;
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
    let name = recipeCard.querySelector("[data-recipe-name]");
    let type = recipeCard.querySelector("[data-recipe-type]");
    let calories = recipeCard.querySelector("[data-recipe-calories]");
    let ingredients = recipeCard.querySelectorAll(
      "[data-ingredient-container] div"
    );

    editRecipe(recipe, type, calories, ingredients, editButton);
  });

  deleteButton.addEventListener("click", () => {
    console.log(`Deleting recipe: ${recipe.name}`);
    // addedRecipe.remove(); // Example: Remove the recipe from the DOM
  });
}

const renderRecipes = async () => {
  recipeList.innerHTML = ""; // Clear previous recipes

  const recipes = await getData();
  recipes.forEach((recipe) => {
    renderRecipeBox(recipe);
  });
};

document.addEventListener("DOMContentLoaded", renderRecipes);

const submitEditedRecipe = async (newRecipe) => {
  const recipes = await getData();
  console.log("iš jasono", recipes);
  console.log("naujas recipe", newRecipe);
};

const createInput = (type, name, value, dataAttr) => {
  return `<input type="${type}" name="${name}" value="${value}" ${dataAttr} />`;
};

const createSelect = (name, id, options, selectedValue, dataAttr) => {
  return `
    <select name="${name}" id="${id}" ${dataAttr}>
      ${options
        .map(
          (option) =>
            `<option value="${option}" ${
              option === selectedValue ? "selected" : ""
            }>${option.charAt(0).toUpperCase() + option.slice(1)}</option>`
        )
        .join("")}
    </select>`;
};

const updateIngredients = (ingredients, recipeIngredients) => {
  ingredients.forEach((ingredient) => {
    const ingredientId = ingredient.id;
    const { name, count, unit } = recipeIngredients[ingredientId];
    ingredient.innerHTML = `
      <div data-form-ingredientRow-container>
        ${createInput(
          "text",
          "ingredientName",
          name,
          "data-form-ingredientName"
        )}
        ${createInput(
          "number",
          "ingredientCount",
          count,
          "data-form-ingredientCount"
        )}
        ${createSelect(
          "ingredientSelect",
          "ingredientSelect",
          ["g", "vnt", "ml"],
          unit,
          "data-form-unit"
        )}
        <button
          type="button"
          onclick="this.parentNode.remove();"
          data-form-removeIngredientBtn
        >
          Remove
        </button>
      </div>`;
  });
};

const replaceButton = (oldButton, newButtonText, onClickHandler) => {
  const newButton = document.createElement("button");
  newButton.id = "saveButton";
  newButton.innerText = newButtonText;
  oldButton.parentNode.replaceChild(newButton, oldButton);
  newButton.addEventListener("click", onClickHandler);
};

const editRecipe = (recipe, type, calories, ingredients, editButton) => {
  type.innerHTML = createSelect(
    "recipeType",
    "newRecipeType",
    ["pusryčiai", "pietūs", "užkandis", "vakarienė"],
    recipe.type,
    "data-form-type"
  );

  calories.innerHTML = createInput(
    "number",
    "recipeCalories",
    recipe.calories,
    "data-form-newCalories"
  );

  updateIngredients(ingredients, recipe.ingredients);

  replaceButton(editButton, "Save", () => {
    const newRecipeType = document.getElementById("newRecipeType").value;
    const newRecipeCalories = document.querySelector(
      "[data-form-newCalories]"
    ).value;
    const newRecipeIngredients = document.querySelectorAll(
      "[data-form-ingredientrow-container]"
    );

    const updatedRecipeObject = {
      name: recipe.name,
      type: newRecipeType,
      calories: newRecipeCalories,
      ingredients: [],
    };
    newRecipeIngredients.forEach((element) => {
      let ingredientObject = {};
      ingredientObject.name = element.querySelector(
        "[data-form-ingredientname]"
      ).value;
      ingredientObject.count = element.querySelector(
        "[data-form-ingredientcount]"
      ).value;
      ingredientObject.unit = element.querySelector("[data-form-unit]").value;
      updatedRecipeObject.ingredients.push(ingredientObject);
    });
    submitEditedRecipe(updatedRecipeObject);
  });
};
