import BlackjackService from '../scripts/blackjack.service';

describe('BlackjackService', () => {
  let blackjackService;

  beforeEach(() => {
    blackjackService = new BlackjackService();
  });

  test('startGame should initialize game state correctly', () => {
    const mockDeck = [
      { value: '2', suit: 'H' },
      { value: '3', suit: 'D' },
      { value: '4', suit: 'C' },
      { value: '5', suit: 'S' }
    ];
    const expectedPlayerHand = mockDeck.slice(2, 4).reverse();
    const expectedDealerHand = mockDeck.slice(0, 2).reverse();
    blackjackService.createDeck = jest.fn(() => mockDeck);
    blackjackService.shuffleDeck = jest.fn();

    blackjackService.startGame();

    expect(blackjackService.createDeck).toHaveBeenCalled();
    expect(blackjackService.shuffleDeck).toHaveBeenCalledWith(mockDeck);
    expect(blackjackService.deck).toEqual(mockDeck);
    expect(blackjackService.player.hand).toEqual(expectedPlayerHand);
    expect(blackjackService.player.score).toBe(blackjackService.calculateHandScore(expectedPlayerHand));
    expect(blackjackService.dealer.hand).toEqual(expectedDealerHand);
    expect(blackjackService.dealer.score).toBe(blackjackService.calculateHandScore([expectedDealerHand[0]]));
  });

  test('resetRounds should reset rounds for player and dealer', () => {
    blackjackService.player.rounds = 5;
    blackjackService.dealer.rounds = 3;

    blackjackService.resetRounds();

    expect(blackjackService.player.rounds).toBe(0);
    expect(blackjackService.dealer.rounds).toBe(0);
  });

  test('createDeck should create a deck of cards', () => {
    const deck = blackjackService.createDeck();

    expect(deck.length).toBe(52);
    deck.forEach((card) => {
      expect(card).toHaveProperty('value');
      expect(card).toHaveProperty('suit');
    });
  });

  test('shuffleDeck should shuffle the deck', () => {
    const initialDeck = blackjackService.createDeck();
    blackjackService.deck = initialDeck;
    const shuffledDeck = initialDeck.slice();
    blackjackService.shuffleDeck(shuffledDeck);

    expect(shuffledDeck).not.toEqual(initialDeck);

    expect(shuffledDeck.length).toEqual(initialDeck.length);
  });

  test('drawCard should remove and return a card from the deck', () => {
    const initialDeck = blackjackService.createDeck();
    blackjackService.deck = initialDeck;
    const initialLength = initialDeck.length;

    const drawnCard = blackjackService.drawCard();

    expect(blackjackService.deck.length).toBe(initialLength - 1);
    expect(initialDeck).not.toContainEqual(drawnCard);
  });

  test('calculateHandScore should correctly calculate the score of a hand', () => {
    const hand1 = [
      { value: '2', suit: 'H' },
      { value: 'A', suit: 'D' },
    ];
    const hand2 = [
      { value: 'K', suit: 'C' },
      { value: 'J', suit: 'S' },
      { value: 'A', suit: 'D' },
    ];

    expect(blackjackService.calculateHandScore(hand1)).toBe(13);
    expect(blackjackService.calculateHandScore(hand2)).toBe(21);
  });

  test('determineWinner should correctly determine the winner', () => {
    expect(blackjackService.determineWinner(20, 18)).toBe('Player');
    expect(blackjackService.determineWinner(20, 22)).toBe('Player');
    expect(blackjackService.determineWinner(22, 20)).toBe('Dealer');
    expect(blackjackService.determineWinner(17, 20)).toBe('Dealer');
    expect(blackjackService.determineWinner(21, 21)).toBe('draw');
  });

  test('Should add a card to the players hand and return the new score', () => {
    blackjackService.deck = [
      { value: '2', suit: 'H' },
      { value: 'A', suit: 'D' },
    ];
    blackjackService.dealer = {
      hand: [],
      score: 0,
      rounds: 0
    }

    const initialScore = blackjackService.player.score;
    const newScore = blackjackService.playerHit();

    expect(newScore).toBeGreaterThan(initialScore);
    expect(blackjackService.player.hand.length).toBeGreaterThan(0);
  });

  test('Should add cards to the dealers hands until dealer has 17 or more points for score', () => {
    blackjackService.deck = [
      { value: 'A', suit: 'H' },
      { value: '5', suit: 'H' },
    ];
    blackjackService.dealer = {
      hand: [
        { value: '2', suit: 'H' },
        { value: 'A', suit: 'D' },
      ],
      score: 13,
      rounds: 0
    }

    blackjackService.dealerTurn();

    expect(blackjackService.dealerScore).toBeGreaterThanOrEqual(17);
  });
});
