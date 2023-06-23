const secForm = document.querySelector('.form')

const paintQuestion = () => {
   const divLeft = document.createElement('div');
   divLeft.innerHTML = `<h3>Can't you find your movie yet?</h3>
                         <button onclick="createForm()">
                          <span>Click here, and we will create it</span>
                         </button>`;
                        secForm.appendChild(divLeft);
}

const createForm = () => {
   const divRight = document.createElement('div');
   divRight.innerHTML =`<h3>Create your movie</h3>
                        <form action="">
                         <label for="">Movie <input type="text" id="movie"></label>
                         <label for="">Image <input type="text" id="img"></label>
                         <label for="">Year <input type="text" id="year"></label>
                         <label for="">Director <input type="text" id="director"></label>
                         <label for="">Id <input type="text" id="id"></label>
                          <input type="submit">
                        </form>`;
                        secForm.appendChild(divRight)
}
paintQuestion();






























// form.addEventListener("submit", (event) => {
//    event.preventDefault();
  
//    const obj = {
//       nam: event.target.movie.value,
//       img: event.target.img.value,
//       year: event.target.year.value,
//       director: event.target.director.value,
//       id: event.target.id.value  
//     }
   
//    const getCreation = JSON.parse(localStorage.getItem('createMovie')) || []
//    const index = getCreation.findIndex(element => element.nam === obj.nam);

//    if (index !== -1) {

//    } else {
//       getCreation.push(obj)
//    }
//    localStorage.setItem('createMovie', JSON.stringify(getCreation))
// })