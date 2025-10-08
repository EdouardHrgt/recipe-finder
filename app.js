const burger = document.getElementById('burger');
const menu = document.getElementById('toggle-menu');

burger.addEventListener('click',()=> {
    if (menu.style.display === 'none') {
        menu.style.display = 'flex';
    } else {
        menu.style.display = 'none';
    }
})