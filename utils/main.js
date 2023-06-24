const link = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=156de9a632e94cfb9b9a113793c69ef8`
const getPopularMovies = async (l) => {
    const res = await fetch(l)
    const data = await res.json();
    paintPopular(data.results);
}
getPopularMovies(link)

const sectionPopular = document.querySelector('.popular')
const paintPopular = (array) => {
    const div = document.createElement('div')
    div.classList.add('divPopular');
    array.forEach(element => {
        div.innerHTML += `<div class='cards'>
                           <a href="./pages/movie.html?id=${element.id}">
                           <img src="https://image.tmdb.org/t/p/w300${element.poster_path}" alt="">
                           <p>${element.original_title}</p>
                           </a>
                          </div>`;
    });
    sectionPopular.append(div)
}

const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    urlMovie(event.target.movie.value);
});

const urlMovie = (movie) => {
    const link = `https://api.themoviedb.org/3/search/movie?query=${movie}&api_key=156de9a632e94cfb9b9a113793c69ef8`
    const getCreation = JSON.parse(localStorage.getItem('createMovie')) || []
    getObjMovies(link, getCreation)
}

const getObjMovies = async (link, local) => {
    try {
        const res = await fetch(link)
        const data = await res.json();
        paintMovies(data.results, local);
    } catch (error) {
        console.log(error);
    }
}

const sectionMovie = document.querySelector('.movieList')
const paintMovies = (array, local) => {
    sectionMovie.innerHTML = ''
    const div = document.createElement('div')
    div.classList.add('divMovies');
    local.forEach(e => {
        console.log(e);
        div.innerHTML += `<div class='cardsMovie'>
                           <a href="./pages/movie.html?id=${e.id}">
                           <img src="${e.img}" alt="">
                           <p>${e.nam}</p>
                           <p>${e.year}</p>
                           </a>
                        </div>`;
    });

    array.forEach(element => {
    if (element.poster_path === null) {
            return
        }
        div.innerHTML += `<div class='cardsMovie'>
                           <a href="./pages/movie.html?id=${element.id}">
                            <img src="https://image.tmdb.org/t/p/w300${element.poster_path}" alt="">
                            <p>${element.original_title}</p>
                            <p>${element.release_date.slice(0, 4)}</p>
                           </a>
                          </div>`;
    });   
    sectionMovie.append(div)
}

const buttonHeart = document.querySelector('nav> a:nth-of-type(1)')
const numberFavourites = () => {
    const getMovie = JSON.parse(localStorage.getItem('Movie'))
    const span = document.createElement('span')
    span.innerHTML = `${getMovie.length}`;
    buttonHeart.append(span)
}
numberFavourites();

