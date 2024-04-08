export default class BlackjackService {
    constructor() {
        this.deck = [];
        this.playerHand = [];
        this.dealerHand = [];
        this.playerScore = 0;
        this.dealerScore = 0;
        this.playerRoundsWon = 0;
        this.dealerRoundsWon = 0;
    }

    startGame() {
        this.deck = this.createDeck();
        this.playerScore = 0;
        this.dealerScore = 0;

        this.shuffleDeck(this.deck);

        this.playerHand = [this.drawCard(), this.drawCard()];
        this.dealerHand = [this.drawCard(), this.drawCard()];

        return {
            playerHand: this.playerHand,
            dealerHand: [this.dealerHand[0], 'hidden'],
            playerScore: this.calculateHandScore(this.playerHand),
            dealerScore: this.calculateHandScore([this.dealerHand[0]]),
        };
    }

    createDeck() {
        const suits = ['H', 'D', 'C', 'S'];
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
        if (playerScore > 21) {
            return 'dealer';
        } else if (dealerScore > 21) {
            return 'player';
        } else if (playerScore > dealerScore) {
            return 'player';
        } else if (playerScore < dealerScore) {
            return 'dealer';
        } else {
            return 'draw';
        }
    }

    playerHit() {
        const card = this.drawCard();
        this.playerHand.push(card);
        const playerScore = this.calculateHandScore(this.playerHand);

        return { card, playerScore };
    }

    dealerTurn() {
        // Reveal dealer's hidden card
        this.dealerHand[1] = this.drawCard();
        let dealerScore = this.calculateHandScore(this.dealerHand);

        // Dealer hits until score is 17 or higher
        while (dealerScore < 17) {
            const card = this.drawCard();
            this.dealerHand.push(card);
            dealerScore = this.calculateHandScore(this.dealerHand);
        }

        return dealerScore;
    }
}
