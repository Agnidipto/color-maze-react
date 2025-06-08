import { useSelector, useDispatch } from "react-redux";
import { 
  setRows as setRowsAction, 
  setCols as setColsAction, 
  setBoard as setBoardAction, 
  setGameState as setGameStateAction,
  setPlayerPos as setPlayerPosAction,
  setSolution as setSolutionAction
 } from "../../redux/appSlice";
import { GAME_STATE, CELL_TYPE } from "../../constants";

function SetUpDimensions() {

  const rows = useSelector((state) => state.app.rows);
  const cols = useSelector((state) => state.app.cols);
  const dispatch = useDispatch();
  const setRows = (value) => dispatch(setRowsAction(value));
  const setCols = (value) => dispatch(setColsAction(value));
  const setBoard = (value) => dispatch(setBoardAction(value));
  const setGameState = (value) => dispatch(setGameStateAction(value));
  const setPlayerPos = (value) => dispatch(setPlayerPosAction(value));
  const setSolution = (value) => dispatch(setSolutionAction(value));

  const handleCreateBoard = () => {
    const newBoard = Array.from({ length: rows }, () => Array(cols).fill(CELL_TYPE.EMPTY));
    setBoard(newBoard);
    setGameState(GAME_STATE.SETUP_OBSTACLES);
    setPlayerPos(null);
    setSolution(null);
};
  
  return (<>
  <div className="setup-form">
    <input type="number" value={rows} onChange={e => setRows(parseInt(e.target.value, 10))} placeholder="Rows" />
    <input type="number" value={cols} onChange={e => setCols(parseInt(e.target.value, 10))} placeholder="Columns" />
  </div>
    <button className="action-button" onClick={handleCreateBoard}>Create Board</button>
  </>)
}

export default SetUpDimensions;