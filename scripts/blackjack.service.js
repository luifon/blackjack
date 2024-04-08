import Player from './player.model.js';

export default class BlackjackService {
    constructor() {
        this.deck = [];
        this.player = new Player();
        this.dealer = new Player();
    }

    resetRounds() {
        this.player.rounds = 0;
        this.dealer.rounds = 0;
    }

    startGame() {
        this.deck = this.createDeck();
        this.player.score = 0;
        this.dealer.score = 0;

        this.shuffleDeck(this.deck);

        this.player.hand = [this.drawCard(), this.drawCard()];
        this.player.score = this.calculateHandScore(this.player.hand);
        this.dealer.hand = [this.drawCard(), this.drawCard()];
        this.dealer.score = this.calculateHandScore([this.dealer.hand[0]]);
    }

    createDeck() {
        const suits = ['H', 'D', 'C', 'S']; // Hearts, Diamonds, Clubs, Spades
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

        return suits.flatMap(suit =>
            values.map(value => ({ value, suit }))
        );
    }

    shuffleDeck(deck) {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
    }

    drawCard() {
        return this.deck.pop();
    }

    calculateHandScore(hand) {
        let score = 0;
        let aceCount = 0;

        for (let card of hand) {
            if (card.value === 'A') {
                score += 11;
                aceCount++;
            } else if (['J', 'Q', 'K'].includes(card.value)) {
                score += 10;
            } else {
                score += parseInt(card.value);
            }
        }

        // Adjust score for aces
        while (score > 21 && aceCount > 0) {
            score -= 10;
            aceCount--;
        }

        return score;
    }

    determineWinner(playerScore, dealerScore) {
        if (playerScore > 21) return 'Dealer';
        if (dealerScore > 21) return 'Player';
        if (playerScore > dealerScore) return 'Player';
        if (playerScore < dealerScore) return 'Dealer';
        return 'draw';
    }

    playerHit() {
        const card = this.drawCard();
        this.player.hand.push(card);
        this.playerScore = this.calculateHandScore(this.player.hand);

        return this.playerScore;
    }

    dealerTurn() {
        this.dealer.hand[1] = this.drawCard();
        this.dealerScore = this.calculateHandScore(this.dealer.hand);

        while (this.dealerScore < 17) {
            const card = this.drawCard();
            this.dealer.hand.push(card);
            this.dealerScore = this.calculateHandScore(this.dealer.hand);
        }

        return this.dealerScore;
    }
}
