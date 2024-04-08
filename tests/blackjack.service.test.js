import BlackjackService from '../scripts/blackjack.service';

describe('BlackjackService', () => {
  let blackjackService;

  beforeEach(() => {
    blackjackService = new BlackjackService();
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

    console.log(blackjackService.deck);
    console.log(blackjackService.deck.length);

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
    expect(blackjackService.determineWinner(17, 20)).toBe('Dealer');
    expect(blackjackService.determineWinner(21, 21)).toBe('draw');
  });
});
