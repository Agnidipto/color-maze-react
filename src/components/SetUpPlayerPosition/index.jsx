import Cells from "../Cells";
import { useSelector, useDispatch } from "react-redux";
import { CELL_TYPE, GAME_STATE } from "../../constants";
import { 
  setBoard as setBoardAction, 
  setPlayerPos as setPlayerPosAction, 
  setUnvisitedCount as setUnvisitedCountAction, 
  setGameState as setGameStateAction 
} from "../../redux/appSlice";

function SetUpPlayerPosition(props) {

  const board = useSelector((state) => state.app.board);
  const cols = useSelector((state) => state.app.cols);
  const playerPos = useSelector((state) => state.app.playerPos);


  const dispatch = useDispatch();
  const setBoard = (value) => dispatch(setBoardAction(value));
  const setGameState = (value) => dispatch(setGameStateAction(value));
  const setPlayerPos = (value) => dispatch(setPlayerPosAction(value));
  const setUnvisitedCount = (value) => dispatch(setUnvisitedCountAction(value));

  const handleCellClick = (r, c) => {
    const newBoard = board.map(row => [...row]);
    if (newBoard[r][c] !== CELL_TYPE.OBSTACLE) {
      setPlayerPos({ r, c });
      const walkable = newBoard.flat().filter(cell => cell === CELL_TYPE.EMPTY).length;
      setUnvisitedCount(walkable);
    }
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

    <button className="action-button" onClick={handleConfirmPosition}>Confirm Position</button>
  </>)
}

export default SetUpPlayerPosition