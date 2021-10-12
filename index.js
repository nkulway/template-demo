

function renderMovies(movieArray) {
    const movieHtmlArray = movieArray.map(currentMovie => {
        return `
        <div class="col-12 col-sm-6 col-lg-4">
            <div class="card mb-3">
                <img src="${currentMovie.Poster}" class="card-img-top" alt"Poster for ${currentMovie.Title}">
                <div class="card-body">
                    <h5 class="card-title">${currentMovie.Title}</h5>
                    <p class="card-text">${currentMovie.Year}</p>
                    <a href="#" class="add-button btn btn-primary" data-imdbid="${currentMovie.imdbID}">Add</a>
                </div>
            </div>
        </div>`
    })
    return movieHtmlArray.join('')
    
}

document.addEventListener('DOMContentLoaded', function() {
    const moviesContainer = document.querySelector('#movies-container');
    const searchForm = document.querySelector('#search-form');
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const searchString = document.querySelector('.form-control.search-bar').value
        const urlEncodedSearchString = encodeURIComponent(searchString);
        fetch("http://www.omdbapi.com/?apikey=59354c85&s=" + urlEncodedSearchString)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            const moviesContainer = document.querySelector('#movies-container');
            const movieHTML = renderMovies(data.Search);
            moviesContainer.innerHTML = movieHTML;
            movieData = data.Search;
        })
    });
 })

const moviesContainer = document.querySelector('#movies-container');
moviesContainer.addEventListener('click', function(event) {
    event.preventDefault();
   if (event.target.tagName === "A") {
       const imdbID = event.target.getAttribute("data-imdbid") 
       saveToWatchList(imdbID)
   }
})

function saveToWatchList(imdbID) {
    const movie = movieData.find((currentMovie) => {
        return currentMovie.imdbID == imdbID
    })
        
        let watchlistJSON = localStorage.getItem('watchlist');
        let watchlist = JSON.parse(watchlistJSON)
            if (!watchlist) {
                watchlist = [];
            } 
            watchlist.push(movie);
            watchlistJSON = JSON.stringify(watchlist);
            localStorage.setItem('watchlist', watchlistJSON);
        return movie
}

export  {renderMovies};