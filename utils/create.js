const form = document.querySelector('form');

form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(event.target.movie.value);
 const obj = {
    nam: event.target.movie.value, 
    img: event.target.img.value,
    year: event.target.year.value,
    director: event.target.director.value,
 }
 console.log(obj);
})as