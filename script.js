const wordLength = 8;
const maxGuesses = 9;
const targetWord = "CHIPOTLE";
let gameOver = false;

const grid = document.querySelector("#grid");

for (let guess = 0; guess < maxGuesses; guess++) {
  const row = document.createElement("div");
  row.classList.add("row");

  for (let letter = 0; letter < wordLength; letter++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    row.appendChild(tile);
  }

  grid.appendChild(row);
}

let currentRow = 0;
let currentLetter = 0;

document.addEventListener("keydown", (event) => {
  if (/^[a-zA-Z]$/.test(event.key) && currentLetter < wordLength) {
    const tile = grid.children[currentRow].children[currentLetter];
    tile.textContent = event.key.toUpperCase();
    currentLetter++;
  }

  if (event.key === "Backspace" && currentLetter > 0) {
    currentLetter--;
    const tile = grid.children[currentRow].children[currentLetter];
    tile.textContent = "";
  }
      if (event.key === "Enter" && currentLetter === wordLength && !gameOver) {
    const row = grid.children[currentRow];
    const guess = [...row.children]
      .map((tile) => tile.textContent)
      .join("");

        const remainingLetters = {};

    // First, mark correct letters and count the answer's unmatched letters.
    for (let i = 0; i < wordLength; i++) {
      const tile = row.children[i];

      if (guess[i] === targetWord[i]) {
        tile.classList.add("correct");
      } else {
        const letter = targetWord[i];
        remainingLetters[letter] = (remainingLetters[letter] || 0) + 1;
      }
    }

    // Then, mark misplaced letters only while the answer still has a copy left.
    for (let i = 0; i < wordLength; i++) {
      const tile = row.children[i];

      if (guess[i] !== targetWord[i]) {
        const letter = guess[i];

        if (remainingLetters[letter] > 0) {
          tile.classList.add("present");
          remainingLetters[letter]--;
        } else {
          tile.classList.add("absent");
        }
      }
    }

    if (guess === targetWord) {
      gameOver = true;
      document.querySelector("#game-screen").hidden = true;
      document.querySelector("#win-screen").hidden = false;
      showConfetti();
    }

    else if (currentRow === maxGuesses - 1) {
      gameOver = true;
      document.querySelector("#game-screen").hidden = true;
      document.querySelector("#lose-screen").hidden = false;
    } else {
      currentRow++;
      currentLetter = 0;
    }
  }

  function showConfetti() {
  const confetti = document.querySelector("#confetti");
  const colors = ["#ac2318", "#441500", "#ffffff", "#bbbbbb", "#aaaaaa", "#72bf6a", "#fdf4bc"];

  for (let i = 0; i < 1000; i++) {
    const piece = document.createElement("span");
    piece.classList.add("confetti-piece");

    piece.style.setProperty("--left", `${Math.random() * 100}vw`);
    piece.style.setProperty("--color", colors[i % colors.length]);
    piece.style.setProperty("--delay", `${Math.random() * 1.5}s`);
    piece.style.setProperty("--duration", `${2 + Math.random() * 2}s`);
    piece.style.setProperty("--drift", `${Math.random() * 180 - 90}px`);

    confetti.appendChild(piece);
  }

  const surpriseButton = document.querySelector("#surprise-button");
  const surpriseImage = document.querySelector("#surprise-image");
  const buttonText = document.querySelector(".buttonText");

  surpriseButton.addEventListener("click", () => {
    surpriseButton.hidden = true;
    buttonText.hidden = true;
    surpriseImage.hidden = false;
    buttonText.hidden = true;
  });
}
});