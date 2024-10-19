const clock = document.querySelector("h1#clock")

function dDay(){
    const now = new Date();

    const hour = now.getHours();
    const min = now.getMinutes();
    const sec = now.getSeconds();

    const formattedHour = String(hour).padStart(2, "0");
    const formattedMin = String(min).padStart(2, "0");
    const formattedSec = String(sec).padStart(2, "0");

    clock.innerText = `${formattedHour}: ${formattedMin}: ${formattedSec}`
}

dDay();
setInterval(() => dDay(), 1000);