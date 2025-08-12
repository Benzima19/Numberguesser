// ----- Game state -----
let humanScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;
let yourValue = 1;

// ----- Core logic -----
function generateTarget() {
  return Math.floor(Math.random() * 10);
}
function compareGuesses(userGuess, computerGuess, targetNumber) {
  const u = Math.abs(userGuess - targetNumber);
  const c = Math.abs(computerGuess - targetNumber);
  return u <= c; // human wins ties
}
function updateScore(winner) {
  if (winner === "human") humanScore++;
  else if (winner === "computer") computerScore++;
}
function advanceRound() {
  currentRoundNumber++;
}

// ----- UI refs -----
const roundTitle = document.getElementById("roundTitle");
const targetLabel = document.getElementById("targetLabel");
const computerScoreEl = document.getElementById("computerScore");
const humanScoreEl = document.getElementById("humanScore");
const computerGuessEl = document.getElementById("computerGuess");
const yourGuessEl = document.getElementById("yourGuess");

const decBtn = document.getElementById("dec");
const incBtn = document.getElementById("inc");
const makeGuessBtn = document.getElementById("makeGuess");
const nextRoundBtn = document.getElementById("nextRound");

// Avatars (static two)
const humanAvatarEl = document.getElementById("humanAvatar");
const computerAvatarEl = document.getElementById("computerAvatar");
humanAvatarEl.src = "assets/human.png";
computerAvatarEl.src = "assets/computer.png";

// ----- Helpers -----
function setYourValue(n) {
  yourValue = Math.max(0, Math.min(9, n));
  yourGuessEl.textContent = yourValue;
}
function setControlsDisabled(disabled) {
  decBtn.disabled = disabled;
  incBtn.disabled = disabled;
  makeGuessBtn.disabled = disabled;
}
function enableNextRound(enable) {
  nextRoundBtn.disabled = !enable;
  nextRoundBtn.classList.toggle("enabled", enable);
}
function fireConfetti() {
  confetti({ particleCount: 100, spread: 70, origin: { y: 0.7 } });
  setTimeout(
    () =>
      confetti({
        particleCount: 70,
        spread: 90,
        scalar: 0.9,
        origin: { y: 0.7 },
      }),
    160
  );
}

// ----- Events -----
decBtn.addEventListener("click", () => setYourValue(yourValue - 1));
incBtn.addEventListener("click", () => setYourValue(yourValue + 1));

makeGuessBtn.addEventListener("click", () => {
  const computerGuess = generateTarget();
  const target = generateTarget();

  computerGuessEl.textContent = computerGuess;
  computerGuessEl.classList.remove("muted");
  targetLabel.textContent = `Target Number: ${target}`;

  const humanWins = compareGuesses(yourValue, computerGuess, target);
  updateScore(humanWins ? "human" : "computer");
  humanScoreEl.textContent = humanScore;
  computerScoreEl.textContent = computerScore;

  if (humanWins) fireConfetti();

  setControlsDisabled(true);
  enableNextRound(true);
});

nextRoundBtn.addEventListener("click", () => {
  advanceRound();
  roundTitle.textContent = `Round ${currentRoundNumber}`;
  targetLabel.textContent = "Target Number: ?";
  computerGuessEl.textContent = "?";
  computerGuessEl.classList.add("muted");
  setYourValue(1);
  setControlsDisabled(false);
  enableNextRound(false);
});

// init
setYourValue(1);
