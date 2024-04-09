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
            mockBlackjackService.playerHit.mockReturnValue(18);

            script.hit();

            expect(mockBlackjackService.playerHit).toHaveBeenCalled();
            expect(mockUI.displayPlayerHand).toHaveBeenCalledWith(mockBlackjackService.player.hand);
            expect(mockUI.displayPlayerScore).toHaveBeenCalledWith(18);
        });

        test('should end game if player busts (score > 21)', () => {
            script.isGameInProgress = true;
            mockBlackjackService.playerHit.mockReturnValue(22);
            jest.spyOn(script, 'endGame');

            script.hit();

            expect(mockBlackjackService.dealer.rounds).toBe(1);
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


    describe('stand', () => {
        test('should end game and determine winner when player stands', () => {
            script.isGameInProgress = true;
            mockBlackjackService.dealerTurn.mockReturnValue(18);
            mockBlackjackService.calculateHandScore.mockReturnValue(20);
            mockBlackjackService.determineWinner.mockReturnValue('Player');
            const expectedWinnerMessage = 'Player wins.';
            jest.spyOn(script, 'endGame');

            script.stand();

            expect(mockBlackjackService.dealerTurn).toHaveBeenCalled();
            expect(mockUI.displayDealerHand).toHaveBeenCalledWith(mockBlackjackService.dealer.hand, false);
            expect(mockUI.displayDealerScore).toHaveBeenCalledWith(18);
            expect(mockBlackjackService.calculateHandScore).toHaveBeenCalledWith(mockBlackjackService.player.hand);
            expect(mockBlackjackService.determineWinner).toHaveBeenCalledWith(20, 18);
            expect(script.endGame).toHaveBeenCalledWith(expectedWinnerMessage);
        });

        test('should not stand if game is not in progress', () => {
            script.isGameInProgress = false;
            jest.spyOn(script, 'endGame');

            script.hit();

            expect(mockBlackjackService.dealerTurn).not.toHaveBeenCalled();
            expect(mockUI.displayDealerHand).not.toHaveBeenCalled();
            expect(mockUI.displayDealerScore).not.toHaveBeenCalled();
            expect(script.endGame).not.toHaveBeenCalled();
        });
    })

    describe('startGameRound', () => {
        test('should start a new game round', () => {
            const isNewGame = true;

            script.startGameRound(isNewGame);

            expect(mockUI.clearUI).toHaveBeenCalledWith(isNewGame);
            expect(mockBlackjackService.startGame).toHaveBeenCalled();
            expect(mockUI.displayPlayerHand).toHaveBeenCalledWith(mockBlackjackService.player.hand);
            expect(mockUI.displayDealerHand).toHaveBeenCalledWith(mockBlackjackService.dealer.hand, true);
            expect(mockUI.displayPlayerScore).toHaveBeenCalledWith(mockBlackjackService.player.score);
            expect(mockUI.displayDealerScore).toHaveBeenCalledWith(mockBlackjackService.dealer.score);
            expect(mockUI.enableButtons).toHaveBeenCalled();
            expect(mockUI.displayMessage).toHaveBeenCalledWith('Game started. Hit or stand?');
            expect(script.isGameInProgress).toBe(true);
            expect(script.isRoundInProgress).toBe(true);
        });
    })

    describe('getWinnerMessage', () => {
        test('should return player wins message and update player rounds', () => {
            const winner = 'Player';

            const message = script.getWinnerMessage(winner);

            expect(message).toBe('Player wins.');
            expect(mockBlackjackService.player.rounds).toBe(1);
        });

        test('should return dealer wins message and update dealer rounds', () => {
            const winner = 'Dealer';

            const message = script.getWinnerMessage(winner);

            expect(message).toBe('Dealer wins.');
            expect(mockBlackjackService.dealer.rounds).toBe(1);
        });

        test('should return draw message', () => {
            const winner = 'Draw';

            const message = script.getWinnerMessage(winner);

            expect(message).toBe("It's a draw.");
        });
    });


    describe('bindButtons', () => {
        test('should bind UI buttons to their corresponding methods', () => {
            jest.spyOn(mockUI, 'bindStartGameButton');
            jest.spyOn(mockUI, 'bindStartRoundButton');
            jest.spyOn(mockUI, 'bindHitButton');
            jest.spyOn(mockUI, 'bindStandButton');

            script.bindButtons();

            expect(mockUI.bindStartGameButton).toHaveBeenCalled();
            expect(mockUI.bindStartRoundButton).toHaveBeenCalled();
            expect(mockUI.bindHitButton).toHaveBeenCalled();
            expect(mockUI.bindStandButton).toHaveBeenCalled();
        });
    });


});

