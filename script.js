// get clock element
const clock = document.getElementById("clock");

// get alarm form elements
const alarmHour = document.getElementById("alarm-hour");
const alarmMinute = document.getElementById("alarm-minute");
const alarmSecond = document.getElementById("alarm-second");
const alarmAmpm = document.getElementById("alarm-ampm");
const setAlarmButton = document.getElementById("set-alarm");

// get alarms list element
const alarmsList = document.getElementById("alarms");

// create audio element for alarm sound
const alarmSound = new Audio("alarm-sound.mp3");

// function to update clock
function updateClock() {
  const now = new Date();
  const hours = now.getHours() % 12 || 12;
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = now.getHours() >= 12 ? "PM" : "AM";
  clock.textContent = `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${ampm}`;
}

// function to add alarm to list
function addAlarmToList(alarmTime, alarmElement) {
  const li = document.createElement("li");
  li.textContent = `${alarmTime} `;
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    alarmsList.removeChild(li);
  });
  li.appendChild(deleteButton);
  alarmsList.appendChild(li);
}

// function to check for alarm
function checkForAlarm() {
  const now = new Date();
  const hours = now.getHours() % 12 || 12;
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = now.getHours() >= 12 ? "PM" : "AM";
  const currentTime = `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${ampm}`;
  const alarms = document.querySelectorAll("#alarms li");
  alarms.forEach((alarm) => {
    if (alarm.textContent.startsWith(currentTime)) {
      alert("Wake UP!!")
      setTimeout(() => {
        alarmSound.currentTime = 0;
      }, 5000);
    }
  });
}

// add event listener for set alarm button
setAlarmButton.addEventListener("click", () => {
  const alarmTime = `${alarmHour.value}:${alarmMinute.value.padStart(2, "0")}:${alarmSecond.value.padStart(2, "0")} ${alarmAmpm.value}`;
  addAlarmToList(alarmTime);
});

// update clock every second
setInterval(() => {
  updateClock();
  checkForAlarm();
}, 1000);
