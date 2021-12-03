const problemElement = documnet.querySelector(".problem")
const ourForm = document.querySelector(".our-form")
const ourField = document.querySelector(".our-field")
const pointsNeeded = document.querySelector(".points-needed")
const mistakesAllowed = document.querySelector(".mistakes-allowed")

let state = {
    score:0,
    wrongAnswers:0,
}

function updateProblem() {
    state.currentProblem=generateProblem();
    problemElement.innerHTML = `${state.currentProblem.numberOne} ${state.currentProblem.operator} ${state.currentProblem.numberTwo}`
    ourField.value = ""
    ourField.focus()
}

updateProblem()

function add() {
    background_imgTag = new Image();
    background_imgTag.onload = uploadBackground;
    background_imgTag.src = background_image;
}

background_image="pngtree-cute-hand-drawn-style-math-education-green-pink-background-image_337360.jpg";


function generateNumber() {
    return Math.floor(Math.random() * (max + 1))
}

function generateProblem() {
    return {
        numberOne:generateNumber(100),
        numberTwo:generateNumber(100),
        operator:['+','-'][generateNumber(1)]
    }
}

ourForm.addEventListener("submit", handleSubmit)

function handleSubmit(e) {
     e.preventDefault()

     let correctAnswer
     const p = state.currentProblem
     if (p.operator == "+") correctAnswer = p.numberOne + p.numberTwo
     if (p.operator == "-") correctAnswer = p.numberOne - p.numberTwo

     if (parseInt(ourField.value, 10) === correctAnswer) {
         state.score++
         pointsNeeded.textContent = 10 - state.score
         updateProblem()
     } else {
        state.wrongAnswers++
        mistakesAllowed.textContent = 2 - state.wrongAnswers
     }

     checkLogic()
}

function checkLogic() {
    if (state.score === 10) {
        alert("CONGRATS! YOU WON!")
        resetGame()
    }

    if (state.wrongAnswers === 3) {
        alert("OOPS! YOU LOST!")
        resetGame()
    }
}

function resetGame() {
    updateProblem()
    state.score = 0
    state.wrongAnswers = 0
    pointsNeeded.textContent = 10
    mistakesAllowed.textContent = 2
}