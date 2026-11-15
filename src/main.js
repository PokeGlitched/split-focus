import './style.css'
let timeLeft = 25*60


document.querySelector("#app").innerHTML = `
<main>
     <h1> Split Focus </h1>
          <section id="dashboard">
               
               <section id="focus"> 
                    <h2> Focus </h2>
                    <p id="timerDisplay"> 25:00 </p>
                    <button id="startTimer"> Start </button>
                    <button id="pauseTimer"> Pause </button>
               </section>
               
               <section id="distractions"> 
                    <h2> Distractions </h2> 
               </section>

               <section id="tasks"> 
                    <h2> Tasks </h2> 
               </section>
</main>
` 
let intervalID
const timerDisplay = document.querySelector("#timerDisplay")


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
          }
     }, 1000) 
          

}

function pauseTimer() {
     clearInterval(intervalID)
     intervalID = undefined
     timerDisplay.textContent = `${Math.floor(timeLeft / 60)}:${String((timeLeft % 60)).padStart(2, "0")}`
}

const startBtn = document.querySelector("#startTimer")
startBtn.addEventListener("click", startTimer)

const pauseBtn = document.querySelector("#pauseTimer")
pauseBtn.addEventListener("click", pauseTimer)