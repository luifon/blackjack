export const BODY_MOCK = `
    <div class="container">
      <section class="menu">
        <button id="start-game-button">Start New Game</button>
        <button id="start-round-button">Start New Round</button>
      </section>
      <hr class="hands-separator" />
      <section class="dealer-section">
        <h3>Dealer Rounds Won: <span id="dealer-round-score"></span></h3>
        <div id="dealer-hand" class="hand"></div>
        <div id="dealer-score" class="score"></div>
      </section>
      <hr class="hands-separator" />
      <section class="player-section">
        <h3 class="">
          Player Rounds Won: <span id="player-round-score"></span>
        </h3>
        <div id="player-hand" class="hand"></div>
        <div id="player-score" class="score"></div>
      </section>
      <div id="message"></div>
      <button id="hit-button">Hit</button>
      <button id="stand-button">Stand</button>
    </div>
`;