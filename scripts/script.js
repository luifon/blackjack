import UI from './ui.js';
import BlackjackService from './blackjack.service.js';

export default class Script {
    constructor() {
        this.ui = new UI();
        this.blackjackService = new BlackjackService();
        this.isGameInProgress = false;
        this.isRoundInProgress = false;
    }

    startNewGame = () => {
        this.blackjackService.resetRounds();
        this.startGameRound(true);
    };

    startNewRound = () => {
        if (!this.isRoundInProgress) {
            this.startGameRound(false);
        }
    };

    hit = () => {
        if (this.isGameInProgress) {
            const playerScore = this.blackjackService.playerHit();
            this.ui.displayPlayerHand(this.blackjackService.player.hand);
            this.ui.displayPlayerScore(playerScore);
            if (playerScore > 21) {
                this.blackjackService.dealer.rounds++;
                this.endGame('Dealer wins. Player busts.');
            }
        }
    };

    stand = () => {
        if (this.isGameInProgress) {
            const dealerScore = this.blackjackService.dealerTurn();
            this.ui.displayDealerHand(this.blackjackService.dealer.hand, false);
            this.ui.displayDealerScore(dealerScore);
            const playerScore = this.blackjackService.calculateHandScore(this.blackjackService.player.hand);
            const winner = this.blackjackService.determineWinner(playerScore, dealerScore);
            const winnerMessage = this.getWinnerMessage(winner);
            this.endGame(winnerMessage);
        }
    };

    startGameRound = (isNewGame) => {
        this.ui.clearUI(isNewGame);
        this.blackjackService.startGame();
        this.ui.displayPlayerHand(this.blackjackService.player.hand);
        this.ui.displayDealerHand(this.blackjackService.dealer.hand, true);
        this.ui.displayPlayerScore(this.blackjackService.player.score);
        this.ui.displayDealerScore(this.blackjackService.dealer.score);
        this.ui.enableButtons();
        this.ui.displayMessage('Game started. Hit or stand?');
        this.isGameInProgress = true;
        this.isRoundInProgress = true;
    };

    getWinnerMessage = (winner) => {
        if (winner === 'Player') {
            this.blackjackService.player.rounds++;
            return `${winner} wins.`
        }
        if (winner === 'Dealer') {
            this.blackjackService.dealer.rounds++;
            return `${winner} wins.`
        }
        return 'It\'s a draw.';
    };

    endGame = (message) => {
        this.ui.disableButtons();
        this.ui.displayMessage(message);
        this.ui.updateRounds(this.blackjackService.player.rounds, this.blackjackService.dealer.rounds);
        this.isGameInProgress = false;
        this.isRoundInProgress = false;
    };

    bindButtons = () => {
        document.addEventListener('DOMContentLoaded', () => {
            this.ui.bindStartGameButton(this.startNewGame);
            this.ui.bindStartRoundButton(this.startNewRound);
            this.ui.bindHitButton(this.hit);
            this.ui.bindStandButton(this.stand);
        });
    }

}

const script = new Script();

script.bindButtons();