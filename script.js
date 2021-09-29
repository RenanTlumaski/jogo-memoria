const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let trancarTabuleiro = false;

function flipCard() {
    if(trancarTabuleiro) return;
    if(this === firstCard) return;

    this.classList.add('flip');      // o método toggle adiciona e tira (alternância), o add só adiciona uma vez
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;           // o elemento clicado vai retornar exatamente o card
        return;
    }

    secondCard = this;
    hasFlippedCard = false;         // zera o hasFlippedCard

    checkForMath();

}

function checkForMath() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        return;
    }

    unflipCards();
}

function disableCards () {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    trancarTabuleiro = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);

}

function resetBoard() {
    [hasFlippedCard, trancarTabuleiro] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function embaralhar() {
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    })
})();




cards.forEach((card) => {
    card.addEventListener('click', flipCard)
});
