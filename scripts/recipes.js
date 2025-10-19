let recipes = [];
let selectedRecipe = {};
const recipesGrid = document.querySelector(".recipes-grid");

fetch("../data.json")
  .then((response) => response.json())
  .then((data) => {
    recipes = data;
    renderRecipes(recipes);
    setupRecipeButtons();
  });

let userSettings = { prepTime: null, maxCookTime: null, search: "" };

// === CONFIGURATION DES MENUS DE TEMPS ===
function setupTimeMenu(wrapperSelector, settingsKey) {
  const wrapper = document.querySelector(wrapperSelector);
  if (!wrapper) return;

  const title = wrapper.querySelector("div[class$='-menu-title']");
  const menu = wrapper.querySelector("div[class$='-menu']");
  const buttons = menu.querySelectorAll("button");

  title.addEventListener("click", () => {
    menu.classList.toggle("visible");
  });

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const value = parseInt(btn.dataset.value);

      // Reset les cercles actifs
      menu.querySelectorAll(".inner-val-circle.active-border")
        .forEach((circle) => circle.classList.remove("active-border"));

      if (value !== -1) {
        btn.querySelector(".inner-val-circle")?.classList.add("active-border");
        userSettings[settingsKey] = value;
        setTimeout(() => menu.classList.remove("visible"), 900);
      } else {
        userSettings[settingsKey] = null;
      }

      applyFilters();
    });
  });
}

setupTimeMenu(".prep-time-menu-wrapper", "prepTime");
setupTimeMenu(".cooking-time-wrapper", "maxCookTime");

// === GESTION DU CHAMP DE RECHERCHE ===
const searchInput = document.querySelector("#ingredient");
searchInput.addEventListener("input", (e) => {
  userSettings.search = e.target.value.trim().toLowerCase();
  applyFilters();
});

// === FILTRAGE DES RECETTES ===
function applyFilters() {
  let filtered = [...recipes];

  // Filtrer par temps de préparation
  if (userSettings.prepTime !== null) {
    filtered = filtered.filter(r => r.prepMinutes <= userSettings.prepTime);
  }

  // Filtrer par temps de cuisson
  if (userSettings.maxCookTime !== null) {
    filtered = filtered.filter(r => r.cookMinutes <= userSettings.maxCookTime);
  }

  // Filtrer par recherche texte
  if (userSettings.search) {
    filtered = filtered.filter(r =>
      r.title.toLowerCase().includes(userSettings.search) ||
      r.overview.toLowerCase().includes(userSettings.search) ||
      (r.ingredients && r.ingredients.some(i =>
        i.toLowerCase().includes(userSettings.search)
      ))
    );
  }

  renderRecipes(filtered);
  setupRecipeButtons();
}

// === AFFICHAGE DES RECETTES ===
function renderRecipes(list) {
  recipesGrid.innerHTML = "";
  if (list.length === 0) {
    recipesGrid.innerHTML = "<p class='no-results'>No recipes found 😢</p>";
    return;
  }

  list.forEach((recipe) => createRecipeCard(recipe));
}

// === CRÉATION D’UNE CARTE RECETTE ===
function createRecipeCard(recipe) {
  recipesGrid.innerHTML += `
    <div class="recipe-wrapper">
      <img class="recipe-img-lg" src="../assets/images${recipe.image.large}" alt="${recipe.overview}">
      <img class="recipe-img-small" src="../assets/images${recipe.image.small}" alt="${recipe.overview}">
      <p class="recipe-title"><strong class="tp-5">${recipe.title}</strong></p>
      <p class="recipe-detail tp-9">${recipe.overview}</p>
      <div class="recipe-infos">
        <div class="recipe-info">
          <p class="recipe-info-txt tp-9">Servings: ${recipe.servings}</p>
        </div>
        <div class="recipe-info recipe-info-2">
          <p class="recipe-info-txt tp-9">Prep: ${recipe.prepMinutes} mins</p>
        </div>
        <div class="recipe-info">
          <p class="recipe-info-txt tp-9">Cook: ${recipe.cookMinutes} mins</p>
        </div>
      </div>
      <button class="recipe-view tp-8" data-id="${recipe.id}">View Recipe</button>
    </div>`;
}

// === GESTION DU BOUTON "VIEW RECIPE" ===
function setupRecipeButtons() {
  const recipeBtns = document.querySelectorAll(".recipe-view");
  recipeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedRecipe = recipes.find(r => +r.id === +btn.dataset.id);
      localStorage.setItem("RECIPE", JSON.stringify(selectedRecipe));
      const recommended = [...recipes]
        .filter((r) => r.id !== selectedRecipe.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      localStorage.setItem("RECOMMENDED", JSON.stringify(recommended));
      window.location.href = "recipe.html";
    });
  });
}
