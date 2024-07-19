async function loadMovieDetails(event) {
    console.log("EVENT " + event);
    event.preventDefault();

    const element = event.target;
    const imdbID = element.getAttribute("data-id");
    console.log("ID " + imdbID);
    localStorage.setItem("imdbID", imdbID);
    window.location.href = "./assets/HTML/cardSelect.html";

    try {
        const url = `http://www.omdbapi.com/?i=${imdbID}&apikey=7a09e7f`;
        const response = await fetch(url)
        const movieDetails = await response.json();
        console.log("movieDetails " + movieDetails);
        displayMovieDetails(movieDetails);
    } catch (error) {
        console.log("error " + error);
    }
}

// Function to display movie details
function displayMovieDetails(details) {
    const resultGrid = document.getElementById('resultGrid'); // Make sure this ID matches your HTML
    resultGrid.innerHTML = `
        <div class="movie-poster">
            <img src="${(details.Poster !== "N/A") ? details.Poster : "image_not_found.png"}" alt="movie poster">
        </div>
        <div class="movie-info">
            <h3 class="movie-title">${details.Title}</h3>
            <ul class="movie-misc-info">
                <li class="year">Year: ${details.Year}</li>
                <li class="rated">Ratings: ${details.Rated}</li>
                <li class="released">Released: ${details.Released}</li>
            </ul>
            <p class="genre"><b>Genre:</b> ${details.Genre}</p>
            <p class="writer"><b>Writer:</b> ${details.Writer}</p>
            <p class="actors"><b>Actors: </b>${details.Actors}</p>
            <p class="plot"><b>Plot:</b> ${details.Plot}</p>
            <p class="language"><b>Language:</b> ${details.Language}</p>
            <p class="awards"><b><i class="fas fa-award"></i></b> ${details.Awards}</p>
        </div>
    `;
}


