let recipes = [];

fetch("../data.json")
  .then((response) => response.json())
  .then((data) => {
    recipes = data;
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

      menu.querySelectorAll(".inner-val-circle.active-border").forEach((circle) => {
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

