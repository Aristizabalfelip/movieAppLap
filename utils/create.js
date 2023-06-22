const form = document.querySelector('form');

form.addEventListener("submit", (event) => {
   event.preventDefault();
  
   const obj = {
      nam: event.target.movie.value,
      img: event.target.img.value,
      year: event.target.year.value,
      director: event.target.director.value,
      id: event.target.id.value  
    }
   
   const getCreation = JSON.parse(localStorage.getItem('createMovie')) || []
   const index = getCreation.findIndex(element => element.nam === obj.nam);

   if (index !== -1) {

   } else {
      getCreation.push(obj)
   }
   localStorage.setItem('createMovie', JSON.stringify(getCreation))

})