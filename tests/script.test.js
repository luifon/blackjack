// __tests__/script.test.js

import Script from '../scripts/script.js';
import UI from '../scripts/ui.js';
import BlackjackService from '../scripts/blackjack.service.js';


describe('Script', () => {
    let script;
    let mockBlackjackService;
    let mockUI;

    beforeEach(() => {
        mockBlackjackService = new BlackjackService();
        mockBlackjackService.resetRounds = jest.fn();
        mockBlackjackService.startGame = jest.fn();
        mockBlackjackService.playerHit = jest.fn();
        mockBlackjackService.dealerTurn = jest.fn();
        mockBlackjackService.calculateHandScore = jest.fn();
        mockBlackjackService.determineWinner = jest.fn();

        mockUI = new UI();
        mockUI.displayPlayerHand = jest.fn();
        mockUI.displayDealerHand = jest.fn();
        mockUI.displayPlayerScore = jest.fn();
        mockUI.displayDealerScore = jest.fn();
        mockUI.displayMessage = jest.fn();
        mockUI.updateRounds = jest.fn();
        mockUI.clearUI = jest.fn();
        mockUI.disableButtons = jest.fn();
        mockUI.enableButtons = jest.fn();
        mockUI.bindStartGameButton = jest.fn();
        mockUI.bindStartRoundButton = jest.fn();
        mockUI.bindHitButton = jest.fn();
        mockUI.bindStandButton = jest.fn();

        script = new Script();
        script.blackjackService = mockBlackjackService;
        script.ui = mockUI;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('startNewGame', () => {
        test('should reset rounds and start a new game round', () => {
            script.startGameRound = jest.fn();
            script.startNewGame();
            expect(mockBlackjackService.resetRounds).toHaveBeenCalled();
            expect(script.startGameRound).toHaveBeenCalledWith(true);
        });
    });

    describe('startNewRound', () => {
        test('should start a new round if no round is in progress', () => {
            script.startGameRound = jest.fn();
            script.isRoundInProgress = false;
            script.startNewRound();
            expect(script.startGameRound).toHaveBeenCalledWith(false);
        });

        test('should not start a new round if a round is already in progress', () => {
            script.startGameRound = jest.fn();
            script.isRoundInProgress = true;
            script.startNewRound();
            expect(script.startGameRound).not.toHaveBeenCalled();
        });
    });

    describe('hit', () => {
        test('should hit if game is in progress and update player score', () => {
            script.isGameInProgress = true;
            mockBlackjackService.playerHit.mockReturnValue(18); // Mocking player score

            script.hit();

            expect(mockBlackjackService.playerHit).toHaveBeenCalled();
            expect(mockUI.displayPlayerHand).toHaveBeenCalledWith(mockBlackjackService.player.hand);
            expect(mockUI.displayPlayerScore).toHaveBeenCalledWith(18);
        });

        test('should end game if player busts (score > 21)', () => {
            script.isGameInProgress = true;
            mockBlackjackService.playerHit.mockReturnValue(22); // Mocking player bust
            jest.spyOn(script, 'endGame');

            script.hit();

            expect(mockBlackjackService.dealer.rounds).toBe(1); // Dealer rounds incremented
            expect(script.endGame).toHaveBeenCalledWith('Dealer wins. Player busts.');
        });

        test('should not hit if game is not in progress', () => {
            script.isGameInProgress = false;
            jest.spyOn(script, 'endGame');

            script.hit();

            expect(mockBlackjackService.playerHit).not.toHaveBeenCalled();
            expect(mockUI.displayPlayerHand).not.toHaveBeenCalled();
            expect(mockUI.displayPlayerScore).not.toHaveBeenCalled();
            expect(script.endGame).not.toHaveBeenCalled();
        });
    });

});

