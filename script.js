let minutesLeft = 60;
let delays = 0;

const energy = document.querySelector('#energy');
const time = document.querySelector('#time');
const result = document.querySelector('#result');
const status = document.querySelector('#status');
const advice = document.querySelector('#advice');
const reason = document.querySelector('#reason');
const delayButton = document.querySelector('#delay');
const lastAction = document.querySelector('#last-action');

function updatePage() {
  // Energy and time come first. Waiting can also change the plan.
  if (energy.value === 'tired') {
    result.className = 'result rest';
    status.textContent = 'REST TODAY';
    advice.textContent = 'Take the shoes off.';
    reason.textContent = "If you're actually worn out, leave the gym for another day.";
  } else if (minutesLeft < 20) {
    result.className = 'result rest';
    status.textContent = 'SKIP THE TRIP';
    advice.textContent = 'The gym can wait.';
    reason.textContent = "There's barely time to get there. Pick a better time instead of rushing.";
  } else if (energy.value === 'low' || minutesLeft < 45 || delays >= 2) {
    result.className = 'result short';
    status.textContent = 'KEEP IT SHORT';
    advice.textContent = 'Just go for a little bit.';
    reason.textContent = "You don't need to make a whole evening of it. Keep the plan small.";
    if (delays >= 2) {
      reason.textContent = "You've pressed that button " + delays + " times. Make it a short visit before you lose more time.";
    }
  } else {
    result.className = 'result go';
    status.textContent = 'HEAD OUT';
    advice.textContent = 'Grab your keys.';
    reason.textContent = "You've got time and you feel fine. Getting out the door is the hard part.";
  }

  document.querySelector('#delay-count').textContent = 'Minutes spent putting it off: ' + delays * 5;
  document.querySelector('#time-left').textContent = minutesLeft + ' minutes left. Each click uses 5 minutes.';
  delayButton.disabled = minutesLeft < 5 || energy.value === 'tired';
}

energy.addEventListener('change', updatePage);

time.addEventListener('change', function () {
  minutesLeft = Number(time.value);
  delays = 0;
  lastAction.textContent = 'New time picked. The waiting count starts again.';
  updatePage();
});

delayButton.addEventListener('click', function () {
  delays++;
  minutesLeft -= 5;
  if (delays === 1) {
    lastAction.textContent = 'Five minutes. Okay, but actually five.';
  } else {
    lastAction.textContent = 'Still here, then.';
  }
  updatePage();
});

document.querySelector('#reset').addEventListener('click', function () {
  minutesLeft = 60;
  delays = 0;
  energy.value = 'ready';
  time.value = '60';
  lastAction.textContent = 'The longer you wait, the smaller the plan gets.';
  updatePage();
});

updatePage();
