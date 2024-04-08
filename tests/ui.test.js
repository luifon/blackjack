import UI from '../scripts/ui';

document.body.innerHTML = `
<div>
  <div id="player-hand"></div>
  <div id="dealer-hand"></div>
  <div id="dealer-round-score"></div>
  <div id="player-round-score"></div>
  <div id="dealer-score"></div>
  <div id="message"></div>
  <button id="start-game-button"></button>
  <button id="start-round-button"></button>
  <button id="hit-button"></button>
  <button id="stand-button"></button>
</div>
`;

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
});
