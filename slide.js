const prev = document.querySelector(".chev.left");
const next = document.querySelector(".chev.right");
const slides = Array.from(document.querySelectorAll(".slide-item"));
const track = document.querySelector(".track");
const slideShow = document.querySelector(".slideshow");
const dots = document.querySelectorAll(".dot");

let currentIndex = 1;
const NEXT = 1;
const PREV = -1;

const originLength = slides.length;
let canControl = true;


const firstSlide = slides[0].cloneNode(true);
const lastSlide = slides.at(-1).cloneNode(true);

track.append(firstSlide);
track.prepend(lastSlide);


setPosition(true);
updateDots();

function calNewIndex(step) {
  if (!canControl) return;
  
  currentIndex += step;
  
  track.ontransitionend = () => {

    if (currentIndex > originLength) {
      currentIndex = 1; 
      setPosition(true);
    }
    if (currentIndex === 0) {
      currentIndex = originLength; 
      setPosition(true);
    }
    canControl = true;
    updateDots();
  };
  
  setPosition();
  updateDots();
}

function setPosition(instant = false) {
  if (!instant) {
    canControl = false;
  }
  track.style.transition = instant ? "none" : "ease 0.5s";
  track.style.translate = `${currentIndex * 100 * -1}%`;
}

prev.addEventListener("click", function () {
  if (!canControl) return;
  calNewIndex(PREV);
});

next.addEventListener("click", function () {
  if (!canControl) return;
  calNewIndex(NEXT);
});


let autoPlay;

function enableAutoPlay() {
  autoPlay = setInterval(() => {
    if (canControl) {
      calNewIndex(NEXT);
    }
  }, 5000);
}

function stopAutoPlay() {
  clearInterval(autoPlay);
}


enableAutoPlay();


slideShow.addEventListener("mouseenter", () => {
  stopAutoPlay();
});

slideShow.addEventListener("mouseleave", () => {
  enableAutoPlay();
});


function goToSlide(targetSlideIndex) {
  if (!canControl) return;
  
  stopAutoPlay();
  
  const targetIndex = targetSlideIndex + 1; 
  const step = targetIndex - currentIndex;
  
  if (step !== 0) {
    calNewIndex(step);
  }
  

  setTimeout(() => {
    enableAutoPlay();
  }, 100);
}

function updateDots() {
  dots.forEach(dot => dot.classList.remove("active"));


  let dotIndex;
  if (currentIndex === 0) {
    dotIndex = originLength - 1; 
  } else if (currentIndex === originLength + 1) {
    dotIndex = 0; 
  } else {
    dotIndex = currentIndex - 1; 
  }

  if (dots[dotIndex]) {
    dots[dotIndex].classList.add("active");
  }
}


dots.forEach((dot, index) => {
  dot.addEventListener("click", function () {
    goToSlide(index);
  });
});