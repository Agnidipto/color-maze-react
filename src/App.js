import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import {
    CELL_TYPE,
    GAME_STATE,
    DIRECTION_MAPPING
} from './constants';
import { renderInstructions, solvePuzzle } from './utils';
import SetUpDimensions from './components/SetUpDimensions';
import SetUpObstacles from './components/SetUpObstacles';
import SetUpPlayerPosition from './components/SetUpPlayerPosition';
import PlayGame from './components/PlayGame';

import {
    setRows as setRowsAction,
    setCols as setColsAction,
    setBoard as setBoardAction,
    setGameState as setGameStateAction,
    setPlayerPos as setPlayerPosAction,
    setSolution as setSolutionAction,
    setUnvisitedCount as setUnvisitedCountAction,
    movePlayer as movePlayerAction
} from './redux/appSlice'; // Adjust path if your slice is elsewhere

// --- Main App Component ---
function App() {
    const rows = useSelector((state) => state.app.rows);
    const cols = useSelector((state) => state.app.cols);
    const board = useSelector((state) => state.app.board);
    const gameState = useSelector((state) => state.app.gameState);
    const playerPos = useSelector((state) => state.app.playerPos);
    const solution = useSelector((state) => state.app.solution);
    const unvisitedCount = useSelector((state) => state.app.unvisitedCount);
    const dispatch = useDispatch();

    // --- Game Logic Functions (Ported from Python) ---
    const setBoard = (value) => dispatch(setBoardAction(value));
    const setGameState = (value) => dispatch(setGameStateAction(value));
    const setPlayerPos = (value) => dispatch(setPlayerPosAction(value));
    const setUnvisitedCount = (value) => dispatch(setUnvisitedCountAction(value));

    // --- Handlers ---

    const handleCellClick = (r, c) => {
        const newBoard = board.map(row => [...row]);

        if (gameState === GAME_STATE.SETUP_OBSTACLES) {
            if (newBoard[r][c] === CELL_TYPE.OBSTACLE) {
                newBoard[r][c] = CELL_TYPE.EMPTY;
            } else {
                newBoard[r][c] = CELL_TYPE.OBSTACLE;
            }
            setBoard(newBoard);
        } else if (gameState === GAME_STATE.SETUP_PLAYER) {
            if (newBoard[r][c] !== CELL_TYPE.OBSTACLE) {
                setPlayerPos({ r, c });
                const walkable = newBoard.flat().filter(cell => cell === CELL_TYPE.EMPTY).length;
                setUnvisitedCount(walkable);
            }
        }
    };
    
    const handleConfirmObstacles = () => {
        setGameState(GAME_STATE.SETUP_PLAYER);
    };

    const handleConfirmPosition = () => {
        setGameState(GAME_STATE.PLAYING);
        if (playerPos) {
          const {r, c} = playerPos;
          const newBoard = board.map(row => [...row]);
          newBoard[r][c] = CELL_TYPE.VISITED;
          setBoard(newBoard);
          setGameState(GAME_STATE.PLAYING);
        }
    };

    // --- Keyboard Input ---
    useEffect(() => {
        const handleKeyDown = (e) => {
            const direction = e.key.toLowerCase();
            if (DIRECTION_MAPPING[direction]) {
                e.preventDefault();
                dispatch(movePlayerAction(direction));
            }
        };

        if (gameState === GAME_STATE.PLAYING) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [gameState, dispatch]); // dispatch is stable, movePlayerAction is stable

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