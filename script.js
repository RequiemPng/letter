const flowerContainer = document.querySelector(".floating-flowers");
const envelope = document.getElementById("envelope");
const letter = document.getElementById("letter");
const openButton = document.getElementById("openButton");

const flowerCount = 18;

const createFlower = () => {
  const flower = document.createElement("span");
  flower.className = "flower";
  const start = `${Math.random() * 100}vw`;
  const end = `${Math.random() * 100}vw`;
  const duration = `${12 + Math.random() * 10}s`;
  const delay = `${Math.random() * -15}s`;

  flower.style.setProperty("--x-start", start);
  flower.style.setProperty("--x-end", end);
  flower.style.setProperty("--duration", duration);
  flower.style.animationDelay = delay;
  flower.style.left = start;

  return flower;
};

const seedFlowers = () => {
  flowerContainer.innerHTML = "";
  for (let i = 0; i < flowerCount; i += 1) {
    flowerContainer.appendChild(createFlower());
  }
};

const openLetter = () => {
  envelope.classList.add("is-open");
  letter.classList.add("is-visible");
  letter.setAttribute("aria-hidden", "false");
};

openButton.addEventListener("click", openLetter);

envelope.addEventListener("click", openLetter);

seedFlowers();

window.addEventListener("resize", seedFlowers);
