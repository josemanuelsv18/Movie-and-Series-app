//Request to tmdb
const apiKey = '108117389418c369e681b2752c95b64b';

const multimedia = document.getElementById('selectMultimedia');
const classification = document.getElementById('selectClassification');
const time = document.getElementById('selectTime');
const searchButton = document.getElementById('searchButton');
const mainSection = document.getElementById('main');
const sideMenuSection = document.getElementById('sideMenu');
const sideMenuUl = document.getElementById('sideMenu__ul');

const popularity = 'popularity.desc';
const rating = 'vote_count.desc';
var sortedBy;

async function getMovieById(id){
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
async function getMovies(){
    if(classification.value = 'popular'){
        sortedBy = popularity;
    }else if(classification.value = 'rated'){
        sortedBy = rating;
    }else{
        alert('Please select if you want the most popular movies or the best rated ones');
    }
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=${sortedBy}`;
    const response = await fetch(url);
    const data = await response.json();
    return data
}
async function getMovieId(n = 10){
    const movieList = await getMovies();
    const results = movieList.results;
    const ids = results.slice(0, n).map(movie => movie.id);
    return ids;
}
async function getMoviesInSequence(){
    const ids = await getMovieId();
    const movies = [];

    for(const id of ids){
        const movie = await getMovieById(id);
        movies.push(movie);
    }
    return movies;
}
function renderMovies(movies){
    sideMenuUl.innerHTML = '';

    movies.forEach(movie => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${movie.title}`;
        sideMenuUl.appendChild(listItem);
    });
}
searchButton.onclick = async function(){
    const movies = await getMoviesInSequence();
    console.log(movies);
    renderMovies(movies);
};