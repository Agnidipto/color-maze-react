// --- Constants ---
const CELL_TYPE = {
  EMPTY: 0,
  OBSTACLE: 1,
  PLAYER: 'P',
  VISITED: 'X',
};

const GAME_STATE = {
  SETUP_DIMENSIONS: 'SETUP_DIMENSIONS',
  SETUP_OBSTACLES: 'SETUP_OBSTACLES',
  SETUP_PLAYER: 'SETUP_PLAYER',
  PLAYING: 'PLAYING',
  SOLVED: 'SOLVED',
};

const DIRECTION_MAPPING = {
  w: { r: -1, c: 0 },
  s: { r: 1, c: 0 },
  a: { r: 0, c: -1 },
  d: { r: 0, c: 1 },
};

export { CELL_TYPE, GAME_STATE, DIRECTION_MAPPING };