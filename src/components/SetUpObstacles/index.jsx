import Cells from "../Cells";
import { useSelector, useDispatch } from "react-redux";
import { CELL_TYPE, GAME_STATE } from "../../constants";
import { setBoard as setBoardAction, setGameState as setGameStateAction } from "../../redux/appSlice";

function SetUpObstacles(props) {

  const board = useSelector((state) => state.app.board);
  const cols = useSelector((state) => state.app.cols);

  const dispatch = useDispatch();
  const setBoard = (value) => dispatch(setBoardAction(value));
  const setGameState = (value) => dispatch(setGameStateAction(value));


  const handleCellClick = (r, c) => {
    const newBoard = board.map(row => [...row]);
    if (newBoard[r][c] === CELL_TYPE.OBSTACLE) {
        newBoard[r][c] = CELL_TYPE.EMPTY;
    } else {
        newBoard[r][c] = CELL_TYPE.OBSTACLE;
    }
    setBoard(newBoard);
  };

  const handleConfirmObstacles = () => {
    setGameState(GAME_STATE.SETUP_PLAYER);
  };

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
            handleCellClick={handleCellClick} 
          />
          )
        )}
      </div>
    )}

    <button className="action-button" onClick={handleConfirmObstacles}>Confirm Obstacles</button>
  </>)
}

export default SetUpObstacles