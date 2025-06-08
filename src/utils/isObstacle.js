import { CELL_TYPE } from '../constants';

const isObstacle = (r, c, rows, cols, board) => {
  return !(r >= 0 && r < rows && c >= 0 && c < cols && board[r][c] !== CELL_TYPE.OBSTACLE);
};

export default isObstacle;