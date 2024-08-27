document.addEventListener("DOMContentLoaded", () => {
  const numbers = document.querySelectorAll(".number");
  // Function to calculate the position of numbers around the clock face
  function calculateNumberPosition(numberIndex, totalNumbers) {
    const angle = (360 / totalNumbers) * numberIndex;
    const radius = 15; // Adjust the radius to position the numbers closer or farther from the center
    const centerX = 16; // X-coordinate of the center of the clock
    const centerY = 16; // Y-coordinate of the center of the clock

    // Calculate the X and Y coordinates based on the angle and radius
    const x = centerX + radius * Math.cos((angle - 90) * (Math.PI / 180));
    const y = centerY + radius * Math.sin((angle - 90) * (Math.PI / 180));

    return { x, y };
  }

  // Position each number around the clock face using trigonometry
  for (const [index, number] of numbers.entries()) {
    const position = calculateNumberPosition(index + 1, numbers.length);
    number.style.left = position.x + "rem";
    number.style.top = position.y + "rem";
  }

  const secondHand = document.querySelector(".second-hand");
  const minuteHand = document.querySelector(".minute-hand");
  const hourHand = document.querySelector(".hour-hand");
  const audio = document.querySelector("audio");
  const button = document.querySelector(".button");

  updateClock();

  audio.addEventListener("ended", clockSound);

  button.addEventListener("click", clockSound);

  setInterval(updateClock, 1000);
  
  function updateClock() {
    const now = new Date();
  
    let currentSeconds = now.getSeconds();
    let currentMinute = now.getMinutes();
    let currentHour = now.getHours();
    currentHour = currentHour % 12 || 12; // Convert to 12-hour format
  
    const secondDegree = (currentSeconds / 60) * 360 + 90;
    const minuteDegree =
      (currentMinute / 60) * 360 + (currentSeconds / 60) * 6 + 90;
    const hourDegree = (currentHour / 12) * 360 + (currentMinute / 60) * 30 + 90;
  
    secondHand.style.transform = setRotate(secondDegree, secondHand);
    minuteHand.style.transform = setRotate(minuteDegree, minuteHand);
    hourHand.style.transform = setRotate(hourDegree, hourHand);
  
    const hourSpan = document.querySelector(".hour");
    const minuteSpan = document.querySelector(".minute");
    const secondSpan = document.querySelector(".second");
  
    const hours = currentHour.toString().padStart(2, 0);
    const minutes = currentMinute.toString().padStart(2, 0);
    const seconds = currentSeconds.toString().padStart(2, 0);
  
    hourSpan.textContent = hours;
    minuteSpan.textContent = minutes;
    secondSpan.textContent = seconds;
  }
  
  function setRotate(deg, pointer) {
    if (deg === 90) {
      pointer.style.transition = "all 0s";
    } else {
      pointer.style.transition = "all 0.5s cubic-bezier(0.3, 0.1, 0.4, 0.9)";
    }
    return `rotate(${deg}deg)`;
  }
  
  function clockSound() {
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  }
});

