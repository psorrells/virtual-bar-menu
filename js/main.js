//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM

//make it so that you can name a drink with a space in it and it works okay

//nasa has many apis, use the picture of the day, get that picture of the day working.

document.querySelector('button').addEventListener('click',getCocktail)
document.querySelector('.slider').addEventListener('mouseover', toggleSlider)
document.querySelector('.slider').addEventListener('mouseout', toggleSlider)


function getCocktail() {
    let cocktailName = document.querySelector('input').value
    console.log(cocktailName)
    console.log(cocktailName.trim().replaceAll(' ','-'))
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + cocktailName.trim())
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      let drink = data.drinks[Math.floor(Math.random()*data.drinks.length)]
      document.querySelector('h2').innerText = drink.strDrink
      document.querySelector('img').src = drink.strDrinkThumb
      document.querySelector('p').innerText = drink.strInstructions

    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}


function makeCocktailSlide() {

}

function toggleSlider() {
  let slides = document.querySelectorAll('.slide-group')
  slides.forEach(s => {
    if (s.style.animationPlayState != 'paused') {
      s.style.animationPlayState = 'paused'
    } else {
      s.style.animationPlayState = 'running'
    }
    })
}