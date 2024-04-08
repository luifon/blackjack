import Player from '../scripts/player.model.js';

describe('Player', () => {
    let player;

    beforeEach(() => {
        player = new Player();
    });

    test('should initialize with empty hand, score, and rounds', () => {
        expect(player.hand).toEqual([]);
        expect(player.score).toBe(0);
        expect(player.rounds).toBe(0);
    });

    test('should update hand with new cards', () => {
        const mockHand = [
            { value: '2', suit: 'H' },
            { value: '3', suit: 'D' },
        ];

        player.hand.push(...mockHand);

        expect(player.hand).toEqual(mockHand);
    });
});
