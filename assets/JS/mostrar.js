export default class Display {
    constructor(moviesInfo, template, container) {
        this.moviesInfo = moviesInfo;
        this.template = template;
        this.container = container;
        this.fragment = new DocumentFragment();
        this.clone = this.template.cloneNode(true);
        this.card = this.template.querySelector(".card");
    }

    //metodo que pone las img con sus titulos
    displayDefaultCards() {
        let moviesImg = this.moviesInfo[0];
        let moviesTitles = this.moviesInfo[1];
        


        const imgArray = this.getNewArray(moviesImg);
        const titleArray = this.getNewArray(moviesTitles);



        this.container.forEach((row, i) => {
            i === 0 ? (moviesTitles = titleArray[0]) : (moviesTitles = titleArray[1]);

            imgArray[i].forEach((movie, i) => {
                this.card.children[0].setAttribute("src", `${movie}`);
                this.card.children[1].children[0].innerText = moviesTitles[i];
                // this.card.children[2].children[1].innerText = moviesInfo[i];
console.log(moviesTitles);

                this.clone = this.template.cloneNode(true);
                this.fragment.appendChild(this.clone);
            });

            row.appendChild(this.fragment);
        });
    }

    displayUserCards() {
        this.clearMovies();
        this.filteruserCards();
    }

    filteruserCards() {
        const sliceMovies = this.moviesInfo.slice(0, 6);

        sliceMovies.forEach((movie, i) => {
            this.card.id = `${i}`;

            this.assignInfo(movie);
            console.log(movie)
            this.clone = this.template.cloneNode(true);
            this.fragment.appendChild(this.clone);
        });

        this.container.appendChild(this.fragment);
        this.container.style.display = "flex";
    }

    assignInfo(movie) {
        const newCardImg = this.card.children[0];
        const newCardBody = this.card.children[1];


        newCardImg.setAttribute("src", `${movie.Poster}`);
        newCardBody.children[0].innerText = movie.Title;
        newCardBody.children[1].innerText = movie.Year;
        console.log(newCardBody.children[1].innerText)
    }

    clearMovies() {
        while (this.container.firstChild) {
            this.container.firstChild.remove();
        }
    }

    
    //obtener la mitdad del arreglo para mostrar en una fila 
    getNewArray(movies) {
        const left = movies;
        const right = left.splice(0, Math.ceil(left.length / 2));
        return [left, right];
    }
}
