export default class UI {
    constructor() {
        this.playerHandElement = document.getElementById('player-hand');
        this.dealerHandElement = document.getElementById('dealer-hand');
        this.dealerRoundsElement = document.getElementById('dealer-round-score');
        this.playerRoundsElement = document.getElementById('player-round-score');
        this.dealerScoreElement = document.getElementById('dealer-score');
        this.playerScoreElement = document.getElementById('player-score');
        this.messageElement = document.getElementById('message');
        this.startGameButton = document.getElementById('start-game-button');
        this.startRoundButton = document.getElementById('start-round-button');
        this.hitButton = document.getElementById('hit-button');
        this.standButton = document.getElementById('stand-button');
    }

    displayPlayerHand(cards) {
        this.playerHandElement.innerHTML = '';
        cards.forEach(card => {
            const cardElement = document.createElement('img');
            cardElement.classList.add('card');
            cardElement.src = `./cards/${card.value}-${card.suit}.png`;
            this.playerHandElement.appendChild(cardElement);
        });
    }

    displayDealerHand(cards, hideSecondCard = false) {
        this.dealerHandElement.innerHTML = '';
        cards.forEach((card, index) => {
            const cardElement = document.createElement('img');
            cardElement.classList.add('card');
            if (index === 1 && hideSecondCard) {
                cardElement.src = `./cards/BACK.png`;
            } else {
                cardElement.src = `./cards/${card.value}-${card.suit}.png`;
            }
            this.dealerHandElement.appendChild(cardElement);
        });
    }

    displayPlayerScore(score) {
        this.playerScoreElement.textContent = `Player Score: ${score}`;
    }

    displayDealerScore(score) {
        this.dealerScoreElement.textContent = `Dealer Score: ${score}`;
    }

    displayMessage(message) {
        this.messageElement.textContent = message;
    }

    updateRounds(playerRounds, dealerRounds) {
        this.playerRoundsElement.textContent = playerRounds;
        this.dealerRoundsElement.textContent = dealerRounds;
    }

    clearUI(isNewGame) {
        this.playerHandElement.innerHTML = '';
        this.dealerHandElement.innerHTML = '';
        this.playerScoreElement.textContent = '';
        this.dealerScoreElement.textContent = '';
        this.messageElement.textContent = '';
        if (isNewGame) {
            this.dealerRoundsElement.textContent = '0';
            this.playerRoundsElement.textContent = '0';
        }
    }

    disableButtons() {
        this.hitButton.disabled = true;
        this.standButton.disabled = true;
    }

    enableButtons() {
        this.hitButton.disabled = false;
        this.standButton.disabled = false;
    }

    bindStartGameButton(handler) {
        this.startGameButton.addEventListener('click', handler);
    }

    bindStartRoundButton(handler) {
        this.startRoundButton.addEventListener('click', handler);
    }

    bindHitButton(handler) {
        this.hitButton.addEventListener('click', handler);
    }

    bindStandButton(handler) {
        this.standButton.addEventListener('click', handler);
    }
}