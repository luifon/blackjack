import UI from './ui.js';
import BlackjackService from './blackjack.service.js';

document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI();
    const blackjackService = new BlackjackService();
    let gameInProgress = false;

    const startNewGame = () => {
        ui.clearUI();
        const { playerHand, dealerHand, playerScore, dealerScore } = blackjackService.startGame();
        ui.displayPlayerHand(playerHand);
        ui.displayDealerHand(dealerHand, true);
        ui.displayPlayerScore(playerScore);
        ui.displayDealerScore(dealerScore);
        ui.enableButtons();
        ui.displayMessage('Game started. Hit or stand?');
        gameInProgress = true;
    };

    const hit = () => {
        if (gameInProgress) {
            const { card, playerScore } = blackjackService.playerHit();
            ui.displayPlayerHand(blackjackService.playerHand);
            ui.displayPlayerScore(playerScore);
            if (playerScore > 21) {
                endGame('Dealer wins. Player busts.');
            }
        }
    };

    const stand = () => {
        if (gameInProgress) {
            const dealerScore = blackjackService.dealerTurn();
            ui.displayDealerHand(blackjackService.dealerHand, false);
            ui.displayDealerScore(dealerScore);
            const playerScore = blackjackService.calculateHandScore(blackjackService.playerHand);
            const winner = blackjackService.determineWinner(playerScore, dealerScore);
            if (winner === 'player') {
                endGame('Player wins.');
            } else if (winner === 'dealer') {
                endGame('Dealer wins.');
            } else {
                endGame('It\'s a draw.');
            }
        }
    };

    const endGame = (message) => {
        ui.disableButtons();
        ui.displayMessage(message);
        gameInProgress = false;
    };

    ui.bindStartButton(startNewGame);
    ui.bindHitButton(hit);
    ui.bindStandButton(stand);
});
