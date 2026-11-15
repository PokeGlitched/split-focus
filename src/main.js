import './style.css'

document.querySelector("#app").innerHTML = `
<main>
     <h1> Split Focus </h1>
          <section id="topRow">
               
               <section id="focus"> 
                    <h2> Focus </h2>
                    <p id="timerDisplay"> 25:00 </p>
                    <button id="startTimer"> Start </button>
                    <button id="pauseTimer"> Pause </button>
                    <button id="clearTimer"> Clear </button>
                    <input id="timeWanted" type="number" value=25 min=1 max=60></input> 
               </section>
               
               <section id="distractions"> 
                    <h6 id="distractionNumber"> 0 </h6>
                    <h2> Distractions </h2>
                    <button id="logDist">Log Distraction</button>
                    <input id="specDist" type="text" placeholder="Enter the distraction"></input>
               </section>
          </section>
          <section> id="bottomRow"
               <section id="tasks"> 
                    <h2> Tasks </h2> 
               </section>
</main>`

const timerDisplay = document.querySelector("#timerDisplay")
let intervalID
let time = document.querySelector("#timeWanted")
let timeLeft = Number(time.value)*60
time.addEventListener("input", () => {
     if (!intervalID) {
          timeLeft = Number(time.value)*60
          timerDisplay.textContent = `${Math.floor(timeLeft / 60)}:${String((timeLeft % 60)).padStart(2, "0")}`
     }
})

function startTimer() {
     if (intervalID) {
          return
     }
     intervalID = setInterval (() => {
          if (timeLeft > 1){
               timeLeft -= 1
               timerDisplay.textContent = `${Math.floor(timeLeft / 60)}:${String((timeLeft % 60)).padStart(2, "0")}`
          } else {
               timerDisplay.textContent = `${Math.floor(timeLeft / 60)}:${String((timeLeft % 60)).padStart(2, "0")}`
               clearInterval(intervalID)
               intervalID = undefined
          }
     }, 1000) 
          

}

function pauseTimer() {
     clearInterval(intervalID)
     intervalID = undefined
     timerDisplay.textContent = `${Math.floor(timeLeft / 60)}:${String((timeLeft % 60)).padStart(2, "0")}`
}

function clearTimer() {
     clearInterval(intervalID)
     intervalID = undefined
     timeLeft = Number(time.value)*60
     timerDisplay.textContent = `${Math.floor(timeLeft / 60)}:${String((timeLeft % 60)).padStart(2, "0")}`
}

const startBtn = document.querySelector("#startTimer")
startBtn.addEventListener("click", startTimer)

const pauseBtn = document.querySelector("#pauseTimer")
pauseBtn.addEventListener("click", pauseTimer)

const clearBtn = document.querySelector("#clearTimer")
clearBtn.addEventListener("click", clearTimer)

let distractionCount = 0
let distractions = []
const distractionCountDisplay = document.querySelector("#distractionNumber")
const distractionInput = document.querySelector("#specDist")
const logBtn = document.querySelector("#logDist") 
logBtn.addEventListener("click", () => {
     let currentDist = (distractionInput.value).trim()
     if (currentDist !== ""){
          distractionCount += 1
          distractionCountDisplay.textContent = distractionCount
          distractions.push(currentDist)
     } else {
          return
     }
})