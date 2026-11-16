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
                    <h3 id="sessionDisplay"> FOCUS TIME </h3>
                    <p id="timerDisplay"> 25:00 </p>
                    <button id="startTimer"> Start </button>
                    <button id="pauseTimer"> Pause </button>
                    <button id="resetTimer"> Reset </button>
               </section>
               
               <section id="distractions"> 
                    <h6 id="distractionNumber"> 0 </h6>
                    <h2> Distractions </h2>
                    <button id="logDist">Log Distraction</button>
                    <br>
                    <br>
                    <input id="specDist" type="text" placeholder="Enter the distraction"></input>
               </section>
          </section>
          <section id="bottomRow"> 
               <section id="tasks"> 
                    <h6 id="taskNumber"> 0 </h6>
                    <h2> Tasks </h2> 
                    <button id="addTask"> Add Task </button>
                    <input id="specTask" type="Text" placeholder="Enter a task!"></input>
                    <p>       </p>
                    <button id="clearCompleted"> Clear Completed Tasks </button>
                    <ul id="taskList"></ul>
               </section>
               <section id="distHist"> 
                    <h2> Distraction History </h2> 
                    <button id="clearHist"> Clear </button>
                    <ul id="distList"></ul>
               </section>
          </section>
          <section id="infoRow"> 
               <section id="keyShorts"> 
                    <h2 id="heading4KS"> Keyboard Shortcuts </h2>
                    <p> 
                    Space - (Un)pause Timer <br>
                    R - Reset Timer <br>
                    Escape - Toggles Settings
                    </p>
               </section>
               <section id="infoBox"> 
                    <h2> Info </h2> 
                    <p>
                    Welcome to Split Focus - an all-in-one productivity website! This is a minimalistic pomodoro timer without ads for when you want to just study. Log your tasks and distractions so you can easily see what you have to do - and what's stopping you.
                    Toggle settings in the top-right hand corner. This site is accessible to mobile users. Have fun studying!
                    </p>
               </section>
          </section>
</main>`

const timerDisplay = document.querySelector("#timerDisplay")
let intervalID
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

document.addEventListener("keydown", (event) => {
     if (event.key === " " && event.target.tagName !== "INPUT") {
     if (intervalID) {
          pauseTimer()
     } else {
          startTimer ()
     }
     }

     if (event.key === "r" && event.target.tagName !== "INPUT") {
          clearTimer()
     } 

     if (event.key === "Escape" && event.target.tagName !== "INPUT") {
          settingsPop.classList.toggle("hidden")
     }

})

const pauseBtn = document.querySelector("#pauseTimer")
pauseBtn.addEventListener("click", pauseTimer)

const resetBtn = document.querySelector("#resetTimer")
resetBtn.addEventListener("click", clearTimer)

let trueDistList = document.querySelector("#distList")
let distractionCount = 0
let distractions = []
let savedDistractions = localStorage.getItem("distractions")

if (savedDistractions !== null) {
     distractions = JSON.parse(savedDistractions)
}

const distractionCountDisplay = document.querySelector("#distractionNumber")
const distractionInput = document.querySelector("#specDist")
const logBtn = document.querySelector("#logDist") 

for (let i = 0; i < distractions.length; i++) {
     let currentDist = distractions[i].text
     if (currentDist !== ""){
          distractionCount += 1
          distractionCountDisplay.textContent = distractionCount
          let newDist = document.createElement("li")
          newDist.textContent = currentDist + " — at " + distractions[i].time
          trueDistList.prepend(newDist)
     }
}

logBtn.addEventListener("click", () => {
     let currentDist = (distractionInput.value).trim()
     if (currentDist !== ""){
          distractionCount += 1
          let currentTime = new Date().toLocaleTimeString([], {
               hour: "numeric",
               minute: "2-digit"
          })
          distractionCountDisplay.textContent = distractionCount
          let newDist = document.createElement("li")
          newDist.textContent = currentDist + " — at " + currentTime
          trueDistList.prepend(newDist)
          const distData = {text: currentDist, time: currentTime}
          distractions.push(distData)
          localStorage.setItem("distractions", JSON.stringify(distractions))
          distractionInput.value = ""
     } else {
          return
     }
})

const clearBtn = document.querySelector("#clearHist") 
clearBtn.addEventListener("click", () => {
     trueDistList.textContent = ""
     distractionCount = 0
     distractionCountDisplay.textContent = distractionCount
     distractions.length = 0
     localStorage.setItem("distractions", JSON.stringify(distractions))
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

function recieveTasks() {
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
}

recieveTasks()

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
               taskData.completed = newTask.checked
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
          taskInput.value = ""
     } else {
          return
     }
})

const clearTasksBtn = document.querySelector("#clearCompleted")

clearTasksBtn.addEventListener("click", () => {
     tasks = tasks.filter(taskData => taskData.completed === false)
     allTasks.textContent = ""
     taskCountNumber = 0
     recieveTasks()
     localStorage.setItem("tasks", JSON.stringify(tasks))
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
     let allPomoSetts = {focusDuration, shortBreak, longBreak, longBreakInterval}
     localStorage.setItem("allPomoSetts", JSON.stringify(allPomoSetts))
     clearTimer()
     settingsPop.classList.add("hidden")
})

if (localStorage.getItem("allPomoSetts") !== null) {
     const savedSettings = JSON.parse(localStorage.getItem("allPomoSetts"))
     focusDuration = savedSettings.focusDuration
     shortBreak = savedSettings.shortBreak
     longBreak = savedSettings.longBreak
     longBreakInterval = savedSettings.longBreakInterval
     document.querySelector("#focusDur").value = focusDuration
     document.querySelector("#shortBr").value = shortBreak
     document.querySelector("#longBr").value = longBreak
     document.querySelector("#lBrInt").value = longBreakInterval
     timeLeft = focusDuration * 60
     timerDisplay.textContent = `${Math.floor(timeLeft / 60)}:${String((timeLeft % 60)).padStart(2, "0")}`
     }
     