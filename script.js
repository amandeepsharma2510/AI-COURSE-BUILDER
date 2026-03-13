const video = document.getElementById("video");
const stateText = document.getElementById("state");
const alertBox = document.getElementById("alertBox");

/*camEra kE LiYe*/

async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
  } catch (error) {
    console.error("Camera access denied", error);
  }
}

startCamera();

/*aLERt ke LIye*/

function alertTrigger() {

  stateText.innerText = "DROWSY ⚠";
  stateText.style.color = "#ff3b3b";

  showAlert("⚠ DRIVER DROWSINESS DETECTED");

  playAlarm();
}

/*MODERN ALERT*/

function showAlert(message){

  alertBox.innerText = message;
  alertBox.style.opacity = "1";
  alertBox.style.transform = "translateY(0px)";

  setTimeout(()=>{
    alertBox.style.opacity = "0";
    alertBox.style.transform = "translateY(-20px)";
  },3000);

}

/* aLarm sOUndd */

function playAlarm(){
  const alarm = new Audio("https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg");
  alarm.play();
}

/*CHHAAArtt*/

const ctx = document.getElementById("myChart");

const attentionChart = new Chart(ctx,{
  type:"line",

  data:{
    labels:["0","1","2","3","4","5"],

    datasets:[{
      label:"Driver Attention",
      data:[90,85,80,75,82,88],

      borderWidth:3,
      borderColor:"#00f7ff",
      backgroundColor:"rgba(0,247,255,0.1)",
      tension:0.4,
      fill:true,
      pointRadius:5
    }]
  },

  options:{
    responsive:true,

    plugins:{
      legend:{
        labels:{
          color:"white"
        }
      }
    },

    scales:{
      y:{
        ticks:{color:"white"},
        grid:{color:"rgba(255,255,255,0.1)"}
      },
      x:{
        ticks:{color:"white"},
        grid:{color:"rgba(255,255,255,0.1)"}
      }
    }
  }
});

/*Liveeee DATATAT siMulAtion*/

setInterval(()=>{

  const newValue = Math.floor(Math.random()*40)+60;

  attentionChart.data.datasets[0].data.push(newValue);
  attentionChart.data.datasets[0].data.shift();

  attentionChart.update();

  if(newValue < 70){
    alertTrigger();
  }

},4000);
function updateDriverState(state){

document.getElementById("state").innerText = state;

if(state === "Drowsy"){
document.getElementById("state").style.color = "red";
alertTrigger();
}

}