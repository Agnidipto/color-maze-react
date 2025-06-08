import { useSelector} from 'react-redux';
import './App.css';
import {GAME_STATE} from './constants';
import { renderInstructions } from './utils';
import SetUpDimensions from './components/SetUpDimensions';
import SetUpObstacles from './components/SetUpObstacles';
import SetUpPlayerPosition from './components/SetUpPlayerPosition';
import PlayGame from './components/PlayGame';

// --- Main App Component ---
function App() {
    const gameState = useSelector((state) => state.app.gameState);
    const unvisitedCount = useSelector((state) => state.app.unvisitedCount);

    return (
      <div className="App">
        <h1>Color Maze Puzzle</h1>
        <div className="instructions">{renderInstructions(gameState, unvisitedCount)}</div>
        {gameState === GAME_STATE.SETUP_DIMENSIONS && <SetUpDimensions />}
        {gameState === GAME_STATE.SETUP_OBSTACLES && <SetUpObstacles />}
        {gameState === GAME_STATE.SETUP_PLAYER && <SetUpPlayerPosition />}
        {gameState === GAME_STATE.PLAYING && <PlayGame />}
      </div>
    );
}

export default App;