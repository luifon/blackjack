import UI from './ui.js';
import BlackjackService from './blackjack.service.js';

document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI();
    const blackjackService = new BlackjackService();
    let isGameInProgress = false;
    let isRoundInProgress = false;

    const startNewGame = () => {
        blackjackService.resetRounds();
        startGameRound(true);
    };

    const startNewRound = () => {
        if (!isRoundInProgress) {
            startGameRound(false);
        }
    }

    const startGameRound = (isNewGame) => {
        ui.clearUI(isNewGame);
        blackjackService.startGame();
        ui.displayPlayerHand(blackjackService.player.hand);
        ui.displayDealerHand(blackjackService.dealer.hand, true);
        ui.displayPlayerScore(blackjackService.player.score);
        ui.displayDealerScore(blackjackService.dealer.score);
        ui.enableButtons();
        ui.displayMessage('Game started. Hit or stand?');
        isGameInProgress = true;
        isRoundInProgress = true;
    }

    const hit = () => {
        if (isGameInProgress) {
            const playerScore = blackjackService.playerHit();
            ui.displayPlayerHand(blackjackService.player.hand);
            ui.displayPlayerScore(playerScore);
            if (playerScore > 21) {
                blackjackService.dealer.rounds++;
                endGame('Dealer wins. Player busts.');
            }
        }
    };

    const stand = () => {
        if (isGameInProgress) {
            const dealerScore = blackjackService.dealerTurn();
            ui.displayDealerHand(blackjackService.dealer.hand, false);
            ui.displayDealerScore(dealerScore);
            const playerScore = blackjackService.calculateHandScore(blackjackService.player.hand);
            const winner = blackjackService.determineWinner(playerScore, dealerScore);
            const winnerMessage = getWinnerMessage(winner);
            endGame(winnerMessage);
        }
    };

    const getWinnerMessage = (winner) => {
        if (winner === 'Player') {
            blackjackService.player.rounds++;
            return `${winner} wins.`
        };
        if (winner === 'Dealer') {
            blackjackService.dealer.rounds++;
            return `${winner} wins.`
        };
        return 'It\'s a draw.';
    }

    const endGame = (message) => {
        ui.disableButtons();
        ui.displayMessage(message);
        ui.updateRounds(blackjackService.player.rounds, blackjackService.dealer.rounds);
        isGameInProgress = false;
        isRoundInProgress = false;
    };

    ui.bindStartGameButton(startNewGame);
    ui.bindStartRoundButton(startNewRound);
    ui.bindHitButton(hit);
    ui.bindStandButton(stand);
});
