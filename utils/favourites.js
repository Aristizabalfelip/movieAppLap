const section = document.querySelector('section');
const getMovie = JSON.parse(localStorage.getItem('Movie'))

const paintFavorites = () => {
  const getMovie = JSON.parse(localStorage.getItem('Movie'))
  section.innerHTML = ''
  const div = document.createElement('div')
  getMovie.forEach(element => {
    div.innerHTML += `<div>
                          <a href="../pages/movie.html?id=${element.id}"> 
                           <img src="https://image.tmdb.org/t/p/w200${element.img}" alt="">
                           <p>${element.nam}</p> 
                          </a>                         
                         </div>
                         <button onclick="deleteFavorite(${element.id})"><img src="" alt="">delete</button>`
  });
  section.append(div)

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
