const flowerContainer = document.querySelector(".floating-flowers");
const envelope = document.getElementById("envelope");
const letter = document.getElementById("letter");
const openButton = document.getElementById("openButton");
const playerToggle = document.getElementById("playerToggle");
const bgm = document.getElementById("bgm");

const flowerCount = 18;
let setButtonState = () => {};

if (bgm) {
  bgm.volume = 0.1;
}

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
  if (bgm && bgm.paused) {
    bgm.play()
      .then(() => setButtonState(true))
      .catch(() => setButtonState(false));
  }
};

openButton.addEventListener("click", openLetter);

envelope.addEventListener("click", openLetter);

seedFlowers();

window.addEventListener("resize", seedFlowers);

if (playerToggle && bgm) {
  setButtonState = (isPlaying) => {
    playerToggle.textContent = isPlaying ? "❚❚" : "▶";
  };

  playerToggle.addEventListener("click", async () => {
    try {
      if (bgm.paused) {
        await bgm.play();
        setButtonState(true);
      } else {
        bgm.pause();
        setButtonState(false);
      }
    } catch (err) {
      setButtonState(false);
    }
  });

  bgm.addEventListener("ended", () => setButtonState(false));
}
