import Display from "./mostrar.js";
import Checker from "./checker.js";

// export default class Request {
//     constructor() {
//         this.template = document.querySelector(".card-template").content;
//     }

//     async getInfo(inputValue) {
//         try {
//             const url = `http://www.omdbapi.com/?s=${inputValue}&apikey=7a09e7f`;
//             const response = await fetch(url);
//             const json = await response.json();

//             const container = document.querySelector(".new-row");

//             const display = new Display(json.Search, this.template, container);
//             display.displayUserCards();
//         } catch (error) {
//             const checker = new Checker();
//             checker.getErrorContainer("Película no encontrada!");
//         }
//     }

//     //obtener la información de las películas 
//     getMultipleInfo(moviesName) {
//         const moviesInfo = [[], [], []];//arreglo que guarda las rutas de las img, en el otro los nombres
//         const result = moviesName.map((item) => {
//             //retorna un arreglo de promesas 
//             return new Promise(async (resolve) => {
//                 try {
//                     const url = `http://www.omdbapi.com/?t=${item}&apikey=7a09e7f`; //API
//                     const response = await fetch(url);
//                     const json = await response.json();

//                     moviesInfo[0].push(json.Poster);//guarda el poster
//                     moviesInfo[1].push(json.Title);//guarda el título



//                     moviesInfo[2].push(json.Plot); //GUARDA LA DESCRIPCIÓN

//                     resolve();
//                 } catch (error) {
//                     console.log(error);
//                 }
//             });
//         });

        
//         Promise.all(result).then(() => {
//             const container = document.querySelectorAll(".default-row");//para las tarjetas 
//             const display = new Display(moviesInfo, this.template, container);
//             display.displayDefaultCards();
//         });
//     }
// }



export default class Request {
    constructor() {
        this.template = document.querySelector(".card-template").content;
    }

    async getInfo(inputValue) {
        try {
            const url = `http://www.omdbapi.com/?s=${inputValue}&apikey=7a09e7f`;
            const response = await fetch(url);
            const json = await response.json();

            const container = document.querySelector(".new-row");

            if (json.Search) {
                const display = new Display(json.Search, this.template, container);
                display.displayUserCards();
            } else {
                throw new Error("Película no encontrada!");
            }
        } catch (error) {
            console.error("Error al buscar películas:", error);
            const checker = new Checker();
            checker.getErrorContainer("Película no encontrada!");
        }
    }

    async getMultipleInfo(moviesName) {
        const moviesInfo = {
            posters: [],
            titles: [],
            plots: []
        };

        const promises = moviesName.map(async (item) => {
            try {
                const url = `http://www.omdbapi.com/?t=${item}&apikey=7a09e7f`;
                const response = await fetch(url);
                const json = await response.json();

                moviesInfo.posters.push(json.Poster);
                moviesInfo.titles.push(json.Title);
                moviesInfo.plots.push(json.Plot);

            } catch (error) {
                console.error(`Error al obtener información de ${item}:`, error);
            }
        });

        try {
            await Promise.all(promises);

            const containers = document.querySelectorAll(".default-row");
            const display = new Display([moviesInfo.posters, moviesInfo.titles, moviesInfo.plots], this.template, containers);
            display.displayDefaultCards();

        } catch (error) {
            console.error("Error al obtener información de las películas:", error);
        }
    }
}