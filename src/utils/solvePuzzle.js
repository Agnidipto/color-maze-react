import { CELL_TYPE, DIRECTION_MAPPING } from '../constants';
import isObstacle from './isObstacle';

function solvePuzzle(board, playerPos, setSolution) {
  console.log("--- Finding Optimal Solution ---");

  const originalBoard = board.map(row => [...row]);
  const allWalkableCells = new Set();
  originalBoard.forEach((row, r) => {
      row.forEach((cell, c) => {
          if (cell !== CELL_TYPE.OBSTACLE) {
              allWalkableCells.add(`${r},${c}`);
          }
      });
  });

  // Pre-compute slide graph
  const slideGraph = new Map();
  for (const cell of allWalkableCells) {
      const [r_start, c_start] = cell.split(',').map(Number);
      slideGraph.set(cell, []);
      for (const direction in DIRECTION_MAPPING) {
          const { r: dr, c: dc } = DIRECTION_MAPPING[direction];
          if (isObstacle(r_start + dr, c_start + dc, originalBoard)) continue;

          const pathSegment = [];
          let next_r = r_start;
          let next_c = c_start;
          while (!isObstacle(next_r + dr, next_c + dc, originalBoard)) {
              next_r += dr;
              next_c += dc;
              pathSegment.push(`${next_r},${next_c}`);
          }

          if (pathSegment.length > 0) {
              const endPoint = pathSegment[pathSegment.length - 1];
              slideGraph.get(cell).push({
                  endPoint,
                  path: new Set(pathSegment),
                  direction
              });
          }
      }
  }

  // BFS to find the shortest path
  const startPosStr = `${playerPos.r},${playerPos.c}`;
  const initialVisited = new Set([startPosStr]);
  board.forEach((row, r) => {
      row.forEach((cell, c) => {
          if (cell === CELL_TYPE.VISITED) {
              initialVisited.add(`${r},${c}`);
          }
      });
  });

  const queue = [{ pos: startPosStr, visited: initialVisited, path: [] }];
  const visitedStates = new Set([`${startPosStr}|${[...initialVisited].sort().join(',')}`]);

  while (queue.length > 0) {
      const { pos, visited, path } = queue.shift();

      if (visited.size === allWalkableCells.size) {
          console.log("Optimal solution found!");
          setSolution(path);
          return path;
      }

      for (const slide of slideGraph.get(pos) || []) {
          const newVisited = new Set([...visited, ...slide.path]);
          const stateKey = `${slide.endPoint}|${[...newVisited].sort().join(',')}`;

          if (!visitedStates.has(stateKey)) {
              visitedStates.add(stateKey);
              const newPath = [...path, slide.direction];
              queue.push({ pos: slide.endPoint, visited: newVisited, path: newPath });
          }
      }
  }

  console.log("Puzzle is NOT solvable from the current state.");
  setSolution([]); // Indicate no solution found
  return null;

}

export default solvePuzzle;