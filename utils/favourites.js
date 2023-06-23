const section = document.querySelector('section');
const getMovie = JSON.parse(localStorage.getItem('Movie'))

const paintFavorites = () => {
  const getMovie = JSON.parse(localStorage.getItem('Movie'))
  section.innerHTML = ''
  const div = document.createElement('div')
  getMovie.forEach(element => {
    div.innerHTML += `<div> 
                          <article class="articleHeart">
                            <img src="https://image.tmdb.org/t/p/w200${element.img}" alt="${element.id}" >
                            <img src="../assets/brokenHeart.svg" width="100" height="100" viewBox="0 0 100 100">
                        
                          </article>
                          <a href="../pages/movie.html?id=${element.id}"> 
                           <p>${element.nam}</p> 
                          </a>                         
                         </div>
                         `
  });
  section.append(div)

  const article = document.querySelectorAll('.articleHeart')
  article.forEach(array => {
    array.children[0].addEventListener('dblclick', () => {
      array.children[1].classList.add('like')
      setTimeout(() => {
        array.children[1].remove('like')
        deleteFavorite(array.children[0].alt)
      }, 1000)
    });
  });
}
paintFavorites()

const deleteFavorite = (ids) => {
  const getMovie = JSON.parse(localStorage.getItem('Movie'))
  const filterArray = getMovie.filter(mo => {
    if (mo.id != ids) {
      return true
    }
    return false
  });
  localStorage.setItem('Movie', JSON.stringify(filterArray))
  paintFavorites()
}
