const url = window.location.search;
const search = new URLSearchParams(url);
const id = search.get('id');
const link = `https://api.themoviedb.org/3/movie/${id}?&api_key=156de9a632e94cfb9b9a113793c69ef8`
const linkTwo = `https://api.themoviedb.org/3/movie/${id}/credits?&api_key=156de9a632e94cfb9b9a113793c69ef8`

const getObjMovies = async (l, lc) => {
    try {
        const res = await fetch(l)
        const data = await res.json();

        const resO = await fetch(lc)
        const dataO = await resO.json();
        paintMovie(data, dataO);

    } catch (error) {
        console.log('error');
    }
}
getObjMovies(link, linkTwo);

const section = document.querySelector('section')
const paintMovie = (obj, cred) => {

    const filterArray = cred.crew.filter(casting => {

        if (casting.job == 'Director') {
            return true
        }
        return false
    });

    const local = JSON.parse(localStorage.getItem('Movie')) || []
    const exist = local.find(e => e.id == obj.id)



    const div = document.createElement('div')
    div.classList.add('divMovie');
    div.innerHTML = `<div class='cardsMovie'>
                            <p>${obj.original_title}</p>
                         <article>
                      
                       <img src="https://image.tmdb.org/t/p/w200${obj.poster_path}" alt="">
                       <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" >' +
                      '<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.25 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.75-3.4 6.86-8.55 11.53L12 21.35z"/>' +
                      '</svg>
                      </article>
                       <article>
                        <p>Year: ${obj.release_date.slice(0, 4)}</p>
                        <p>${obj.runtime} mnts</p>
                        <p>Directing: ${filterArray[0].name}</p>
                        <button onclick="saveInfo('${obj.original_title}','${obj.release_date.slice(0, 4)}','${obj.poster_path}','${obj.id}')"><img src="../assets/${exist ? 'redHeart' : 'blackHeart'}.png" alt=""></button>
                       </article>
                       <p>${obj.overview}</p>
        
                    </div>`;
    section.append(div)
    document.body.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500${obj.backdrop_path}')`;
    document.body.style.backgroundSize = '800px';
    document.body.style.backgroundPosition = 'center';

    const img = document.querySelector('.cardsMovie article:nth-of-type(1) img')
    const svg = document.querySelector('.cardsMovie article:nth-of-type(1) svg')
    img.addEventListener('dblclick', () => {
        svg.classList.add('like')
        saveInfo(obj.original_title, obj.release_date.slice(0, 4), obj.poster_path, obj.id)
        paintIcon();
        setTimeout(() => {
            svg.classList.remove('like')
        }, 1000)
    });

    const srcImg = document.querySelector('.cardsMovie article:nth-of-type(2) img')
    const paintIcon = () => {
        srcImg.src = `../assets/redHeart.png`;
    };

}

const saveInfo = (nam, year, img, number) => {

    const saveMovie = {
        nam,
        year,
        img,
        id: number
    }
    const getMovie = JSON.parse(localStorage.getItem('Movie')) || []

    const index = getMovie.findIndex(element => element.id === number);
    if (index !== -1) {

    } else {
        getMovie.push(saveMovie)
    }
    localStorage.setItem('Movie', JSON.stringify(getMovie))

}


