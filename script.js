let wins = 0;
let losses = 0;
let lossStreak = 0;
let minutesLeft = 30;

const mood = document.querySelector('#mood');
const time = document.querySelector('#time');
const result = document.querySelector('#result');
const status = document.querySelector('#status');
const advice = document.querySelector('#advice');
const reason = document.querySelector('#reason');
const winButton = document.querySelector('#win');
const lossButton = document.querySelector('#loss');
const breakButton = document.querySelector('#break');
const lastAction = document.querySelector('#last-action');

function updatePage() {
  let gamesPlayed = wins + losses;
  let state = 'play';

  // Check the stopping conditions before suggesting another game.
  if (minutesLeft < 15) {
    state = 'stop';
    advice.textContent = 'Leave it there.';
    reason.textContent = "There's not enough time for a full game. Next time.";
  } else if (mood.value === 'tired' || gamesPlayed >= 5) {
    state = 'stop';
    advice.textContent = 'Call it a night.';
    reason.textContent = "You've had enough for now. The game will be here tomorrow.";
  } else if (mood.value === 'annoyed' || lossStreak >= 2) {
    state = 'pause';
    advice.textContent = 'Put the controller down for a bit.';
    reason.textContent = "Don't queue just to win it back. Get some water, then decide.";
  } else {
    advice.textContent = 'Go on, one more.';
    reason.textContent = "You've got time and you're feeling good. Enjoy the game.";
  }

  result.className = 'result ' + state;
  status.textContent = state === 'pause' ? 'TAKE A BREAK' : state.toUpperCase();
  document.querySelector('#score').textContent = wins + ' wins · ' + losses + ' losses · ' + gamesPlayed + ' played';
  document.querySelector('#time-left').textContent = minutesLeft + ' min left';
  winButton.disabled = state !== 'play';
  lossButton.disabled = state !== 'play';
  breakButton.hidden = state !== 'pause';
}

function recordGame(won) {
  if (won) {
    wins++;
    lossStreak = 0;
    lastAction.textContent = 'A win. Nice.';
  } else {
    losses++;
    lossStreak++;
    lastAction.textContent = 'A loss. It happens.';
  }
  minutesLeft = Math.max(0, minutesLeft - 15);
  updatePage();
}

winButton.addEventListener('click', function () { recordGame(true); });
lossButton.addEventListener('click', function () { recordGame(false); });
mood.addEventListener('change', updatePage);
time.addEventListener('change', function () {
  minutesLeft = Number(time.value);
  updatePage();
});

breakButton.addEventListener('click', function () {
  lossStreak = 0;
  mood.value = 'calm';
  lastAction.textContent = 'Back from your break. Update your time left if you need to.';
  updatePage();
});

document.querySelector('#reset').addEventListener('click', function () {
  wins = 0;
  losses = 0;
  lossStreak = 0;
  minutesLeft = 30;
  mood.value = 'calm';
  time.value = '30';
  lastAction.textContent = 'Fresh start. Your results have been cleared.';
  updatePage();
});

updatePage();
