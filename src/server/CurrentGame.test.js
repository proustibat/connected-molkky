import CurrentGame from './CurrentGame';

describe('CurrentGame', () => {
  let currentGame;

  beforeEach(() => {
    currentGame = new CurrentGame({ teams: ['dog', 'cat'], playingTeam: 'cat' });
  });

  afterEach(() => {
    CurrentGame.instance = null;
  });

  it('should create a singleton and save an instance as static member', () => {
    // Given / When
    const newInstance = new CurrentGame({ teams: ['qwerty', 'asdfgh'], playingTeam: 'qwerty' });
    const staticInstance = CurrentGame.instance;

    // Then
    expect(currentGame === newInstance).toBeTruthy();
    expect(staticInstance).toBeInstanceOf(CurrentGame);
    expect(currentGame === staticInstance).toBeTruthy();
  });

  it('should init the instance with the right scores and currentTurn members', () => {
    // Then
    expect(currentGame.scores)
      .toMatchObject({ cat: { score: 0, left: 50 }, dog: { score: 0, left: 50 } });
    expect(currentGame.currentTurn).toMatchObject({ isPlaying: 'cat', remain: 3 });
  });

  it('should add points', () => {
    // When
    currentGame.addPoints({ team: 'cat', points: 12 });

    // Then
    expect(currentGame.scores)
      .toMatchObject({ dog: { score: 0, left: 50 }, cat: { score: 12, left: 38 } });
    expect(currentGame.currentTurn).toMatchObject({ isPlaying: 'dog', remain: 3, wining: 'cat' });
  });

  it('should miss turn', () => {
    // When
    currentGame.missTurn();

    // Then
    expect(currentGame.currentTurn).toMatchObject({ isPlaying: 'cat', remain: 2 });
  });

  it('should reset the game', () => {
    // When
    currentGame.reset();

    // Then
    expect(CurrentGame.instance).toBeNull();
    expect(currentGame.scores).toBeNull();
    expect(currentGame.currentTurn).toBeNull();
  });

  it('should handle the end of a game when the score to reach is reached', () => {
    // When
    currentGame.addPoints({ team: 'cat', points: 50 });

    // Then
    expect(currentGame.scores)
      .toMatchObject({ dog: { score: 0, left: 50 }, cat: { score: 50, left: 0 } });
    expect(currentGame.currentTurn).toMatchObject({
      wining: 'cat',
      over: true,
      losing: 'dog',
    });
  });

  it('should handle the end of a game when no more missed turn is possible', () => {
    // When
    for (let i = 0; i < 3; i += 1) {
      currentGame.missTurn();
    }

    // Then
    expect(currentGame.currentTurn).toMatchObject({
      isPlaying: 'cat',
      remain: 0,
      wining: 'dog',
      over: true,
      losing: 'cat',
    });
  });

  it('should manage scores when adding points will result more than the score to reach', () => {
    // When
    currentGame.addPoints({ team: 'cat', points: 60 });

    // Then
    expect(currentGame.scores)
      .toMatchObject({ dog: { score: 0, left: 50 }, cat: { score: 25, left: 25 } });
  });
});
