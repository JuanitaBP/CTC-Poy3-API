export default class Display {
    constructor(moviesInfo, template, container) {
        this.moviesInfo = moviesInfo;
        this.template = template;
        this.container = container;
        this.fragment = new DocumentFragment();
        this.clone = this.template.cloneNode(true);
        this.card = this.template.querySelector(".card");
    }

    // Method to display default cards with movie details
    displayDefaultCards() {
        let moviesImg = this.moviesInfo[0];
        let moviesTitles = this.moviesInfo[1];

        let moviesPlots = this.moviesInfo[2];
        let moviesIDs = this.moviesInfo[3];


        const imgArray = this.getNewArray(moviesImg);
        const titleArray = this.getNewArray(moviesTitles);
        const plotArray = this.getNewArray(moviesPlots);
        const idArray = this.getNewArray(moviesIDs);



        this.container.forEach((row, i) => {
            i === 0 ? (moviesTitles = titleArray[0]) : (moviesTitles = titleArray[1]);
            i === 0 ? (moviesPlots = plotArray[0]) : (moviesPlots = plotArray[1]);
            i === 0 ? (moviesIDs = idArray[0]) : (moviesIDs = idArray[1]);

            imgArray[i].forEach((movie, j) => {
                this.card.children[0].setAttribute("src", `${movie}`);
                this.card.children[1].children[0].innerText = moviesTitles[j];
                this.card.children[1].children[1].innerText = moviesPlots[j];
                this.card.children[1].children[2].innerText = moviesIDs[j];


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
        newCardBody.children[1].innerText = movie.Plot;

        newCardBody.children[2].innerText = movie.imdbID;
        newCardBody.querySelector('.ver-mas').setAttribute("data-id", movie.imdbID); // Set the data-id attribute

    }

    clearMovies() {
        while (this.container.firstChild) {
            this.container.firstChild.remove();
        }
    }

    // Method to get new array for displaying in rows
    getNewArray(movies) {
        const left = movies;
        const right = left.splice(0, Math.ceil(left.length / 2));
        return [left, right];
    }
}