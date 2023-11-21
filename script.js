let themeButton = document.getElementById("theme-button");

const toggleDarkMode = (event) => {
    document.body.classList.toggle("dark-mode");
}
themeButton.addEventListener("click", toggleDarkMode);

const submitButton = document.getElementById('sign-now-button');

let signatures = document.querySelector('.signatures')

const addSignature = (person) => {
    // let name = document.getElementById("name").value;
    // let country = document.getElementById("country").value;
    // let email = document.getElementById("email").value;
    signatures.innerHTML += `<p>\n 🖊️ ${person.name} from ${person.country} supports this </p>`
}


const validateForm = () => {

    let containsErrors = false;
  
    var petitionInputs = document.getElementById("sign-petition").elements;
    let person = {
        name: petitionInputs[0].value,
        country: petitionInputs[1].value,
        email: petitionInputs[2].value
    }
    // TODO: Loop through all inputs
    for (let i = 0; i< petitionInputs.length; i++) {
        if (petitionInputs[i].value.length < 2) {
            containsErrors = true
            petitionInputs[i].classList.add('error')
        }
        else {
            petitionInputs[i].classList.remove('error');
        }
    }
    
    
    if (containsErrors == false) {
        addSignature(person)
        toggleModal(person)
        for (let i = 0; i< petitionInputs.length; i++) {
            petitionInputs[i].value = "";
            containsErrors = false;
        }
    }
  
    // TODO: Call addSignature() and clear fields if no errors
  
  }
  

submitButton.addEventListener('click', validateForm)

let animation = {
    revealDistance: 150,
    initialOpacity: 0,
    transtitionDay: 0,
    transitionDelay: '2s',
    transitionProperty: 'all',
    transitionTimingFunction: 'ease'
}

const revealableContainers = document.querySelectorAll('.revealable')

const reveal = () => {
    for (let i =0; i < revealableContainers.length; i++) {
        let windowHeight = window.innerHeight;
        let topOfRevealable = revealableContainers[i].getBoundingClientRect().top;
        if (topOfRevealable < windowHeight - animation.revealDistance) {
            revealableContainers[i].classList.add('active')
          } else {
            revealableContainers[i].classList.remove('active')
          }
    }
} 

window.addEventListener('scroll', reveal);

let reduceMotion = document.getElementById('reduce-motion')
const reduce = () => {
    animation.revealDistance = 0
    animation.initialOpacity = 1
    animation.transitionDelay = 'none'
    for (let i =0; i < revealableContainers.length; i++) {
        revealableContainers[i].style.transform = animation.transitionDelay
        revealableContainers[i].style.opacity = animation.initialOpacity
        revealableContainers[i].style.transitionDelay = animation.transitionDelay
    }
}

reduceMotion.addEventListener('click', reduce)

let modal = document.getElementById('thanks-modal');
let modalContent = document.getElementById('thanks-modal-content')

const toggleModal = (person) => {
    modal.style.display = "flex";
    modalContent.innerHTML = `<p>\n Thank you so much ${person.name}! ${person.country} represent! </p>`
    setTimeout(() => {
        clearInterval(intervalId);
        modal.style.display = "none";
    }, 4000)
    let intervalId = setInterval(scaleImage, 500)
}

let scaleFactor = 1
let modalImage = document.getElementById('modal-img')
const scaleImage = () => {
    scaleFactor = scaleFactor === 1 ? 0.8 : 1
    modalImage.style.transform = `scale(${scaleFactor}`
}

let closeButton = document.getElementById('close-modal');
const closeModal = () => {
    modal.style.display = 'none'
}
closeButton.addEventListener('click', closeModal)