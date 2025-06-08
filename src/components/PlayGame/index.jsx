import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cells from "../Cells";
import { solvePuzzle } from "../../utils";
import { setSolution as setSolutionAction} from "../../redux/appSlice";
import { DIRECTION_MAPPING } from "../../constants";
import { movePlayer as movePlayerAction} from "../../redux/appSlice";

function PlayGame(props) {

  const board = useSelector((state) => state.app.board);
  const cols = useSelector((state) => state.app.cols);
  const solution = useSelector((state) => state.app.solution);
  const playerPos = useSelector((state) => state.app.playerPos);

  const dispatch = useDispatch();
  const setSolution = (value) => dispatch(setSolutionAction(value));
  const movePlayer = (value) => dispatch(movePlayerAction(value));

  useEffect(() => {
    const handleKeyDown = (e) => {
        const direction = e.key.toLowerCase();
        if (DIRECTION_MAPPING[direction]) {
            e.preventDefault();
            movePlayer(direction);
        }
    };

    window.addEventListener('keydown', handleKeyDown)

    return () => {
        window.removeEventListener('keydown', handleKeyDown);
    };
}, []); // dispatch is stable, movePlayerAction is stable

  return (<>
    {board.length > 0 && (
      <div className="board" style={{ gridTemplateColumns: `repeat(${cols}, 40px)` }}>
        {board.map((row, r) => 
          row.map((cell, c) => 
          <Cells 
            key={`${r}-${c}`} 
            cellValue={cell} 
            r={r} 
            c={c} 
            handleCellClick={() => {}} 
          />
          )
        )}
      </div>
    )}
    <button className="action-button" onClick={() => solvePuzzle(board, playerPos, setSolution)}>Show Solution</button>
    {solution && (
      <div className="solution">
        <h3>Optimal Solution</h3>
        {solution.length > 0 ? (
            <p>Moves: {solution.join(' → ')}</p>
        ) : (
            <p>No solution could be found from the current position.</p>
        )}
      </div>
    )}
  </>)
}

export default PlayGame;