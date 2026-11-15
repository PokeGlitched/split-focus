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
                    <button id="resetTimer"> Reset </button>
                    <input id="timeWanted" type="number" value=25 min=1 max=60></input> 
               </section>
               
               <section id="distractions"> 
                    <h6 id="distractionNumber"> 0 </h6>
                    <h2> Distractions </h2>
                    <button id="logDist">Log Distraction</button>
                    <input id="specDist" type="text" placeholder="Enter the distraction"></input>
               </section>
          </section>
          <section id="bottomRow"> 
               <section id="tasks"> 
                    <h6 id="taskNumber"> 0 </h6>
                    <h2> Tasks </h2> 
                    <button id="addTask"> Add Task </button>
                    <input id="specTask" type="Text" placeholder="Enter a task!"></input>
                    <ul id="taskList"></ul>
               </section>
               <section id="distHist"> 
                    <h2> Distraction History </h2> 
                    <button id="clearHist"> Clear </button>
                    <ul id="distList"></ul>
               </section>
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

const resetBtn = document.querySelector("#resetTimer")
resetBtn.addEventListener("click", clearTimer)

let trueDistList = document.querySelector("#distList")
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
          let newDist = document.createElement("li")
          newDist.textContent = currentDist
          trueDistList.appendChild(newDist)
          distractionInput.value = ""
     } else {
          return
     }
})

const clearBtn = document.querySelector("#clearHist") 
clearBtn.addEventListener("click", () => {
     trueDistList.textContent = ""
     distractions.length = 0
     distractionCount = 0
     distractionCountDisplay.textContent = distractionCount
})


const taskCount = document.querySelector("#taskNumber")
const taskInput = document.querySelector("#specTask")
const newTaskBtn = document.querySelector("#addTask")
const allTasks = document.querySelector("#taskList")
let taskCountNumber = 0
let tasks = []
let savedTasks = localStorage.getItem("tasks")

if (savedTasks !== null) {
     tasks = JSON.parse(savedTasks)
}

for (let i = 0; i < tasks.length; i++) {
          console.log(tasks)
          taskCountNumber += 1
          taskCount.textContent = taskCountNumber
          let taskElement = document.createElement("li")
          let taskText = document.createElement("span")
          taskText.textContent = tasks[i].text
          let newTask = document.createElement("input")
          newTask.type = "checkbox"
          newTask.checked = tasks[i].completed
          tasks[i].completed = newTask.checked
          taskText.classList.toggle("completed", tasks[i].completed)
          newTask.addEventListener("change", () => {
               taskText.classList.toggle("completed", newTask.checked)
               tasks[i].completed = newTask.checked
               localStorage.setItem("tasks", JSON.stringify(tasks))
          })
          taskElement.appendChild(newTask)
          taskElement.appendChild(taskText)
          allTasks.appendChild(taskElement)
}

newTaskBtn.addEventListener("click", () => {
     let currentTask = (taskInput.value).trim()
     if (currentTask !== ""){
          taskCountNumber += 1
          taskCount.textContent = taskCountNumber
          tasks.push({text: currentTask, completed: false})
          const taskIndex = tasks.length - 1
          localStorage.setItem("tasks", JSON.stringify(tasks))
          let taskElement = document.createElement("li")
          let taskText = document.createElement("span")
          taskText.textContent = currentTask
          let newTask = document.createElement("input")
          newTask.type = "checkbox"
          newTask.addEventListener("change", () => {
               tasks[taskIndex].completed = newTask.checked
               taskText.classList.toggle("completed", newTask.checked)
               localStorage.setItem("tasks", JSON.stringify(tasks))
          })
          taskElement.appendChild(newTask)
          taskElement.appendChild(taskText)
          allTasks.appendChild(taskElement)
          taskInput.value = ""
     } else {
          return
     }
})