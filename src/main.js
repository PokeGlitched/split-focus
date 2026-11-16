import './style.css'

document.querySelector("#app").innerHTML = `
<main>

     <header>
     <h1> Split Focus </h1>
     
     <div class="hidden" id="settingspopup">
     <div id="settingspanel">
    
     <button id="closeSettings"> × </button>

     <div>
     <label for="focusDur"> Focus Duration </label>
     <input id="focusDur" type="number" value=25 min=1 max=60>
     </div>

     <div>
     <label for="shortBr"> Short Break </label>
     <input id= "shortBr" type="number" value=5 min=1 max=60>
     </div>

     <div>
     <label for="longBr"> Long Break </label>
     <input id= "longBr" type="number" value=20 min=1 max=60>
     </div>

     <div>
     <label for="lBrInt"> Long Break Interval </label>
     <input id="lBrInt" type="number" value=4 min=1 max=10>
     </div>

     <button id="applyChanges"> Apply Changes </button>

     </div>
     </div>
     
     <button id="settings">
     <img src="src/assets/settings.svg">
     </button>


     

     </header>
     <section id="topRow">
               
               <section id="focus"> 
                    <h2> Focus </h2>
                    <h3 id="sessionDisplay"> FOCUS SESSION </h2>
                    <p id="timerDisplay"> 25:00 </p>
                    <button id="startTimer"> Start </button>
                    <button id="pauseTimer"> Pause </button>
                    <button id="resetTimer"> Reset </button>
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
let sessionType = "focus"
let sessionText = document.querySelector("#sessionDisplay")
let completedSessions = 0
let focusDuration = Number(document.querySelector("#focusDur").value)
let shortBreak = Number(document.querySelector("#shortBr").value)
let longBreak = Number(document.querySelector("#longBr").value)
let longBreakInterval = Number(document.querySelector("#lBrInt").value)
let timeLeft = focusDuration * 60

function updateSessionDisplay() {
     if (sessionType === "focus") {
     sessionText.textContent = "FOCUS TIME"
} else if (sessionType === "shortBreak") {
     sessionText.textContent = "SHORT BREAK"
} else {
     sessionText.textContent = "LONG BREAK"
}
}

function switchSession() {
     
     if (sessionType === "focus") {
     completedSessions += 1
     if (completedSessions % longBreakInterval == 0) {
          sessionType = "longBreak"
     } else {
          sessionType = "shortBreak"
     }
     } else {
          sessionType = "focus"
     }

     clearTimer()
     startTimer()
}

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
               clearInterval(intervalID)
               intervalID = undefined

               switchSession()
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
     if (sessionType === "focus") {
          timeLeft = focusDuration * 60
     } else {
          if (sessionType === "shortBreak") {
               timeLeft = shortBreak * 60
          } else {
               timeLeft = longBreak * 60
          }
     }
     updateSessionDisplay()
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
     const taskData = tasks[i]
          if (taskData.completed === false) {
                    taskCountNumber += 1
               }
          taskCount.textContent = taskCountNumber
          let taskElement = document.createElement("li")
          let taskText = document.createElement("span")
          taskText.textContent = taskData.text
          let newTask = document.createElement("input")
          newTask.type = "checkbox"
          newTask.checked = taskData.completed
          taskData.completed = newTask.checked
          taskText.classList.toggle("completed", taskData.completed)
          newTask.addEventListener("change", () => {
               taskText.classList.toggle("completed", newTask.checked)
               taskData.completed = newTask.checked
               localStorage.setItem("tasks", JSON.stringify(tasks))
               if (taskData.completed === false) {
                    taskCountNumber += 1
               } else {
                    taskCountNumber -= 1
               }
               taskCount.textContent = taskCountNumber
          })
          let delBtn = document.createElement("button")
          delBtn.textContent = "×"
          delBtn.addEventListener("click", () => {
               if (taskData.completed === false) {
                    taskCountNumber -= 1
               }
               taskCount.textContent = taskCountNumber
               
               taskElement.remove()
               tasks.splice(tasks.indexOf(taskData), 1)
               localStorage.setItem("tasks", JSON.stringify(tasks))
          })
          taskElement.appendChild(newTask)
          taskElement.appendChild(taskText)
          taskElement.appendChild(delBtn)
          allTasks.appendChild(taskElement)
}

newTaskBtn.addEventListener("click", () => {
     let currentTask = (taskInput.value).trim()
     if (currentTask !== ""){
          taskCountNumber += 1
          taskCount.textContent = taskCountNumber
          const taskData = {text: currentTask, completed: false}
          tasks.push(taskData)
          localStorage.setItem("tasks", JSON.stringify(tasks))
          let taskElement = document.createElement("li")
          let taskText = document.createElement("span")
          taskText.textContent = currentTask
          let newTask = document.createElement("input")
          newTask.type = "checkbox"
          newTask.addEventListener("change", () => {
               tasks[taskData.completed] = newTask.checked
               taskText.classList.toggle("completed", newTask.checked)
               localStorage.setItem("tasks", JSON.stringify(tasks))
               
               if (newTask.checked === true) {
                    taskCountNumber -= 1
               } else {
                    taskCountNumber += 1
               }
               taskCount.textContent = taskCountNumber
          })
          let delBtn = document.createElement("button")
          delBtn.textContent = "×"
          delBtn.addEventListener("click", () => {
               if (tasks[taskData].completed === false) {
                    taskCountNumber -= 1
               }
               taskCount.textContent = taskCountNumber
               taskElement.remove()
               tasks.splice(taskData, 1)
               localStorage.setItem("tasks", JSON.stringify(tasks))

          })
          taskElement.appendChild(newTask)
          taskElement.appendChild(taskText)
          taskElement.appendChild(delBtn)
          allTasks.appendChild(taskElement)
          taskInput.value = ""
     } else {
          return
     }
})


const settingsBtn = document.querySelector("#settings")
const closeBtn = document.querySelector("#closeSettings")
const settingsPop = document.querySelector("#settingspopup")
const applyChangesBtn = document.querySelector("#applyChanges")

settingsBtn.addEventListener("click", () => {
     settingsPop.classList.toggle("hidden")
})

closeBtn.addEventListener("click", () => {
     settingsPop.classList.toggle("hidden")
})

applyChangesBtn.addEventListener("click", () => {
     focusDuration = Number(document.querySelector("#focusDur").value)
     shortBreak = Number(document.querySelector("#shortBr").value)
     longBreak = Number(document.querySelector("#longBr").value)
     longBreakInterval = Number(document.querySelector("#lBrInt").value)
     clearTimer()
     settingsPop.classList.add("hidden")
})