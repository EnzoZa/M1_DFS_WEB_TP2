const cards = document.querySelectorAll('.memory-card');
const nbCards = document.querySelectorAll('.memory-card').length;

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let countTry = 0;
let pairMatched = 0;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;
  countTry+=1;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  if(isMatch){
    disableCards();
    pairMatched+=2;
    if(pairMatched==nbCards){
      document.getElementById('countTry').innerHTML = countTry;
      Array.from(document.getElementsByClassName('end-game')).forEach(e => e.style.visibility = "visible");
      Array.from(document.getElementsByClassName('end-game')).forEach(e => e.style.display = "block");
    }
  }
  else{
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

function restart() {
  cards.forEach(card => {
    card.addEventListener('click', flipCard);
    card.classList.remove('flip');
  });
  countTry = 0;
  pairMatched = 0;
}

cards.forEach(card => card.addEventListener('click', flipCard));