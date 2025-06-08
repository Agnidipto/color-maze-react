import { createSlice } from '@reduxjs/toolkit';
// It's better to move these constants to a separate file (e.g., src/constants.js)
// and import them in both App.js and appSlice.js to avoid potential circular dependencies.
// For this example, I'm defining them here. If they are in App.js, adjust the import.

const CELL_TYPE = {
    EMPTY: 0,
    OBSTACLE: 1,
    PLAYER: 'P', // Player is represented by playerPos, board stores VISITED/EMPTY/OBSTACLE
    VISITED: 'X',
};

const GAME_STATE = {
    SETUP_DIMENSIONS: 'SETUP_DIMENSIONS',
    SETUP_OBSTACLES: 'SETUP_OBSTACLES',
    SETUP_PLAYER: 'SETUP_PLAYER',
    PLAYING: 'PLAYING',
    SOLVED: 'SOLVED',
};

const initialState = {
  // Assuming DIRECTION_MAPPING is needed here or passed via action if complex
  // For now, let's assume it's accessible or defined globally/imported
  rows: 7,
  cols: 7,
  board: [],
  gameState: GAME_STATE.SETUP_DIMENSIONS,
  playerPos: null,
  solution: null,
  unvisitedCount: 0,
};

// Helper function, can be defined inside the slice or imported
const isObstacle = (r, c, rows, cols, board) => {
    return !(r >= 0 && r < rows && c >= 0 && c < cols && board[r][c] !== CELL_TYPE.OBSTACLE);
};

// Define DIRECTION_MAPPING here or import it
const DIRECTION_MAPPING = { w: { r: -1, c: 0 }, s: { r: 1, c: 0 }, a: { r: 0, c: -1 }, d: { r: 0, c: 1 } };

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setRows: (state, action) => {
      state.rows = action.payload;
    },
    setCols: (state, action) => {
      state.cols = action.payload;
    },
    setBoard: (state, action) => {
      state.board = action.payload;
    },
    setGameState: (state, action) => {
      state.gameState = action.payload;
    },
    setPlayerPos: (state, action) => {
      state.playerPos = action.payload;
    },
    setSolution: (state, action) => {
      state.solution = action.payload;
    },
    setUnvisitedCount: (state, action) => {
      state.unvisitedCount = action.payload;
    },
    movePlayer: (state, action) => {
      if (state.gameState !== GAME_STATE.PLAYING || !state.playerPos) return;

      const direction = action.payload;
      const move = DIRECTION_MAPPING[direction];

      if (!move) return; // Invalid direction

      const { r: dr, c: dc } = move;
      let { r: current_r, c: current_c } = state.playerPos;

      // Check if the immediate next cell is an obstacle or out of bounds
      if (isObstacle(current_r + dr, current_c + dc, state.rows, state.cols, state.board)) {
        console.log("Cannot move in that direction (immediate obstacle)!");
        return;
      }

      let new_r = current_r;
      let new_c = current_c;
      let cellsVisitedInMove = 0;

      // Slide until an obstacle or boundary is hit
      while (!isObstacle(new_r + dr, new_c + dc, state.rows, state.cols, state.board)) {
        new_r += dr;
        new_c += dc;
        if (state.board[new_r][new_c] === CELL_TYPE.EMPTY) {
          state.board[new_r][new_c] = CELL_TYPE.VISITED; // Immer handles immutability
          cellsVisitedInMove++;
        }
      }

      state.unvisitedCount -= cellsVisitedInMove;
      state.playerPos = { r: new_r, c: new_c };

      if (state.unvisitedCount === 0) {
        state.gameState = GAME_STATE.SOLVED;
      }
    },
  },
});

export const {
  setRows,
  setCols,
  setBoard,
  setGameState,
  setPlayerPos,
  setSolution,
  setUnvisitedCount,
  movePlayer,
} = appSlice.actions;

export default appSlice.reducer;
