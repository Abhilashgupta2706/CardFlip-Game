// Assigeing
const hOneEl = document.getElementById("h-one-el")
const sectionEL = document.querySelector("section")
const playerLiveCount = document.querySelector("span")
let playerLives = 7


// Linking To HTML
playerLiveCount.textContent = playerLives

// Rendering Data
// Randomize Function
const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5)
    return cardData
}

// Card Generation HTML
const cardGenerator = () => {
    const cardData = randomize()
    // Rendering HTMl
    cardData.forEach((item) => {
        const card = document.createElement("div")
        const face = document.createElement("img")
        const back = document.createElement("div")

        card.classList = "card"
        face.classList = "face"
        back.classList = "back"

        // Attaching Data to Cards
        face.src = item.imgSrc
        card.setAttribute('name', item.name)

        // Attaching The Cards to Section adn Face & Back to Card
        sectionEL.appendChild(card)
        card.appendChild(face)
        card.appendChild(back)

        card.addEventListener("click", (e) => {
            if (card.classList.contains("flipped")) {
                return
            }
            card.classList.toggle('toggle-card')
            checkCard(e)
        })
    })

}


// Checking Card

const checkCard = (e) => {
    const clickedCard = e.target
    clickedCard.classList.add("flipped")
    const flippedCards = document.querySelectorAll(".flipped")

    // Logic
    if (flippedCards.length === 2) {

        if (flippedCards[0].getAttribute("name") === flippedCards[1].getAttribute("name")) {
            flippedCards.forEach((card) => {
                card.classList.remove("flipped")
                card.style.pointerEvents = "none"
            })
            // console.log("Match")
        }
        else {
            flippedCards.forEach((card) => {
                card.classList.remove("flipped")
                setTimeout(() => card.classList.remove("toggle-card"), 1000)
            })
            // console.log("Lost")
            playerLives--
            playerLiveCount.textContent = playerLives
            if (playerLives === 0) {
                hOneEl.textContent = "You Lost"
                hOneEl.style.color = "#FF0000"
                setTimeout(() => hOneEl.textContent = "Refreshing....!", 1000)
                setTimeout(() => hOneEl.style.color = "#f7fd00", 1000)
                setTimeout(() => restart(), 2000)
            }
        }

    }
}

// Restart 
const restart = () => {
    // let cardData = randomize()
    // let faces = document.querySelectorAll(".face")
    // let cards = document.querySelectorAll(".card")
    // cardData.forEach((item, index) => {
    //     cards[index].classList.remove("toggle-card")
    // })

    // Reloading the Page to Reset Everthing
    location.reload();

}

cardGenerator()