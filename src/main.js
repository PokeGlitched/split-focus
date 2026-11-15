import './style.css'
let timeLeft = 25*60


document.querySelector("#app").innerHTML = `
<main>
     <h1> Split Focus </h1>
          <section id="dashboard">
               
               <section id="focus"> 
                    <h2> Focus </h2>
                    <p id="timerDisplay"> 0:00 </p> 
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
     intervalID = setInterval (() => {
          if (timeLeft > 0){
               timeLeft -= 1
               timerDisplay.textContent = `${Math.floor(timeLeft / 60)}:${String((timeLeft % 60)).padStart(2, "0")}`
          } else {
               clearInterval(intervalID)
          }
     }, 1000) 
          

}