let recipes = [];
let selectedRecipe ={};
const recipesGrid = document.querySelector(".recipes-grid");

fetch("../data.json")
  .then((response) => response.json())
  .then((data) => {
    recipes = data;
    recipes.forEach((recipe) => {
      createRecipeCard(recipe);
    });

    const recipeBtns = document.querySelectorAll(".recipe-view");

    recipeBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        selectedRecipe = recipes.find((recipe) => +recipe.id === +btn.dataset.id );
        localStorage.setItem('recipe', JSON.stringify(selectedRecipe));
        window.location.href = "recipe.html";
      });
    });
  });

let userSettings = { prepTime: null, maxCookTime: null, search: null };

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
      const value = btn.dataset.value;

      menu
        .querySelectorAll(".inner-val-circle.active-border")
        .forEach((circle) => {
          circle.classList.remove("active-border");
        });

      if (value !== "-1") {
        btn.querySelector(".inner-val-circle")?.classList.add("active-border");
        userSettings[settingsKey] = value;
        setTimeout(() => menu.classList.remove("visible"), 900);
      } else {
        userSettings[settingsKey] = null;
      }

      console.log(`${settingsKey} = ${userSettings[settingsKey]}`);
    });
  });
}

setupTimeMenu(".prep-time-menu-wrapper", "prepTime");
setupTimeMenu(".cooking-time-wrapper", "maxCookTime");

function createRecipeCard(recipe) {
  recipesGrid.innerHTML += `
          <div class="recipe-wrapper">
          <img class="recipe-img-lg" src="../assets/images${recipe.image.large}" alt="${recipe.overview}">
          <img class="recipe-img-small" src="../assets/images${recipe.image.large}" alt="${recipe.overview}">
          <p class="recipe-title"><strong class="tp-5">${recipe.title}</strong></p>
          <p class="recipe-detail tp-9">${recipe.overview}</p>
          <div class="recipe-infos">
            <div class="recipe-info">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                <path fill="#163A34" fill-rule="evenodd"
                  d="M9.76 10.595c2.08 0 3.76-1.68 3.76-3.76.08-2.08-1.6-3.76-3.76-3.76-2.08 0-3.76 1.68-3.76 3.76s1.68 3.76 3.76 3.76ZM15.28 15.636c-.24-.88-.72-1.68-1.68-2.32-.8-.56-2.08-.96-3.84-.96-3.44 0-5.12 1.6-5.6 3.28-.16.48.08.96.48 1.2 1.44.96 3.2 1.44 5.12 1.44 1.84 0 3.6-.56 5.04-1.44.4-.24.64-.72.48-1.2Z"
                  clip-rule="evenodd" />
              </svg>
              <p class="recipe-info-txt tp-9">Servings: ${recipe.servings}</p>
            </div>
            <div class="recipe-info recipe-info-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20">
                <path fill="#163A34" fill-rule="evenodd"
                  d="M13.002 13.088a.618.618 0 0 1-.859.216l-2.275-1.366a.616.616 0 0 1-.308-.534V8.463a.624.624 0 1 1 1.25 0v2.583l1.975 1.192c.3.175.4.558.217.85Zm-2.675-8.892a6.658 6.658 0 0 0-6.65 6.65 6.658 6.658 0 0 0 6.65 6.65 6.658 6.658 0 0 0 6.65-6.65 6.658 6.658 0 0 0-6.65-6.65ZM5.864 3.669a.624.624 0 1 0-.657-1.064A9.665 9.665 0 0 0 2.316 5.36a.625.625 0 0 0 1.032.705 8.422 8.422 0 0 1 2.516-2.396ZM18.349 5.36a9.613 9.613 0 0 0-2.901-2.764.626.626 0 0 0-.654 1.066 8.351 8.351 0 0 1 2.522 2.402.623.623 0 0 0 .868.164.625.625 0 0 0 .165-.868Z"
                  clip-rule="evenodd" />
              </svg>
              <p class="recipe-info-txt tp-9">Prep: ${recipe.prepMinutes} mins</p>
            </div>
            <div class="recipe-info">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                <path fill="#163A34"
                  d="M7.222 2.097a.625.625 0 1 0-.884.884.37.37 0 0 1 0 .524 1.621 1.621 0 0 0 0 2.293.625.625 0 1 0 .883-.884.37.37 0 0 1 0-.525 1.62 1.62 0 0 0 0-2.292ZM15.461 4.906a.625.625 0 1 0-.883-.884 1.62 1.62 0 0 0 0 2.293.625.625 0 0 0 .883-.885.37.37 0 0 1 0-.524ZM3.503 5.43a.625.625 0 0 0-.884.884.37.37 0 0 1 0 .524.625.625 0 0 0 .884.885 1.62 1.62 0 0 0 0-2.293Z" />
                <path fill="#163A34" fill-rule="evenodd"
                  d="M10 5.218c-.955 0-1.727.774-1.727 1.728v.568c-3.156.669-5.525 3.129-5.347 6.095.013.22.195.392.416.392h13.316c.22 0 .403-.172.416-.392.178-2.966-2.192-5.426-5.347-6.095v-.568c0-.954-.774-1.728-1.727-1.728Zm.477 2.13v-.402a.478.478 0 1 0-.954 0v.401a8.45 8.45 0 0 1 .954 0Z"
                  clip-rule="evenodd" />
                <path fill="#163A34"
                  d="M2.332 15.07a.915.915 0 0 1 .585-.188h14.166c.21 0 .417.053.585.188a.84.84 0 0 1 .29.488c.07.32-.01.684-.106.972a1.974 1.974 0 0 1-1.872 1.349H4.02a1.973 1.973 0 0 1-1.872-1.349c-.096-.288-.175-.651-.106-.972a.84.84 0 0 1 .29-.488Z" />
              </svg>
              <p class="recipe-info-txt tp-9">Cook: ${recipe.cookMinutes} min</p>
            </div>
          </div>
          <button class="recipe-view tp-8" data-id="${recipe.id}">View Recipe</button>
        </div>`;
}
