import UI from '../scripts/ui';
import { BODY_MOCK } from './assets/body.mock';

document.body.innerHTML = BODY_MOCK;

describe('UI Class', () => {
  let ui;

  beforeEach(() => {
    ui = new UI();
  });

  test('Display player hand', () => {
    const cards = [
      { value: '10', suit: 'H' },
      { value: 'J', suit: 'D' },
    ];

    ui.displayPlayerHand(cards);

    expect(document.getElementById('player-hand').children.length).toBe(2);
  });

  test('Display dealer hand', () => {
    const cards = [
      { value: '10', suit: 'H' },
      { value: 'J', suit: 'D' },
    ];

    ui.displayDealerHand(cards);

    expect(document.getElementById('dealer-hand').children.length).toBe(2);
  });

  test('displayDealerHand hides the second card when hideSecondCard is true', () => {
    const cards = [
      { value: '2', suit: 'H' },
      { value: '4', suit: 'D' }
    ];

    ui.displayDealerHand(cards, true);

    const dealerHandElement = document.getElementById('dealer-hand');
    const cardElements = dealerHandElement.querySelectorAll('.card');
    expect(cardElements.length).toBe(2);
    expect(cardElements[1].src).toContain('/cards/BACK.png');
  });

  test('Display player score', () => {
    ui.displayPlayerScore(21);

    expect(document.getElementById('player-score').textContent).toBe(
      'Player Score: 21'
    );
  });

  test('Display dealer score', () => {
    ui.displayDealerScore(18);

    expect(document.getElementById('dealer-score').textContent).toBe(
      'Dealer Score: 18'
    );
  });

  test('Display message', () => {
    ui.displayMessage('Hello');

    expect(document.getElementById('message').textContent).toBe('Hello');
  });

  test('Update rounds', () => {
    ui.updateRounds(1, 2);

    expect(document.getElementById('player-round-score').textContent).toBe('1');
    expect(document.getElementById('dealer-round-score').textContent).toBe('2');
  });

  test('Clear UI', () => {
    ui.clearUI(true);

    expect(document.getElementById('player-hand').innerHTML).toBe('');
    expect(document.getElementById('dealer-hand').innerHTML).toBe('');
    expect(document.getElementById('player-score').textContent).toBe('');
    expect(document.getElementById('dealer-score').textContent).toBe('');
    expect(document.getElementById('message').textContent).toBe('');
    expect(document.getElementById('player-round-score').textContent).toBe('0');
    expect(document.getElementById('dealer-round-score').textContent).toBe('0');
  });

  test('Disable buttons', () => {
    ui.disableButtons();

    expect(document.getElementById('hit-button').disabled).toBe(true);
    expect(document.getElementById('stand-button').disabled).toBe(true);
  });

  test('Enable buttons', () => {
    ui.enableButtons();

    expect(document.getElementById('hit-button').disabled).toBe(false);
    expect(document.getElementById('stand-button').disabled).toBe(false);
  });


  test('bindStartGameButton calls provided handler when start game button is clicked', () => {
    const handler = jest.fn();
    ui.bindStartGameButton(handler);

    const startGameButton = document.getElementById('start-game-button');
    startGameButton.click();

    expect(handler).toHaveBeenCalled();
  });

  test('bindStartRoundButton calls provided handler when start round button is clicked', () => {
    const handler = jest.fn();
    ui.bindStartRoundButton(handler);

    const startRoundButton = document.getElementById('start-round-button');
    startRoundButton.click();

    expect(handler).toHaveBeenCalled();
  });

  test('bindHitButton calls provided handler when hit button is clicked', () => {
    const handler = jest.fn();
    ui.bindHitButton(handler);

    const hitButton = document.getElementById('hit-button');
    hitButton.click();

    expect(handler).toHaveBeenCalled();
  });

  test('bindStandButton calls provided handler when stand button is clicked', () => {
    const handler = jest.fn();
    ui.bindStandButton(handler);

    const standButton = document.getElementById('stand-button');
    standButton.click();

    expect(handler).toHaveBeenCalled();
  });
});
