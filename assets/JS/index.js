import Cards from "./tarjetas.js";
import Checker from "./checker.js";
import Carousel from "./carrusel.js";

window.addEventListener("DOMContentLoaded", () => {
    const submitBtn = document.querySelector(".btn-search");

    const cards = new Cards();
    const carousel = new Carousel();

    carousel.showCarouselInfo();
    cards.getMoviesExample();

    //cuando el usuario haga click recibe un elemento e
    submitBtn.addEventListener("click", (e) => {
        e.preventDefault();//
        const checker = new Checker();//nueva clase
        checker.verifyInput();
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn-ver-mas');
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const movieId = event.target.getAttribute('data-id');
            window.location.href = `cardSelect.html?id=${movieId}`;
        });
    });
});