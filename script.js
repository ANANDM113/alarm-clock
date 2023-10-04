const presentTime   =   document.querySelector("h1");
const timeContainer   =   document.querySelector(".time-container");
const dropDownMenu    =   document.querySelectorAll("select");
const setAlarmButton  =   document.querySelector("button");
const horizontalLine  =   document.getElementById("hr");

let alarmTime;
let isAlarmSet;
let alarmCount  =   0;
let alarmListArr    =   [];

ringtone    =   new Audio("./sound/ringtone.mp3");

// Here we are inputing value to the dom of hour,minutes, am/pm
for(let i = 12;i > 0;i--){
    i   =   i < 10 ? `0${i}` : i;
    let option  =   `<option value="${i}">${i}</option>`;
    dropDownMenu[0].firstElementChild.insertAdjacentHTML("afterend",option);
}

for(let i = 59;i >= 0;i--){
    i   =   i < 10 ? `0${i}` : i;
    let option  =   `<option value="${i}">${i}</option>`;
    dropDownMenu[1].firstElementChild.insertAdjacentHTML("afterend",option);
}

for(let i = 2;i > 0;i--){
    let ampm   =   i == 1 ? "AM" : "PM";
    let option  =   `<option value="${ampm}">${ampm}</option>`;
    dropDownMenu[2].firstElementChild.insertAdjacentHTML('afterend',option);
}

//Here we are fetching the current time
function currentClockTime(){

    let currentDate    =   new Date();
    hour   =   currentDate.getHours();
    min   =   currentDate.getMinutes();
    sec   =   currentDate.getSeconds();
    ampm    =   "AM";

    if(hour >=12){
        hour   =   hour - 12;
        ampm    =   "PM";
    }
    hour   =   hour == 0 ? hour = 12 : hour;
    hour   =   hour < 10 ? "0" + hour: hour;
    min  =   min < 10 ? "0" + min: min;
    sec    =   sec < 10 ? "0" + sec: sec;

    presentTime.innerText   =   `${hour}:${min}:${sec} ${ampm}`;
    
    if(alarmTime    ===  `${hour}:${min} ${ampm}`){
        ringtone.play();
        isAlarmSet  =   true;
        setAlarmButton.innerText    =   "Clear Alarm";
        ringtone.loop   =   true;
    }
}

function initializeClock(){
    currentClockTime();
    window.setInterval("currentClockTime()",1000);
}

// Here whatever alarm time we are setting we are displaying it on DOM
function setAlarm(){

    if(isAlarmSet){
        alarmTime   =   "";
        ringtone.pause();
        setAlarmButton.innerText    =   "Set Alarm";
        return isAlarmSet   =   false;
    }

    document.querySelector("#alarm-heading").innerText   =   "Alarms";
    let time    =   `${dropDownMenu[0].value}:${dropDownMenu[1].value} ${dropDownMenu[2].value}`;
    
    if(time.includes("Hour") || time.includes("Minutes") || time.includes("AM/PM")){
        return alert("Invaid time");
    }else{
        alarmCount++;
        document.querySelector(".alarm-items").innerHTML  +=  
        `
            <div id = alarm${alarmCount} class = "alarm-list-container">
                <span id = "span${alarmCount}" class = "time-color">${time}</span>
                <button id = "${alarmCount}" class = "delete-button" onClick = "deleteAlarm(this.id)">Delete</button>
            </div>
        `;

        alarmTime   =   `${dropDownMenu[0].value}:${dropDownMenu[1].value} ${dropDownMenu[2].value}`;
        alarmListArr.push(alarmTime);
        }
}

// For deleting alarm
function deleteAlarm(click_id){

    var element =   document.getElementById("alarm"+click_id);
    var deleteIndex =   alarmListArr.indexOf(document.querySelector("#span"+click_id).innerText);
    alarmListArr.splice(deleteIndex,1);
    element.remove();

}

initializeClock();
setAlarmButton.addEventListener("click",setAlarm);