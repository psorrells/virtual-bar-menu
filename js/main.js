//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM

//make it so that you can name a drink with a space in it and it works okay

//nasa has many apis, use the picture of the day, get that picture of the day working.

document.querySelector('button').addEventListener('click',getCocktails)
document.querySelector('.slider').addEventListener('mouseover', toggleSlider)
document.querySelector('.slider').addEventListener('mouseout', toggleSlider)


function getCocktails() {
    clearCocktails()
    let cocktailIngredient = document.querySelector('input').value
    cocktailIngredient = cocktailIngredient.trim().replaceAll(' ','%20')
    fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + cocktailIngredient)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      data.drinks.forEach(drink => {
        fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drink.idDrink)
        .then(res => res.json())
        .then(data2 => {
          console.log(data2)
          iList = []
          for(i=1;i<=15;i++) {
            if (data2.drinks[0][`strIngredient${i}`] != null && data2.drinks[0][`strIngredient${i}`] != "") {
              iList.push(data2.drinks[0][`strIngredient${i}`])
            }
          }
          document.querySelectorAll('.slide-group').forEach(slideGroup => slideGroup.style.animation = `slideshow ${data.drinks.length * 2}s linear infinite`)
          addCocktailSlide(drink.strDrink,drink.strDrinkThumb,iList.join(', '))
        })
      })
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}

function addCocktailSlide(name,image,ingredients) {
  document.querySelectorAll('.slide-group').forEach(group => {
    let x = makeCocktailSlide(name, image, ingredients)
    group.appendChild(x)
  })
}

function makeCocktailSlide(name, image, ingredients) {
  let cocktail = document.createElement('div')
  cocktail.classList.add('slide')

  let elName = document.createElement('h2')
  let elImage = document.createElement('img')
  let elIngredients = document.createElement('p')

  elName.innerText = name
  elImage.src = image
  elIngredients.innerText = ingredients

  cocktail.append(elName,elImage,elIngredients)

  return cocktail
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

function clearCocktails() {
  document.querySelectorAll('.slide').forEach(slide => slide.remove())
}