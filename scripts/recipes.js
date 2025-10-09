// ===== IMPORTING DATAS FROM JSON =====
let recipes = [];
fetch("../data.json")
  .then((response) => response.json())
  .then((data) => {
    recipes = data;
    console.log(recipes);
  });

const prepTime = document.querySelector(".prep-time-menu-title");

prepTime.addEventListener("click", () => {
   document.querySelector('.prep-time-menu').classList.toggle('visible');
});
