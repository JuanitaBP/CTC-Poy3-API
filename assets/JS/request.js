import Display from "./mostrar.js";
import Checker from "./checker.js";

export default class Request {
    constructor() {
        this.template = document.querySelector(".card-template").content;
    }

    async getInfo(inputValue) {
        try {
            const url = `http://www.omdbapi.com/?s=${inputValue}&apikey=7a09e7f`;
            const response = await fetch(url)
            const json = await response.json();

            const container = document.querySelector(".new-row");

            const display = new Display(json.Search, this.template, container);
            display.displayUserCards();
        } catch (error) {
            const checker = new Checker();
            checker.getErrorContainer("Película no encontrada!");
        }
    }


    //obtener la información de las películas 
    async getMultipleInfo(moviesName) {
        const moviesInfo = [[], [], [], []]; // Array to store poster, title, plot, and imdbID
        const result = moviesName.map((item) => {
            return new Promise(async (resolve) => {
                try {
                    const url = `http://www.omdbapi.com/?t=${item}&apikey=7a09e7f`; // API
                    const response = await fetch(url)
                    const json = await response.json();

                    moviesInfo[0].push(json.Poster);   // Store the poster
                    moviesInfo[1].push(json.Title);    // Store the title
                    moviesInfo[2].push(json.Plot);     // Store the plot
                    moviesInfo[3].push(json.imdbID);   // Store the IMDb ID

                    resolve();
                } catch (error) {
                    console.log(error);
                }
            });
        });

        
        Promise.all(result).then(() => {
            const container = document.querySelectorAll(".default-row");//para las tarjetas 
            const display = new Display(moviesInfo, this.template, container);
            display.displayDefaultCards();
        });
    }
}
