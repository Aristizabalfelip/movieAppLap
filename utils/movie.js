const url = window.location.search;
const search = new URLSearchParams(url);
const id = search.get('id');
const link = `https://api.themoviedb.org/3/movie/${id}?&api_key=156de9a632e94cfb9b9a113793c69ef8`
const linkTwo = `https://api.themoviedb.org/3/movie/${id}/credits?&api_key=156de9a632e94cfb9b9a113793c69ef8`
const linkThriller = `https://api.themoviedb.org/3/movie/${id}/videos?&api_key=156de9a632e94cfb9b9a113793c69ef8`

const getObjMovies = async (l, lc, lt,id) => {
    try {
        const res = await fetch(l)
        const data = await res.json();

        const resO = await fetch(lc)
        const dataO = await resO.json();

        const resT = await fetch(lt)
        const dataT = await resT.json();
        paintMovie(data, dataO,dataT);

    } catch (error) {
        console.log(error);
        const localCreation = JSON.parse(localStorage.getItem('createMovie')) || []
        paintCreation(localCreation,id);
    }
}
getObjMovies(link, linkTwo, linkThriller,id);

const section = document.querySelector('section')
const secTrailer = document.querySelector('.trailer')
const paintMovie = (obj, cred,idTrailer) => {

    const filterArray = cred.crew.filter(casting => {

        if (casting.job == 'Director') {
            return true
        }
        return 
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
                        <button onclick="saveInfo('${obj.original_title}','${obj.release_date.slice(0, 4)}','${obj.poster_path}',${obj.id})"><img src="../assets/${exist ? 'redHeart' : 'blackHeart'}.png" alt=""></button>
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
    
    const divTrailer = document.createElement('div')
    divTrailer.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${idTrailer.results[0].key}"
                             title="YouTube video player" frameborder="0" allow="accelerometer; autoplay;
                             frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;
                             picture-in-picture; web-share" allowfullscreen></iframe>
                             `;
                             secTrailer.append(divTrailer)
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


const paintCreation = (arrayLocal,id) => {
   

    const index = arrayLocal.find(element => element.id === id);
    const local = JSON.parse(localStorage.getItem('Movie')) || []

  
    const exist = local.find(e => e.id == id)
    console.log(exist);

    const div = document.createElement('div')
    div.classList.add('divMovie');
    div.innerHTML = `<div class='cardsMovie'>
                            <p>${Object.values(index)[0]}</p>
                         <article>                     
                       <img src="${Object.values(index)[1]}" alt="">
                       <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" >' +
                      '<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.25 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.75-3.4 6.86-8.55 11.53L12 21.35z"/>' +
                      '</svg>
                      </article>
                       <article>
                        <p>Year: ${Object.values(index)[2]}</p>
                        <p>Directing: ${Object.values(index)[3]}</p>                      
                        <button onclick="saveInfo('${Object.values(index)[0]}','${Object.values(index)[2]}','${Object.values(index)[1]}',${Object.values(index)[4]})"><img src="../assets/${exist ? 'redHeart' : 'blackHeart'}.png" alt=""></button>
                       </article>
                    </div>`;
                    section.append(div)                 
                    document.body.style.backgroundImage = `url('${Object.values(index)[1]}')`;
                    document.body.style.backgroundSize = '800px';
                    document.body.style.backgroundPosition = 'center';

}