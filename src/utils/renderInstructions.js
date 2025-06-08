import { GAME_STATE } from '../constants';
const renderInstructions = (gameState, unvisitedCount) => {
  switch (gameState) {
    case GAME_STATE.SETUP_DIMENSIONS:
      return <p>Enter the dimensions for your puzzle board.</p>;
    case GAME_STATE.SETUP_OBSTACLES:
      return <p>Click on cells to mark them as obstacles. Click "Confirm Obstacles" when done.</p>;
    case GAME_STATE.SETUP_PLAYER:
      return <p>Now, click on an empty cell to set the player's starting position.</p>;
    case GAME_STATE.PLAYING:
      return <p>Use W, A, S, D keys to move. Your goal is to visit every empty cell. Unvisited cells: {unvisitedCount}</p>;
    case GAME_STATE.SOLVED:
      return <p className="success-message">Congratulations! You solved the puzzle!</p>;
    default:
      return null;
  }
};

export default renderInstructions